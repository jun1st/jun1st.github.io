---
layout: single
title: 常用有用的Git Tips
date: 2015-10-02 21:00:00 +0800
categories: productivity
keywords: git, tips, top10
description: 也许最有用的几个Git命令
comments: true
draft: true
image: git.png
---


##用好Git Log

你应该用过 git log, 但是 log 支持很多有用的参数也许你不知道，下面列出一些比较有用的

1. --author="jack" : 只显示jack提交的commit
2. --name-only : 只显示改动了的文件名
3. --oneline : 在一行内显示信息
4. --grath : 显示一些分支信息
5. --reverse : 倒序显示commits
6. --after : 显示这个时间之后的commits
7. --before : 显示这个时间之前的commits

这些参数组合起来挺有用的，比如

	git log --author="jack" --after="1 week ago" -- oneline


##查看还没有合并到Master/父分之中的改动

	git log --no-merges masters..


##从另一个分支中获取文件

先看另一个分支的某个文件，其实可以不用切换到那个分支，执行下面的命令就可以直接查看

	git show some-branch:somefile.js


如果你想和某个分支上的版本进行对比

	git diff some-branch some-file.js


##关于 rebasing

Rebase其实比较复杂，单独写一篇文章都未必讲的清楚明白, 当时有一个很实用的技巧不得不提

	`git pull --rebase`

这是什么？
当你在本地改完，想要把代码push上去，如果主分支上已经有改动，这时候push失败，而且会提示你使用`git pull` 来获取最新的代码, 和本地的代码合并，产生log

 	> Merge remote-tracking branch 'origin/master'

这时rebase就是更好的选择，`git pull --rebase`, git 会先从remote获取最新的代码，然后在push本地的改动，不会有merge产生.

##修改上一个Commit

发现刚刚提交的Commit有一个Typo或者其它很小的改动，Well，当然可以提交个新的Commit， 然后log写上 “fix typo”.

当时其实应该这么做，

1. Fix Typo
2. Stage 这个文件
3. 执行 `git commit --amend` 这会把这一次的改动提交到上一个Commit中
4. Push

##Git的三个状态，三个状态之间如何切换

__三个状态：__

1. 没有Staged, 没有执行`git add`
2. Staged, 当时没有Commit的， 执行了 `git add` , 当时没有执行 `git commit`
3. Commit的, 执行了 `git commit`

用 `git status` 可以查看处在1， 2状态的文件

__如何在三个状态之间切换__

1. `git reset --head {{some-commit-hash}}` 返回到某一个Commit， 所有这个commit之后的改动都丢弃
2.  `git reset {{some-commit-hash}}` 返回到某一个commit，所有这个commit之后的改动都归到状态1， 没有staged，
3.  `git reset --soft {{some-commit-hash}}` 返回到某一个commit， 这个commit之后的改动都归到状态2


最常用的一个可能是第一个, 放弃本地所有的改动

	git reset --hard HEAD


##Revert Commit

	git revert -n

取消之前的Commit


##为常用的git命令设置别名

	git l = git log --online --grath


等等等等


Git 这个Linus大神用几天构建出来的东西， 又一次让人拜倒了！


来自文章 [Top 19 Tips For everyday git use](http://www.alexkras.com/19-git-tips-for-everyday-use/)






