---
title: openwrt
date: 2024/11/07
abbrlink: 7a44463a
---

## 换源

```yaml
# openwrt 官方源
src/gz openwrt_core https://downloads.openwrt.org/releases/23.05.3/targets/x86/64/packages
src/gz openwrt_base https://downloads.openwrt.org/releases/23.05.3/packages/x86_64/base
src/gz openwrt_luci https://downloads.openwrt.org/releases/23.05.3/packages/x86_64/luci
src/gz openwrt_packages https://downloads.openwrt.org/releases/23.05.3/packages/x86_64/packages
src/gz openwrt_routing https://downloads.openwrt.org/releases/23.05.3/packages/x86_64/routing
src/gz openwrt_telephony https://downloads.openwrt.org/releases/23.05.3/packages/x86_64/telephony
# 清华源
src/gz openwrt_core https://mirrors.tuna.tsinghua.edu.cn/openwrt/releases/23.05.3/targets/x86/64/packages
src/gz openwrt_base https://mirrors.tuna.tsinghua.edu.cn/openwrt/releases/23.05.3/packages/x86_64/base
src/gz openwrt_luci https://mirrors.tuna.tsinghua.edu.cn/openwrt/releases/23.05.3/packages/x86_64/luci
src/gz openwrt_packages https://mirrors.tuna.tsinghua.edu.cn/openwrt/releases/23.05.3/packages/x86_64/packages
src/gz openwrt_routing https://mirrors.tuna.tsinghua.edu.cn/openwrt/releases/23.05.3/packages/x86_64/routing
src/gz openwrt_telephony https://mirrors.tuna.tsinghua.edu.cn/openwrt/releases/23.05.3/packages/x86_64/telephony
# kenzok8
src/gz kenzok8 https://op.dllkids.xyz/packages/x86_64
# 中科大
sed -i 's/downloads.openwrt.org/mirrors.ustc.edu.cn\/openwrt/g' /etc/opkg/distfeeds.conf
```

## module 'luci.cbi' not found

```shell
opkg update
opkg install luci luci-base luci-compat
```

## 扩容空间

```shell
cfdisk /dev/nvme0n1
mkfs.ext4 /dev/nvme0n1p3
/dev/sda3
opkg install block-mount

mkdir -p /tmp/introot
mkdir -p /tmp/extroot
mount --bind / /tmp/introot
mount /dev/sda3 /tmp/extroot
tar -C /tmp/introot -cvf - . | tar -C /tmp/extroot -xf -
umount /tmp/introot
umount /tmp/extroot
```

## no field package.preload['luci.cbi']

```shell
opkg install luci luci-base luci-compat
```
