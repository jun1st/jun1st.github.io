---
layout: single
title: "kind_of? is_a? and instance_of?"
date: 2014-01-03 16:43:41 +0800
description: what’s the difference among kind_of?, is_a? and instance_of? in Ruby?
comments: true
categories: ruby
---

### kind_of? and is_a?
Ruby中判断一个Class是否是某一Class或者某一Class的子类，可以用<code>kind_of?</code>, <code>is_a?</code>。两个方法都可以用，那这两个方法有什么不同吗？

两个方法其实是同一个方法，只是**名字不同**而已。

>Returns true if class is the class of obj, or if class is one 	of the superclasses of obj or modules included in obj.

### instance_of?

<code>instance_of?</code>用来判断某个对象是不是某一个类的实例，必须是直接类，父类或者继承链上的module都会返回false

	class A;     end
	class B < A; end
	class C < B; end

	b = B.new
	b.instance_of? A   #=> false
	b.instance_of? B   #=> true
	b.instance_of? C   #=> false


_2014年第一篇，Happy New Year!_
