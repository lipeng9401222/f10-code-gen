---
title: DateTimePicker
originUrl: http://192.168.219.170/docs/vue/latest/component/component/datetime-picker.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/datetime-picker.html)

# DateTime Picker 日期时间选择器

在一个选择器中选择日期和时间。

> **💡 提示**
>
> DateTimePicker 源自 DatePicker 和 TimePicker。有关属性的更详细解释，您可以参考 DatePicker 和 TimePicker。

> **💡 提示**
>
> 在服务器端渲染（例如 [Nuxt](https://nuxt.com/v3)）和 SSG（例如 [VitePress](https://vitepress.vuejs.org/)）中使用该组件时，需要使用 `<client-only></client-only>` 包装。

## 日期和时间

**Demo 示例**: `datetime-picker/date-and-time`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/datetime-picker.html)

```vue
<template>
  <div class="demo-datetime-picker">
    <div class="block">
      <span class="demonstration">Default</span>
      <e-date-picker v-model="value1" type="datetime" placeholder="Select date and time" />
    </div>
    <div class="block">
      <span class="demonstration">With shortcuts</span>
      <e-date-picker v-model="value2" type="datetime" placeholder="Select date and time" :shortcuts="shortcuts" />
    </div>
    <div class="block">
      <span class="demonstration">With default time</span>
      <e-date-picker v-model="value3" type="datetime" placeholder="Select date and time" :default-time="defaultTime" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref('');
const value2 = ref('');
const value3 = ref('');
const defaultTime = new Date(2000, 1, 1, 12, 0, 0);

const shortcuts = [
  {
    text: '今天',
    value: new Date(),
  },
  {
    text: '昨天',
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24);
      return date;
    },
  },
  {
    text: '一周前',
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      return date;
    },
  },
];
</script>
<style scoped>
.demo-datetime-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-datetime-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--e-border-color);
  flex: 1;
}
.demo-datetime-picker .block:last-child {
  border-right: none;
}
.demo-datetime-picker .demonstration {
  display: block;
  color: var(--e-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>

```

## 日期时间格式

使用 `format` 控制输入框中显示的文本格式。使用 `value-format` 控制绑定值的格式。

默认情况下，该组件接受并发出 `Date` 对象。

查看 [此处](https://day.js.org/docs/en/display/format#list-of-all-available-formats) Day.js 的所有可用格式列表。

> **⚠️ 警告**
>
> 请注意大小写。

**Demo 示例**: `datetime-picker/date-and-time-formats`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/datetime-picker.html)

```vue
<template>
  <div class="demo-datetime-picker">
    <div class="block">
      <span class="demonstration">Emits Date object</span>
      <div class="demonstration">Value: {{ value1 }}</div>
      <e-date-picker v-model="value1" type="datetime" placeholder="Pick a Date" format="YYYY/MM/DD HH:mm:ss" />
    </div>
    <div class="block">
      <span class="demonstration">Use value-format</span>
      <div class="demonstration">Value：{{ value2 }}</div>
      <e-date-picker
        v-model="value2"
        type="datetime"
        placeholder="Pick a Date"
        format="YYYY/MM/DD hh:mm:ss"
        value-format="YYYY-MM-DD h:m:s a"
      />
    </div>
    <div class="block">
      <span class="demonstration">Timestamp</span>
      <div class="demonstration">Value：{{ value3 }}</div>
      <e-date-picker
        v-model="value3"
        type="datetime"
        placeholder="Pick a Date"
        format="YYYY/MM/DD hh:mm:ss"
        value-format="x"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref('');
const value2 = ref('');
const value3 = ref('');
</script>
<style scoped>
.demo-datetime-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-datetime-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--e-border-color);
  flex: 1;
}
.demo-datetime-picker .block:last-child {
  border-right: none;
}
.demo-datetime-picker .demonstration {
  display: block;
  color: var(--e-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>

```

## 日期和时间范围

**Demo 示例**: `datetime-picker/date-and-time-range`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/datetime-picker.html)

```vue
<template>
  <div class="block">
    <span class="demonstration">Default</span>
    <e-date-picker
      v-model="value1"
      type="datetimerange"
      range-separator="~"
      start-placeholder="Start date"
      end-placeholder="End date"
    />
  </div>
  <div class="block">
    <span class="demonstration">With shortcuts</span>
    <e-date-picker
      v-model="value2"
      type="datetimerange"
      :shortcuts="shortcuts"
      range-separator="~"
      start-placeholder="Start date"
      end-placeholder="End date"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref<[Date, Date]>([new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]);
const value2 = ref('');

const shortcuts = [
  {
    text: 'Last week',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: 'Last month',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: 'Last 3 months',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
];
</script>
<style scoped>
.block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--e-border-color);
  flex: 1;
}
.block:last-child {
  border-right: none;
}
.block .demonstration {
  display: block;
  color: var(--e-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>

```

## 开始日期和结束日期的默认时间值

**Demo 示例**: `datetime-picker/default-time`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/datetime-picker.html)

