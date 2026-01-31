---
title: 类原生时间同步与Wi-Fi感叹号
date: 2026-01-29 18:59:29
tags: 
    - 安卓
    - lineageos
categories: 安卓
abbrlink:
---

时间同步
```shell
adb shell "settings put global ntp_server ntp.aliyun.com"
```
wifi 感叹号
```shell
adb shell settings put global captive_portal_https_url https://connect.rom.miui.com/generate_204
adb shell settings put global captive_portal_http_url http://connect.rom.miui.com/generate_204
```