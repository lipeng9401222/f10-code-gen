---
title: Breadcrumb
originUrl: http://192.168.219.170/docs/vue/latest/component/component/breadcrumb.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/breadcrumb.html)

# Breadcrumb 面包屑

显示当前页面的路径，快速返回之前的任意页面。

## 基础用法

**Demo 示例**: `breadcrumb/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/breadcrumb.html)

```vue
<template>
  <e-breadcrumb separator="/">
    <e-breadcrumb-item :to="{ path: '/' }">homepage</e-breadcrumb-item>
    <e-breadcrumb-item><a href="/">promotion management</a></e-breadcrumb-item>
    <e-breadcrumb-item>promotion list</e-breadcrumb-item>
    <e-breadcrumb-item>promotion detail</e-breadcrumb-item>
  </e-breadcrumb>
</template>

```

## 图标分隔符

**Demo 示例**: `breadcrumb/icon`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/breadcrumb.html)

```vue
<template>
  <e-breadcrumb :separator-icon="ArrowRight">
    <e-breadcrumb-item :to="{ path: '/' }">homepage</e-breadcrumb-item>
    <e-breadcrumb-item>promotion management</e-breadcrumb-item>
    <e-breadcrumb-item>promotion list</e-breadcrumb-item>
    <e-breadcrumb-item>promotion detail</e-breadcrumb-item>
  </e-breadcrumb>
</template>

<script lang="ts" setup>
import { ArrowRight } from '@epoint-fe/eui-icons';
</script>

```

## API

### Breadcrumb Attributes

| Name           | Description              | Type                     | Default |
| -------------- | ------------------------ | ------------------------ | ------- |
| separator      | 分隔符                   | ^[string]                | /       |
| separator-icon | 图标分隔符的组件或组件名 | ^[string] / ^[Component] | -       |

### Breadcrumb Slots

| Name    | Description    | Subtags         |
| ------- | -------------- | --------------- |
| default | 自定义默认内容 | Breadcrumb Item |

## BreadcrumbItem API

### BreadcrumbItem Attributes

| Name    | Description                                                                 | Type                                    | Default |
| ------- | --------------------------------------------------------------------------- | --------------------------------------- | ------- |
| to      | 路由跳转目标，同 `vue-router` 的 `to` 属性                                  | ^[string] / ^[object]`RouteLocationRaw` | ''      |
| replace | 如果设置该属性为 `true`, 导航将不会留下历史记录， 作用同 `location.replace` | ^[boolean]                              | false   |

### BreadcrumbItem Slots

| Name    | Description    |
| ------- | -------------- |
| default | 自定义默认内容 |