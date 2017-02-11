---
layout: single
title: Capistrano 3中配置unicorn和whenever 的Task
description: 在capistrano 3中建立单独的task来重新启动unicorn和更新crontab
date: 2014-01-22 11:26:39 +0800
comments: true
categories: rails
---

升级到Capistrano 3之后，之前配置的重启Unicorn等的脚本都不行了，StackOverflow上一堆解决方案就是不要升级，继续用2.x版本。顺便吐槽下SO的问题和答案的质量越来越低了

### 配置Unicorn的Task
<script src="https://gist.github.com/jun1st/8553105.js"></script>

### 配置Whenever的Task
<script src="https://gist.github.com/jun1st/8553203.js"></script>


### 在deploy.rb中配置用到的参数，调用Task

```ruby deploy.rb
set :whenever_identifier, ->{ "#{fetch(:application)}_#{fetch(:stage)}"}
namespace :deploy do
  desc 'Restart application'
  task :restart do
    invoke 'unicorn:restart'
    invoke 'update_crontab'
  end
  after :finishing, 'deploy:cleanup'
end
```
