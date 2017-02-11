---
layout: single
title: 在Ubuntu 14.04上建立L2TP/IPSec VPN
date: 2015-03-08 11:00:00 +0800
categories: vpn
comments: true
image: null
---

[之前写过在ubuntu 12上建VPN](/vpn/2013/10/21/create-a-l2tp-slash-ipsec-vpn-on-ubuntu-12-dot-04/)，由于opwnswan和xl2tpd这些软件的升级，配置会有改动，因此在ubuntu 14上，之前的方法行不通了，这些写下最新的配置方法

```bash
  apt-get install openswan xl2tpd ppp lsof
```

我是用root账户安装的，如果不是root账户，需要添加<code>sudo</code>。
安装过程中会询问你是否需要是否用X.509证书来验证IPSec的连接，选择__No__;

###配置防火墙

```bash
  iptables -t nat -A POSTROUTING -j SNAT --to-source %你的ip地址% -o eth+
```

PS: 注意替换包括"%"

```bash
  echo "net.ipv4.ip_forward = 1" |  tee -a /etc/sysctl.conf
  echo "net.ipv4.conf.all.accept_redirects = 0" |  tee -a /etc/sysctl.conf
  echo "net.ipv4.conf.all.send_redirects = 0" |  tee -a /etc/sysctl.conf
  echo "net.ipv4.conf.default.rp_filter = 0" |  tee -a /etc/sysctl.conf
  echo "net.ipv4.conf.default.accept_source_route = 0" |  tee -a /etc/sysctl.conf
  echo "net.ipv4.conf.default.send_redirects = 0" |  tee -a /etc/sysctl.conf
  echo "net.ipv4.icmp_ignore_bogus_error_responses = 1" |  tee -a /etc/sysctl.conf

  for vpn in /proc/sys/net/ipv4/conf/*; do echo 0 > $vpn/accept_redirects; echo 0 > $vpn/send_redirects; done

```

应用这些修改<code>sysctl -p</code>

###修改rc.local

在<code>exit 0</code>之前添加

```bash
  for vpn in /proc/sys/net/ipv4/conf/*; do echo 0 > $vpn/accept_redirects; echo 0 > $vpn/send_redirects; done
  iptables -t nat -A POSTROUTING -j SNAT --to-source %SERVERIP% -o eth+
```

保证每次重启之后，这些修改有效.


###配置Openswan (IPSEC)

编辑/etc/ipsec.conf文件

```bash
  version 2.0
  config setup
    dumpdir=/var/run/pluto/
    nat_traversal=yes
    virtual_private=%v4:10.0.0.0/8,%v4:192.168.0.0/16,%v4:172.16.0.0/12,%v6:fd00::/8,%v6:fe80::/10
    protostack=netkey
    force_keepalive=yes
    keep_alive=60

  conn L2TP-PSK-noNAT
    authby=secret
    pfs=no
    auto=add
    keyingtries=3
    rekey=no
    ikelifetime=8h
    keylife=1h
    ike=aes256-sha1,aes128-sha1,3des-sha1
    phase2alg=aes256-sha1,aes128-sha1,3des-sha1
    type=transport
    left=%SERVERIP%
    leftprotoport=17/1701
    right=%any
    rightprotoport=17/%any
    dpddelay=10
    dpdtimeout=20
    dpdaction=clear
```

修改/etc/ipsec.secrets 设置IPSec握手时的的 Shared Secret

```bash
  %SERVERIP% %any: PSK "password"
```

__执行<code>ipsec verify</code>__, 除了最后一个<code>Opportunistic Encryption Support</code>其它都没有Error.

###配置xl2tp

编辑/etc/xl2tpd/xl2tpd.conf, 配置监听端口和服务

```bash
  [global]
  ipsec saref = yes
  saref refinfo = 30

  ;debug avp = yes
  ;debug network = yes
  ;debug state = yes
  ;debug tunnel = yes

  [lns default]
  ip range = 172.16.1.30-172.16.1.100
  local ip = 172.16.1.1
  refuse pap = yes
  require authentication = yes
  ;ppp debug = yes
  pppoptfile = /etc/ppp/options.xl2tpd
  length bit = yes
```

在/etc/ppp目录下新建options.xl2tpd文件，

```bash
  require-mschap-v2
  ms-dns 8.8.8.8
  ms-dns 8.8.4.4
  auth
  mtu 1200
  mru 1000
  crtscts
  hide-password
  modem
  name l2tpd
  proxyarp
  lcp-echo-interval 30
  lcp-echo-failure 4
```

然后设置用户名，密码，编辑/etc/ppp.chap-sercrects,

```bash
  # Secrets for authentication using CHAP
  # client server secret IP addresses
  1234 l2tpd password *
```


###重启相关服务

```
service ipsec restart
service xl2tpd restart
```

如果发现连接不上，那就该重新检查一下是否哪个设置错了，或者有什么typo。
