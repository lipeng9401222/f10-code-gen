---
title: MetricNav 指标导航
originUrl: http://192.168.219.170/docs/vue/latest/component/component/metric-nav.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/metric-nav.html)

# MetricNav 指标导航

响应式指标导航容器，支持自动响应式布局、分页导航和选中交互。

## 基本用法

**Demo 示例**: `metric-nav/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/metric-nav.html)

```vue
<template>
  <e-metric-nav v-model="current" :options="stats" />
</template>

<script setup>
import { ref } from 'vue';

const current = ref('all');

const stats = ref([
  { value: 'all', label: '所有审核', metric: 215, unit: '个' },
  { value: 'pending', label: '待审核', metric: 25, unit: '个' },
  { value: 'approved', label: '审核通过', metric: 168, unit: '个' },
  { value: 'rejected', label: '审核不通过', metric: 12, unit: '个' },
  { value: 'suspended', label: '临时挂起', metric: 8, unit: '个' },
  { value: 'editing', label: '编辑中', metric: 2, unit: '个' },
]);
</script>

<style scoped></style>

```

## 选中交互

**Demo 示例**: `metric-nav/selection`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/metric-nav.html)

```vue
<template>
  <e-metric-nav v-model="current" :options="stats" :clickable="true" @change="handleChange" />
</template>

<script setup>
import { ref } from 'vue';

const current = ref('all');

const stats = ref([
  { value: 'all', label: '所有审核', metric: 215, unit: '个' },
  { value: 'pending', label: '待审核', metric: 25, unit: '个' },
  { value: 'approved', label: '审核通过', metric: 168, unit: '个' },
  { value: 'rejected', label: '审核不通过', metric: 12, unit: '个' },
]);

const handleChange = (key, item) => {
  console.log('选中项:', key, item);
};
</script>

<style scoped></style>

```

## 纯展示模式

**Demo 示例**: `metric-nav/display-only`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/metric-nav.html)

```vue
<template>
  <e-metric-nav :options="stats" :clickable="false" />
</template>

<script setup>
import { ref } from 'vue';

const stats = ref([
  { value: 'all', label: '所有审核', metric: 215, unit: '个' },
  { value: 'pending', label: '待审核', metric: 25, unit: '个' },
  { value: 'approved', label: '审核通过', metric: 168, unit: '个' },
  { value: 'rejected', label: '审核不通过', metric: 12, unit: '个' },
  { value: 'suspended', label: '临时挂起', metric: 8, unit: '个' },
  { value: 'editing', label: '编辑中', metric: 2, unit: '个' },
]);
</script>

<style scoped></style>

```

## 分页功能

**Demo 示例**: `metric-nav/pagination`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/metric-nav.html)

```vue
<template>
  <div class="demo-container">
    <e-metric-nav v-model="current" :options="manyStats" arrow="always" :columns="3" @page-change="handlePageChange" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const current = ref('all');

const manyStats = ref([
  { value: 'all', label: '所有审核', metric: 215, unit: '个' },
  { value: 'pending', label: '待审核', metric: 25, unit: '个' },
  { value: 'approved', label: '审核通过', metric: 168, unit: '个' },
  { value: 'rejected', label: '审核不通过', metric: 12, unit: '个' },
  { value: 'suspended', label: '临时挂起', metric: 8, unit: '个' },
  { value: 'editing', label: '编辑中', metric: 2, unit: '个' },
  { value: 'draft', label: '草稿', metric: 15, unit: '个' },
  { value: 'archived', label: '已归档', metric: 56, unit: '个' },
]);
</script>

<style scoped></style>

```

## 循环轮播

**Demo 示例**: `metric-nav/loop`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/metric-nav.html)

```vue
<template>
  <div class="demo-container">
    <e-metric-nav v-model="current" :options="manyStats" :loop="true" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const current = ref('all');

const manyStats = ref([
  { value: 'all', label: '所有审核', metric: 215, unit: '个' },
  { value: 'pending', label: '待审核', metric: 25, unit: '个' },
  { value: 'approved', label: '审核通过', metric: 168, unit: '个' },
  { value: 'rejected', label: '审核不通过', metric: 12, unit: '个' },
  { value: 'suspended', label: '临时挂起', metric: 8, unit: '个' },
  { value: 'editing', label: '编辑中', metric: 2, unit: '个' },
]);
</script>

<style scoped></style>

```

## 自定义卡片

**Demo 示例**: `metric-nav/custom-card`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/metric-nav.html)

```vue
<template>
  <e-metric-nav v-model="current" :options="stats">
    <template #card="{ item, active, onClick }">
      <div class="custom-card" :class="{ 'is-active': active }" @click="onClick">
        <div class="custom-label">{{ item.label }}</div>
        <div class="custom-value">{{ item.value }}</div>
      </div>
    </template>
  </e-metric-nav>
