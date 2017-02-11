---
layout: single
title: "清理重复的Open With选项"
description: "清理重复的open with选项，通过命令行，也可以通过创建一个alfred的workflow"
categories: mac
tags: [terminal,open with,alfred, workflow]
---
Mac用得越久，第一感觉是越用越顺手，各种快捷键，命令行，啪啪啪，事情就搞定了。但是同时不可避免的也会产生很多垃圾，比如你的Open With, 下面是我用了没多久的新rmbp的选项：

<img src="http://images.fengqijun.me/2013-03/before_clean.png" alt="duplicates open with" style="width: 400px;"/>

目前只有一个重复的"Evernote"，但是慢慢的就会越来越多，多到你会想办法来解决这个问题为止。

###通过Command来搞定###
Mac上几乎所有系统问题都可以用shell command来搞定。要清除重复的command, 可以执行下面的命令
<script src="https://gist.github.com/jun1st/5275517.js"></script>

每次都要copy上面的命令到Terminal麻烦吗？麻烦，那就创建一个alias吧。 把下面这段script添加到你的<code>.bash_profile</code>里

<script src="https://gist.github.com/jun1st/5275515.js"></script>
以后只要在<code>terminal</code>里执行<code>clearow</code>就搞定了。

###通过Alfred workflow###
你用Alfred吗？大多数mac用户应该都用，不过有没有买powerpack来激活workflow就另说了。如果你买了powerpack，那就恭喜你，下载[这个](http://images.fengqijun.me/2013-03/Clear\ Duplicates\ Open\ With\ Options.alfredworkflow),把它倒入Alfred，就可以通过Alfred来执行了，执行完了还会有系统Notification

用Alfred调出Command,

<img src="http://images.fengqijun.me/2013-03/call-cleanow.png" alt="Call Clean" style="width: 400px;"/>

“Enter”执行，执行完系统通知，

<img src="http://images.fengqijun.me/2013-03/cleaned_notification.png" alt="Cleaned" style="width: 400px;"/>


