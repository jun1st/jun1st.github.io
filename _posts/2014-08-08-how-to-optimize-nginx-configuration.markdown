---
layout: single
title: 如何最优化Nginx配置
date: 2014-08-08 23:19:54 +0800
keyword: nginx, configuration, optimise, worker processes
comments: true
categories: server
---

Nginx 安装完了，那么如何配置？ 多少个 Worker Processes?  多少个 Worker Connections?

### 多少个 Worker Processes
Worker Process数决定了Web Server跑多少个Nginx工作进程，因此CPU是几核的就配置几个，是合适的做法

```bash
grep processor /proc/cupinfo | wc -l
```

假设结果是 4， 那就设置4个 Worker Processes.

### 多少个Worker Connections
Worker Connections决定一个Process能同时server多少个用户， 默认值是768， 由于现在一个用户开启一个Session时，都会有好几个请求，因此这个值可以选择除以 2 或者 3.   我们可以通过检查cpu的limit，

```bash
ulimit -n
```

如果 返回结果 1024， 那么 worker connections的数数就是 1024 * 4 = 4096

### Buffers

client_body_buffer_size:  这个决定客户端Post Request的Body的缓冲大小，如果body内容大于缓冲容量，整个正文或者一部就会写入临时文件。

client_header_buffer_size : 这个决定客户端request的header的大小

client_max_body_size:  顾名思义，body最大的size，超过这个大小，就会返回413错误

### timeout

client_header_timeout: 如果客户端在这段时间内没有传送完整的头部到nginx， nginx将返回错误408 (Request Time-out)到客户端。

client_body_timeout: 定义读取客户端请求正文的超时。超时是指相邻两次读操作之间的最大时间间隔，而不是整个请求正文完成传输的最大时间。 如果客户端在这段时间内没有传输任何数据，nginx将返回408 (Request Time-out)错误到客户端
