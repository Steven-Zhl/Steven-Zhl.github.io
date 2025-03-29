---
title: "[折腾]系统配置 Linux篇"
description: 原本我是只有Windows的，但转机发生在大二的时候，在操作系统课上第一次接触Linux，随后在一个好兄弟的帮助下安装了Ubuntu，体会到了折腾的快乐，遂一发不可收拾，成为了日常双系统的靓仔。
tags:
  - Linux
  - EndeavourOS
categories: [折腾]
---

> 这篇文章记录一下Linux的个性化配置，一切都是为了更方便、更好用。
>
> Linux系统使用的发行版是EndeavourOS，桌面环境是KDE Plasma，显示协议是Wayland，包管理器是Pacman和Paru

## 系统设置

## 开发工具

### 1. Git

```shell
git config --global core.autocrlf input # 处理不同的行尾换行符
```

#### 1. 处理不同的行尾换行符

> Windows的行尾换行符是CRLF，Linux和MacOS使用的是LF。在Linux下为了兼容可能出现的CRLF，可以进行以下配置

```shell
git config --global core.autocrlf input
```

## 终端工具

### 1. Zsh

> Linux自带的终端工具通常是Bash，但Zsh提供了更高的自定义程度。

Zsh + Oh My Zsh + Powerlevel10k