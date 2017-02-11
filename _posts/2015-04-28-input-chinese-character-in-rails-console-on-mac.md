---
layout: single
title: Mac上在Rails Console中输入中文
date: 2015-04-29 21:00:00 +0800
categories: rails
comments: true
image: null
---

Rails的Console中默认是不支持输入中文的, 原因是OS X默认使用[editline](http://thrysoee.dk/editline/), 而不是[redline](http://cnswww.cns.cwru.edu/php/chet/readline/rltop.html), 因此ruby在编译的时候时使用了editline. 因此在使用rbenv安装ruby时，如果你的rails console不支持输入中文，就是这个原因。


____如果你使用rbenv, 装个rbenv的插件就可以


```bash
git clone git://github.com/tpope/rbenv-readline.git ~/.rbenv/plugins/rbenv-readline
```


重新编译，安装Ruby，就OK了.
