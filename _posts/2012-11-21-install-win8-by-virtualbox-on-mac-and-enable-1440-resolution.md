---
layout: single
title: 在Mac上用VirtualBox中安装Win8，并且激活1440分辨率
description: 在Mac上用VirtualBox中安装Win8，并且激活1440分辨率
categories: mac
tags: [mac,virtualbox,additional guest]
---

Parallel Desktop肯定是个优秀的虚拟机软件，在PD7上装Win7，很方便，也很好用；可是它对Win8支持不好，想要升级到PD8又得花不少钱。可想，当PD9出来的时候为了使以前花的钱不白费，还有可能选择继续升级。因此我打算这次开始就是用VirutalBox来安装Win8了，Win8是通过学校CS的内网连接到微软下载的，正版。

整个安装过程是很简单，从这里[下载VirtualBox](https://www.virtualbox.org/), 基本上一路Next就能完成安装。当你觉得可以开始试用Win8的时候，发现这个分辨率不对，要么太大，要么太小，没办法调成Mac的1440x900, 不爽中，所以Google。Google的结果是很多人都碰到有这个问题，有点人知道要安装Additional Guest, 有的人直接放弃。而很多人在问怎么安装Additional Guest。

安装Additional Guest对于习惯Windows的中文用户来说，确实不那么直接。 在Mac上，需要在Applications目录里找到VirtualBox，然后Show Package Content, Mac OS/VBoxGuestAddition.iso, 把这个文件copy到某个根目录下。

然后开启Win 8,全屏模式，然后通过Device->CD/DVD Devices, 加载刚刚那个ios文件，

![Device](http://images.fengqijun.me/2012-11/device-guest-addition.png)

然后再在Win8里面，通过光驱安装。

![Install](http://images.fengqijun.me/2012-11/install-inside-win8.PNG)

安装完之后，虚拟机重启，就有1440x900的分辨率了，Cheers!

