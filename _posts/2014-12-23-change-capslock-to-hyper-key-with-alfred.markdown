---
layout: single
title: 把Mac上的CapsLock键改成Hyper键
date: 2014-12-23 15:04:38 +0800
comments: true
categories: Mac
---

Capslock键，一个在实际生活中使用频率相当低的键，却占了一个很重要的位置，实在是浪费！尤其是在Mac为各个快捷键设置按键的时候，如果能多一个功能键，那可能提神一大截的效率。

###替换锁定功能

先安装[Seil](https://pqrs.org/osx/karabiner/seil.html.en)这个软件, 通过修改键值（80），可以把Capslock键的功能替换为一个新的键，不存在的键。

![seil change](/images/20141223/seil.png)

再到[System Preferences] -> [Keyboard] -> [Modify Keys] 下 把Capslock原来的功能取消了, 设置为"No Action"

![Capslock No Action](/images/20141223/noactions.png).

这下再按[Capslock]键指示灯就不会亮了

###映射为新的键

[Capslock]键已经没有锁定大小写功能了，现在需要给个新的功能。这需要用到另一个软件[Karabiner](https://pqrs.org/osx/karabiner/index.html.en)。如何添加新的映射呢，在[Misc & Uninstall]下，选[Open private.xml],

![open private xml](/images/20141223/miscs.png)

编辑这个xml文件，添加功能。可以下载[lucifr的版本](https://gist.github.com/jun1st/fa3e41209d813781f2bf)。

重新打开之后，把下面的功能都选中

![open private xml](/images/20141223/changekeys.png)

好了，现在[Capslock]键有了新的功能了， 然后设置Alfred的热键，设置Alfred Hotkey中按[Capslock], 设置为F19,
![open private xml](/images/20141223/alfredhotkey.png),

开启了Alfred，就等于开启了领一扇门，怎么配置alfred的hotkey, 那就看自己发挥了。
