---
layout: single
title: 在 Sublime Text 里运行 Javascript
author: fengd
excerpt: 配置 Sublime Text 的 build 系统，直接在 Sublime Text 里运行 Javascript 代码
tags: sublime-text javascript console
date: 2017-03-06T15:45:24+08:00
header:
  image: /assets/images/default-header.jpg
---

想要在 Sublime Text 直接运行 Javascript 代码吗？ 那就来对地方了。

Sublime Text 3 可以自定义 Build 系统， `Tools -> Build System -> New Build System', 新建一个文件，命名为 Javascript.sublime-build, 输入如下内容:

```javascript

{
  "cmd": ["/usr/local/bin/node", "$file"],
  "selector": "source.js"
}

```

这里的 cmd 是 nodejs 的路径，如果没有安装，就需要安装一下，如果不确定路径，在 mac OS 上可以通过 `which node` 来查找，windows 上通过 `where node` 查找

保存这个文件即可。

来试验下，新建一个 js 文件，保存，然后按下 cmd + B，

<img src="/assets/images/posts/js-console.jpg" width="556px" title="console 结果" >

如果没有出来，检查一下 Tools -> Build System 是否选中了 Automatic 或者 Javascript。








