---
title: 样式类
originUrl: http://192.168.219.170/docs/vue/latest/component/guide/utility-classes.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/guide/utility-classes.html)

EUI4 提供了一套完整的辅助样式类，包含布局、间距、字体、颜色等常用样式。这些原子化的样式类基于 EUI4 的基础变量系统构建，让您能够快速组合出复杂的界面效果，无需编写自定义 CSS，同时确保整体设计的一致性和可维护性。

## 使用方式

```vue
<template>
  <!-- 使用间距和排版样式类 -->
  <div class="p-l my-xl text-primary fw-md">快速样式应用</div>

  <!-- 组合多个样式类 -->
  <div class="bg-primary text-white px-xl py-m rounded shadow">样式卡片</div>
</template>
```

## 布局与定位类

提供现代 Flex 布局和传统浮动布局的完整辅助类。

:::demo 展示 Flex 布局的方向、对齐方式以及浮动布局的应用效果。

utility-classes/layout

:::

### Flex 布局基础

| 类名          | 属性                   | 描述         |
| ------------- | ---------------------- | ------------ |
| `flex`        | `display: flex`        | 弹性布局     |
| `inline-flex` | `display: inline-flex` | 内联弹性布局 |

### Flex 方向

| 类名               | 属性                             | 描述         |
| ------------------ | -------------------------------- | ------------ |
| `flex-row`         | `flex-direction: row`            | 水平排列     |
| `flex-col`         | `flex-direction: column`         | 垂直排列     |
| `flex-row-reverse` | `flex-direction: row-reverse`    | 水平反向排列 |
| `flex-col-reverse` | `flex-direction: column-reverse` | 垂直反向排列 |

### 主轴对齐（Justify Content）

| 类名              | 属性                             | 描述         |
| ----------------- | -------------------------------- | ------------ |
| `justify-start`   | `justify-content: flex-start`    | 起始位置对齐 |
| `justify-center`  | `justify-content: center`        | 居中对齐     |
| `justify-end`     | `justify-content: flex-end`      | 结束位置对齐 |
| `justify-between` | `justify-content: space-between` | 两端分布     |
| `justify-around`  | `justify-content: space-around`  | 环绕分布     |
| `justify-evenly`  | `justify-content: space-evenly`  | 平均分布     |

### 交叉轴对齐（Align Items）

| 类名             | 属性                      | 描述         |
| ---------------- | ------------------------- | ------------ |
| `items-start`    | `align-items: flex-start` | 起始位置对齐 |
| `items-center`   | `align-items: center`     | 居中对齐     |
| `items-end`      | `align-items: flex-end`   | 结束位置对齐 |
| `items-stretch`  | `align-items: stretch`    | 拉伸对齐     |
| `items-baseline` | `align-items: baseline`   | 基线对齐     |

### Flex 换行

| 类名                | 属性                      | 描述     |
| ------------------- | ------------------------- | -------- |
| `flex-wrap`         | `flex-wrap: wrap`         | 允许换行 |
| `flex-nowrap`       | `flex-wrap: nowrap`       | 不换行   |
| `flex-wrap-reverse` | `flex-wrap: wrap-reverse` | 反向换行 |

### Flex 项目属性

| 类名        | 属性             | 描述       |
| ----------- | ---------------- | ---------- |
| `flex-1`    | `flex: 1 1 0%`   | 等比例伸缩 |
| `flex-auto` | `flex: 1 1 auto` | 自动伸缩   |
| `flex-none` | `flex: none`     | 不伸缩     |

### Gap 间距

