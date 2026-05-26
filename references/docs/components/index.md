# epoint 前端组件索引

> **本索引是前端组件知识库的权威信息源**，包含完整的组件分类映射和核心组件速查。

---

## 📁 文档结构

```
frontend/components/
├── index.md                        # 📋 本文件 - 前端组件权威入口
│
├── 基础组件/
│   ├── components-button.md        # 🔘 按钮
│   ├── components-icon.md          # 🎨 图标
│   ├── components-link.md          # 🔗 文字链接
│   ├── components-typography.md    # 📝 排版（文本）
│   └── components-border.md        # 🔲 边框
│
├── 布局组件/
│   ├── components-layout.md        # 📐 布局容器
│   ├── components-container.md     # 📦 容器
│   ├── components-space.md         # ↕️ 间距
│   ├── components-divider.md       # ➖ 分割线
│   ├── components-skeleton.md      # 💀 骨架屏
│   └── components-scrollbar.md     # 📜 滚动条
│
├── 表单组件/
│   ├── components-form.md          # 📋 表单
│   ├── components-input.md         # ⌨️ 输入框
│   ├── components-input-number.md  # 🔢 数字输入
│   ├── components-input-tag.md     # 🏷️ 标签输入
│   ├── components-select.md        # 📑 选择器
│   ├── components-select-virtual.md# 📑 虚拟滚动选择器
│   ├── components-checkbox.md      # ☑️ 复选框
│   ├── components-radio.md         # ☑️ 单选框
│   ├── components-switch.md        # 🔘 开关
│   ├── components-slider.md        # ↔️ 滑块
│   ├── components-rate.md          # ⭐ 评分
│   ├── components-cascader.md      # 🌲 级联选择
│   ├── components-transfer.md      # ⇄ 穿梭框
│   ├── components-mention.md       # 💬 提及
│   ├── components-autocomplete.md  # ✨ 自动完成
│   ├── components-date-picker.md   # 📅 日期选择
│   ├── components-time-picker.md   # 🕐 时间选择
│   ├── components-time-select.md   # 🕐 时间段选择
│   ├── components-datetime-picker.md # 📅 日期时间选择
│   ├── components-upload.md        # 📤 上传
│   ├── components-file-upload.md   # 📄 文件上传
│   ├── components-image-upload.md  # 🖼️ 图片上传
│   ├── components-color-picker.md  # 🎨 颜色选择器
│   ├── components-color.md         # 🎨 颜色
│   ├── components-color-palette.md # 🎨 色板
│   └── components-verify-code.md   # 🔐 验证码
│
├── 数据展示/
│   ├── components-table.md         # 📊 表格
│   ├── components-card.md          # 🃏 卡片
│   ├── components-pagination.md    # 📄 分页
│   ├── components-tree.md          # 🌲 树形控件
│   ├── components-tree-select.md   # 🌲 树选择
│   ├── components-tag.md           # 🏷️ 标签
│   ├── components-badge.md         # 🔵 徽标
│   ├── components-avatar.md        # 👤 头像
│   ├── components-descriptions.md  # 📝 描述列表
│   ├── components-statistic.md     # 📈 统计数值
│   ├── components-timeline.md      # 📅 时间轴
│   ├── components-steps.md         # 📶 步骤条
│   ├── components-collapse.md      # 📁 折叠面板
│   ├── components-calendar.md      # 📅 日历
│   ├── components-carousel.md      # 🎡 走马灯
│   ├── components-image.md         # 🖼️ 图片
│   ├── components-output.md        # 📤 输出
│   ├── components-empty.md         # 🚫 空状态
│   ├── components-result.md        # ✅ 结果
│   ├── components-page-header.md   # 📄 页头
│   └── components-watermark.md     # 💧 水印
│
├── 反馈组件/
│   ├── components-alert.md         # ⚠️ 警告提示
│   ├── components-dialog.md        # 💬 对话框
│   ├── components-drawer.md        # 🗄️ 抽屉
│   ├── components-popover.md       # 💭 气泡卡片
│   ├── components-popconfirm.md    # ❓ 气泡确认框
│   ├── components-tooltip.md       # 💡 文字提示
│   ├── components-message-box.md   # 📨 消息弹框
│   ├── components-message.md       # 📨 消息提示
│   ├── components-notification.md  # 🔔 通知提醒
│   ├── components-loading.md       # ⏳ 加载
│   ├── components-progress.md      # 📊 进度条
│   ├── components-float-button.md  # 🔘 悬浮按钮
│   ├── components-backtop.md       # ⬆️ 返回顶部
│   ├── components-tour.md          # 🎯 漫游式引导
│   └── components-infinite-scroll.md # ♾️ 无限滚动
│
├── 导航组件/
│   ├── components-menu.md          # 📋 导航菜单
│   ├── components-breadcrumb.md    # 🔍 面包屑
│   ├── components-tabs.md          # 📑 标签页
│   ├── components-anchor.md        # ⚓ 锚点
│   ├── components-affix.md         # 📌 固钉
│   ├── components-segmented.md     # 📊 分段控制器
│   └── components-dropdown.md      # 📋 下拉菜单
│
└── 其他组件/
    ├── components-config-provider.md  # ⚙️ 全局配置
    ├── components-file-icon.md        # 📄 文件图标
    ├── components-file-list.md        # 📄 文件列表
    ├── components-toolbar.md          # 🔧 工具栏
    └── components-overview.md         # 📖 组件总览
```

