# F10 Vue 页面模板索引

> 本索引用于 AI 智能匹配页面模板。使用时描述"页面类型 + 布局/功能特征"即可匹配对应模板。

---

## 一、模板查阅流程（强制执行）

> **⚠️ 开发前必须按流程完整执行，禁止跳过任何步骤**
>
> **禁止**只读基础模板不查场景模板，也**禁止**只查场景模板不读基础模板

### Step 1：读取基础模板（必读）

以下 5 个基础文件提供**标准结构骨架**，作为页面开发的**兜底参考**：

| 功能 | 相对路径（从 vue-docs 目录起） |
| ---- | --------------------------------------- |
| 列表页 | `page-examples/base/list.vue` |
| 左右布局 | `page-examples/base/side-tree-list.vue` |
| 新增页 | `page-examples/base/add.vue` |
| 编辑页 | `page-examples/base/edit.vue` |
| 详情页 | `page-examples/base/detail.vue` |

**基础模板作用**：
- 提供页面骨架结构（布局容器、插槽位置）
- 提供数据模型标准写法（defineDataModel、useTableModel等）
- 提供组件导入和基本交互模式

### Step 2：匹配场景模板（必查）

根据 PRD 的**页面类型 + 布局/功能特征**，在下方索引中查找匹配的场景模板：

**匹配规则**：
| 匹配结果 | 执行动作 |
|---------|---------|
| 有匹配项 | **必须读取对应模板文件内容**，提取功能细节实现方式 |
| 无匹配项 | 仅使用 Step 1 的基础模板 |

**场景模板作用**：
- 提供特定场景的功能细节（Tab导航、树状表格、分组布局等）
- 提供组件配置示例（列配置、搜索配置、弹窗配置）
- 提供交互逻辑参考（事件处理、状态管理）

### Step 3：综合判断选择

对比已读取的模板，选择最贴合 PRD 需求的结构：

| 模板类型 | 参考价值 | 使用方式 |
|---------|---------|---------|
| 基础模板 | 骨架结构、数据模型 | 作为页面框架基础 |
| 场景模板 | 功能细节、组件配置 | 在骨架基础上叠加具体功能 |

**最终页面 = 基础骨架 + 场景功能细节**

---

## 二、场景模板索引

### 使用方式
描述需求时使用格式：**"页面类型 + 布局/功能特征"**
- 例：表单页 + 侧边目录导航 → 匹配 `side-directory.vue`
- 例：列表页 + 树状表格 → 匹配 `tree-grid.vue`

- **表单页**
  - **表单结构**
    - **基础结构** → `page-examples/demo/page/typical/form/layout/base.vue`
    - **分屏结构** → `page-examples/demo/page/typical/form/layout/horizontal-outer.vue`
    - **内部分隔** → `page-examples/demo/page/typical/form/layout/horizontal-inner.vue`
    - **纵向分隔** → `page-examples/demo/page/typical/form/layout/section-vertical.vue`
    - **概要结构** → `page-examples/demo/page/typical/form/layout/summary-layout.vue`
  - **按钮位置**
    - **底部按钮栏** → `page-examples/demo/page/typical/form/toolbar/toolbar-bottom.vue`
    - **顶部按钮栏** → `page-examples/demo/page/typical/form/toolbar/toolbar-top.vue`
  - **导航形式**
    - **侧边目录导航** → `page-examples/demo/page/typical/form/navigation/side-directory.vue`
    - **顶栏Tab导航** → `page-examples/demo/page/typical/form/navigation/tab-navigation.vue`
    - **顶栏步骤导航** → `page-examples/demo/page/typical/form/navigation/step-navigation.vue`
  - **内容布局**
    - **分组布局** → `page-examples/demo/page/typical/form/content/group-block.vue`
    - **分组布局(折叠)** → `page-examples/demo/page/typical/form/content/group-accordion.vue`
    - **Tab布局** → `page-examples/demo/page/typical/form/content/tab-layout.vue`
    - **更多布局** → `page-examples/demo/page/typical/form/content/more-layout.vue`
  - **子表单**
    - **列表形式** → `page-examples/demo/page/typical/form/subform/list-edit.vue`
    - **表单形式** → `page-examples/demo/page/typical/form/subform/form-edit.vue`
    - **表格形式（行编辑）** → `page-examples/demo/page/typical/form/subform/datagrid-edit.vue`
    - **表格形式（弹窗编辑）** → `page-examples/demo/page/typical/form/subform/drawer-edit.vue`