</template>

<script setup>
import { ref } from 'vue';

const current = ref('all');

const stats = ref([
  { value: 'all', label: '所有审核', metric: 215 },
  { value: 'pending', label: '待审核', metric: 25 },
  { value: 'approved', label: '审核通过', metric: 168 },
  { value: 'rejected', label: '审核不通过', metric: 12 },
]);
</script>

<style scoped>
.custom-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--e-space-xl);
  cursor: pointer;
  transition: var(--e-transition-all);
}

.custom-card.is-active {
  background: var(--e-color-primary-light-9);
}

.custom-label {
  font-size: var(--e-font-size-base);
  color: var(--e-text-color-secondary);
  margin-bottom: var(--e-space-xs);
}

.custom-value {
  font-size: var(--e-font-size-extra-large);
  font-weight: var(--e-font-weight-bold);
  color: var(--e-text-color-primary);
}
</style>

```

## 固定列数

**Demo 示例**: `metric-nav/fixed-columns`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/metric-nav.html)

```vue
<template>
  <e-metric-nav v-model="current" :options="stats" :columns="4" />
</template>

<script setup>
import { ref } from 'vue';

const current = ref('all');

const stats = ref([
  { value: 'all', label: '所有审核', metric: 215, unit: '个' },
  { value: 'pending', label: '待审核', metric: 25, unit: '个' },
  { value: 'approved', label: '审核通过', metric: 168, unit: '个' },
  { value: 'rejected', label: '审核不通过', metric: 12, unit: '个' },
  { value: 'suspended', label: '临时挂起', metric: 8, unit: '个' },
  { value: 'editing', label: '编辑中', metric: 2, unit: '个' },
]);
</script>

<style scoped>
.demo-desc {
  margin-top: var(--e-space-xl);
  color: var(--e-text-color-secondary);
}
</style>

```

## 自定义响应式断点

**Demo 示例**: `metric-nav/custom-responsive`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/metric-nav.html)

```vue
<template>
  <e-metric-nav v-model="current" :options="manyStats" :responsive="{ 400: 2, 600: 3, 900: 4 }" />
</template>

<script setup>
import { ref } from 'vue';

const current = ref('all');

const manyStats = ref([
  { value: 'all', label: '所有审核', metric: 215, unit: '个' },
  { value: 'pending', label: '待审核', metric: 25, unit: '个' },
  { value: 'approved', label: '审核通过', metric: 168, unit: '个' },
  { value: 'rejected', label: '审核不通过', metric: 12, unit: '个' },
  { value: 'suspended', label: '临时挂起', metric: 8, unit: '个' },
]);
</script>

<style scoped></style>

```

## 不同尺寸

**Demo 示例**: `metric-nav/size`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/metric-nav.html)

```vue
<template>
  <div class="demo-wrapper">
    <div>
      <p class="demo-label">Small</p>
      <e-metric-nav v-model="current1" :options="stats" size="small" />
    </div>
    <div>
      <p class="demo-label">Default</p>
      <e-metric-nav v-model="current2" :options="stats" />
    </div>
    <div>
      <p class="demo-label">Large</p>
      <e-metric-nav v-model="current3" :options="stats" size="large" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const current1 = ref('all');
const current2 = ref('all');
const current3 = ref('all');

const stats = ref([
  { value: 'all', label: '所有审核', metric: 215, unit: '个' },
  { value: 'pending', label: '待审核', metric: 25, unit: '个' },
  { value: 'approved', label: '审核通过', metric: 168, unit: '个' },
  { value: 'rejected', label: '审核不通过', metric: 12, unit: '个' },
]);
</script>

<style scoped>
.demo-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--e-space-xxl);
}

.demo-label {
  margin-bottom: var(--e-space-m);
  color: var(--e-text-color-secondary);
}
</style>

```

## 禁用状态

**Demo 示例**: `metric-nav/disabled`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/metric-nav.html)

```vue
<template>
  <div class="demo-wrapper">
    <div>
      <p class="demo-label">整体禁用</p>
      <e-metric-nav v-model="current1" :options="stats" disabled />
    </div>
    <div>
      <p class="demo-label">部分禁用（待审核和编辑中）</p>
      <e-metric-nav v-model="current2" :options="disabledStats" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const current1 = ref('');
const current2 = ref('all');

const stats = ref([
  { value: 'all', label: '所有审核', metric: 215, unit: '个' },
  { value: 'pending', label: '待审核', metric: 25, unit: '个' },
  { value: 'approved', label: '审核通过', metric: 168, unit: '个' },
  { value: 'rejected', label: '审核不通过', metric: 12, unit: '个' },
]);

