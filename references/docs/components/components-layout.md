---
title: Layout
originUrl: http://192.168.219.170/docs/vue/latest/component/component/layout.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/layout.html)

# Layout 布局

通过基础的 24 分栏，迅速简便地创建布局。

> **💡 提示**
>
> 组件默认使用 Flex 布局，不需要手动设置 `type="flex"`。
> 
> 请注意父容器避免使用 `inline` 相关样式，会导致组件宽度不能撑满。

## 基础布局

使用列创建基础网格布局。

**Demo 示例**: `layout/basic-layout`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/layout.html)

```vue
<template>
  <e-row>
    <e-col :span="24"><div class="grid-content e-bg-purple-dark" /></e-col>
  </e-row>
  <e-row>
    <e-col :span="12"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="12"><div class="grid-content e-bg-purple-light" /></e-col>
  </e-row>
  <e-row>
    <e-col :span="8"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="8"><div class="grid-content e-bg-purple-light" /></e-col>
    <e-col :span="8"><div class="grid-content e-bg-purple" /></e-col>
  </e-row>
  <e-row>
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple-light" /></e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple-light" /></e-col>
  </e-row>
  <e-row>
    <e-col :span="4"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="4"><div class="grid-content e-bg-purple-light" /></e-col>
    <e-col :span="4"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="4"><div class="grid-content e-bg-purple-light" /></e-col>
    <e-col :span="4"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="4"><div class="grid-content e-bg-purple-light" /></e-col>
  </e-row>
</template>

<style lang="scss" scoped>
.e-row {
  margin-bottom: 20px;
}
.e-row:last-child {
  margin-bottom: 0;
}
.e-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>

```

## 分栏间隔

支持列间距。

**Demo 示例**: `layout/column-spacing`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/layout.html)

```vue
<template>
  <e-row :gutter="20">
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
  </e-row>
</template>

<style scoped>
.e-row {
  margin-bottom: 20px;
}
.e-row:last-child {
  margin-bottom: 0;
}
.e-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>

```

## 混合布局

通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。

**Demo 示例**: `layout/hybrid-layout`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/layout.html)

```vue
<template>
  <e-row :gutter="20">
    <e-col :span="16"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="8"><div class="grid-content e-bg-purple" /></e-col>
  </e-row>
  <e-row :gutter="20">
    <e-col :span="8"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="8"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="4"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="4"><div class="grid-content e-bg-purple" /></e-col>
  </e-row>
  <e-row :gutter="20">
    <e-col :span="4"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="16"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="4"><div class="grid-content e-bg-purple" /></e-col>
  </e-row>
</template>

<style scoped>
.e-row {
  margin-bottom: 20px;
}
.e-row:last-child {
  margin-bottom: 0;
}
.e-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>

```

## 列偏移

您可以指定列偏移量。

**Demo 示例**: `layout/column-offset`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/layout.html)

```vue
<template>
  <e-row :gutter="20">
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="6" :offset="6"><div class="grid-content e-bg-purple" /></e-col>
  </e-row>
  <e-row :gutter="20">
    <e-col :span="6" :offset="6"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="6" :offset="6"><div class="grid-content e-bg-purple" /></e-col>
  </e-row>
  <e-row :gutter="20">
    <e-col :span="12" :offset="6"><div class="grid-content e-bg-purple" /></e-col>
  </e-row>
</template>

<style scoped>
.e-row {
  margin-bottom: 20px;
}
.e-row:last-child {
  margin-bottom: 0;
}
.e-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>

```

## 对齐方式

默认使用 flex 布局来对分栏进行灵活的对齐。

**Demo 示例**: `layout/alignment`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/layout.html)

```vue
<template>
  <e-row class="row-bg">
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple-light" /></e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
  </e-row>
  <e-row class="row-bg" justify="center">
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple-light" /></e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
  </e-row>
  <e-row class="row-bg" justify="end">
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple-light" /> </e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
  </e-row>
  <e-row class="row-bg" justify="space-between">
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple-light" /></e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
  </e-row>
  <e-row class="row-bg" justify="space-around">
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple-light" /></e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
  </e-row>
  <e-row class="row-bg" justify="space-evenly">
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple-light" /></e-col>
    <e-col :span="6"><div class="grid-content e-bg-purple" /></e-col>
  </e-row>
</template>

<style scoped>
.e-row {
  margin-bottom: 20px;
}
.e-row:last-child {
  margin-bottom: 0;
}
.e-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>

```