- **列表页**
  - **列表结构**
    - **基础结构** → `page-examples/demo/page/typical/list/layout/base.vue`
    - **左右导航** → `page-examples/demo/page/typical/list/navigation/side-tree.vue`
    - **左右详情** → `page-examples/demo/page/typical/list/layout/partition-structure.vue`
  - **工具栏结构**
    - **单行工具栏** → `page-examples/demo/page/typical/list/operation/single-line.vue`
    - **双行工具栏** → `page-examples/demo/page/typical/list/operation/double-line.vue`
  - **导航形式**
    - **同层级导航** → `page-examples/demo/page/typical/list/layout/horizontal-nav.vue`
    - **高层级导航** → `page-examples/demo/page/typical/list/layout/horizontal-nav-high.vue`
    - **标题下拉导航** → `page-examples/demo/page/typical/list/navigation/title-select.vue`
    - **顶栏Tab导航** → `page-examples/demo/page/typical/list/navigation/top-nav.vue`
    - **指标卡导航** → `page-examples/demo/page/typical/list/navigation/top-card.vue`
  - **表格列表**
    - **基础表格** → `page-examples/demo/page/typical/list/content/base-grid.vue`
    - **树状表格** → `page-examples/demo/page/typical/list/content/tree-grid.vue`
    - **嵌套表格** → `page-examples/demo/page/typical/list/content/inline-detail-grid.vue`
    - **多行数据列** → `page-examples/demo/page/typical/list/content/column-template.vue`
    - **复杂数据列** → `page-examples/demo/page/typical/list/content/complex-data.vue`
  - **卡片列表**
    - **通栏卡片** → `page-examples/demo/page/typical/list/card/full-width.vue`
    - **宫格卡片** → `page-examples/demo/page/typical/list/card/grid.vue`
- **详情页**
  - **基础形式** → `page-examples/demo/page/typical/detail/layout/base.vue`
  - **表格形式** → `page-examples/demo/page/typical/detail/layout/table.vue`
- **选择页**
  - **选人/部门** → `page-examples/demo/page/typical/chosen/person-depart.vue`
  - **选数据** → `page-examples/demo/page/typical/chosen/select-data.vue`
  - **选模板** → `page-examples/demo/page/typical/chosen/card.vue`
- **特定场景**
  - **审批页** → `page-examples/demo/page/typical/specific/approve.vue`
  - **设置页** → `page-examples/demo/page/typical/specific/settings.vue`
- **弹窗**
  - **基础弹窗** → `page-examples/demo/page/typical/dialog/base-dialog.vue`
  - **抽屉弹窗** → `page-examples/demo/page/typical/dialog/drawer-dialog.vue`
  - **全屏弹窗** → `page-examples/demo/page/typical/dialog/full-screen-dialog.vue`
