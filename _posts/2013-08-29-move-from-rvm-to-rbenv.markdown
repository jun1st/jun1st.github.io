---
layout: single
title: "move from rvm to rbenv"
date: 2013-08-29 09:47
comments: true
categories: ruby
---
一直都在用RVM，虽然网上一直抱怨说RVM太Invasive了，太繁重;但是我一直用得挺顺手，也挺方便，就没有换它的冲动。直到最近因为项目的需要，别人都用rbenv，为了避免造成什么配置问题，就准备换rbenv了。

###删除RVM###

清除所有RVM的安装记录
```ruby
rvm implode
```
然后根据提示删除.rvm文件夹和.bash_profile或者.zshrc文件中关于rvm的配置

###安装rbenv###
__通过Homebrew安装rbenv__

```ruby install through homebrew
brew update
brew install rbenv
brew install ruby-build
```

__添加rbenv到Path中__

```
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.zshrc
```

__添加init到shell中__

```
echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
```

__通过ruby-build安装ruby__

```ruby
rbenv install 2.0.0-p247
rbenv rehash
```

__设置Global（默认）Ruby版本__

```ruby
rbenv global 2.0.0-p247
```

__使用specific版本的ruby__

```ruby
rbenv local 1.9.3-p327
```

这一命令会在当前目录下生成一个.ruby-version文件，里面会有使用的ruby的版本号。

