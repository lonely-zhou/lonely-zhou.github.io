---
title: Linux
date: 2024/11/07
categories:
  - 编程
abbrlink: 53d0684b
---

## 中文设置

```shell
vim /etc/locale.conf
LANG="zh_CN.utf8"
source /etc/locale.conf
```

## MySQL 启动/停止/重启

```shell
service mysql start
service mysql stop
service mysql restart
```

## tomcat 停止/启动

```shell
service tomcat stop
service tomcat start
```

## 卸载 mcsmanager

```shell
systemctl stop mcsm-{daemon,web}.service
systemctl disable mcsm-{daemon,web}.service
rm -rf /opt/mcsmanager
```

## Java 环境变量

```shell
# vim /etc/profile

export JAVA_HOME=/usr/java/jdk-22.0.2
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
export PATH=${JAVA_HOME}/bin:$PATH

# . /etc/profile
# source /etc/profile

# 软连接
ln -s /usr/local/jdk-22.0.2/bin/java java
```

## docker 安装

```bash
dnf config-manager --add-repo=http://mirrors.tencent.com/docker-ce/linux/centos/docker-ce.repo
dnf install docker-ce
# 启动
systemctl start docker

# 镜像源
# vim /etc/docker/daemon.json
{
        "registry-mirrors": [
                "https://mirror.ccs.tencentyun.com" ,
                "https://docker.mirrors.ustc.edu.cn"
        ]

}
```

## vaultwarden token 设置

```bash
docker run -d --name vaultwarden -e ADMIN_TOKEN='$argon2id$v=19$m=65540,t=3,p=4$vgIdtZLMBNu3LeiDHArtCJ5GfipwC4enN7XE6CJEBZM$Toxc02nDRpMFSmzc2+JAO6dX+x746NW5BAZ2johQsr8' -v /vw-data/:/data/ --restart unless-stopped -p 8081:80 vaultwarden/server:latest
```
