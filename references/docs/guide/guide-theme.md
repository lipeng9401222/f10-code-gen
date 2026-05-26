---
title: 主题样式
originUrl: http://192.168.219.170/docs/vue/latest/component/guide/theme.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/guide/theme.html)

# 主题样式

EUI Components 的样式体系是公司整个样式系统的基石，提供了一套完整的设计令牌（Design Tokens）和样式规范。通过这套系统，可以确保整个公司产品的视觉一致性、可维护性和开发效率。

针对绝大多数开发者，无需深度阅读本文档内容，只需要：

1. 下载以下2 个文件，作为样式开发的参考依据：
  - 样式类使用规范 — [在线查看](../common/ai/eui4-utility-classes.md) · <a :href="withBase('/ai/eui4-utility-classes.md')" download target="_blank"> 点击下载原始文件</a>
  - EUI4 CSS 变量参考 — [在线查看](../common/ai/eui4-css-vars.md) · <a :href="withBase('/ai/eui4-css-vars.md')" download target="_blank">点击下载原始文件</a>
2. 明确给你用的 AI 声明:

```
Style Guidelines

本项目使用 EUI4 设计风格，样式实现上请严格遵循以下要求：

### 强制规则（必须遵守）

**禁止硬编码样式值：**
- ❌ 禁止使用内联样式 `style="width: 200px"`
- ❌ 禁止在 SCSS 中硬编码数值：`font-size: 14px`、`padding: 20px`、`color: #333` 等
- ❌ 禁止硬编码颜色值：必须使用 CSS 变量
- ❌ 禁止硬编码尺寸值：必须使用 CSS 变量或 utility classes

**必须使用的方案（按优先级）：**
1. **优先使用 utility classes** - 见 `.cursor/rules/eui4-utility-classes.mdc`
   - 例如：`class="p-m mb-l text-primary"`
2. **其次使用 CSS 变量** - 见 `.cursor/rules/css-var.mdc`
   - 例如：`padding: var(--e-space-m)`、`color: var(--e-text-color-primary)`
3. **必要时使用语义化 class** - 在 `<style scoped>` 中定义，内部仍使用 CSS 变量
   - 例如：`.filter-input { width: 180px }` 然后在模板中 `class="filter-input"`

**样式文件规范：**
- Style files should be written in SCSS
- Class naming should follow the BEM methodology
- Avoid writing large amounts of repetitive styles - implement proper abstraction and extraction

**参考文档：**
- Utility Classes: @see `[下面下载的 eui4-utility-classes 文件路径]`
- CSS Variables: @see `[下面下载的 eui4-css-vars 文件路径]`

```

> **💡 提示**
>
> 注意不要无脑复制粘贴，要修改一下最后 2 行的文件的实际路径。


## 样式体系概述

EUI Components 的样式体系包含以下核心特性：

- **统一的设计令牌** - 标准化的颜色、间距、字体、圆角等设计变量
- **CSS 变量系统** - 支持运行时动态修改主题，无需重新编译
- **暗黑模式支持** - 内置暗黑主题，开箱即用
- **样式类库** - 提供原子化的 CSS 样式类，快速构建 UI
- **按需加载** - 支持全量引入和按需引入组件样式

## 引入样式

### 全量引入

完整引入所有组件的样式，适用于大多数项目：

```javascript
import '@epoint-fe/eui-components/dist/index.css';
```

### 按需引入

只引入需要使用的组件样式，减少打包体积：

```javascript
// 按需引入特定组件样式
import '@epoint-fe/eui-components/theme-chalk/e-button.css';
import '@epoint-fe/eui-components/theme-chalk/e-input.css';
import '@epoint-fe/eui-components/theme-chalk/e-select.css';
```

> **💡 提示**
>
> 推荐使用按需引入的方式，特别是对于大型项目，可以显著减少最终的 CSS 体积。

## 自定义主题

EUI Components 提供了灵活的主题定制能力，无需修改组件库源码即可实现样式定制。

### 方式一：CSS 变量覆盖（推荐）

通过 CSS 变量覆盖，可以快速修改主题色、字体、圆角等基础样式：

```css
/* 在项目的全局样式文件中，例如 global.css */
:root {
  /* 修改主题色 */
  --e-color-primary: #1890ff;
  --e-color-success: #52c41a;
  --e-color-warning: #faad14;
  --e-color-danger: #ff4d4f;

  /* 修改圆角 */
  --e-border-radius-base: 6px;
  --e-border-radius-small: 4px;

  /* 修改字体 */
  --e-font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}
