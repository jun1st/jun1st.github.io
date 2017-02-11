---
layout: single
title: 在多台电脑上保持Octopress博客的同步
description: 使用Octopress在Github Pages上建博客，根据Octopress官网的介绍建立好博客后，想在另一台电脑上写文章时，如何设置？
date: 2014-02-05 22:10:26 +0800
comments: true
categories: blog, web
---

使用Octopress在Github Pages上建博客，根据Octopress官网的介绍建立好博客后，想在另一台电脑上写文章时，如何设置？

按照官网的介绍再来一遍会把已经发不到Pages上的全部删掉。当然可以把已经有的文章copy下来，再发遍就是了。但是这么个搞法，起初的那台机器就又不行了！肯定会有更好的解决方法

### Octopress项目结构
其实整个Octopress项目无非是一个git文件夹，只是他借用了git的branch功能。

整个project的源文件在source的分支上，编译后的_deploy在master分支上，而Pages会读取master分支上的，因此打开username.github.io看到的是和本地预览时看到的一样的，而不是一堆源文件。

### 完全复制项目
既然是一个git项目，那就可以整个克隆下来，只不过是要克隆两次。首先克隆source分支。

<code>git clone -b source git@github.com:jun1st/jun1st.github.io.git</code>

再克隆master分支，master分支默认的文件夹路径是_deploy

<code>git clone git@github.com:jun1st/jun1st.github.io.git _deploy</code>

就这么简单
PS: 这里的路劲是我的项目的地址，别一起复制了:)

之前解决这个问题的时候，就想写这篇的，又觉得太简单就算了。今天不知道怎么搞的，pro上的项目又乱了，又弄了一次，也就写了，做个记录。
