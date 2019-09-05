---
layout: single
title: "在ubuntu 和 apache上 安装 passenger 来运行 rails"
description: "set up an ubuntu server for running Rails on it, leveraging apache and passenger"
categories: rails
tags: [ubuntu, apache, passenger, rails]
---
最近装了好几次 Rails 系统了，不论是在 Ubuntu 上还是在 OSX 上，发现都是用 RVM 比较方便，安装过程还是有点繁琐的，所以纪录一下，下次用的时候自己做个参考。

首先是升级一下Ubuntu系统，

	sudo apt-get update #
	sudo apt-get dist-update

安装的快慢当然取决于你的网速，如果用的是美国的虚拟机，那速度就是soso的，如果用的是GFW内的网络，那就等会吧。

接着再安装Apache，

	sudo apt-get install apache2

至于数据库，那就看你自己需要了，用什么就装什么，不管mysql还是postgrel都是一句命令的事情。

接下来要装的东西就比较重要了，安装编译需要的各个组建，如果是OSX上，就会要求安装XCode Command Tools，

	sudo apt-get install build-essential

这是最重要的一步。不然下面就进行不下去了。

我喜欢用RVM来管理Ruby和Rails，所以就来安装RVM，不管是在OSX上还是在Ubuntu上，基本一样。

	curl -L https://get.rvm.io | bash -s stable
	source ~/.profile #for ubuntu

	rvm requirement

rvm requirement这个命令会告诉你你的系统运行Ruby，或者JRuby还缺什么，按照你的需要根据它的提示运行相应的命令就行。然后就是安装Ruby和Rails了，

	rvm install 1.9.3 #ruby 1.9.3
	gem install rails

要在Apache中运行Rails，还需要一个叫做Passenger的module, 免费的，有[Phusion](https://www.phusionpassenger.com)公司开发和维护.

	gem install passenger #安装passenger gem
	passenger-install-apache2-module

第二个命令会检查当前的Apache是否能够运行passenger，还是需要安装补丁，在我机器上需要安装不少东西

	sudo apt-get install libcurl4-openssl-dev
	sudo apt-get install libssl-dev zlib1g-dev apache2-prefork-dev libapr1-dev libaprutil1-dev

安装完成后，再次执行

	passenger-install-apache2-module

这一步需要一点时间，等它执行完之后，会告诉你如何修改apache的conf文件，把相应的命令copy到conf文件的末尾，然后重启Apache就完成了

接下来只要配置Apache的虚拟目录就能运行Rails程序了。Cool！



