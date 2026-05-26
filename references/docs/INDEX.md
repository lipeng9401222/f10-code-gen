# epoint 前端开发规范

> **本索引是前端开发任务的权威信息源**，包含完整的任务 → 文档映射、组件库导航和 F9 框架 API 速查。

## 目录结构

```
frontend/
├── index.md                        # 📋 本文件 - 前端开发索引
│
├── api/                            # 🔧 API 接口文档
│   ├── api-core-overview.md        # 核心 API 概览 (@epframe/eui-core)
│   ├── api-common-utils-*.md       # 通用工具类
│   └── ...
│
├── components/                     # 🧩 eui-components 组件库
│   ├── index.md                    # 组件索引
│   ├── components-button.md        # 按钮组件
│   └── ...
│
├── ep-components/                  # 🏢 eui-core 企业级组件
│   ├── components-eui-core-ep-datagrid.md # 复杂表格
│   └── ...
│
├── examples/                       # 💡 Vue 示例代码
│   ├── container/                  # 布局示例
│   ├── affix/                      # 组件示例
│   └── ...
│
├── getting-started/                # 🚀 快速上手
│   ├── getting-started-quick-start.md
│   └── ...
│
├── guide/                          # 📘 基础指南
│   ├── guide-introduction.md       # 介绍
│   └── ...
│
├── guides/                         # 📚 进阶指南
│   ├── guides-advanced-*.md        # 进阶主题
│   └── ...
│
├── components-reference.md         # 组件快速参考
├── layout-standards.md             # 布局规范
├── data-binding.md                 # 数据绑定
├── list-development.md             # 列表开发
├── form-development.md             # 表单开发
├── dialog-interaction.md           # 弹窗交互
├── performance-optimization.md     # 性能优化
├── style-development.md            # 样式开发
├── mock-development.md             # mock规范
├── troubleshooting.md              # 常见问题排查
└── api-development.md              # 框架 Api 开发指南
```

## 文档分类

### 📚 详细组件文档

| 目录                               | 说明                  |
| ---------------------------------- | --------------------- |
| [components/](./components/)       | 基础 UI 组件库文档    |
| [ep-components/](./ep-components/) | 企业级业务组件文档    |
| [api/](./api/)                     | 框架 API 和工具类文档 |

### 📋 快速参考 (分片文档)

| 文档                                                         | 说明              |
| ------------------------------------------------------------ | ----------------- |
| [components-reference.md](./components-reference.md)         | 组件速查          |
| [layout-standards.md](./layout-standards.md)                 | 布局规范          |
| [data-binding.md](./data-binding.md)                         | 数据绑定          |
| [list-development.md](./list-development.md)                 | 列表开发          |
| [form-development.md](./form-development.md)                 | 表单开发          |
| [dialog-interaction.md](./dialog-interaction.md)             | 弹窗交互          |
| [performance-optimization.md](./performance-optimization.md) | 性能优化          |
| [style-development.md](./style-development.md)               | 样式开发          |
| [mock-development.md](./mock-development.md)                 | mock规范          |
| [troubleshooting.md](./troubleshooting.md)                   | 常见问题排查      |
| [api-development.md](./api-development.md)                   | 框架 Api 开发指南 |

## AI Agent 加载策略

### 快速开发 (加载分片)

```yaml
# 快速完成任务，加载精简文档
load_knowledge:
    - task: '创建列表页'
      files:
          - 'layout-standards.md'
          - 'list-development.md'

    - task: '创建表单页'
      files:
          - 'form-development.md'
          - 'data-binding.md'
```

### 深度开发 (加载详细文档)

```yaml
# 需要详细API时，加载完整组件文档
load_knowledge:
    - task: '复杂表格开发'
      files:
          - 'ep-components/components-eui-core-ep-datagrid.md'
          - 'api/api-hooks-data-model-hooks.md'

    - task: '树组件开发'
      files:
          - 'components/components-tree.md'
          - 'components/components-tree-select.md'

    - task: '文件上传'
      files:
          - 'components/components-upload.md'
          - 'ep-components/components-eui-core-ep-file-upload-service.md'

    - task: 'Tab内表格开发'
      files:
          - 'troubleshooting.md'
          - 'ep-components/components-eui-core-ep-datagrid.md'
          - 'components/components-tabs.md'

    - task: 'epoint API 详解'
      files:
          - 'api/api-core-overview.md'
```

## 快速导航

### 常用组件 (按使用频率排序)

| 组件            | 文档                                                                                     |
| --------------- | ---------------------------------------------------------------------------------------- |
| EpDataGrid 表格 | [components-eui-core-ep-datagrid.md](./ep-components/components-eui-core-ep-datagrid.md) |
| Input 输入框    | [components-input.md](./components/components-input.md)                                  |
| Select 选择器   | [components-select.md](./components/components-select.md)                                |
| Tree 树         | [components-tree.md](./components/components-tree.md)                                    |
| Upload 上传     | [components-upload.md](./components/components-upload.md)                                |

### 核心 API

| API      | 文档                                                         | 说明                           |
| -------- | ------------------------------------------------------------ | ------------------------------ |
| eui-core | [api-core-overview.md](./api/api-core-overview.md)           | 核心框架能力 (Utils, Hooks 等) |
| Utils    | [api-common-utils-index.md](./api/api-common-utils-index.md) | 通用工具函数                   |
| Hooks    | [api-core-hooks.md](./api/api-core-hooks.md)                 | 常用 Composition API           |

### 布局模板

| 布局     | 文档                                                            |
| -------- | --------------------------------------------------------------- |
| 容器布局 | [components-container.md](./components/components-container.md) |
| 常用示例 | [examples/container/](./examples/container/)                    |

## 技术栈

| 技术     | 版本 | 说明                                   |
| -------- | ---- | -------------------------------------- |
| Vue      | 3.x  | 核心框架                               |
| eui-core | -    | 企业级核心库 (@epframe/eui-core)       |
| e-comp   | -    | 基础组件库 (@epoint-fe/eui-components) |
| Pinia    | -    | 状态管理                               |

## 版本信息

- **框架版本**: 9.5.4-sp1
- **最后更新**: 2026-01-09
- **组件文档**: 96 个
- **框架文档**: 19 个

---

_epoint 前端开发规范 v9.5.4-sp1 | 完整组件库 + 框架 API_
