---
layout: single
title: 从Sublime Text 2 升级到Sublime Text 3
description: 如何把Sublime Text 2的插件导入到Sublime Text 3下面
date: 2014-01-04 18:11:48 +0800
comments: true
categories: tools
---
Sublime Text 3 Beta推出已经有半年多了，基本上所有的插件都支持3了，是时候升级了。

为什么摇升级？一个理由就够了，3的打开速度比2快。

那么多插件怎么升级呢？

把<code>~/Library/Application Support/Sublime Text 2/Packages</code>下面所有的包都复制到Sublime Text 3对应的Packages目录下，除了_Default_和_Package Control_这两个文件夹

当然，先要给Sublime Text 3装上Package Control，[安装](https://sublime.wbond.net/installation)
