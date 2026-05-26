---
title: Slider 滑块
originUrl: http://192.168.219.170/docs/vue/latest/component/component/slider.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/slider.html)

# Slider 滑块

将滑块在固定范围内拖动。

> **💡 提示**
>
> 在 SSR 中使用此组件时（例如：[Nuxt](https://nuxt.com/v3)）和 SSG 中使用此组件时（例如：[VitePress](https://vitepress.vuejs.org/)），需要将其包装在 `<client-only></client-only>` 中。

## 基本用法

拖动滑块时会显示当前值。

**Demo 示例**: `slider/basic-usage`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/slider.html)

```vue
<template>
  <div class="slider-demo-block">
    <span class="demonstration">Default value</span>
    <e-slider v-model="value1" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Customized initial value</span>
    <e-slider v-model="value2" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Hide Tooltip</span>
    <e-slider v-model="value3" :show-tooltip="false" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Format Tooltip</span>
    <e-slider v-model="value4" :format-tooltip="formatTooltip" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Disabled</span>
    <e-slider v-model="value5" disabled />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref(0);
const value2 = ref(0);
const value3 = ref(0);
const value4 = ref(0);
const value5 = ref(0);

const formatTooltip = (val: number) => {
  return val / 100;
};
</script>
<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .e-slider {
  margin-top: 0;
  margin-left: 12px;
}
.slider-demo-block .demonstration {
  font-size: 14px;
  color: var(--e-text-color-secondary);
  line-height: 44px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
.slider-demo-block .demonstration + .e-slider {
  flex: 0 0 70%;
}
</style>

```

## 离散值

选项可以是离散的。

**Demo 示例**: `slider/discrete-values`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/slider.html)

```vue
<template>
  <div class="slider-demo-block">
    <span class="demonstration">Breakpoints not displayed</span>
    <e-slider v-model="value1" :step="10" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Breakpoints displayed</span>
    <e-slider v-model="value2" :step="10" show-stops />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref(0);
const value2 = ref(0);
</script>
<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .e-slider {
  margin-top: 0;
  margin-left: 12px;
}
.slider-demo-block .demonstration {
  font-size: 14px;
  color: var(--e-text-color-secondary);
  line-height: 44px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
.slider-demo-block .demonstration + .e-slider {
  flex: 0 0 70%;
}
</style>

```

## 带输入框的滑块

通过输入框设置值。

**Demo 示例**: `slider/slider-with-input-box`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/slider.html)

```vue
<template>
  <div class="slider-demo-block">
    <e-slider v-model="value" show-input />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(0);
</script>
<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .e-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>

```

## 尺寸

**Demo 示例**: `slider/sizes`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/slider.html)

```vue
<template>
  <e-slider v-model="value" show-input size="large" />
  <e-slider v-model="value" show-input />
  <e-slider v-model="value" show-input size="small" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(0);
</script>

<style scoped>
.e-slider {
  margin-top: 20px;
}

.e-slider:first-child {
  margin-top: 0;
}
</style>
<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .e-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>

```

## 放置位置

您可以自定义工具提示的放置位置。

**Demo 示例**: `slider/placement`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/slider.html)

```vue
<template>
  <div class="slider-demo-block">
    <e-slider v-model="value1" />
  </div>
  <div class="slider-demo-block">
    <e-slider v-model="value2" placement="bottom" />
  </div>
  <div class="slider-demo-block">
    <e-slider v-model="value3" placement="right" />
  </div>
  <div class="slider-demo-block">
    <e-slider v-model="value4" placement="left" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref(0);
const value2 = ref(0);
const value3 = ref(0);
const value4 = ref(0);
</script>
<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .e-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>

```

## 范围选择

支持选择一定范围的值。

**Demo 示例**: `slider/range-selection`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/slider.html)

```vue
<template>
  <div class="slider-demo-block">
    <e-slider v-model="value" range show-stops :max="10" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref([4, 8]);
</script>
<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .e-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>

```

