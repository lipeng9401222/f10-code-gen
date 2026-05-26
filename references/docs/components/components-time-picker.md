---
title: TimePicker
originUrl: http://192.168.219.170/docs/vue/latest/component/component/time-picker.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/time-picker.html)

# TimePicker 时间选择器

使用时间选择器进行时间输入。

> **💡 提示**
>
> 在服务器端渲染（例如 [Nuxt](https://nuxt.com/v3)）和静态生成（例如 [VitePress](https://vitepress.vuejs.org/)）中使用该组件时，需要在外部包裹 `<client-only></client-only>`。

## 任意时间选择器

可以选择任意时间。

**Demo 示例**: `time-picker/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/time-picker.html)

```vue
<template>
  <div class="example-basic">
    <e-time-picker v-model="value1" placeholder="Arbitrary time" />
    <e-time-picker v-model="value2" arrow-control placeholder="Arbitrary time" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value1 = ref();
const value2 = ref();
</script>

<style scoped>
.example-basic .e-time-picker {
  margin: 8px;
}
</style>

```

## 限制时间范围

您还可以限制时间范围。

**Demo 示例**: `time-picker/basic-range`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/time-picker.html)

```vue
<template>
  <div class="example-basic">
    <e-time-picker
      v-model="value1"
      :disabled-hours="disabledHours"
      :disabled-minutes="disabledMinutes"
      :disabled-seconds="disabledSeconds"
      placeholder="Arbitrary time"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref(new Date(2016, 9, 10, 18, 30));

const makeRange = (start: number, end: number) => {
  const result: number[] = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};
const disabledHours = () => {
  return makeRange(0, 16).concat(makeRange(19, 23));
};
const disabledMinutes = (hour: number) => {
  if (hour === 17) {
    return makeRange(0, 29);
  }
  if (hour === 18) {
    return makeRange(31, 59);
  }
};
const disabledSeconds = (hour: number, minute: number) => {
  if (hour === 18 && minute === 30) {
    return makeRange(1, 59);
  }
};
</script>

<style scoped>
.example-basic .e-time-picker {
  margin: 8px;
}
</style>

```

## 任意时间范围

可以选择任意时间范围。

**Demo 示例**: `time-picker/range`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/time-picker.html)

```vue
<template>
  <div class="demo-range">
    <e-time-picker
      v-model="value1"
      is-range
      range-separator="~"
      start-placeholder="Start time"
      end-placeholder="End time"
    />
    <e-time-picker
      v-model="value2"
      is-range
      arrow-control
      range-separator="~"
      start-placeholder="Start time"
      end-placeholder="End time"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref<[Date, Date]>([new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]);
const value2 = ref<[Date, Date]>([new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]);
</script>

<style scoped>
.demo-range .e-time-picker {
  margin: 8px;
}

.demo-range .e-range-separator {
  box-sizing: content-box;
}
</style>

```

## API

### Attributes

| Name                  | Description                        | Type                                                                                            | Default     |
| --------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------- | ----------- |
| model-value / v-model | 绑定的值，如果是数组，长度应为 2   | ^[number] / ^[string] / ^[object]`Date \| [Date, Date] \| [number, number] \| [string, string]` | —           |
| readonly              | 时间选择器是否为只读               | ^[boolean]                                                                                      | false       |
| disabled              | 时间选择器是否禁用                 | ^[boolean]                                                                                      | false       |
| editable              | 输入是否可编辑                     | ^[boolean]                                                                                      | true        |
| clearable             | 是否显示清除按钮                   | ^[boolean]                                                                                      | true        |
| size                  | 输入的大小                         | ^[enum]`'large' \| 'default' \| 'small'`                                                        | —           |
| placeholder           | 非范围模式下的占位符               | ^[string]                                                                                       | —           |
| start-placeholder     | 范围模式下的起始时间占位符         | ^[string]                                                                                       | —           |
| end-placeholder       | 范围模式下的结束时间占位符         | ^[string]                                                                                       | —           |
| is-range              | 是否选择时间范围                   | ^[boolean]                                                                                      | false       |
| arrow-control         | 是否使用箭头按钮选择时间           | ^[boolean]                                                                                      | false       |
| popper-class          | 时间选择器下拉的自定义类名         | ^[string]                                                                                       | —           |
| range-separator       | 范围分隔符                         | ^[string]                                                                                       | '-'         |
| format                | 输入框中显示的值的格式             | ^[string] 参见 [日期格式](http://192.168.219.170/docs/vue/latest/component/component/date-picker#date-formats)                                           | —           |
| default-value         | 可选，默认的日历日期               | ^[Date] / ^[array]`[Date, Date]`                                                                | —           |
| id                    | 与原生输入中的 `id` 相同           | ^[string] / ^[array]`[string, string]`                                                          | —           |
| name                  | 与原生输入中的 `name` 相同         | ^[string]                                                                                       | —           |
| label ^(a11y)         | 与原生输入中的 `aria-label` 相同   | ^[string]                                                                                       | —           |
| suffix-icon           | 自定义后缀图标组件                 | ^[string] / ^[Component]                                                                        | Clock       |
| clear-icon            | 自定义清除图标组件                 | ^[string] / ^[Component]                                                                        | CircleClose |
| disabled-hours        | 指定不能选择的小时数组             | ^[Function]`(role: string, comparingDate?: Dayjs) => number[]`                                  | —           |
| disabled-minutes      | 指定不能选择的分钟数组             | ^[Function]`(hour: number, role: string, comparingDate?: Dayjs) => number[]`                    | —           |
| disabled-seconds      | 指定不能选择的秒数组               | ^[Function]`(hour: number, minute: number, role: string, comparingDate?: Dayjs) => number[]`    | —           |
| teleported            | 是否将时间选择器下拉传送到 body 中 | ^[boolean]                                                                                      | true        |
| tabindex              | 输入的 tabindex                    | ^[string] / ^[number]                                                                           | 0           |

### Events

| Name           | Description                         | Type                                                                                                         |
| -------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| change         | 当用户确认值时触发                  | ^[Function]`(val: number \| string \| Date \| [number, number] \| [string, string] \| [Date, Date]) => void` |
| blur           | 当输入框失去焦点时触发              | ^[Function]`(e: FocusEvent) => void`                                                                         |
| focus          | 当输入框获得焦点时触发              | ^[Function]`(e: FocusEvent) => void`                                                                         |
| visible-change | 当时间选择器的下拉框显示/消失时触发 | ^[Function]`(visibility: boolean) => void`                                                                   |

### Exposes

| Name        | Description        | Type                                              |
| ----------- | ------------------ | ------------------------------------------------- |
| focus       | 使输入组件获得焦点 | ^[Function]`(e: FocusEvent \| undefined) => void` |
| blur        | 使输入组件失去焦点 | ^[Function]`(e: FocusEvent \| undefined) => void` |
| handleOpen  | 打开时间选择器弹窗 | ^[Function]`() => void`                           |
| handleClose | 关闭时间选择器弹窗 | ^[Function]`() => void`                           |