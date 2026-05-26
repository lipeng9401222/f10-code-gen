# examples-index · typical/* .vue 模板索引

> **场景 → 路径**。AI 看到用户描述的"页面类型 + 布局/功能特征"时**直接读这里给的 .vue 文件**作为骨架。
> 路径基于 `epoint-f10code-gen/references/docs/page-examples/`（已同步）。
> 完整官方索引见 `references/docs/page-examples/page-template-index.md`。

---

## 🚦 强制流程（来源：page-template-index.md）

> **⚠️ 开发前必须按流程完整执行，禁止跳过任何步骤**

```
Step 1：必读 5 个基础模板（兜底骨架）
  ↓
Step 2：根据"页面类型 + 布局/功能特征"匹配场景模板
  ↓
Step 3：综合判断，最终页面 = 基础骨架 + 场景功能细节
```

详见 `workflows/page/02-match-template.md`。

---

## ⭐ Step 1 · 5 个基础模板（必读）

| 功能 | 路径 |
| --- | --- |
| 列表页 | `page-examples/base/list.vue` |
| 左右布局 | `page-examples/base/side-tree-list.vue` |
| 新增页 | `page-examples/base/add.vue` |
| 编辑页 | `page-examples/base/edit.vue` |
| 详情页 | `page-examples/base/detail.vue` |

---

## 📚 Step 2 · 场景模板索引

### 表单页

#### 表单结构

| 场景 | 路径 |
| --- | --- |
| 基础结构 | `page-examples/demo/page/typical/form/layout/base.vue` |
| 分屏结构（外分区） | `page-examples/demo/page/typical/form/layout/horizontal-outer.vue` |
| 内部分隔 | `page-examples/demo/page/typical/form/layout/horizontal-inner.vue` |
| 纵向分隔 | `page-examples/demo/page/typical/form/layout/section-vertical.vue` |
| 概要结构 | `page-examples/demo/page/typical/form/layout/summary-layout.vue` |

#### 按钮位置

| 场景 | 路径 |
| --- | --- |
| 底部按钮栏 | `page-examples/demo/page/typical/form/toolbar/toolbar-bottom.vue` |
| 底部按钮栏-弹窗 | `page-examples/demo/page/typical/form/toolbar/toolbar-bottom-dialog.vue` |
| 顶部按钮栏 | `page-examples/demo/page/typical/form/toolbar/toolbar-top.vue` |

#### 导航形式

| 场景 | 路径 |
| --- | --- |
| 侧边目录导航 | `page-examples/demo/page/typical/form/navigation/side-directory.vue` |
| 侧边目录导航（定宽表单） | `page-examples/demo/page/typical/form/navigation/side-directory-fixed.vue` |
| 侧边目录导航（页面） | `page-examples/demo/page/typical/form/navigation/side-directory-page.vue` |
| 顶栏 Tab 导航 | `page-examples/demo/page/typical/form/navigation/tab-navigation.vue` |
| 顶栏步骤导航 | `page-examples/demo/page/typical/form/navigation/step-navigation.vue` |
| 步骤内容子组件 | `page-examples/demo/page/typical/form/navigation/step-contents/content.vue` |

#### 内容布局

| 场景 | 路径 |
| --- | --- |
| 分组布局 | `page-examples/demo/page/typical/form/content/group-block.vue` |
| 分组布局（折叠） | `page-examples/demo/page/typical/form/content/group-accordion.vue` |
| Tab 布局 | `page-examples/demo/page/typical/form/content/tab-layout.vue` |
| 更多布局 | `page-examples/demo/page/typical/form/content/more-layout.vue` |

#### 子表单（主从结构）

| 场景 | 路径 |
| --- | --- |
| 列表形式 | `page-examples/demo/page/typical/form/subform/list-edit.vue` |
| 列表形式（弹窗编辑） | `page-examples/demo/page/typical/form/subform/list-edit-dialog.vue` |
| 表单形式 | `page-examples/demo/page/typical/form/subform/form-edit.vue` |
| 表单形式（弹窗编辑） | `page-examples/demo/page/typical/form/subform/form-edit-dialog.vue` |
| 表格形式（行编辑） | `page-examples/demo/page/typical/form/subform/datagrid-edit.vue` |
| 表格基础（行编辑） | `page-examples/demo/page/typical/form/subform/datagrid-edit-base.vue` |
| 表格表单（行编辑） | `page-examples/demo/page/typical/form/subform/datagrid-edit-form.vue` |
| 表格形式（弹窗编辑） | `page-examples/demo/page/typical/form/subform/drawer-edit.vue` |
| 表格弹窗（编辑） | `page-examples/demo/page/typical/form/subform/drawer-edit-dialog.vue` |

---

### 列表页

#### 列表结构

