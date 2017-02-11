---
layout: single
title: 把MySQL的默认encoding设置为UTF8
description: "把MySQL的默认Encoding改成utf8"
categories: database
tags: [mysql, utf8]
---

有中文的地方，就有utf8，不论什么软件。所以我觉得所有的软件，尤其是数据库应该把默认的encoding方式都改成utf8。

昨天在写的Rails程序中，输入了“曼联”两个字，显示出来的确实“??”，就知道又是utf8的问题。因为在用rails的migration创建表的时候，没有制定encoding, 使用的是默认的设置，创建的表就不是utf8的了。所以为了以后的方便，我想把mysql的默认设置改成utf8.

首先，在mysql的命令行里输入

	show variables like '%char%';

看看有哪些设置不是utf8, 通常情况下，默认的下面两项不是utf8的（下面是我改过的结果）

	character_set_client     | utf8
	character_set_database   | utf8

这些默认设置可以通过mysql的my.cnf文件来修改。但是最新的mac os已经不用这个default了，所以需要把

	/usr/local/mysql/support-files/my-small.cnf

(update:这个文件在最新的Mountain Lion下安装的mysql也可能没有，所以我上传了一个到dropbox，[备份](https://www.dropbox.com/s/eo51setoeohs5fn/my.cnf?m))
这个文件copy到/etc/目录下，并且改名为my.cnf.

修改此文件，

	...
	[client]
	default-character-set=utf8
	...

	[mysqld]
	default-character-set=utf8
	character-set-server=utf8
	default-collation=utf8_unicode_ci

重启mysql使修改生效。

如果使用的是Rails， 还需要修改database.yaml文件，在数据库连接重加入encoding设置

	development:
	adapter: mysql
	encoding: utf8

This is it!

