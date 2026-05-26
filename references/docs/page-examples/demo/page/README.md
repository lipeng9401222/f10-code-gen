# 页面示例目录结构说明 (Page Demo Directory Structure)

此目录包含了框架典型页面、交互模式及框架组件的 Vue 示例页面。目录结构旨在提供一套标准的 F10 Vue 组件开发参考模板。

## 详细目录与文件规划

```text
packages/examples/src/views/demo/page/
├── typical/                     # 典型页面
│   ├── form/                    # 表单页
│   │   ├── layout/              # 表单布局
│   │   │   ├── base.vue                # 基础结构
│   │   │   ├── section-vertical.vue    # 纵向分区
│   │   │   ├── horizontal-outer.vue    # 左右分区-外分区
│   │   │   ├── horizontal-inner.vue    # 左右分区-内分区
│   │   │   └── summary-layout.vue      # 概要布局
│   │   ├── toolbar/             # 操作区
│   │   │   ├── toolbar-top.vue         # 顶部按钮栏
│   │   │   ├── toolbar-bottom.vue      # 底部按钮栏
│   │   │   └── toolbar-bottom-dialog.vue # 底部按钮栏-弹窗
│   │   ├── navigation/          # 导航区
│   │   │   ├── side-directory.vue      # 侧栏目录导航
│   │   │   ├── side-directory-fixed.vue# 侧栏目录导航-定宽表单
│   │   │   ├── tab-navigation.vue      # 顶栏 Tab 导航
│   │   │   └── step-navigation.vue     # 顶栏步骤导航
│   │   └── content/             # 内容填充布局
│   │       ├── group-accordion.vue     # 手风琴布局
│   │       ├── group-block.vue         # 区块布局
│   │       ├── tab-layout.vue          # Tab 布局
│   │       └── more-layout.vue         # 更多布局
│   ├── list/                    # 列表页
│   │   ├── layout/              # 列表基础布局
│   │   │   ├── base.vue                # 基础结构
│   │   │   ├── horizontal-nav.vue      # 同级导航结构
│   │   │   └── partition-structure.vue # 分区结构
│   │   ├── operation/           # 操作/工具栏
│   │   │   ├── single-line.vue         # 单行工具栏
│   │   │   └── double-line.vue         # 双行工具栏
│   │   ├── navigation/          # 导航/树
│   │   │   ├── side-tree.vue           # 侧栏树导航
│   │   │   ├── title-select.vue        # 顶栏标题下拉导航
│   │   │   └── top-card.vue            # 顶栏指标卡导航
│   │   └── content/             # 表格/数据内容
│   │       ├── tree-grid.vue           # 树状表格
│   │       ├── inline-detail-grid.vue  # 嵌套表格
│   │       └── column-template.vue     # 多字段同列（列模板）
│   ├── detail/                  # 详情页
│   │   └── layout/
│   │       ├── base.vue                # 详情基础形式
│   │       └── table.vue               # 表格形式
│   ├── chosen/                  # 选择页
│   │   ├── person-depart.vue           # 选人/选部门
│   │   └── select-data.vue             # 弹窗选择数据
│   ├── status/                  # 状态/异常页
│   │   ├── error/
│   │   │   ├── error-403.vue           # 无权限
│   │   │   ├── error-404.vue           # 页面未找到
│   │   │   ├── error-500.vue           # 服务器错误
│   │   │   ├── error-construction.vue  # 功能建设中
│   │   │   ├── error-incompatible.vue  # 浏览器不兼容
│   │   │   └── error-maintenance.vue   # 系统维护中
│   │   └── empty/
│   │       ├── status-empty.vue        # 缺省提示 (文字+按钮)
│   │       ├── datagrid-empty.vue      # 表格缺省提示 (仅文字)
│   │       └── datagrid-empty-withbtn.vue     # 表格缺省提示 (带按钮)
│   │   └── feedback/           # 状态管理
│   │       └── feedback-success.vue         # 创建成功
│   │       └── feedback-error.vue           # 创建失败
│   │       └── improve-information.vue      # 完善信息
│   └── dialog/                  # 弹窗示例
│       ├── base-dialog.vue             # 基础弹窗
│       ├── drawer-dialog.vue           # 抽屉弹窗
│       ├── embed-dialog.vue            # 嵌入式弹窗
│       └── full-screen-dialog.vue      # 全屏弹窗
├── interaction/                 # 交互模式
│   └── scenario/
│       └── notice/
│           ├── system-notice.vue       # 系统级提示
│           ├── tour-notice.vue         # 通知引导/漫游式引导
│           └── popover-notice.vue      # 气泡式说明
└── framework/                   # 框架组件
    ├── dynamic/
    │   ├── list-edit.vue               # 动态列表编辑
    │   ├── datagrid-edit.vue           # 动态表格编辑
    │   ├── drawer-edit.vue             # 动态弹框编辑
    │   └── form-edit.vue               # 动态表单编辑
    └── toolbar/
    │   └── view-switch.vue             # 视图切换组件
    └── transfer/
        └── transfer-grid.vue           # 表格穿梭框组件
        └── transfer-grid-dialog.vue    # 表格穿梭框组件-弹窗
```
