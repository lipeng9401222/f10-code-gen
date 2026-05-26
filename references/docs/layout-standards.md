# 布局规范

> epoint Vue 页面布局规范，所有前端开发必须遵守。

## 1. 适用范围与目标

- 适用范围：`Vue + EUI4` 页面结构搭建。
- 目标：统一页面骨架、降低布局实现差异、保障可维护性。

---

## 2. 布局实现优先级

统一按以下顺序实现布局：

1. **布局管理器 `ep-layout-manager`**（首选，标准业务页面）
2. **布局容器组件 `e-container` 系列**（备选，复杂自定义布局）
3. **栅格系统 `e-row/e-col`**（局部排布）
4. **辅助样式类**（细节对齐与间距）
5. **自定义 CSS**（仅兜底）

说明：辅助类与样式细则请配合 [style-development.md](style-development.md) 使用。

---

## 3. 布局管理器 ep-layout-manager（首选方案）

### 3.1 适用场景与选择建议

| 方案 | 适用场景 | 特点 |
|-----|---------|------|
| `ep-layout-manager` | 标准业务页面（列表页、左右布局、详情页等） | 快速搭建、配置简单、区域固定 |
| `e-container` 系列 | 复杂自定义布局、特殊嵌套结构 | 更灵活、精细控制嵌套关系 |

> **说明**：`ep-layout-manager` 是对 `e-container` 系列的封装，提供了更便捷的插槽式布局方式。对于标准业务页面，优先使用 `ep-layout-manager`；当需要复杂嵌套或特殊布局时，使用 `e-container` 系列。

**详细文档**：[ep-components/components-eui-core-ep-layout-manager.md](ep-components/components-eui-core-ep-layout-manager.md)

### 3.2 区域插槽

| 插槽 | 说明 | 使用场景 |
|-----|------|---------|
| `#top` | 顶部区域 | 工具栏、标题栏 |
| `#main` | 主内容区域 | 表格、表单（**必需**） |
| `#left` | 左侧区域 | 侧边导航树、分类筛选 |
| `#right` | 右侧区域 | 属性面板、辅助信息 |
| `#bottom` | 底部区域 | 状态栏、按钮区 |

### 3.3 区域配置

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

**配置属性说明**：

| 属性 | 说明 | 适用区域 |
|-----|------|---------|
| `enabled` | 是否启用该区域 | 所有区域 |
| `closed` | 是否默认收起 | 所有区域 |
| `resize` | 是否允许调整大小 | 所有区域 |
| `toggle` | 是否允许切换显示/隐藏 | 所有区域 |
| `defaultHeight` | 默认高度 | top/bottom 区域 |
| `defaultWidth` | 默认宽度 | left/right 区域 |
| `inset` | 是否在内侧（仅覆盖中间内容区） | top/bottom 区域 |

### 3.4 常见页面骨架模板

#### 基础示例（列表页）

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

#### 左右布局示例

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
      <ep-data-grid :data="tableData" :columns="columns" />
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

---

## 4. 布局容器组件 e-container 系列（备选方案）

> 用于复杂自定义布局场景，提供更精细的嵌套控制。
>
> **详细文档**：[components/components-container.md](components/components-container.md)

### 4.1 组件清单

| 组件            | 说明                              |
| --------------- | --------------------------------- |
| `<e-container>` | 包装容器，控制子元素横向/纵向排布 |
| `<e-header>`    | 头部区域                          |
| `<e-aside>`     | 左侧边栏                          |
| `<e-rightbar>`  | 右侧边栏                          |
| `<e-main>`      | 主内容区                          |
| `<e-footer>`    | 页脚区域                          |

### 4.2 常用属性

| 组件          | 属性                                          | 说明                                      |
| ------------- | --------------------------------------------- | ----------------------------------------- |
| `e-container` | `direction`                                   | 子元素布局方向：`horizontal` / `vertical` |
| `e-header`    | `height` `toggleable` `resizeable` `collapse` | 高度、收起、拖拽、折叠                    |
| `e-aside`     | `width` `toggleable` `resizeable` `collapse`  | 侧栏宽度及交互能力                        |
| `e-rightbar`  | `width` `toggleable` `resizeable` `collapse`  | 右栏宽度及交互能力                        |
| `e-footer`    | `height` `toggleable` `resizeable` `collapse` | 页脚高度及交互能力                        |

### 4.3 组合规则（必须遵守）

这些组件基于 Flex 布局，组合关系必须合法。

#### 允许

1. `Main` 可与其他容器组件同级。
2. `Container` 下可直接放 `Main + Header/Footer`。
3. `Container` 下可直接放 `Main + Aside/Rightbar`。

#### 禁止

| 禁止组合                 | 正确做法                               |
| ------------------------ | -------------------------------------- |
| `Header + Aside` 同级    | 用内层 `Container` 包裹 `Aside + Main` |
| `Header + Rightbar` 同级 | 用内层 `Container` 承载侧栏与主区      |
| `Footer + Aside` 同级    | 用内层 `Container` 分层                |
| `Footer + Rightbar` 同级 | 用内层 `Container` 分层                |

### 4.4 常见页面骨架模板

#### 上下结构（Header + Main）

```vue
<template>
    <div class="common-layout h-full">
        <e-container class="h-full overflow-y-auto">
            <e-header>Header</e-header>
            <e-main>Main</e-main>
        </e-container>
    </div>
</template>
```

#### 上中下结构（Header + Main + Footer）

```vue
<template>
    <div class="common-layout h-full">
        <e-container class="h-full overflow-y-auto">
            <e-header>Header</e-header>
            <e-main>Main</e-main>
            <e-footer>Footer</e-footer>
        </e-container>
    </div>
</template>
```

#### 左右结构（Aside + Main）

