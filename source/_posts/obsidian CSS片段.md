---
title: obsidian CSS片段
date: '2024/11/17 21:51:10'
abbrlink: 3ed94a36
---

## 状态栏居中

```css
/* 状态栏居中 */

div.status-bar {
    --status-bar-position: absolute;
    right: 0;
    left: 0;
    width: fit-content;
    padding: 6px var(--size-4-2);
    margin: 0 auto;
    background: var(--background-secondary-blur);
    border: 1px solid var(--window-border-color);
    border-radius: var(--radius-s);
}
```

## 自动隐藏侧边栏

```css
.sidebar-toggle-button.mod-left {
    justify-content: right; /*交互区对齐*/
    margin-left: -28px; /*左侧栏按钮位置*/
}
.sidebar-toggle-button.mod-left svg {
    opacity: 0; /*左侧栏按钮 SVG 不透明度*/
}

.workspace-ribbon.side-dock-ribbon.mod-left:not(:hover)::before,
.workspace-ribbon.side-dock-ribbon.mod-left:not(:hover) {
    border-right-color: transparent;
    margin-left: -32px;
}
.workspace-ribbon.side-dock-ribbon.mod-left::before,
.workspace-ribbon.side-dock-ribbon.mod-left {
    transition: var(--anim-duration-moderate);
}
```
