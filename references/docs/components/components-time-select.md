---
title: TimeSelect
originUrl: http://192.168.219.170/docs/vue/latest/component/component/time-select.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/time-select.html)

# TimeSelect 时间选择

使用时间选择进行时间输入。

可用的时间范围是00:00至23:59。

> **💡 提示**
>
> 在服务器端渲染（例如 [Nuxt](https://nuxt.com/v3)）和静态生成（例如 [VitePress](https://vitepress.vuejs.org/)）中使用该组件时，需要在外部包裹 `<client-only></client-only>`。

## 固定时间选择器

为用户提供一组固定时间供选择。

**Demo 示例**: `time-select/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/time-select.html)

```vue
<template>
  <e-time-select v-model="value" start="08:30" step="00:15" end="18:30" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
</script>

```

## 时间格式

使用 `format` 控制时间的格式（小时和分钟）。

查看 Day.js 的所有可用格式的列表 [在这里](https://day.js.org/docs/en/display/format#list-of-all-available-formats)。

> **⚠️ 警告**
>
> 注意大写字母

**Demo 示例**: `time-select/time-formats`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/time-select.html)

```vue
<template>
  <e-time-select v-model="value" start="00:00" step="00:30" end="23:59" placeholder="Select time" format="hh:mm A" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
</script>

```

## 固定时间范围

如果首先选择开始（结束）时间，那么结束（开始）时间的选项状态将相应更改。

**Demo 示例**: `time-select/time-range`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/time-select.html)

```vue
<template>
  <div class="demo-time-range">
    <e-time-select
      v-model="startTime"
      :max-time="endTime"
      class="mr-4"
      placeholder="Start time"
      start="08:30"
      step="00:15"
      end="18:30"
    />
    <e-time-select
      v-model="endTime"
      :min-time="startTime"
      placeholder="End time"
      start="08:30"
      step="00:15"
      end="18:30"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const startTime = ref('');
const endTime = ref('');
</script>

```

## API

### Attributes

| Name                  | Description                              | Type                                                                                           | Default     |
| --------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------- | ----------- |
| model-value / v-model | 绑定的值                                 | ^[string]                                                                                      | —           |
| disabled              | 是否禁用 TimeSelect                      | ^[boolean]                                                                                     | false       |
| editable              | 输入框是否可编辑                         | ^[boolean]                                                                                     | true        |
| clearable             | 是否显示清除按钮                         | ^[boolean]                                                                                     | true        |
| size                  | 输入框大小                               | ^[enum]`'large' \| 'default' \| 'small'`                                                       | default     |
| placeholder           | 非范围模式下的占位符                     | ^[string]                                                                                      | —           |
| name                  | 与原生输入中的 `name` 相同               | ^[string]                                                                                      | —           |
| effect                | 提示主题，内置主题: `dark` / `light`     | ^[string] / ^[enum]`'dark' \| 'light'`                                                         | light       |
| suffix-icon           | 自定义后缀图标组件                       | ^[string] / ^[Component]                                                                       | Clock       |
| clear-icon            | 自定义清除图标组件                       | ^[string] / ^[Component]                                                                       | CircleClose |
| start                 | 开始时间                                 | ^[string]                                                                                      | 09:00       |
| end                   | 结束时间                                 | ^[string]                                                                                      | 18:00       |
| step                  | 时间步长                                 | ^[string]                                                                                      | 00:30       |
| min-time              | 最小时间，该时间之前的任何时间都将被禁用 | ^[string]                                                                                      | —           |
| max-time              | 最大时间，该时间之后的任何时间都将被禁用 | ^[string]                                                                                      | —           |
| format                | 设置时间的格式                           | ^[string] 参见 [格式](https://day.js.org/docs/en/display/format#list-of-all-available-formats) | HH:mm       |

### Events

| Name   | Description          | Type                                     |
| ------ | -------------------- | ---------------------------------------- |
| change | 用户确认值时触发     | ^[Function]`(value: string) => void`     |
| blur   | 输入框失去焦点时触发 | ^[Function]`(event: FocusEvent) => void` |
| focus  | 输入框获得焦点时触发 | ^[Function]`(event: FocusEvent) => void` |

### Exposes

| Name  | Description        | Type                    |
| ----- | ------------------ | ----------------------- |
| focus | 使输入组件获得焦点 | ^[Function]`() => void` |
| blur  | 使输入组件失去焦点 | ^[Function]`() => void` |