```

**完整示例：**

```vue
<template>
  <div class="app">
    <e-button>默认按钮</e-button>
    <e-button type="primary">主要按钮</e-button>
    <e-button type="success">成功按钮</e-button>
  </div>
</template>

<script setup>
// 引入组件
import { EButton } from '@epoint-fe/eui-components';
</script>

<style>
/* 全局样式 */
:root {
  --e-color-primary: #1890ff;
  --e-border-radius-base: 6px;
}
</style>
```

### 方式二：组件级样式定制

针对特定组件进行样式定制：

```vue
<template>
  <div class="custom-button-group">
    <e-button class="custom-primary">自定义按钮</e-button>
  </div>
</template>

<style>
/* 只针对特定组件进行定制 */
.custom-button-group .custom-primary {
  --e-button-border-radius: 20px;
  --e-button-bg-color: #1890ff;
  --e-button-padding-horizontal: 24px;
}
</style>
```

### 方式三：使用 ConfigProvider 组件

通过 `EConfigProvider` 组件在应用级别设置变量，适用于运行时动态主题切换：

```vue
<template>
  <e-config-provider :theme-vars="themeVars">
    <div class="app">
      <e-button>使用自定义主题的按钮</e-button>
      <e-input>使用自定义主题的输入框</e-input>
    </div>
  </e-config-provider>
</template>

<script setup>
import { reactive } from 'vue';

const themeVars = reactive({
  '--e-color-primary': '#1890ff',
  '--e-border-radius-base': '8px',
  '--e-font-size-base': '14px',
});
</script>
```

## 暗黑模式

EUI Components 内置了暗黑模式支持，能够自动适配暗黑主题。

### 开启暗黑模式

在 HTML 根元素添加 `dark` 类即可开启暗黑模式：

```javascript
// 开启暗黑模式
document.documentElement.classList.add('dark');

// 关闭暗黑模式
document.documentElement.classList.remove('dark');
```

### 暗黑模式切换示例

```vue
<template>
  <div class="theme-switcher">
    <e-button @click="toggleDarkMode">
      <e-icon>
        <template v-if="isDark">
          <SunOutlined />
        </template>
        <template v-else>
          <MoonOutlined />
        </template>
      </e-icon>
      {{ isDark ? '切换到亮色模式' : '切换到暗黑模式' }}
    </e-button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const isDark = ref(false);

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// 检测系统主题偏好
onMounted(() => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  }

  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    isDark.value = e.matches;
    if (e.matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });
});
</script>
```

> **💡 提示**
>
> 暗黑模式会自动适配所有内置组件的样式，无需额外的配置。

## 使用 CSS 变量

EUI Components 提供了丰富的 CSS 变量，可以在自定义样式中直接使用。

### 通用变量

#### 颜色变量

```css
--e-color-primary: #2370ef;
--e-color-success: #00b042;
--e-color-warning: #ff9200;
--e-color-danger: #f44830;
--e-color-info: #909399;
--e-color-white: #ffffff;
--e-color-black: #000000;

