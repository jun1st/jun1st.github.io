---
layout: single
title: jQuery检测网页元素是否在当前视窗内
date: 2015-03-05 22:00:00 +0800
comments: true
categories: javascript
image: null
---

检测的关键是<code>getBoundingClientRect</code>这个方法，这个方法jQuery之父[John Resig在2008年就用在jQuery的代码中了](http://ejohn.org/blog/getboundingclientrect-is-awesome/)

###检查元素是否全部在视窗内

```javascript
  $.fn.isInsideViewport = () ->
    # special bonus for those using jQuery
    el = this
    if this == undefined
      return
    if (typeof jQuery == "function" && el instanceof jQuery)
        el = el[0];

    rect = el.getBoundingClientRect();

    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
```

###检测元素是否有任何一部分在视窗内

```javascript
  $.fn.isInViewport = () ->
    if this == undefined
      return
    el = this
    if (typeof jQuery == "function" && el instanceof jQuery)
        el = el[0];

    rect = el.getBoundingClientRect()
    html = document.documentElement

    rect.bottom >= 0 &&
      rect.right >= 0 &&
      rect.top <= html.clientHeight &&
      rect.left <= html.clientWidth
```
