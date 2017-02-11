---
layout: single
title: Sandi Metz's 的 Ruby 规则
date: 2015-08-14 21:00:00 +0800
categories: ruby
comments: true
description: Sandi Metz的ruby规则
draft: true
image: null
---

谁是Sandi Metz？ 她是 Pratical Object-Oriented Design in Ruby 的作者， 她的[个人主页](http://www.sandimetz.com)

## 四条规则

* 一个类的总代码行数不能超过100行
* 方法的代码行数不能超过5行
* 方法的参数不多于四个
* 控制器只能实例化一个类。因此，视图只能知道一个实例变量，而且只能调用这个实例的实例变量和方法


## 何时可以打破这些规则呢

当你有足够的理由时！（废话了）


### 100行的类

关注，关注，关注 [单一职责](http://c2.com/cgi/wiki?SingleResponsibilityPrinciple) 原则。

### 5行的方法

<code>if</code>, <code>else</code>, <code>end</code> 都算在内

这个五行的规则限制了我们不能同时使用<code>else</code>,<code> elseif</code>.  同时要求我们写出命名良好的私有方法。 命名良好的私有方法还是非常好的文档。

### 最多四个参数

这一规则对于很多View helpers中的方法是不适用的，比如<code>link_to</code>, <code>form_for</code>, 这些方法都需要好多个参数才正确。因此，在这个时候，做到尽可能烧的参数吧


### 控制器中只实例化一个类

这个规则听起来不现实，例如一个Dashboard页面，怎么可能只实例化一个类呢？

其实可以用 [Facade Pattern](http://c2.com/cgi/wiki?FacadePattern),  例如

```ruby
class Dashboard
  def initialize(user)
    @user = user
  end

  def new_status
    @new_status ||= Status.new
  end

  def statuses
    Status.for(user)
  end

  def notifications
    @notifications ||= user.notifications
  end

  private

  attr_reader :user
end
```

然后在<code>dashboard_controller.rb</code>中，

```ruby
class DashboardsController < ApplicationController
  before_filter :authorize

  def show
    @dashboard = Dashboard.new(current_user)
  end
end
```


### 总结
在实际项目中应用这些规则，必然会带来很多的限制和纠结，但是使用下来后会发现代码的可读性会提高很多。


[原文链接](https://robots.thoughtbot.com/sandi-metz-rules-for-developers)