| 类名        | 间距值                 | 实际默认值 | 描述       |
| ----------- | ---------------------- | ---------- | ---------- |
| `gap-0`     | `gap: 0`               | `0`        | 零间距     |
| `gap-xs`    | `var(--e-space-xs)`    | `2px`      | 超小间距   |
| `gap-s`     | `var(--e-space-s)`     | `4px`      | 小间距     |
| `gap-m`     | `var(--e-space-m)`     | `8px`      | 中等间距   |
| `gap-l`     | `var(--e-space-l)`     | `12px`     | 大间距     |
| `gap-xl`    | `var(--e-space-xl)`    | `16px`     | 超大间距   |
| `gap-xxl`   | `var(--e-space-xxl)`   | `24px`     | 特大间距   |
| `gap-xxxl`  | `var(--e-space-xxxl)`  | `36px`     | 巨大间距   |

### Float 浮动

| 类名          | 属性                                                    | 描述     |
| ------------- | ------------------------------------------------------- | -------- |
| `float-left`  | `float: left`                                           | 左浮动   |
| `float-right` | `float: right`                                          | 右浮动   |
| `float-none`  | `float: none`                                           | 清除浮动 |
| `clearfix`    | `::after { content: ""; display: table; clear: both; }` | 清除浮动 |

## 尺寸类

展示不同组件尺寸的对比效果，帮助理解各尺寸规格的视觉差异。

:::demo 通过不同尺寸的元素对比，展示从 mini 到 large 的四种标准尺寸，以及宽高百分比和特殊值。

utility-classes/sizes

:::

### 高度类（Height）

| 类名       | 属性值                | 实际默认值 | 描述     |
| ---------- | --------------------- | ---------- | -------- |
| `h-xs`     | `var(--e-size-mini)`  | `24px`     | 超小高度 |
| `h-sm`     | `var(--e-size-small)` | `28px`     | 小高度   |
| `h-md`     | `var(--e-size-base)`  | `32px`     | 默认高度 |
| `h-lg`     | `var(--e-size-large)` | `38px`     | 大高度   |
| `h-full`   | `height: 100%`        | `100%`     | 满高度   |
| `h-screen` | `height: 100vh`       | `100vh`    | 视口高度 |
| `h-auto`   | `height: auto`        | `auto`     | 自动高度 |
| `h-0`      | `height: 0`           | `0`        | 零高度   |

### 最小/最大高度

| 类名           | 属性                | 描述         |
| -------------- | ------------------- | ------------ |
| `min-h-0`      | `min-height: 0`     | 最小高度为 0 |
| `min-h-full`   | `min-height: 100%`  | 最小满高度   |
| `min-h-screen` | `min-height: 100vh` | 最小视口高度 |
| `max-h-full`   | `max-height: 100%`  | 最大满高度   |
| `max-h-screen` | `max-height: 100vh` | 最大视口高度 |

### 宽度类（Width）

| 类名       | 属性值                | 实际默认值 | 描述     |
| ---------- | --------------------- | ---------- | -------- |
| `w-xs`     | `var(--e-size-mini)`  | `24px`     | 超小宽度 |
| `w-sm`     | `var(--e-size-small)` | `28px`     | 小宽度   |
| `w-md`     | `var(--e-size-base)`  | `32px`     | 默认宽度 |
| `w-lg`     | `var(--e-size-large)` | `38px`     | 大宽度   |
| `w-full`   | `width: 100%`         | `100%`     | 满宽度   |
| `w-screen` | `width: 100vw`        | `100vw`    | 视口宽度 |
| `w-auto`   | `width: auto`         | `auto`     | 自动宽度 |
| `w-0`      | `width: 0`            | `0`        | 零宽度   |

### 最小/最大宽度

| 类名         | 属性              | 描述         |
| ------------ | ----------------- | ------------ |
| `min-w-0`    | `min-width: 0`    | 最小宽度为 0 |
| `min-w-full` | `min-width: 100%` | 最小满宽度   |
| `max-w-full` | `max-width: 100%` | 最大满宽度   |

## 间距类

演示不同间距大小的视觉效果，包括外边距、内边距和方向性间距的应用。

:::demo 间距类提供了从 xs 到 xxxl 的七种尺寸，支持全方向和单方向的间距设置。

