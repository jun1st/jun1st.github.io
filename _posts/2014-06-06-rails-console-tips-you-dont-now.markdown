---
layout: single
title: 你不知道的Rails Console Tips
date: 2014-06-06 23:51:39 +0800
comments: true
categories: rails
---

____ 清理Console
当输出满屏时，想清理一下，在bash里可以用clear，在rails console里，可以用<code>command+k</code>

____ 重新加载rails环境
console环境不会自动加载修改后的文件，怎么办？退出重启？不需要！执行
<code>reload!</code>

____ 搜索历史纪录
执行的command太多，往上可以用 uparrow, 往下可以用downarrow。但是当执行的命令太多时，上下翻历史记录耗费的时间，比直接输入来的更多。其实console有搜索功能，Ctrl+R

```ruby
[1] pry(main)> reload!
Reloading...
=> true
(reverse-i-search)`r': reload!
```

输入r出来 reload! .  第一个匹配的记录

____ Tab补全

tab补全，属性bash的应该对这个都不陌生。

____ 上一个命名的结果

执行完一条命令

```
>>Article.first
```
但其实你还想对这个返回的 article 对象继续操作。在执行一遍？

```ruby
>>article = Article.first
```
NO！ 你可以用<code>_</code>, <code>article = _</code>; <code>_</code>保存着上一条命令返回的结果

____ 发起HttpRequest

```ruby
>>app.get “/“
=> 200
>>app.get “/orders”
=> 302
```

____ Rails沙盒
console可以已沙盒的模式运行，<code>rails console —sandbox</code>

```ruby
>>User.destroy(1)
>>exit
     (0.1ms) rollback transaction
```
____ Rails环境

想要test环境的console，除了<code>RAILS_ENV=test rails c</code>, 更简单的是<code>rails c test</code>
