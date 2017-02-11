---
layout: single
title: "在Ubuntu 12.04上建立L2TP/IPSec VPN"
description: Step By Step的在Ubuntu上建立L2TP VPN
date: 2013-10-21 20:32
comments: true
categories: vpn
---

前两天把VPS重新刷了，尼玛的vpn就没有了。建vpn这种事情是偶尔干一次的，然后你就忘了，直到你下一次需要重新安装的时候，你猜会想起来，想不起来就Google；这次我自己就google了半天，因此在这里记录一下，以备自己以后需要，也方便一下需要的人。

```sh install openswan xl2tpd
apt-get install openswan xl2tpd
```

我是用root账户安装的，如果不是root账户，需要添加<code>sudo</code>。

安装过程中会询问你是否需要是否用X.509证书来验证IPSec的连接，选择__No__;

编辑/etc/ipsec.conf文件

```sh
version 2.0
config setup
nat_traversal=yes
virtual_private=%v4:10.0.0.0/8,%v4:192.168.0.0/16,%v4:172.16.0.0/12
oe=off
protostack=netkey
conn L2TP-PSK-NAT
dpddelay=40
dpdtimeout=130
dpdaction=clear
rightsubnet=vhost:%priv
also=L2TP-PSK-noNAT
conn L2TP-PSK-noNAT
authby=secret
pfs=no
auto=add
keyingtries=3
rekey=no
ikelifetime=8h
keylife=1h
type=transport
left=You server IP address
leftprotoport=17/1701
right=%any
rightprotoport=17/%any
```

修改/etc/ipsec.secrets 设置IPSec握手时的Machine Authentication – Shared Secret

```sh
You server IP address %any: PSK "password"
```

编辑/etc/xl2tpd/xl2tpd.conf, 配置监听端口和服务

```
[global]
ipsec saref = yes
[lns default]
ip range = 10.1.2.2-10.1.2.255
local ip = 10.1.2.1
;require chap = yes
refuse chap = yes
refuse pap = yes
require authentication = yes
ppp debug = yes
pppoptfile = /etc/ppp/options.xl2tpd
length bit = yes
```

在/etc/ppp目录下新建options.xl2tpd文件，

```
require-mschap-v2
ms-dns 8.8.8.8
asyncmap 0
auth
crtscts
lock
hide-password
modem
debug
name l2tpd
proxyarp
lcp-echo-interval 30
lcp-echo-failure 4
```

然后设置用户名，密码，编辑/etc/ppp.chap-sercrects,

```
# Secrets for authentication using CHAP
# client server secret IP addresses
1234 l2tpd password *
```

最后还有关键一步，配置转发规则，<code>vi /etc/rc.local</code>

```
#!/bin/sh -e
#
# rc.local
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.
iptables --table nat --append POSTROUTING --jump MASQUERADE
echo 1 > /proc/sys/net/ipv4/ip_forward
for each in /proc/sys/net/ipv4/conf/*
do
echo 0 > $each/accept_redirects
echo 0 > $each/send_redirects
done
/etc/init.d/ipsec restart
exit 0
```

重启相关服务

```
service ipsec restart
service xl2tpd restart
```

如果发现连接不上，那就该重新检查一下是否哪个设置错了，或者有什么typo。
