---
title: Switch
originUrl: http://192.168.219.170/docs/vue/latest/component/component/switch.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/switch.html)

# Switch 开关

开关用于在两种相反状态之间切换。

## 基本用法

**Demo 示例**: `switch/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/switch.html)

```vue
<template>
  <e-switch v-model="value1" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref(true);
</script>

```

## 尺寸

**Demo 示例**: `switch/sizes`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/switch.html)

```vue
<template>
  <e-switch v-model="value" size="large" active-text="Open" inactive-text="Close" />
  <br />
  <e-switch v-model="value" active-text="Open" inactive-text="Close" />
  <br />
  <e-switch v-model="value" size="small" active-text="Open" inactive-text="Close" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(true);
</script>

```

## 文字描述

您可以添加 `active-text` 和 `inactive-text` 属性以显示文本。使用 `inline-prompt` 属性来控制文本是否显示在圆点内。

**Demo 示例**: `switch/text-description`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/switch.html)

```vue
<template>
  <e-switch v-model="value1" class="mb-2" active-text="Pay by month" inactive-text="Pay by year" />
  <br />
  <e-switch
    v-model="value2"
    class="mb-2"
    style="--e-switch-on-color: #13ce66; --e-switch-off-color: #ff4949"
    active-text="Pay by month"
    inactive-text="Pay by year"
  />
  <br />
  <e-switch v-model="value3" inline-prompt active-text="是" inactive-text="否" />
  <e-switch
    v-model="value4"
    class="ml-2"
    inline-prompt
    style="--e-switch-on-color: #13ce66; --e-switch-off-color: #ff4949"
    active-text="Y"
    inactive-text="N"
  />
  <e-switch v-model="value6" class="ml-2" width="60" inline-prompt active-text="超出省略" inactive-text="超出省略" />
  <e-switch
    v-model="value5"
    class="ml-2"
    inline-prompt
    style="--e-switch-on-color: #13ce66; --e-switch-off-color: #ff4949"
    active-text="完整展示多个内容"
    inactive-text="多个内容"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref(true);
const value2 = ref(true);
const value3 = ref(true);
const value4 = ref(true);
const value5 = ref(true);
const value6 = ref(true);
</script>

```

## 显示自定义图标和自定义颜色

> **💡 提示**
>
> 使用 `active-icon` 和 `inactive-icon` 属性添加图标。您可以传递组件名称（提前注册的组件）的字符串，也可以传递组件本身，它是一个 SVG Vue 组件。我们提供了一套图标，您可以在 [图标](http://192.168.219.170/docs/vue/latest/component/component/icon) 中找到。

**Demo 示例**: `switch/custom-icons`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/switch.html)

```vue
<template>
  <e-switch v-model="value1" :active-icon="Check" :inactive-icon="Close" />
  <br />
  <e-switch
    v-model="value2"
    class="mt-2"
    style="margin-left: 24px"
    inline-prompt
    :active-icon="Check"
    :inactive-icon="Close"
  />
  <br />
  <e-switch v-model="value3" class="ml-2" style="--e-switch-on-color: #13ce66; --e-switch-off-color: #ff4949" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Check, Close } from '@epoint-fe/eui-icons';
const value1 = ref(true);
const value2 = ref(true);
const value3 = ref(true);
</script>

```

## 扩展值类型

**Demo 示例**: `switch/extended-value-types`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/switch.html)

```vue
<template>
  <e-tooltip :content="'Switch value: ' + value" placement="top">
    <e-switch
      v-model="value"
      style="--e-switch-on-color: #13ce66; --e-switch-off-color: #ff4949"
      active-value="100"
      inactive-value="0"
    />
  </e-tooltip>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('100');
</script>

```

## 禁用

**Demo 示例**: `switch/disabled`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/switch.html)

```vue
<template>
  <e-switch v-model="value1" disabled />
  <e-switch v-model="value2" class="ml-2" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref(true);
const value2 = ref(true);
</script>

```

## 加载中

**Demo 示例**: `switch/loading`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/switch.html)

```vue
<template>
  <e-switch v-model="value1" loading />
  <e-switch v-model="value2" loading class="ml-2" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref(true);
