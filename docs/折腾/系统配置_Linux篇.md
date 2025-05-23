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

### 修改默认应用

> 包括两部分，分别是`系统设置 / 应用和窗口 / 默认应用程序`和`/etc/environment`，对我来说前者只修改默认浏览器(chrome)，后者只修改默认编辑器(vim)

### 配置终端代理

> 很多时候一些在终端运行的软件需要连接代理才能运行，比如`docker`或`git`，配置终端代理的命令主要是以下3行

```shell
# 将<ip>和<port>替换为实际的IP和端口
export http_proxy="http:<ip>:<port>"
export https_proxy=$http_proxy
export socks5_proxy="socks5://<ip>:<port>"
```

- 最简单的方法是直接在`~/.bashrc`或`~/.zshrc`中添加这几行命令，重启终端即可生效。这样适合始终使用代理的情况，但如果你大多数时候使用代理，偶尔需要不使用，可以将取消代理的命令放在一个函数中，在需要时执行。

```shell
export http_proxy="http:<ip>:<port>"
export https_proxy=$http_proxy
export socks5_proxy="socks5://<ip>:<port>"

function noproxy() { # 取消代理
    unset http_proxy
    unset https_proxy
    unset socks5_proxy
}
```

### 终端配置

#### 解决粘贴时出现`^[[200~`的问题

> 这是由于终端的`Bracketed Paste Mode`导致的，但实际上该特性用的不多，反而总是影响更常用的粘贴，可以通过执行以下命令关闭该模式：

```shell
echo -e "\e[?2004l"
```

## 开发工具

### Git

#### 处理不同的行尾换行符

> Windows的行尾换行符是CRLF，Linux和MacOS使用的是LF。在Linux下为了兼容可能出现的CRLF，可以进行以下配置

```shell
git config --global core.autocrlf input
```

### Zsh

> Linux自带的终端工具通常是Bash，但我觉得不好用，一般会额外安装一个Zsh

- 先逐行执行以下命令，安装Zsh和相关插件

```shell
paru zsh # 安装Zsh
chsh -s $(which zsh) # 修改默认Shell，需要注销后生效
sh -c "$(curl -fsSL https://gitee.com/pocmon/ohmyzsh/raw/master/tools/install.sh)" # 安装oh-my-zsh(使用Gitee镜像)
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions # 安装插件zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting # 安装插件zsh-syntax-highlighting
```

- 随后，修改`~/.zshrc`文件，修改`plugin`为以下内容：

```shell
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)
```

- 最后，执行`source ~/.zshrc`使配置生效

> 可选：使用Powerlevel10k皮肤，但我现在比较懒了，觉得整那些没必要，就先不写了

## 常用工具

### Fcitx5与中文输入法

## 参考

- [解决git bash粘贴^\[\[200~-CSDN博客](https://blog.csdn.net/okay_ing/article/details/136621547)
- [zsh 安装与配置，使用 oh-my-zsh 美化终端 | Leehow的小站](https://www.haoyep.com/posts/zsh-config-oh-my-zsh/)
