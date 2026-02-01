---
title: mactype注册表模式启动
categories: win
abbrlink: 641007cb
date: 2026-02-01 14:05:51
tags:
---
```reg
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Windows]
"AppInit_DLLs"="MacType64.dll"
"LoadAppInit_DLLs"=dword:00000001
"RequireSignedAppInit_DLLs"=dword:00000000


[HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Microsoft\Windows NT\CurrentVersion\Windows]
"AppInit_DLLs"="MacType.dll"
"LoadAppInit_DLLs"=dword:00000001
"RequireSignedAppInit_DLLs"=dword:00000000
```