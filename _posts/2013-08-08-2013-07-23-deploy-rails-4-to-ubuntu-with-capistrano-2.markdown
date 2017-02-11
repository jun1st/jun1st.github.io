---
layout: single
title: "deploy-rails-4-to-ubuntu-with-capistrano-2"
description: 在配置好服务器之后，如何配置capistrano来发布你的rails app
date: 2013-08-08 16:06
comments: true
categories: rails
---
[上篇](http://fengqijun.me/rails/2013/07/23/deploy-rails-4-to-ubuntu-with-capistrano-1/)说了Server的设置，本篇说一下程序的设置。

首先是安装Capistrano这个Gem，在Gemfile文件中添加

```ruby gemfile
group :development do
    gem 'capistrano'
end
```

只有Development环境需要这个Gem，<code>bundle install</code>

然后在你项目的Root目录里执行

```ruby
bundle install
```

在/Config目录下就会有deploy.rb文件进行Capistrano的配置

首先设置App的名字和Repository的地址

```ruby
set :application, "Your application's name"
set :repository, "git@github.com:your-username/your-repository-name.git"
```

设置Server上的部署路径

```ruby
set :deploy_to, "/path/to/your/app"
```

设置代码管理的类型和分之

```ruby
set :scm, :git
set :branch, "master"
```

设置部署用户和权限

```ruby
set :user, "deployer"
set :use_sudo, false
```

和其它一些基本的设置

```ruby
set :rails_env, "production"
set :deploy_via, :copy
set :ssh_options, { :forward_agent => true }
default_run_options[:pty] = true
server "your server ip address", :app, :web, :db, :primary => true
```

在执行部署之前，Capistrano可以先检查和配置你的server环境和权限

```ruby
cap deploy:setup
```

这个命令应该会在你server的"/path/to/your/app"目录下建立三个文件夹

```ruby
/path/to/your/app/current
/path/to/your/app/shared
/path/to/your/app/releases
```

如果这三个文件夹建立没有问题，而且文件夹所有者是deployer，那么配置就基本没有问题，再执行

```ruby
cap deploy:check
```

应该会提示权限没有问题。

最后可以执行<code>cap deploy</code>


PS:
PreCompile Assets

```ruby
load 'deploy/assets'
```




