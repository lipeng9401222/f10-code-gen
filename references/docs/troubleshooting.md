---
title: 常见问题排查
---

# 常见问题排查

> 本文档记录开发中遇到的常见问题及解决方案，帮助快速定位和解决问题。

## Tab 内表格高度问题

### 问题现象

在 `e-tabs` 组件中使用 `ep-data-grid` 表格时，只有默认激活的 Tab 页表格高度正常，切换到其他 Tab 后表格高度超出可视区域或显示异常。

### 问题原因

1. `e-tabs` 使用 `v-show`（即 `display: none`）隐藏非激活的 Tab 页
2. 当数据模型配置 `lazy: false` 时，所有 Tab 的表格在页面初始化时就渲染
3. 隐藏状态（`display: none`）下，表格无法获取正确的容器高度，导致 `--table-height` CSS 变量计算值错误
4. 切换 Tab 后，表格不会自动重新计算高度

### 解决方案

**步骤1：非默认 Tab 使用 `lazy: true`**

```javascript
// 默认 Tab 保持 lazy: false（页面初始化时加载）
const gridList = useTableModel('/api/supplier-library/list', {
  idField: 'id',
  lazy: false,  // 默认 Tab
  params: computed(() => ({ ...searchParams.data }))
});

// 其他 Tab 使用 lazy: true（延迟加载）
const applyRecords = useTableModel('/api/supplier-library/applyRecords', {
  idField: 'id',
  lazy: true,  // 非默认 Tab
  params: computed(() => ({ ...searchParams.data }))
});
```

**步骤2：在 onTabChange 中触发数据加载**

```javascript
// Tab 与数据模型映射
const tabDataMap = {
  listed: 'gridList',
  apply: 'applyRecords',
  invite: 'inviteRecords'
};

const onTabChange = (name) => {
  activeTab.value = name;
  // 切换 Tab 时检查并加载数据
  const modelName = tabDataMap[name];
  if (model[modelName] && model[modelName].data.length === 0) {
    model[modelName].refresh();
  }
};
```

### 关键点

- 只有**默认激活的 Tab** 使用 `lazy: false`
- 其他 Tab 使用 `lazy: true`，切换时才加载
- 切换 Tab 时需要手动检查并触发数据加载
- 数据加载时 Tab 已显示，表格可正确计算高度

### 相关文档

- [EpDataGrid 表格组件](./ep-components/components-eui-core-ep-datagrid.md)
- [Tabs 选项卡组件](./components/components-tabs.md)
- [useTableModel 数据模型](./getting-started/getting-started-use-data-model.md)

---

## Flex容器表格高度跳动问题

### 问题现象

页面加载时表格高度先很大再缩小，产生视觉跳动。

### 问题原因

- Flex 子项默认 `min-height: auto`，会以内容自然高度作为最小值
- 表格初始化时内部渲染较大的空状态/loading区域，撑开容器
- 数据加载后内容变小，Flex重新计算导致高度收缩

### 解决方案

```vue
<!-- ❌ 错误：flex-1 缺少高度约束 -->
<div class="flex-1 px-xl pb-xl bg-white">
  <ep-data-grid ... />
</div>

<!-- ✅ 正确：添加 min-h-0 和 overflow-hidden -->
<div class="flex-1 min-h-0 overflow-hidden px-xl pb-xl bg-white">
  <ep-data-grid ... />
</div>
```

**关键点**：`min-h-0` 让容器可收缩到比内容更小，避免被撑开。

---

## 页面组件未导入框架组件

### 问题现象

控制台报错：
```
[Vue warn]: Failed to resolve component: ep-data-grid
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.
```

### 问题原因

在 `.vue` 文件中使用框架组件（如 `ep-data-grid`），但未从 `@epframe/eui-core` 导入。

### 解决方案

```vue
<script setup>
import { ref, onMounted } from 'vue';
import { EpDataGrid, Utils } from '@epframe/eui-core';  // ✅ 导入框架组件
</script>
```

### 常见框架组件导入

| 组件标签 | 导入语句 |
|---------|---------|
| `ep-data-grid` | `import { EpDataGrid } from '@epframe/eui-core'` |
| `ep-layout-manager` | `import { EpLayoutManager } from '@epframe/eui-core'` |

---

## 其他问题

---

## 组件属性值使用错误

### 问题现象

控制台报错：
```
[Vue warn]: Invalid prop: custom validator check failed for prop "type".
```

### 问题原因

凭其他 UI 框架（如 Element Plus）的经验使用属性值，未查阅当前框架文档确认有效值范围。

例如：
- Element Plus 的 `el-tag` 支持 `type="primary"`
- 本框架的 `e-tag` 只支持 `'success' | 'info' | 'warning' | 'danger' | ''`

### 解决方案

**使用任何组件属性前，必须查阅组件文档确认有效值**：

| 组件 | 属性 | 有效值 | 文档路径 |
|------|------|--------|---------|
| `e-tag` | type | `'success' \| 'info' \| 'warning' \| 'danger' \| ''` | `components/components-tag.md` |
| `e-button` | type | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `components/components-button.md` |
| `e-message` | type | `'success' \| 'warning' \| 'info' \| 'error'` | `components/components-message.md` |

**错误示例**：
```vue
<!-- ❌ 凭经验使用 primary，但 e-tag 不支持 -->
<e-tag type="primary">申请入库</e-tag>

<!-- ✅ 查阅文档后使用 info -->
<e-tag type="info">申请入库</e-tag>
```

### 关键点

- **禁止**凭其他框架经验直接使用属性值
- **必须**查阅当前框架组件文档的 Attributes 表格
- 重点关注枚举类型属性（如 `type`、`size`、`effect`）

（待补充）