# 样式开发规范

> 本规范基于 EUI4 辅助样式类体系，所有前端开发必须遵守。
>
> 详细文档：[guide-utility-classes.md](guide/guide-utility-classes.md)

## 1. 适用范围与目标

- 适用范围：`Vue + EUI4` 页面样式开发。
- 目标：统一视觉语言、降低样式碎片化、提升维护效率。

---

## 2. 开发优先级（必须遵守）

统一按以下顺序选择样式实现方式：

1. 组件属性（首选）
2. 辅助样式类（次选）
3. 自定义 CSS（兜底）

### 2.1 必须

- 能用组件属性实现的，禁止改写为类名拼凑。
- 能用辅助类实现的，禁止手写等价 CSS。
- 自定义样式必须说明“为什么辅助类无法覆盖”。
- 所有颜色、间距、圆角、阴影必须使用设计变量，不允许硬编码。

### 2.2 禁止

- 禁止手写常见布局样式：`display: flex`、`justify-content`、`align-items`、`margin`、`padding`、`text-align` 等（可由辅助类覆盖时）。
- 禁止用类名模拟组件状态（如按钮禁用、Tag 类型）。
- 禁止直接写十六进制颜色值替代语义类/变量（如 `#303133`）。

---

## 3. 高频规则速查

### 3.1 布局与定位

| 场景       | 推荐类名                                         |
| ---------- | ------------------------------------------------ |
| 弹性容器   | `flex`                                           |
| 排列方向   | `flex-row` / `flex-col`                          |
| 主轴对齐   | `justify-start/center/end/between/around/evenly` |
| 交叉轴对齐 | `items-start/center/end/stretch/baseline`        |
| 是否换行   | `flex-wrap` / `flex-nowrap`                      |
| 子项伸缩   | `flex-1` / `flex-auto` / `flex-none`             |
| 浮动       | `float-left` / `float-right`                     |
| 清除浮动   | `clearfix`                                       |

### 3.2 间距

### Margin

| 模式                 | 说明            |
| -------------------- | --------------- |
| `m-{size}`           | 四边外边距      |
| `mt/mr/mb/ml-{size}` | 单方向外边距    |
| `mx/my-{size}`       | 水平/垂直外边距 |

### Padding

| 模式                 | 说明            |
| -------------------- | --------------- |
| `p-{size}`           | 四边内边距      |
| `pt/pr/pb/pl-{size}` | 单方向内边距    |
| `px/py-{size}`       | 水平/垂直内边距 |

### Gap

| 模式              | 说明                 |
| ----------------- | -------------------- |
| `gap-xs/s/m/l/xl` | Flex/Grid 子元素间距 |

说明：`size` 取值统一使用设计体系等级（`xs/s/m/l/xl/xxl/xxxl`），具体像素值以当前主题变量定义为准。

### 3.3 尺寸与溢出

| 场景         | 推荐类名                              |
| ------------ | ------------------------------------- |
| 100% 宽高    | `w-full` / `h-full`                   |
| 视口宽高     | `w-screen` / `h-screen`               |
| 自动宽高     | `w-auto` / `h-auto`                   |
| 最小尺寸修正 | `min-w-0` / `min-h-0`                 |
| 盒模型       | `box-border` / `box-content`          |
| 溢出控制     | `overflow-hidden/auto/scroll`         |
| 单方向滚动   | `overflow-x-auto` / `overflow-y-auto` |

### 3.4 文本与字体

| 场景       | 推荐类名                                      |
| ---------- | --------------------------------------------- |
| 字号       | `text-sm/base/lg/xl/2xl/xxxl`                 |
| 字重       | `fw-normal` / `fw-md` / `fw-bold`             |
| 对齐       | `text-left/center/right/justify`              |
| 单行省略   | `ellipsis`                                    |
| 多行截断   | `line-clamp-2` / `line-clamp-3`               |
| 装饰       | `underline` / `line-through` / `no-underline` |
| 大小写转换 | `uppercase` / `lowercase` / `capitalize`      |

