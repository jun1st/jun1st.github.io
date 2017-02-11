---
layout: single
title: "Hadoop Sample WordCount's Issue"
description: "hadoop sample wordcount.java has an issue. Although it's just a warning when you run it, it'll eventually canuse failure"
categories: hadoop
tags: [cloud,hadoop,wordcount]
---

Hadoop提供的例子WordCount.java很简单，但是在hadoop版本为1.0.4上跑确有问题，在运行时会提示：

> No job jar file set.  User classes may not be found. See JobConf(Class) or  JobConf#setJar(String).

提示貌似明确，实则需要Google。其实只要加一句代码就行

	job.setJarByClass(WordCount.class);


再试试！

