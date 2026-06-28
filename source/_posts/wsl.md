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