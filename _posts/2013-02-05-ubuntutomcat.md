---
layout: single
title: "在ubuntu 上安装 Tomcat"
description: "install tomcat on ubuntu"
categories: linux
tags: [tomcat,linux]
---

Assignment需要，多年后又要开始折腾Java和Tom猫了。到不了的地方叫远方，逃不脱的语言叫java啊。

首先当然是从官网下载tomcat了，不管6.x还是7.x都没有问题，我下载的是6.x，然后解压

	unzip apache-tomcat-6.x.x.zip

然后把这猫搬到系统目录下，

	sudo mv /home/ubuntu/apache-tomcat-6.x.x /usr/local

接着需要改tomcat文件夹的ownership

	sudo chown -R YourName /usr/local/apache-tomcat-6.x.x

然后还需要给shell脚本执行的权限，不然就瞎了

	sudo chmod +x /usr/local/apache-tomcat-6.x.x/bin/*.sh

“+x”表示添加execute的权限

然后运行

	/usr/local/apache-tomcat-6.x.x/bin/startup.sh

再通过浏览器访问:8080, 就可以看到那只猫了

如果启动失败，很可能是你的JAVA_HOME或者JRE_HOME没有设置，或者设置有问题