## 响应式布局

参照了 Bootstrap 的 响应式设计，预设了五个响应尺寸：xs、sm、md、lg 和 xl。

**Demo 示例**: `layout/responsive-layout`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/layout.html)

```vue
<template>
  <e-row :gutter="10">
    <e-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content e-bg-purple-light" /></e-col>
    <e-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content e-bg-purple" /></e-col>
    <e-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content e-bg-purple-light" /></e-col>
  </e-row>
</template>

<style scoped>
.e-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>

```

## 基于断点的隐藏类

外提供了一系列类名，用于在某些条件下隐藏元素。 这些类名可以添加在任何 DOM 元素或自定义组件上。 如果需要，请自行引入以下文件：

```js
import 'eui-vue/theme-chalk/display.css';
```

The classes are:

- `hidden-xs-only` - 当视口在 `xs` 尺寸时隐藏
- `hidden-sm-only` - 当视口在 `sm` 尺寸时隐藏
- `hidden-sm-and-down` - 当视口在 `sm` 及以下尺寸时隐藏
- `hidden-sm-and-up` - 当视口在 `sm` 及以上尺寸时隐藏
- `hidden-md-only` - 当视口在 `md` 尺寸时隐藏
- `hidden-md-and-down` - 当视口在 `md` 及以下尺寸时隐藏
- `hidden-md-and-up` - 当视口在 `md` 及以上尺寸时隐藏
- `hidden-lg-only` - 当视口在 `lg` 尺寸时隐藏
- `hidden-lg-and-down` - 当视口在 `lg` 及以下尺寸时隐藏
- `hidden-lg-and-up` - 当视口在 `lg` 及以上尺寸时隐藏
- `hidden-xl-only` - 当视口在 `xl` 尺寸时隐藏

## Row API

### Row Attributes

| Name  | Description                      | Type                                                                                         | Default |
| ------- | ------------------------- | -------------------------------------------------------------------------------------------- | ------ |
| gutter  | 栅格间隔                  | ^[number]                                                                                    | 0      |
| justify | flex 布局下的水平排列方式 | ^[enum]`'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | start  |
| align   | flex 布局下的垂直排列方式 | ^[enum]`'top' \| 'middle' \| 'bottom'`                                                       | top    |
| tag     | 自定义元素标签            | ^[string]                                                                                    | div    |

### Row Slots

| 插槽名 | Description                      | Subtags |
| ------ | ------------------------- | ------- |
| Default | customize default content | Col     |

## Col API

### Col Attributes

| Name | Description                                   | Type                                                                                  | Default |
| ------ | -------------------------------------- | ------------------------------------------------------------------------------------- | ------ |
| span   | 栅格占据的列数                         | ^[number]                                                                             | 24     |
| offset | 栅格左侧的间隔格数                     | ^[number]                                                                             | 0      |
| push   | 栅格向右移动格数                       | ^[number]                                                                             | 0      |
| pull   | 栅格向左移动格数                       | ^[number]                                                                             | 0      |
| xs     | `<768px` 响应式栅格数或者栅格属性对象  | ^[number] / ^[object]`{span?: number, offset?: number, pull?: number, push?: number}` | —      |
| sm     | `≥768px` 响应式栅格数或者栅格属性对象  | ^[number] / ^[object]`{span?: number, offset?: number, pull?: number, push?: number}` | —      |
| md     | `≥992px` 响应式栅格数或者栅格属性对象  | ^[number] / ^[object]`{span?: number, offset?: number, pull?: number, push?: number}` | —      |
| lg     | `≥1200px` 响应式栅格数或者栅格属性对象 | ^[number] / ^[object]`{span?: number, offset?: number, pull?: number, push?: number}` | —      |
| xl     | `≥1920px` 响应式栅格数或者栅格属性对象 | ^[number] / ^[object]`{span?: number, offset?: number, pull?: number, push?: number}` | —      |
| tag    | 自定义元素标签                         | ^[string]                                                                             | div    |

### Col Slots

| Name | Description           |
| ------ | -------------- |
| Default | 自定义默认内容 |

<style lang="scss">
@use '../examples/layout/index.scss';
</style>