/* 颜色阶数 */
--e-color-primary-light-2;
--e-color-primary-light-9;
--e-color-primary-dark-2;
```

#### 文字颜色

```css
--e-text-color-primary: #171a1d;
--e-text-color-secondary: #747677;
--e-text-color-third: #b9babb;
--e-text-color-placeholder: #d1d1d2;
```

#### 背景颜色

```css
--e-bg-color: #ffffff;
--e-bg-color-page: #f2f3f5;
--e-bg-color-overlay: #ffffff;
```

#### 圆角

```css
--e-border-radius-mini: 4px;
--e-border-radius-small: 6px;
--e-border-radius-base: 8px;
--e-border-radius-large: 10px;
--e-border-radius-round: 999px;
```

#### 间距

```css
--e-space-xs: 2px;
--e-space-s: 4px;
--e-space-m: 8px;
--e-space-l: 12px;
--e-space-xl: 16px;
--e-space-xxl: 24px;
--e-space-xxxl: 36px;
```

#### 阴影

```css
--e-shadow-s: 0 2px 8px 0 rgba(23, 26, 29, 0.04);
--e-shadow-m: 0 8px 24px 0 rgba(23, 26, 29, 0.1);
--e-shadow-l: 0 12px 32px 0 rgba(23, 26, 29, 0.24);
--e-shadow-xl: 0 12px 36px 0 rgba(23, 26, 29, 0.3);
```

### 在项目中使用 CSS 变量

```vue
<template>
  <div class="custom-card">
    <div class="custom-header">标题</div>
    <div class="custom-content">内容区域</div>
  </div>
</template>

<style scoped>
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

.custom-content {
  color: var(--e-text-color-secondary);
  font-size: var(--e-font-size-base);
  line-height: var(--e-font-line-height-base);
}
</style>
```

> **💡 提示**
>
> 完整的 CSS 变量列表请参考 [EUI4 CSS 变量参考](../common/ai/eui4-css-vars.md)。

## 使用样式类

EUI Components 提供了原子化的 CSS 样式类，可以快速构建布局和样式，避免编写自定义 CSS。

### 基础使用

```vue
<template>
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

### 常用样式类

#### 布局

```css
/* Flex 布局 */
.flex           /* flex 布局 */
.flex-row       /* 水平排列 */
.flex-col       /* 垂直排列 */
.items-center   /* 垂直居中 */
.justify-between /* 两端对齐 */
.gap-s         /* 间距: var(--e-space-s) */

/* 尺寸 */
.h-lg           /* 高度: var(--e-size-large) */
```

#### 间距

```css
/* 外边距 */
.m-xs, .m-s, .m-m, .m-l, .m-xl
.mt-m          /* 上边距 */
.mb-l          /* 下边距 */
.mx-l          /* 左右边距 */
.my-l          /* 上下边距 */

/* 内边距 */
.p-xs, .p-s, .p-m, .p-l, .p-xl
.px-l          /* 左右内边距 */
.py-l          /* 上下内边距 */
```

#### 字体

```css
.text-sm        /* 小字体 */
.text-base      /* 基础字体 */
.text-lg        /* 大字体 */
.fw-md          /* 中等粗细 */
.fw-bold        /* 粗体 */
```

#### 颜色

```css
.text-primary    /* 主要文字颜色 */
.text-secondary  /* 次要文字颜色 */
.text-success    /* 成功色文字 */
.bg-white       /* 白色背景 */
.bg-page        /* 页面背景 */
.bg-fill        /* 填充背景 */
.bg-primary     /* 主色背景 */
```

#### 边框和圆角

```css
.border         /* 默认边框 */
.border-none    /* 去除边框 */
.rounded        /* 基础圆角 */
.rounded-lg     /* 大圆角 */
.rounded-full   /* 圆形 */
```

#### 阴影

```css
.shadow-sm      /* 小阴影 */
.shadow         /* 中等阴影 */
.shadow-lg      /* 大阴影 */
```

> **💡 提示**
>
> 完整的样式类列表和使用规范请参考 [样式类使用规范](../common/ai/eui4-utility-classes.md)。

## 常见场景

### 场景一：自定义品牌色

将组件库的主题色改为品牌色：

```css
:root {
  /* 品牌主色 */
  --e-color-primary: #1890ff;

  /* 相关的颜色阶数会自动调整 */
}
```

### 场景二：调整组件圆角

统一调整所有组件的圆角大小：

```css
:root {
  --e-border-radius-base: 4px;
  --e-border-radius-small: 2px;
  --e-border-radius-large: 6px;
}
```

### 场景三：自定义卡片样式

使用 CSS 变量和样式类构建自定义卡片：

