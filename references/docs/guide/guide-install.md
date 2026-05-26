---
title: 安装
originUrl: http://192.168.219.170/docs/vue/latest/component/guide/install.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/guide/install.html)

# 安装

> **💡 提示**
>
> 如果你是在框架的模板仓库中使用，则无需进行安装，直接使用即可，
> 框架仓库中已经安装并使用了此组件库。
> 
> 本文档仅介绍单独安装的情况。

## npm

```shell
npm install @epoint-fe/eui-components
```

> **💡 提示**
>
> 安装前请确保已经配置使用公司的私有 npm 仓库，因为此组件库仅在内部发布。
> 如果没有配置，请参考 [开发环境准备 - 添加公司私有源](http://192.168.219.170/docs/vue/latest/frame/guide/development-environment.html#use-epoint-npm-repository)。

使用如下：

在你 vue 项目的 `main.js` 中

```ts
import { createApp } from 'vue';
// 引入样式
import '@epoint-fe/eui-components/dist/index.css';
// 引入组件库
import EuiComponents from '@epoint-fe/eui-components';

const app = createApp({
  /*...*/
});

// 全局使用
app.use(EuiComponents);
```

如果不要全局引入，则不使用 use，在需要使用的文件中按需导入组件即可：

```ts
// main.js 中
// 引入样式
import '@epoint-fe/eui-components/dist/index.css';

// 其他文件中
// 按需导入组件使用
import { EButton, ETable } from '@epoint-fe/eui-components';
```

## browsers

如果你不想使用 npm，你也可以直接在浏览器中引入组件库的 js 和 css 文件，示例如下：

```html
<head>
  <!-- 引入组件库的 样式文件 -->
  <link rel="stylesheet" href="./eui-components/dist/index.css" />
  <!-- 引入vue3 -->
  <script src="//unpkg.com/vue@3"></script>
  <!-- 引入组件库的 js -->
  <script src="./eui-components/dist/index.min.js"></script>
</head>
```

```html
<body>
  <div id="app"></div>
  <script>
    const { createApp } = Vue;
    const App = {
      template: '<e-button>Hello Epoint</e-button>',
    };
    var app = createApp(App);
    app.use(EuiComponents);
    app.mount('#app');
  </script>
</body>
```

你可以通过如下的方式获取组件库的文件：

1. npm 安装后，可以在 `node_modules/@epoint-fe/eui-components/dist` 目录下找到
2. 也可以在 GitLab 中的 Release 页面下载

## Hello World

以下是一个最简单的示例：

<!-- 
```vue
<template>
  <e-button>hello world</e-button>
</template>
```
 -->

:::demo

install/hello-world

:::

<!-- 
<client-only>
  <iframe src="" style="width:100%;height: 500px;border:none"></iframe>
</client-only>
 -->