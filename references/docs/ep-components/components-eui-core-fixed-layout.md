---
title: 定宽布局 FixedLayout
originUrl: http://192.168.219.170/docs/vue/latest/frame/components/eui-core/fixed-layout/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/components/eui-core/fixed-layout/)

定宽布局推荐使用 `ep-layout-manager` 的 `left + main + right` 区域实现：中间 `main` 承载定宽内容，`right` 承载真实锚点或辅助区，`left` 作为空白对称补偿区。

## 设计逻辑

该方案不再额外提供 `.eui-fixed-layout` 容器，而是复用 `ep-layout-manager` 已有布局能力：

- 外层 `ep-layout-manager` 使用 `.eui-min-width` 控制 PC 端最小设计宽度。
- `mainConfig.contentClass` 使用 `.eui-max-width` 控制中间内容最大宽度。
- `rightConfig.defaultWidth` 控制真实侧栏宽度。
- `leftConfig.defaultWidth` 提供与右侧等宽的空白补偿区。
- `leftConfig.contentClass` 增加 `.eui-layout-aside-flex` 后，左侧补偿区可在空间不足时优先弹性收缩。

## form-modal 示例

```vue
<ep-layout-manager
  class="eui-page justify-center eui-min-width"
  :main-config="{ contentClass: 'eui-main-section eui-max-width' }"
  :left-config="layoutLeftConfig"
  :right-config="layoutRightConfig"
>
  <template #main>
    <!-- 定宽表单主体 -->
  </template>

  <template #left></template>

  <template #right>
    <e-anchor
      v-if="showAnchorNav"
      class="ml-xl"
      :target="collapseTarget"
      :tags="anchorTags"
      :affix="false"
    />
  </template>
</ep-layout-manager>
```

```js
const layoutRightConfig = {
  defaultWidth: 120,
  showDivider: false,
};

const layoutLeftConfig = {
  defaultWidth: 120,
  contentClass: 'eui-layout-aside-flex',
  showDivider: false,
};
```

`right` 是真实导航侧，保持固定宽度；`left` 是对称补偿侧，默认宽度与右侧一致，但通过 `.eui-layout-aside-flex` 开启弹性收缩，避免小窗口下优先挤压中间主体。

## 辅助类

| 类名                     | 作用                                                             |
| ------------------------ | ---------------------------------------------------------------- |
| `.eui-min-width`         | 设置页面最小宽度，默认 `1366px`                                  |
| `.eui-max-width`         | 设置主体最大宽度，默认 `1280px`                                  |
| `.eui-layout-aside-flex` | 配置到 `leftConfig/rightConfig.contentClass`，让对应侧栏优先收缩 |

`.eui-layout-aside-flex` 会通过 `:has()` 作用到外层 `EAside` / `ERightbar` flex 项，使侧栏从默认固定宽度变为可优先收缩：

```scss
.e-aside:has(> .e-aside-content__wrapper > .eui-layout-aside-flex) {
  flex: 0 100 var(--e-aside-width);
  min-width: 0;
}
```

## 间距控制

公共布局只控制宽度和弹性，不内置侧栏与主体之间的间距。真实侧栏里的视觉间距由页面自行控制，例如在 `e-anchor` 上添加 `ml-xl`。

## 兼容性依据

`eui-core` 和 `@epoint-fe/eui-components` 中已经存在 `:has()` 的生产样式，例如 `opinion-input`、`button`、`anchor`、`form`、`table` 等。本布局沿用同一浏览器兼容基线。

## 使用边界

- 适用于需要“主体定宽 + 侧边锚点/辅助区 + 主体视觉居中”的 PC 端页面。
- 左右两侧的视觉对称由 `leftConfig.defaultWidth` 与 `rightConfig.defaultWidth` 控制。
- 需要哪一侧弹性收缩，就将 `.eui-layout-aside-flex` 配置到对应区域的 `contentClass` 中。
- 页面实际内容间距仍由业务页面内部控制。