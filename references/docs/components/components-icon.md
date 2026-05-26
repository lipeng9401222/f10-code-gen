---
title: Icon
originUrl: http://192.168.219.170/docs/vue/latest/component/component/icon.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/icon.html)

# Icon 图标

EUI-VUE 提供了一套常用的图标集合的 Vue 组件。

## Icon Usage

- 如果你想像用例一样**直接使用**，你需要 [全局注册组件](https://v3.vuejs.org/guide/component-registration.html#global-registration) ， 才能够直接在项目里使用。

- 如若需要查看所有可用的 SVG 图标请查阅 [@epoint-fe/eui-icons](http://192.168.217.8/febase/vue/eui-icons)

## 安装

### 使用包管理器

```shell
# NPM
$ npm install @epoint-fe/eui-icons
# Yarn
$ yarn add @epoint-fe/eui-icons
# pnpm
$ pnpm install @epoint-fe/eui-icons
```

### 注册所有图标

您可以参考下面的代码从 `@epoint-fe/eui-icons` 中导入所有图标并进行全局注册。

```ts
// main.ts
import * as EuiVueIcons from '@epoint-fe/eui-icons';

const app = createApp(App);
for (const [key, component] of Object.entries(EuiVueIcons)) {
  // 但是不推荐这样做，目前有很多图标，可能和工程中组件相互冲突
  // app.component(key, component);
  // 可以加一个前缀， 如 icon-
  app.component(`Icon${key}`, component);
}
```

### 浏览器直接引入

npm 包中的 dist 目录下的 `index.iife.js` 文件 或 `global.iife.js`， 可以直接在浏览器中引入使用，他们将添加 `EuiVueIcons` 的全局变量

## 基础用法

:::warning
某些图标的名称可能和 HTML 标签相同，此时直接使用图标名称注册为组件可能无法正常使用。 如： menu 和 button ，这时候你需要图标别名来进行渲染。
:::

<!-- eslint-skip -->

```vue
<!-- 使用 e-icon 为 SVG 图标提供属性 -->
<template>
  <div>
    <e-icon :size="size" :color="color">
      <Edit />
    </e-icon>
    <!-- 或者独立使用它，不从父级获取属性 -->
    <Edit />
    <!--  -->
    <Menu />
  </div>
</template>
<script setup>
import { Edit, Share, Delete, Search, Loading, Menu, Button } from '@epoint-fe/eui-icons';
</script>
```

<vp-script setup>
import { Edit, Share, Delete, Search, Loading, Menu, Button } from '@epoint-fe/eui-icons'
</vp-script>

<ERow>
  <div>
    <EIcon :size="30">
      <Edit />
    </EIcon>
    <Edit />
    <Menu />
    <Button />
  </div>
</ERow>

## 结合 e-icon 使用

`e-icon` 为 raw SVG 图标提供额外的属性, 提供的详细属性请继续阅读。

```vue
<template>
  <p>
    with extra class <b>is-loading</b>, your icon is able to rotate 360 deg in 2
    seconds, you can also override this
  </p>
  <e-icon :size="20">
    <Edit />
  </e-icon>
  <e-icon color="#409EFC" class="no-inherit">
    <Share />
  </e-icon>
  <e-icon>
    <Delete />
  </e-icon>
  <e-icon class="is-loading">
    <Loading />
  </e-icon>
  <e-button type="primary">
    <e-icon style="vertical-align: middle">
      <Search />
    </e-icon>
    <span style="vertical-align: middle"> Search </span>
  </e-button>
</template>
```

<ERow>
  <p>
    通过添加额外的类名 <b>is-loading</b>，你的图标就可以在 2 秒内旋转 360 度，当然你也可以自己改写想要的动画。
  </p>
  <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
    <EIcon :size="20">
      <Edit />
    </EIcon>
    <EIcon color="#409EFC" class="no-inherit">
      <Share />
    </EIcon>
    <EIcon>
      <Delete />
    </EIcon>
    <EIcon class="is-loading">
      <Loading />
    </EIcon>
    <EButton type="primary">
      <EIcon style="vertical-align: middle; color: #fff;">
        <Search />
      </EIcon>
      <span style="vertical-align: middle;"> Search </span>
    </EButton>
  </div>
</ERow>

## 直接使用 SVG 图标

```vue
<template>
  <div style="font-size: 20px">
    <!-- 由于SVG图标默认不携带任何属性 -->
    <!-- 你需要直接提供它们 -->
    <Edit style="width: 1em; height: 1em; margin-right: 8px" />
    <Share style="width: 1em; height: 1em; margin-right: 8px" />
    <Delete style="width: 1em; height: 1em; margin-right: 8px" />
    <Search style="width: 1em; height: 1em; margin-right: 8px" />
  </div>
</template>
```

<ERow>
  <div style="font-size: 20px;">
    <!-- Since svg icons do not carry any attributes by default -->
    <!-- You need to provide attributes directly -->
    <Edit style="width: 1em; height: 1em; margin-right: 8px;" />
    <Share style="width: 1em; height: 1em; margin-right: 8px;" />
    <Delete style="width: 1em; height: 1em; margin-right: 8px;" />
    <Search style="width: 1em; height: 1em; margin-right: 8px;" />
  </div>
</ERow>

## 图标集合{#icon-collection}

您可以点击图标复制代码

<IconList />

## API

### Attributes

| Name  | Description                 | Type                  | Default                |
| ----- | --------------------------- | --------------------- | ---------------------- |
| color | svg 的 fill 颜色            | ^[string]             | inherit from color     |
| size  | SVG 图标的大小，size x size | ^[number] / ^[string] | inherit from font size |

### Slots

| Name    | Description    |
| ------- | -------------- |
| default | 自定义默认内容 |