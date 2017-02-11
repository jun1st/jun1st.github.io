---
layout: single
title: "Rails的fragment cache和content_for"
description: 如何利用Rails的fragment cache和content_for, 两者的区别以及如何配合使用
date: 2013-10-12 12:04
comments: true
categories: rails
---


对于任何一个网站来说，做好Cache都是一件非常重要的事情。作为以高生产力为口号的Ruby on Rails自然是提供了很方便的Cache机制。比如fragment cache, 可以用来cache一段页面代码，结合<code>content_for</code>, 那就更是顺手拈来了。但是前提是你真的了解<code>content_for</code>的机制。

看这段代码
```ruby cache and content for #wrong
<% cache 'store_sidebar', :expire_in => 1.hour do %>
	<% content_for :sidebar do %>
		<div id="store_sidebar">
			<%= render partial: 'tags', locals: { tags: @ebook_tags } %>
		</div>
	<% end %>
<% end %>
```

在development环境中运行的好好的，发到production就发现cache的内容都是空。 why?

一个原因是development环境中cache机制默认是关闭的，And you are too confident and assume it will work on prodtion too, right?

另一个原因就是你不是真的理解了content_for。 [API文档](http://apidock.com/rails/ActionView/Helpers/CaptureHelper/content_for)写着

	Calling content_for stores a block of markup in an identifier for later use. You can make subsequent calls to the stored content in other templates, helper modules or the layout by passing the identifier as an argument to content_for.

So, <code>content_for</code>会把内部的内容存到一个标识中，而 <code><% %></code>语句不生成任何内容，因此你缓存是空对象，什么都没有。

所以，正确的顺序应该是把cache放到<code>content_for</code>内部

```ruby cache content_for
<% content_for :sidebar do %>
	<% cache 'store_sidebar', :expire_in => 1.hour do %>
		<div id="store_sidebar">
			<%= render partial: 'tags', locals: { tags: @ebook_tags } %>
		</div>
	<% end %>
<% end %>

最后，Test it！
