---
title: Text
originUrl: http://192.168.219.170/docs/vue/latest/component/component/text.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/text.html)

# Text 文本

用于文本显示。

## 基础

**Demo 示例**: `text/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/text.html)

```vue
<template>
  <e-text class="mx-1">Default</e-text>
  <e-text class="mx-1" type="primary">Primary</e-text>
  <e-text class="mx-1" type="success">Success</e-text>
  <e-text class="mx-1" type="info">Info</e-text>
  <e-text class="mx-1" type="warning">Warning</e-text>
  <e-text class="mx-1" type="danger">Danger</e-text>
</template>

```

## 尺寸

**Demo 示例**: `text/sizes`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/text.html)

```vue
<template>
  <e-text class="mx-1" size="large">Large</e-text>
  <e-text class="mx-1">Default</e-text>
  <e-text class="mx-1" size="small">Small</e-text>
</template>

```

## 省略号

**Demo 示例**: `text/truncated`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/text.html)

```vue
<template>
  <e-text class="w-100px" truncated>Self element set width 100px</e-text>
  <e-row>
    <e-col :span="4">
      <e-text truncated>Squeezed by parent element</e-text>
    </e-col>
  </e-row>
</template>

```

## 覆盖

**Demo 示例**: `text/override`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/text.html)

```vue
<template>
  <e-space direction="vertical">
    <e-text>span</e-text>
    <e-text tag="p">This is a paragraph.</e-text>
    <e-text tag="b">Bold</e-text>
    <e-text tag="i">Italic</e-text>
    <e-text>
      This is
      <e-text tag="sub" size="small">subscript</e-text>
    </e-text>
    <e-text>
      This is
      <e-text tag="sup" size="small">superscript</e-text>
    </e-text>
    <e-text tag="ins">Inserted</e-text>
    <e-text tag="del">Deleted</e-text>
    <e-text tag="mark">Marked</e-text>
  </e-space>
</template>

```

## 混合

**Demo 示例**: `text/mixed`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/text.html)

```vue
<template>
  <e-space direction="vertical">
    <e-text>
      <e-icon>
        <Flag />
      </e-icon>
      旗帜
    </e-text>
    <e-row>
      <e-text>Rate</e-text>
      <e-rate class="ml-1" />
    </e-row>
    <e-text>
      This is text mixed icon
      <e-icon>
        <Bell />
      </e-icon>
      and component
      <e-button>Button</e-button>
    </e-text>
  </e-space>
</template>

<script lang="ts" setup>
import { Bell, Flag } from '@epoint-fe/eui-icons';
</script>

```

## API

### Attributes

| Name      | Description    | Type                                                               | Default |
| --------- | -------------- | ------------------------------------------------------------------ | ------- |
| type      | 文本类型       | ^[enum]`'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | —       |
| size      | 文本尺寸       | ^[enum]`'large' \| 'default' \| 'small'`                           | default |
| truncated | 渲染省略号     | ^[boolean]                                                         | false   |
| tag       | 自定义元素标签 | ^[string]                                                          | span    |

### Slots

| Name    | Description |
| ------- | ----------- |
| default | 默认内容    |