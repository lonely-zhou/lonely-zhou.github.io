---
title: git常用操作
tags:
  - win
  - git
categories: win
abbrlink:
date: 2026-03-16 15:10:17
---

## name email

```shell
git config --global user.name "dzho"
git config --global user.email "lonelyzhou@yeah.net"
```

## 验证

```shell
git config --list
```

## 初始化

```shell
git init
```

## 将文件的修改添加到暂存区

```shell
git add <文件名>
git add . # 添加所有变化（新增、修改、删除）
git add -A # 同上，添加所有变化
```

## 将暂存区的内容提交到本地仓库

```shell
git commit -m "提交说明信息"
```

## 查看远程仓库信息（默认别名是 origin）

```shell
git remote -v
```

## 添加远程仓库别名

```shell
git remote add <别名> <远程仓库URL>
```

## 首次推送时，使用 -u 设置上游关联，后续可直接用 `git push`

```shell
git push -u origin main
```