## 垂直模式

**Demo 示例**: `slider/vertical-mode`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/slider.html)

```vue
<template>
  <div class="slider-demo-block">
    <e-slider v-model="value" vertical height="200px" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(0);
</script>
<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .e-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>

```

## 显示刻度

**Demo 示例**: `slider/show-marks`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/slider.html)

```vue
<template>
  <div class="slider-demo-block">
    <e-slider v-model="value" range :marks="marks" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { CSSProperties } from 'vue';

interface Mark {
  style: CSSProperties;
  label: string;
}

type Marks = Record<number, Mark | string>;

const value = ref([30, 60]);
const marks = reactive<Marks>({
  0: '0°C',
  8: '8°C',
  37: '37°C',
  50: {
    style: {
      color: '#1989FA',
    },
    label: '50%',
  },
});
</script>
<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .e-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>

```

## API

### Attributes

| Name                  | Description                                                                             | Type            | Default |
| --------------------- | --------------------------------------------------------------------------------------- | --------------- | ------- |
| model-value / v-model | 绑定的值                                                                                | ^[number]          | 0       |
| min                   | 最小值                                                                                  | ^[number]          | 0       |
| max                   | 最大值                                                                                  | ^[number]          | 100     |
| disabled              | 是否禁用滑块                                                                            | ^[boolean]         | false   |
| step                  | 步进大小                                                                                | ^[number]          | 1       |
| show-input            | 是否显示输入框，仅在 `range` 为 `false` 时有效                                          | ^[boolean]         | false   |
| show-input-controls   | 是否显示控制按钮，仅当 `show-input` 为 `true` 时有效                                    | ^[boolean]         | true    |
| size                  | 滑块包装器的尺寸，不适用于垂直模式                                                      | ^[枚举]`'large' \| 'default' \| 'small'` | default |
| input-size            | 输入框的尺寸，当设置 `size` 时，默认值是 `size`                                         | ^[枚举]`'large' \| 'default' \| 'small'` | default |
| show-stops            | 是否显示断点                                                                            | ^[boolean]         | false   |
| show-tooltip          | 是否显示工具提示值                                                                      | ^[boolean]         | true    |
| format-tooltip        | 工具提示值的格式化方法                                                                  | function(value) | —       |
| range                 | 是否选择一个范围                                                                        | ^[boolean]         | false   |
| vertical              | 垂直模式                                                                                | ^[boolean]         | false   |
| height                | 滑块的高度，在垂直模式下需要设置                                                        | ^[string]          | —       |
| label                 | 屏幕阅读器的标签                                                                        | ^[string]          | —       |
| range-start-label     | 当 `range` 为 `true` 时，起始范围的屏幕阅读器标签                                       | ^[string]          | —       |
| range-end-label       | 当 `range` 为 `true` 时，结束范围的屏幕阅读器标签                                       | ^[string]          | —       |
| format-value-text     | 用于显示屏幕阅读器 `aria-valuenow` 属性的格式化方法                                     | function(value) | —       |
| debounce              | 输入时的防抖延迟，以毫秒为单位，仅当 `show-input` 为 `true` 时有效                      | ^[number]          | 300     |
| tooltip-class         | 工具提示的自定义类名                                                                    | ^[string]          | —       |
| placement             | 工具提示的位置                                                                          | ^[枚举]`'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | top     |
| marks                 | 标记，键的类型必须为 `number`，并必须在封闭区间 `[min, max]` 中，每个标记可以自定义样式 | ^[object]`Record<number, Mark \| string>`          | —       |
| validate-event        | 是否触发表单验证                                                                        | ^[boolean]         | true    |

### Events

| Name   | Description                                                      | Parameters |
| ------ | ---------------------------------------------------------------- | ---------- |
| change | 当值发生改变时触发（如果正在拖动滑块，此事件仅在释放鼠标时触发） | 改变后的值 |
| input  | 当数据发生更改时触发（在滑动过程中会实时发出）                   | 改变后的值 |