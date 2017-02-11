---
layout: single
title: "用CSS禁用Link"
date: 2013-09-22 18:05
comments: true
categories: web
---

最简单的禁用页面上某个Link的方法？

***JavaScript***

```javascript
$('a.current-page').click(function() { return false; });
```

***CSS, better?***

```css
<a href="link.html" class="active">Link</a>
.active {
   pointer-events: none;
   cursor: default;
}
```
