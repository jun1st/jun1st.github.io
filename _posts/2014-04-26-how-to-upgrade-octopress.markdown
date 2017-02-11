---
layout: single
title: 如何更新升级Octopress
description: 如何更新升级Octopress源程序； How to upgrade octopuses sources
date: 2014-04-26 13:35:19 +0800
comments: true
categories: blog
---


为什么要更新？用着好好的。新版本可能会修正bug，提高性能；其实最重要的是，作为一个Geek，就是想要用最新版的而已。

### How

找到官方文档，[Updating Octopress](http://octopress.org/docs/updating/), 按照指示

```ruby updating octopress
	git pull octopress master     # Get the latest Octopress
     bundle install                # Keep gems updated
     rake update_source            # update the template's source
     rake update_style             # update the template's style
```

才执行第一句，就出错了

```bash error
	fatal: 'octopress' does not appear to be a git repository
	fatal: Could not read from remote repository.
```

什么情况？ 找不到名为Octopress的repository！ 按照官方的设置，标准的Octopress有两个Branch， 一个Source，一个Master, Source分支上有你的源文件；Master就是最终生成的站点文件。 确实找不到Octopress 仓库，^_^

### Add Remote Octopress Reository

<code>git remote add octopress https://github.com/imathis/octopress.git </code>

再执行官方文档给出的ruby语句，这下没问题了。



