# 基础知识

> **路径说明**: 本文档中的路径为**相对路径**,基于 `vue-docs/` 目录

---

> **⚠️ 开发前必须按模板生成页面**
>
> **第一步：必读基础文件**
> | 功能 | 相对路径 |
> | ---- | --------------------------------------- |
> | 列表页 | `page-examples/base/list.vue` |
> | 左右布局 | `page-examples/base/side-tree-list.vue` |
> | 新增页 | `page-examples/base/add.vue` |
> | 编辑页 | `page-examples/base/edit.vue` |
> | 详情页 | `page-examples/base/detail.vue` |
>
> **第二步：查阅模板索引，匹配场景模板**
> | 索引文档 | 相对路径 |
> | ---- | --------------------------------------- |
> | 页面模板索引 | `page-examples/page-template-index.md` |
>
> **匹配规则（强制执行）**：
> 1. 根据需求描述中的"页面类型 + 布局/功能特征"，在索引中查找匹配模板
> 2. **匹配到** → 必须读取对应模板文件，按模板结构生成页面
> 3. **未匹配到** → 使用第一步的基础模板
>
> **匹配示例**：
> - 需求："表单页 + 侧边目录导航" → 必须用 `side-directory.vue`
> - 需求："列表页 + 树状表格" → 必须用 `tree-grid.vue`
> - 需求："表单页 + 子表单(表格行编辑)" → 必须用 `datagrid-edit.vue`
>
> **禁止**不读模板直接凭本文档描述写代码

---

> **⚠️ 遇到问题时优先查阅**
>
> 开发中遇到组件行为异常、布局问题等，请先查阅常见问题排查文档：
>
> | 文档 | 相对路径 |
> | ---- | --------------------------------------- |
> | 常见问题排查 | [troubleshooting.md](troubleshooting.md) |

---

## 概述

F10框架是基于 Vue 3 的前后端分离式开发框架，采用 Composition API 开发模式。

## 技术栈

**Vue 3** - 核心框架，使用 `<script setup>` 语法

**@epframe/eui-core** - 框架核心包，提供布局组件、工具方法、Hooks、路由、状态管理

- `Utils` - 工具方法集合（request请求、getConfig配置等）
- `Hooks` - 框架Hooks（useDataSource等）
- 布局组件：`e-container`, `e-header`, `e-main`, `e-toolbar` 等

**@epoint-fe/eui-components** - UI组件库，提供业务组件

- 基础组件：`e-button`, `e-input`, `e-select`, `e-dialog` 等
- 业务组件：`e-table` 表格组件

**@epoint-fe/eui-icons** - 图标库

## 知识库

开发F10页面主要依赖三个知识库：

**组件库**：

- `components/` 目录 - 基础 UI 组件的使用说明
- `ep-components/` 目录 - 企业级业务组件的使用说明

**框架API库**：

- `api/` 目录 - API 和工具类文档

**模板库**：

- `page-examples/base/list.vue` - 列表页模板
- `page-examples/base/side-tree-list.vue` - 左右布局模板
- `page-examples/base/add.vue` - 新增弹窗模板
- `page-examples/base/edit.vue` - 编辑弹窗模板
- `page-examples/base/detail.vue` - 详情弹窗模板

## 页面结构

F10页面使用 `ep-layout-manager` 布局管理器构建页面结构，支持五个区域插槽：

**基础示例（列表页）**：

```vue
<template>
  <ep-layout-manager class="fui-page">
    <template #top>
      <e-toolbar title-block>
        <template #title>
          <e-toolbar-title title="页面标题"></e-toolbar-title>
        </template>
        <template #button>
          <e-toolbar-btns :items="toolbarBtnList" />
        </template>
        <template #filter="{ opened }">
          <e-toolbar-search :search-list="searchList" :is-open="opened" />
        </template>
      </e-toolbar>
    </template>

    <template #main>
      <ep-data-grid :data="tableData" :columns="columns" />
    </template>
  </ep-layout-manager>
</template>
```

**左右布局示例**：

```vue
<template>
  <ep-layout-manager class="fui-page" :left-config="leftConfig">
    <template #left>
      <e-tree :data="treeData" />
    </template>

    <template #top>
      <e-toolbar title-block>
        <!-- 工具栏内容 -->
      </e-toolbar>
    </template>

    <template #main>
      <div class="flex-1 min-h-0">
        <ep-data-grid :data="tableData" :columns="columns" />
      </div>
    </template>
  </ep-layout-manager>
</template>

<script setup>
const leftConfig = {
  enabled: true,
  defaultWidth: '220px',
  minWidth: '180px',
  maxWidth: '360px',
  toggle: true,
  resize: true
};
</script>
```

