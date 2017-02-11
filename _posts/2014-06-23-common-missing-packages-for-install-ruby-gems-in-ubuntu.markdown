---
layout: single
title: Common Missing Packages for Installing Ruby Gems on Ubuntu
description: 在Ubuntu上安装Gems，经常会碰到的缺少的linux的包。curb, gmagick, mysql2
keywords: curb, gmagick, mysql2
date: 2014-06-23 23:23:23 +0800
comments: true
categories: rails
---

### Gem Install Curb

```
sudo apt-get install libcurl4-openssl-dev
or
sudo apt-get install libcurl4-gnutls-dev
```

### Gem Install RMagick

```
sudo apt-get install imagemagick libmagickwand-dev
```

### Gem Install Mysql2

```
sudo apt-get install libmysql-ruby libmysqlclient-dev
```
