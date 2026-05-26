---
title: Empty 空状态
originUrl: http://192.168.219.170/docs/vue/latest/component/component/empty.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/empty.html)

# Empty 空状态

空状态时的占位提示。

## 基础用法

**Demo 示例**: `empty/basic-usage`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/empty.html)

```vue
<template>
  <e-empty description="description" />
</template>

```

## 自定义图片

通过设置 `image` 属性传入图片 URL。

**Demo 示例**: `empty/custom-image`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/empty.html)

```vue
<template>
  <e-empty image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" />
</template>

```

## 图片尺寸

通过使用 `image-size` 属性来控制图片大小。

**Demo 示例**: `empty/image-size`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/empty.html)

```vue
<template>
  <e-empty :image-size="200" />
</template>

```

## 底部内容

使用默认插槽可在底部插入内容。

**Demo 示例**: `empty/bottom-content`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/empty.html)

```vue
<template>
  <e-empty>
    <e-button type="primary">Button</e-button>
  </e-empty>
</template>

```

## 自定义样式

您可以为 empty 组件设置自定义样式。 使用 css/scss 语言来更改全局或局部颜色。 我们设置了一些全局颜色变量：`--e-empty-fill-color-0`、`--e-empty-fill-color-1`、`--e-empty-fill-color-2`、……、`--e-empty-fill-color-4`。 您可以使用类似 `:root { --e-empty-fill-color-0: red; --e-empty-fill-color-1: blue; }` 等变量。 但通常，如果你想要更改样式，你需要更改所有颜色，因为这些颜色是一个组合。

### 默认变量

| Variable               | Color                |
| ---------------------- | -------------------- |
| --e-empty-fill-color-0 | var(--e-color-white) |
| --e-empty-fill-color-1 | #f5f5f5              |
| --e-empty-fill-color-2 | #f0f0f0              |
| --e-empty-fill-color-3 | #e5e5e5              |
| --e-empty-fill-color-4 | #dedede              |

## API

### Attributes

| Name        | Description                  | Type      | Default |
| ----------- | ---------------------------- | --------- | ------- |
| image       | empty 组件的图像地址         | ^[string] | ''      |
| image-size  | empty 组件的图像尺寸（宽度） | ^[number] | 100       |
| description | empty 组件的描述信息         | ^[string] | ''      |

### Slots

| Name        | Description        |
| ----------- | ------------------ |
| default     | 作为底部内容的内容 |
| image       | 作为图像的内容     |
| description | 作为描述的内容     |