### 区域插槽

| 插槽 | 说明 | 使用场景 |
|-----|------|---------|
| `#top` | 顶部区域 | 工具栏、标题栏（必需） |
| `#main` | 主内容区域 | 表格、表单（必需） |
| `#left` | 左侧区域 | 侧边导航树、分类筛选 |
| `#right` | 右侧区域 | 属性面板、辅助信息 |
| `#bottom` | 底部区域 | 状态栏、操作按钮区 |

### 区域配置

通过配置对象控制区域行为：

```javascript
const leftConfig = {
  enabled: true,      // 是否启用
  defaultWidth: '220px', // 默认宽度
  minWidth: '180px',  // 最小宽度
  maxWidth: '360px',  // 最大宽度
  toggle: true,       // 允许切换显示/隐藏
  resize: true,       // 允许拖动调整大小
  closed: false       // 默认是否收起
};
```

### 工具栏结构

工具栏使用 `e-toolbar` 组件，配合 `title-block` 属性实现标题独占一行：

```vue
<e-toolbar title-block>
  <template #title>
    <e-toolbar-title title="页面标题"></e-toolbar-title>
  </template>
  <template #button>
    <e-toolbar-btns :items="toolbarBtnList" configurable />
  </template>
  <template #actions>
    <e-toolbar-more :table-ref="tableRef" />
  </template>
  <template #filter="{ opened }">
    <e-toolbar-search :search-list="searchList" :is-open="opened" />
  </template>
</e-toolbar>
```

**弹窗组件** - 使用 `$dialog` API 调用独立 `.vue` 文件

## 数据请求

### defineDataModel 数据模型

使用 `Utils.defineDataModel()` 统一定义页面数据模型，内部使用以下三个模型 Hook：

> **详情文档**：[api-hooks-data-fetch-hooks.md](api/api-hooks-data-fetch-hooks.md)
>
> **⚠️ 重要提醒：请求方法**
>
> - 三种数据模型（useTreeModel、useTableModel、useListModel）**统一使用 POST 请求**
> - **禁止**在 Mock 配置中为这些模型接口配置 `method: 'get'`
> - Mock 文件中的接口方法必须与模型的实际请求方法保持一致

#### useTreeModel - 树形数据模型

**适用场景**：左侧分类树、树形选择等

```javascript
const { useTreeModel, useTableModel, useListModel } = Hooks;

const model = Utils.defineDataModel(() => {
  const typeTree = useTreeModel('/api/typeTree', { lazy: false });
  return { models: { typeTree } };
});
```

**模板绑定**：

```vue
<e-tree
    v-model:selected-keys="selectedKeys"
    :data="model.typeTree.data"
    @select="handleSelect"
    :field-names="{
        value: 'value',
        label: 'label',
        children: 'children',
        icon: 'customIcon'
    }" />
```

> **树数据字段**：useTreeModel 期望的树节点字段为 `value` 和 `label`，children 为子节点数组。
>
> **Mock 数据格式**：`[{ "value": "xxx", "label": "显示文本", "children": [...] }]`
>
> **常见错误**：不要使用 `id/text` 或 `id/name`，否则树文本不会显示。

#### useTableModel - 表格数据模型

```javascript
const gridList = useTableModel('/api/list', {
  idField: 'id', lazy: false,
  params: computed(() => ({ ...searchParams.data }))
});
```

**模板绑定**：

```vue
<ep-data-grid
    :data="model.gridList.data"
    :total="model.gridList.total"
    :current="model.gridList.current"
    :page-size="model.gridList.pageSize"
    :loading="model.gridList.loading"
    @change="model.gridList.change"
    @refresh="model.gridList.refresh" />
```

**搜索场景**：

```javascript
// 搜索时通过 params 响应式传递搜索条件
const gridList = useTableModel('/api/list', {
  idField: 'id',
  params: computed(() => ({
    ...searchParams.data,
    category: selectedCategory.value !== 'all' ? selectedCategory.value : undefined
  }))
});
```

> **Mock 返回格式**：`{ data: [...], total: number }`

#### useListModel - 列表数据模型

```javascript
const typeOptions = useListModel('/api/typeOptions', {
  labelField: 'label', lazy: false
});
```

**模板绑定**：

```vue
<ep-select v-model="formData.type" :options="model.typeOptions.data" placeholder="请选择" />
```

> **Mock 返回格式**：`{ data: [{ label: 'xxx', value: 'xxx' }] }`

### 使用 Utils.requestAxios

**适用场景**：增删改等非数据源操作（如提交表单、删除数据）

**禁止场景**：表格、下拉框、树的数据加载（必须用 defineDataModel 中的模型 Hook）

**基本用法**：

