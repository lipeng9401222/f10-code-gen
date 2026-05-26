---
title: EpPersonPicker 人员选择器
originUrl: http://192.168.219.170/docs/vue/latest/frame/components/eui-core/ep-person-picker/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/components/eui-core/ep-person-picker/)

此组件由 `@epframe/eui-core` 包提供。

`EpPersonPicker` 是一个用于选择人员的业务组件。它支持下拉搜索、无限滚动加载，并提供弹窗以供更复杂的人员挑选（“加载更多”）。

## 基础用法

通过 `v-model` 绑定选中的人员标识数组，并配置数据请求的 `url`。

```vue
<template>
  <ep-person-picker
    v-model="selectedIds"
    url="/api/getPersons"
    more-page-url="/pages/person-select"
  />
</template>

<script setup>
import { EpPersonPicker } from '@epframe/eui-core';
import { ref } from 'vue';

const selectedIds = ref([]);
</script>
```

## 属性 (Props)

| 属性名                   | 说明                                                 | 类型                            | 默认值                          |
| ------------------------ | ---------------------------------------------------- | ------------------------------- | ------------------------------- |
| `v-model` / `modelValue` | 绑定值，选中的人员标识数组                           | `string[]`                      | `[]`                            |
| `url`                    | 下拉列表中人员数据的请求接口地址                     | `string`                        | `''`                            |
| `morePageUrl`            | 点击“加载更多”时打开的弹窗页面地址                   | `string`                        | `''`                            |
| `pickerTitle`            | 下拉列表的标题                                       | `string`                        | `t('personPicker.pickerTitle')` |
| `placeholder`            | 输入框的占位提示文字                                 | `string`                        | `t('personPicker.placeholder')` |
| `effect`                 | 弹出层的亮暗主题                                     | `'light' \| 'dark' \| 'danger'` | `'light'`                       |
| `clearable`              | 是否显示清空按钮                                     | `boolean`                       | `true`                          |
| `cacheData`              | 缓存的人员数据，用于初始化时回显已选人员的头像和姓名 | `PersonType[]`                  | `undefined`                     |
| `collapseTags`           | 是否折叠标签                                         | `boolean`                       | `true`                          |
| `maxCollapseTags`        | 折叠标签时显示的最大标签数量                         | `number`                        | `3`                             |
| `showTagIcon`            | 标签中是否显示头像                                   | `boolean`                       | `true`                          |

## 类型定义 (Types)

组件内部依赖 `PersonType` 来渲染人员信息：

```typescript
type PersonType = {
  id: string;       // 人员唯一标识
  name: string;     // 人员姓名
  parentName?: string;  // 所属部门/组织名称
  icon?: string;  // 头像地址
};
```

## 弹窗交互规范 (Dialog Interaction)

当用户点击下拉层底部的“加载更多”时，组件会通过 `openDialog` 打开 `morePageUrl` 指定的页面。此过程涉及严格的传参和回传规范：

### 1. 传参 (Props to Dialog)
组件在打开弹窗时，会将当前已选中的人员标识数组和完整的人员缓存数据作为 `props` 传递给目标页面：
1. 前已选中的人员
   - **参数名**: `modelValue`
   - **类型**: `string[]`
   - **说明**: 目标页面可通过定义 `props: ['modelValue']` 来接收此参数，以便在弹窗内回显已选状态。
2. 人员缓存数据
   - **参数名**: `cacheData`
   - **类型**: `PersonType[]`
   - **说明**: 包含已选人员的完整信息（ID、姓名、头像），可用于弹窗内部的数据初始化或显示。

### 2. 回传数据 (Callback from Dialog)
当在弹窗内完成选择并关闭弹窗时，目标页面必须通过 `closeCallback` 回传一个 **JSON 字符串**。组件内部会解析此字符串以更新状态：
- **回传格式**: `JSON.stringify({ action: 'save', data: PersonType[] })`
- **字段说明**:
  - `action`: 必须为 `'save'`，组件才会执行更新逻辑。若为取消或关闭操作，可传其他值或不传。
  - `data`: 选中的人员完整数据数组，类型为 `PersonType[]`。组件将提取其中的 `id` 更新 `v-model`，并缓存人员信息用于标签展示。

**目标页面回传示例：**
```javascript
// 在弹窗页面中点击“确定”保存时
const handleSave = () => {
  const result = {
    action: 'save',
    data: [
      { id: '001', name: '张三', icon: '...' },
      { id: '002', name: '李四', icon: '...' }
    ]
  };
  // 假设使用框架提供的关闭弹窗方法，并将结果作为参数传回
  closeDialog(JSON.stringify(result));
};
```

## 交互说明

1. **标签展示**：选中的人员会以标签（Tag）的形式展示在输入框内，包含头像与姓名。
2. **下拉搜索**：点击输入框展开下拉层，支持输入关键字进行防抖搜索（300ms）。
3. **无限滚动**：下拉列表支持 `v-infinite-scroll`，滚动到底部时自动加载下一页数据。