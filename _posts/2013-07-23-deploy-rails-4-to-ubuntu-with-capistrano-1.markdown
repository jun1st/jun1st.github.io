---
layout: single
title: "Deploy Rails 4 to Ubuntu With Capistrano Part1"
description: 配置UbuntuServer作为Rails的服务器，并且配置相应的用户权限，配合capistrano来发布程序
date: 2013-07-23 13:28
comments: true
categories: rails
---

程序的发布是Web Application的最后一步，虽然是最后一步，但是十分重要的一步，不然你的程序跑不起来就白瞎了。

Capistrano是Rails Community中比较流行的部署工具，本文就记录一下如何用Capistrano来部署到Ubuntu 12.04 Server。 篇幅较长，第一部分先写如何建立好Server环境。

### 专用于部署的用户 ###

用Root用户来部署虽然能成功，但是权限太高，危险系数就高。所以应该用一个专用的用户来执行部署，这个用户的权限仅够用户部署。

``` bash
useradd -d /home/deployer -m deployer
```

再设置个密码

```
passwd deployer
```

再赋予sudoer的权限，基本不需要用到sudo，但是以防万一

```
visudo
#deployer ALL=(ALL) ALL 把这个加入sudoer 文件中
```

再新建一个Group，并把deployer加到这个Group里

```
sudo groupadd deployers
sudo usermod -a -G deployers deployer
```

然后把部署目录的权限赋给这个用户，

```
sudo chown -R deployer:deployers /deploy/to/path
sudo chmod -R g+w /deploy/to/path
```

### 添加RSA Key到Server中 ###

在部署时，把部署用到的用户的密码写在Deploy文件中是比较不安全的事情。因此可以用信任rsa key来登录。

首先在server中建立.ssh文件夹

```
mkdir ~/.ssh
```

在__local__机器中，新建rsa key

```
ssh-keygen -t rsa -b 2048 -C "some comment"

cat ~/.ssh/id_rsa.pub | ssh deployer@xxx.xxx.xxx.xxx 'cat ->> ~/.ssh/authorized_keys'
```

回到Server上，修改ssh的权限

```
ssh chmod 600 ~/.ssh/authorized_keys && chmod 700 ~/.ssh/
```

Server端权限的设置基本就完成了，下一篇讲如何设置Capistrano