F10框架使用 `Utils.requestAxios` 发送请求（封装自axios）：

```javascript
import { Utils } from '@epframe/eui-core';

// GET请求
const res = Utils.requestAxios({
    url: '/api/demo/info',
    method: 'GET'
});

// POST请求（常用）
const res = Utils.requestAxios({
    url: '/api/demo/add',
    method: 'POST',
    data: { params: { ...formData } }
});
```

**请求数据格式**：

```javascript
// 请求体格式
{
    params: {
        // 业务参数
        ...formData
    }
}

// 响应格式
{
    message: '',   // 消息
    state: true    // 状态
}
```

### ⚠️ 强制规范

> **表格、下拉框、树组件必须使用 defineDataModel 中的模型 Hook，禁止直接用 `Utils.requestAxios`**

**错误示例**：

```javascript
// ❌ 表格/下拉框/树 直接用 requestAxios（禁止）
const tableData = ref([]);
const loadData = async () => {
    const res = await Utils.requestAxios({ url: '/api/list' });
    tableData.value = res.data;
};
```

**正确做法**：

```javascript
// ✅ 表格用 useTableModel
const gridList = useTableModel('/api/list', { idField: 'id' });

// ✅ 下拉框/列表用 useListModel
const typeOptions = useListModel('/api/typeOptions', { labelField: 'label' });

// ✅ 树用 useTreeModel
const typeTree = useTreeModel('/api/tree', { lazy: false });
```

## 常用组件查阅清单

> **⚠️ 使用任何组件前，必须先查阅该组件的详细文档**
>
> frontpage.md 只展示部分组件示例，无法覆盖全部组件用法。
> **禁止**凭经验或记忆直接使用组件，必须先查阅确认 API。

| 组件 | 参考文档 |
|------|-------------|
| **选项卡 e-tabs** | [components-tabs.md](components/components-tabs.md) |
| **弹窗 e-dialog** | [components-dialog.md](components/components-dialog.md) |
| **下拉选择 e-select** | [components-select.md](components/components-select.md) |
| **日期选择 e-datepicker** | [components-datepicker.md](components/components-datepicker.md) |
| **上传 e-upload** | [components-upload.md](components/components-upload.md) |
| **标签 e-tag** | [components-tag.md](components/components-tag.md) |
| **图标 e-icon** | [components-icon.md](components/components-icon.md) |
| **树形控件 e-tree** | [components-tree.md](components/components-tree.md) |
| **消息提示 EMessage** | [components-message.md](components/components-message.md) |
| **确认框 EMessageBox** | [components-message-box.md](components/components-message-box.md) |
| **按钮 e-button** | [components-button.md](components/components-button.md) |
| **输入框 e-input** | [components-input.md](components/components-input.md) |
| **其他组件** | 浏览 `components/` 目录 |

---

## 核心组件

### 表格组件 ep-data-grid

```vue
<ep-data-grid
  ref="tableRef"
  id-field="id"
  :data="tableData"
  :total="total"
  :current="current"
  :page-size="pageSize"
  :columns="columnList"
  :loading="loading"
  v-model:selectedRowKeys="selectedRowKeys"
  :show-index-column="true"
  :show-selection-column="true"
  :default-show-index="true"
  @change="onTableChange"
  @refresh="refresh"
  configurable
  config-id="datagrid"
>
  <template #bodyCell="{ column, text, record }">
    <!-- 自定义单元格内容 -->
  </template>
</ep-data-grid>
```

**columns 配置**：

```javascript
const columnList = ref([
  { title: '编号', dataIndex: 'sectionCode', width: 180, ellipsis: true, sorter: true },
  { title: '名称', dataIndex: 'procurementName', ellipsis: true, sorter: true },
  {
    dataIndex: 'action',
    title: '操作',
    width: 180,
    key: 'action',
    action: {
      asText: true,
      defaultShowItems: 4,
      items: [
        { label: '详情', onClick: (row) => openDetailDialog(row.id) },
        { label: '编辑', onClick: (row) => openEditDialog(row.id) },
        { label: '删除', onClick: (row) => handleDelete(row) }
      ]
    }
  }
]);
```

**常用属性**：

| 属性 | 说明 | 类型 |
|-----|------|-----|
| `id-field` | 行唯一标识字段 | `string` |
| `data` | 表格数据 | `array` |
| `total` | 总记录数 | `number` |
| `current` | 当前页 | `number` |
| `page-size` | 每页条数 | `number` |
| `columns` | 列配置 | `array` |
| `loading` | 加载状态 | `boolean` |
| `selectedRowKeys` | 选中行 key | `array` |
| `show-index-column` | 显示序号列 | `boolean` |
| `show-selection-column` | 显示选择列 | `boolean` |
| `configurable` | 可配置 | `boolean` |
| `config-id` | 配置标识 | `string` |

