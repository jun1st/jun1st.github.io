---
layout: single
title: "Add Separator Between Commands in Your Terminal"
description: "add a handy separator between commands in your terminal. 在Terminal的命令之间加上分隔行，提高可读性"
categories: mac
tags: [mac,Terminal]
---
如果你用Terminal，当某一个command输出大队大队的内容后，窗口的可读性就越来越差了，因此就有人想出了解决方法。

![分割行](http://images.fengqijun.me/2013-03/separator-line)

看上去清楚多了，而且配置挺简单。

在你的**～**目录下建一个**.bash_ps1**文件，然后copy下面的内容， [gist](https://gist.github.com/jun1st/5252639) 地址
<script src="https://gist.github.com/jun1st/5252639.js"></script>

然后再修改<code>.bash_profile</code>，在末位加入

	if [ -f "$HOME/.bash_ps1" ]; then
 		. "$HOME/.bash_ps1"
 	fi


 然后重启Terminal， 或者<code>source ~/.bash_profile</code>