utility-classes/spacing

:::

### Margin 外边距

| 类名     | 间距值                | 实际默认值 | 描述       |
| -------- | --------------------- | ---------- | ---------- |
| `m-0`    | `margin: 0`           | `0`        | 零外边距   |
| `m-xs`   | `var(--e-space-xs)`   | `2px`      | 超小外边距 |
| `m-s`    | `var(--e-space-s)`    | `4px`      | 小外边距   |
| `m-m`    | `var(--e-space-m)`    | `8px`      | 中等外边距 |
| `m-l`    | `var(--e-space-l)`    | `12px`     | 大外边距   |
| `m-xl`   | `var(--e-space-xl)`   | `16px`     | 超大外边距 |
| `m-xxl`  | `var(--e-space-xxl)`  | `24px`     | 特大外边距 |
| `m-xxxl` | `var(--e-space-xxxl)` | `36px`     | 巨大外边距 |

### 方向性外边距

其中 `{size}` 可替换为 `0`, `xs`, `s`, `m`, `l`, `xl`, `xxl`, `xxxl`

| 类名        | 描述       |
| ----------- | ---------- |
| `mt-{size}` | 上外边距   |
| `mr-{size}` | 右外边距   |
| `mb-{size}` | 下外边距   |
| `ml-{size}` | 左外边距   |
| `mx-{size}` | 水平外边距 |
| `my-{size}` | 垂直外边距 |

### Padding 内边距

| 类名     | 间距值                | 实际默认值 | 描述       |
| -------- | --------------------- | ---------- | ---------- |
| `p-0`    | `padding: 0`          | `0`        | 零内边距   |
| `p-xs`   | `var(--e-space-xs)`   | `2px`      | 超小内边距 |
| `p-s`    | `var(--e-space-s)`    | `4px`      | 小内边距   |
| `p-m`    | `var(--e-space-m)`    | `8px`      | 中等内边距 |
| `p-l`    | `var(--e-space-l)`    | `12px`     | 大内边距   |
| `p-xl`   | `var(--e-space-xl)`   | `16px`     | 超大内边距 |
| `p-xxl`  | `var(--e-space-xxl)`  | `24px`     | 特大内边距 |
| `p-xxxl` | `var(--e-space-xxxl)` | `36px`     | 巨大内边距 |

### 方向性内边距

其中 `{size}` 可替换为 `0`, `xs`, `s`, `m`, `l`, `xl`, `xxl`, `xxxl`

| 类名        | 描述       |
| ----------- | ---------- |
| `pt-{size}` | 上内边距   |
| `pr-{size}` | 右内边距   |
| `pb-{size}` | 下内边距   |
| `pl-{size}` | 左内边距   |
| `px-{size}` | 水平内边距 |
| `py-{size}` | 垂直内边距 |

## 字体与文本类

展示字体大小、粗细、对齐方式以及文本处理效果的完整示例。

:::demo 提供从小字体到巨大字体的六种尺寸，三种字体粗细，以及文本对齐、换行控制和省略号等功能。

utility-classes/typography

:::

### Font Size 字体大小

| 类名        | 字体大小                         | 实际默认值 | 描述     |
| ----------- | -------------------------------- | ---------- | -------- |
| `text-sm`   | `var(--e-font-size-small)`       | `12px`     | 小字体   |
| `text-base` | `var(--e-font-size-base)`        | `14px`     | 基础字体 |
| `text-lg`   | `var(--e-font-size-medium)`      | `16px`     | 中等字体 |
| `text-xl`   | `var(--e-font-size-large)`       | `18px`     | 大字体   |
| `text-2xl`  | `var(--e-font-size-extra-large)` | `20px`     | 超大字体 |
| `text-xxxl` | `var(--e-font-size-big)`         | `22px`     | 巨大字体 |

### Font Weight 字体粗细

