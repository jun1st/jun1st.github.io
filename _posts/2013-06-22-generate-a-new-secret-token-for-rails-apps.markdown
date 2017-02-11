---
layout: single
title: "Generate a New Secret Token for Rails Apps"
date: 2013-06-22 12:59
description: 生成新的安全密钥，Secret Token
comments: true
categories: [rails]
---

在把我的Rails程序升级到4.0rc1之后，需要设置一个secret_key_base。这个key的是用来加密你的cookie的，
>Rails 4.0 introduces ActiveSupport::KeyGenerator and uses this as a base from which to generate and verify signed cookies (among other things).

具体的解释，看[官方文档](http://edgeguides.rubyonrails.org/upgrading_ruby_on_rails.html#action-pack)

生成一个key非常简单，
``` ruby secret token uisng ruby
irb #进入irb
require 'securerandom'
SecureRandom.hex(64)
```

还有更简单的，在Rail程序的目录里
``` ruby generate a secret token using rake
rake secret
```
