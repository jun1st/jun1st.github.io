---
layout: single
title: "iOS App中自定义字体"
description: "如何在iOS中使用自定义字体，非iOS内置的"
date: 2013-07-29 14:23
comments: true
categories: iOS
---

iOS中提供的字体有限，不少新近出来的好看的字体都没有。但其实要使用这些新字体不仅可能，而且挺简单。

把字体文件拖进iOS项目中，这个字体文件需要是.otf的，就是open type font, 然后在info.plist文件中添加一项：

	Fonts provided by application
		Item 0						"Signika-regular.otf"


这里填写的是字体文件的全名。

然后给UITextView或者UITextEdit设置字体

	[self.textEdit setFont:[UIFont fontWithName:@"Signika" size:20.0f]];


需要Clean Build一下项目，如果在真机上调试，可能还需要把App删了再装才能看到效果。
