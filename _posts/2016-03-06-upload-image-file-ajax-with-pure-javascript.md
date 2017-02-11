---
layout: single
title: "Upload Image or File Ajaxly with Pure Javascript"
categories: javascript
excerpt: Ajax上传文件或者图片，不用jQuery, 不用任何第三方插件
tags: [web ajax javascript]
date: 2016-03-06T16:45:24+08:00
---

随着Web技术的不断发展，XMLHttpRequest的进度和浏览器的支持，现在已经可以用用Ajax的方式实现图片/文件的上传，不需要任何插件或者库了。

### 用`FormData`来实现上传FormData

```
$input = $('input[type=file]')[0]
if $input.files.length > 0
	formData = new FormData()
	formData.append('image[url]', $input.files[0])
	$.ajax(
	    url: 'URL',
	    data: formData,
	    cache: false,
	    contentType: false,
	    processData: false,
	    type: 'POST',
	    beforeSend: ->
	    success: ->
	  )
```

例子还是用`jQuery`来实现ajax请求，其中的设置很重要，

```
contentType: false
processData: false
```

这两个设置，不能忘掉

### 兼容性？

这个API的兼容性怎么样？ 已经很好了，除了IE8，9，10，其它基本都支持， 可以看这里: [http://caniuse.com/#search=FormData](http://caniuse.com/#search=FormData)

试试？
