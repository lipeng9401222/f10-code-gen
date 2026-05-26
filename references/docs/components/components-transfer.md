---
title: Transfer
originUrl: http://192.168.219.170/docs/vue/latest/component/component/transfer.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/transfer.html)

# Transfer 穿梭框

## 基本用法

**Demo 示例**: `transfer/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/transfer.html)

```vue
<template>
  <e-transfer v-model="value" :data="data" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface Option {
  key: number;
  label: string;
  disabled: boolean;
}

const generateData = () => {
  const data: Option[] = [];
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `Option ${i}`,
      disabled: i % 4 === 0,
    });
  }
  return data;
};

const data = ref<Option[]>(generateData());
const value = ref([]);
</script>

```

## 可筛选

您可以搜索和筛选数据项。

**Demo 示例**: `transfer/filterable`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/transfer.html)

```vue
<template>
  <e-transfer
    v-model="value"
    filterable
    :filter-method="filterMethod"
    filter-placeholder="State Abbreviations"
    :data="data"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface Option {
  key: number;
  label: string;
  initial: string;
}

const generateData = () => {
  const data: Option[] = [];
  const states = ['California', 'Illinois', 'Maryland', 'Texas', 'Florida', 'Colorado', 'Connecticut '];
  const initials = ['CA', 'IL', 'MD', 'TX', 'FL', 'CO', 'CT'];
  states.forEach((city, index) => {
    data.push({
      label: city,
      key: index,
      initial: initials[index],
    });
  });
  return data;
};

const data = ref<Option[]>(generateData());
const value = ref([]);

const filterMethod = (query, item) => {
  return item.initial.toLowerCase().includes(query.toLowerCase());
};
</script>

```

## 可定制

您可以自定义列表标题、按钮文本、数据项的渲染函数、列表页脚中的检查状态文本和列表页脚内容。

**Demo 示例**: `transfer/customizable`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/transfer.html)

```vue
<template>
  <p style="text-align: center; margin: 0 0 20px">Customize data items using render-content</p>
  <div style="text-align: center">
    <e-transfer
      v-model="leftValue"
      style="text-align: left; display: inline-block"
      filterable
      :left-default-checked="[2, 3]"
      :right-default-checked="[1]"
      :render-content="renderFunc"
      :titles="['Source', 'Target']"
      :button-texts="['To left', 'To right']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}',
      }"
      :data="data"
      @change="handleChange"
    >
      <template #left-footer>
        <e-button class="transfer-footer" size="small">Operation</e-button>
      </template>
      <template #right-footer>
        <e-button class="transfer-footer" size="small">Operation</e-button>
      </template>
    </e-transfer>
    <p style="text-align: center; margin: 50px 0 20px">Customize data items using scoped slot</p>
    <div style="text-align: center">
      <e-transfer
        v-model="rightValue"
        style="text-align: left; display: inline-block"
        filterable
        :left-default-checked="[2, 3]"
        :right-default-checked="[1]"
        :titles="['Source', 'Target']"
        :button-texts="['To left', 'To right']"
        :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}',
        }"
        :data="data"
        @change="handleChange"
      >
        <template #default="{ option }">
          <span>{{ option.key }} - {{ option.label }}</span>
        </template>
        <template #left-footer>
          <e-button class="transfer-footer" size="small">Operation</e-button>
        </template>
        <template #right-footer>
          <e-button class="transfer-footer" size="small">Operation</e-button>
        </template>
      </e-transfer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { VNode, VNodeProps } from 'vue';

interface Option {
  key: number;
  label: string;
  disabled: boolean;
}

const generateData = (): Option[] => {
  const data: Option[] = [];
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `Option ${i}`,
      disabled: i % 4 === 0,
    });
  }
  return data;
};

const data = ref(generateData());
const rightValue = ref([1]);
const leftValue = ref([1]);

const renderFunc = (h: (type: string, props: VNodeProps | null, children?: string) => VNode, option: Option) => {
  return h('span', null, option.label);
};
const handleChange = (value: number | string, direction: 'left' | 'right', movedKeys: string[] | number[]) => {
  console.log(value, direction, movedKeys);
};
</script>

<style scoped>
.transfer-footer {
  margin-left: 15px;
  padding: 6px 5px;
}
</style>

