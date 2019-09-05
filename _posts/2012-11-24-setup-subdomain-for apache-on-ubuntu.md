---
layout: single
title: "Ubuntu中的Apache设置二级域名"
description: "setup sub-domain for apache on ubuntu"
categories: ubuntu
tags: [sub-domain, apache, ubuntu]
---

在之前的从wordpress搬迁到jekyll的[文章](http://fengqijun.me/blog/2012/11/17/move-from-wordpress-to-jekyll/)中提到，搬迁最大的问题就是图片的存放和图片的连接。为此我在自己的VPS上建立了一个叫做images的二级域名来专门存放文件。

## 建立二级域名A记录
建立二级域名最重要的一步是在你的域名解析服务器上添加一条"\*"的A记录，把\*.domainname.com都mapping到你的服务器IP地址上

## 建立site文件
Ubuntu上的Apache设置和别的Linux有不同的地方，在/etc/apache2/sites-available目录下建一个新的site文件，建议文件名跟你的二级域名一样， 比如:images.fengqijun.me

	<VirtualHost *:80>
        ServerAdmin aaa.bbb@gmail.com
        ServerName images.fengqijun.me
        DocumentRoot /path-to/blog-images/
	</VirtualHost>

## 激活site文件
激活site文件，可以用命令

	a2ensite images.fengqijun.me

成功之后，/etc/apache2/sites-enabled/目录下就会出现这个文件。如果想disable某个site，可以用<pre>a2dissite</pre>命令

## 修改hosts
在hosts中，把images.fengqijun.me mapping到 127.0.0.1


然后重启Apache，就完成了
