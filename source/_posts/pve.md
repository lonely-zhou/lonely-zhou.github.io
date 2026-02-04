---
title: pve
date: 2024/11/07
abbrlink: ef0dfae5
---

## 转换 ISO

```shell
qm importdisk 100 /var/lib/vz/template/iso/openwrt-23.05.4-x86-64-generic-ext4-combined-efi.img local-lvm
```

## PVE 美化

```shell
wget -q -O /root/pve_source.tar.gz 'https://bbs.x86pi.cn/file/topic/2023-11-28/file/01ac88d7d2b840cb88c15cb5e19d4305b2.gz' && tar zxvf /root/pve_source.tar.gz && /root/./pve_source
```
## ssh 添加密钥
```shell
#1. 生成密钥
ssh-keygen -t ed25519 -C "pve-$(whoami)"
#2. 上传公钥
#拷贝至/root/.ssh/authorized_keys文件中
#3. 关闭密码登录
sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin prohibit-password/' /etc/ssh/sshd_config

systemctl restart sshd
```