| 类名        | 字体粗细                       | 实际默认值 | 描述     |
| ----------- | ------------------------------ | ---------- | -------- |
| `fw-normal` | `var(--e-font-weight-regular)` | `400`      | 常规粗细 |
| `fw-md`     | `var(--e-font-weight-medium)`  | `500`      | 中等粗细 |
| `fw-bold`   | `var(--e-font-weight-bold)`    | `700`      | 粗体     |

### Line Height 行高

| 类名           | 行高                                    | 实际默认值 | 描述     |
| -------------- | --------------------------------------- | ---------- | -------- |
| `leading-sm`   | `var(--e-font-line-height-small)`       | `18px`     | 小行高   |
| `leading-base` | `var(--e-font-line-height-base)`        | `22px`     | 基础行高 |
| `leading-lg`   | `var(--e-font-line-height-medium)`      | `24px`     | 中等行高 |
| `leading-xl`   | `var(--e-font-line-height-large)`       | `28px`     | 大行高   |
| `leading-2xl`  | `var(--e-font-line-height-extra-large)` | `30px`     | 超大行高 |
| `leading-xxxl` | `var(--e-font-line-height-big)`         | `34px`     | 巨大行高 |

### Text Align 文本对齐

| 类名           | 属性                  | 描述         |
| -------------- | --------------------- | ------------ |
| `text-left`    | `text-align: left`    | 文字靠左对齐 |
| `text-center`  | `text-align: center`  | 文字中间对齐 |
| `text-right`   | `text-align: right`   | 文字靠右对齐 |
| `text-justify` | `text-align: justify` | 两端对齐     |

### Text Overflow 文本溢出

| 类名           | 属性                                                             | 描述                  |
| -------------- | ---------------------------------------------------------------- | --------------------- |
| `ellipsis`     | `text-overflow: ellipsis; white-space: nowrap; overflow: hidden` | 文字超宽部分用...显示 |
| `line-clamp-1` | `-webkit-line-clamp: 1`                                          | 单行截断              |
| `line-clamp-2` | `-webkit-line-clamp: 2`                                          | 两行截断              |
| `line-clamp-3` | `-webkit-line-clamp: 3`                                          | 三行截断              |

### Text Decoration 文本装饰

| 类名           | 属性                            | 描述   |
| -------------- | ------------------------------- | ------ |
| `underline`    | `text-decoration: underline`    | 下划线 |
| `line-through` | `text-decoration: line-through` | 删除线 |
| `no-underline` | `text-decoration: none`         | 无装饰 |

### Text Transform 文本转换

| 类名         | 属性                         | 描述       |
| ------------ | ---------------------------- | ---------- |
| `uppercase`  | `text-transform: uppercase`  | 全部大写   |
| `lowercase`  | `text-transform: lowercase`  | 全部小写   |
| `capitalize` | `text-transform: capitalize` | 首字母大写 |

### Whitespace 空白处理

| 类名                | 属性                        | 描述       |
| ------------------- | --------------------------- | ---------- |
| `whitespace-nowrap` | `white-space: nowrap`       | 不换行     |
| `whitespace-normal` | `white-space: normal`       | 正常换行   |
| `break-words`       | `overflow-wrap: break-word` | 单词内换行 |

## 颜色类

丰富的颜色系统包括文字颜色、背景颜色、主题颜色和状态颜色，满足各种设计需求。

:::demo 展示完整的颜色体系，包括层级文字颜色、主题色彩、背景填充色和交互状态颜色。

utility-classes/colors

:::

### Text Color 文字颜色

| 类名               | 颜色值                            | 实际默认值 | 描述       |
| ------------------ | --------------------------------- | ---------- | ---------- |
| `text-primary`     | `var(--e-text-color-primary)`     | `#171a1d`  | 主要文字   |
| `text-secondary`   | `var(--e-text-color-secondary)`   | `#747677`  | 次要文字   |
| `text-third`       | `var(--e-text-color-third)`       | `#b9babb`  | 第三级文字 |
| `text-disabled`    | `var(--e-text-color-disable)`     | `#c5c6c6`  | 禁用文字   |
| `text-placeholder` | `var(--e-text-color-placeholder)` | `#d1d1d2`  | 占位符文字 |
| `text-white`       | `var(--e-text-color-white)`       | `#ffffff`  | 白色文字   |