```vue
<template>
  <div class="custom-card bg-white rounded shadow p-l">
    <div class="custom-header flex items-center mb-m">
      <h4 class="text-lg fw-bold text-primary">卡片标题</h4>
    </div>
    <div class="custom-content text-base text-secondary">
      这是卡片的内容区域，使用了 EUI4 的设计令牌和样式类。
    </div>
    <div class="custom-footer flex justify-end gap-s mt-l">
      <e-button size="small">取消</e-button>
      <e-button type="primary" size="small">确定</e-button>
    </div>
  </div>
</template>

<style scoped>
.custom-card {
  /* 使用 CSS 变量自定义样式 */
  --custom-padding: var(--e-space-xxl);

  padding: var(--custom-padding);
  /* 其他样式使用样式类 */
}
</style>
```

### 场景四：响应式布局

结合 CSS 变量和媒体查询实现响应式设计：

```vue
<template>
  <div class="responsive-layout">
    <div class="item">项目 1</div>
    <div class="item">项目 2</div>
    <div class="item">项目 3</div>
  </div>
</template>

<style scoped>
.responsive-layout {
  display: flex;
  flex-direction: column;
  gap: var(--e-space-m);
}

.item {
  padding: var(--e-space-l);
  font-size: var(--e-font-size-base);
}

/* 平板设备 */
@media (min-width: 768px) {
  .responsive-layout {
    flex-direction: row;
  }

  .item {
    flex: 1;
  }
}

/* 桌面设备 */
@media (min-width: 1200px) {
  .item {
    font-size: var(--e-font-size-large);
  }
}
</style>
```

## 最佳实践

### 1. 优先使用设计令牌

在自定义样式时，优先使用 EUI Components 提供的 CSS 变量：

```css
/* 推荐：使用 CSS 变量 */
.custom-component {
  padding: var(--e-space-xl);
  background-color: var(--e-bg-color-page);
  border-radius: var(--e-border-radius-base);
}

/* 不推荐：硬编码样式 */
.custom-component {
  padding: 16px;
  background-color: #f2f3f5;
  border-radius: 8px;
}
```

### 2. 使用样式类提高开发效率

优先使用内置的样式类，避免重复编写 CSS：

```vue
<template>
  <!-- 推荐：使用样式类 -->
  <div class="flex items-center gap-s p-l bg-white rounded shadow">
    内容
  </div>

  <!-- 不推荐：编写自定义样式 -->
  <div class="custom-wrapper">
    内容
  </div>
</template>

<style scoped>
.custom-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.1);
}
</style>
```

### 3. 保持样式一致性

遵循 EUI Components 的设计规范，确保整个产品的视觉一致性：

- **颜色**: 使用标准颜色变量，不要随意定义新颜色
- **间距**: 使用标准间距变量（xs/s/m/l/xl/xxl/xxxl）
- **字体**: 使用标准字体大小（small/base/medium/large/extra-large）
- **圆角**: 使用标准圆角变量（mini/small/base/large/round）

### 4. 合理使用主题定制

主题定制适用于全局样式调整，对于特定组件的特殊样式，优先考虑：

1. 通过组件的 props 调整
2. 使用组件的插槽自定义内容
3. 使用 CSS 变量覆盖组件样式

```vue
<template>
  <!-- 推荐：使用组件 props -->
  <e-button type="primary" size="large">按钮</e-button>

  <!-- 推荐：使用插槽自定义 -->
  <e-button>
    <template #icon>
      <CustomIcon />
    </template>
    自定义按钮
  </e-button>

  <!-- 推荐：使用 CSS 变量覆盖 -->
  <div class="button-wrapper">
    <e-button>按钮</e-button>
  </div>
</template>

<style>
.button-wrapper .e-button {
  --e-button-border-radius: 20px;
}
</style>
```

### 5. 处理浏览器兼容性

CSS 变量在现代浏览器中都有良好支持，如需支持旧浏览器，提供回退方案：

```css
.e-button {
  /* 回退值 */
  background-color: #ffffff;
  background-color: var(--e-button-bg-color);

  /* 回退值 */
  border-radius: 4px;
  border-radius: var(--e-border-radius-small);
}
```