| 场景 | 路径 |
| --- | --- |
| 基础结构 | `page-examples/demo/page/typical/list/layout/base.vue` |
| 同层级导航 | `page-examples/demo/page/typical/list/layout/horizontal-nav.vue` |
| 高层级导航 | `page-examples/demo/page/typical/list/layout/horizontal-nav-high.vue` |
| 左右详情（分区结构） | `page-examples/demo/page/typical/list/layout/partition-structure.vue` |

#### 工具栏结构

| 场景 | 路径 |
| --- | --- |
| 单行工具栏 | `page-examples/demo/page/typical/list/operation/single-line.vue` |
| 双行工具栏 | `page-examples/demo/page/typical/list/operation/double-line.vue` |

#### 导航形式

| 场景 | 路径 |
| --- | --- |
| **左右导航（侧栏树）** | `page-examples/demo/page/typical/list/navigation/side-tree.vue` |
| 标题下拉导航 | `page-examples/demo/page/typical/list/navigation/title-select.vue` |
| 顶栏 Tab 导航 | `page-examples/demo/page/typical/list/navigation/top-nav.vue` |
| 指标卡导航 | `page-examples/demo/page/typical/list/navigation/top-card.vue` |

#### 表格列表

| 场景 | 路径 |
| --- | --- |
| 基础表格 | `page-examples/demo/page/typical/list/content/base-grid.vue` |
| 树状表格 | `page-examples/demo/page/typical/list/content/tree-grid.vue` |
| 嵌套表格 | `page-examples/demo/page/typical/list/content/inline-detail-grid.vue` |
| 多行数据列（列模板） | `page-examples/demo/page/typical/list/content/column-template.vue` |
| 复杂数据列 | `page-examples/demo/page/typical/list/content/complex-data.vue` |
| 复杂数据-popover | `page-examples/demo/page/typical/list/content/complex-data-popover.vue` |
| 复杂数据-progress | `page-examples/demo/page/typical/list/content/complex-data-progress.vue` |

#### 卡片列表

| 场景 | 路径 |
| --- | --- |
| 通栏卡片 | `page-examples/demo/page/typical/list/card/full-width.vue` |
| 宫格卡片 | `page-examples/demo/page/typical/list/card/grid.vue` |
| 瀑布流 | `page-examples/demo/page/typical/list/card/waterfall.vue` |

---

### 详情页

| 场景 | 路径 |
| --- | --- |
| 基础形式 | `page-examples/demo/page/typical/detail/layout/base.vue` |
| 表格形式 | `page-examples/demo/page/typical/detail/layout/table.vue` |
| 时间线形式 | `page-examples/demo/page/typical/detail/layout/timeline.vue` |

---

### 选择页

| 场景 | 路径 |
| --- | --- |
| 选人/选部门 | `page-examples/demo/page/typical/chosen/person-depart.vue` |
| 选数据（弹窗） | `page-examples/demo/page/typical/chosen/select-data.vue` |
| 选数据（基础） | `page-examples/demo/page/typical/chosen/select-data-base.vue` |
| 选数据（分类） | `page-examples/demo/page/typical/chosen/select-data-classification.vue` |
| 选模板（卡片） | `page-examples/demo/page/typical/chosen/card.vue` |

---

### 特定场景

| 场景 | 路径 |
| --- | --- |
| 审批页 | `page-examples/demo/page/typical/specific/approve.vue` |
| 设置页 | `page-examples/demo/page/typical/specific/settings.vue` |
| 侧边布局子组件 | `page-examples/demo/page/typical/specific/components/side-layout/side-layout.vue` |

---

### 弹窗

| 场景 | 路径 |
| --- | --- |
| 基础弹窗 | `page-examples/demo/page/typical/dialog/base-dialog.vue` |
| 抽屉弹窗 | `page-examples/demo/page/typical/dialog/drawer-dialog.vue` |
| 全屏弹窗 | `page-examples/demo/page/typical/dialog/full-screen-dialog.vue` |
| 嵌入式弹窗 | `page-examples/demo/page/typical/dialog/embed-dialog.vue` |
| 嵌入弹窗-页面 | `page-examples/demo/page/typical/dialog/embed-dialog-page.vue` |
| 表单弹窗（普通） | `page-examples/demo/page/typical/dialog/form.vue` |
| 表单弹窗（modal） | `page-examples/demo/page/typical/dialog/form-modal.vue` |

---

### 状态页

#### 缺省提示

| 场景 | 路径 |
| --- | --- |
| 基础缺省 (status-empty) | `page-examples/demo/page/typical/status/empty/status-empty.vue` |
| 表格缺省（仅文字） | `page-examples/demo/page/typical/status/empty/datagrid-empty.vue` |
| 表格缺省（带按钮，缺省引导） | `page-examples/demo/page/typical/status/empty/datagrid-empty-withbtn.vue` |

