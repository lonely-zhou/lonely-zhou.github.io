---
title: win相关
date: 2024/11/07
abbrlink: a802f1a7
---

## winget 彩虹进度条

```json
# winget settings

{
    "visual": {
        "progressBar": "rainbow"
    }
}
```

## win11右键菜单修改win10样式

```bash
# cmd
reg.exe add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve
# win11
reg.exe delete "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /va /f
```

## win终端 ssh

```shell
# .ssh 目录新建文件config
# 保持心跳
Host *
    ServerAliveInterval 40

# 别名登录
Host txy
    HostName ip
    User root
  	Port 22
    IdentityFile ~/.ssh/OpenCloudOS.pem
```
