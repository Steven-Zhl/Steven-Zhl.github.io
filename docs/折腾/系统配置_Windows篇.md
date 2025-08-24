---
title: "[折腾]系统配置 Windows篇"
description: 虽然大家总是在吐槽Windows，但这不妨碍它在PC中的地位。Windows系统的版本是Windows 11 24H2。
tags:
  - Windows
categories: [折腾]
date: 2025-03-29 00:00:00
---

# [折腾]系统配置 Windows篇

> 记录一下Windows下的个性化配置

## 系统设置

### 1. 系统字符集设为UTF-8

> 这种问题经常出现在：用户名中有中文，并且使用Java时，应该是jvm的问题。

- 依次进入：控制面板 → 时钟和区域 → 区域，然后在弹出窗口中选择“管理”选项卡，点击“更改系统区域设置”，勾选“Beta：使用Unicode UTF-8提供全球语言支持”，点击确定即可。
- 之后需要重启系统才能生效。
- 目前已知的问题：会导致Adobe After Effects无法使用，疑似是无法读取授权信息导致....但是其他Adobe软件没有该问题。

### 2. 系统时间设置为UTC

> 在只使用Windows时不需要调整这个。但是在双系统时，Linux和Windows识别主板时间的方式并不同，Linux认为主板时间是UTC时间，而Windows认为主板时间是本地时间，这会导致切换系统时时间会正好差时区个小时。

在命令行或PowerShell中，以管理员身份执行以下命令即可：

```shell
reg add "HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\TimeZoneInformation" /v RealTimeIsUniversal /d 1 /t REG_QWORD /f
```

## 开发工具

### 1. Git

```shell
git config --global core.autocrlf true # 处理不同的行尾换行符
git config --global core.longpath true # 解决系统路径长度限制，需要管理员权限
```

#### 1. 处理不同的行尾换行符

> Windows的行尾换行符是CRLF，Linux和MacOS使用的是LF。在Windows下使用Git时，建议将行尾换行符转换为LF。

```shell
git config --global core.autocrlf true
```

#### 2. 解决系统路径长度限制

> Windows下默认的路径长度限制为260个字符，这对于一些嵌套程度较深的项目来说可能会造成问题，Git提供了一个解决方案。

```shell
git config --global core.longpath true # 需要管理员权限
```

## 终端工具

> 其实Windows的终端工具也有很多可以折腾/美化的地方，特指PowerShell

## References

1. [将 Windows 10 的系统时钟时间设置为UTC - delphij's Chaos](https://blog.delphij.net/posts/2019/08/-windows-10-utc/)