> 📌 **注意**: 前端开发规范文档请参阅 [framework/frontend/](../frontend/)

---

## 📋 组件清单

### 基础组件

| 组件名称   | 文档                                           | 说明                    |
| ---------- | ---------------------------------------------- | ----------------------- |
| Button     | [components-button.md](./components-button.md)   | 按钮，支持多种样式和尺寸 |
| Icon       | [components-icon.md](./components-icon.md)       | 图标组件                |
| Link       | [components-link.md](./components-link.md)       | 文字链接                |
| Typography | [components-typography.md](./components-typography.md) | 排版（文本）            |
| Border     | [components-border.md](./components-border.md)   | 边框                    |

### 布局组件

| 组件名称  | 文档                                             | 说明           |
| --------- | ------------------------------------------------ | -------------- |
| Layout    | [components-layout.md](./components-layout.md)     | 布局容器       |
| Container | [components-container.md](./components-container.md) | 容器           |
| Space     | [components-space.md](./components-space.md)       | 间距           |
| Divider   | [components-divider.md](./components-divider.md)   | 分割线         |
| Skeleton  | [components-skeleton.md](./components-skeleton.md) | 骨架屏         |
| Scrollbar | [components-scrollbar.md](./components-scrollbar.md) | 滚动条         |

### 表单组件

| 组件名称        | 文档                                                   | 说明           |
| --------------- | ------------------------------------------------------ | -------------- |
| Form            | [components-form.md](./components-form.md)               | 表单           |
| Input           | [components-input.md](./components-input.md)             | 输入框         |
| InputNumber     | [components-input-number.md](./components-input-number.md) | 数字输入       |
| InputTag        | [components-input-tag.md](./components-input-tag.md)     | 标签输入       |
| Select          | [components-select.md](./components-select.md)           | 选择器         |
| SelectVirtual   | [components-select-virtual.md](./components-select-virtual.md) | 虚拟滚动选择器 |
| Checkbox        | [components-checkbox.md](./components-checkbox.md)       | 复选框         |
| Radio           | [components-radio.md](./components-radio.md)             | 单选框         |
| Switch          | [components-switch.md](./components-switch.md)           | 开关           |
| Slider          | [components-slider.md](./components-slider.md)           | 滑块           |
| Rate            | [components-rate.md](./components-rate.md)               | 评分           |
| Cascader        | [components-cascader.md](./components-cascader.md)       | 级联选择       |
| Transfer        | [components-transfer.md](./components-transfer.md)       | 穿梭框         |
| Mention         | [components-mention.md](./components-mention.md)         | 提及           |
| Autocomplete    | [components-autocomplete.md](./components-autocomplete.md) | 自动完成       |
| DatePicker      | [components-date-picker.md](./components-date-picker.md) | 日期选择       |
| TimePicker      | [components-time-picker.md](./components-time-picker.md) | 时间选择       |
| TimeSelect      | [components-time-select.md](./components-time-select.md) | 时间段选择     |
| DatetimePicker  | [components-datetime-picker.md](./components-datetime-picker.md) | 日期时间选择   |
| Upload          | [components-upload.md](./components-upload.md)           | 上传           |
| FileUpload      | [components-file-upload.md](./components-file-upload.md) | 文件上传       |
| ImageUpload     | [components-image-upload.md](./components-image-upload.md) | 图片上传       |
| ColorPicker     | [components-color-picker.md](./components-color-picker.md) | 颜色选择器     |
| Color           | [components-color.md](./components-color.md)             | 颜色           |
| ColorPalette    | [components-color-palette.md](./components-color-palette.md) | 色板           |
| VerifyCode      | [components-verify-code.md](./components-verify-code.md) | 验证码         |

