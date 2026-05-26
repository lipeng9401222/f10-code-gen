---
title: DatePicker 日期选择器
originUrl: http://192.168.219.170/docs/vue/latest/component/component/date-picker.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/date-picker.html)

# DatePicker 日期选择器

使用日期选择器进行日期输入。

> **💡 提示**
>
> 当在 SSR（例如[Nuxt](https://nuxt.com/v3)）和 SSG（例如[VitePress](https://vitepress.vuejs.org/)）中使用此组件时，需要使用`<client-only></client-only>`包装。

## 输入日期

基本日期选择器以"天"为单位。

**Demo 示例**: `date-picker/enter-date`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/date-picker.html)

```vue
<template>
  <e-radio-group v-model="size" label="size control" size="small">
    <e-radio-button value="large">large</e-radio-button>
    <e-radio-button value="default">default</e-radio-button>
    <e-radio-button value="small">small</e-radio-button>
  </e-radio-group>
  <div class="demo-date-picker">
    <div class="block">
      <span class="demonstration">Default</span>
      <e-date-picker v-model="value1" type="date" placeholder="请选择日期" :size="size" />
    </div>
    <div class="block">
      <span class="demonstration">Picker with quick options</span>
      <e-date-picker
        v-model="value2"
        type="date"
        placeholder="请选择日期"
        :disabled-date="disabledDate"
        :shortcuts="shortcuts"
        :size="size"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const size = ref<'default' | 'large' | 'small'>('default');

const value1 = ref('');
const value2 = ref('');

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

const disabledDate = (time: Date) => {
  return time.getTime() > Date.now();
};
</script>

<style scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--e-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--e-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>

```

## 禁用日期

**Demo 示例**: `date-picker/disabled-date`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/date-picker.html)

```vue
<template>
  <div class="demo-date-picker">
    <div class="block">
      <span class="demonstration">禁用周末的日期选择器</span>
      <e-date-picker v-model="value2" type="date" placeholder="请选择日期" :disabled-date="disabledDate" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value2 = ref('');

const disabledDate = (time: Date) => {
  // 获取星期几（0是周日，6是周六）
  const day = time.getDay();
  // 如果是周六(6)或周日(0)，则禁用
  return day === 0 || day === 6;
};
</script>

<style scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--e-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--e-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>

```

## 其他测量方式

您可以通过扩展标准日期选择器组件选择周、月、年或多个日期。

**Demo 示例**: `date-picker/other-measurements`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/date-picker.html)

```vue
<template>
  <div class="demo-date-picker">
    <div class="container">
      <div class="block">
        <span class="demonstration">Week</span>
        <e-date-picker v-model="value1" type="week" format="[Week] ww" placeholder="Pick a week" />
      </div>
      <div class="block">
        <span class="demonstration">Month</span>
        <e-date-picker v-model="value2" type="month" placeholder="Pick a month" />
      </div>
    </div>
    <div class="container">
      <div class="block">
        <span class="demonstration">Year</span>
        <e-date-picker v-model="value3" type="year" placeholder="Pick a year" />
      </div>
      <div class="block">
        <span class="demonstration">Dates</span>
        <e-date-picker v-model="value4" type="dates" placeholder="Pick one or more dates" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref('');
const value2 = ref('');
const value3 = ref('');
const value4 = ref('');
</script>
<style scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--e-border-color);
  flex: 1;
}
.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .container {
  flex: 1;
  border-right: solid 1px var(--e-border-color);
}
.demo-date-picker .container .block {
  border-right: none;
}
.demo-date-picker .container .block:last-child {
  border-top: solid 1px var(--e-border-color);
}
.demo-date-picker .container:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--e-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>

```

## 日期范围

支持选择日期范围。

**Demo 示例**: `date-picker/date-range`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/date-picker.html)

```vue
<template>
  <e-radio-group v-model="size" label="size control" size="small">
    <e-radio-button value="large">large</e-radio-button>
    <e-radio-button value="default">default</e-radio-button>
    <e-radio-button value="small">small</e-radio-button>
  </e-radio-group>
  <div class="demo-date-picker">
    <div class="block">
      <span class="demonstration">Default</span>
      <e-date-picker
        v-model="value1"
        type="daterange"
        range-separator="~"
        start-placeholder="开始"
        end-placeholder="结束"
        :size="size"
      />
    </div>
    <div class="block">
      <span class="demonstration">With quick options</span>
      <e-date-picker
        v-model="value2"
        type="daterange"
        unlink-panels
        range-separator="~"
        start-placeholder="开始"
        end-placeholder="结束"
        :shortcuts="shortcuts"
        :size="size"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const size = ref<'default' | 'large' | 'small'>('default');

const value1 = ref('');
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
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--e-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--e-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>

```