### Theme Color 主题颜色

| 类名           | 颜色值                   | 实际默认值 | 描述       |
| -------------- | ------------------------ | ---------- | ---------- |
| `text-brand`   | `var(--e-color-primary)` | `#2370ef`  | 品牌色文字 |
| `text-success` | `var(--e-color-success)` | `#00b042`  | 成功色文字 |
| `text-warning` | `var(--e-color-warning)` | `#ff9200`  | 警告色文字 |
| `text-danger`  | `var(--e-color-danger)`  | `#f44830`  | 危险色文字 |
| `text-info`    | `var(--e-color-info)`    | `#909399`  | 信息色文字 |

### Background Color 背景颜色

| 类名              | 颜色值                        | 实际默认值 | 描述         |
| ----------------- | ----------------------------- | ---------- | ------------ |
| `bg-white`        | `var(--e-color-white)`        | `#ffffff`  | 白色背景     |
| `bg-page`         | `var(--e-bg-color-page)`      | `#f2f3f5`  | 页面背景     |
| `bg-fill`         | `var(--e-fill-color)`         | `#ffffff`  | 填充背景     |
| `bg-fill-light`   | `var(--e-fill-color-light)`   | `#f2f4f7`  | 浅色填充背景 |
| `bg-fill-lighter` | `var(--e-fill-color-lighter)` | `#fafafa`  | 更浅填充背景 |
| `bg-transparent`  | `transparent`                 | —          | 透明背景     |

### Theme Background 主题背景

| 类名         | 颜色值                   | 实际默认值 | 描述       |
| ------------ | ------------------------ | ---------- | ---------- |
| `bg-primary` | `var(--e-color-primary)` | `#2370ef`  | 主色背景   |
| `bg-success` | `var(--e-color-success)` | `#00b042`  | 成功色背景 |
| `bg-warning` | `var(--e-color-warning)` | `#ff9200`  | 警告色背景 |
| `bg-danger`  | `var(--e-color-danger)`  | `#f44830`  | 危险色背景 |
| `bg-info`    | `var(--e-color-info)`    | `#909399`  | 信息色背景 |

## 边框与圆角类

边框样式、颜色变化和圆角效果的组合展示，以及阴影效果的层次表现。

:::demo 演示边框样式、颜色、圆角和阴影的搭配使用，展示如何创建美观的视觉效果。

utility-classes/borders

:::

### Border 边框

| 类名          | 属性                          | 描述     |
| ------------- | ----------------------------- | -------- |
| `border`      | `border: var(--e-border)`     | 基础边框 |
| `border-none` | `border: none`                | 去除边框 |
| `border-box`  | `border: var(--e-border-box)` | 盒子边框 |

### 单边边框

| 类名       | 属性                             | 描述   |
| ---------- | -------------------------------- | ------ |
| `border-t` | `border-top: var(--e-border)`    | 上边框 |
| `border-r` | `border-right: var(--e-border)`  | 右边框 |
| `border-b` | `border-bottom: var(--e-border)` | 下边框 |
| `border-l` | `border-left: var(--e-border)`   | 左边框 |

### 边框宽度

| 类名       | 属性                | 描述       |
| ---------- | ------------------- | ---------- |
| `border-0` | `border-width: 0`   | 无边框宽度 |
| `border-1` | `border-width: 1px` | 1px 边框   |
| `border-2` | `border-width: 2px` | 2px 边框   |

### Border Color 边框颜色

