---
layout: single
title: 用Logrotate来归档Rails Log
date: 2015-05-22 21:00:00 +0800
categories: rails
comments: true
image: null
---

Log文件对于程序查找错误和性能问题很有用，Rails会产生大量的log，当时如果你没有做适当的设置，那么就会产生一个巨大的log文件，然后用什么工具都打不开，只能叹息。 其实Linux自带的Logrotate是个很好的工具，而且使用极其方便，不需要对Rails做任何的修改。


###添加Logrotate

在 /etc/logrotate.d/ 这个文件夹下，新建一个文件，比如叫做 rails-app-prod

```bash
  /path/to/your/production/shared/log/*.log {
    size=20M
    missingok
    rotate52
    compress
    delaycompress
    notifempty
    copytruncate
  }
```

注意一下最后的copytruncate, 意思是先copy一个log文件，然后把当前的log文件清空，供Rails继续写入。 另一个选择是 create, 这个意思是先重命名当前的文件，然后重新创建一个log文件供Rails写入。原因是在重命名之后，Rails可能还指向已经被重命名了的log文件，因此可能需要重启Rails才能使新的生效.
