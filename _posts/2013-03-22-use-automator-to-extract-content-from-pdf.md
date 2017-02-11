---
layout: single
title: "用Automator提取PDF文件内容"
description: "use automator to extract content from pdf on mac. 用automator提取pdf文件的内容"
categories: mac
tags: [mac,osx,automator,pdf]
---

Automator这个东西，大多数时候不用，但是等真用到时候它功能可是无比强大的，比如轻易的就能把一个pdf文件内容提取为.txt文件文件或者.rtf的富文本文件

首先是要建立一个workflow，如图
![step 1: create workflow](http://images.fengqijun.me/2013-03/step1.png)

第二步是在Library中选择**File & Folders**, 然后把Ask for Finder Items拖到右边在窗口里
![step 2: ask for library item](http://images.fengqijun.me/2013-03/step2.png)

第三步在Library中选择**PDFs**, 把Extract PDF Text拖到右边的窗口里，
![step 3: extract from pdf](http://images.fengqijun.me/2013-03/step3.png)


在Output里还可以设置输入文件的格式，txt or rtf, 把它保存为workflow就搞定了。