#### 结果反馈

| 场景 | 路径 |
| --- | --- |
| 成功页 | `page-examples/demo/page/typical/status/feedback/feedback-success.vue` |
| 失败页 | `page-examples/demo/page/typical/status/feedback/feedback-error.vue` |
| 完善信息 | `page-examples/demo/page/typical/status/feedback/improve-information.vue` |

#### 异常情况

| 场景 | 路径 |
| --- | --- |
| 403（无权限） | `page-examples/demo/page/typical/status/error/error-403.vue` |
| 404（页面未找到） | `page-examples/demo/page/typical/status/error/error-404.vue` |
| 500（服务器错误） | `page-examples/demo/page/typical/status/error/error-500.vue` |
| 功能建设中 | `page-examples/demo/page/typical/status/error/error-construction.vue` |
| 系统维护中 | `page-examples/demo/page/typical/status/error/error-maintenance.vue` |
| 浏览器不兼容 | `page-examples/demo/page/typical/status/error/error-incompatible.vue` |

---

## 🔄 交互场景

### 提示说明

| 场景 | 路径 |
| --- | --- |
| 系统提示 | `page-examples/demo/page/interaction/scenario/notice/system-notice.vue` |
| 气泡说明 | `page-examples/demo/page/interaction/scenario/notice/popover-notice.vue` |
| 通知引导 / 漫游式引导 | `page-examples/demo/page/interaction/scenario/notice/tour-notice.vue` |

---

## ⚙️ 框架组件示例

### 动态配置

| 场景 | 路径 |
| --- | --- |
| 表格编辑 | `page-examples/demo/page/framework/dynamic/datagrid-edit.vue` |
| 弹窗编辑 | `page-examples/demo/page/framework/dynamic/drawer-edit.vue` |
| 表单编辑 | `page-examples/demo/page/framework/dynamic/form-edit.vue` |
| 列表编辑 | `page-examples/demo/page/framework/dynamic/list-edit.vue` |

### 工具栏

| 场景 | 路径 |
| --- | --- |
| 视图切换 | `page-examples/demo/page/framework/toolbar/view-switch.vue` |

### 穿梭框

| 场景 | 路径 |
| --- | --- |
| 表格穿梭框（弹窗） | `page-examples/demo/page/framework/transfer/transfer-grid-dialog.vue` |
| 表格穿梭框 | `page-examples/demo/page/framework/transfer/transfer-grid.vue` |

---

## 🎯 高频组合场景速查

> 用户描述 → 直接给路径

| 用户需求 | 推荐组合 |
| --- | --- |
| **列表 + 树 + 三弹窗（标段管理类）** | base/side-tree-list.vue + base/add.vue + base/edit.vue + base/detail.vue + typical/list/navigation/side-tree.vue |
| **简单 CRUD 列表** | base/list.vue + base/add.vue + base/edit.vue + base/detail.vue |
| **多 Tab 列表** | base/list.vue + typical/list/navigation/top-nav.vue |
| **指标卡 + 列表** | base/list.vue + typical/list/navigation/top-card.vue |
| **树状表格** | base/list.vue + typical/list/content/tree-grid.vue |
| **主从（主表 + 子表行编辑）** | base/add.vue + typical/form/subform/datagrid-edit.vue |
| **步骤式表单** | base/add.vue + typical/form/navigation/step-navigation.vue |
| **侧边目录大表单** | base/add.vue + typical/form/navigation/side-directory.vue |
| **抽屉式新增** | base/add.vue + typical/dialog/drawer-dialog.vue |
| **全屏弹窗复杂表单** | base/add.vue + typical/dialog/full-screen-dialog.vue |
| **审批页（带流程）** | typical/specific/approve.vue |
| **设置页** | typical/specific/settings.vue |
| **404 页** | typical/status/error/error-404.vue |

---

## 🚫 模板不预制约束

来源 `ANTI-TEMPLATES.md`：
- ✅ 模板提供**结构骨架**（布局 / import / 数据模型写法）
- ❌ 模板**不预制业务字段**（"标段(包)编号" 这类业务语料是项目级，不该硬编码）
- ✅ 用模板时**只复制结构**，业务字段从 `intent.fields` 动态填

---

## ✓ 检验句（用模板时）

- [ ] 至少读了 1 个 `base/` 基础模板
- [ ] 路径来自本文件（grep 能找到）
- [ ] 复制结构的同时**改了**业务字段（避免硬编码）
- [ ] `defineDataModel` 的 URL 改为当前 appName / module
- [ ] `defineOptions({ name })` 改为当前页面名

---

_本索引覆盖 91 个 typical/* + 5 个 base + 14 个 framework + 3 个 interaction = 113 个 .vue 模板。_
