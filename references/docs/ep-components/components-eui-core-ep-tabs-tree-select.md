---
title: TabsTreeSelect
originUrl: http://192.168.219.170/docs/vue/latest/frame/components/eui-core/ep-tabs-tree-select/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/components/eui-core/ep-tabs-tree-select/)

此组件由 `@epframe/eui-core` 包提供。

`TabsTreeSelect` 控件是参照 F9 中的 `mini.TabsTreeSelect` 控件开发的，用来选择人员或部门的控件。

## 基础使用

- 通过 `action` 属性指定接口数据加载地址。
- 通过 `selectTabs` 属性指定可选的 tab 标签配置。
- 通过 `v-model` 属性来绑定控件的值。

**Demo 示例**: `@epframe/eui-core/components/tabs-tree-select/base.vue`

```vue
<template>
  <ep-tabs-tree-select :select-tabs="tabs" v-model="value" v-model:text="text" action="https://fe.epoint.com.cn/mock/752/eui-vue/frameuserlistaction/getTreeModel" />
</template>

<script setup>
import { ref } from 'vue';
import { EpTabsTreeSelect } from '@epframe/eui-core';

const tabs = [
  {
    label: '本部门',
    name: 'ou'
  },
  {
    label: '所有部门',
    name: 'allou'
  }
];
const value = ref(['1e94567d-ece8-48fa-9931-1c3743fb3512']);
const text = ref(['www']);
</script>
```

## 控制节点勾选

- 通过属性 `beforeCheck` 可阻止节点的勾选

**Demo 示例**: `@epframe/eui-core/components/tabs-tree-select/before-check.vue`

```vue
<template>
  <ep-tabs-tree-select :select-tabs="tabs" v-model="value" v-model:text="text" action="https://fe.epoint.com.cn/mock/752/eui-vue/frameuserlistaction/getTreeModel" :before-check="beforeUserTreeCheck" />
</template>

<script setup>
import { ref } from 'vue';
import { EpTabsTreeSelect } from '@epframe/eui-core';

const tabs = [
  {
    label: '本部门',
    name: 'ou'
  },
  {
    label: '所有部门',
    name: 'allou'
  }
];
const value = ref([]);
const text = ref([]);

const beforeUserTreeCheck = (node) => {
  // 控制不勾选 dataType 为 'ou' 的节点
  return node.dataType !== 'ou';
};
</script>
```

## API

### 属性

| 属性名         | 说明                         | 类型                                                  | 默认值 |
| -------------- | ---------------------------- | ----------------------------------------------------- | ------ |
| v-model        | 绑定值                       | `string[]`                                            | —      |
| v-model:text   | 绑定文本                     | `string[]`                                            | —      |
| select-tabs    | 可选的 tab 标签              | `{ label: string; name: string; active?: boolean }[]` | []     |
| action         | 接口数据加载地址             | `string`                                              | -      |
| custom-params  | 接口提交时要携带的个性化数据 | `Object`                                              | —      |
| check-strictly | 是否取消父子节点关联         | `boolean`                                             | false  |
| before-check   | 勾选节点前的事件钩子         | `(node: Node, checked: boolean) => boolean`           | —      |

### 事件

| 名称       | 描述                   | 类型                                                                                                                                                                                                                             |
| ---------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tab-change | tab切换时触发          | ^[Function]`() => void`                                                                                                                                                                                                          |
| expand     | 展开/关闭树节点时触发  | ^[Function]`(expandKeys: Array<string \| number>, data: { expanded?: boolean; expandNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event; }) => void`                                                                           |
| check      | 点击树节点复选框时触发 | ^[Function]`(checkedKeys: Array<string \| number>, data: { checked?: boolean; checkedNodes: TreeNodeData[]; node?: TreeNodeData; e?: Event; halfCheckedKeys: (string \| number)[]; halfCheckedNodes: TreeNodeData[]; }) => void` |

### 方法

| 名称            | 描述               | 类型                                      |
| --------------- | ------------------ | ----------------------------------------- |
| getSelectedData | 获取已勾选的节点值 | `() => { text: string; value: string;}[]` |
| clearAll        | 清空已选值         | `() => void`                              |
| activeTab       | 激活 tab           | `(index： number) => void`                |