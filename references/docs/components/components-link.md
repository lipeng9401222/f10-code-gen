---
title: Link 链接
originUrl: http://192.168.219.170/docs/vue/latest/component/component/link.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/link.html)

# Link 链接

文字超链接

## 基础用法

基础的文字链接用法。

**Demo 示例**: `link/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/link.html)

```vue
<template>
  <div>
    <e-link href="https://element-plus.org" target="_blank">default</e-link>
    <e-link type="primary">primary</e-link>
    <e-link type="success">success</e-link>
    <e-link type="warning">warning</e-link>
    <e-link type="danger">danger</e-link>
    <e-link type="info">info</e-link>
  </div>
</template>
<style scoped>
.e-link {
  margin-right: 8px;
}
.e-link .e-icon--right.e-icon {
  vertical-align: text-bottom;
}
</style>

```

## 禁用状态

文字链接不可用状态。

**Demo 示例**: `link/disabled`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/link.html)

```vue
<template>
  <div>
    <e-link disabled>default</e-link>
    <e-link type="primary" disabled>primary</e-link>
    <e-link type="success" disabled>success</e-link>
    <e-link type="warning" disabled>warning</e-link>
    <e-link type="danger" disabled>danger</e-link>
    <e-link type="info" disabled>info</e-link>
  </div>
</template>
<style scoped>
.e-link {
  margin-right: 8px;
}
.e-link .e-icon--right.e-icon {
  vertical-align: text-bottom;
}
</style>

```

## 下划线

文字链接下划线。

**Demo 示例**: `link/underline`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/link.html)

```vue
<template>
  <div>
    <e-link :underline="false">Without Underline</e-link>
    <e-link>With Underline</e-link>
  </div>
</template>
<style scoped>
.e-link {
  margin-right: 8px;
}
.e-link .e-icon--right.e-icon {
  vertical-align: text-bottom;
}
</style>

```

## 图标

带图标的链接

> **💡 提示**
>
> 使用 `icon` 属性来为按钮添加图标。 您可以传递组件名称的字符串（提前注册）或组件本身是一个 SVG Vue 组件。 EUI-VUE 提供了一组图标，您可以在 [icon](components-icon.md)

**Demo 示例**: `link/with-icon`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/link.html)

```vue
<template>
  <div>
    <e-link :icon="Edit">Edit</e-link>
    <e-link>
      Check<e-icon class="e-icon--right"><icon-view /></e-icon>
    </e-link>
  </div>
</template>

<script setup lang="ts">
import { Edit, View as IconView } from '@epoint-fe/eui-icons';
</script>

<style scoped>
.e-link {
  margin-right: 8px;
}
</style>

```

## 按钮链接

当需要按钮样式的链接时，可以使用[按钮组件](components-button.md)的 `link` 状态。

**Demo 示例**: `link/button`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/link.html)

```vue
<template>
  <p>Basic link button</p>
  <div class="flex justify-space-between mb-4 flex-wrap gap-4">
    <e-button v-for="button in buttons" :key="button.text" :type="button.type" link>{{ button.text }}</e-button>
  </div>

  <p>Disabled link button</p>
  <div class="flex justify-space-between flex-wrap gap-4">
    <e-button v-for="button in buttons" :key="button.text" :type="button.type" link disabled>{{
      button.text
    }}</e-button>
  </div>
</template>

<script setup lang="ts">
const buttons = [
  { type: '', text: 'plain' },
  { type: 'primary', text: 'primary' },
  { type: 'success', text: 'success' },
  { type: 'info', text: 'info' },
  { type: 'warning', text: 'warning' },
  { type: 'danger', text: 'danger' },
] as const;
</script>

```

## API

### Attributes

| Name      | Description      | Type                                                                            | Default |
| --------- | ---------------- | ------------------------------------------------------------------------------- | ------- |
| type      | 类型             | ^[enum]`'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | default |
| underline | 是否下划线       | ^[boolean]                                                                      | true    |
| disabled  | 是否禁用状态     | ^[boolean]                                                                      | false   |
| href      | 原生 `href` 属性 | ^[string]                                                                       | —       |
| icon      | 图标组件         | ^[string] / ^[Component]                                                        | —       |

### Slots

| Name    | Description    |
| ------- | -------------- |
| default | 自定义默认内容 |
| icon    | 自定义图标组件 |