```

## 属性别名

默认情况下，Transfer 在数据项中查找`key`、`label`和`disabled`。如果您的数据项具有不同的键名，可以使用`props`属性定义别名。

**Demo 示例**: `transfer/prop-alias`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/transfer.html)

```vue
<template>
  <e-transfer
    v-model="value"
    :props="{
      key: 'value',
      label: 'desc',
    }"
    :data="data"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface Option {
  value: number;
  desc: string;
  disabled: boolean;
}

const generateData = () => {
  const data: Option[] = [];
  for (let i = 1; i <= 15; i++) {
    data.push({
      value: i,
      desc: `Option ${i}`,
      disabled: i % 4 === 0,
    });
  }
  return data;
};

const data = ref<Option[]>(generateData());
const value = ref([]);
</script>

```

## API

### Attributes

| Name                  | Description                                                                                                                                                                  | Type                                                               | Default    |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------- |
| model-value / v-model | 绑定的值                                                                                                                                                                     | ^[object]`Array<string \| number>`                                 | —          |
| data                  | 数据源                                                                                                                                                                       | ^[object]`Record<string, any>[]`                                   | [ ]        |
| filterable            | 是否可过滤                                                                                                                                                                   | ^[boolean]                                                         | false      |
| filter-placeholder    | 过滤输入框的占位文本                                                                                                                                                         | ^[string]                                                          | 输入关键字 |
| filter-method         | 自定义过滤方法                                                                                                                                                               | ^[Function]`(query: string, item: Record<string, any>) => boolean` | —          |
| target-order          | 目标列表中元素的排序策略。如果设置为 `original`，元素将保持与数据源相同的顺序。如果设置为 `push`，新添加的元素将被推送到底部。如果设置为 `unshift`，新添加的元素将插入到顶部 | ^[枚举]`'original' \| 'push' \| 'unshift'`                         | original   |
| titles                | 自定义列表标题                                                                                                                                                               | ^[object]`[string, string]`                                        | [ ]        |
| button-texts          | 自定义按钮文本                                                                                                                                                               | ^[object]`[string, string]`                                        | [ ]        |
| render-content        | 自定义数据项的渲染函数                                                                                                                                                       | ^[object]`renderContent`                                           | —          |
| format                | 列表头中勾选状态的文本显示格式化配置                                                                                                                                         | ^[object]`TransferFormat`                                          | -          |
| props                 | 数据源的属性别名                                                                                                                                                             | ^[object]`TransferPropsAlias`                                      | —          |
| left-default-checked  | 初始选中的左侧列表数据项的键数组                                                                                                                                             | ^[object]`Array<string \| number>`                                 | [ ]        |
| right-default-checked | 初始选中的右侧列表数据项的键数组                                                                                                                                             | ^[object]`Array<string \| number>`                                 | [ ]        |
| validate-event        | 是否触发表单验证                                                                                                                                                             | ^[boolean]                                                         | true       |

### Slots

| Name         | Description                                 |
| ------------ | ------------------------------------------- |
| —            | 自定义数据项的内容。作用域参数为 { option } |
| left-footer  | 左侧列表页脚的内容                          |
| right-footer | 右侧列表页脚的内容                          |

### Methods

| Method     | Description              | Parameters       |
| ---------- | ------------------------ | ---------------- |
| clearQuery | 清除某个面板的过滤关键字 | 'left' / 'right' |

### Events

| Name               | Description                                    | Parameters                                                             |
| ------------------ | ---------------------------------------------- | ---------------------------------------------------------------------- |
| change             | 右侧列表中的数据项发生更改时触发               | 当前右侧列表中的数据项的键数组，传输方向（左或右），已移动项目的键数组 |
| left-check-change  | 当用户更改左侧列表中任何数据项的选中状态时触发 | 当前选中项的键数组，选中状态已更改的项的键数组                         |
| right-check-change | 当用户更改右侧列表中任何数据项的选中状态时触发 | 当前选中项的键数组，选中状态已更改的项的键数组                         |

### Type Declarations

<details>
  <summary>查看类型定义</summary>

```ts
import type { h as H, VNode } from 'vue';

type TransferKey = string | number;

type TransferDirection = 'left' | 'right';

type TransferDataItem = Record<string, any>;

type renderContent = (h: typeof H, option: TransferDataItem) => VNode | VNode[];

interface TransferFormat {
  noChecked?: string; // 左侧文本，默认值为 '${checked}/${total}'
  hasChecked?: string; // 右侧文本，默认值为 '${checked}/${total}'
}

interface TransferPropsAlias {
  label?: string;
  key?: string;
  disabled?: string;
}
```

</details>