### 表单组件 ep-form

```vue
<ep-form ref="formRef" :model="formData" :rules="rules" label-position="top">
  <ep-form-item label="名称" prop="name">
    <ep-input v-model="formData.name" placeholder="请输入" maxlength="50" show-word-limit />
  </ep-form-item>
  <ep-form-item label="分类" prop="classification">
    <ep-select v-model="formData.classification" :options="classificationOptions" placeholder="请选择" />
  </ep-form-item>
  <ep-form-item label="截止时间" prop="deadline">
    <ep-date-picker v-model="formData.deadline" type="datetime" placeholder="请选择" />
  </ep-form-item>
</ep-form>
```

**常用属性**：

| 属性 | 说明 |
|-----|------|
| `label-position="top"` | 标签在上方（推荐） |
| `maxlength` | 最大输入长度 |
| `show-word-limit` | 显示字数统计 |

**下拉框数据源绑定**：

```javascript
// 使用 useListModel 获取下拉选项（在 defineDataModel 内）
const typeOptions = useListModel('/api/typeOptions', { labelField: 'label' });

// 直接绑定到 ep-select
<ep-select v-model="formData.classification" :options="typeOptions" />
```

**表单验证**：

```javascript
import { Hooks } from '@epframe/eui-core';

const { validate } = Hooks.useValidation();

const rules = {
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' },
    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
  ],
  classification: [{ required: true, message: '请选择分类', trigger: 'change' }]
};

// 验证
const isValid = await validate(formRef);

// 重置
formRef.value?.resetFields();
```

### 弹窗组件

**⚠️ 弹窗使用强制约束（必须遵守）**：

| 场景 | 强制使用方式 | 说明 |
|-----|-------------|------|
| 表单弹窗（新增/编辑） | `$dialog` API + 独立.vue | ✅ 必须使用 |
| 详情弹窗 | `$dialog` API + 独立.vue | ✅ 必须使用 |
| 数据明细查看弹窗 | `$dialog` API + 独立.vue | ✅ 必须使用 |
| 确认操作（删除确认） | `EMessageBox.confirm()` | ✅ 必须使用 |
| 简单提示（成功/失败） | `EMessage()` | ✅ 必须使用 |
| **内联 `<e-dialog>`** | **禁止使用** | ❌ 所有业务弹窗必须通过 `$dialog` API 调用独立.vue文件 |

**禁止事项**：
- ❌ 在模板中直接声明 `<e-dialog>` 组件
- ❌ 使用 `v-model:visible` 或 `v-model:open` 控制弹窗显示
- ❌ 在主页面中导入并声明弹窗组件（如 `<DetailDialog v-model:visible="..." />`）

**详细规范与使用方法**：[dialog-interaction.md](dialog-interaction.md)

**弹窗页面布局结构**：

弹窗页面内部**必须**使用标准布局结构（`ep-layout-manager`），详见 [dialog-interaction.md](dialog-interaction.md) 第4节。

**⚠️ 开发弹窗页面前，必须读取模板文件**：

| 模板类型 | 相对路径 |
|---------|-------------|
| 新增弹窗 | `page-examples/base/add.vue` |
| 编辑弹窗 | `page-examples/base/edit.vue` |
| 详情弹窗 | `page-examples/base/detail.vue` |

**禁止凭片段示例直接写弹窗布局**

### 按钮组件 e-button

```vue
<e-button type="primary" @click="handleAdd">
  <e-icon class="mr-s">
    <Add/>
  </e-icon>
  新增
</e-button>
<e-button type="danger" plain :disabled="selectedRowKeys.length === 0">
  批量删除
</e-button>
```

### 工具栏 e-toolbar

使用 `title-block` 属性实现标题独占一行：

```vue
<e-toolbar title-block>
  <template #title>
    <e-toolbar-title title="页面标题"></e-toolbar-title>
  </template>
  <template #button>
    <e-toolbar-btns :items="toolbarBtnList" configurable max-display-count="4" />
  </template>
  <template #actions>
    <e-toolbar-more :table-ref="tableRef" />
  </template>
  <template #filter="{ opened }">
    <e-toolbar-search
      :search-list="searchList"
      :is-open="opened"
      @advance-search="onAdvanceSearch"
      configurable
    />
  </template>
</e-toolbar>
```

**工具栏按钮配置**：

```javascript
const toolbarBtnList = ref([
  {
    type: 'primary',
    onClick: () => openAddDialog('新增'),
    content: '新增'
  },
  {
    type: 'danger',
    onClick: () => handleBatchDelete(),
    disabled: () => !isSelected.value,
    content: '批量删除'
  }
]);
```

