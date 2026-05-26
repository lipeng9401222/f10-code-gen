---
title: ColorPicker
originUrl: http://192.168.219.170/docs/vue/latest/component/component/color-picker.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/color-picker.html)

# ColorPicker 颜色选择器

ColorPicker 是一个支持多种颜色格式的颜色选择器。

> **💡 提示**
>
> 当在 SSR (例如：[Nuxt](https://nuxt.com/v3)) 和 SSG (例如：[VitePress](https://vitepress.vuejs.org/)) 中使用时，此组件需要用 `<client-only></client-only>` 进行包裹。

## 基本使用

**Demo 示例**: `color-picker/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/color-picker.html)

```vue
<template>
  <div class="demo-color-block">
    <span class="demonstration">With default value</span>
    <e-color-picker v-model="color1" />
  </div>
  <div class="demo-color-block">
    <span class="demonstration">With no default value</span>
    <e-color-picker v-model="color2" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const color1 = ref('#409EFF');
const color2 = ref();
</script>

<style scoped>
.demo-color-block {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.demo-color-block .demonstration {
  margin-right: 16px;
}
</style>

```

## 透明度

**Demo 示例**: `color-picker/alpha`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/color-picker.html)

```vue
<template>
  <e-color-picker v-model="color" show-alpha />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const color = ref('rgba(19, 206, 102, 0.8)');
</script>

```

## 预定义颜色

**Demo 示例**: `color-picker/predefined-color`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/color-picker.html)

```vue
<template>
  <div class="demo-color-block">
    <span class="demonstration">默认</span>
    <e-color-picker v-model="color1" show-alpha enable-predefine />
  </div>
  <div class="demo-color-block">
    <span class="demonstration">自定义-一行</span>
    <e-color-picker v-model="color2" show-alpha enable-predefine :predefine="predefineColors1" />
  </div>
  <div class="demo-color-block">
    <span class="demonstration">自定义-多行</span>
    <e-color-picker v-model="color2" show-alpha enable-predefine :predefine="predefineColors2" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const color1 = ref('rgba(255, 69, 0, 0.68)');
const color2 = ref('rgba(19, 206, 102, 0.8)');
const predefineColors1 = ref(['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585']);
const predefineColors2 = ref([
  ['#B71C1C', '#C62828', '#D32F2F', '#E53935', '#F44336', '#EF5350', '#E57373', '#EF9A9A'],
  ['#F57F17', '#F9A825', '#FBC02D'],
  ['#004D40', '#00695C', '#00796B', '#00897B', '#009688', '#26A69A'],
]);
</script>

```

## 历史记录

**Demo 示例**: `color-picker/history-color`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/color-picker.html)

```vue
<template>
  <e-color-picker v-model="color" show-alpha enable-predefine enable-history />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const color = ref('rgba(255, 69, 0, 0.68)');
</script>

```

## 尺寸

**Demo 示例**: `color-picker/sizes`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/color-picker.html)

```vue
<template>
  <div class="demo-color-sizes">
    <e-color-picker v-model="color" size="large" />
    <e-color-picker v-model="color" />
    <e-color-picker v-model="color" size="small" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const color = ref('409EFF');
</script>

<style scoped>
.demo-color-sizes .e-color-picker:not(:last-child) {
  margin-right: 16px;
}
</style>

```

## API

### Attributes

| Name                  | Description                                  | Type                                                                                                             | Default |
| --------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------- |
| model-value / v-model | 绑定值                                       | ^[string]                                                                                                        | —       |
| disabled              | 是否禁用 ColorPicker                         | ^[boolean]                                                                                                       | false   |
| size                  | ColorPicker 的尺寸                           | ^[enum]`'large' \| 'default' \| 'small'`                                                                         | —       |
| show-alpha            | 是否显示透明滑块                             | ^[boolean]                                                                                                       | false   |
| color-format          | v-model 的颜色格式                           | ^[enum]`'hsl' \| 'hsv' \| 'hex' \| 'rgb' \| 'hex' (when show-alpha is false) \| 'rgb' (when show-alpha is true)` | —       |
| clearable             | 是否显示清空按钮                             | ^[boolean]                                                                                                       | true    |
| popper-class          | ColorPicker 下拉菜单的自定义类名             | ^[string]                                                                                                        | —       |
| predefine             | 预定义的颜色选项                             | ^[object]`string[] \| string[][]`                                                                                              | —       |
| enable-predefine             | 是否启用预定义默认色卡                             | `Boolean`                                                                                              | false       |
| enable-history             | 是否启用历史记录                             | `Boolean`                                                                                              | false       |
| validate-event        | 是否触发表单验证                             | ^[boolean]                                                                                                       | true    |
| tabindex              | ColorPicker 的 tabindex                      | ^[string] / ^[number]                                                                                            | 0       |
| label<A11yTag/>       | ColorPicker 的 aria-label                    | ^[string]                                                                                                        | —       |
| id                    | ColorPicker 的 id                            | ^[string]                                                                                                        | —       |

### Events

| Name          | Description                                    | Type                                 |
| ------------- | ---------------------------------------------- | ------------------------------------ |
| change        | 当输入值改变时触发                             | ^[Function]`(value: string) => void` |
| active-change | 当前活动颜色改变时触发                         | ^[Function]`(value: string) => void` |

### Exposes

| Name  | Description               | Type                    |
| ----- | ------------------------- | ----------------------- |
| color | 当前颜色对象               | ^[object]`Color`        |
| show  | 手动显示 ColorPicker      | ^[Function]`() => void` |
| hide  | 手动隐藏 ColorPicker      | ^[Function]`() => void` |