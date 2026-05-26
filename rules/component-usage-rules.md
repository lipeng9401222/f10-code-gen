# component-usage-rules · ep-* 与 e-* 边界 + $dialog 强制

> 来源：`vue-docs/frontpage.md` § 弹窗组件强制约束 + `vue-docs/dialog-interaction.md` + `vue-docs/components-reference.md`。
> **每条带 ✓ 检验句**。

---

## R1 · 三种前缀的边界

F10 框架组件按前缀分三类：

| 前缀 | 来源 | 用途 | 例子 |
| --- | --- | --- | --- |
| `ep-` | `@epframe/eui-core` | 框架级**复杂业务组件** | `ep-data-grid` / `ep-layout-manager` / `ep-form` / `ep-form-item` / `ep-input` / `ep-select` / `ep-date-picker` |
| `e-` | `@epoint-fe/eui-components` | UI 基础组件 | `e-button` / `e-tag` / `e-tabs` / `e-tree` / `e-dropdown` / `e-toolbar` / `e-icon` / `e-scrollbar` / `e-message` |
| 全大写函数 | `@epoint-fe/eui-components` | 命令式 API | `EMessage` / `EMessageBox` / `ENotification` |

**禁止**：
- ❌ 用 Element Plus 的 `el-` 前缀（不存在该框架）
- ❌ 自己写 `<input>` / `<button>` 原生标签（用 e-input / e-button）

✓ 检验句：你模板里的所有标签前缀都属于上面 3 类才算过。

---

## R2 · 页面骨架**必须**用 `ep-layout-manager`

来源：`vue-docs/frontpage.md` § 页面结构。

```vue
<template>
  <ep-layout-manager class="fui-page" :left-config="leftConfig">
    <template #left>...</template>     <!-- 左侧：导航树 / 分类筛选 -->
    <template #top>...</template>      <!-- 顶部：工具栏 / 标题（必需） -->
    <template #main>...</template>     <!-- 主内容：表格 / 表单（必需） -->
    <template #right>...</template>    <!-- 右侧：属性面板 -->
    <template #bottom>...</template>   <!-- 底部：状态栏 / 按钮区 -->
  </ep-layout-manager>
</template>
```

**禁止**：
- ❌ 自己写 `<div class="page-container">` 嵌 flex 模拟分区
- ❌ 用其他布局库（Element / Antd / Vant）的 Layout 组件

✓ 检验句：你的页面**最外层**是 `<ep-layout-manager>` 才算过。

---

## R3 · 工具栏**必须**用 `e-toolbar` + 五段插槽

```vue
<e-toolbar title-block>
  <template #title>
    <e-toolbar-title title="页面标题" />
  </template>
  <template #button>
    <e-toolbar-btns :items="toolbarBtnList" configurable max-display-count="4" />
  </template>
  <template #actions>
    <e-toolbar-more :table-ref="tableRef" :model="model" help-url="..." />
  </template>
  <template #filter="{ opened }">
    <e-toolbar-search :search-list="searchList" :is-open="opened" @advance-search="onAdvanceSearch" configurable />
  </template>
</e-toolbar>
```

| 插槽 | 放什么 |
| --- | --- |
| `#title` | `e-toolbar-title` 标题块 |
| `#button` | `e-toolbar-btns` 按钮组（item 化配置） |
| `#actions` | `e-toolbar-more` 配置 / 帮助 / 刷新（接收 `table-ref` + `help-url`） |
| `#filter` | `e-toolbar-search` 搜索块（必须传 `is-open`） |

✓ 检验句：你的工具栏**没有**手写按钮 div（必须 `e-toolbar-btns`），且高级搜索回调 `@advance-search` 已绑定才算过。

---

## R4 · 弹窗**必须**用 `$dialog` API（业务弹窗）

来源：`vue-docs/dialog-interaction.md` § 2 强制约束。

