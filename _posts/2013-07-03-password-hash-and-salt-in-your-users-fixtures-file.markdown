---
layout: single
title: "Password Hash and Salt in Your Users Fixtures File"
date: 2013-07-03 17:03
description: "在Fixtures中生成Hash和Salt来测试用户登录"
comments: true
categories: [rails,testing]
---

在Rails中进行测试时，可以使用fixtures来构建测试数据，Fixtures会把对应的Yaml文件加在到测试数据库中方便测试。

昨天在测试password验证时碰到个问题，因为数据库中存的是Hash和Salt，那我要如何在对应的users.yml文件中来生成这些hash和salt呢？其实yml文件支持erb表达式的。

``` ruby generate hash and salt in yaml files
<% require 'digest/md5' %>
<% SALT = BCrypt::Engine.generate_salt unless defined? SALT %>
one:
  name: user1
  email: jun1st@live.com
  password_salt: <%= SALT %>
  password_hash: <%= BCrypt::Engine.hash_secret('ABCD1234a', SALT) %>
```


