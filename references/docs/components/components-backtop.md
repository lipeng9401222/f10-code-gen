---
title: Backtop 返回顶部
originUrl: http://192.168.219.170/docs/vue/latest/component/component/backtop.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/backtop.html)

# Backtop 返回顶部

返回顶部的按钮组件。

## 基础用法

向下滚动页面可以看到右下角的按钮。

**Demo 示例**: `backtop/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/backtop.html)

```vue
<template>
  Scroll down to see the bottom-right button.
  <e-backtop :right="100" :bottom="100" />
</template>

```

## 自定义样式

显示区域为 40px \* 40px。

**Demo 示例**: `backtop/custom`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/backtop.html)

```vue
<template>
  Scroll down to see the bottom-right button.
  <e-backtop :bottom="100">
    <div
      style="
        height: 100%;
        width: 100%;
        background-color: var(--e-bg-color-overlay);
        box-shadow: var(--e-box-shadow-lighter);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      "
    >
      UP
    </div>
  </e-backtop>
</template>

```

## API

### Attributes

| Name              | Description                      | Type      | Default |
| ----------------- | -------------------------------- | --------- | ------- |
| target            | 触发滚动的目标元素。             | ^[string] | —       |
| visibility-height | 滚动高度达到此值后按钮才会显示。 | ^[number] | 200     |
| right             | 右边距。                         | ^[number] | 40      |
| bottom            | 底边距。                         | ^[number] | 40      |

### Events

| Name  | Description  | Parameters                             |
| ----- | ------------ | -------------------------------------- |
| click | 点击时触发。 | ^[Function]`(evt: MouseEvent) => void` |

### Slots

| Name    | Description      |
| ------- | ---------------- |
| default | 自定义默认内容。 |