| 场景 | 必须 | 禁止 |
| --- | --- | --- |
| 表单弹窗（新增 / 编辑） | `$dialog` API + 独立 .vue | ❌ 模板里写 `<e-dialog v-model:visible>` |
| 详情弹窗 | `$dialog` API + 独立 .vue | ❌ 同上 |
| 数据明细查看弹窗 | `$dialog` API + 独立 .vue | ❌ 同上 |
| 确认操作（删除） | `EMessageBox.confirm()` | — |
| 简单提示 | `EMessage()` | — |

**正确写法**：

```js
import { h, defineAsyncComponent, getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();

const openAddDialog = (title) => {
  proxy?.$dialog(
    {
      title,
      width: 600,
      height: 500,
      contentPadding: false,
      closeCallback: (action) => {
        if (action === 'submit') model.gridList.refresh();
      }
    },
    () => h(defineAsyncComponent(() => import('./add.vue')))
  );
};
```

**禁止**：
```vue
<!-- ❌ 内联 e-dialog -->
<e-dialog v-model:open="open">...</e-dialog>

<!-- ❌ 导入弹窗组件直接用 -->
<DetailDialog v-model:visible="dialogVisible" :data="data" />
```

✓ 检验句：grep 搜你的代码里 `v-model:visible|v-model:open` **没有匹配**（业务场景）才算过。

---

## R5 · 弹窗内**必须**用 `ep-layout-manager` 标准布局

| 弹窗类型 | 内容 | 布局模式 |
| --- | --- | --- |
| 表单弹窗 | 表单（新增 / 编辑 / 详情） | `e-scrollbar class="flex-1"` 包 `ep-form` |
| 表格弹窗 | 数据表格 | `<div class="h-full p-xl box-border">` 包 `ep-data-grid`（**注意 `box-border`**） |

**表单弹窗模板**：
```vue
<ep-layout-manager class="h-full">
  <template #main>
    <e-scrollbar class="flex-1">
      <ep-form class="p-xl" ref="formRef" :model="formData" :rules="rules" label-position="top">
        <ep-form-item label="..." prop="...">
          <ep-input v-model="formData.xxx" />
        </ep-form-item>
      </ep-form>
    </e-scrollbar>
  </template>
  <template #bottom>
    <div class="flex justify-end px-xl py-m" style="border-top: 1px dashed var(--e-border-color-brand-light)">
      <e-button @click="onCancel">取消</e-button>
      <e-button type="primary" class="ml-m" :loading="submitting" @click="onSubmit">确认</e-button>
    </div>
  </template>
</ep-layout-manager>
```

**关闭弹窗**：
```js
import { inject } from 'vue';
const getCurrentDialog = inject('getCurrentDialog');

const closeDialog = (action = 'close', data) => {
  getCurrentDialog()?.close(action === 'close' ? action : data);
};

const onCancel = () => closeDialog('cancel');
const onSubmit = async () => {
  if (state) closeDialog('submit', formData);  // 父页面触发刷新
};
```

✓ 检验句：你的弹窗 .vue 最外层是 `<ep-layout-manager class="h-full">` + 用 `inject('getCurrentDialog')` 关闭才算过。

---

## R6 · ep-data-grid 必填属性清单

```vue
<ep-data-grid
  ref="tableRef"
  :id-field="model.gridList.idField"
  :data="model.gridList.data"
  :total="model.gridList.total"
  :current="model.gridList.current"
  :page-size="model.gridList.pageSize"
  :columns="columnList"
  :loading="model.gridList.loading"
  v-model:selectedRowKeys="model.selectedRowKeys"
  :show-index-column="true"
  :show-selection-column="true"
  :default-show-index="true"
  @change="model.gridList.change"
  @refresh="model.gridList.refresh"
  configurable
  config-id="datagrid">
  <template #bodyCell="{ column, text, record }">
    <!-- 自定义单元格 -->
  </template>
</ep-data-grid>
```

**列配置**：
- 操作列必须有 `key: 'action'` + `dataIndex: 'action'`
- 操作按钮通过 `column.action.items[]` 配置（`label` + `onClick(row)` + `visible(row)` + `disabled(row)`）