const disabledStats = ref([
  { value: 'all', label: '所有审核', metric: 215, unit: '个' },
  { value: 'pending', label: '待审核', metric: 25, unit: '个', disabled: true },
  { value: 'approved', label: '审核通过', metric: 168, unit: '个' },
  { value: 'editing', label: '编辑中', metric: 2, unit: '个', disabled: true },
]);
</script>

<style scoped>
.demo-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--e-space-xxl);
}

.demo-label {
  margin-bottom: var(--e-space-m);
  color: var(--e-text-color-secondary);
}
</style>

```

## 子组件声明式

**Demo 示例**: `metric-nav/slot-usage`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/metric-nav.html)

```vue
<template>
  <e-metric-nav v-model="active" loop arrow="always">
    <e-metric-nav-item value="sales" label="销售额" :metric="1234" unit="万" />
    <e-metric-nav-item value="profit" label="利润" :metric="567" unit="万" disabled />
    <e-metric-nav-item value="orders" label="订单数" :metric="89" unit="笔" />
    <e-metric-nav-item value="custom">
      <div class="custom-card">
        <div class="custom-label">自定义</div>
        <div class="custom-content">
          <span class="custom-value">任意内容</span>
        </div>
      </div>
    </e-metric-nav-item>
  </e-metric-nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { EMetricNav, EMetricNavItem } from '@epoint-fe/eui-components';

const active = ref('sales');
</script>

<style scoped>
.custom-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.custom-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.custom-content {
  display: flex;
  align-items: baseline;
}

.custom-value {
  font-size: 20px;
  font-weight: bold;
  color: #409eff;
}
</style>

```

## API

### Attributes

| Name | Description | Type | Default |
| ------ | ---- | ---- | ------ |
| options | 数据选项 | ^[array]`MetricItem[]` | [] |
| model-value / v-model | 当前选中项的唯一标识值（对应 `value-key` 指定字段） | ^[string] / ^[number] | — |
| columns | 每页卡片数量，0 表示自动响应式 | ^[number] | 0 |
| responsive | 响应式断点配置 | ^[object]`Record<number, number>` | {500: 2, 800: 3, 1000: 4, 1400: 5} |
| clickable | 是否可点击选中 | ^[boolean] | true |
| arrow | 何时显示箭头 | ^[enum]`'always' \| 'hover' \| 'never'` | 'hover' |
| loop | 是否循环轮播 | ^[boolean] | false |
| value-key | 指定唯一标识字段名（数据项中必须存在此字段） | ^[string] | 'value' |
| gap | 卡片间距（像素） | ^[number] | 12 |
| disabled | 整体禁用 | ^[boolean] | false |
| size | 尺寸 | ^[enum]`'small' \| 'default' \| 'large'` | 'default' |

### Events

| Name | Description | Type |
| ------ | ---- | ---- |
| update:model-value | 选中项变化时触发（v-model） | ^[Function]`(value: string \| number) => void` |
| change | 选中项变化时触发 | ^[Function]`(value: string \| number, item: MetricItem) => void` |
| page-change | 页码变化时触发 | ^[Function]`(page: number, prevPage: number) => void` |

### Slots

| Name | Description | Type |
| ------ | ---- | ---- |
| card | 自定义卡片内容 | ^[object]`{ item: MetricItem, index: number, active: boolean, onClick: () => void }` |
| arrow-left | 自定义左箭头 | ^[object]`{ disabled: boolean, onClick: () => void }` |
| arrow-right | 自定义右箭头 | ^[object]`{ disabled: boolean, onClick: () => void }` |

### Exposes

| Name | Description | Type |
| ------ | ---- | ---- |
| prev | 切换到上一页 | ^[Function]`() => void` |
| next | 切换到下一页 | ^[Function]`() => void` |
| setPage | 切换到指定页 | ^[Function]`(page: number) => void` |
| currentPage | 当前页码（只读，`loop` 模式下仍会保持在有效页码范围内） | ^[number] |
| pageCount | 总页数（只读） | ^[number] |

### EMetricNavItem API

### Attributes

| Name | Description | Type | Default |
| ------ | ---- | ---- | ------ |
| value | 唯一标识值（必填） | ^[string] / ^[number] | — |
| label | 标签文字 | ^[string] | '' |
| metric | 指标数值 | ^[string] / ^[number] | — |
| unit | 单位文字 | ^[string] | '' |
| disabled | 是否禁用 | ^[boolean] | false |

### Slots

| Name | Description |
| ------ | ---- |
| default | 自定义内容，存在时覆盖默认卡片样式 |

### Events

| Name | Description | Type |
| ------ | ---- | ---- |
| click | 点击时触发 | ^[Function]`(value: string \| number) => void` |

## 类型定义

```ts
interface MetricItem {
  value: string | number;
  label?: string;
  metric?: string | number;
  unit?: string;
  disabled?: boolean;
  [key: string]: any;
}

type ResponsiveConfig = Record<number, number>;
```