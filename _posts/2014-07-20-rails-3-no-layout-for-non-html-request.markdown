---
layout: single
title: Render No Layout Template for Non-Html Request
date: 2014-07-20 18:08:17 +0800
comments: true
categories: rails
---

在 Rails 应用中，action 的返回的render对象都会套用 layout。这对于普通的 html 请求和 json数据请求都没有问题。html请求需要layout，而 json 数据请求直接 render 数据，不会套用 layout，那么对于普通的 ajax 请求呢？

### destroy.js.erb?

对于普通的RJS请求，通常都不需要走layout，那么需要在每一个respond中设置吗？

```ruby
format.js { layout: false }
```

想要设置所有的rjs请求没有layout，可以把layout设置为一个 Proc。 设置基类的layout

```ruby
layout proc { |c| c.request.xhr? ? false : ‘application’ }
```




