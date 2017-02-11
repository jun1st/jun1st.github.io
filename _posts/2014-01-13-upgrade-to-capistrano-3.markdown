---
layout: single
title: "升级到Capistrano 3"
description: 升级Capistrano到最新的版本3，Capistrano3较之于2的变化还是很大的
date: 2014-01-13 14:56:44 +0800
comments: true
categories: rails
---

最近开始把Rails项目中用到的Capistrano升级到3，发现这个变化有点大，第一次尝试的时候发现一堆的错误，因为急于发布，只要退回到版本2了。之后开始慢慢搜集网上关于新版本的变化和设置，做升级准备。

### 更新Gemfile
读一下官方的升级文档，也许没有兴趣全部读完（比如我），但是扫一遍还是很有必要的。

```
group :development do
  gem 'capistrano'
  gem 'capistrano-rbenv', github: "capistrano/rbenv"
  gem 'capistrano-rails', '~> 1.1.0'
end
```

然后<code>bundle install</code>

### 修改Capfile
这个文件的变化是比较大的，如果升级了Gem没有改这个文件，那执行时第一句可能出错了。

```
# Load DSL and Setup Up Stages
require 'capistrano/setup'
# Includes default deployment tasks
require 'capistrano/deploy'
require 'capistrano/bundler'
require 'capistrano/rails/assets'
require 'capistrano/rails/migrations'

# Loads custom tasks from `lib/capistrano/tasks' if you have any defined.
Dir.glob('lib/capistrano/tasks/*.cap').each { |r| import r }
```

### 配置config/deploy/production.rb

在Capistrano 2中，指定Server时不需要设置User，但是在3中就必须指定使用的User了。

```
set :user, 'deployer'
set :stage, :production
server ‘server_address’, user: 'deployer', roles: %w{web app db}
```

官方的文档虽然很不完整，还是不读是肯定升级不了的。
