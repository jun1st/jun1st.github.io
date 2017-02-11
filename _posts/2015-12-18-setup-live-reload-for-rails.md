---
layout: single
title: 给Rails配置LiveReload
date: 2015-12-18 21:00:00 +0800
keywords: rails, rack, guard, livereload
description: 当有资源文件更改，或者代码更改的时候，自动刷新浏览器，提高开发速度
categories: rails
comments: true
draft: false
---

### 安装相关Gems

在Gem文件中添加 <code>rack-livereload</code> 和 <code>guard-livereload'

```ruby
group :development do
  gem 'rack-livereload'
  gem 'guard-livereload', require: false
end
```

执行bundle install安装，并且执行bundle binstub guard.


### 配置Rails

把<code>rack-livereload</code>加到rails的middileware中。

```ruby
# config/environments/development.rb

Rails.application.configure do
  config.middleware.use(Rack::LiveReload, source: :vendored)
end

```

重启Rails， 前端应该能看到有加载<code>livereload.js</code>。 在console中你会看到livereload会尝试连接websocket, 端口35729,  但是出错。 这就来fix


### 配置Guard

配置Guard来监视views，assets文件的改动。

执行<code> bundle exec guard init</code> 来生成配置文件， 会在主目录下生成一个名为Guardfile的文件，

默认生成的配置文件已经基本够用，如果有别的需求，直接修改这个配置文件就好了。

之前在第一部分中执行了<code>bundle binstub guard</code>, 在bin目录下安装了guard， 这时执行<code>bin/guard</code>, guard服务就跑起来了，这时再刷新网页看下，livereload 产生的错误应该不在出现了。

### LiveReload

这时修改css，或者别的配置了guard的文件，稍等一下就会看到浏览器自动刷新了。如果你有两个显示器，开发效率将会大大提高了。