### 搜索交互

**e-toolbar-search 配置**：

```javascript
const operationsList = ref([
  { label: '等于', type: 'input', value: 'EQ' },
  { label: '不等于', type: 'input', value: 'NQ' },
  { label: '等于空', type: 'none', value: 'EQBLANK' },
  { label: '不等于空', type: 'none', value: 'NQBLANK' },
  { label: '模糊匹配', type: 'input', value: 'LIKE' },
  { label: '模糊匹配（排除）', type: 'input', value: 'NOTLIKE' },
  { label: '以...开头', type: 'input', value: 'LEFTLIKE' },
  { label: '以...结尾', type: 'input', value: 'RIGHTLIKE' },
  { label: '包含', type: 'multiSelect', value: 'IN' },
  { label: '不包含', type: 'multiSelect', value: 'NOTIN' }
]);

const searchList = computed(() => [
  {
    label: '全部',
    field: 'searchField',
    fieldType: 'string',
    type: 'mixSearch',
    default: true,
    operation: 'LIKE',
    operations: operationsList.value,
    data: [
      { label: '编号', value: 'code' },
      { label: '名称', value: 'name' }
    ]
  },
  {
    label: '编号',
    field: 'code',
    default: true,
    type: 'input',
    operation: 'LIKE',
    operations: operationsList.value
  }
]);

// 高级搜索回调
const onAdvanceSearch = (params) => {
  const conditions = params?.conditions || [];
  searchParams.value = Object.fromEntries(conditions.map((item) => [item.path, item.value]));
};
```

### 树形控件 e-tree

**基础用法**：

```vue
<e-tree
    v-model:selected-keys="selectedKeys"
    :data="treeData"
    @select="handleSelect"
    :field-names="{
        value: 'value',
        label: 'label',
        children: 'children',
        icon: 'customIcon'
    }" />
```

## 页面交互

### 按钮组件 e-button

**e-toolbar-search 配置**：

```javascript
const operations = ref([
    {
        label: '等于',
        type: 'input',
        value: 'EQ'
    },
    {
        label: '不等于',
        type: 'input',
        value: 'NQ'
    },
    {
        label: '等于空',
        type: 'none',
        value: 'EQBLANK'
    },
    {
        label: '不等于空',
        type: 'none',
        value: 'NQBLANK'
    },
    {
        label: '模糊匹配',
        type: 'input',
        value: 'LIKE'
    },
    {
        label: '模糊匹配（排除）',
        type: 'input',
        value: 'NOTLIKE'
    },
    {
        label: '以...开头',
        type: 'input',
        value: 'LEFTLIKE'
    },
    {
        label: '以...结尾',
        type: 'input',
        value: 'RIGHTLIKE'
    },
    {
        label: '包含',
        type: 'multiSelect',
        value: 'IN'
    },
    {
        label: '不包含',
        type: 'multiSelect',
        value: 'NOTIN'
    }
]);

const searchList = ref([
    {
        label: '全部',
        field: 'searchField',
        type: 'mixSearch',
        default: true,
        operation: 'LIKE',
        operations: operations.value,
        data: [
            { label: '编号', value: 'code' },
            { label: '名称', value: 'name' }
        ]
    },
    {
        label: '编号',
        field: 'code',
        type: 'input',
        default: true,
        operation: 'LIKE',
        operations: operations.value
    }
]);

// 高级搜索
const handleAdvanceSearch = (params) => {
    const conditions = params?.conditions || [];
    Object.assign(searchParams, Object.fromEntries(conditions.map((item) => [item.path, item.value])));
    pagination.current = 1;
    loadData();
};
```

### 确认框 EMessageBox

```javascript
import { EMessageBox } from '@epoint-fe/eui-components';

EMessageBox.confirm('确认删除选中的数据吗？', '删除确认', {
    confirmButtonText: '确认删除',
    cancelButtonText: '取消',
    type: 'warning'
}).then(() => {
    // 认后执行删除
});
```

### 消息提示 EMessage

```javascript
import { EMessage } from '@epoint-fe/eui-components';

EMessage({ message: '操作成功', type: 'success' });
EMessage({ message: '操作失败', type: 'error' });
EMessage({ message: '请先选择数据', type: 'warning' });
```

### 框架核心 @epframe/eui-core

```javascript
import { Utils, EpDataGrid } from '@epframe/eui-core';
```

### UI组件 @epoint-fe/eui-components

```javascript
import { EMessage, EMessageBox } from '@epoint-fe/eui-components';
// 或按需导入
import EButton from '@epoint-fe/eui-components/es/button';
import EForm from '@epoint-fe/eui-components/es/form';
```