## 月份范围

支持选择月份范围。

**Demo 示例**: `date-picker/month-range`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/date-picker.html)

```vue
<template>
  <div class="demo-date-picker">
    <div class="block">
      <span class="demonstration">Default</span>
      <e-date-picker
        v-model="value1"
        type="monthrange"
        range-separator="~"
        start-placeholder="Start month"
        end-placeholder="End month"
      />
    </div>
    <div class="block">
      <span class="demonstration">With quick options</span>
      <e-date-picker
        v-model="value2"
        type="monthrange"
        unlink-panels
        range-separator="~"
        start-placeholder="Start month"
        end-placeholder="End month"
        :shortcuts="shortcuts"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref('');
const value2 = ref('');

const shortcuts = [
  {
    text: 'This month',
    value: [new Date(), new Date()],
  },
  {
    text: 'This year',
    value: () => {
      const end = new Date();
      const start = new Date(new Date().getFullYear(), 0);
      return [start, end];
    },
  },
  {
    text: 'Last 6 months',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setMonth(start.getMonth() - 6);
      return [start, end];
    },
  },
];
</script>
<style scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--e-border-color);
  flex: 1;
}
.demo-date-picker .block:last-child {
  border-right: none;
}
.demo-date-picker .demonstration {
  display: block;
  color: var(--e-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>

```

## 默认值

如果用户没有选择日期，默认情况下显示今天的日历。您可以使用 `default-value` 设置另一个日期。其值应该可解析为 `new Date()`。

如果类型是 `daterange`，`default-value` 设置左侧的日历。

**Demo 示例**: `date-picker/default-value`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/date-picker.html)

```vue
<template>
  <div class="demo-date-picker">
    <div class="block">
      <span class="demonstration">date</span>
      <e-date-picker v-model="value1" type="date" placeholder="请选择日期" :default-value="new Date(2010, 9, 1)" />
    </div>
    <div class="block">
      <span class="demonstration">daterange</span>
      <e-date-picker
        v-model="value2"
        type="daterange"
        start-placeholder="开始"
        end-placeholder="结束"
        :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref('');
const value2 = ref('');
</script>
<style scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--e-border-color);
  flex: 1;
}
.demo-date-picker .block:last-child {
  border-right: none;
}
.demo-date-picker .demonstration {
  display: block;
  color: var(--e-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>

```

## 自定义每周起始日

使用 `first-day-of-week` 属性可以配置每周的第一天是哪一天。值为 1-7，分别代表周一到周日。

**Demo 示例**: `date-picker/first-day-of-week`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/date-picker.html)

```vue
<template>
  <div class="demo-date-picker">
    <div class="block">
      <span class="demonstration">周一作为一周的第一天</span>
      <e-date-picker v-model="value1" type="date" placeholder="请选择日期" :first-day-of-week="1" />
    </div>
    <div class="block">
      <span class="demonstration">周日作为一周的第一天（默认）</span>
      <e-date-picker v-model="value2" type="date" placeholder="请选择日期" :first-day-of-week="7" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref('');
const value2 = ref('');
</script>
<style scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--e-border-color);
  flex: 1;
}
.demo-date-picker .block:last-child {
  border-right: none;
}
.demo-date-picker .demonstration {
  display: block;
  color: var(--e-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>

```

## 日期格式

使用 `format` 来控制输入框中显示文本的格式。使用 `value-format` 来控制绑定值的格式。

默认情况下，组件接受并发出 `Date` 对象。

查看[此处](https://day.js.org/docs/en/display/format#list-of-all-available-formats) Day.js 的所有可用格式列表。

> **⚠️ 警告**
>
> 注意大小写

**Demo 示例**: `date-picker/date-formats`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/date-picker.html)

```vue
<template>
  <div class="demo-date-picker">
    <div class="block">
      <span class="demonstration">Emits Date object</span>
      <div class="demonstration">Value: {{ value1 }}</div>
      <e-date-picker v-model="value1" type="date" placeholder="请选择日期" format="YYYY/MM/DD" />
    </div>
    <div class="block">
      <span class="demonstration">Use value-format</span>
      <div class="demonstration">Value：{{ value2 }}</div>
      <e-date-picker
        v-model="value2"
        type="date"
        placeholder="请选择日期"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
      />
    </div>
    <div class="block">
      <span class="demonstration">Timestamp</span>
      <div class="demonstration">Value：{{ value3 }}</div>
      <e-date-picker v-model="value3" type="date" placeholder="请选择日期" format="YYYY/MM/DD" value-format="x" />
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
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--e-border-color);
  flex: 1;
}
.demo-date-picker .block:last-child {
  border-right: none;
}
.demo-date-picker .demonstration {
  display: block;
  color: var(--e-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>

```

