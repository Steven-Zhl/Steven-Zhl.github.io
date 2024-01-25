---
layout: post
title: "[MySQL]1 关于MySQL"
description: 本来我是很讨厌教科书第一章总是讲一些大而空的绪论，而不是直接开始。后来我开始自己写博客了，才发现当你对一个东西大致了解之后，总是喜欢“谈一谈自己的理解”，这是人之常情。
date: 2023-07-22 22:04:00 +0800
image: "/images/cover/MySQL_1_关于MySQL.jpg"
tags:
  - MySQL
  - SQL
  - 数据库技术
category: MySQL
---

> 我自认为当时学数据库技术的时候，关于MySQL的了解算是不错了，但最近几天接触了leetcode的MySQL题后才发现，先前很多以为的“重点”其实并不是重点，不够实用。
> 这份笔记的主线为整理所学基础知识，同时在不断的学习、了解的过程中会逐步将问题穿插进去。
> 希望能保持住不弃坑吧

## 安装MySQL

> MySQL数据库的配置其实算比较简单的，只是Linux下(特指Ubuntu)的安装步骤与Windows区别比较大，我一开始有些手足无措，后来发现其实也没什么问题，特记录一下。

### Windows

(现在我Windows下的MySQL用的好好的，不想重新折腾了，等什么时候重装系统再记录吧)

### Ubuntu

1. 安装：直接使用包管理器(如`apt`)安装即可：`sudo apt install mysql-server`
2. 安装完成后应当会自动启动MySQL服务，可以使用`systemctl status mysql.service`或`sudo service mysql status`查看服务的状态。如下图所示，显示**active(running)**即为正常运行，根据个人经验来看，从apt安装的mysql一般都能正常运行。
  ![MySQL运行状态](/images/MySQL/MySQL运行状态.png)
   * 与Windows不太一样的是，Linux的MySQL安装过程中并没有设置root密码，而是使用了一个临时密码，可以使用`sudo cat /etc/mysql/debian.cnf`查看，如下图所示：
     ![MySQL临时密码](/images/MySQL/MySQL临时密码.png)
   * 你可以用这个密码先临时登录一下(比如降低密码的安全级别)，但是还是要记得修改密码。
3. MySQL安装后包含了一个脚本，可以快速配置好MySQL,使用`sudo mysql_secure_installation`，按照提示进行设置即可。

## References

1. [在Ubuntu上安装MySQL](https://www.cnblogs.com/TechNomad/p/17871476.html)
2. [数据库初始化设置密码时报错"SET PASSWORD has no significance for user 'root'@'localhost' as the authentication met...](https://blog.csdn.net/weixin_43279138/article/details/126872698)
3. [解决MySQL8.0报错：Unknown system variable 'validate_password_policy'](https://blog.csdn.net/HaHa_Sir/article/details/80552663)
