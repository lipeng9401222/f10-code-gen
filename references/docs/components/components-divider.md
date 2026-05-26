---
title: Divider 分割线
originUrl: http://192.168.219.170/docs/vue/latest/component/component/divider.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/divider.html)

# Divider 分割线

区隔内容的分割线。

## 基础用法

对不同段落的文本进行分割。

**Demo 示例**: `divider/basic-usage`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/divider.html)

```vue
<template>
  <div>
    <span> 今天早晨，我坐在窗前，世界像一个路人一样停下来片刻，向我点头然后离去。 </span>
    <e-divider />
    <span> 那里，小小的念头就像树叶的沙沙声；它们在我的心灵中轻声细语，传递着喜悦。 </span>
  </div>
</template>

```

## 设置文案

可以在分割线上自定义文本内容。

**Demo 示例**: `divider/custom-content`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/divider.html)

```vue
<template>
  <div>
    <span>你所看到的不是你自己，而是你的影子。</span>
    <e-divider content-position="left">拉宾德拉纳特·泰戈尔</e-divider>
    <span>我的愿望是傻瓜，它们在你的歌声中呼喊，我的大师。让我只是倾听。</span>
    <e-divider>
      <e-icon><star-filled /></e-icon>
    </e-divider>
    <span>我不能选择最好的。最好的选择了我。</span>
    <e-divider content-position="right">拉宾德拉纳特·泰戈尔</e-divider>
  </div>
</template>

<script lang="ts" setup>
import { StarFilled } from '@epoint-fe/eui-icons';
</script>

```

## 虚线

您可以设置分隔符的样式。

**Demo 示例**: `divider/line-dashed`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/divider.html)

```vue
<template>
  <div>
    <span>大海，你使用的是什么语言？</span>
    <e-divider border-style="dashed" />
    <span>永恒问题的语言。</span>
  </div>
  <e-divider border-style="dotted" />
  <span>天空，你的答案是什么语言？</span>
  <e-divider border-style="double" />
  <span>永恒沉默的语言。</span>
</template>

```

## 垂直分隔线

**Demo 示例**: `divider/vertical-divider`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/divider.html)

```vue
<template>
  <div>
    <span>雨</span>
    <e-divider direction="vertical" />
    <span>首页</span>
    <e-divider direction="vertical" border-style="dashed" />
    <span>草</span>
  </div>
</template>

```

## API

### Attributes

| Name             | Description            | Type                                                                                                                                        | Default    |
| ---------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| direction        | 设置分割线方向         | ^[enum]`'horizontal' \| 'vertical'`                                                                                                         | horizontal |
| border-style     | 设置分隔符样式         | ^[enum]`'none' \| 'solid' \| 'hidden' \| 'dashed' \| ...` [css/border-style](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-style) | solid      |
| content-position | 自定义分隔线内容的位置 | ^[enum]`'left' \| 'right' \| 'center' `                                                                                                     | center     |

### Slots

| Name    | Description          |
| ------- | -------------------- |
| default | 设置分割线文案的位置 |