## 常见问题

### Q: 如何修改所有组件的默认圆角？

**A:** 在全局样式中覆盖圆角变量：

```css
:root {
  --e-border-radius-mini: 2px;
  --e-border-radius-small: 4px;
  --e-border-radius-base: 6px;
  --e-border-radius-large: 8px;
}
```

### Q: 如何自定义某个组件的特定样式？

**A:** 可以通过以下几种方式：

1. 使用 CSS 变量覆盖组件样式
2. 使用组件的 props 进行配置
3. 通过插槽自定义内容
4. 直接使用样式类构建自定义组件

```vue
<template>
  <!-- 方式一：CSS 变量覆盖 -->
  <div class="custom-button-wrapper">
    <e-button>按钮</e-button>
  </div>

  <!-- 方式二：使用 props -->
  <e-button type="primary" size="large">按钮</e-button>

  <!-- 方式三：使用插槽 -->
  <e-button>
    <template #icon>
      <CustomIcon />
    </template>
    按钮
  </e-button>

  <!-- 方式四：使用样式类构建 -->
  <button class="px-l py-m bg-primary text-white rounded shadow-sm cursor-pointer">
    自定义按钮
  </button>
</template>

<style>
.custom-button-wrapper .e-button {
  --e-button-border-radius: 20px;
}
</style>
```

### Q: 暗黑模式下某些组件显示不正常？

**A:** 确保已正确引入主题样式，并检查是否添加了 `dark` 类：

```javascript
// 检查 dark 类
console.log(document.documentElement.classList.contains('dark'));

// 开启暗黑模式
document.documentElement.classList.add('dark');
```

### Q: CSS 变量不生效？

**A:** 检查以下几点：

1. 确保在引入主题样式 **之后**设置 CSS 变量
2. 检查 CSS 变量名是否正确（以 `--e-` 开头）
3. 检查选择器优先级是否足够

```javascript
// 正确的引入顺序
import '@epoint-fe/eui-components/dist/index.css'; // 先引入主题
import './global.css';                                 // 后引入自定义样式
```

### Q: 如何在多个项目间共享主题？

**A:** 将主题配置抽离为独立的样式文件：

```css
/* theme-default.css */
:root {
  --e-color-primary: #2370ef;
  --e-border-radius-base: 8px;
  --e-font-size-base: 14px;
}
```

```css
/* theme-dark.css */
:root {
  --e-bg-color: #141414;
  --e-text-color-primary: #e5eaf3;
}
```

然后在各个项目中引入对应的主题文件：

<!-- eslint-skip -->

```javascript
// 默认主题
import '@epoint-fe/eui-components/dist/index.css';
import './theme-default.css';

// 暗黑主题
import '@epoint-fe/eui-components/dist/index.css';
import './theme-dark.css';
```

### Q: 样式类不够用时怎么办？

**A:** 样式类提供了常用的原子样式，对于特殊需求：

1. 使用 CSS 变量保持一致性
2. 组合多个样式类实现复杂效果
3. 编写自定义样式时，遵循设计令牌

```vue
<template>
  <!-- 组合使用样式类 -->
  <div class="flex items-center justify-between gap-s p-l bg-fill rounded border">
    <div class="text-base text-primary">左侧内容</div>
    <div class="text-sm text-secondary">右侧内容</div>
  </div>

  <!-- 对于特殊需求，使用 CSS 变量 -->
  <div class="custom-component">
    特殊内容
  </div>
</template>

<style scoped>
.custom-component {
  /* 使用设计令牌保持一致性 */
  padding: var(--e-space-xxl);
  background-color: var(--e-bg-color-page);
  border-radius: var(--e-border-radius-large);
  box-shadow: var(--e-shadow-m);
}
</style>
```

## 相关资源

- [EUI4 CSS 变量参考](../common/ai/eui4-css-vars.md) - 完整的 CSS 变量列表和使用示例
- [样式类使用规范](../common/ai/eui4-utility-classes.md) - 原子化样式类列表和使用指南