### 图标 @epoint-fe/eui-icons

> **⚠️ 使用图标前必须先查阅文档**：[components-icon.md](components/components-icon.md)
>
> 该文档包含可用图标示例，常见图标有：Add, Delete, Edit, Search, Refresh, Setting, Upload, Download, View, Hide, Close,
> Check, Loading 等
>
> **禁止**不读文档直接使用图标

```javascript
import { Add, Delete, Edit } from '@epoint-fe/eui-icons';
```

## Mock 数据开发

> **⚠️ 开发前必读**：[mock-development.md](mock-development.md)
>
> **配置检查清单**：
>
> | 工程类型 | 依赖安装                                                    | package.json exports | vite.config.js            |
> | -------- | ----------------------------------------------------------- | -------------------- | ------------------------- |
> | 业务包   | 无需安装                                                    | 必须导出 `"./mock"`  | 无需配置                  |
> | 宿主工程 | `@epframe/mock-server` + `@epframe/vite-plugin-mock-server` | 无需配置             | 必须配置 mockServerPlugin |
>
> **禁止**不读规范直接凭本文档描述做配置或编写 Mock 代码

### 三种响应模式

**1. body 模式** - 固定数据或 Mock.js 模板

```ts
import { defineMock } from '@epframe/mock-server';

export default defineMock([
    {
        url: '/user/profile',
        method: 'get',
        body: {
            id: '@guid',
            name: '@cname',
            mobile: /^1[3-9]\d{9}$/,
            createdAt: '@datetime'
        }
    }
]);
```

**2. response 模式** - 根据请求参数动态返回

```ts
{
	url: '/datasource/add',
	method: 'post',
	response({ body }) {
		const formData = body.params || {};
        return {state: true, message: '创建成功'};
	}
}
```

**3. handler 模式** - 完全控制响应（文件流、自定义Header等）

```ts
{
	url: '/report/export',
	method: 'get',
	handler(_req, res) {
		res.setHeader('Content-Type', 'text/csv; charset=utf-8');
		res.status(200).send('id,name\n1,测试');
	}
}
```

### 数据生成

**Mock.js 模板语法**：

```ts
{
	id: '@guid',                    // GUID
	name: '@cname',                 // 中文姓名
	title: '@ctitle(5, 10)',        // 中文标题
	mobile: /^1[3-9]\d{9}$/,        // 正则生成手机号
	'age|18-60': 1,                 // 18-60随机整数
	'status|1': ['draft', 'published'], // 随机枚举
	'records|5-10': [{ id: '@guid' }]   // 5-10条记录
}
```

**Faker 生成**（适合复杂逻辑）：

```ts
import { faker } from '@epframe/mock-server';

const user = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email()
};
```

### 状态管理 useStore

跨请求共享状态，支持 CRUD 操作：

```ts
import { defineMock, useStore } from '@epframe/mock-server';

const store = useStore('user-demo', {
    records: [{ id: '1', name: 'Alice' }]
});

export default defineMock([
    {
        url: '/api/user/list',
        method: 'post',
        response({ body }) {
            const { pageIndex = 0, pageSize = 10 } = body.params || {};
            let records = store.get('records');
            const start = pageIndex * pageSize;
            const end = start + parseInt(pageSize);
            const list = records.slice(start, end);
            return { data: list, total: records.length };
        }
    },
    {
        url: '/api/user/create',
        method: 'post',
        response({ body }) {
            const records = store.get('records');
            records.push({ id: faker.string.uuid(), ...body });
            store.set('records', records);
            return { state: true, message: '创建成功' };
        }
    }
]);
```

### mock/index.ts 导出示例

```ts
export { default as datasourceMock } from './user.mock';

export const mockMenu = [{ name: '数据源管理', url: 'datasource/list.vue', path: 'datasource/list' }];

export const mockConfig = {
    basePriority: 10
};
```

### e-toolbar-search 必需接口

> **⚠️ 重要**：页面中使用 `e-toolbar-search` 组件时，需要添加以下两个配置接口，否则控制台会报 404 错误。

```ts
import { defineMock } from '@epframe/mock-server';

export default defineMock([
    // 获取搜索配置
    {
        url: '/api/user-preference/getSearchData',
        method: 'get',
        response() {
            return { data: [] };
        }
    },
    // 获取常用标签
    {
        url: '/api/user-preference/getCommonTag',
        method: 'get',
        response() {
            return { data: [] };
        }
    }
]);
```

**说明**：

- `/api/user-preference/getSearchData` - 用于保存和恢复用户的搜索配置
- `/api/user-preference/getCommonTag` - 用于获取用户的常用搜索标签
- 这两个接口返回 `{ data: [] }` 即可满足基本需求，不影响搜索功能的使用

