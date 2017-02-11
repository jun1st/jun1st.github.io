---
layout: single
title: Compile Nginx with Page Speed Module
date: 2014-08-04 19:18:37 +0800
comments: true
description: 从源码编译Nginx，同时包括模块Google Page Speed, Header More, Naxsi.
categories: server
---

### 要安装的几个模块

- SPDY: Nginx实验性的支持SPDY, 但是默认是不开启的，只要开启就好
- Google Page Speed: 主要目的，Page Speed模块自动提供各种’压缩和优化，提高网站的性能
- Headers More: 自定义Server信息
- Naxsi: 提供防火墙功能。

开始前安装几个会用到的工具包

```bash
sudo apt-get install gcc-c++ pcre-dev pcre-devel zlib-devel make
```

### 安装
安装PageSpeed可以参考 Google 的 [Page Speed](https://developers.google.com/speed/pagespeed/module/build_ngx_pagespeed_from_source) 安装指南,

nginx的版本是1.6.0， <code>cd nginx-1.6.0</code>, 下载[headers more](https://github.com/openresty/headers-more-nginx-module/)和[naxsi](https://github.com/nbs-system/naxsi)

在nginx目录里，下载解压，然后<code>configure</code>

有一点要注意，Naxsi的Wiki页面里提到，由于NGINX会根据module申明的顺序来排序，所以Naxsi需要排在第一位，不然可能会出现不可预知的错误

 >NGINX will decide the order of modules according the order of the module's  directive in nginx's ./configure. So, no matter what (except you really know what you are doing) put naxsi first in your ./configure. If you don't do so, you might run into various problems, from random / unpredictable behaviors to non-effective WAF.

<script src="https://gist.github.com/jun1st/387dfec51d2515f561ea.js"></script>

PS: 注意修改<code>NPS_VERSION</code>

编译，安装
```bash
make
sudo make install
```


### 随系统自动启动Nginx

可以使用这个[init.sh](https://gist.github.com/jun1st/4773d57bc5cfae836c66)
