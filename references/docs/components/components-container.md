---
title: Container 布局容器
originUrl: http://192.168.219.170/docs/vue/latest/component/component/container.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/container.html)

# Container 布局容器

用于构建页面基本结构的容器组件：

`<e-container>`：包装容器。当与 `<e-header>` 或 `<e-footer>` 嵌套使用时，其所有子元素将垂直排列。否则水平排列。

`<e-header>`：头部容器。

`<e-aside>`：侧边栏容器（通常是侧边导航）。

`<e-rightbar>`：右侧边栏容器。

`<e-main>`：主要内容容器。

`<e-footer>`：页脚容器。

> **💡 提示**
>
> 这些组件使用 Flex 布局，请确保您的浏览器支持它。此外，`<e-container>` 的直接子元素必须是其中五个组件中的一个或多个。而后五个组件的父元素必须是 `<e-container>`。
> 
> 组合说明：
> 
> 1. Main 可以和任何其他组件在同一层级组合。
> 2. Container 下可以直接有 Main + (Header / Footer)，或者是 Main + (Aside / Rightbar)。
> 3. Header 和 (Aside / Rightbar) **不能**在同一层级组合，需要再次搭配 Container 进行组合。
> 4. Footer 和 (Aside / Rightbar) **不能**在同一层级组合，需要再次搭配 Container 进行组合。

## 常见布局

<style lang="scss">
@use '../examples/container/common-layout.scss';
</style>

**Demo 示例**: `container/layout-hm`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/container.html)

```vue
<template>
  <div class="common-layout">
    <e-container>
      <e-header>Header</e-header>
      <e-main>Main</e-main>
    </e-container>
  </div>
</template>

```

**Demo 示例**: `container/layout-hmf`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/container.html)

```vue
<template>
  <div class="common-layout">
    <e-container>
      <e-header>Header</e-header>
      <e-main>Main</e-main>
      <e-footer>Footer</e-footer>
    </e-container>
  </div>
</template>

```

**Demo 示例**: `container/layout-am`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/container.html)

```vue
<template>
  <div class="common-layout">
    <e-container>
      <e-aside width="200px">Aside</e-aside>
      <e-main>Main</e-main>
    </e-container>
  </div>
</template>

```

**Demo 示例**: `container/layout-ham`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/container.html)

```vue
<template>
  <div class="common-layout">
    <e-container>
      <e-header>Header</e-header>
      <e-container>
        <e-aside width="200px">Aside</e-aside>
        <e-main>Main</e-main>
      </e-container>
    </e-container>
  </div>
</template>

```

**Demo 示例**: `container/layout-hamf`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/container.html)

```vue
<template>
  <div class="common-layout">
    <e-container>
      <e-header>Header</e-header>
      <e-container>
        <e-aside width="200px">Aside</e-aside>
        <e-container>
          <e-main>Main</e-main>
          <e-footer>Footer</e-footer>
        </e-container>
      </e-container>
    </e-container>
  </div>
</template>

```

**Demo 示例**: `container/layout-ahm`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/container.html)

```vue
<template>
  <div class="common-layout">
    <e-container>
      <e-aside width="200px">Aside</e-aside>
      <e-container>
        <e-header>Header</e-header>
        <e-main>Main</e-main>
      </e-container>
    </e-container>
  </div>
</template>

```

**Demo 示例**: `container/layout-ahmf`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/container.html)

```vue
<template>
  <div class="common-layout">
    <e-container>
      <e-aside width="200px" toggleable resizeable>Aside</e-aside>
      <e-container>
        <e-header toggleable>Header</e-header>
        <e-main>Main</e-main>
        <e-footer toggleable>Footer</e-footer>
      </e-container>

      <e-rightbar width="200px" toggleable>rightbar</e-rightbar>
    </e-container>
  </div>
</template>

```

## 最大最小尺寸约束

通过 `maxHeight` / `minHeight`、`maxWidth` / `minWidth` 属性可以限制子组件的尺寸范围，同时配合 `resizeable` 属性可以在拖拽调整时生效。

**Demo 示例**: `container/max-min-size`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/container.html)

