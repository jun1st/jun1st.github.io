---
layout: single
title: 搭建 Zookeeper Cluster
author: fengd
summary: 如何在本地搭建一个 zookeeper cluster， 了解 zookeeper 的使用和维护
tags: zookeeper cluster
date: 2019-03-18T00:45:24+08:00
comments: true
---

**下载 Zookeeper**

目前的版本是 3.4.13， 下载最新稳定版, 在本地配置一个为集群。

**配置实例**

把 zookeeper 解压到你的用户根目录下，创建三个实例配置文件

    cp zoo_sample.cfg zoo-slave1.cfg
    cp zoo_sample.cfg zoo-slave2.cfg
    cp zoo_sample.cfg zoo-slave3.cfg

修改配置文件：

    # sub zoo-slave1.cfg

    # The number of milliseconds of each tick
    tickTime=2000
    # The number of ticks that the initial 
    # synchronization phase can take
    initLimit=10
    # The number of ticks that can pass between 
    # sending a request and getting an acknowledgement
    syncLimit=5
    # the directory where the snapshot is stored.
    # do not use /tmp for storage, /tmp here is just 
    # example sakes.
    dataDir=/users/fengd/zk-data/slave1/data

    # the port at which the clients will connect
    clientPort=2181

    server.1=localhost:2887:3887
    server.2=localhost:2888:3888
    server.3=localhost:2889:3889

    # the maximum number of client connections.
    # increase this if you need to handle more clients
    #maxClientCnxns=60
    #
    # Be sure to read the maintenance section of the 
    # administrator guide before turning on autopurge.
    #
    # 
    #
    # The number of snapshots to retain in dataDir
    #autopurge.snapRetainCount=3
    # Purge task interval in hours
    # Set to "0" to disable auto purge feature
    #autopurge.purgeInterval=1

配置文件都有详细的说明，需要创建的文件夹是 dataDir， 每个配置文件制定的文件目录都需要创建。

此外还需要在对应的每个 dataDir 下创建每个 instance 对应的 id

![](https://cdn-images-1.medium.com/max/1600/1*e58a88PXmiUyj_Utvknjkw.png)

每个 myid 的值对应的是你的配置文件里， server.{id} 的值， 因为在一台机器上模拟一个伪集群，所以 clientPort 也都是不同的。

**启动集群**

通过不同的配置文件启动 instance

    # cd ~/zookeeper/bin

    ./zkServer.sh start ../conf/zoo-slave1.cfg
    ./zkServer.sh start ../conf/zoo-slave2.cfg
    ./zkServer.sh start ../conf/zoo-slave3.cfg

**查看状态**

查看是否启动成功

    jps

    13120 QuorumPeerMain
    13174 QuorumPeerMain
    13191 Jps
    13147 QuorumPeerMain

产看每个实例的状态

![](https://cdn-images-1.medium.com/max/1600/1*ZUX4jl78J8b-aNk9XrVNVQ.png)

启动成功，装好了再来玩～



