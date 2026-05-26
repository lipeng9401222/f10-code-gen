---
title: Affix
originUrl: http://192.168.219.170/docs/vue/latest/component/component/affix.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/affix.html)

# Affix 固定

将元素固定在特定的可视区域内。

## 基础用法

固定钉默认固定在页面顶部。

**Demo 示例**: `affix/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/affix.html)

```vue
<template>
  <e-affix :offset="120">
    <e-button type="primary">Offset top 120px</e-button>
  </e-affix>
</template>

```

## 目标容器

你可以通过设置 `target` 属性来保持固定钉始终在容器内。当超出范围时，它将被隐藏。

**Demo 示例**: `affix/target`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/affix.html)

```vue
<template>
  <div class="affix-container">
    <e-affix target=".affix-container" :offset="80">
      <e-button type="primary">Target container</e-button>
    </e-affix>
  </div>
</template>
<style scoped>
.affix-container {
  text-align: center;
  height: 400px;
  border-radius: 4px;
  background: var(--e-color-primary-light-9);
}
</style>

```

## 固定位置

固定钉组件提供两种固定位置：`top` 和 `bottom`。

**Demo 示例**: `affix/fixed`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/affix.html)

```vue
<template>
  <e-affix position="bottom" :offset="20">
    <e-button type="primary">Offset bottom 20px</e-button>
  </e-affix>
</template>

```

## Affix API

### Affix Attributes

| Name       | Description              | Type                       | Default | Required |
| ---------- | ------------------------ | -------------------------- | ------- | -------- |
| `offset`   | 偏移距离。               | ^[number]                  | `0`     | No       |
| `position` | 固定钉的位置。           | ^[enum]`'top' \| 'bottom'` | `'top'` | No       |
| `target`   | 目标容器。（CSS 选择器） | ^[string]                  | —       | No       |
| `z-index`  | 固定钉的 `z-index`       | ^[number]                  | `100`   | No       |

### Affix Events

| Name     | Description          | Type                                                                |
| -------- | -------------------- | ------------------------------------------------------------------- |
| `change` | 固定状态改变时触发。 | ^[Function]`(fixed: boolean) => void`                               |
| `scroll` | 滚动时触发。         | ^[Function]`(value: { scrollTop: number, fixed: boolean }) => void` |

### Affix Exposes

| Method       | Description        | Type                    |
| ------------ | ------------------ | ----------------------- |
| `update`     | 手动更新固定钉状态 | ^[Function]`() => void` |
| `updateRoot` | 更新根节点信息     | ^[Function]`() => void` |

### Affix Slots

| Name      | Description      |
| --------- | ---------------- |
| `default` | 自定义默认内容。 |