✓ 检验句：你的 `<ep-data-grid>` 至少绑定了 `data` / `total` / `current` / `page-size` / `columns` / `loading` 这 6 个属性才算过。

---

## R7 · `e-tree` 必填属性

```vue
<e-tree
  ref="treeRef"
  v-model:selected-keys="selectedKeys"
  :data="model.typeTree.data"
  :field-names="{ value: 'value', label: 'label', children: 'children', icon: 'customIcon' }"
  show-filter
  filter-placeholder="搜索"
  @select="handleSelect" />
```

✓ 检验句：你的 `<e-tree>` **必须**显式声明 `field-names` 才算过（否则可能用错字段）。

---

## R8 · 图标**先查文档再 import**

来源：`vue-docs/components/components-icon.md`。

```js
import { Add, Delete, Edit, Search, Refresh, Setting, Upload, Download, View, Hide, Close, Check, Loading } from '@epoint-fe/eui-icons';
```

**禁止**：
- ❌ 凭记忆 import 不存在的图标名（如 `import { Plus }`，应是 `Add`）
- ❌ 用其他图标库（Element Plus icons / Antd icons）

✓ 检验句：你 import 的每个图标名都在 `references/docs/components/components-icon.md` 列表里能找到才算过。

---

## R9 · `EMessageBox.confirm` / `EMessage` 必须用对应函数

```js
import { EMessage, EMessageBox } from '@epoint-fe/eui-components';

// 确认 + 异步操作
EMessageBox.confirm('确认删除？', '删除确认', {
  confirmButtonText: '确认删除',
  cancelButtonText: '取消',
  type: 'warning'
}).then(async () => {
  const { state, message } = await Utils.request({ url: '/api/delete', data: { params: { id } } });
  EMessage({ message, type: state ? 'success' : 'error' });
  if (state) model.gridList.refresh();
});

// 简单提示
EMessage({ message: '操作成功', type: 'success' });
EMessage({ message: '操作失败', type: 'error' });
EMessage({ message: '请先选择数据', type: 'warning' });
```

**`EMessage` 的 `type` 仅支持**：`'success' | 'warning' | 'info' | 'error'`（**不支持** `'primary'` / `'danger'`，那是 `e-button` 的）。

✓ 检验句：你 `EMessage` / `EMessageBox` 用的 `type` 值在文档允许范围内才算过。

---

## R10 · 组件查阅清单（用前必查）

| 组件 | 文档路径 |
| --- | --- |
| 表格 ep-data-grid | `references/docs/ep-components/components-eui-core-ep-datagrid.md` |
| 布局 ep-layout-manager | `references/docs/ep-components/components-eui-core-ep-layout-manager.md` |
| 表单 ep-form | `references/docs/ep-components/components-eui-core-ep-form.md` |
| 选项卡 e-tabs | `references/docs/components/components-tabs.md` |
| 弹窗 e-dialog（仅了解，不直接用） | `references/docs/components/components-dialog.md` |
| 下拉 e-select | `references/docs/components/components-select.md` |
| 树 e-tree | `references/docs/components/components-tree.md` |
| 上传 e-upload | `references/docs/components/components-upload.md` |
| 标签 e-tag | `references/docs/components/components-tag.md` |
| 图标 e-icon | `references/docs/components/components-icon.md` |
| 消息 EMessage | `references/docs/components/components-message.md` |
| 确认框 EMessageBox | `references/docs/components/components-message-box.md` |
| 按钮 e-button | `references/docs/components/components-button.md` |
| 输入框 e-input | `references/docs/components/components-input.md` |
| 日期 e-date-picker | `references/docs/components/components-datepicker.md` |

✓ 检验句：使用任何组件前你都引用过对应文档（输出"我读了 xxx.md，里面说 yyy"）才算过。

---

_未在本规则清单的特殊组件场景，先查 `references/docs-index.md` 找文档，找不到再问用户。_
