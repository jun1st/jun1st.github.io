---
layout: single
title: "Rails Basic: Use of Acceptance"
categories: rails
excerpt: rails 中如何使用acceptance来生成checkbox，要求用户在注册时必须接受。
tags: rails web-basic
date: 2016-02-28T16:45:24+08:00
---

一个非常基本的功能是在用户注册的是时候，要求用户同意某个协议，实现也非常简单，一个checkbox就可以搞定，但是正因为很简单，有好多网站却做得不好。

常犯的错误有以下两个:

1.  只在前端验证
2.  没有设置相应的label

前者的问题显而易见的，后者的问题是必须点击checkbox才能选中，这个在手机上用起来使用性就很差。

### 看看Rails是怎么玩的？

在Model中，加入

```
validates_acceptance_of :terms_of_service
```

在View中，使用(假定你使用form helper method)

```
f.text_field :terms_of_service
```

That's it!

生成的html代码是标准的，验证实在服务器端完成的，All Good！ 而且不需要在数据里加入额外的列。

如果你model中，已经有column来存储这个值了，只需要使用 <code>accept</code>参数，

```
validates_acceptance_of :terms_of_service, accept: true, message: '必须接受'
```

越是简单的事情，越是要做正确！
