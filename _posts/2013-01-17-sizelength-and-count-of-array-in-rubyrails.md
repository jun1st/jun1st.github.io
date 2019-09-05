---
layout: single
title: size, length and count of array in ruby/rails
description: "differences among size, length and count of array in ruby and rails"
categories: ruby
tags: [ruby,rails]
comments: true
---

Ruby/Rails 的 Array 有好几种获取元素个数的方法有好几个，Length, Size和Count。大多数时候这几个方法结果都一样，但是他们之间的区别其实是很大的，如果不搞清楚，到时很可能搞得你很头疼。

size 和 length 是完全一样的，都返回 Array 或者 Hash 中元素的个数，而 count 可以接受一个block作为参数。

但是在 ActiveRecord 中，区别就来了。size 考虑缓存，而count不会，他每次都会执行一个 sql count 语句。比如你的 Rails 代码中

	@subjects = Subject.includes(:users).all

在你的view中，你要获取每个subject下user的数目

	<%= subject.users.count %>
	<%= subject.users.size %>

这里区别就大了，如果你用的是count，那么你就制造了N+1查询问题了，查看你的log你就会看到很多条sql count记录。而如果你用size，或者length，你就不会有这个问题。原因就是因为count不考虑任何缓存，每次都执行一个count
.如果不清楚这个区别，那么就会疑惑明明已经做了eager loading了，为什么不起作用呢？而其实是用错了方法。



