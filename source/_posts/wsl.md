---
title: wsl子系统
tags:
    - win
    - wsl
    - linux
categories: win
abbrlink:
date: 2026-05-09 20:16:01
---

## 家庭版开启hyperv(wsl非必须)
```shell
@echo off
chcp 65001 >nul
:: 检查管理员权限
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo 请以管理员身份运行此脚本
    pause
    exit /b 1
)

pushd "%~dp0"

:: 添加 Hyper-V 包
dir /b %SystemRoot%\servicing\Packages\*Hyper-V*.mum >hyper-v.txt 2>nul
if %errorlevel% equ 0 (
    for /f %%i in ('findstr /i . hyper-v.txt 2^>nul') do (
        echo 正在添加: %%i
        dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i"
        if !errorlevel! neq 0 echo 警告: %%i 添加失败
    )
    del hyper-v.txt
) else (
    echo 未找到 Hyper-V 包文件
)

:: 启用 Hyper-V 功能
echo 正在启用 Hyper-V 功能...
Dism /online /enable-feature /featurename:Microsoft-Hyper-V-All /LimitAccess /ALL

echo Hyper-V 安装完成，建议重启计算机
pause
```

## 安装wsl子系统
```shell
# 默认安装Ubuntu
wsl --install
# 指定安装
wsl --install -d Debian
# 启用 wsl2
wsl --set-default-version 2
# 卸载
wsl --unregister Ubuntu
```

## 其他
```shell
# 自动创建 .ssh 文件夹
ssh -T git@github.com
# Permissions 0777 for '.ssh/GitHub' are too open.
chmod 600 .ssh/GitHub
```

## arch
```shell
# 配置用户
# 1. 创建用户
useradd -m -G wheel -s /bin/bash arch
# 2. 设置密码
passwd arch
# 3. 安装 sudo
pacman -S sudo
# 4. 开启 wheel 组权限
sed -i 's/^# %wheel ALL=(ALL:ALL) ALL/%wheel ALL=(ALL:ALL) ALL/' /etc/sudoers
# 5. 配置默认用户
# 5.1
sudo nano /etc/wsl.conf
# 5.2 写入
[user]
default=arch
# 安装ssh
sudo pacman -S openssh
```

## .bashrc
```shell
#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

#alias ls='ls --color=auto'
#alias grep='grep --color=auto'
#PS1='[\u@\h \W]\$ '

# 自定义配置
# 颜色定义
COLOR_RESET='\[\033[0m\]'
COLOR_USER='\[\033[01;32m\]'    # 绿色 - 用户名
COLOR_HOST='\[\033[01;34m\]'    # 蓝色 - 主机名
COLOR_PATH='\[\033[01;33m\]'    # 黄色 - 路径
COLOR_GIT='\[\033[01;36m\]'     # 青色 - Git 分支
COLOR_PROMPT='\[\033[01;37m\]'  # 白色 - 提示符
COLOR_TIME='\[\033[00;35m\]'    # 紫色 - 时间

# ---------- Git 分支显示函数 ----------
parse_git_branch() {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}

parse_git_dirty() {
    local git_status=$(git status --porcelain 2> /dev/null)
    if [ -n "$git_status" ]; then
        echo " ✗"
    else
        echo " ✓"
    fi
}

# 单行提示符
PS1="[${COLOR_USER}\u${COLOR_RESET}@${COLOR_HOST}\h${COLOR_RESET}:${COLOR_PATH}\w${COLOR_RESET}${COLOR_GIT}\$(parse_git_branch)${COLOR_RESET}]\$ "

# ---------- 实用别名 ----------
# 基础命令增强
alias ll='ls -alFh --color=auto'
alias la='ls -A --color=auto'
alias l='ls -CF --color=auto'
alias ls='ls --color=auto'
alias ..='cd ..'
alias ...='cd ../..'

# 如果上一个命令失败，提示符变红
export PROMPT_COMMAND='if [ $? -ne 0 ]; then echo -e "\033[01;31m✗ 命令执行失败\033[0m"; fi'

# 补全列表显示颜色
bind "set colored-stats on"
```