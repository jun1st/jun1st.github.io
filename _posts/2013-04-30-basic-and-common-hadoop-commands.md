---
layout: single
title: "basic and common hadoop commands"
description: "some basic but common and useful hadoop command"
categories: hadoop
tags: [hadoop,mapreduce]
---

###Copy Files to DFS ###

	hadoop dfs -copyFromLocal <local-folder-path>  <path-under-hadoop-folder>

### Remove Files from DFS ###

	hadoop dfs -rmr <folder-path-under-hadoop-dfs-dir>


### Retrieve Files from DFS ###

	hadoop dfs -getmerge /var/hadoop/hadoop-output2 /tmp/hadoop-output4


### Start a new Job ###

	hadoop jar YourJarFile.jar YourMainClass <input-folder-path> <output-folder-path>


### List all Hadoop Jobs ###

	hadoop job -list


### Kill a Running Job ###

	hadoop job -kill <job_id> //get the job id from above command


