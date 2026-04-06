---
title: 飞牛 docker mcsmanager
tags:
    - 飞牛OS
    - docker
    - mcsmanager
categories: NAS
abbrlink:
date: 2026-04-06 17:01:14
---

```yaml
# docker-compose.yml
# 实际情况替换[/vol1/1000/Docker/Minecraft]
services:
  web:
    image: githubyumao/mcsmanager-web:latest
    ports:
      - "23333:23333"
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /vol1/1000/Docker/Minecraft/web/data:/opt/mcsmanager/web/data
      - /vol1/1000/Docker/Minecraft/web/logs:/opt/mcsmanager/web/logs

  daemon:
    image: githubyumao/mcsmanager-daemon:latest
    restart: unless-stopped
    ports:
      - "24444:24444"
      - "25565:25565"
    environment:
      - MCSM_DOCKER_WORKSPACE_PATH=/vol1/1000/Docker/Minecraft/daemon/data/InstanceData
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /vol1/1000/Docker/Minecraft/daemon/data:/opt/mcsmanager/daemon/data
      - /vol1/1000/Docker/Minecraft/daemon/logs:/opt/mcsmanager/daemon/logs
      - /var/run/docker.sock:/var/run/docker.sock
```