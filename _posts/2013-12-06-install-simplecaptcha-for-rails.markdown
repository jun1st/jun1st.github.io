---
layout: single
title: "Install SimpleCaptcha for Rails"
description: "use simple captcha in rails. "
date: 2013-12-06 12:09
comments: true
categories: rails
---

在Rails中用SimpleCaptcha，安装有什么好说的，不就是在Gemfile中添加

	gem "galetahub-simple_captcha", :require => "simple_captcha"

是的！

但是这样装完用不了。

如果你碰到这样的错误信息

>Error while running convert: sh: convert: command not found

说明你缺少<code>ImageMagick</code>

如果你看到这个错误信息

>Error while running convert: convert: unable to read font `/usr/local/share/ghostscript/fonts...

你缺少<code>ghostscript</code>

安装这两个最简单的就是<code>Brew</code>

```sh
brew install imagemagick
brew install ghostscript
```

