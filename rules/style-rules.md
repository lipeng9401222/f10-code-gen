# style-rules · 辅助类优先 / 设计 token

> 来源：`vue-docs/style-development.md` + `vue-docs/troubleshooting.md` § Flex 容器表格高度跳动 + `vue-docs/dialog-interaction.md` § 4.2.3。
> **每条带 ✓ 检验句**。

---

## R1 · 优先用 F10 自带辅助类，不要凭空写 class

F10 已内置一套类似 Tailwind 的辅助类（来源：`vue-docs/style-development.md`）。常用的：

### 间距 / 尺寸

| 类名 | 含义 |
| --- | --- |
| `p-xl` / `p-l` / `p-m` / `p-s` | padding 各档（来源：design token） |
| `px-xl` / `py-xl` | 横纵向 padding |
| `m-xl` / `mr-xl` / `mb-xl` 等 | margin 各档 |
| `h-full` | height: 100% |
| `w-full` | width: 100% |
| `min-h-0` | min-height: 0（解 flex 子项默认 auto 撑开） |
| `box-border` | box-sizing: border-box |
| `flex-1` | flex: 1 1 0 |
| `overflow-hidden` | 隐藏溢出 |

### 布局

| 类名 | 含义 |
| --- | --- |
| `flex` | display: flex |
| `flex-col` | flex-direction: column |
| `justify-end` / `justify-center` / `justify-between` | justify-content |
| `items-center` / `items-start` | align-items |

### 颜色 / 背景

| 类名 | 含义 |
| --- | --- |
| `bg-white` | 白底 |
| `bg-transparent` | 透明 |

✓ 检验句：你的 .vue 里 90%+ 样式都用辅助类，**不写**散装 `style="padding: 16px"` 才算过。

---

## R2 · 必须用 CSS 变量 / 设计 token，不要写死颜色

来源：`vue-docs/dialog-interaction.md` § 4.1.1 弹窗按钮区。

```css
/* ✅ 正确：用 token */
border-top: 1px dashed var(--e-border-color-brand-light);
color: var(--e-color-text-primary);
background: var(--e-color-bg-default);

/* ❌ 错误：写死十六进制 */
border-top: 1px dashed #ddd;
color: #333;
```

常用 token 参考 `references/docs/style-development.md`。

✓ 检验句：grep 搜 `#[0-9a-fA-F]{3,6}` 在你新增 .vue 文件**没有匹配**才算过（除非确实需要业务色）。

---

## R3 · Flex 容器内表格**必须**配 `min-h-0 overflow-hidden`

来源：`vue-docs/troubleshooting.md` § Flex容器表格高度跳动问题。

```vue
<!-- ❌ 错误：flex-1 缺少高度约束，表格会先撑大再缩小 -->
<div class="flex-1 px-xl pb-xl bg-white">
  <ep-data-grid ... />
</div>

<!-- ✅ 正确 -->
<div class="flex-1 min-h-0 overflow-hidden px-xl pb-xl bg-white">
  <ep-data-grid ... />
</div>
```

**根因**：Flex 子项默认 `min-height: auto`，会用内容自然高度作为最小值；表格初始 loading 区域会撑开容器。`min-h-0` 让容器可收缩到比内容更小。

✓ 检验句：你 `<div class="flex-1">` 包 `<ep-data-grid>` 的场景**全部**配了 `min-h-0`（直接看类名）才算过。

---

## R4 · 表格弹窗内必须用 `box-border`

来源：`vue-docs/dialog-interaction.md` § 4.2.3。

```vue
<!-- ❌ 错误：h-full + p-xl 不配 box-border，表格高度抖动 -->
<div class="h-full p-xl">
  <ep-data-grid ... />
</div>

<!-- ✅ 正确：让 padding 包含在 height 内 -->
<div class="h-full p-xl box-border">
  <ep-data-grid ... />
</div>
```

**根因**：默认 `box-sizing: content-box`，`h-full` 计算高度后再加 padding 导致超出容器。`box-border` 让 padding 从 height 中扣除。

✓ 检验句：你的表格弹窗 main 容器**同时有** `h-full` + `p-xl` + `box-border` 才算过。

---

## R5 · `<style scoped>` 优先

```vue
<style scoped lang="scss">
.tree-content {
  /* 仅本组件生效 */
}
</style>
```

- 默认用 `scoped`（避免污染全局）
- 用 `lang="scss"` 启用嵌套 / 变量
- 全局样式放 `packages/examples/src/assets/` 下，按需 import

✓ 检验句：你的 `<style>` 标签都有 `scoped` 属性才算过（除非确实需要影响全局）。

---

## R6 · 类名命名约定 BEM-Lite

| 场景 | 命名 |
| --- | --- |
| 页面根类 | `eui-page` / `fui-page`（用辅助类前缀，不自创） |
| 局部块 | `eui-list-side-tree` / `eui-detail-card` |
| 元素 | `tree-header` / `tree-content` / `tree-title`（连字符） |
| 修饰符 | `is-active` / `is-disabled`（is- 前缀） |

**禁止**：
- ❌ 全大写 `LIST_SIDE_TREE`
- ❌ 驼峰 `treeHeader`（CSS 不区分大小写但易混淆）
- ❌ 单字 / 通用名 `header` / `box`（会冲突）

✓ 检验句：你的类名命名能在以上规则中找到对应才算过。

---

## R7 · F10 默认主题不要自己换

- F10 用 `@epoint-fe/eui-theme-idea` 主题包
- 业务页面**不要**自己写 `--e-color-primary: #ff0000` 覆盖框架色
- 需要业务色时定义独立的 `--biz-color-xxx` 变量

✓ 检验句：你的代码**不覆盖** `--e-` 开头的 token 才算过。

---

## R8 · 响应式断点用框架内置

F10 已内置 sm / md / lg / xl 等断点（具体值见 `vue-docs/style-development.md`），**不要**自己写媒体查询魔法值。

```scss
// ✅ 用框架变量
@media (min-width: $breakpoint-md) { ... }

// ❌ 写死 768px
@media (min-width: 768px) { ... }
```

✓ 检验句：grep 搜 `@media.*\d+px` 在你新增 .vue **没有命中** 才算过（除非确有特殊需求）。

---

## R9 · 表单 label-position 推荐 top

来源：`vue-docs/frontpage.md` 表单组件。

```vue
<ep-form label-position="top">  <!-- 推荐：标签在上方，内容更宽 -->
```

**特殊场景**才用 `right` / `left`（如详情页 / 紧凑表单）。

✓ 检验句：你的 `<ep-form>` 默认是 `label-position="top"` 才算过。

---

## R10 · 不要用 `!important`（除非已穷尽）

- 出现 `!important` = 通常是选择器优先级没写对 / 用错了方式
- 真要覆盖框架样式：用更具体的选择器（`.eui-page .ep-data-grid` 比 `.ep-data-grid` 优先级高）
- 实在不行用 `:deep()` 穿透（scoped 场景）

```scss
:deep(.ep-data-grid__cell) {
  padding: 8px;
}
```

✓ 检验句：grep 搜 `!important` 在你新增 .vue **没有命中** 才算过。

---

_样式问题先查 `references/docs/style-development.md` + `references/docs/troubleshooting.md`，再决定是否改样式代码。_
