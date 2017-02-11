---
layout: single
title: reinstall mysql on mac with homebrew
date: 2014-07-25 15:29:23 +0800
comments: true
categories: mysql
---

### 测底删除MySQL

```bash remove all related files
#kill all processes
ps aux | grep mysql

brew remove mysql
brew cleanup
sudo rm /usr/local/mysql
sudo rm -rf /usr/local/var/mysql
sudo rm -rf /usr/local/mysql*
sudo rm ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist
sudo rm -rf /Library/StartupItems/MySQLCOM
sudo rm -rf /Library/PreferencePanes/My*
launchctl unload -w ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist
```
edit /etc/hostconfig and remove the line MYSQLCOM=-YES-

```bash
rm -rf ~/Library/PreferencePanes/My*
sudo rm -rf /Library/Receipts/mysql*
sudo rm -rf /Library/Receipts/MySQL*
sudo rm -rf /private/var/db/receipts/*mysql*
```

重启机器，确保mysql已经删除干净了

### 用Brew安装
```bash install mysql
brew doctor
brew update
brew install mysql

upset TMPDIR

mysql_install_db --verbose --user=whoami--basedir="$(brew --prefix mysql)" --datadir=/usr/local/var/mysql --tmpdir=/tmp
```

### 配置MySQL

配置默认编码为Unicode等，
```bash configure my.cnf
[client]
port = 3306
socket = /tmp/mysql.sock
default-character-set = utf8

[mysqld]
collation-server = utf8_unicode_ci
character-set-server = utf8
init-connect ='SET NAMES utf8'
max_allowed_packet = 64M
bind-address = 127.0.0.1
port = 3306
socket = /tmp/mysql.sock
innodb_file_per_table=1

[mysqld_safe]
timezone = '+08:00'
```

### 初始化DB
```bash init database
unset TMPDIR
mysql_install_db --verbose --user=`whoami` --basedir="$(brew --prefix mysql)" --datadir=/usr/local/var/mysql --tmpdir=/tmp
```

### Final Step
```bash start
mysql.server start
mysql_secure_installation
```

更多帮助，可以执行<code>brew info mysql</code>




