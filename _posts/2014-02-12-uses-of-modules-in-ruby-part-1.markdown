---
layout: single
title: uses of modules in ruby part 1
description: Modules are part of what makes Ruby’s design beautiful.
date: 2014-02-12 11:45:48 +0800
comments: true
categories: ruby
---

Module在Ruby中扮演着至关重要的角色，如果你从是Java或者C#背景转到Ruby来的，一开始你通常会忽视掉Module的重要性。直到你深入学习Ruby，你才会发现Module有多么重要


###  作为命名空间
作为命名空间这个功能十分好理解，模块嘛！ 比如你创建一个<code>Document</code>的类，由于Document这个字非常常见，因此别人也使用它作为类名的概率不低。

如果碰到这种情况，那就苦逼了。由于Ruby对于Class的定义方式，Ruby检测到两处定义同一个Class并不认为有问题，而是把两个类的定义合并（Monkey Patch就是这么实现的）。如果遇到同样的方法或字段，后定义的会覆盖前面的。


### 用作MixIn
Module可以被用来代替Monkey Patch, 以mixin的方式给类定义增加方法

```ruby include module
class Computation
	include Comparable
end
```
通过Include Comparable这个module，Computation类定义就有了Comparable的各个比较方法，<code><, <=, >, >=, ==</code>等。 Computation类的实例也就有了这些比较方法。

当把include一个module到一个类定义中时，ruby会把这个module加入到这个类的class chain上，比如

```ruby include module: added to class chain
module A
end

class AClass
	include A
end

AClass.ancestors => [AClass, A, Object, Kernel, BasicObject]
```
所以，所有AClass的实例都会有Module A中的方法。

除了include, 还有extend

```ruby extend module
class Computation
	extend Comparable
end
```
通过extend来扩展Computation本身(类对象本身），由于Computation类本身也是一个对象，通过extend扩展的方法会增加到这个对象上，而不是Computation作为类定义上，因此Computation本身有<code><, <=, >, >=, ==</code>这些方法，而Computation的实例对象没有。

不同于include，extend的module不会被加到类的class chain上。

Module还有一些更复杂的使用方法，比如模拟Singleton模式，下回介绍




