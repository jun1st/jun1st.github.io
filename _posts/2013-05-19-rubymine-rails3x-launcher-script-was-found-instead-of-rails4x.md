---
layout: single
title: "RubyMine:Rails 3.x launcher script was found instead of Rails 4.x"
description: "RubyMine 5.4.1 cannot run old 4.0 rails project that are upgraded from 3.x rails project "
categories: rails
tags: [rails,rubymine,rails4,rails3]
---

前两天把一个Rails项目从3.2升级到了4.0 rc1, 然后又看到消息说Rubymine更新了，开始支持Rails4了，于是就更新到了最新版，5.4.2, 不过没看到有什么明显的变化，但是确发现不能启动Server，总是碰到这个错误

	Rails 3.x launcher script was found instead of Rails 4.x one. You need '/Users/fengqijun/Documents/workspace/yourproject/bin/rails' script to launch Rails server. Please update server launcher according to Rails 4.x documentation.

有问题，找Google，但是没找到什么有用的信息，只在Stackoverflow上找到一条说是因为项目中有Rails Gem用的是旧的，比如3.x的和2.x的共存，就会出现这种问题。但是我这机器上只有一个4.0rc的，所以应该就不是这个问题了。

前两天也懒得弄，今天又试了一把，发现还是这样。开始觉得可能是RubyMine生成的Project的设置的问题，所以就建了一个全新的项目，运行，成功，但是看到运行的是那个项目下/bin/rails这个，新建的项目有一个bin文件夹，文件夹里有Rails，Rake，Bundle，

	rails
	rake
	bundle

把这个bin文件夹复制到原先那个项目中，Bingo，就能在rubymine中开启server了。

但是，这也太傻了点吧，发现旧项目中没有就不会生成一个吗？还好意思卖那个价，虽然我是用2折的价钱买的。

Silly RubyMine!
