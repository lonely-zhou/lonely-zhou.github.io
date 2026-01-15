---
title: hexo github pages 自动部署
tags:
  - hexo
  - github
categories: hexo
abbrlink: 1eefca4c
date: 2026-01-15 11:41:58
---
.github\workflows\autodeploy.yml
```ymal
# 当有改动推送到master分支时，启动Action
name: 自动部署

on:
    push:
        branches:
            - source #监听source分支的push事件

permissions:
    contents: read
    pages: write
    id-token: write

concurrency:
    group: pages-${{ github.ref }}
    cancel-in-progress: true

jobs:
    deploy:
        runs-on: ubuntu-latest
        environment:
            name: github-pages
            url: ${{ steps.deployment.outputs.page_url }}
        steps:
            - name: 检查分支
              uses: actions/checkout@v4
              with:
                  ref: source #检出source分支的代码

            - name: 安装 Node
              uses: actions/setup-node@v4
              with:
                  node-version: "25.x" #action使用的node版本，建议大版本和本地保持一致。可以在本地用node -v查询版本号。

            - name: 安装 Hexo
              run: |
                  export TZ='Asia/Shanghai'
                  npm install hexo-cli -g

            - name: 缓存 Hexo
              uses: actions/cache@v4
              id: cache
              with:
                  path: |
                      node_modules
                      ~/.npm
                  key: ${{runner.OS}}-${{hashFiles('**/package-lock.json')}}

            - name: 安装依赖
              if: steps.cache.outputs.cache-hit != 'true'
              run: |
                  npm install --save

            - name: 生成静态文件
              run: |
                  hexo clean
                  hexo generate

            - name: 上传静态文件
              id: deployment
              uses: actions/upload-pages-artifact@v3
              with:
                  path: ./public

            - name: 部署到 GitHub Pages
              uses: actions/deploy-pages@v4

```