### 数据展示

| 组件名称     | 文档                                                       | 说明           |
| ------------ | ---------------------------------------------------------- | -------------- |
| Table        | [components-table.md](./components-table.md)                 | 表格           |
| Card         | [components-card.md](./components-card.md)                   | 卡片           |
| Pagination   | [components-pagination.md](./components-pagination.md)       | 分页           |
| Tree         | [components-tree.md](./components-tree.md)                   | 树形控件       |
| TreeSelect   | [components-tree-select.md](./components-tree-select.md)     | 树选择         |
| Tag          | [components-tag.md](./components-tag.md)                     | 标签           |
| Badge        | [components-badge.md](./components-badge.md)                 | 徽标           |
| Avatar       | [components-avatar.md](./components-avatar.md)               | 头像           |
| Descriptions | [components-descriptions.md](./components-descriptions.md)   | 描述列表       |
| Statistic    | [components-statistic.md](./components-statistic.md)         | 统计数值       |
| Timeline     | [components-timeline.md](./components-timeline.md)           | 时间轴         |
| Steps        | [components-steps.md](./components-steps.md)                 | 步骤条         |
| Collapse     | [components-collapse.md](./components-collapse.md)           | 折叠面板       |
| Calendar     | [components-calendar.md](./components-calendar.md)           | 日历           |
| Carousel     | [components-carousel.md](./components-carousel.md)           | 走马灯         |
| Image        | [components-image.md](./components-image.md)                 | 图片           |
| Output       | [components-output.md](./components-output.md)               | 输出           |
| Empty        | [components-empty.md](./components-empty.md)                 | 空状态         |
| Result       | [components-result.md](./components-result.md)               | 结果           |
| PageHeader   | [components-page-header.md](./components-page-header.md)     | 页头           |
| Watermark    | [components-watermark.md](./components-watermark.md)         | 水印           |

### 反馈组件

| 组件名称       | 文档                                                         | 说明       |
| -------------- | ------------------------------------------------------------ | ---------- |
| Alert          | [components-alert.md](./components-alert.md)                   | 警告提示   |
| Dialog         | [components-dialog.md](./components-dialog.md)                 | 对话框     |
| Drawer         | [components-drawer.md](./components-drawer.md)                 | 抽屉       |
| Popover        | [components-popover.md](./components-popover.md)               | 气泡卡片   |
| Popconfirm     | [components-popconfirm.md](./components-popconfirm.md)         | 气泡确认框 |
| Tooltip        | [components-tooltip.md](./components-tooltip.md)               | 文字提示   |
| MessageBox     | [components-message-box.md](./components-message-box.md)       | 消息弹框   |
| Message        | [components-message.md](./components-message.md)               | 消息提示   |
| Notification   | [components-notification.md](./components-notification.md)     | 通知提醒   |
| Loading        | [components-loading.md](./components-loading.md)               | 加载       |
| Progress       | [components-progress.md](./components-progress.md)             | 进度条     |
| FloatButton    | [components-float-button.md](./components-float-button.md)     | 悬浮按钮   |
| Backtop        | [components-backtop.md](./components-backtop.md)               | 返回顶部   |
| Tour           | [components-tour.md](./components-tour.md)                     | 漫游式引导 |
| InfiniteScroll | [components-infinite-scroll.md](./components-infinite-scroll.md) | 无限滚动   |

### 导航组件

| 组件名称  | 文档                                               | 说明         |
| --------- | -------------------------------------------------- | ------------ |
| Menu      | [components-menu.md](./components-menu.md)           | 导航菜单     |
| Breadcrumb| [components-breadcrumb.md](./components-breadcrumb.md) | 面包屑     |
| Tabs      | [components-tabs.md](./components-tabs.md)           | 标签页       |
| Anchor    | [components-anchor.md](./components-anchor.md)       | 锚点         |
| Affix     | [components-affix.md](./components-affix.md)         | 固钉         |
| Segmented | [components-segmented.md](./components-segmented.md) | 分段控制器   |
| Dropdown  | [components-dropdown.md](./components-dropdown.md)   | 下拉菜单     |

