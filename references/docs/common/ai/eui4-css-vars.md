## EUI4 CSS 变量参考

EUI4 提供了完整的 CSS 变量系统，用于自定义样式和保持设计一致性。当样式工具类无法满足需求时，可以直接使用这些 CSS 变量。

### 使用方式

在 CSS 或 Vue 组件中直接使用 `var()` 函数引用变量：

```vue
<template>
  <div class="custom-card">内容</div>
</template>

<style scoped>
.custom-card {
  padding: var(--e-space-l);
  background-color: var(--e-bg-color-page);
  color: var(--e-text-color-primary);
  border-radius: var(--e-border-radius-base);
}
</style>
```

### CSS 变量列表

#### 颜色变量

**主题色**
- `--e-color-primary` - 主色
- `--e-color-success` - 成功色
- `--e-color-warning` - 警告色
- `--e-color-danger` - 危险色
- `--e-color-info` - 信息色
- `--e-color-primary-light-{1-9}` - 主色浅色阶（1-9级）
- `--e-color-primary-dark-2` - 主色深色阶
- `--e-color-primary-rgb` - 主色 RGB 值（格式：r, g, b）

**文字颜色**
- `--e-text-color-primary` - 主要文字颜色
- `--e-text-color-secondary` - 次要文字颜色
- `--e-text-color-third` - 第三级文字颜色
- `--e-text-color-disable` - 禁用文字颜色
- `--e-text-color-placeholder` - 占位符文字颜色
- `--e-text-color-white` - 白色文字

**背景颜色**
- `--e-bg-color-page` - 页面背景色
- `--e-bg-color-overlay` - 遮罩背景色
- `--e-fill-color` - 填充色
- `--e-fill-color-light` - 浅填充色
- `--e-fill-color-lighter` - 更浅填充色

**边框颜色**
- `--e-border-color` - 默认边框颜色
- `--e-border-color-hover` - 悬停时边框颜色
- `--e-border-color-click` - 点击时边框颜色
- `--e-border-color-box` - 盒子边框颜色

**功能颜色**
- `--e-function-color-line` - 分割线颜色
- `--e-function-color-hover` - 悬停背景色
- `--e-function-color-check` - 勾选背景色
- `--e-function-color-click` - 点击背景色

**遮罩颜色**
- `--e-mask-color-light-{10,20,30,50,60,80}` - 浅色遮罩（透明度 10%-80%）
- `--e-mask-color-dark-{4,10,24,30,40,50,80}` - 深色遮罩（透明度 4%-80%）
- `--e-mask-color-extra-light` - 超浅遮罩

#### 间距变量

- `--e-space-xs` - 2px
- `--e-space-s` - 4px
- `--e-space-m` - 8px
- `--e-space-l` - 12px
- `--e-space-xl` - 16px
- `--e-space-xxl` - 24px
- `--e-space-xxxl` - 36px

#### 尺寸变量

- `--e-size-mini` - 24px
- `--e-size-small` - 28px
- `--e-size-base` - 32px
- `--e-size-large` - 38px

#### 字体变量

**字体大小**
- `--e-font-size-small` - 12px
- `--e-font-size-base` - 14px
- `--e-font-size-medium` - 16px
- `--e-font-size-large` - 18px
- `--e-font-size-extra-large` - 20px
- `--e-font-size-big` - 22px

**字体粗细**
- `--e-font-weight-regular` - 400
- `--e-font-weight-medium` - 500
- `--e-font-weight-bold` - 700

**行高**
- `--e-font-line-height-small` - 18px
- `--e-font-line-height-base` - 22px
- `--e-font-line-height-medium` - 24px
- `--e-font-line-height-large` - 28px
- `--e-font-line-height-extra-large` - 30px
- `--e-font-line-height-big` - 34px

**字体族**
- `--e-font-family` - 默认字体族

#### 边框与圆角变量

**边框**
- `--e-border` - 默认边框（1px solid）
- `--e-border-box` - 盒子边框（2px solid）
- `--e-border-width` - 边框宽度（1px）
- `--e-border-style` - 边框样式（solid）

**圆角**
- `--e-border-radius-mini` - 4px
- `--e-border-radius-small` - 6px
- `--e-border-radius-base` - 8px
- `--e-border-radius-large` - 10px
- `--e-border-radius-round` - 999px
- `--e-border-radius-circle` - 100%

#### 阴影变量

- `--e-shadow-s` - 小阴影
- `--e-shadow-m` - 中等阴影
- `--e-shadow-l` - 大阴影
- `--e-shadow-xl` - 超大阴影

#### 过渡动画变量

- `--e-transition-duration` - 默认过渡时长
- `--e-transition-duration-fast` - 快速过渡时长
- `--e-transition-function` - 过渡函数
- `--e-transition-all` - 全属性过渡
- `--e-transition-border` - 边框过渡
- `--e-transition-bg` - 背景过渡

#### Z-index 变量

- `--e-index-normal` - 1
- `--e-index-top` - 1000
- `--e-index-popper` - 2000

### 组件级 CSS 变量

各组件还提供了专用的 CSS 变量，命名格式为：`--e-{component}-{property}`

**常用组件变量示例：**
- `--e-button-text-color` - 按钮文字颜色
- `--e-button-bg-color` - 按钮背景颜色
- `--e-button-hover-text-color` - 按钮悬停文字颜色
- `--e-button-hover-bg-color` - 按钮悬停背景颜色
- `--e-input-border-color` - 输入框边框颜色

具体组件的可用变量请参考各组件文档。

### 使用示例

```vue
<template>
  <div class="custom-wrapper">
    <div class="custom-header">标题</div>
    <div class="custom-content">内容区域</div>
  </div>
</template>

<style scoped>
.custom-wrapper {
  padding: var(--e-space-xl);
  background-color: var(--e-bg-color-page);
  border-radius: var(--e-border-radius-large);
  box-shadow: var(--e-shadow-m);
}

.custom-header {
  color: var(--e-text-color-primary);
  font-size: var(--e-font-size-large);
  font-weight: var(--e-font-weight-medium);
  margin-bottom: var(--e-space-m);
}

.custom-content {
  color: var(--e-text-color-secondary);
  font-size: var(--e-font-size-base);
  line-height: var(--e-font-line-height-base);
}
</style>
```