> 语义组合类（重点）：
>
> - `page-title`：页面标题
> - `section-title`：区块标题

### 3.5 颜色、边框、圆角、阴影

| 场景     | 推荐类名                                            |
| -------- | --------------------------------------------------- |
| 文字颜色 | `text-primary/secondary/third/disabled/placeholder` |
| 状态文字 | `text-success/warning/danger/info`                  |
| 背景颜色 | `bg-white/page/fill/fill-light/fill-lighter`        |
| 状态背景 | `bg-primary/success/warning/danger/info`            |
| 边框     | `border` / `border-box` / `border-none`             |
| 圆角     | `rounded-mini/sm/base/lg/full/circle`               |
| 阴影     | `shadow-sm` / `shadow` / `shadow-lg` / `shadow-xl`  |

说明：优先使用语义类，不直接写视觉值。

### 3.6 交互与可见性

| 场景               | 推荐类名                                            |
| ------------------ | --------------------------------------------------- |
| Hover/Active/Check | `bg-hover` / `bg-active` / `bg-check`               |
| 光标               | `cursor-pointer` / `cursor-not-allowed`             |
| 禁用态             | `disabled`                                          |
| 过渡               | `transition` / `transition-fast` / `transition-all` |
| 显示隐藏           | `block` / `hidden`                                  |

### 3.7 组件高度尺寸

| 类名   | 说明     |
| ------ | -------- |
| `h-xs` | 超小尺寸 |
| `h-sm` | 小尺寸   |
| `h-md` | 默认尺寸 |
| `h-lg` | 大尺寸   |

---

## 4. 典型写法

### 4.1 推荐写法

```vue
<template>
    <!-- 组件优先用属性 -->
    <e-button type="primary" disabled>按钮</e-button>
    <e-tag type="success">成功</e-tag>

    <!-- 容器与原生元素用辅助类 -->
    <div class="flex items-center justify-between gap-m p-l mb-xl">
        <span class="text-primary fw-md">标题</span>
        <e-button type="primary">操作</e-button>
    </div>

    <!-- 区块标题使用语义类 -->
    <div class="mb-l">
        <div class="section-title">基础信息</div>
        <e-descriptions :column="2" bordered>...</e-descriptions>
    </div>
</template>

<style scoped>
/* 仅保留辅助类难以表达的样式 */
.custom-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
</style>
```

### 4.2 反例与替代

| 反例                                       | 正确写法                             |
| ------------------------------------------ | ------------------------------------ |
| `<e-button class="bg-primary text-white">` | `<e-button type="primary">`          |
| `<e-button class="disabled">`              | `<e-button disabled>`                |
| `<e-tag class="bg-success">成功</e-tag>`   | `<e-tag type="success">成功</e-tag>` |
| `margin: 10px; margin-bottom: 20px;`       | `class="m-xs mb-xl"`                 |
| `padding: 16px;`                           | `class="p-l"`                        |
| `display: flex; align-items: center;`      | `class="flex items-center"`          |
| `color: #303133;`                          | `class="text-primary"`               |
| `border-radius: 4px;`                      | `class="rounded-mini"`               |

---

## 5. CSS 变量使用规范

自定义 CSS 中如需使用设计值，必须通过变量引用：

```css
.custom-card {
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
```

建议优先使用以下变量族：

- 颜色：`--e-color-*`、`--e-text-color-*`、`--e-bg-color-*`
- 间距：`--e-space-*`
- 圆角：`--e-border-radius-*`
- 阴影：`--e-shadow-*`
- 字体：`--e-font-*`

---

## 6. 提交前自检

1. 是否优先使用了组件属性，而非用类名模拟组件能力？
2. 是否把可辅助类表达的 CSS 全部替换为辅助类？
3. 是否存在硬编码颜色、圆角、间距、阴影？
4. 是否保留了必要且最小化的自定义 CSS？
5. 是否使用了语义化文本类和状态类，避免视觉值直写？

---

## 7. 参考资料

- [EUI4 辅助样式类文档](http://192.168.219.170/docs/vue/latest/component/guide/utility-classes.html)