```vue
<template>
  <div class="common-layout">
    <e-container>
      <e-aside :width="200" :min-width="100" :max-width="300" resizeable> 侧边栏 (100-300px) </e-aside>
      <e-container>
        <e-header :height="60" :min-height="40" :max-height="100"> 头部 (40-100px) </e-header>
        <e-main>主要内容</e-main>
        <e-footer :height="50" :min-height="30" :max-height="80"> 页脚 (30-80px) </e-footer>
      </e-container>
      <e-rightbar :width="150" :min-width="80" :max-width="250" resizeable> 右侧栏 (80-250px) </e-rightbar>
    </e-container>
  </div>
</template>

```

## 示例

**Demo 示例**: `container/example`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/container.html)

```vue
<template>
  <e-container class="layout-container-demo" style="height: 500px">
    <e-aside width="200px">
      <e-scrollbar>
        <e-menu :default-openeds="['1', '3']">
          <e-sub-menu index="1">
            <template #title>
              <e-icon><message /></e-icon>Navigator One
            </template>
            <e-menu-item-group>
              <template #title>Group 1</template>
              <e-menu-item index="1-1">Option 1</e-menu-item>
              <e-menu-item index="1-2">Option 2</e-menu-item>
            </e-menu-item-group>
            <e-menu-item-group title="Group 2">
              <e-menu-item index="1-3">Option 3</e-menu-item>
            </e-menu-item-group>
            <e-sub-menu index="1-4">
              <template #title>Option4</template>
              <e-menu-item index="1-4-1">Option 4-1</e-menu-item>
            </e-sub-menu>
          </e-sub-menu>
          <e-sub-menu index="2">
            <template #title>
              <e-icon><icon-menu /></e-icon>Navigator Two
            </template>
            <e-menu-item-group>
              <template #title>Group 1</template>
              <e-menu-item index="2-1">Option 1</e-menu-item>
              <e-menu-item index="2-2">Option 2</e-menu-item>
            </e-menu-item-group>
            <e-menu-item-group title="Group 2">
              <e-menu-item index="2-3">Option 3</e-menu-item>
            </e-menu-item-group>
            <e-sub-menu index="2-4">
              <template #title>Option 4</template>
              <e-menu-item index="2-4-1">Option 4-1</e-menu-item>
            </e-sub-menu>
          </e-sub-menu>
          <e-sub-menu index="3">
            <template #title>
              <e-icon><setting /></e-icon>Navigator Three
            </template>
            <e-menu-item-group>
              <template #title>Group 1</template>
              <e-menu-item index="3-1">Option 1</e-menu-item>
              <e-menu-item index="3-2">Option 2</e-menu-item>
            </e-menu-item-group>
            <e-menu-item-group title="Group 2">
              <e-menu-item index="3-3">Option 3</e-menu-item>
            </e-menu-item-group>
            <e-sub-menu index="3-4">
              <template #title>Option 4</template>
              <e-menu-item index="3-4-1">Option 4-1</e-menu-item>
            </e-sub-menu>
          </e-sub-menu>
        </e-menu>
      </e-scrollbar>
    </e-aside>

    <e-container>
      <e-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <e-dropdown>
            <e-icon style="margin-right: 8px; margin-top: 1px"><setting /></e-icon>
            <template #dropdown>
              <e-dropdown-menu>
                <e-dropdown-item>View</e-dropdown-item>
                <e-dropdown-item>Add</e-dropdown-item>
                <e-dropdown-item>Delete</e-dropdown-item>
              </e-dropdown-menu>
            </template>
          </e-dropdown>
          <span>Tom</span>
        </div>
      </e-header>

      <e-main>
        <e-scrollbar>
          <e-table :data-source="tableData" :columns="columns" />
        </e-scrollbar>
      </e-main>
    </e-container>
  </e-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Menu as IconMenu, Message, Setting } from '@epoint-fe/eui-icons';

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
};
const tableData = ref(Array.from({ length: 20 }).fill(item));

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    width: 140,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
</script>

<style scoped>
.layout-container-demo .e-header {
  position: relative;
  background-color: var(--e-color-primary-light-7);
  color: var(--e-text-color-primary);
}
.layout-container-demo .e-aside {
  color: var(--e-text-color-primary);
  background: var(--e-color-primary-light-8);
}
.layout-container-demo .e-menu {
  border-right: none;
}
.layout-container-demo .e-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>

```

