---
title: 核心概念理解
originUrl: http://192.168.219.170/docs/vue/latest/frame/getting-started/basic-concepts/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/getting-started/basic-concepts/)

## SPA

SPA，全称为 **Single-Page Application（单页应用程序）**，是一种特殊的 Web 应用开发架构。与您熟悉的“每个页面都是一个独立 HTML 文件”的传统 Web 应用不同，SPA **从服务器加载一个初始的 HTML 页面后，后续的页面跳转几乎不再重新请求完整的新 HTML 页面**。

点击 [单页应用 (SPA)](../guides/guides-spa.md) 了解更多。

SPA 图示：

```mermaid
sequenceDiagram
    participant 浏览器
    participant nginx
    participant Java后端

    Note over 浏览器: 首次访问
    浏览器->>nginx: GET /epoint-web/xxxpath
    nginx-->>浏览器: 返回 index.html <br>[任何页面都会响应固定的 index.html]

    Note over 浏览器: 加载入口文件
    浏览器->>nginx: GET /epoint-web/static/main.[hash].js
    nginx-->>浏览器: 返回 main.js

    Note over 浏览器: 路由初始化
    浏览器->>浏览器: 初始化 vue-router <br>并注册内置路由，如登录、注册等
    浏览器->>nginx: POST 获取用户路由
    nginx->>Java后端: 代理请求
    Java后端-->>nginx: 返回用户路由数据
    nginx-->>浏览器: 返回用户路由数据

    Note over 浏览器: 动态路由注册
    浏览器->>浏览器: 注册新返回的路由页面

    Note over 浏览器: 渲染页面
    浏览器->>浏览器: 是否存在 xxxpath 的路由记录 <br> 存在则渲染，否则渲染 404
    浏览器->>nginx: GET /epoint-web/static/xxxpath.[hash].js
    nginx-->>浏览器: 返回 xxxpath.[hash].js

    Note over 浏览器: 数据获取
    浏览器->>nginx: POST /rest/xxxpathrest
    nginx->>Java后端: 代理请求
    Java后端-->>nginx: 返回页面数据
    nginx-->>浏览器: 返回JSON数据

    Note over 浏览器: 页面数据渲染
    浏览器->>浏览器: 执行组件渲染
    浏览器->>浏览器: 更新DOM显示页面

```