- **状态页**
  - **缺省提示**
    - **基础缺省** → `page-examples/demo/page/typical/status/empty/datagrid-empty.vue`
    - **缺省引导** → `page-examples/demo/page/typical/status/empty/datagrid-empty-withbtn.vue`
  - **结果反馈**
    - **成功页** → `page-examples/demo/page/typical/status/feedback/feedback-success.vue`
    - **失败页** → `page-examples/demo/page/typical/status/feedback/feedback-error.vue`
    - **扩展信息** → `page-examples/demo/page/typical/status/feedback/improve-information.vue`
  - **异常情况**
    - **403** → `page-examples/demo/page/typical/status/error/error-403.vue`
    - **404** → `page-examples/demo/page/typical/status/error/error-404.vue`
    - **500** → `page-examples/demo/page/typical/status/error/error-500.vue`
    - **功能建设中** → `page-examples/demo/page/typical/status/error/error-construction.vue`
    - **系统维护中** → `page-examples/demo/page/typical/status/error/error-maintenance.vue`
    - **浏览器不兼容** → `page-examples/demo/page/typical/status/error/error-incompatible.vue`

- **交互场景**
  - **提示说明**
    - **系统提示** → `page-examples/demo/page/interaction/scenario/notice/system-notice.vue`
    - **气泡说明** → `page-examples/demo/page/interaction/scenario/notice/popover-notice.vue`
    - **通知引导 /漫游式引导** → `page-examples/demo/page/interaction/scenario/notice/tour-notice.vue`
- **动态配置**
  - **表格编辑** → `page-examples/demo/page/framework/dynamic/datagrid-edit.vue`
  - **弹窗编辑** → `page-examples/demo/page/framework/dynamic/drawer-edit.vue`
  - **表单编辑** → `page-examples/demo/page/framework/dynamic/form-edit.vue`
  - **列表编辑** → `page-examples/demo/page/framework/dynamic/list-edit.vue`
- **表格**
  - **行编辑** → `page-examples/demo/page/framework/dynamic/datagrid-edit.vue`
- **Toolbar**
  - **视图切换** → `page-examples/demo/page/framework/toolbar/view-switch.vue`
- **穿梭框** → `page-examples/demo/page/framework/transfer/transfer-grid-dialog.vue`

---

## 三、匹配示例

| 用户需求描述 | 匹配模板 |
| ----------- | -------- |
| 表单页 + 基础结构 | `page-examples/demo/page/typical/form/layout/base.vue` |
| 表单页 + 分屏结构 | `page-examples/demo/page/typical/form/layout/horizontal-outer.vue` |
| 表单页 + 侧边目录导航 | `page-examples/demo/page/typical/form/navigation/side-directory.vue` |
| 表单页 + 顶栏步骤导航 | `page-examples/demo/page/typical/form/navigation/step-navigation.vue` |
| 表单页 + 分组布局(折叠) | `page-examples/demo/page/typical/form/content/group-accordion.vue` |
| 表单页 + 子表单(表格形式行编辑) | `page-examples/demo/page/typical/form/subform/datagrid-edit.vue` |
| 列表页 + 基础结构 | `page-examples/demo/page/typical/list/layout/base.vue` |
| 列表页 + 左右导航 | `page-examples/demo/page/typical/list/navigation/side-tree.vue` |
| 列表页 + 树状表格 | `page-examples/demo/page/typical/list/content/tree-grid.vue` |
| 列表页 + 嵌套表格 | `page-examples/demo/page/typical/list/content/inline-detail-grid.vue` |
| 列表页 + 卡片列表(宫格卡片) | `page-examples/demo/page/typical/list/card/grid.vue` |
| 详情页 + 基础形式 | `page-examples/demo/page/typical/detail/layout/base.vue` |
| 详情页 + 表格形式 | `page-examples/demo/page/typical/detail/layout/table.vue` |
| 选择页 + 选人/部门 | `page-examples/demo/page/typical/chosen/person-depart.vue` |
| 弹窗 + 抽屉弹窗 | `page-examples/demo/page/typical/dialog/drawer-dialog.vue` |
| 弹窗 + 全屏弹窗 | `page-examples/demo/page/typical/dialog/full-screen-dialog.vue` |
| 状态页 + 404 | `page-examples/demo/page/typical/status/error/error-404.vue` |
| 状态页 + 缺省引导 | `page-examples/demo/page/typical/status/empty/datagrid-empty-withbtn.vue` |
