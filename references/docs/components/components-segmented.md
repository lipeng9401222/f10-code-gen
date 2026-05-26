---
title: Segmented 分段控制器
originUrl: http://192.168.219.170/docs/vue/latest/component/component/segmented.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/segmented.html)

# Segmented 分段控制器

用于展示多个选项并允许用户选择其中单个选项。

## 基础用法

设置 `v-model` 为选项值。

**Demo 示例**: `segmented/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/segmented.html)

```vue
<template>
  <div class="flex flex-col items-start gap-4">
    <e-segmented v-model="value" :options="options" size="large" />
    <e-segmented v-model="value" :options="options" size="default" />
    <e-segmented v-model="value" :options="options" size="small" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('Mon');

const options = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
</script>

```

## 配置方向

设置 vertical 来改变方向。

**Demo 示例**: `segmented/custom-direction`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/segmented.html)

```vue
<template>
  <div>
    <e-segmented v-model="size" :options="sizeOptions" style="margin-bottom: 1rem" />
    <br />
    <e-segmented v-model="direction" :options="directionOptions" style="margin-bottom: 1rem" />
    <br />
    <e-segmented v-model="value" :options="options" :direction="direction" :size="size">
      <template #default="scope">
        <div :class="['flex', 'items-center', 'gap-2', 'flex-col', direction === 'horizontal' && 'p-2']">
          <e-icon size="20">
            <component :is="scope.item.icon" />
          </e-icon>
          <div>{{ scope.item.label }}</div>
        </div>
      </template>
    </e-segmented>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Apple, Cherry, Grape, Orange, Pear, Watermelon } from '@epoint-fe/eui-icons';
import type { SegmentedProps } from '@epoint-fe/eui-components';

const value = ref('Apple');
const direction = ref<SegmentedProps['direction']>('horizontal');
const size = ref<SegmentedProps['size']>('default');

const directionOptions = [
  { label: 'Horizontal', value: 'horizontal' },
  { label: 'Vertical', value: 'vertical' },
];

const sizeOptions = ['large', 'default', 'small'];

const options = [
  {
    label: 'Apple',
    value: 'Apple',
    icon: Apple,
  },
  {
    label: 'Cherry',
    value: 'Cherry',
    icon: Cherry,
  },
  {
    label: 'Grape',
    value: 'Grape',
    icon: Grape,
  },
  {
    label: 'Orange',
    value: 'Orange',
    icon: Orange,
  },
  {
    label: 'Pear',
    value: 'Pear',
    icon: Pear,
  },
  {
    label: 'Watermelon',
    value: 'Watermelon',
    icon: Watermelon,
    disabled: true,
  },
];
</script>

```

## 禁用状态

设置 `disabled` 属性来禁用一些选项。

**Demo 示例**: `segmented/disabled`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/segmented.html)

```vue
<template>
  <div class="flex flex-col items-start gap-4">
    <e-segmented v-model="value" :options="options" disabled />
    <e-segmented v-model="value" :options="options" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('Mon');
const options = [
  {
    label: 'Mon',
    value: 'Mon',
    disabled: true,
  },
  {
    label: 'Tue',
    value: 'Tue',
  },
  {
    label: 'Wed',
    value: 'Wed',
    disabled: true,
  },
  {
    label: 'Thu',
    value: 'Thu',
  },
  {
    label: 'Fri',
    value: 'Fri',
    disabled: true,
  },
  {
    label: 'Sat',
    value: 'Sat',
  },
  {
    label: 'Sun',
    value: 'Sun',
  },
];
</script>

```

## Block 分段选择器

设置 `block` 为 `true` 以适应父元素的宽度。

**Demo 示例**: `segmented/block`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/segmented.html)

```vue
<template>
  <div>
    <e-segmented v-model="value" :options="options" block />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('Mon');

const options = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sunday long long long long long long long'];
</script>

```

## 自定义内容

设置 default slot 位来渲染自定义内容。

**Demo 示例**: `segmented/custom-content`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/segmented.html)

```vue
<template>
  <div>
    <e-segmented v-model="value" :options="options">
      <template #default="scope">
        <div class="flex flex-col items-center gap-2 p-2">
          <e-icon size="20">
            <component :is="scope.item.icon" />
          </e-icon>
          <div>{{ scope.item.label }}</div>
        </div>
      </template>
    </e-segmented>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Apple, Cherry, Grape, Orange, Pear, Watermelon } from '@epoint-fe/eui-icons';

const value = ref('Apple');

const options = [
  {
    label: 'Apple',
    value: 'Apple',
    icon: Apple,
  },
  {
    label: 'Cherry',
    value: 'Cherry',
    icon: Cherry,
  },
  {
    label: 'Grape',
    value: 'Grape',
    icon: Grape,
  },
  {
    label: 'Orange',
    value: 'Orange',
    icon: Orange,
  },
  {
    label: 'Pear',
    value: 'Pear',
    icon: Pear,
  },
  {
    label: 'Watermelon',
    value: 'Watermelon',
    icon: Watermelon,
  },
];
</script>

```

## 自定义样式

使用 CSS 变量设置自定义样式。

**Demo 示例**: `segmented/custom-style`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/segmented.html)

```vue
<template>
  <div class="custom-style">
    <e-segmented v-model="value" :options="options" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('Delicacy');

const options = ['Delicacy', 'Desserts&Drinks', 'Fresh foods', 'Supermarket'];
</script>

<style scoped>
.custom-style .e-segmented {
  --e-segmented-item-selected-color: var(--e-text-color-primary);
  --e-segmented-item-selected-bg-color: #ffd100;
  --e-border-radius-base: 16px;
}
</style>

```

## API

### Attributes

| Name                  | Description            | Type                                           | Default    |
| --------------------- | ---------------------- | ---------------------------------------------- | ---------- |
| model-value / v-model | 绑定值 　 　           | ^[string] / ^[number] / ^[boolean]             | —          |
| options               | 选项的数据             | ^[array]`Option[]`                             | []         |
| size                  | 组件大小               | ^[enum]`'' \| 'large' \| 'default' \| 'small'` | ''         |
| block                 | 撑满父元素宽度 　 　   | ^[boolean]                                     | —          |
| disabled              | 是否禁用               | ^[boolean]                                     | false      |
| validate-event        | 是否触发表单验证 　    | ^[boolean]                                     | true       |
| name                  | 原生 `name` 属性       | ^[string]                                      | —          |
| id                    | 原生 `id` 属性         | ^[string]                                      | —          |
| aria-label ^(a11y)    | 原生 `aria-label` 属性 | ^[string]                                      | —          |
| direction             | 展示的方向 　 　 　 　 | ^[enum]`'horizontal' \| 'vertical'`            | horizontal |

### Events

| Name   | Description                                     | Type                            |
| ------ | ----------------------------------------------- | ------------------------------- |
| change | 当所选值更改时触发，参数是当前选中的值 　 　 　 | ^[Function]`(val: any) => void` |

### Slots

| Name    | Description        | Type                        |
| ------- | ------------------ | --------------------------- |
| default | 自定义 Option 模板 | ^[object]`{ item: Option }` |

## Type Declarations

<details>
  <summary>查看类型定义</summary>

```ts
type Option =
  | {
      label: string;
      value: string | number | boolean;
      disabled?: boolean;
      [key: string]: any;
    }
  | string
  | number
  | boolean;
```

</details>