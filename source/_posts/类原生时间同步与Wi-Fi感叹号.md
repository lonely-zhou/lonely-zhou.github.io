---
title: 类原生时间同步与Wi-Fi感叹号
tags:
  - 安卓
  - lineageos
categories: 安卓
abbrlink: b2adfa
date: 2026-01-29 18:59:29
---

## 时间同步
```shell
adb shell "settings put global ntp_server ntp.aliyun.com"
```
## wifi 感叹号
```shell
adb shell settings put global captive_portal_https_url https://connect.rom.miui.com/generate_204
adb shell settings put global captive_portal_http_url http://connect.rom.miui.com/generate_204
```
## 常用软件
 - [ClashMetaForAndroid](https://github.com/MetaCubeX/ClashMetaForAndroid/releases)
 - [FlClash](https://github.com/chen08209/FlClash)
 - [apatch](https://apatch.dev/zh_CN/install.html)
 - [AdGuard Home For Android](https://github.com/liuzq2002/Adguard-Home-For-Magisk-Mod/releases)
 - PUI Theme
 - LSPosed IT
 - [Zygisk Next](https://github.com/Dr-TSNG/ZygiskNext)
 - [Thanox](https://tornaco.github.io/Thanox/)
 - [1DM+](https://www.yxssp.com/download.php?author=%E7%88%B1%E7%9C%8B%E8%A7%86%E9%A2%91&btitle=%E5%BC%82%E6%98%9F%E8%BD%AF%E4%BB%B6%E7%A9%BA%E9%97%B4&id=23740)
 - via
 - [PiliPlus](https://github.com/bggRGjQaUbCoE/PiliPlus/releases)

## other
```shell
adb -d reboot bootloader
fastboot flash vbmeta vbmeta.img
fastboot flash dtbo dtbo.img
fastboot flash boot boot.img
fastboot wipe-super super_empty.img
fastboot flash recovery recovery.img
fastboot reboot recovery

adb reboot bootloader
fastboot flash boot PATH/TO/boot.img
fastboot reboot
```