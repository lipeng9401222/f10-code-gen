---
title: 启动工程
originUrl: http://192.168.219.170/docs/vue/latest/frame/getting-started/start-project/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/getting-started/start-project/)

## 第一步：安装依赖

在根目录执行 `pnpm i` 安装依赖；

![init](images/start/cli-pnpmi.png)

## 第二步：运行

进入 `eui-cli web` 创建的 demo-web 工程，执行 `pnpm run dev --force` (`--force` 可以不加，用于清缓存的)；

![init](images/start/cli-dev.png)

## 第三步：看效果

window 环境下按住 ctrl，单击下图中地址打开访问的页面

![init](images/start/cli-start-7.png)

启动后会发现页面是空白的，打开控制台看到请求报错，如下，别急，此时还需要其他配置。

![init](images/start/cli-start-1.png)

### 完整开发，依赖后端接口

见 [请求后端](getting-started-request-backend.md)

### 纯前端开发使用，不依赖后端接口

在 demo-web 工程中的 `src/config.js` 中 `isMock` 参数配置为 `true`，如下图所示

![init](images/start/cli-start-2.png)

打开 Vue 测试目录下的 user-list 页面效果如下即正常显示了

![init](images/start/cli-start-3.png)
