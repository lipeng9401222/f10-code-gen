---
title: Input Number 数字输入框
originUrl: http://192.168.219.170/docs/vue/latest/component/component/input-number.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/input-number.html)

# Input Number 数字输入框

仅允许输入标准的数字值，可定义范围

## 基础用法

**Demo 示例**: `input-number/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input-number.html)

```vue
<template>
  <e-input-number v-model="num" :min="1" :max="10" @change="handleChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const num = ref(1);
const handleChange = (value: number) => {
  console.log(value);
};
</script>

```

> **💡 提示**
>
> 当输入无效的字符串到输入框时，由于错误，输入值将把 `NaN` 导入到上层

## 禁用状态

**Demo 示例**: `input-number/disabled`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input-number.html)

```vue
<template>
  <e-input-number v-model="num" :disabled="true" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const num = ref(1);
</script>

```

## 步进

允许定义递增递减的步进控制

**Demo 示例**: `input-number/steps`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input-number.html)

```vue
<template>
  <e-input-number v-model="num" :step="2" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const num = ref(5);
</script>

```

## 严格步进

**Demo 示例**: `input-number/step-strictly`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input-number.html)

```vue
<template>
  <e-input-number v-model="num" :step="2" step-strictly />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const num = ref(2);
</script>

```

## 精度

**Demo 示例**: `input-number/precision`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input-number.html)

```vue
<template>
  <e-input-number v-model="num" :precision="2" :step="0.1" :max="10" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const num = ref(1);
</script>

```

> **💡 提示**
>
> `precision` 的值必须是一个非负整数，并且不能小于 `step` 的小数位数。

## 不同的输入框尺寸

使用 `size` 属性额外配置尺寸，可选的尺寸大小为： `large` 或 `small` .

**Demo 示例**: `input-number/size`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input-number.html)

```vue
<template>
  <e-input-number v-model="num1" size="large" />
  <e-input-number v-model="num2" class="mx-4" />
  <e-input-number v-model="num3" size="small" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const num1 = ref(1);
const num2 = ref(2);
const num3 = ref(3);
</script>

```

## 按钮位置

**Demo 示例**: `input-number/controlled`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input-number.html)

```vue
<template>
  <e-input-number v-model="num" :min="1" :max="10" controls-position="both" size="large" @change="handleChange" />
  <e-input-number v-model="num" class="mx-4" :min="1" :max="10" controls-position="both" @change="handleChange" />
  <e-input-number v-model="num" :min="1" :max="10" size="small" controls-position="both" @change="handleChange" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const num = ref(1);
const handleChange = (value: number) => {
  console.log(value);
};
</script>

```

## 格式化展示

**Demo 示例**: `input-number/formatter`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/input-number.html)

```vue
<template>
  <div class="demo-input-number">
    <p>使用千分位分隔符展示：</p>
    <e-input-number
      v-model="value1"
      :formatter="(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
      :parser="(value) => value.replace(/,/g, '')"
      :min="0"
    />
    <p>添加前缀：</p>
    <e-input-number
      v-model="value2"
      :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
      :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
      :min="0"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref(10000);
const value2 = ref(100);
</script>

```

## API

### Attributes

| Name                    | Description                       | Type                                          | Default   |
| ----------------------- | --------------------------------- | --------------------------------------------- | --------- |
| model-value / v-model   | 选中项绑定值                      | ^[number]                                     | —         |
| min                     | 设置计数器允许的最小值            | ^[number]                                     | -Infinity |
| max                     | 设置计数器允许的最大值            | ^[number]                                     | Infinity  |
| step                    | 计数器步长                        | ^[number]                                     | 1         |
| step-strictly           | 是否只能输入 step 的倍数          | ^[boolean]                                    | false     |
| precision               | 数值精度                          | ^[number]                                     | —         |
| size                    | 计数器尺寸                        | ^[enum]`'large' \| 'default' \| 'small'`      | default   |
| readonly                | 原生 `readonly` 属性，是否只读    | ^[boolean]                                    | false     |
| disabled                | 是否禁用状态                      | ^[boolean]                                    | false     |
| controls                | 是否使用控制按钮                  | ^[boolean]                                    | true      |
| controls-position       | 控制按钮位置                      | ^[enum]`'both' \| 'right'`                        | right         |
| name                    | 等价于原生 input name 属性        | ^[string]                                     | —         |
| label                   | 等价于原生 input label 属性       | ^[string]                                     | —         |
| placeholder             | 等价于原生 input placeholder 属性 | ^[string]                                     | —         |
| id                      | 等价于原生 input id 属性          | ^[string]                                     | —         |
| value-on-clear ^(2.2.0) | 当输入框被清空时显示的值          | ^[number] / ^[null] / ^[enum]`'min' \| 'max'` | —         |
| formatter               | 指定输入值的格式                  | ^[Function]`(value: number) => string`        | —         |
| parser                  | 指定从格式化值转换为数字的方式    | ^[Function]`(value: string) => string`        | —         |
| validate-event          | 是否触发表单验证                  | ^[boolean]                                    | true      |

### Events

| Name   | Description                 | Type                                                                                    |
| ------ | --------------------------- | --------------------------------------------------------------------------------------- |
| change | 绑定值被改变时触发          | ^[Function]`(currentValue: number \| undefined, oldValue: number \| undefined) => void` |
| blur   | 在组件 Input 失去焦点时触发 | ^[Function]`(event: FocusEvent) => void`                                                |
| focus  | 在组件 Input 获得焦点时触发 | ^[Function]`(event: FocusEvent) => void`                                                |

### Exposes

| Name  | Description           | Type                    |
| ----- | --------------------- | ----------------------- |
| focus | 使 input 组件获得焦点 | ^[Function]`() => void` |
| blur  | 使 input 组件失去焦点 | ^[Function]`() => void` |