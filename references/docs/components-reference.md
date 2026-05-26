# 组件快速参考

> epoint Vue 组件速查手册（面向表单与常用业务页面）

## 使用约定（先看）

| 场景                           | 推荐标签前缀 | 说明              |
| ------------------------------ | ------------ | ----------------- |
| 常规页面 / 搜索表单 / 轻量交互 | `e-`         | 使用标准 EUI 组件 |

---

## 1. 输入类组件

| 组件     | 标签名                      | 文档                                                                  | 使用场景     |
| -------- | --------------------------- | --------------------------------------------------------------------- | ------------ |
| 文本框   | `<e-input>`                 | [components-input.md](./components/components-input.md)               | 单行文本输入 |
| 密码框   | `<e-input type="password">` | [components-input.md](./components/components-input.md)               | 密码输入     |
| 多行文本 | `<e-input type="textarea">` | [components-input.md](./components/components-input.md)               | 长文本输入   |
| 数字框   | `<e-input-number>`          | [components-input-number.md](./components/components-input-number.md) | 数值输入     |

---

## 2. 选择类组件

| 组件     | 标签名            | 文档                                                                | 使用场景          |
| -------- | ----------------- | ------------------------------------------------------------------- | ----------------- |
| 下拉框   | `<e-select>`      | [components-select.md](./components/components-select.md)           | 单选/多选下拉     |
| 级联选择 | `<e-cascader>`    | [components-cascader.md](./components/components-cascader.md)       | 级联选择          |
| 日期选择 | `<e-date-picker>` | [components-date-picker.md](./components/components-date-picker.md) | 日期/日期范围选择 |

---

## 3. 数据展示与业务组件

| 组件                 | 标签名            | 文档                                                                                     | 说明                         |
| -------------------- | ----------------- | ---------------------------------------------------------------------------------------- | ---------------------------- |
| 复杂表格             | `<ep-data-grid>`  | [components-eui-core-ep-datagrid.md](./ep-components/components-eui-core-ep-datagrid.md) | 扩展组件表格，支持分页、编辑 |
| 基础表格             | `<e-table>`       | [components-table.md](./components/components-table.md)                                  | 基础数据展示                 |
| 树                   | `<e-tree>`        | [components-tree.md](./components/components-tree.md)                                    | 树形结构展示                 |
| 上传（通用）         | `<e-upload>`      | [components-upload.md](./components/components-upload.md)                                | 通用文件上传                 |
| 上传（文件业务场景） | `<e-file-upload>` | [components-file-upload.md](./components/components-file-upload.md)                      | 文件上传业务封装             |

---

## 4. 框架扩展组件（ep-components）

> 由 `@epframe/eui-core` 包提供的扩展组件组件，封装了复杂业务场景的通用解决方案。

### 4.1 数据展示与表格

| 组件       | 标签名                | 文档                                                                                                 | 说明                                         |
| ---------- | --------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| 扩展表格   | `<ep-data-grid>`      | [components-eui-core-ep-datagrid.md](./ep-components/components-eui-core-ep-datagrid.md)             | 支持分页、编辑、排序、筛选的扩展表格         |
| 数据导出   | `<e-data-export>`     | [components-eui-core-ep-data-export.md](./ep-components/components-eui-core-ep-data-export.md)       | 导出表格数据为 Excel 等格式                  |
| 布局管理器 | `<ep-layout-manager>` | [components-eui-core-ep-layout-manager.md](./ep-components/components-eui-core-ep-layout-manager.md) | 多区域布局管理（顶部/左侧/右侧/底部/主内容） |

### 4.2 表单增强

| 组件       | 标签名                  | 文档                                                                                                     | 说明                                     |
| ---------- | ----------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| 按钮编辑器 | `<ep-button-edit>`      | [components-eui-core-ep-button-edit.md](./ep-components/components-eui-core-ep-button-edit.md)           | 弹窗选择器，用于表单中弹出选择页面       |
| 多语言输入 | `<ep-input-i18n>`       | [components-eui-core-ep-input-i18n.md](./ep-components/components-eui-core-ep-input-i18n.md)             | 支持多语言编辑的输入框，自动继承表单校验 |
| 标签树选择 | `<ep-tabs-tree-select>` | [components-eui-core-ep-tabs-tree-select.md](./ep-components/components-eui-core-ep-tabs-tree-select.md) | 标签与树形结构的组合选择器               |

### 4.3 工具栏组件

| 组件   | 标签名        | 文档                                                                                 | 说明                           |
| ------ | ------------- | ------------------------------------------------------------------------------------ | ------------------------------ |
| 工具栏 | `<e-toolbar>` | [components-eui-core-e-toolbar.md](./ep-components/components-eui-core-e-toolbar.md) | 页面工具栏，包含按钮区和搜索区 |

### 4.4 上传服务

| 组件         | 标签名                      | 文档                                                                                                             | 说明             |
| ------------ | --------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------- |
| 文件上传服务 | `<ep-file-upload-service>`  | [components-eui-core-ep-file-upload-service.md](./ep-components/components-eui-core-ep-file-upload-service.md)   | 文件上传业务封装 |
| 图片上传服务 | `<ep-image-upload-service>` | [components-eui-core-ep-image-upload-service.md](./ep-components/components-eui-core-ep-image-upload-service.md) | 图片上传业务封装 |

### 4.5 其他业务组件

| 组件     | 标签名               | 文档                                                                                               | 说明           |
| -------- | -------------------- | -------------------------------------------------------------------------------------------------- | -------------- |
| 验证码   | `<ep-verify-code>`   | [components-eui-core-ep-verify-code.md](./ep-components/components-eui-core-ep-verify-code.md)     | 验证码输入组件 |
| 快速登录 | `<ep-quick-login>`   | [components-eui-core-ep-quick-login.md](./ep-components/components-eui-core-ep-quick-login.md)     | 快速登录组件   |
| 系统切换 | `<ep-system-switch>` | [components-eui-core-ep-system-switch.md](./ep-components/components-eui-core-ep-system-switch.md) | 多系统切换组件 |

---

## 5. 常用文档入口

| 主题             | 文档                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| 基础组件全量目录 | [components/index.md](./components/index.md)                                                     |
| 组件总览         | [components-overview.md](./components/components-overview.md)                                    |
| Form 表单        | [components-form.md](./components/components-form.md)                                            |
| Icon 图标        | [components-icon.md](./components/components-icon.md)                                            |
| 组件开发指南     | [components-development-dev.md](./ep-components/components-development-dev.md)                   |
| 可配置组件开发   | [components-development-configurable.md](./ep-components/components-development-configurable.md) |

---

## 6. 常见误用提醒

1. 不要臆造组件名，例如 `<e-input-password>`、`<e-textarea>`；应使用 `<e-input type="password">`、`<e-input type="textarea">`。
2. 同一表单内的 `v-model` 与 `:model` 必须指向同一数据对象，避免验证和回填失效。

---

_epoint 框架前端开发规范（Vue 版）_
