---
title: 日历
originUrl: http://192.168.219.170/docs/vue/latest/component/component/calendar.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/calendar.html)

# 日历

显示日期。

## 基本

**Demo 示例**: `calendar/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/calendar.html)

```vue
<template>
  <e-calendar v-model="value" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value = ref(new Date());
</script>

```

## 自定义内容

**Demo 示例**: `calendar/customize`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/calendar.html)

```vue
<template>
  <e-calendar>
    <template #date-cell="{ data }">
      <p :class="data.isSelected ? 'is-selected' : ''">
        {{ data.day.split('-').slice(1).join('-') }}
        {{ data.isSelected ? '✔️' : '' }}
      </p>
    </template>
  </e-calendar>
</template>

<style scoped>
.is-selected {
  color: #1989fa;
}
</style>

```

## 范围

**Demo 示例**: `calendar/range`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/calendar.html)

```vue
<template>
  <e-calendar :range="[new Date(2019, 2, 4), new Date(2019, 2, 24)]" />
</template>

```

## 自定义标题

**Demo 示例**: `calendar/header`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/calendar.html)

```vue
<template>
  <e-calendar ref="calendar">
    <template #header="{ date }">
      <span>Custom header content</span>
      <span>{{ date }}</span>
      <e-button-group>
        <e-button size="small" @click="selectDate('prev-year')"> Previous Year </e-button>
        <e-button size="small" @click="selectDate('prev-month')"> Previous Month </e-button>
        <e-button size="small" @click="selectDate('today')">Today</e-button>
        <e-button size="small" @click="selectDate('next-month')"> Next Month </e-button>
        <e-button size="small" @click="selectDate('next-year')"> Next Year </e-button>
      </e-button-group>
    </template>
  </e-calendar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const calendar = ref();
const selectDate = (val: string) => {
  calendar.value.selectDate(val);
};
</script>

```

## 本地化

默认的语言环境是中文，如果您需要使用其他语言，请查看 [国际化](../guide/guide-i18n.md)

请注意，日期时间的本地化（月份名称、每周的第一天等）也在本地化中配置。

## API

### Attributes

| Name                  | Description                                                  | Type                   | Default |
| --------------------- | ------------------------------------------------------------ | ---------------------- | ------- |
| model-value / v-model | 绑定的值                                                     | ^[Date]                | —       |
| range                 | 时间范围，包括起始时间和结束时间。起始时间必须为每周的开始日期，结束时间必须为每周的结束日期，时间跨度不得超过两个月。 | ^[array]`[Date, Date]` | —       |

### Slots

| Name      | Description                                                  | Type                                                         |
| --------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| date-cell | `type` 表示日期属于哪个月份，可选值为 prev-month、current-month、next-month；`isSelected` 表示日期是否被选中；`day` 是以 `YYYY-MM-DD` 格式表示的日期；`date` 是单元格代表的日期 | ^[object]`{ data: { type: 'prev-month' \| 'current-month' \| 'next-month', isSelected: boolean, day: string, date: Date } }` |
| header    | 日历标题的内容                                               | ^[object]`{ date: string }`                                  |