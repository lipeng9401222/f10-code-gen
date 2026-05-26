---
title: Watermark
originUrl: http://192.168.219.170/docs/vue/latest/component/component/watermark.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/watermark.html)

# Watermark 水印

在页面上添加文本或图片等水印信息。

## 基础用法

基础用法

**Demo 示例**: `watermark/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/watermark.html)

```vue
<script setup lang="ts">
import { reactive } from 'vue';

const font = reactive({
  color: 'rgba(0, 0, 0, 0.15)',
});
</script>

<template>
  <e-watermark :font="font">
    <div style="height: 200px" />
  </e-watermark>
</template>

```

## 指令用法

使用 `v-watermark` 指令可以为任意元素添加水印效果。指令接受一个对象作为参数，支持所有组件的属性配置项。

**Demo 示例**: `watermark/instruction`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/watermark.html)

```vue
<script setup lang="ts">
import { reactive } from 'vue';
const config = reactive({
  content: 'Eui Vue',
  font: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.15)',
  },
  zIndex: 99,
  rotate: -22,
  gap: [100, 100] as [number, number],
  offset: [0, 0] as [number, number],
});
</script>

<template>
  <div v-watermark="config" style="height: 200px" />
</template>

```

## 多行水印

使用 "content" 设置一个字符串数组来指定多行文本水印内容

**Demo 示例**: `watermark/multi-line`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/watermark.html)

```vue
<script setup lang="ts">
import { reactive } from 'vue';
const font = reactive({
  color: 'rgba(0, 0, 0, .15)',
});
</script>

<template>
  <e-watermark :font="font" :content="['Eui', 'Epoint Eui']">
    <div style="height: 500px" />
  </e-watermark>
</template>

```

## 图片水印

通过 'image' 指定图像地址。 为了确保图像清晰展示而不是被拉伸，请设置宽度和高度，建议使用至少两倍的宽度和高度的图片来保证显示效果。

**Demo 示例**: `watermark/image`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/watermark.html)

```vue
<template>
  <e-watermark
    :width="70"
    :height="57"
    image="http://192.168.219.170/fetc/usr/themes/Typecho-Joe-Theme-master/assets/img/logo.png"
  >
    <div style="height: 500px" />
  </e-watermark>
</template>

```

## 自定义配置

配置自定义参数预览水印效果。

**Demo 示例**: `watermark/custom`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/watermark.html)

```vue
<script setup lang="ts">
import { reactive } from 'vue';

const config = reactive({
  content: 'Eui Vue',
  font: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.15)',
  },
  zIndex: -1,
  rotate: -22,
  gap: [100, 100] as [number, number],
  offset: [0, 0] as [number, number],
});
</script>

<template>
  <div class="wrapper">
    <e-watermark
      class="watermark"
      :content="config.content"
      :font="config.font"
      :z-index="config.zIndex"
      :rotate="config.rotate"
      :gap="config.gap"
      :offset="config.offset"
    >
      <div class="demo">
        <h1>Eui</h1>
        <h2>A Vue 3 based component library for designers and developers</h2>
        <img src="/images/hamburger.png" alt="示例图片" />
      </div>
    </e-watermark>
    <e-form class="form" :model="config" label-position="top" label-width="50px">
      <e-form-item label="Content">
        <e-input v-model="config.content" />
      </e-form-item>
      <e-form-item label="Color">
        <e-color-picker v-model="config.font.color" show-alpha />
      </e-form-item>
      <e-form-item label="FontSize">
        <e-slider v-model="config.font.fontSize" />
      </e-form-item>
      <e-form-item label="zIndex">
        <e-slider v-model="config.zIndex" />
      </e-form-item>
      <e-form-item label="Rotate">
        <e-slider v-model="config.rotate" :min="-180" :max="180" />
      </e-form-item>
      <e-form-item label="Gap">
        <e-space>
          <e-input-number v-model="config.gap[0]" controls-position="right" />
          <e-input-number v-model="config.gap[1]" controls-position="right" />
        </e-space>
      </e-form-item>
      <e-form-item label="Offset">
        <e-space>
          <e-input-number v-model="config.offset[0]" placeholder="offsetLeft" controls-position="right" />
          <e-input-number v-model="config.offset[1]" placeholder="offsetTop" controls-position="right" />
        </e-space>
      </e-form-item>
    </e-form>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
}
.watermark {
  display: flex;
  flex: auto;
}
.demo {
  flex: auto;
}
.form {
  width: 330px;
  margin-left: 20px;
  border-left: 1px solid #eee;
  padding-left: 20px;
}

img {
  z-index: 10;
  width: 100%;
  max-width: 300px;
  position: relative;
}
</style>

```

## API

### Attributes

| Name    | Description                                  | Type                          | Default                    |
| ------- | -------------------------------------------- | ----------------------------- | -------------------------- |
| width   | 水印的宽度, `content` 的默认值是它自己的宽度 | ^[number]                     | 120                        |
| height  | 水印的宽度, `content` 的默认值是它自己的高度 | ^[number]                     | 64                         |
| rotate  | 水印的旋转角度, 单位 `°`                     | ^[number]                     | -22                        |
| zIndex  | 水印元素的 z-index 值                        | ^[number]                     | 999                        |
| image   | 水印图片，建议使用 2x 或 3x 图像             | ^[string]                     | —                          |
| content | 水印文本内容                                 | ^[string]/^[object]`string[]` | —                          |
| font    | 文字样式                                     | [Font](#font)                 | [Font](#font)              |
| gap     | 水印之间的间距                               | ^[object]`[number, number]`   | \[100, 100\]               |
| offset  | 水印从容器左上角的偏移 默认值为 gap/2        | ^[object]`[number, number]`   | \[gap\[0\]/2, gap\[1\]/2\] |

### Font

| Name         | Description | Type                                                                                 | Default         |
| ------------ | ----------- | ------------------------------------------------------------------------------------ | --------------- |
| color        | 字体颜色    | ^[string]                                                                            | rgba(0,0,0,.15) |
| fontSize     | 字体大小    | ^[number]                                                                            | 16              |
| fontWeight   | 字重        | ^[enum]`'normal' \| 'light' \| 'bold' \| number`                                     | normal          |
| fontFamily   | 字体        | ^[string]                                                                            | sans-serif      |
| fontStyle    | 字体样式    | ^[enum]`'none' \| 'normal' \| 'italic' \| 'oblique'`                                 | normal          |
| textAlign    | 文本对齐    | ^[enum]`'left' \| 'right' \| 'center' \| 'start' \| 'end' `                          | center          |
| textBaseline | 文本基线    | ^[enum]`'top' \| 'hanging' \| 'middle' \| 'alphabetic' \| 'ideographic' \| 'bottom'` | hanging         |

### Slots

| Name    | Description    |
| ------- | -------------- |
| default | 添加水印的容器 |

### Directives

| Name        | Description                          | Type                      |
| ----------- | ------------------------------------ | ------------------------- |
| v-watermark | 为元素添加水印，支持所有组件属性配置 | ^[object]`WatermarkProps` |