# 弹窗与交互规范

> epoint Vue 弹窗开发规范，所有前端开发应遵守。

---

## 1. 适用范围与目标

- 适用范围：`Vue + EUI4` 弹窗与交互组件使用。
- 目标：统一弹窗实现方式、保障可维护性、避免页面代码膨胀。

---

## 2. 弹窗方式强制约束

> **⚠️ 所有业务弹窗必须使用 `$dialog` API + 独立.vue 方式**

| 方式 | 状态 | 说明 |
|-----|------|------|
| `$dialog` API + 独立.vue | ✅ 必须使用 | 业务弹窗（新增/编辑/详情/复选/明细查看等）唯一合法方式 |
| 内联 `<e-dialog>` | ❌ 禁止使用 | 所有业务场景禁止使用此方式 |

### 强制使用 `$dialog` API 的场景

以下情况**必须使用 `$dialog` API**：

- 是否有表单验证、数据提交等业务逻辑？→ 必须使用 `$dialog` API
- 是否需要加载详情数据？→ 必须使用 `$dialog` API
- 是否需要跨页面复用？→ 必须使用 `$dialog` API
- 弹窗代码超过一定复杂度（如含表单、多步骤）？→ 必须使用 `$dialog` API
- 数据明细查看弹窗？→ 必须使用 `$dialog` API
- 详情弹窗？→ 必须使用 `$dialog` API

### 禁止事项

| 禁止做法 | 正确做法 |
|---------|---------|
| ❌ 在模板中声明 `<e-dialog>` 组件 | ✅ 使用 `$dialog` API 动态调用 |
| ❌ 使用 `v-model:visible` 控制弹窗 | ✅ 通过 `$dialog` 配置和 `closeCallback` 管理 |
| ❌ 导入并声明弹窗组件 `<DetailDialog v-model:visible="..." />` | ✅ 使用 `h(defineAsyncComponent(() => import('./detail.vue')))` 动态调用 |

### 不同场景的强制使用方式

| 场景 | 强制使用方式 |
|-----|-------------|
| 表单弹窗（新增/编辑） | `$dialog` API + 独立.vue |
| 详情弹窗 | `$dialog` API + 独立.vue |
| 数据明细查看弹窗 | `$dialog` API + 独立.vue |
| 确认操作（删除确认） | `EMessageBox.confirm()` |
| 简单提示（成功/失败） | `EMessage()` |

---

## 3. $dialog API 使用方法（主要推荐）

> **详细文档**：[components/components-dialog.md](components/components-dialog.md)（"API 方法 - 打开组件页面"章节）

F10框架使用 `$dialog` API 动态调用弹窗，弹窗内容为独立 `.vue` 文件。

### 3.1 列表页调用弹窗

```javascript
import { h, defineAsyncComponent, getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();

// 新增弹窗
const openAddDialog = (title) => {
  proxy?.$dialog(
    {
      title,
      width: 600,
      height: 500,
      contentPadding: false,
      closeCallback: (action) => {
        if (action === 'submit') {
          refresh(); // 提交后刷新表格
        }
      }
    },
    () => h(defineAsyncComponent(() => import('./add.vue')))
  );
};

// 编辑弹窗（传递参数）
const openEditDialog = (title, rowGuid) => {
  proxy?.$dialog(
    {
      title,
      width: 600,
      height: 500,
      contentPadding: false,
      closeCallback: (action) => {
        if (action === 'submit') {
          refresh();
        }
      }
    },
    () => h(
      defineAsyncComponent(() => import('./edit.vue')),
      { rowGuid } // 通过 h() 函数传递 props
    )
  );
};

// 详情弹窗
const openDetailDialog = (title, rowGuid) => {
  proxy?.$dialog(
    {
      title,
      width: 600,
      height: 400,
      contentPadding: false
    },
    () => h(
      defineAsyncComponent(() => import('./detail.vue')),
      { rowGuid }
    )
  );
};
```

### 3.2 弹窗配置项

| 参数 | 说明 | 类型 |
|-----|------|-----|
| `title` | 弹窗标题 | `string` |
| `width` | 弹窗宽度 | `number` |
| `height` | 弹窗高度 | `number` |
| `contentPadding` | 是否有内边距 | `boolean` |
| `closeCallback` | 关闭回调，`action` 为 `'submit'` 或 `'cancel'` | `function` |

