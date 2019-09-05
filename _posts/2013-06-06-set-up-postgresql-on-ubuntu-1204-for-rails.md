---
layout: single
title: "set up postgresql on ubuntu 12.04 for rail"
description: "talk about how to setup postgresql on ubuntu 12.04, create user and databases. Also introduce some basic postgresql command"
categories: database
tags: [postgresql,ubuntu]
---
在Rails开发中，Postgresql现在是最热门的数据库了，我也把我的项目从mysql转到了postgresql, 刚开始在ubuntu上配置碰到了好些个问题，Google了好些资料，这里总结一下，算是备份。

	sudo apt-get install postgresql

切换到用户postgre

	sudo su postgres

创建就可以创建数据库用户，修改密码

	createuser railsUser;
	alter user railsUser with password 'password'

 创建数据库

```
 createdb -p 5432 -O railsUser -U railsUser -E UTF8 MyRailsProject
```

 备份还原数据库

```
 pg_dump -p 5432 -h localhost -Fc -U railsUser --no-owner MyRailsProject > ~/myrails.pgdump
 pg_restore -p 5432 -h localhost -Fc -d MyRailsProject -U railsUser --no-owner < ~/myrails.pgdump
```

如果Web和DB服务器是在同一台，那么可以设置Postgresql只允许localhost访问，

	sudo vim /etc/postgresql/9.1/main/postgresql.conf

取消listen_address的注释

	listen_address = 'localhost'


常用的命令

	\l #显示所有数据库
	\d tablename #describe
	\q #quit
	\c ＃connect database

	\dt #所有table
	\du #所有users