## 开始日期和结束日期的默认时间

在选择日期范围时，您可以为开始日期和结束日期分配时间部分。

**Demo 示例**: `date-picker/default-time`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/date-picker.html)

```vue
<template>
  <div class="demo-date-picker">
    <div class="block">
      <p>Component value：{{ value }}</p>
      <e-date-picker
        v-model="value"
        type="daterange"
        start-placeholder="开始"
        end-placeholder="结束"
        :default-time="defaultTime"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
const defaultTime = ref<[Date, Date]>([new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)]);
</script>
<style scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--e-border-color);
  flex: 1;
}
.demo-date-picker .block:last-child {
  border-right: none;
}
</style>

```

## 设置前缀的自定义内容

前缀的内容可以自定义。

**Demo 示例**: `date-picker/custom-prefix-icon`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/date-picker.html)

```vue
<template>
  <div class="demo-date-picker">
    <div class="block">
      <span class="demonstration">set prefix-icon</span>
      <e-date-picker v-model="value1" type="date" placeholder="请选择日期" :prefix-icon="customPrefix" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { h, ref, shallowRef } from 'vue';

const value1 = ref('');

const customPrefix = shallowRef({
  render() {
    return h('p', 'pre');
  },
});
</script>
<style scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--e-border-color);
  flex: 1;
}
.demo-date-picker .block:last-child {
  border-right: none;
}
.demo-date-picker .demonstration {
  display: block;
  color: var(--e-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>

```

## 自定义内容

单元格的内容可以自定义，在作用域插槽中，您可以获取单元格数据。

**Demo 示例**: `date-picker/custom-content`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/date-picker.html)

```vue
<template>
  <div class="demo-date-picker">
    <e-date-picker v-model="value" type="date" placeholder="请选择日期" format="YYYY/MM/DD" value-format="YYYY-MM-DD">
      <template #default="cell">
        <div class="cell" :class="{ current: cell.isCurrent }">
          <span class="text">{{ cell.text }}</span>
          <span v-if="isHoliday(cell)" class="holiday" />
        </div>
      </template>
    </e-date-picker>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('2021-10-29');
const holidays = ['2021-10-01', '2021-10-02', '2021-10-03', '2021-10-04', '2021-10-05', '2021-10-06', '2021-10-07'];

const isHoliday = ({ dayjs }) => {
  return holidays.includes(dayjs.format('YYYY-MM-DD'));
};
</script>

<style scoped>
.cell {
  height: 30px;
  padding: 3px 0;
  box-sizing: border-box;
}
.cell .text {
  width: 24px;
  height: 24px;
  display: block;
  margin: 0 auto;
  line-height: 24px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
}
.cell.current .text {
  background: #626aef;
  color: #fff;
}
.cell .holiday {
  position: absolute;
  width: 6px;
  height: 6px;
  background: var(--e-color-danger);
  border-radius: 50%;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
}
</style>

```

有关数据详细信息，请参考：

```ts
interface DateCell {
  column: number;
  customClass: string;
  disabled: boolean;
  end: boolean;
  inRange: boolean;
  row: number;
  selected: Dayjs;
  isCurrent: boolean;
  isSelected: boolean;
  start: boolean;
  text: number;
  timestamp: number;
  date: Date;
  dayjs: Dayjs;
  type: 'normal' | 'today' | 'week' | 'next-month' | 'prev-month';
}
```

## Localization

默认语言设置为中文，如果您需要使用其他语言，请查看 [国际化](../guide/guide-i18n.md)

请注意，日期时间的本地化设置（月份名称、每周的第一天等）也在本地化中配置。

## DatePicker API

### Attributes