```vue
<template>
  <div class="block">
    <span class="demonstration">Start and end date time 12:00:00</span>
    <e-date-picker
      v-model="value1"
      type="datetimerange"
      start-placeholder="Start Date"
      end-placeholder="End Date"
      :default-time="defaultTime1"
    />
  </div>
  <div class="block">
    <span class="demonstration">Start date time 12:00:00, end date time 08:00:00</span>
    <e-date-picker
      v-model="value2"
      type="datetimerange"
      start-placeholder="Start Date"
      end-placeholder="End Date"
      :default-time="defaultTime2"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref('');
const value2 = ref('');

const defaultTime1 = new Date(2000, 1, 1, 12, 0, 0); // '12:00:00'
const defaultTime2: [Date, Date] = [new Date(2000, 1, 1, 12, 0, 0), new Date(2000, 2, 1, 8, 0, 0)]; // '12:00:00', '08:00:00'
</script>
<style scoped>
.block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--e-border-color);
  flex: 1;
}
.block:last-child {
  border-right: none;
}
.block .demonstration {
  display: block;
  color: var(--e-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>

```

## DateTimer Picker API

### Attributes

| Name                  | Description                                                  | Type                                             | Default             |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------ | ------------------- |
| model-value / v-model | 绑定值，如果是数组，长度应为 2                               | Date / number / string / Array                   | —                   |
| readonly              | 日期选择器是否只读                                           | ^[boolean]                                          | false               |
| disabled              | 日期选择器是否禁用                                           | ^[boolean]                                          | false               |
| editable              | 输入框是否可编辑                                             | ^[boolean]                                          | true                |
| clearable             | 是否显示清除按钮                                             | ^[boolean]                                          | true                |
| size                  | 输入框尺寸                                                   | ^[枚举]`'large' \| 'default' \| 'small'`        | default             |
| placeholder           | 非范围模式下的占位符                                         | ^[string]                                           | —                   |
| start-placeholder     | 范围模式下的开始日期占位符                                   | ^[string]                                            | —                   |
| end-placeholder       | 范围模式下的结束日期占位符                                   | ^[string]                                            | —                   |
| time-arrow-control    | 是否使用箭头按钮选择时间                                     | ^[boolean]                                          | false               |
| type                  | 选择器类型                                                   | ^[枚举]`'year' \| 'month' \| 'date' \| 'datetime' \| ' week' \| 'datetimerange' \| 'daterange'` | date                |
| format                | 输入框中显示的值的格式                                       | ^[string]  <br> 查看 [日期格式](components-date-picker.md#date-formats) | YYYY-MM-DD HH:mm:ss |
| popper-class          | DateTimePicker 弹出框的自定义类名                            | ^[string]                                            | —                   |
| range-separator       | 范围分隔符                                                   | ^[string]                                            | '-'                 |
| default-value         | 可选，日历的默认日期                                         | `Date` / `[Date, Date]`                              | —                   |
| default-time          | 选择日期后的默认时间值。如果未指定，默认使用时间`00:00:00`   | `Date` / `[Date, Date]`                              | —                   |
| value-format          | 可选，绑定值的格式。如果未指定，绑定值将是一个 Date 对象     | ^[string]  <br> 查看 [日期格式](https://day.js.org/docs/en/display/format) | —                   |
| id                    | 与原生输入框中的 `id` 属性相同                               | ^[string]  / `[string, string]`                        | —                   |
| name                  | 与原生输入框中的 `name` 属性相同                             | ^[string]                                            | —                   |
| unlink-panels         | 在范围选择器中取消关联两个日期面板                           | ^[boolean]                                          | false               |
| suffix-icon           | 自定义后缀图标组件                                           | `string \| Component`                            | Date                |
| clear-icon            | 自定义清除图标组件                                           | `string \| Component`                            | CircleClose         |
| shortcuts             | 设置快捷选项的对象数组                                       | ^[object]`Array<{ text: string, value: date / function }` | —                   |
| disabled-date         | 用于判断日期是否禁用的函数，以该日期为参数。应返回一个布尔值 | ^[Function]`(date: Date) => boolean`                                   | —                   |
| cell-class-name       | 设置自定义类名                                               | ^[Function]`(date: Date) => string`                                   | —                   |
| teleported            | 是否将日期时间选择器的弹出框传送到 body 元素中               | ^[boolean]             | true                |

### Events

| Name            | Description                                          | Parameters                  |
| --------------- | ---------------------------------------------------- | --------------------------- |
| change          | 在用户确认值时触发                                   | 组件的绑定值                |
| blur            | 在输入框失去焦点时触发                               | `(e: FocusEvent)`           |
| focus           | 在输入框获得焦点时触发                               | `(e: FocusEvent)`           |
| calendar-change | 在选择的日历日期更改时触发。仅适用于 `datetimerange` | [Date, Date]                |
| visible-change  | 在 DateTimePicker 的下拉框出现或消失时触发。         | 出现时为 true，否则为 false |

### Methods

| Method | Description      | Parameters |
| ------ | ---------------- | ---------- |
| focus  | 焦点到输入框组件 | —          |

### Slots

| Name            | Description          |
| --------------- | -------------------- |
| default         | 自定义单元格内容     |
| range-separator | 自定义范围分隔符内容 |