### ⚠️ Mock 模式强制约束

> **⚠️ 禁止**：在组件中直接定义静态数据，所有数据必须来源于 Mock 接口

**禁止事项**：

| 禁止做法                                                      | 正确做法                                                                    |
| ------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `const typeOptions = ref([{label: 'MySQL', value: 'mysql'}])` | 在 defineDataModel 中使用 `useListModel('/api/typeOptions')`                |
| `const treeData = ref([{value: 'all', label: '所有类型'}])`   | 在 defineDataModel 中使用 `useTreeModel('/api/typeTree')`                   |
| 表格 `data` 属性绑定静态数组                                  | 在 defineDataModel 中使用 `useTableModel('/api/list')` 的 `dataSource`      |

**约束原因**：

1. **数据一致性**：静态数据与 Mock 接口数据结构可能不一致，导致运行时错误
2. **维护成本**：静态数据分散在各组件中，修改需要多处同步
3. **真实模拟**：Mock 模式的目的是模拟真实接口行为，静态数据无法体现接口调用逻辑

**错误示例**：

```javascript
// ❌ 禁止：组件数据静态定义
const statusOptions = ref([
    { label: '在线', value: 'online' },
    { label: '离线', value: 'offline' }
]);
```

**正确做法**：

```javascript
// ✅ 正确：在 defineDataModel 中使用模型 Hook 从 Mock 接口获取
const { useListModel } = Hooks;

const model = Utils.defineDataModel(() => {
  const statusOptions = useListModel('/api/statusOptions', { labelField: 'label' });
  return { models: { statusOptions } };
});
```

**defineDataModel 模型 Hook 的 Mock 返回格式**:

| 模型              | Mock 返回格式                                |
| ----------------- | -------------------------------------------- |
| useTreeModel      | `{ data: [{ value, label, children }] }`     |
| useTableModel     | `{ data: [...], total: number }`             |
| useListModel      | `{ data: [{ label, value }] }`               |

**错误示例**：

```javascript
{
    url: '/api/statusOptions',
    method: 'post',
    response() {
        return [];
    }
}
```

**正确做法**：

```javascript
{
    url: '/api/statusOptions',
    method: 'post',
    response() {
        return {
            data:[]
        };
    }
}
```

## 左右布局注意事项

> **⚠️ 重要**：在左右布局（side-tree-list）中，右侧表格容器必须使用 `flex-1 min-h-0` 确保表格正确填充和滚动。

**原因**：`ep-layout-manager` 的 `#main` 插槽使用 flex 布局，如果表格容器没有设置 `flex-1 min-h-0`，表格可能无法正确占满剩余空间或出现滚动异常。

```vue
<template #main>
  <div class="flex-1 min-h-0">
    <ep-data-grid :data="tableData" :columns="columns" />
  </div>
</template>
```

## 样式开发规范

> **⚠️ 开发前必读**：[style-development.md](style-development.md)

### 开发优先级（必须遵守）

1. **组件属性**（首选）→ 2. **辅助样式类**（次选）→ 3. **自定义 CSS**（兜底）

### 禁止事项

| 禁止做法                        | 正确做法                    |
| ------------------------------- | --------------------------- |
| `<e-button class="bg-primary">` | `<e-button type="primary">` |
| `<e-button class="disabled">`   | `<e-button disabled>`       |
| `<e-tag class="bg-success">`    | `<e-tag type="success">`    |
| 手写 `margin: 10px;`            | `class="m-xs"`              |
| 手写 `padding: 16px;`           | `class="p-l"`               |
| 手写 `display: flex;`           | `class="flex items-center"` |
| 硬编码 `color: #303133;`        | `class="text-primary"`      |
| 硬编码 `border-radius: 4px;`    | `class="rounded-mini"`      |

## 页面类型差异对比

> **⚠️ 新增/编辑/详情弹窗的布局结构必须一致**
>
> 三种弹窗页使用相同的模板结构，区别仅在于：
> - 新增：空表单 + 提交逻辑
> - 编辑：加载详情数据 + 更新逻辑
> - 详情：只读展示 + 仅关闭按钮