```vue
<template>
    <div class="common-layout h-full">
        <e-container class="h-full overflow-y-auto">
            <e-aside width="200px">Aside</e-aside>
            <e-main>Main</e-main>
        </e-container>
    </div>
</template>
```

#### 左树右表（Header + Aside + Main）

```vue
<template>
    <div class="common-layout h-full">
        <e-container class="h-full overflow-y-auto">
            <e-header>Header</e-header>
            <e-container>
                <e-aside width="240px">Aside</e-aside>
                <e-main>Main</e-main>
            </e-container>
        </e-container>
    </div>
</template>
```

---

## 5. 栅格布局（Row / Col）

使用 24 栅格做局部区域排版，不替代页面骨架容器。

### 5.1 基础示例

```vue
<template>
    <e-row :gutter="20">
        <e-col :span="12">左侧内容</e-col>
        <e-col :span="12">右侧内容</e-col>
    </e-row>
</template>
```

### 5.2 属性说明

#### Row

| 属性      | 说明     | 值                                                         |
| --------- | -------- | ---------------------------------------------------------- |
| `gutter`  | 栅格间距 | `number`                                                   |
| `justify` | 水平排列 | `start/end/center/space-around/space-between/space-evenly` |
| `align`   | 垂直排列 | `top/middle/bottom`                                        |

#### Col

| 属性     | 说明              | 值       |
| -------- | ----------------- | -------- |
| `span`   | 占列数（24 分栏） | `number` |
| `offset` | 左偏移列数        | `number` |
| `push`   | 向右移动列数      | `number` |
| `pull`   | 向左移动列数      | `number` |

### 5.3 响应式断点

| 断点 | 尺寸       | 示例      |
| ---- | ---------- | --------- |
| `xs` | `<768px`   | `:xs="8"` |
| `sm` | `>=768px`  | `:sm="6"` |
| `md` | `>=992px`  | `:md="4"` |
| `lg` | `>=1200px` | `:lg="3"` |
| `xl` | `>=1920px` | `:xl="1"` |

---

## 6. Toolbar 使用规范

`<e-toolbar>` 用于列表页工具栏区域，优先替代手写按钮/筛选条布局。

> **详细文档**：[components/components-toolbar.md](components/components-toolbar.md)

### 6.1 结构

```vue
<e-toolbar>
    <template #button>按钮区</template>
    <template #filter>筛选区</template>
    <template #actions>辅助操作区</template>
</e-toolbar>
```

### 6.2 常用属性

| 属性              | 说明               | 默认值  |
| ----------------- | ------------------ | ------- |
| `title`           | 标题文本           | `null`  |
| `title-block`     | 标题是否独占一行   | `false` |
| `button-position` | 按钮区位置         | `left`  |
| `button-block`    | 钮区是否独占一行 | `false` |
| `filter-position` | 筛选区位置         | `right` |
| `filter-block`    | 筛选区是否独占一行 | `false` |
| `filter-divider`  | 筛选区右侧分割线   | `false` |

### 6.3 使用注意

1. 筛选区用 `e-form` 时，需处理 `e-form-item` 的底部间距，避免高度抖动。
2. 筛选项动态变化后，需触发 toolbar 的超载刷新能力（`filterSizeRefresh` 相关机制）。
3. `e-toolbar` 内避免再次嵌套布局容器组件。

---

## 7. 响应式隐藏类

如需响应式显示/隐藏，先引入：

```js
import 'eui-vue/theme-chalk/display.css';
```

常用类名：

- `hidden-xs-only`
- `hidden-sm-only` `hidden-sm-and-down` `hidden-sm-and-up`
- `hidden-md-only` `hidden-md-and-down` `hidden-md-and-up`
- `hidden-lg-only` `hidden-lg-and-down` `hidden-lg-and-up`
- `hidden-xl-only`

---

## 8. 布局开发红线

### 8.1 必须

1. 页面骨架必须使用 `ep-layout-manager` 或 `e-container` 体系。
2. 标准业务页面优先使用 `ep-layout-manager`。
3. 严格遵守容器组合规则（e-container 系列）。
4. 颜色、间距等样式值使用 CSS 变量或辅助类语义类。
5. 父级容器保证可撑满（如 `h-full`），避免布局塌陷。

### 8.2 禁止

1. 禁止在 `Container` 外孤立使用 `Header/Aside/Footer`。
2. 禁止 `Header/Footer` 与 `Aside/Rightbar` 非法同级（e-container 系列）。
3. 禁止硬编码颜色和布局关键尺寸。
4. 禁止用大量 inline style 代替规范化布局。
5. 禁止在 `ep-layout-manager` 的插槽外直接放置 `e-container` 子组件（如 `e-header`、`e-aside`）。

---

## 9. 提交前自检

1. 页面骨架是否由布局管理器或容器组件搭建？
2. 标准业务页面是否优先使用 `ep-layout-manager`？
3. 使用 `e-container` 系列时，是否存在非法同级组合？
4. 局部复杂排版是否优先用栅格系统？
5. 工具栏是否优先使用 `e-toolbar`？
6. 是否消除了硬编码样式值与无必要 inline 样式？

---

## 10. 示例与关联文档

| 文档类型 | 本地路径 |
|---------|---------|
| 布局管理器详细文档 | [ep-components/components-eui-core-ep-layout-manager.md](ep-components/components-eui-core-ep-layout-manager.md) |
| 容器组件详细文档 | [components/components-container.md](components/components-container.md) |
| 基础布局文档 | [components/components-layout.md](components/components-layout.md) |
| Toolbar 文档 | [components/components-toolbar.md](components/components-toolbar.md) |
| 列表开发 | [list-development.md](list-development.md) |
| 样式开发 | [style-development.md](style-development.md) |

---

_epoint 框架前端开发规范（Vue 版）_