### 3.3 弹窗页面关闭方式

弹窗页面（add.vue/edit.vue/detail.vue）通过 `inject` 获取关闭方法：

```javascript
import { inject } from 'vue';

const getCurrentDialog = inject('getCurrentDialog');

// 关闭弹窗
// action='close' 时传 action，其他情况传 data
const closeDialog = (action = 'close', data) => {
  getCurrentDialog()?.close(action === 'close' ? action : data);
};

// 取消
const onCancel = () => {
  closeDialog('cancel');  // 父页面收到 undefined
};

// 提交成功后
const onSubmit = async () => {
  // ... 提交逻辑
  if (state) closeDialog('submit', formData);  // 父页面收到 formData
};
```

> **参数说明**：
> - `closeDialog()` 或 `closeDialog('close')` → 父页面收到 `'close'`（直接关闭）
> - `closeDialog('cancel')` → 父页面收到 `undefined`（取消操作）
> - `closeDialog('submit', formData)` → 父页面收到 `formData`（提交数据）

**父页面处理示例**：

```javascript
closeCallback: (param) => {
  if (param === 'close') {
    // 直接关闭，无操作
  } else if (param) {
    // 有数据，刷新列表
    refresh();
  }
  // param === undefined → 取消，不刷新
};

---

## 4. 弹窗页面布局结构

> **⚠️ 弹窗内部必须使用标准布局结构**

弹窗页面根据内容类型使用不同的布局结构：

| 弹窗类型 | 内容 | 布局模式 | 滚动处理 |
|---------|------|---------|---------|
| 表单弹窗 | 表单（新增/编辑/详情） | `e-scrollbar` + `ep-form` | 内容溢出时滚动表单 |
| 表格弹窗 | 数据表格（明细查看） | `div` + `ep-data-grid` | 表格自带滚动 |

### 4.1 表单弹窗布局

#### 4.1.1 必须结构

```vue
<ep-layout-manager class="h-full">
  <template #main>
    <e-scrollbar class="flex-1">       <!-- 滚动容器：包裹表单内容 -->
      <ep-form class="p-xl">
        <!-- 表单内容 -->
      </ep-form>
    </e-scrollbar>
  </template>
  <template #bottom>                    <!-- 按钮区域：固定在底部 -->
    <div class="flex justify-end px-xl py-m" style="border-top: 1px dashed var(--e-border-color-brand-light)">
      <e-button @click="onCancel">取消</e-button>
      <e-button type="primary" class="ml-m" :loading="submitting" @click="onSubmit">确认</e-button>
    </div>
  </template>
</ep-layout-manager>
```

#### 4.1.2 结构要点

| 元素 | 位置 | 说明 |
| ---- | ---- | ---- |
| `ep-layout-manager class="h-full"` | 最外层 | 管理弹窗内部高度分配 |
| `#main` 插槽 | 内容区 | 放置表单、详情等内容 |
| `e-scrollbar class="flex-1"` | #main 内 | 内容超出高度时自动滚动 |
| `ep-form class="p-xl"` | scrollbar 内 | 表单内容，p-xl 提供内边距 |
| `#bottom` 插槽 | 底部区 | 固定高度的按钮区域 |

### 4.2 表格弹窗布局

表格弹窗（如明细查看弹窗）与表单弹窗布局不同，表格自带滚动能力，无需 `e-scrollbar`。

#### 4.2.1 常见问题

| 问题 | 原因 |
|-----|------|
| 表格高度抖动/变小 | `h-full` + `p-xl` 组合导致高度溢出 |
| 表格外部出现滚动条 | padding 被加在 height 之外，超出容器 |

#### 4.2.2 解决方案

使用 `box-border` 类名处理盒模型，让 padding 包含在 height 内：

```vue
<ep-layout-manager class="h-full">
  <template #main>
    <div class="h-full p-xl box-border">
      <ep-data-grid id-field="id" :data="tableData" :columns="columns" :loading="loading" />
    </div>
  </template>
  <template #bottom>
    <div class="flex justify-end px-xl py-m" style="border-top: 1px dashed var(--e-border-color-brand-light)">
      <e-button @click="handleCancel">关闭</e-button>
    </div>
  </template>
</ep-layout-manager>
```

