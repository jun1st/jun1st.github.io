---
layout: single
title: "ruby bang methods in rails seed"
description: "using bang methods in rails seeds file"
categories: ruby
tags: [ruby,method]
---
Ruby中的有所谓的Bang Method,就是方法名称后有!的，比如capitalize!

> Methods that include an exclamation point, such as capitalize are known as dangerous methods. In Ruby speak, that means they will modify the object it’s called on

但是在Rails ActiveRecord中，Bang方法还会抛出异常，而不是返回true/false, 比如save!

但是今天要说的是另外一种情况，就是在Rails的seed文件中，在production环境下，我执行<code>rake db:seed</code> 始终出现第一条纪录，

	City.create(name: 'Chicago')
	City.create(name: 'Copenhagen')

没有任何提示，也没有任何异常。直到我使用对应的bang方法，才正确执行，

	City.create!(name: 'Chicago')
	City.create!(name: 'Copenhagen')


不清楚为什么，也许是因为production环境？