| 类名             | 颜色值                                                   | 实际默认值 | 描述                 |
| ---------------- | -------------------------------------------------------- | ---------- | -------------------- |
| `border-default` | `border-color: var(--e-border-color)`                    | `#e2e2e2`  | 默认边框色           |
| `border-primary` | `border-color: var(--e-color-primary)`                   | `#2370ef`  | 主色边框             |
| `border-success` | `border-color: var(--e-color-success)`                   | `#00b042`  | 成功色边框           |
| `border-warning` | `border-color: var(--e-color-warning)`                   | `#ff9200`  | 警告色边框           |
| `border-danger`  | `border-color: var(--e-color-danger)`                    | `#f44830`  | 危险色边框           |
| `border-info`    | `border-color: var(--e-color-info)`                      | `#909399`  | 信息色边框           |
| `border-hover`   | `:hover` 时 `border-color: var(--e-border-color-hover)`  | `#d1d1d2`  | 悬停时边框色变化     |
| `border-active`  | `:active` 时 `border-color: var(--e-border-color-click)` | `#2370ef`  | 激活时边框色变化     |

::: tip 使用说明
- `.border` 只设置边框宽度和样式，默认使用基础边框颜色
- 主题色边框类（如 `.border-success`）和交互类（如 `.border-hover`）可以单独使用或与 `.border` 组合使用
- 灵活组合示例：`class="border border-primary border-hover"`
:::

::: warning 迁移指南
**v10.0.8 版本变更**：`.border` 类不再自动包含 hover/active 交互效果

如果之前依赖 `.border` 的自动交互效果，需要显式添加交互类：
- 旧代码：`class="border"`（自动包含 hover/active 效果）
- 新代码：`class="border border-hover border-active"`（需要显式添加）

**变更原因**：
- 提高性能：静态边框不再有不必要的 transition 计算
- 提高灵活性：用户可按需控制是否需要交互效果
- 避免副作用：防止静态展示场景出现意外的交互行为
:::

### Border Radius 圆角

| 类名             | 圆角值                                         | 实际默认值 | 描述           |
| ---------------- | ---------------------------------------------- | ---------- | -------------- |
| `rounded-mini`   | `border-radius: var(--e-border-radius-mini)`   | `4px`      | 迷你圆角       |
| `rounded-sm`     | `border-radius: var(--e-border-radius-small)`  | `6px`      | 小圆角         |
| `rounded`        | `border-radius: var(--e-border-radius-base)`   | `8px`      | 基础圆角       |
| `rounded-lg`     | `border-radius: var(--e-border-radius-large)`  | `10px`     | 大圆角         |
| `rounded-full`   | `border-radius: var(--e-border-radius-round)`  | `999px`    | 圆形           |
| `rounded-circle` | `border-radius: var(--e-border-radius-circle)` | `100%`     | 圆形（百分比） |
| `rounded-none`   | `border-radius: 0`                             | `0`        | 无圆角         |

### 单边圆角

| 类名        | 属性                                                       | 描述   |
| ----------- | ---------------------------------------------------------- | ------ |
| `rounded-t` | 重置下边圆角为 0                                            | 上圆角 |
| `rounded-r` | 重置左边圆角为 0                                            | 右圆角 |
| `rounded-b` | 重置上边圆角为 0                                            | 下圆角 |
| `rounded-l` | 重置右边圆角为 0                                            | 左圆角 |

::: tip 使用说明
单边圆角类需要与基础圆角类组合使用，通过重置不需要的角来实现单边效果：
- `class="rounded-lg rounded-t"` - 只有上边有大圆角
- `class="rounded-sm rounded-b"` - 只有下边有小圆角
- `class="rounded rounded-l"` - 只有左边有基础圆角
:::

## 阴影

演示不同层级阴影的视觉效果和深度感受，展示阴影在界面设计中的层次表现。

:::demo 通过四种不同强度的阴影效果，展示从轻微到强烈的视觉层次。

utility-classes/shadows

:::

### Box Shadow 阴影

