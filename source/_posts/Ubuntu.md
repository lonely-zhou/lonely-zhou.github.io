---
title: Ubuntu
date: 2024/11/07
abbrlink: 7be7930f
---

[下载Ubuntu](https://cn.ubuntu.com/download/server/step1)

## 静态IP

```shell
cd /etc/netplan/
sudo vim 50-cloud-init.yaml

network:
    renderer: networkd
    ethernets:
        enp6s18:
            dhcp4: false
            addresses: [10.10.10.12/24]
            routes:
              - to: default
                via: 10.10.10.1
            nameservers:
              addresses: [10.10.10.10]
    version: 2
```

## 中文设置

```shell
sudo apt-get install language-pack-zh-hans
sudo update-locale LANG=zh_CN.UTF-8
sudo reboot
```

## MySQL
### 安装
```shell
dnf install mysql
dnf install mysql-server
```

### 启动MySQL
```shell
systemctl start mysqld
```

### 设置MySQL自动启动
```shell
systemctl enable --now mysqld
```

### 检查MySQL是否在运行
```shell
systemctl status mysqld
```
输出
Active：$\color{green}{active (running)}$

### 安全性配置
运行mysql_secure_installation脚本，进行密码设置、允许远程连接等安全性设置。
```shell
mysql_secure_installation
```
1. 设置验证密码组件
2. 密码等级 0
3. 输入两遍密码 确认是否继续使用提供的密码 y
4. 移除匿名用户 y
5. 允许root远程登陆 n
6. 移除test数据库 y
7. 重新载入权限表 y
8. 结束
### 设置root用户权限
从服务器登录MySQL，将root用户的host字段设为’%’，使得用户root可以从任意IP的机器上登录(若root用户的host字段为localhost,则只能本机登录)。
1. 登录MySQL
```shell
mysql -uroot -p
输入密码
```
2. 选择数据库
```shell
use mysql;
```
3. host字段(主机IP)赋值
```shell
update user set host='%' where user='root';
```
4. 刷新系统权限
```shell
flush privileges;
```
5. 验证是否设置成功
```shell
select user,host from user;
```