| Name                  | Description                                                             | Type                                                                                                                       | Default     |
| --------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------- |
| model-value / v-model | 绑定值，如果它是一个数组，其长度应为 2                                  | ^[Date] / ^[number] / ^[string] / ^[Array]                                                                                 | —           |
| readonly              | 日期选择器是否只读                                                      | ^[boolean]                                                                                                                 | false       |
| disabled              | 日期选择器是否禁用                                                      | ^[boolean]                                                                                                                 | false       |
| size                  | 输入的大小                                                              | ^[枚举]`'large' \| 'default' \| 'small'`                                                                                   | default     |
| editable              | 输入框是否可以编辑                                                      | ^[boolean]                                                                                                                 | true        |
| clearable             | 是否显示清除按钮                                                        | ^[boolean]                                                                                                                 | true        |
| placeholder           | 非范围模式下的占位符                                                    | ^[string]                                                                                                                  | —           |
| start-placeholder     | 范围模式下的开始日期占位符                                              | ^[string]                                                                                                                  | —           |
| end-placeholder       | 范围模式下的结束日期占位符                                              | ^[string]                                                                                                                  | —           |
| type                  | 选择器的类型                                                            | ^[枚举]`'year' \| 'month' \| 'date' \| 'dates' \| 'datetime' \| ' week' \| 'datetimerange' \| 'daterange' \| 'monthrange'` | date        |
| format                | 输入框中显示的值的格式                                                  | ^[string] <br> 参见[日期格式](components-date-picker.md#date-formats)                                                         | YYYY-MM-DD  |
| first-day-of-week     | 每周起始星期，取值是 1~7                                                | ^[number]                                                                                                                  | 7           |
| popper-class          | 日期选择器下拉菜单的自定义类名                                          | ^[string]                                                                                                                  | —           |
| popper-options        | 自定义的 popper 选项，请参见[popper.js](https://popper.js.org/docs/v2/) | object                                                                                                                     | —           |
| range-separator       | 范围分隔符                                                              | ^[string]                                                                                                                  | '-'         |
| default-value         | 可选，日历的默认日期                                                    | `Date` / `[Date, Date]`                                                                                                    | —           |
| default-time          | 可选，选择日期范围时要使用的时间值                                      | `Date` / `[Date, Date]`                                                                                                    | —           |
| value-format          | 可选，绑定值的格式。如果未指定，绑定值将是一个 Date 对象                | ^[string] <br> 参见[日期格式](components-date-picker.md#date-formats)                                                         | —           |
| id                    | 与本机输入中的 `id` 属性相同                                            | ^[string] / `[string, string]`                                                                                             | —           |
| name                  | 与本机输入中的 `name` 属性相同                                          | ^[string]                                                                                                                  | —           |
| unlink-panels         | 在范围选择器中取消两个日期面板的关联                                    | ^[boolean]                                                                                                                 | false       |
| suffix-icon           | 自定义后缀图标组件                                                      | `string \| Component`                                                                                                      | Date        |
| clear-icon            | 自定义清除图标组件                                                      | `string \| Component`                                                                                                      | CircleClose |
| validate-event        | 是否触发表单验证                                                        | ^[boolean]                                                                                                                 | true        |
| disabled-date         | 用于确定日期是否禁用的函数，以日期作为参数，应返回布尔值                | ^[Function]`(data: Date) => boolean`                                                                                       | —           |
| shortcuts             | 一个设置快捷选项的对象数组                                              | ^[object]`Array<{ text: string, value: Date \| Function }>`                                                                | —           |
| cell-class-name       | 设置自定义类名                                                          | ^[Function]`(date: Date) => string`                                                                                        | —           |
| teleported            | 日期选择器下拉菜单是否传送到 body 元素中                                | ^[boolean]                                                                                                                 | true        |

### Events

| Name            | Description                                               | Type                                                                                      |
| --------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| change          | 当用户确认值时触发                                        | ^[Function]`(val: typeof v-model) => void`                                                |
| blur            | 当输入框失去焦点时触发                                    | ^[Function]`(e: FocusEvent) => void`                                                      |
| focus           | 当输入框获得焦点时触发                                    | ^[Function]`(e: FocusEvent) => void`                                                      |
| calendar-change | 当日历选择的日期发生更改时触发。仅适用于 `daterange` 类型 | ^[Function]`(val: [Date, null \| Date]) => void`                                          |
| panel-change    | 当导航按钮被点击时触发                                    | ^[Function]`(date: Date \| [Date, Date], mode: 'month' \| 'year', view?: string) => void` |
| visible-change  | 当日期选择器的下拉菜单出现或消失时触发                    | ^[Function]`(visibility: boolean) => void`                                                |

### Methods

| Method      | Description          | Parameters |
| ----------- | -------------------- | ---------- |
| focus       | 让输入框获得焦点     | —          |
| handleOpen  | 打开日期选择器弹出框 | —          |
| handleClose | 关闭日期选择器弹出框 | —          |

### Slots

| Name            | Description          |
| --------------- | -------------------- |
| default         | 自定义单元格内容     |
| range-separator | 自定义范围分隔符内容 |