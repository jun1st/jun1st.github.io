---
layout: single
title: "MySQL UTF8 Setting Update"
description: "mysql utf8 setting update"
categories: database
tags: [mysql, utf8]
---

I wrote a post about setting default character and encoding of MySQL to utf8 on OS X, [here](https://blogs.fengqijun.me/database/2012/11/18/mysqlencodingutf8.html). But there is a better way to do this instead of modifying the default my.cnf file directly on Ubuntu.

the last line of my.cnf file <code>/etc/mysql/</code> is

	!includedir /etc/mysql/conf.d/

which indicate it will includes any setting files under folder <code>conf.d</code>. So create a file named <code>utf8_charset.cnf</code> or whatever name you like, put these lines into the file

	[mysqld]
	character-set-server=utf8
	collation-server=utf8_general_ci

	[client]
	default-character-set=utf8

Restart mysql, and these setting will be in effect.

The benefit of putting these settings into a seperate file is that these settings will survive when you upgrade your mysql.
