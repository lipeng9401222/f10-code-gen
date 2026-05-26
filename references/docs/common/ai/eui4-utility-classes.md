
## 样式类使用规范

在使用 EUI4 进行开发时，优先使用内置的辅助样式类，而不是编写自定义 CSS。这些样式类基于 EUI4 的设计变量系统构建，确保设计的视觉一致性和可维护性。

### 1. 布局与定位

**Flex 布局优先**
- 使用 `flex` 或 `inline-flex` 创建弹性布局
- 方向控制: `flex-row`, `flex-col`, `flex-row-reverse`, `flex-col-reverse`
- 主轴对齐: `justify-start`, `justify-center`, `justify-end`, `justify-between`, `justify-around`, `justify-evenly`
- 交叉轴对齐: `items-start`, `items-center`, `items-end`, `items-stretch`, `items-baseline`
- 换行控制: `flex-wrap`, `flex-nowrap`, `flex-wrap-reverse`
- 项目属性: `flex-1`, `flex-auto`, `flex-none`
- 间距: `gap-xs`, `gap-s`, `gap-m`, `gap-l`, `gap-xl`

**浮动布局**（仅在必要时使用）
- `float-left`, `float-right`, `float-none`, `clearfix`

### 2. 尺寸

组件高度规范:
- `h-xs` - 超小尺寸 (var(--e-size-mini))
- `h-sm` - 小尺寸 (var(--e-size-small))
- `h-md` - 默认尺寸 (var(--e-size-base))
- `h-lg` - 大尺寸 (var(--e-size-large))

### 3. 间距系统

**外边距 (Margin)**
- 全方向: `m-{size}` (xs/s/m/l/xl/xxl/xxxl)
- 单方向: `mt-{size}`, `mr-{size}`, `mb-{size}`, `ml-{size}`
- 水平/垂直: `mx-{size}`, `my-{size}`

**内边距 (Padding)**
- 全方向: `p-{size}` (xs/s/m/l/xl/xxl/xxxl)
- 单方向: `pt-{size}`, `pr-{size}`, `pb-{size}`, `pl-{size}`
- 水平/垂直: `px-{size}`, `py-{size}`

**间距尺寸对照**
- `xs` - 超小间距 (var(--e-space-xs))
- `s` - 小间距 (var(--e-space-s))
- `m` - 中等间距 (var(--e-space-m))
- `l` - 大间距 (var(--e-space-l))
- `xl` - 超大间距 (var(--e-space-xl))
- `xxl` - 特大间距 (var(--e-space-xxl))
- `xxxl` - 巨大间距 (var(--e-space-xxxl))

### 4. 字体与文本

**字体大小**
- `text-sm` - 小字体
- `text-base` - 基础字体
- `text-lg` - 中等字体
- `text-xl` - 大字体
- `text-2xl`/`text-xxl` - 超大字体
- `text-xxxl` - 巨大字体

**字体粗细**
- `fw-normal` - 常规粗细
- `fw-md` - 中等粗细
- `fw-bold` - 粗体

**行高**
- `leading-sm`, `leading-base`, `leading-lg`, `leading-xl`, `leading-2xl`/`leading-xxl`, `leading-xxxl`

**文本对齐**
- `text-left`, `text-center`, `text-right`, `text-justify`

**文本溢出**
- `ellipsis` - 超出部分显示省略号

### 5. 颜色系统

**文字颜色（层级）**
- `text-primary` - 主要文字
- `text-secondary` - 次要文字
- `text-third` - 第三级文字
- `text-disabled` - 禁用文字
- `text-placeholder` - 占位符文字
- `text-white` - 白色文字

**主题色文字**
- `text-success`, `text-warning`, `text-danger`, `text-info`

**背景颜色**
- `bg-white` - 白色背景
- `bg-page` - 页面背景
- `bg-fill` - 填充背景
- `bg-fill-light` - 浅色填充
- `bg-fill-lighter` - 更浅填充

**主题色背景**
- `bg-primary`, `bg-success`, `bg-warning`, `bg-danger`, `bg-info`

### 6. 边框与圆角

**边框**
- `border` - 默认边框（已内置 hover/active 交互效果）
- `border-none` - 去除边框
- `border-box` - 盒子边框
- `border-default` - 默认边框色
- `border-hover` - 仅在需要自定义悬停效果时使用
- `border-active` - 仅在需要自定义激活效果时使用

**圆角**
- `rounded-mini` - 迷你圆角
- `rounded-sm` - 小圆角
- `rounded` - 基础圆角
- `rounded-lg` - 大圆角
- `rounded-full` - 圆形
- `rounded-circle` - 圆形（百分比）

### 7. 阴影

- `shadow-sm` - 小阴影
- `shadow` - 中等阴影
- `shadow-lg` - 大阴影
- `shadow-xl` - 超大阴影

### 8. 状态类

**状态背景色**
- `bg-line` - 分割线背景色
- `bg-hover` - 悬停时背景色变化
- `bg-check` - 勾选背景色
- `bg-active` - 激活时背景色变化

**禁用与光标**
- `disabled` - 禁用状态（opacity + cursor）
- `cursor-not-allowed` - 禁用光标
- `cursor-pointer` - 指针光标

### 9. 过渡动画

- `transition` - 默认过渡
- `transition-fast` - 快速过渡
- `transition-all` - 全属性过渡

### 10. 可见性

- `block` - 块级显示
- `hidden` - 隐藏元素

## 开发最佳实践

1. **优先使用样式类**: 在编写组件或示例时，优先使用上述样式类，避免内联样式或自定义 CSS
2. **组合使用**: 通过组合多个样式类实现复杂效果，例如: `class="flex items-center gap-m px-l py-m bg-fill rounded shadow-sm"`
3. **保持一致性**: 使用标准间距和颜色变量，确保整个项目的视觉一致性
4. **响应式考虑**: 在需要响应式设计时，可以结合媒体查询使用这些样式类
5. **状态交互**: `.border` 和 `.bg-hover`/`.bg-active` 已内置交互效果，大多数情况下无需额外处理

## 示例

```vue
<template>
  <!-- 卡片布局 -->
  <div class="bg-white rounded shadow p-l">
    <!-- 头部 -->
    <div class="flex items-center justify-between mb-m">
      <h3 class="text-lg fw-md text-primary">标题</h3>
      <span class="text-sm text-secondary">副标题</span>
    </div>

    <!-- 内容 -->
    <div class="text-base text-primary my-m">
      内容区域
    </div>

    <!-- 按钮组 -->
    <div class="flex justify-end gap-s mt-l">
      <button class="px-l py-m bg-fill rounded border cursor-pointer">取消</button>
      <button class="px-l py-m bg-primary text-white rounded shadow-sm cursor-pointer">确定</button>
    </div>
  </div>
</template>
```

通过遵循这些规范，可以确保代码的可维护性、一致性和开发效率。