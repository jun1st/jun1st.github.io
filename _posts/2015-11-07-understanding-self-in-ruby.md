---
layout: single
title: 理解Ruby中得Self
date: 2015-10-05 21:00:00 +0800
keywords: ruby, self
description: 理解了Ruby中得self，你才能真正开始了解Ruby。
categories: ruby
comments: true
draft: false
---

### 什么是Self？

所有关于Ruby的书中都说，在Ruby中一切都是对象。 那么，写的每一段代码，都必须属于某一个对象，这个对象就是<code>self</code>

self 是一个特殊的变量，他指向当前执行的代码的所有者。 下列情况都会用到 self,

1. 对象变量: @myvar
2. 方法和常亮查找的时候
3. 定义方法，类和moudule的时候

来看看几个例子

### 实例方法内的self

一个instance method内的self，

```
class Demo
	def print
		self
	end
end

d = Demo.new
g.print == g    #=> true

```

在一个实例方法内，self 指向这个实例。


### 一个类或者Module方法内的self

```
class Demo
	def self.print
		self
	end
end

Demo.print == Demo  #=> true

```

类方法内的self 指向定义的类。

```
module DemoModule
	def self.print
		self
	end
end

DemoModule.print == DemoModule  #=> true

```

### MetaClass/SingletonClass/EigenClass 内的方法

你应该在很多库里见过这样的方法

```
class Demo
	class << self
		def method1
		end

		def method2
		end
	end
end
```

如果你使用<code>class << some_instance</code> 这样的方式打开某个instance，在这个block内，self指向这个instance的metaclass.

```
class << "test"
	puts self.inspect
end

#=> #<Class:#<String:0x007fd86a8de4c0>>

```

### 不在任何类内

如果不在任何的类内，self 指向 "main", Ojbect的实例对象.

```
self   #=> main
self.class #= Object
```

这篇讲了self的各种情况，下一篇再讲一下为什么self是这样的




