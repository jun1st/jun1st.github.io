---
layout: single
title: "从Wordpress迁移到Jekyll"
description: "moved from amazon ec2 to linode, and change blog engine from wordpress to jekyll"
categories: blog
tags: [wordpress, Jekyll]
---

时间真的过得很快，Amazon一年的AWS Free Tier马上就要到期了，再用就要付费了；如果我现在还在上班的话，我很乐意付费，毕竟免费的用了这么久。而且，Amazon在东京的EC2最便宜的也要60$一个月，比Linode贵多了，Linode现在最便宜的只要20$一个月，在现在只有出，没有入的时段，40$也是需要精打细算的。

在使用Wordpress时，一直久觉得这个东西太笨重，虽然功能很全，但是对于本身就是开发人员的使用者来说，太过复杂了，写一片博文，最快的无疑就是使用Markdown了，如果你不会Markdown，那么我建议你好好的学一下，它对于文字工作者也是一把利器。

使用了一年的EC2， 对于在Linode上建立一个服务器这个事情，已经是驾轻就熟了，几分钟久搞定。

搬迁的整个过程还是挺复杂的，把文章从Wordpress转成Jekyll格式的，这个很简单，网上一搜一大把，复杂的是如何把图片搬到新的地方，同时更新文章中的连接

如果你是程序员，你就不会手动的来做，而一定是写一个程序来完成这个时间。如果你的文章不多，或者图片更少，也许手动更新更快，但是程序员是又懒又坦言重复劳动的人，

下面的这个Gist, 首先从旧的博文里提取出来图片链接，然后保存到本地，按日期分组，再把旧的链接更新为新的地址。
<script src="https://gist.github.com/4089285.js"> </script>
