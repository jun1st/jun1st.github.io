---
layout: single
title: Use Pow to Rackup Your Rails in Development
date: 2013-11-04 16:23
description: 在开发中，用Pow来启动你的Rails。
comments: true
categories: rails
---

[Pow](http://pow.cx)是37Signals出品的来启动Rails的App。不用不知道，用过的都说好！

在习惯了用<code>rails s</code>来启动WEBrick之后，开始时觉得方便，但是慢慢的就觉得这个好麻烦，每次开Server都要跑到Terminal去执行；我想37Signals的人肯定也是觉得这个步骤太繁琐了，所以就写了个Pow。

__安装Pow__

可以用Homebrew安装

    brew install pow

也可以用Pow提供的脚本

    curl get.pow.cx | sh

要让Pow来启动你的App，只要在Pow下面建立一个symbolic link就可以了。 我用脚本安装的，在~目录下有一个.pow的文件夹，

    cd ~/.pow
    ln -s /path/to/myapp

只有在浏览器中<code>http://myapp.dev</code>就能访问你的site了。

如果site能打开了，那么恭喜你了。如果你打开不了，查看一下这个[TroubleShooting](https://github.com/37signals/pow/wiki/Troubleshooting)wiki，基本上都能找到你的问题。

当中一个常见的问题就是Pow用的是系统的ruby，而不是rbenv/rvm管理的ruby，因此需要给pow指定ruby。在<code>~</code>目录下建一个<code>.powconfig</code>,修改PATH(以rbenv为例)

    export PATH="$HOME/.rbenv/shims:$HOME/.rbenv/bin:$PATH"

ps: 遇到一个比较诡异的问题，我要把我项目下的.ruby-version文件删掉Pow才起得来

更方便的是，还有mac app可以来管理pow，[Anvil](http://anvilformac.com)这个精致小巧的app管理起来十分方便。

![Anvil](http://cdn.getforge.com/anvilformac.com/1381460495/assets/images/screenshot.png)