| 对比项     | 列表页                                              | 新增弹窗                                   | 编辑弹窗                                   | 详情弹窗       |
| ---------- | --------------------------------------------------- | ------------------------------------------ | ------------------------------------------ | -------------- |
| **外层容器**   | `ep-layout-manager class="fui-page"`                | `ep-layout-manager class="h-full"`         | 同新增                                     | 同新增         |
| **滚动容器**   | 无（表格自带滚动）                                    | `e-scrollbar class="flex-1"`               | 同新增                                     | 同新增         |
| **按钮位置**   | `#top` 内 e-toolbar                                 | `#bottom` 插槽                             | `#bottom` 插槽                             | `#bottom` 插槽 |
| 核心控件   | e-table / ep-data-grid                              | e-form                                     | e-form                                     | e-descriptions |
| 操作按钮   | 新增/编辑/删除                                      | 保存/取消                                  | 保存/取消                                  | 仅关闭         |
| 获取参数   | 无                                                  | 无需获取                                   | id                                         | id             |
| 数据加载   | defineDataModel 模型 Hook / Utils.requestAxios      | 空表单                                     | 加载详情                                   | 加载详情       |
| 提交数据   | 无                                                  | 保存新增                                   | 保存更新                                   | 无             |
| 表单验证   | 无                                                  | validate()                                 | validate()                                 | 无             |

## 常见错误示例

### 冗余实现表格列的文本省略和tooltip

```vue
<!-- ❌ 错误：手动添加 tooltip 和省略样式 -->
<template #bodyCell="{ column, record }">
    <template v-if="column.dataIndex === 'connectionString'">
        <e-tooltip :content="record.connectionString">
            <span class="ellipsis">{{ record.connectionString }}</span>
        </e-tooltip>
    </template>
</template>
```

```javascript
// ✅ 正确：使用列配置的 ellipsis 属性，组件会自动处理
const columns = [{ dataIndex: 'connectionString', title: '连接字符串', ellipsis: true }];
```

### 样式类覆盖组件属性

```vue
<!-- ❌ 错误 -->
<e-button class="bg-primary">提交</e-button>

<!-- ✅ 正确 -->
<e-button type="primary">提交</e-button>
```

### 过度使用自定义 CSS

```vue
<!-- ❌ 错误 -->
<style scoped>
.custom-box { padding: 16px; display: flex; }
</style>

<!-- ✅ 正确 -->
<div class="p-l flex">...</div>
```

---

## 开发流程

### ⚠️ 高优先级规则（必须遵守）

1. **框架 API 开发指南 / UI 组件**：必须从知识库文档中读取使用方式和默认行为，禁止凭经验猜测
    - 参考：[api-development.md](api-development.md) 、浏览 `components/` 目录
2. **标准布局组件**：优先使用标准布局组件，个性化布局只允许少量存在，**禁止随意创建不存在的布局和组件**
    - 参考：[layout-standards.md](layout-standards.md)
3. **样式开发**：优先使用组件属性与辅助类，个性化布局允许少量自定义css。
    - 参考：[style-development.md](style-development.md)
4. **类名 / 方法验证**：使用任何辅助类名、组件、API 方法 前，必须确认其在知识库或模板中存在
    - ❌ 禁止凭经验构造"看起来合理"的组件（如 e-input-password）
    - ❌ 禁止假设"应该有这个方法"就直接使用
    - ✅ 使用前说明来源：来自某文档或某模板示例

---

### Checklist

- [ ]   0. 确认数据模式（真实接口 / Mock）
- [ ]   1. **查阅常见问题排查**（遇到布局/组件异常时必看 troubleshooting.md）
- [ ]   2. 参考对应模板页面
- [ ]   3. 修改页面标题
- [ ]   4. 修改接口地址
- [ ]   5. 配置表格列（列表页）
- [ ]   6. 配置表单字段（弹窗页）
- [ ]   7. 配置验证规则
- [ ]   8. 配置搜索区（列表页）
- [ ]   9. 编写业务函数
- [ ]   10. 绑定选中事件（列表页）
- [ ]   11. **对照规范审查代码**
- [ ]   12. **组件导入检查**：确认 `.vue` 文件中使用的框架组件（如 ep-data-grid）已正确从 `@epframe/eui-core` 导入

## 代码审查要点

### 参考文档

| 审查项            | 参考文档                                                   |
| ----------------- | ---------------------------------------------------------- |
| 框架 API 开发指南 | [api-development.md](api-development.md)                   |
| 组件速查          | [components-reference.md](components-reference.md)         |
| 布局规范          | [layout-standards.md](layout-standards.md)                 |
| 数据绑定          | [data-binding.md](data-binding.md)                         |
| 列表开发          | [list-development.md](list-development.md)                 |
| 表单开发          | [form-development.md](form-development.md)                 |
| 弹窗交互          | [dialog-interaction.md](dialog-interaction.md)             |
| 性能优化          | [performance-optimization.md](performance-optimization.md) |
| 样式开发          | [style-development.md](style-development.md)               |
| Mock开发          | [mock-development.md](mock-development.md)                 |
| 常见问题排查      | [troubleshooting.md](troubleshooting.md)                   |