const value2 = ref(false);
</script>

```

## 防止切换

**Demo 示例**: `switch/prevent-switching`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/switch.html)

```vue
<template>
  <e-switch v-model="value1" :loading="loading1" :before-change="beforeChange1" />
  <e-switch v-model="value2" class="ml-2" :loading="loading2" :before-change="beforeChange2" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';

const value1 = ref(false);
const value2 = ref(false);
const loading1 = ref(false);
const loading2 = ref(false);

const beforeChange1 = () => {
  loading1.value = true;
  return new Promise((resolve) => {
    setTimeout(() => {
      loading1.value = false;
      EMessage.success('Switch success');
      return resolve(true);
    }, 1000);
  });
};

const beforeChange2 = () => {
  loading2.value = true;
  return new Promise((_, reject) => {
    setTimeout(() => {
      loading2.value = false;
      EMessage.error('Switch failed');
      return reject(new Error('Error'));
    }, 1000);
  });
};
</script>

```

## API

### Attributes

| Name                  | Description                                                                             | Type                                           | Default |
| --------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------- | ------- |
| model-value / v-model | 绑定的值，它应与 `active-value` 或 `inactive-value` 中的一个等效，默认为 `boolean` 类型 | ^[boolean] / ^[string] / ^[number]                | —       |
| disabled              | 是否禁用开关                                                                            | ^[boolean]                                     | false   |
| loading               | 开关是否处于加载状态                                                                    | ^[boolean]                                     | false   |
| size                  | 开关的大小                                                                              | ^[枚举]`'large' \| 'default' \| 'small'`       | default |
| width                 | 开关的宽度                                                                              | ^[number] / ^[string]                          | —       |
| inline-prompt         | 图标或文本是否显示在点内，仅文本的第一个字符将被呈现                                    | ^[boolean]                                     | false   |
| active-icon           | 处于 `on` 状态时显示的图标的组件，会覆盖 `active-text`                                  | ^[string] / ^[Component]                          | —       |
| inactive-icon         | 处于 `off` 状态时显示的图标的组件，会覆盖 `inactive-text`                               | ^[string] / ^[Component]                          | —       |
| active-text           | 处于 `on` 状态时显示的文本                                                              | ^[string]                                      | —       |
| inactive-text         | 处于 `off` 状态时显示的文本                                                             | ^[string]                                      | —       |
| active-value          | 处于 `on` 状态时的开关值                                                                | ^[boolean] / ^[string] / ^[number]             | true    |
| inactive-value        | 处于 `off` 状态时的开关值                                                               | ^[boolean] / ^[string] / ^[number]             | false   |
| active-color          | 处于 `on` 状态时的背景颜色（已弃用，请改用 CSS 变量 `--e-switch-on-color`）             | ^[string]                                      | —       |
| inactive-color        | 处于 `off` 状态时的背景颜色（已弃用，请改用 CSS 变量 `--e-switch-off-color`）           | ^[string]                                      | —       |
| border-color          | 开关的边框颜色（已弃用，请改用 CSS 变量 `--e-switch-border-color`）                     | ^[string]                                      | —       |
| name                  | 开关的输入名称                                                                          | ^[string]                                      | —       |
| validate-event        | 是否触发表单验证                                                                        | ^[boolean]                                     | true    |
| before-change         | 在开关状态更改之前的钩子函数。如果返回 `false` 或返回的 `Promise` 被拒绝，将会停止切换  | ^[Function]`() => Promise<boolean> \| boolean` | —       |
| id                    | input 的 id                                                                             | ^[string]                                      | —       |
| tabindex              | input 的 tabindex                                                                       | ^[string] / ^[number]                          | —       |

### Events

| Name   | Description                     | Parameters                                              |
| ------ | ------------------------------- | ------------------------------------------------------- |
| change | switch 状态发生变化时的回调函数 | ^[Function]`(val: boolean \| string \| number) => void` |

### Methods

| Method | Description               | Parameters              |
| ------ | ------------------------- | ----------------------- |
| focus  | 手动 focus 到 switch 组件 | ^[Function]`() => void` |