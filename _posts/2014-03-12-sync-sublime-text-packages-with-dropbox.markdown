---
layout: single
title:  用dropbox同步sublime text的packages的正确方法
date: 2014-03-12 11:15:37 +0800
comments: true
categories: tools
---

Sublime Text之所以那么强大，是因为她支持各种各样的插件包，几乎你能想到的她都有。因此把Sublime Text配置到让你觉得舒服的情景是一件比较繁琐的事情，你绝对不会想要配置第二遍。 当然作为一个程序员，想尽一切办法也不干Repeat的事情。

怎么办？同步嘛，用各种同步软件在各个机器上保持同步，比如Dropbox。

在主机上

```
cd ~/Library/Application\ Support/Sublime\ Text\ 3/Packages/
mkdir ~/Dropbox/Sublime
mv User ~/Dropbox/Sublime/
ln -s ~/Dropbox/Sublime/User
```

在其它机器上

```
cd ~/Library/Application\ Support/Sublime\ Text\ 3/Packages/
rm -r User
ln -s ~/Dropbox/Sublime/User
```

这里同步是只有<code>Packages/User/</code>文件夹，而不是整个Packages文件夹。这个文件夹包含了<code>Package Control.sublime-settings</code>文件，这个文件包含了安装的包和配置信息，当在另一个Sublime Text开启时，他会根据这个文件自动检测，安装包含的包，还解决兼容性问题。