| 类名          | 阴影值               | 实际默认值                              | 描述     |
| ------------- | -------------------- | --------------------------------------- | -------- |
| `shadow-sm`   | `var(--e-shadow-s)`  | `0 2px 8px 0 rgba(23, 26, 29, 0.04)`   | 小阴影   |
| `shadow`      | `var(--e-shadow-m)`  | `0 8px 24px 0 rgba(23, 26, 29, 0.1)`   | 中等阴影 |
| `shadow-lg`   | `var(--e-shadow-l)`  | `0 12px 32px 0 rgba(23, 26, 29, 0.24)` | 大阴影   |
| `shadow-xl`   | `var(--e-shadow-xl)` | `0 12px 36px 0 rgba(23, 26, 29, 0.3)`  | 超大阴影 |
| `shadow-none` | `box-shadow: none`   | `none`                                  | 无阴影   |

## 状态类

展示交互状态颜色的应用效果，包括分割线、悬停、勾选和选中等状态的视觉反馈。

:::demo 演示状态背景色和禁用状态的实际应用场景和视觉效果。

utility-classes/states

:::

### 状态背景色

| 类名        | 颜色值                                                         | 描述             |
| ----------- | -------------------------------------------------------------- | ---------------- |
| `bg-line`   | `background-color: var(--e-function-color-line)`               | 分割线背景色     |
| `bg-hover`  | `:hover` 时 `background-color: var(--e-function-color-hover)`  | 悬停时背景色变化 |
| `bg-check`  | `background-color: var(--e-function-color-check)`              | 勾选背景色       |
| `bg-active` | `:active` 时 `background-color: var(--e-function-color-click)` | 激活时背景色变化 |

### Disabled 禁用状态

| 类名                 | 描述         |
| -------------------- | ------------ |
| `disabled`           | 禁用状态样式 |
| `cursor-not-allowed` | 禁用光标     |
| `cursor-pointer`     | 指针光标     |

## 变换与动画类

展示过渡动画的时间差异和视觉效果，帮助理解不同过渡速度的应用场景。

:::demo 通过交互演示展示不同过渡时间的动画效果和应用时机。

utility-classes/transitions

:::

### Transition 过渡

| 类名              | 过渡时间                            | 描述       |
| ----------------- | ----------------------------------- | ---------- |
| `transition`      | `var(--e-transition-duration)`      | 默认过渡   |
| `transition-fast` | `var(--e-transition-duration-fast)` | 快速过渡   |
| `transition-all`  | `var(--e-transition-all)`           | 全属性过渡 |

## 可见性与显示类

:::demo 展示 Display 显示类型、可见性控制和透明度的应用效果。

utility-classes/display

:::

### Display 显示

| 类名           | 属性                    | 描述         |
| -------------- | ----------------------- | ------------ |
| `block`        | `display: block`        | 块级显示     |
| `hidden`       | `display: none`         | 隐藏元素     |
| `inline`       | `display: inline`       | 行内显示     |
| `inline-block` | `display: inline-block` | 行内块级显示 |

### Visibility 可见性

| 类名        | 属性                  | 描述               |
| ----------- | --------------------- | ------------------ |
| `visible`   | `visibility: visible` | 可见               |
| `invisible` | `visibility: hidden`  | 不可见（保留占位） |

### Opacity 透明度

| 类名          | 属性           | 描述       |
| ------------- | -------------- | ---------- |
| `opacity-0`   | `opacity: 0`   | 完全透明   |
| `opacity-50`  | `opacity: 0.5` | 半透明     |
| `opacity-100` | `opacity: 1`   | 完全不透明 |

## 溢出控制类

:::demo 展示溢出控制和多行文本截断的应用效果。

utility-classes/overflow

:::

### Overflow 溢出

