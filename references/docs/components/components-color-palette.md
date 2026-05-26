---
title: color-palette
originUrl: http://192.168.219.170/docs/vue/latest/component/component/color-palette.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/color-palette.html)

# ColorPalette 调色板

ColorPalette 是一个支持多种颜色格式的调色板。

## 基本使用

**Demo 示例**: `color-palette/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/color-palette.html)

```vue
<template>
  <div class="demo-color-palette">
    <div class="demo-color-block">
      <span class="demonstration">With default value</span>
      <e-color-palette v-model="color1" />
    </div>
    <div class="demo-color-block">
      <span class="demonstration">With no default value</span>
      <e-color-palette v-model="color2" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const color1 = ref('#409EFF');
const color2 = ref();
</script>

<style lang="scss" scoped>
.demo-color {
  &-palette {
    display: flex;
  }
  &-block {
    flex: 1;
    width: 0;
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    .demonstration {
      display: block;
      margin-bottom: 10px;
    }
  }
}
</style>

```

## 透明度

**Demo 示例**: `color-palette/alpha`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/color-palette.html)

```vue
<template>
  <e-color-palette v-model="color" show-alpha />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const color = ref('rgba(236, 29, 15, 0.8)');
</script>

```

## 预定义颜色

**Demo 示例**: `color-palette/predefined-color`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/color-palette.html)

```vue
<template>
  <e-radio-group v-model="paletteType" @change="paletteTypeChange">
    <e-radio value="1" size="large">默认</e-radio>
    <e-radio value="2" size="large">自定义-一行</e-radio>
    <e-radio value="3" size="large">自定义-多行</e-radio>
  </e-radio-group>
  <e-color-palette v-model="color" :predefine="predefineColors" show-alpha enable-predefine />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const paletteType = ref('1');
const color = ref('rgba(255, 69, 0, 0.68)');
const predefineColors = ref<string[] | string[][] | undefined>(undefined);

const paletteTypeChange = (val: string) => {
  switch (val) {
    case '1':
      predefineColors.value = undefined;
      break;
    case '2':
      predefineColors.value = ['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585'];
      break;
    case '3':
      predefineColors.value = [
        ['#B71C1C', '#C62828', '#D32F2F', '#E53935', '#F44336', '#EF5350', '#E57373', '#EF9A9A'],
        ['#F57F17', '#F9A825', '#FBC02D'],
        ['#004D40', '#00695C', '#00796B', '#00897B', '#009688', '#26A69A'],
      ];
      break;
    default:
      break;
  }
};
</script>

<style lang="scss" scoped>
.demo-color {
  &-palette {
    display: flex;
  }
  &-block {
    flex: 1;
    width: 0;
    margin: 0 10px;
    .demonstration {
      display: block;
      margin-bottom: 10px;
    }
  }
}
</style>

```

## 历史记录

**Demo 示例**: `color-palette/history-color`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/color-palette.html)

```vue
<template>
  <e-color-palette ref="colorPalette" v-model="color" show-alpha enable-predefine enable-history />
  <e-button type="primary" plain style="margin-top: 30px" @click="getValue">getValue</e-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';

const colorPalette = ref();
const color = ref('rgba(255, 69, 0, 0.68)');

const getValue = () => {
  EMessage({
    message: colorPalette.value?.color.value,
  });
};
</script>

```

## API

### Attributes

| Name                  | Description                                  | Type                                                                                                             | Default |
| --------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------- |
| model-value / v-model | 绑定值                                       | ^[string]                                                                                                        | —       |
| show-alpha            | 是否显示透明滑块                             | ^[boolean]                                                                                                       | false   |
| color-format          | v-model 的颜色格式                           | ^[enum]`'hsl' \| 'hsv' \| 'hex' \| 'rgb' \| 'hex' (when show-alpha is false) \| 'rgb' (when show-alpha is true)` | —       |
| predefine             | 预定义的颜色选项                             | ^[object]`string[] \| string[][]`                                                                                              | —       |
| enable-predefine             | 是否启用预定义默认色卡                             | `Boolean`                                                                                              | false       |
| enable-history             | 是否启用历史记录                             | `Boolean`                                                                                              | false       |
| validate-event        | 是否触发表单验证                             | ^[boolean]                                                                                                       | true    |
| id                    | ColorPalette 的 id                            | ^[string]                                                                                                        | —       |

### Events

| Name          | Description                                    | Type                                 |
| ------------- | ---------------------------------------------- | ------------------------------------ |
| active-change | 当前活动颜色改变时触发                         | ^[Function]`(value: string) => void` |

### Exposes

| Name  | Description               | Type                    |
| ----- | ------------------------- | ----------------------- |
| color | 当前颜色对象               | ^[object]`Color`        |
| show  | 手动显示 ColorPalette      | ^[Function]`() => void` |
| hide  | 手动隐藏 ColorPalette      | ^[Function]`() => void` |