## Container API

### Container Attributes

| Name      | Description             | Type                                | Default                                                               |
| --------- | ---------------- | ----------------------------------- | -------------------------------------------------------------------- |
| direction | 子元素的布局方向 | ^[enum]`'horizontal' \| 'vertical'` | 当与 `e-header` 或 `e-footer` 嵌套时为垂直，否则为水平，无须手动设置 |

### Container Slots

| Name    | Description           | 子标签                                                |
| ------- | -------------- | ----------------------------------------------------- |
| default | 自定义默认内容 | Container / Header / Aside / Main / Rightbar / Footer |

## Header API

### Header Attributes

| Name         | Description               | Type               | Default  |
| ------------ | ------------------ | ------------------ | ------- |
| height       | 头部高度           | ^[string] / ^[number] | auto    |
| maxHeight    | 头部最大高度        | ^[string] / ^[number] | -       |
| minHeight    | 头部最小高度        | ^[string] / ^[number] | -       |
| contentClass | 容器的 classname   | ^[string]          |         |
| toggleable   | 是否可收起         | ^[boolean]         | `false` |
| resizeable   | 是否可拖拽调整大小 | ^[boolean]         | `false` |
| collapse     | 当前是否收起       | ^[boolean]         | `false` |

### Header Slots

| Name    | Description           |
| ------- | -------------- |
| default | 自定义默认内容 |

## Aside API

### Aside Attributes

| Name  | Description       | Type               | Default |
| ----- | ------------------ | ------------------ | ------ |
| width | 侧边栏宽度 | ^[string] / ^[number] | 300px  |
| maxWidth | 侧边栏最大宽度 | ^[string] / ^[number] | - |
| minWidth | 侧边栏最小宽度 | ^[string] / ^[number] | - |
| contentClass | 容器的 classname   | ^[string]          |         |
| toggleable   | 是否可收起         | ^[boolean] | `false` |
| resizeable   | 是否可拖拽调整大小 | ^[boolean] | `false` |
| collapse     | 当前是否收起       | ^[boolean] | `false` |

### Aside Slots

| Name    | Description           |
| ------- | -------------- |
| default | 自定义默认内容 |

## Main API

### Main Attributes

| Name         | Description             | Type       | Default |
| ------------ | ----------------------- | ---------- | ------- |
| contentClass | 容器的 classname        | ^[string]  |         |

### Main Slots

| Name    | Description           |
| ------- | -------------- |
| default | 自定义默认内容 |

## Rightbar API

### Rightbar Attributes

| Name  | Description       | Type               | Default |
| ----- | ------------------ | ------------------ | ------ |
| width | 侧边栏宽度 | ^[string] / ^[number] | 300px  |
| maxWidth | 侧边栏最大宽度 | ^[string] / ^[number] | - |
| minWidth | 侧边栏最小宽度 | ^[string] / ^[number] | - |
| contentClass | 容器的 classname   | ^[string]          |         |
| toggleable   | 是否可收起         | ^[boolean] | `false` |
| resizeable   | 是否可拖拽调整大小 | ^[boolean] | `false` |
| collapse     | 当前是否收起       | ^[boolean] | `false` |

### Rightbar Slots

| Name    | Description           |
| ------- | -------------- |
| default | 自定义默认内容 |

## Footer API

### Footer Attributes

| Name   | Description     | Type               | Default |
| ------ | ------------------ | ------------------ | ------ |
| height | 页脚高度 | ^[string] / ^[number] | auto   |
| maxHeight | 页脚最大高度 | ^[string] / ^[number] | - |
| minHeight | 页脚最小高度 | ^[string] / ^[number] | - |
| contentClass | 容器的 classname   | ^[string]          |         |
| toggleable   | 是否可收起         | ^[boolean] | `false` |
| resizeable   | 是否可拖拽调整大小 | ^[boolean] | `false` |
| collapse     | 当前是否收起       | ^[boolean] | `false` |

### Footer Slots

| Name    | Description           |
| ------- | -------------- |
| default | 自定义默认内容 |