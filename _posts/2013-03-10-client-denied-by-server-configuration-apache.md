---
layout: single
title: "Apache下网站文件夹的权限设置"
description: "set up accessiblity of website folder under apache"
categories: apache
tags: [apache,folder,security]
---
权限设置永远是让人头疼的事情，昨天想在Apache下直接见一个vhost，把它mapping到非Apache DocumentRoot下的一个文件夹，结果一直给这个错误
>client denied by server configuration

搞的稍微有点郁闷，Google到的东西也很多不靠谱，直到在[Apache官网](http://wiki.apache.org/httpd/ClientDeniedByServerConfiguration?highlight=%28Client%29%7C%28denied%29%7C%28by%29%7C%28server%29%7C%28configuration%29)上看到

* The default Apache config includes Deny from all in the &lt;Directory&gt; block the DocumentRoot - this must be changed to allow access!
* If you change the DocumentRoot, you will need to change the &lt;Directory&gt; block referring the old root, to the refer to the new root
* You need a &lt;Directory&gt; block for every folder outside of your DocumentRoot, i.e. your cgi-bin folder.
* You need a &lt;Directory&gt; or &lt;Location&gt; block for every Alias.
* You need a &lt;Location&gt; or &lt;Proxy&gt; block for your proxy

最最关键的是这句：
>You need a &lt;Directory&gt; block for every folder outside of your DocumentRoot

在虚拟目录上给每个父文件家都配置上&lt;Directory&gt;，才算完成
