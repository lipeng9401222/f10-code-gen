---
title: TreeSelect
originUrl: http://192.168.219.170/docs/vue/latest/component/component/tree-select.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/tree-select.html)

# TreeSelect 树形选择

下拉菜单的树选择器，结合了 `e-tree` 和 `e-select` 组件的功能。

> **💡 提示**
>
> 在使用 SSR 时，此组件需要使用 `<client-only></client-only>` 包装 (例如：[Nuxt](https://nuxt.com/v3)) 和 SSG 时 (例如：[VitePress](https://vitepress.vuejs.org/))。

## 基本用法

用于树形结构的选择器。

**Demo 示例**: `tree-select/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree-select.html)

```vue
<template>
  <e-tree-select v-model="value1" :data="data" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref();

const data = [
  {
    value: '1',
    label: 'Level one 1',
    children: [
      {
        value: '1-1',
        label: 'Level two 1-1',
        children: [
          {
            value: '1-1-1',
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: 'Level one 2',
    children: [
      {
        value: '2-1',
        label: 'Level two 2-1',
        children: [
          {
            value: '2-1-1',
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        value: '2-2',
        label: 'Level two 2-2',
        children: [
          {
            value: '2-2-1',
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    value: '3',
    label: 'Level one 3',
    children: [
      {
        value: '3-1',
        label: 'Level two 3-1',
        children: [
          {
            value: '3-1-1',
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        value: '3-2',
        label: 'Level two 3-2',
        children: [
          {
            value: '3-2-1',
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
];
</script>

```

## 多选

使用单击或复选框进行多选。

**Demo 示例**: `tree-select/multiple`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree-select.html)

```vue
<template>
  <EForm label-width="100px">
    <EFormItem label="下拉树">
      <e-tree-select v-model="value1" :data="data" multiple :check-strictly="false" />
    </EFormItem>

    <e-divider />

    <EFormItem label="复选框">
      <e-tree-select v-model="value2" :data="data" checkable multiple />
    </EFormItem>

    <e-divider />

    <EFormItem label="非联动">
      <e-tree-select v-model="valueStrictly" :data="data" checkable check-strictly />
    </EFormItem>
  </EForm>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref([]);
const value2 = ref([]);
const valueStrictly = ref([]);

const data = [
  {
    value: '1',
    label: 'Level one 1',
    children: [
      {
        value: '1-1',
        label: 'Level two 1-1',
        children: [
          {
            value: '1-1-1',
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: 'Level one 2',
    children: [
      {
        value: '2-1',
        label: 'Level two 2-1',
        children: [
          {
            value: '2-1-1',
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        value: '2-2',
        label: 'Level two 2-2',
        children: [
          {
            value: '2-2-1',
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    value: '3',
    label: 'Level one 3',
    children: [
      {
        value: '3-1',
        label: 'Level two 3-1',
        children: [
          {
            value: '3-1-1',
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        value: '3-2',
        label: 'Level two 3-2',
        children: [
          {
            value: '3-2-1',
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
];
</script>

```

## 定制回填方式

可以通过 `checked-strategy` 属性定制回填方式。

**Demo 示例**: `tree-select/checked-strategy`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree-select.html)

```vue
<template>
  <div style="margin-bottom: 24px">
    <e-radio-group
      v-model="checkedStrategy"
      type="button"
      @change="
        (value) => {
          selected = [];
        }
      "
    >
      <e-radio v-for="item in strategyOptions" :key="item?.value" :value="item?.value">
        {{ item?.label }}
      </e-radio>
    </e-radio-group>
  </div>
  <e-tree-select
    v-model="selected"
    checkable
    multiple
    :checked-strategy="checkedStrategy"
    :data="treeData"
    placeholder="Please select ..."
    style="width: 300px"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const selected = ref([]);
const checkedStrategy = ref('all');

const strategyOptions = [
  {
    value: 'all',
    label: 'show all',
  },
  {
    value: 'parent',
    label: 'show parent',
  },
  {
    value: 'child',
    label: 'show child',
  },
];

const treeData = [
  {
    value: '1',
    label: 'Level one 1',
    children: [
      {
        value: '1-1',
        label: 'Level two 1-1',
        children: [
          {
            value: '1-1-1',
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: 'Level one 2',
    children: [
      {
        value: '2-1',
        label: 'Level two 2-1',
        children: [
          {
            value: '2-1-1',
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        value: '2-2',
        label: 'Level two 2-2',
        children: [
          {
            value: '2-2-1',
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    value: '3',
    label: 'Level one 3',
    children: [
      {
        value: '3-1',
        label: 'Level two 3-1',
        children: [
          {
            value: '3-1-1',
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        value: '3-2',
        label: 'Level two 3-2',
        children: [
          {
            value: '3-2-1',
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
];
</script>

```

## 禁用选项

使用禁用字段禁用选项。

**Demo 示例**: `tree-select/disabled`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree-select.html)

```vue
<template>
  <e-tree-select v-model="value" :data="data" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref();

const data = [
  {
    value: '1',
    label: 'Level one 1',
    disabled: true,
    children: [
      {
        value: '1-1',
        label: 'Level two 1-1',
        disabled: true,
        children: [
          {
            disabled: true,
            value: '1-1-1',
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: 'Level one 2',
    children: [
      {
        value: '2-1',
        label: 'Level two 2-1',
        children: [
          {
            value: '2-1-1',
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        value: '2-2',
        label: 'Level two 2-2',
        children: [
          {
            value: '2-2-1',
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    value: '3',
    label: 'Level one 3',
    children: [
      {
        value: '3-1',
        label: 'Level two 3-1',
        children: [
          {
            value: '3-1-1',
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        value: '3-2',
        label: 'Level two 3-2',
        children: [
          {
            value: '3-2-1',
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
];
</script>

```

## 可过滤

通过 `filterable` 属性开启过滤功能。

**Demo 示例**: `tree-select/filterable`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree-select.html)

```vue
<template>
  <e-tree-select v-model="value" :data="sourceData" filterable />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref();

const sourceData = [
  {
    value: '1',
    label: 'Level one 1',
    children: [
      {
        value: '1-1',
        label: 'Level two 1-1',
        children: [
          {
            value: '1-1-1',
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: 'Level one 2',
    children: [
      {
        value: '2-1',
        label: 'Level two 2-1',
        children: [
          {
            value: '2-1-1',
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        value: '2-2',
        label: 'Level two 2-2',
        children: [
          {
            value: '2-2-1',
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    value: '3',
    label: 'Level one 3',
    children: [
      {
        value: '3-1',
        label: 'Level two 3-1',
        children: [
          {
            value: '3-1-1',
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        value: '3-2',
        label: 'Level two 3-2',
        children: [
          {
            value: '3-2-1',
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
];
</script>

```

## 远程搜索

可通过 `filterMethod` 来实现远程搜索。

**Demo 示例**: `tree-select/remote-filter`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree-select.html)

```vue
<template>
  <e-tree-select v-model="value" :data="data" :filter-method="filterMethod" filterable :loading="loading" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { TreeNodeData } from '@epoint-fe/eui-components';

const value = ref();
const loading = ref(false);

const sourceData = [
  {
    value: '1',
    label: 'Level one 1',
    children: [
      {
        value: '1-1',
        label: 'Level two 1-1',
        children: [
          {
            value: '1-1-1',
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: 'Level one 2',
    children: [
      {
        value: '2-1',
        label: 'Level two 2-1',
        children: [
          {
            value: '2-1-1',
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        value: '2-2',
        label: 'Level two 2-2',
        children: [
          {
            value: '2-2-1',
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    value: '3',
    label: 'Level one 3',
    children: [
      {
        value: '3-1',
        label: 'Level two 3-1',
        children: [
          {
            value: '3-1-1',
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        value: '3-2',
        label: 'Level two 3-2',
        children: [
          {
            value: '3-2-1',
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
];
const data = ref();

const filterMethod = (keyword: string) => {
  const loop = (data: TreeNodeData[]) => {
    const result: TreeNodeData[] = [];
    data.forEach((item) => {
      if (item.label!.toLowerCase().includes(keyword.toLowerCase())) {
        result.push({ ...item });
      } else if (item.children) {
        const childData = loop(item.children);
        if (childData.length) {
          result.push({
            ...item,
            children: childData,
          });
        }
      }
    });
    return result;
  };

  return new Promise((resolve) => {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      data.value = loop(sourceData);
      resolve();
    }, 500);
  });
};
</script>

```

## 自定义内容

自定义树节点的内容。

**Demo 示例**: `tree-select/slots`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree-select.html)

```vue
<template>
  <e-tree-select v-model="value" :data="data">
    <template #default="{ data: { label } }"> {{ label }}<span style="color: gray">(suffix)</span></template>
  </e-tree-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref();

const data = [
  {
    value: '1',
    label: 'Level one 1',
    children: [
      {
        value: '1-1',
        label: 'Level two 1-1',
        children: [
          {
            value: '1-1-1',
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: 'Level one 2',
    children: [
      {
        value: '2-1',
        label: 'Level two 2-1',
        children: [
          {
            value: '2-1-1',
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        value: '2-2',
        label: 'Level two 2-2',
        children: [
          {
            value: '2-2-1',
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    value: '3',
    label: 'Level one 3',
    children: [
      {
        value: '3-1',
        label: 'Level two 3-1',
        children: [
          {
            value: '3-1-1',
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        value: '3-2',
        label: 'Level two 3-2',
        children: [
          {
            value: '3-2-1',
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
];
</script>

```

## 延迟加载

延迟加载树节点，适用于大数据列表。

**Demo 示例**: `tree-select/lazy`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree-select.html)

```vue
<template>
  <EForm label-width="100px">
    <EFormItem label="懒加载">
      <e-tree-select v-model="value" :data="defaultTreeData" :load-more="loadMore" />
    </EFormItem>
    <EFormItem label="缓存数据">
      <e-tree-select v-model="value2" :data="defaultTreeData" :load-more="loadMore" :cache-data="cacheData" />
    </EFormItem>
  </EForm>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref();
const value2 = ref('node2-1');

const cacheData = [{ value: 'node2-1', label: 'lazy load node2-1' }];

const defaultTreeData = ref([
  {
    value: 'node1',
    label: 'node1',
    disabled: true,
    children: [
      {
        value: 'node2',
        label: 'node2',
      },
    ],
  },
  {
    value: 'node3',
    label: 'node3',
    children: [
      {
        value: 'node4',
        label: 'node4',
        isLeaf: true,
      },
      {
        value: 'node5',
        label: 'node5',
        isLeaf: true,
      },
    ],
  },
]);

const loadMore = (nodeData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      nodeData.children = Array.from({ length: (Math.random() * 10 + 2) >>> 0 })
        .fill(0)
        .map((_, i) => {
          const n = i + 1;
          return {
            label: `${nodeData.label}-${n}`,
            value: `${nodeData.value}-${n}`,
            isLeaf: Math.random() > 0.6,
          };
        });
      resolve('');
    }, 1000);
  });
};
</script>

```

## 显示完整路径

使用 `show-full-path` 属性显示完整路径。

**Demo 示例**: `tree-select/show-full-path`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/tree-select.html)

```vue
<template>
  <e-tree-select v-model="value1" :data="data" multiple show-full-path full-path-delimiter="/" style="width: 100%" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref();

const data = [
  {
    value: '1',
    label: 'Level one 1',
    children: [
      {
        value: '1-1',
        label: 'Level two 1-1',
        children: [
          {
            value: '1-1-1',
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: 'Level one 2',
    children: [
      {
        value: '2-1',
        label: 'Level two 2-1',
        children: [
          {
            value: '2-1-1',
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        value: '2-2',
        label: 'Level two 2-2',
        children: [
          {
            value: '2-2-1',
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    value: '3',
    label: 'Level one 3',
    children: [
      {
        value: '3-1',
        label: 'Level two 3-1',
        children: [
          {
            value: '3-1-1',
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        value: '3-2',
        label: 'Level two 3-2',
        children: [
          {
            value: '3-2-1',
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
];
</script>

```

## API

### Attributes

由于此组件结合了 `e-tree` 和 `e-select` 组件的功能，原有的属性没有更改，因此不会重复列出，
请前往原始组件查看文档。

| Attributes                              | Methods                       | Events                              | Slots                              |
| --------------------------------------- | ----------------------------- | ----------------------------------- | ---------------------------------- |
| [tree](http://192.168.219.170/docs/vue/latest/component/component/tree.html#attributes)            | [tree](http://192.168.219.170/docs/vue/latest/component/component/tree.html#method)      | [tree](http://192.168.219.170/docs/vue/latest/component/component/tree.html#events)            | [tree](http://192.168.219.170/docs/vue/latest/component/component/tree.html#slots)            |
| [select](http://192.168.219.170/docs/vue/latest/component/component/select.html#select-attributes) | [select](http://192.168.219.170/docs/vue/latest/component/component/select.html#methods) | [select](http://192.168.219.170/docs/vue/latest/component/component/select.html#select-events) | [select](http://192.168.219.170/docs/vue/latest/component/component/select.html#select-slots) |

#### Own Attributes

| Name      | Description                                                  | Type                     | Default |
| --------- | ------------------------------------------------------------ | ------------------------ | ------- |
| cacheData | 延迟节点的缓存数据，结构与数据相同，用于获取未加载数据的标签 | ^[object]`CacheOption[]` | []      |
| showFullPath | 是否显示完整路径 | `boolean` | false |
| fullPathDelimiter | 完整路径的分隔符 | `string` | '-' |

## Type Declarations

<details>
  <summary>展示类型定义</summary>

```ts
type CacheOption = {
  value: string | number | boolean | object;
  currentLabel: string | number;
  isDisabled: boolean;
};
```

</details>