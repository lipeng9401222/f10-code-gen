---
title: Page Header 页头
originUrl: http://192.168.219.170/docs/vue/latest/component/component/page-header.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/page-header.html)

# Page Header 页头

如果页面的路径比较简单，推荐使用页头组件而非面包屑组件。

## 完整示例

**Demo 示例**: `page-header/complete`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/page-header.html)

```vue
<template>
  <div aria-label="A complete example of page header">
    <e-page-header @back="onBack">
      <template #breadcrumb>
        <e-breadcrumb separator="/">
          <e-breadcrumb-item :to="{ path: './page-header.html' }"> homepage </e-breadcrumb-item>
          <e-breadcrumb-item><a href="./page-header.html">route 1</a></e-breadcrumb-item>
          <e-breadcrumb-item>route 2</e-breadcrumb-item>
        </e-breadcrumb>
      </template>
      <template #content>
        <div class="flex items-center">
          <e-avatar class="mr-3" :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <span class="text-large font-600 mr-3"> Title </span>
          <span class="text-sm mr-2" style="color: var(--e-text-color-regular)"> Sub title </span>
          <e-tag>Default</e-tag>
        </div>
      </template>
      <template #extra>
        <div class="flex items-center">
          <e-button>Print</e-button>
          <e-button type="primary" class="ml-2">Edit</e-button>
        </div>
      </template>

      <e-descriptions :column="3" size="small" class="mt-4">
        <e-descriptions-item label="Username">kooriookami</e-descriptions-item>
        <e-descriptions-item label="Telephone">18100000000</e-descriptions-item>
        <e-descriptions-item label="Place">Suzhou</e-descriptions-item>
        <e-descriptions-item label="Remarks">
          <e-tag size="small">School</e-tag>
        </e-descriptions-item>
        <e-descriptions-item label="Address"
          >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
        </e-descriptions-item>
      </e-descriptions>
      <p class="mt-4 text-sm">
        Element Plus team uses <b>weekly</b> release strategy under normal circumstance, but critical bug fixes would
        require hotfix so the actual release number <b>could be</b> more than 1 per week.
      </p>
    </e-page-header>
  </div>
</template>

<script setup lang="ts">
import { ENotification as notify } from '@epoint-fe/eui-components';

const onBack = () => {
  notify('Back');
};
</script>

```

## 基础用法

简单场景下的标准页头。

**Demo 示例**: `page-header/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/page-header.html)

```vue
<template>
  <e-page-header @back="goBack">
    <template #content>
      <span class="text-large font-600 mr-3"> Title </span>
    </template>
  </e-page-header>
</template>
<script lang="ts" setup>
const goBack = () => {
  console.log('go back');
};
</script>

```

## 自定义图标

默认图标可能无法满足您的需求，您可以通过设置 `icon` 属性来自定义图标，示例如下。

**Demo 示例**: `page-header/custom-icon`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/page-header.html)

```vue
<template>
  <e-page-header :icon="ArrowLeft">
    <template #content>
      <span class="text-large font-600 mr-3"> Title </span>
    </template>
  </e-page-header>
</template>

<script lang="ts" setup>
import { ArrowLeft } from '@epoint-fe/eui-icons';
</script>

```

## 无图标

有时，页面全是元素，您可能不想展示页面上方的图标，您可以设置 `icon` 属性值为 `null` 来去除它。

**Demo 示例**: `page-header/no-icon`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/page-header.html)

```vue
<template>
  <e-page-header :icon="null">
    <template #content>
      <span class="text-large font-600 mr-3"> Title </span>
    </template>
  </e-page-header>
</template>

```

## 面包屑导航

使用页头组件，您可以通过添加插槽 `breadcrumb` 来设置面包屑路由导航。

**Demo 示例**: `page-header/breadcrumb`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/page-header.html)

```vue
<template>
  <e-page-header>
    <template #breadcrumb>
      <e-breadcrumb separator="/">
        <e-breadcrumb-item :to="{ path: './page-header.html' }"> homepage </e-breadcrumb-item>
        <e-breadcrumb-item><a href="./page-header.html">route 1</a></e-breadcrumb-item>
        <e-breadcrumb-item>route 2</e-breadcrumb-item>
      </e-breadcrumb>
    </template>
    <template #content>
      <span class="text-large font-600 mr-3"> Title </span>
    </template>
  </e-page-header>
</template>

```

## 额外操作部分

头部可能会变得很复杂，您可以在头部添加更多的区块，以允许丰富的交互。

**Demo 示例**: `page-header/additional-sections`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/page-header.html)

```vue
<template>
  <e-page-header :icon="null">
    <template #content>
      <div class="flex items-center">
        <e-avatar :size="32" class="mr-3" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <span class="text-large font-600 mr-3"> Title </span>
        <span class="text-sm mr-2" style="color: var(--e-text-color-regular)"> Sub title </span>
        <e-tag>Default</e-tag>
      </div>
    </template>
    <template #extra>
      <div class="flex items-center">
        <e-button>Print</e-button>
        <e-button type="primary" class="ml-2">Edit</e-button>
      </div>
    </template>
  </e-page-header>
</template>

```

## 主要内容

有时我们想让页头显示一些协同响应内容，我们可以使用 `default` 插槽。

**Demo 示例**: `page-header/main-content`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/page-header.html)

```vue
<template>
  <e-page-header>
    <template #content>
      <span class="text-large font-600 mr-3"> Title </span>
    </template>
    <div class="mt-4 text-sm font-bold">
      Your additional content can be added with default slot, You may put as many content as you want here.
    </div>
  </e-page-header>
</template>

```

## 组件插槽结构

本组件由这些部件构成：

```vue
<template>
  <e-page-header>
    <!-- Line 1 -->
    <template #breadcrumb />
    <!-- Line 2 -->
    <template #icon />
    <template #title />
    <template #content />
    <template #extra />
    <!-- Lines after 2 -->
    <template #default />
  </e-page-header>
</template>
```

## API

### Attributes

| Name    | Description                       | Type                     | Default |
| ------- | --------------------------------- | ------------------------ | ------- |
| icon    | Page Header 的图标 Icon 组件      | ^[string] / ^[Component] | Back    |
| title   | Page Header 的主标题，默认是 Back | ^[string]                | ''      |
| content | Page Header 的内容                | ^[string]                | ''      |

### Events

| Name | Description      | Type                    |
| ---- | ---------------- | ----------------------- |
| back | 点击左侧区域触发 | ^[Function]`() => void` |

### Slots

| Name       | Description    |
| ---------- | -------------- |
| icon       | 图标内容       |
| title      | 标题内容       |
| content    | 内容           |
| extra      | 扩展设置       |
| breadcrumb | 面包屑导航内容 |
| default    | 默认内容       |