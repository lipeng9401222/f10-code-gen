---
title: Input Amount 金额输入框
originUrl: http://192.168.219.170/docs/vue/latest/component/component/input-amount.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/input-amount.html)

# Input Amount 金额输入框

用于输入金额，展示千分位与「元」后缀，并支持中文大写辅助展示。

## 基础用法

**Demo 示例**: `input-amount/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input-amount.html)

```vue
<template>
  <e-input-amount v-model="amount" :min="0" :max="999999.99" @change="handleChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const amount = ref(1234.56);
const handleChange = (current: number | undefined, prev: number | undefined) => {
  console.log(current, prev);
};
</script>

```

> **💡 提示**
>
> 组件内部固定 **两位小数** 精度；清空或非法输入时的行为可通过 `value-on-clear` 配置。

## 禁用状态

**Demo 示例**: `input-amount/disabled`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input-amount.html)

```vue
<template>
  <e-input-amount v-model="amount" disabled />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const amount = ref(100);
</script>

```

## 步进

**Demo 示例**: `input-amount/steps`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input-amount.html)

```vue
<template>
  <e-input-amount v-model="amount" :step="100" :min="0" :max="10000" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const amount = ref(1000);
</script>

```

## 严格步进

**Demo 示例**: `input-amount/step-strictly`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input-amount.html)

```vue
<template>
  <e-input-amount v-model="amount" :step="50" :min="0" :max="1000" step-strictly />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const amount = ref(100);
</script>

```

## 范围

**Demo 示例**: `input-amount/range`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input-amount.html)

```vue
<template>
  <e-input-amount v-model="amount" :min="10" :max="99.99" :step="0.01" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const amount = ref(12.34);
</script>

```

## 尺寸

**Demo 示例**: `input-amount/size`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input-amount.html)

```vue
<template>
  <e-input-amount v-model="large" size="large" />
  <e-input-amount v-model="medium" class="mx-4" />
  <e-input-amount v-model="small" size="small" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const large = ref(1000);
const medium = ref(1000);
const small = ref(1000);
</script>

```

## 中文大写位置

**Demo 示例**: `input-amount/text-position`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input-amount.html)

```vue
<template>
  <e-space direction="vertical" :size="24">
    <e-input-amount v-model="inner" />
    <e-input-amount v-model="bottom" text-position="bottom" />
  </e-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const inner = ref(8888.88);
const bottom = ref(8888.88);
</script>

```

## 隐藏控制按钮

**Demo 示例**: `input-amount/without-controls`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input-amount.html)

```vue
<template>
  <e-input-amount v-model="amount" :controls="false" placeholder="请输入金额" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const amount = ref(99.99);
</script>

```

## 清空后的值

**Demo 示例**: `input-amount/value-on-clear`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input-amount.html)

```vue
<template>
  <e-space direction="vertical" :size="16">
    <e-input-amount v-model="toMin" :min="100" value-on-clear="min" placeholder="清空后回到 min(100)" />
    <e-input-amount v-model="toMax" :max="500" value-on-clear="max" placeholder="清空后回到 max(500)" />
  </e-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const toMin = ref(200);
const toMax = ref(200);
</script>

```

## API

### Attributes

| Name                    | Description                                    | Type                                                         | Default     |
| ----------------------- | ---------------------------------------------- | ------------------------------------------------------------ | ----------- |
| model-value / v-model   | 绑定值                                         | ^[number]                                                    | —           |
| min                     | 最小值                                         | ^[number]                                                    | -Infinity   |
| max                     | 最大值                                         | ^[number]                                                    | Infinity    |
| step                    | 步长                                           | ^[number]                                                    | 0.01        |
| step-strictly           | 是否只能输入 step 的倍数                       | ^[boolean]                                                   | false       |
| readonly                | 原生 `readonly`，是否只读                      | ^[boolean]                                                   | false       |
| disabled                | 是否禁用                                       | ^[boolean]                                                   | false       |
| size                    | 尺寸                                           | ^[enum]`'large' \| 'default' \| 'small'`                     | default     |
| controls                | 是否显示加减按钮                               | ^[boolean]                                                   | true        |
| text-position           | 中文大写展示位置                               | ^[enum]`'inner' \| 'bottom'`                                 | inner       |
| value-on-clear          | 输入被清空时的回填值                           | ^[number] / ^[null] / ^[enum]`'min' \| 'max'`                | null        |
| name                    | 原生 `name`                                    | ^[string]                                                    | —           |
| label                   | 原生 `label`                                   | ^[string]                                                    | —           |
| placeholder             | 占位文本                                       | ^[string]                                                    | —           |
| id                      | 原生 `id`                                      | ^[string]                                                    | —           |
| validate-event          | 是否触发表单校验                               | ^[boolean]                                                   | true        |

### Events

| Name   | Description                 | Type                                                                                    |
| ------ | --------------------------- | --------------------------------------------------------------------------------------- |
| change | 绑定值变更且已落盘时触发    | ^[Function]`(currentValue: number \| undefined, oldValue: number \| undefined) => void` |
| input  | 输入过程中数值变化时触发    | ^[Function]`(value: number \| null \| undefined) => void`                               |
| blur   | 失去焦点时触发              | ^[Function]`(event: FocusEvent) => void`                                                |
| focus  | 获得焦点时触发              | ^[Function]`(event: FocusEvent) => void`                                                |

### Exposes

| Name  | Description           | Type                    |
| ----- | --------------------- | ----------------------- |
| focus | 使内部 input 获得焦点 | ^[Function]`() => void` |
| blur  | 使内部 input 失去焦点 | ^[Function]`() => void` |