| 类名               | 属性                | 描述           |
| ------------------ | ------------------- | -------------- |
| `overflow-hidden`  | `overflow: hidden`  | 隐藏溢出内容   |
| `overflow-auto`    | `overflow: auto`    | 自动显示滚动条 |
| `overflow-scroll`  | `overflow: scroll`  | 始终显示滚动条 |
| `overflow-visible` | `overflow: visible` | 显示溢出内容   |

### 单方向溢出

| 类名                | 属性                 | 描述             |
| ------------------- | -------------------- | ---------------- |
| `overflow-x-hidden` | `overflow-x: hidden` | 水平方向隐藏溢出 |
| `overflow-x-auto`   | `overflow-x: auto`   | 水平方向自动滚动 |
| `overflow-x-scroll` | `overflow-x: scroll` | 水平方向始终滚动 |
| `overflow-y-hidden` | `overflow-y: hidden` | 垂直方向隐藏溢出 |
| `overflow-y-auto`   | `overflow-y: auto`   | 垂直方向自动滚动 |
| `overflow-y-scroll` | `overflow-y: scroll` | 垂直方向始终滚动 |

## 定位系统类

:::demo 展示定位类型、定位值、居中定位和 z-index 层级的应用效果。

utility-classes/position

:::

### Position 定位类型

| 类名       | 属性                 | 描述     |
| ---------- | -------------------- | -------- |
| `relative` | `position: relative` | 相对定位 |
| `absolute` | `position: absolute` | 绝对定位 |
| `fixed`    | `position: fixed`    | 固定定位 |
| `sticky`   | `position: sticky`   | 粘性定位 |
| `static`   | `position: static`   | 静态定位 |

### 定位值

| 类名       | 属性                                   | 描述     |
| ---------- | -------------------------------------- | -------- |
| `inset-0`  | `top: 0; right: 0; bottom: 0; left: 0` | 四边归零 |
| `top-0`    | `top: 0`                               | 顶部归零 |
| `right-0`  | `right: 0`                             | 右侧归零 |
| `bottom-0` | `bottom: 0`                            | 底部归零 |
| `left-0`   | `left: 0`                              | 左侧归零 |

### 居中定位

需配合 `absolute` 或 `fixed` 使用。

| 类名                | 属性                                                    | 描述     |
| ------------------- | ------------------------------------------------------- | -------- |
| `absolute-center-x` | `left: 50%; transform: translateX(-50%)`                | 水平居中 |
| `absolute-center-y` | `top: 50%; transform: translateY(-50%)`                 | 垂直居中 |
| `absolute-center`   | `top: 50%; left: 50%; transform: translate(-50%, -50%)` | 完全居中 |

### Z-Index 层级

| 类名     | 属性            | 描述     |
| -------- | --------------- | -------- |
| `z-0`    | `z-index: 0`    | 基础层级 |
| `z-10`   | `z-index: 10`   | 低层级   |
| `z-20`   | `z-index: 20`   | 中层级   |
| `z-50`   | `z-index: 50`   | 高层级   |

## 盒模型与语义化组合类

:::demo 展示盒模型控制、标题类、文本装饰等语义化组合类的应用效果。

utility-classes/semantic

:::

### Box Sizing 盒模型

| 类名          | 属性                      | 描述       |
| ------------- | ------------------------- | ---------- |
| `box-border`  | `box-sizing: border-box`  | 边框盒模型 |
| `box-content` | `box-sizing: content-box` | 内容盒模型 |

### 标题类

| 类名            | 字号 / 字重 / 行高       | 描述                       |
| --------------- | ------------------------ | -------------------------- |
| `page-title`    | 18px / 700 / 28px        | 页面标题                   |

### 容器类

| 类名       | 描述                                         |
| ---------- | -------------------------------------------- |
| `mod-wrap` | 模块容器（填充背景 + 8px 圆角 + 16px 内边距 + 小阴影） |

::: tip
语义化组合类声明在原子类之前，因此可以用原子类覆盖组合类的属性。例如 `class="page-title text-2xl"` 可以改变标题的字号。
:::