#### 4.2.3 关键点说明

| 类名 | 作用 |
|-----|------|
| `h-full` | 容器高度 100% |
| `p-xl` | 内边距（16px） |
| `box-border` | `box-sizing: border-box`，padding 包含在 height 内 |

**原理**：默认 `box-sizing: content-box`，`h-full` 计算高度后再加 padding 导致超出。`box-border` 让 padding 从 height 中扣除，确保总高度不溢出。

> `box-border` 类名定义见 [style-development.md](style-development.md) "尺寸与溢出"章节。

---

## 5. 禁止使用内联 e-dialog

> **⚠️ 业务弹窗禁止使用内联 `<e-dialog>`，必须使用 `$dialog` API**
>
> 以下说明仅用于理解组件属性，实际开发中请勿使用此方式。

### 5.1 禁止的用法示例

```vue
<!-- ❌ 禁止：在模板中声明 e-dialog -->
<template>
  <e-dialog v-model:open="open" title="Basic Modal">
    <p>Some contents...</p>
  </e-dialog>
</template>

<!-- ❌ 禁止：导入并声明弹窗组件 -->
<DetailDialog v-model:visible="dialogVisible" :data="currentData" />
```

### 5.2 正确的替代方案

所有弹窗需求都应使用 `$dialog` API（详见第3节）。

### 5.3 组件属性参考（仅供了解）

| 属性 | 说明 | 类型 | 默认值 |
|-----|------|-----|--------|
| `v-model:open` | 弹窗可见性 | `boolean` | `false` |
| `title` | 弹窗标题 | `string` | — |
| `width` | 弹窗宽度 | `string / number` | `50%` |
| `height` | 弹窗高度 | `string / number` | — |

> **注意**：了解这些属性是为了更好地理解 `$dialog` API 的配置项，而非用于直接使用组件。

---

## 6. 反馈组件

### 6.1 Message 消息提示

> **详细文档**：[components/components-message.md](components/components-message.md)

```javascript
import { EMessage } from '@epoint-fe/eui-components';

EMessage({ message: '操作成功', type: 'success' });
EMessage({ message: '操作失败', type: 'error' });
EMessage({ message: '请先选择数据', type: 'warning' });
```

### 6.2 MessageBox 确认框

> **详细文档**：[components/components-message-box.md](components/components-message-box.md)

```javascript
import { EMessageBox } from '@epoint-fe/eui-components';

EMessageBox.confirm('确认删除选中的数据吗？', '删除确认', {
    confirmButtonText: '确认删除',
    cancelButtonText: '取消',
    type: 'warning'
}).then(() => {
    // 确认后执行删除
});
```

### 6.3 Notification 通知

> **详细文档**：[components/components-notification.md](components/components-notification.md)

### 6.4 Popconfirm 确认

> **详细文档**：[components/components-popconfirm.md](components/components-popconfirm.md)

---

## 7. 提交前强制自检

1. 弹窗是否有业务逻辑（表单验证、数据提交、详情加载）？是否使用了 `$dialog` API？
2. ❌ **禁止**在模板中声明 `<e-dialog>` 或导入弹窗组件使用 `v-model:visible`
3. 弹窗页面是否使用了标准布局结构（`ep-layout-manager`）？
4. 确认操作是否使用了 `EMessageBox.confirm()`？
5. 简单提示是否使用了 `EMessage()`？
6. 弹窗是否设置了 `height` 属性（避免表格高度抖动）？

---

## 8. 关联文档

| 文档类型 | 本地路径 |
|---------|---------|
| Dialog 组件详细文档 | [components/components-dialog.md](components/components-dialog.md) |
| Message 消息提示 | [components/components-message.md](components/components-message.md) |
| MessageBox 确认框 | [components/components-message-box.md](components/components-message-box.md) |
| Notification 通知 | [components/components-notification.md](components/components-notification.md) |
| Popconfirm 弹出确认 | [components/components-popconfirm.md](components/components-popconfirm.md) |
| 布局管理器（弹窗布局） | [ep-components/components-eui-core-ep-layout-manager.md](ep-components/components-eui-core-ep-layout-manager.md) |

---

_epoint 框架前端开发规范（Vue 版）_