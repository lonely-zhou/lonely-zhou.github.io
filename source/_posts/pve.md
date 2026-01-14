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
