---
layout: single
title: try(), 让你的Rails代码更简洁
description: 想要写出简介的rails代码，试试try吧
date: 2014-04-19 18:51:45 +0800
comments: true
categories: rails
---

看看这样的代码？
```ruby
<% if current_user && current_user.is_admin? %>
	<%= do something %>
<% end%>
```

而事实上可以写成这样

```
 <% if current_user.try(:is_admin?) %>
 	<%= do something %>
 <% end%>
```

**当<code>current_user</code>为nil的时候，try不会抛出异常，而是返回nil**

多个try还可以链接调用

<code>current_user.try(:is_admin?).try(:home_address)</code>

传参数和block

```ruby
  current_user.try(:is_old_than?, 21)
  current_user.orders.try(:collect) { |p| p.order_id }
```
