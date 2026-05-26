---
title: Statistic
originUrl: http://192.168.219.170/docs/vue/latest/component/component/statistic.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/statistic.html)

# Statistic 统计组件

显示统计数据。

## 基本用法

**Demo 示例**: `statistic/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/statistic.html)

```vue
<template>
  <e-row>
    <e-col :span="6">
      <e-statistic title="Daily active users" :value="268500" />
    </e-col>
    <e-col :span="6">
      <e-statistic :value="138">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            Ratio of men to women
            <e-icon style="margin-left: 4px" :size="12">
              <Male />
            </e-icon>
          </div>
        </template>
        <template #suffix>/100</template>
      </e-statistic>
    </e-col>
    <e-col :span="6">
      <e-statistic title="Total Transactions" :value="172000" />
    </e-col>
    <e-col :span="6">
      <e-statistic title="Feedback number" :value="562">
        <template #suffix>
          <e-icon style="vertical-align: -0.125em">
            <ChatLineRound />
          </e-icon>
        </template>
      </e-statistic>
    </e-col>
  </e-row>
</template>

<script lang="ts" setup>
import { ChatLineRound, Male } from '@epoint-fe/eui-icons';
</script>

<style scoped>
.e-col {
  text-align: center;
}
</style>

```

## 倒计时

**Demo 示例**: `statistic/countdown`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/statistic.html)

```vue
<template>
  <e-row>
    <e-col :span="8">
      <e-countdown title="Start to grab" :value="value" />
    </e-col>
    <e-col :span="8">
      <e-countdown title="Remaining VIP time" format="HH:mm:ss" :value="value1" />
      <e-button class="countdown-footer" type="primary" @click="reset">Reset </e-button>
    </e-col>
    <e-col :span="8">
      <e-countdown format="DD [days] HH:mm:ss" :value="value2">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            <e-icon style="margin-right: 4px" :size="12">
              <Calendar />
            </e-icon>
            Still to go until next month
          </div>
        </template>
      </e-countdown>
      <div class="countdown-footer">{{ value2.format('YYYY-MM-DD') }}</div>
    </e-col>
  </e-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import dayjs from 'dayjs';
import { Calendar } from '@epoint-fe/eui-icons';

const value = ref(Date.now() + 1000 * 60 * 60 * 7);
const value1 = ref(Date.now() + 1000 * 60 * 60 * 24 * 2);
const value2 = ref(dayjs().add(1, 'month').startOf('month'));

function reset() {
  value1.value = Date.now() + 1000 * 60 * 60 * 24 * 2;
}
</script>

<style scoped>
.e-col {
  text-align: center;
}

.countdown-footer {
  margin-top: 8px;
}
</style>

```

> **💡 提示**
>
> 在格式化中建议在天的范围内。

## 卡片用法

**Demo 示例**: `statistic/card`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/statistic.html)

```vue
<template>
  <e-row :gutter="16">
    <e-col :span="8">
      <div class="statistic-card">
        <e-statistic :value="98500">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              Daily active users
              <e-tooltip effect="dark" content="Number of users who logged into the product in one day" placement="top">
                <e-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </e-icon>
              </e-tooltip>
            </div>
          </template>
        </e-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <span>than yesterday</span>
            <span class="green">
              24%
              <e-icon>
                <CaretTop />
              </e-icon>
            </span>
          </div>
        </div>
      </div>
    </e-col>
    <e-col :span="8">
      <div class="statistic-card">
        <e-statistic :value="693700">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              Monthly Active Users
              <e-tooltip
                effect="dark"
                content="Number of users who logged into the product in one month"
                placement="top"
              >
                <e-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </e-icon>
              </e-tooltip>
            </div>
          </template>
        </e-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <span>month on month</span>
            <span class="red">
              12%
              <e-icon>
                <CaretBottom />
              </e-icon>
            </span>
          </div>
        </div>
      </div>
    </e-col>
    <e-col :span="8">
      <div class="statistic-card">
        <e-statistic :value="72000" title="New transactions today">
          <template #title>
            <div style="display: inline-flex; align-items: center">New transactions today</div>
          </template>
        </e-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <span>than yesterday</span>
            <span class="green">
              16%
              <e-icon>
                <CaretTop />
              </e-icon>
            </span>
          </div>
          <div class="footer-item">
            <e-icon :size="14">
              <ArrowRight />
            </e-icon>
          </div>
        </div>
      </div>
    </e-col>
  </e-row>
</template>

<script lang="ts" setup>
import { ArrowRight, CaretBottom, CaretTop, Warning } from '@epoint-fe/eui-icons';
</script>

<style scoped>
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--e-fill-color) !important;
}

.e-statistic {
  --e-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--e-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--e-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--e-color-success);
}
.red {
  color: var(--e-color-error);
}
</style>

```

## Statistic API

### Statistic Attributes

| Name              | Description      | Type                                                                | Default |
| ----------------- | ---------------- | ------------------------------------------------------------------- | ------- |
| value             | 数值内容         | ^[number]                                                           | 0       |
| decimal-separator | 设置小数点       | ^[string]                                                           | .       |
| formatter         | 自定义数字展示   | ^[Function]`(value: number) => string \| number`                    | —       |
| group-separator   | 设置千分位标识符 | ^[string]                                                           | ,       |
| precision         | 数值精度         | ^[number]                                                           | 0       |
| prefix            | 设置数值前缀     | ^[string]                                                           | —       |
| suffix            | 设置数值后缀     | ^[string]                                                           | —       |
| title             | 数值标题         | ^[string]                                                           | —       |
| value-style       | 样式化数字值     | ^[string] / ^[object]`CSSProperties \| CSSProperties[] \| string[]` | —       |

### Statistic Slots

| Name   | Description |
| ------ | ----------- |
| prefix | 数值前缀    |
| suffix | 数值后缀    |
| title  | 数值标题    |

### Statistic Exposes

| Name         | Description  | Type                             |
| ------------ | ------------ | -------------------------------- |
| displayValue | 当前显示数值 | ^[object]`Ref<string \| number>` |

## Countdown API

### Countdown Attributes

| Name        | Description      | Type                                                                | Default  |
| ----------- | ---------------- | ------------------------------------------------------------------- | -------- |
| value       | 目标时间         | ^[number] / ^[Dayjs]                                                | —        |
| format      | 格式化倒计时显示 | ^[string]                                                           | HH:mm:ss |
| prefix      | 设置倒计时前缀   | ^[string]                                                           | —        |
| suffix      | 设置倒计时后缀   | ^[string]                                                           | —        |
| title       | 倒计时标题       | ^[string]                                                           | —        |
| value-style | 样式化倒计时数值 | ^[string] / ^[object]`CSSProperties \| CSSProperties[] \| string[]` | —        |

### Countdown Events

| Name   | Description      | Type                                 |
| ------ | ---------------- | ------------------------------------ |
| change | 时间差异改变事件 | ^[Function]`(value: number) => void` |
| finish | 倒计时结束事件   | ^[Function]`() => void`              |

### Countdown Slots

| Name   | Description  |
| ------ | ------------ |
| prefix | 倒计时值前缀 |
| suffix | 倒计时值后缀 |
| title  | 倒计时标题   |

### Countdown Exposes

| Name         | Description  | Type                   |
| ------------ | ------------ | ---------------------- |
| displayValue | 当前显示数值 | ^[object]`Ref<string>` |