### 其他组件

| 组件名称       | 文档                                                       | 说明       |
| -------------- | ---------------------------------------------------------- | ---------- |
| ConfigProvider | [components-config-provider.md](./components-config-provider.md) | 全局配置 |
| FileIcon       | [components-file-icon.md](./components-file-icon.md)         | 文件图标   |
| FileList       | [components-file-list.md](./components-file-list.md)         | 文件列表   |
| Toolbar        | [components-toolbar.md](./components-toolbar.md)             | 工具栏     |
| Overview       | [components-overview.md](./components-overview.md)           | 组件总览   |

---

## 🤖 AI Agent 加载策略

> **这是前端组件查询的权威加载策略**，请按以下指引加载文档。

```yaml
load_knowledge:
  - task: "创建基础表单"
    files:
      - "components-form.md"
      - "components-input.md"
      - "components-select.md"
      - "components-button.md"

  - task: "创建数据表格"
    files:
      - "components-table.md"
      - "components-pagination.md"
      - "components-button.md"

  - task: "创建对话框表单"
    files:
      - "components-dialog.md"
      - "components-form.md"
      - "components-input.md"
      - "components-button.md"

  - task: "创建导航菜单"
    files:
      - "components-menu.md"
      - "components-breadcrumb.md"
      - "components-layout.md"

  - task: "创建文件上传"
    files:
      - "components-file-upload.md"
      - "components-image-upload.md"
      - "components-upload.md"

  - task: "创建日期时间选择"
    files:
      - "components-date-picker.md"
      - "components-time-picker.md"
      - "components-datetime-picker.md"

  - task: "创建数据展示卡片"
    files:
      - "components-card.md"
      - "components-descriptions.md"
      - "components-statistic.md"

  - task: "创建树形控件"
    files:
      - "components-tree.md"
      - "components-tree-select.md"

  - task: "创建消息提示"
    files:
      - "components-message.md"
      - "components-notification.md"
      - "components-alert.md"

  - task: "完整 CRUD 页面"
    files:
      - "components-table.md"
      - "components-form.md"
      - "components-dialog.md"
      - "components-pagination.md"
      - "components-button.md"
      - "components-input.md"
      - "components-select.md"
```

---

## 🔥 核心组件速查

> ⚠️ **重要**: 以下是项目中最常用的核心组件，**前端开发时优先参考**。

### 数据录入

| 组件   | 使用场景                                  | 文档                                     |
| ------ | ----------------------------------------- | ---------------------------------------- |
| Table  | 展示和操作大量结构化数据                  | [components-table.md](./components-table.md) |
| Form   | 数据收集、验证和提交                      | [components-form.md](./components-form.md) |
| Input  | 单行文本输入                              | [components-input.md](./components-input.md) |
| Select | 从多个选项中选择一个或多个                | [components-select.md](./components-select.md) |
| DatePicker | 日期选择                       | [components-date-picker.md](./components-date-picker.md) |

### 数据展示

| 组件   | 使用场景              | 文档                                       |
| ------ | --------------------- | ------------------------------------------ |
| Card   | 内容分组和展示        | [components-card.md](./components-card.md)   |
| Descriptions | 展示只读的数据字段 | [components-descriptions.md](./components-descriptions.md) |
| Tag    | 标记和分类            | [components-tag.md](./components-tag.md)     |

### 操作反馈

| 组件     | 使用场景                   | 文档                                           |
| -------- | -------------------------- | ---------------------------------------------- |
| Dialog   | 需要用户处理事务的弹窗     | [components-dialog.md](./components-dialog.md) |
| Message  | 轻量级的信息提示           | [components-message.md](./components-message.md) |
| Notification | 全局通知提醒         | [components-notification.md](./components-notification.md) |

### 导航

| 组件  | 使用场景       | 文档                                       |
| ----- | -------------- | ------------------------------------------ |
| Menu  | 导航菜单       | [components-menu.md](./components-menu.md) |
| Breadcrumb | 显示当前页面路径 | [components-breadcrumb.md](./components-breadcrumb.md) |
| Tabs  | 选项卡切换     | [components-tabs.md](./components-tabs.md) |

---

## 版本信息

- **组件库**: epoint Frontend Components
- **框架**: Vue 3 + Element Plus
- **最后更新**: 2026-01-19

---

_epoint 前端组件索引 | 权威分类映射 | 核心组件速查_
