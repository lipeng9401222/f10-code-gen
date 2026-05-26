---
title: Menu 菜单
originUrl: http://192.168.219.170/docs/vue/latest/component/component/menu.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/menu.html)

# Menu 菜单

为网站提供导航功能的菜单。

> **💡 提示**
>
> 在 SSR 场景下，您需要将组件包裹在 `<client-only></client-only>` 之中。

## 顶栏

顶部栏菜单可以在各种场景中使用。

**Demo 示例**: `menu/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/menu.html)

```vue
<template>
  <e-menu :default-active="activeIndex" class="e-menu-demo" mode="horizontal" @select="handleSelect">
    <e-menu-item index="1">数据处理中心</e-menu-item>
    <e-sub-menu index="2">
      <template #title>工作台</template>
      <e-menu-item index="2-1">菜单1</e-menu-item>
      <e-menu-item index="2-2">菜单2</e-menu-item>
      <e-menu-item index="2-3">菜单3</e-menu-item>
      <e-sub-menu index="2-4">
        <template #title>item four</template>
        <e-menu-item index="2-4-1">菜单1</e-menu-item>
        <e-menu-item index="2-4-2">菜单2</e-menu-item>
        <e-menu-item index="2-4-3">菜单3</e-menu-item>
      </e-sub-menu>
    </e-sub-menu>
    <e-menu-item index="3" disabled>禁用的菜单</e-menu-item>
    <e-menu-item index="4">其他菜单</e-menu-item>
  </e-menu>
  <div class="h-6" />
  <e-menu
    :default-active="activeIndex2"
    class="e-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleSelect"
  >
    <e-menu-item index="1">数据处理中心</e-menu-item>
    <e-sub-menu index="2">
      <template #title>工作台</template>
      <e-menu-item index="2-1">菜单1</e-menu-item>
      <e-menu-item index="2-2">菜单2</e-menu-item>
      <e-menu-item index="2-3">菜单3</e-menu-item>
      <e-sub-menu index="2-4">
        <template #title>item four</template>
        <e-menu-item index="2-4-1">菜单1</e-menu-item>
        <e-menu-item index="2-4-2">菜单2</e-menu-item>
        <e-menu-item index="2-4-3">菜单3</e-menu-item>
      </e-sub-menu>
    </e-sub-menu>
    <e-menu-item index="3" disabled>禁用的菜单</e-menu-item>
    <e-menu-item index="4">其他菜单</e-menu-item>
  </e-menu>
  <div class="h-6" />
  <e-menu :default-active="activeIndex" class="e-menu-demo" mode="horizontal" is-round @select="handleSelect">
    <e-menu-item index="1">数据处理中心</e-menu-item>
    <e-sub-menu index="2">
      <template #title>工作台</template>
      <e-menu-item index="2-1">菜单1</e-menu-item>
      <e-menu-item index="2-2">菜单2</e-menu-item>
      <e-menu-item index="2-3">菜单3</e-menu-item>
      <e-sub-menu index="2-4">
        <template #title>item four</template>
        <e-menu-item index="2-4-1">菜单1</e-menu-item>
        <e-menu-item index="2-4-2">菜单2</e-menu-item>
        <e-menu-item index="2-4-3">菜单3</e-menu-item>
      </e-sub-menu>
    </e-sub-menu>
    <e-menu-item index="3" disabled>禁用的菜单</e-menu-item>
    <e-menu-item index="4">其他菜单</e-menu-item>
  </e-menu>
  <div class="h-6" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeIndex = ref('1');
const activeIndex2 = ref('1');
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

```

## 左右

**Demo 示例**: `menu/left-and-right`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/menu.html)

```vue
<template>
  <e-menu :default-active="activeIndex" class="e-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
    <e-menu-item index="0">LOGO</e-menu-item>
    <div class="flex-grow" />
    <e-menu-item index="1">数据处理中心</e-menu-item>
    <e-sub-menu index="2">
      <template #title>工作台</template>
      <e-menu-item index="2-1">菜单1</e-menu-item>
      <e-menu-item index="2-2">菜单2</e-menu-item>
      <e-menu-item index="2-3">菜单3</e-menu-item>
      <e-sub-menu index="2-4">
        <template #title>item four</template>
        <e-menu-item index="2-4-1">菜单1</e-menu-item>
        <e-menu-item index="2-4-2">菜单2</e-menu-item>
        <e-menu-item index="2-4-3">菜单3</e-menu-item>
      </e-sub-menu>
    </e-sub-menu>
  </e-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeIndex = ref('1');
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>

```

## 侧栏

垂直菜单，可内嵌子菜单。

**Demo 示例**: `menu/vertical`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/menu.html)

```vue
<template>
  <e-row class="tac">
    <e-col :span="12">
      <h5 class="mb-2">Default colors</h5>
      <e-menu default-active="2" class="e-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <e-sub-menu index="1">
          <template #title>
            <e-icon><location /></e-icon>
            <span>Navigator One</span>
          </template>
          <e-menu-item-group title="Group One">
            <e-menu-item index="1-1">菜单1</e-menu-item>
            <e-menu-item index="1-2">菜单2</e-menu-item>
          </e-menu-item-group>
          <e-menu-item-group title="Group Two">
            <e-menu-item index="1-3">菜单3</e-menu-item>
          </e-menu-item-group>
          <e-sub-menu index="1-4">
            <template #title>item four</template>
            <e-menu-item index="1-4-1">菜单1</e-menu-item>
          </e-sub-menu>
        </e-sub-menu>
        <e-menu-item index="2">
          <e-icon><icon-menu /></e-icon>
          <span>Navigator Two</span>
        </e-menu-item>
        <e-menu-item index="3" disabled>
          <e-icon><document /></e-icon>
          <span>Navigator Three</span>
        </e-menu-item>
        <e-menu-item index="4">
          <e-icon><setting /></e-icon>
          <span>Navigator Four</span>
        </e-menu-item>
      </e-menu>
    </e-col>
    <e-col :span="12">
      <h5 class="mb-2">Custom colors</h5>
      <e-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="e-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <e-sub-menu index="1">
          <template #title>
            <e-icon><location /></e-icon>
            <span>Navigator One</span>
          </template>
          <e-menu-item-group title="Group One">
            <e-menu-item index="1-1">菜单1</e-menu-item>
            <e-menu-item index="1-2">菜单2</e-menu-item>
          </e-menu-item-group>
          <e-menu-item-group title="Group Two">
            <e-menu-item index="1-3">菜单3</e-menu-item>
          </e-menu-item-group>
          <e-sub-menu index="1-4">
            <template #title>item four</template>
            <e-menu-item index="1-4-1">菜单1</e-menu-item>
          </e-sub-menu>
        </e-sub-menu>
        <e-menu-item index="2">
          <e-icon><icon-menu /></e-icon>
          <span>Navigator Two</span>
        </e-menu-item>
        <e-menu-item index="3" disabled>
          <e-icon><document /></e-icon>
          <span>Navigator Three</span>
        </e-menu-item>
        <e-menu-item index="4">
          <e-icon><setting /></e-icon>
          <span>Navigator Four</span>
        </e-menu-item>
      </e-menu>
    </e-col>
  </e-row>
</template>

<script lang="ts" setup>
import { Document, Menu as IconMenu, Location, Setting } from '@epoint-fe/eui-icons';
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

```

## Collapse 折叠面板

垂直导航菜单可以被折叠

**Demo 示例**: `menu/collapse`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/menu.html)

```vue
<template>
  <e-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <e-radio-button :value="false">expand</e-radio-button>
    <e-radio-button :value="true">collapse</e-radio-button>
  </e-radio-group>
  <e-menu
    default-active="2"
    class="e-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <e-sub-menu index="1">
      <template #title>
        <e-icon><location /></e-icon>
        <span>Navigator One</span>
      </template>
      <e-menu-item-group>
        <template #title><span>Group One</span></template>
        <e-menu-item index="1-1">菜单1</e-menu-item>
        <e-menu-item index="1-2">菜单2</e-menu-item>
      </e-menu-item-group>
      <e-menu-item-group title="Group Two">
        <e-menu-item index="1-3">菜单3</e-menu-item>
      </e-menu-item-group>
      <e-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <e-menu-item index="1-4-1">菜单1</e-menu-item>
      </e-sub-menu>
    </e-sub-menu>
    <e-menu-item index="2">
      <e-icon><icon-menu /></e-icon>
      <template #title>Navigator Two</template>
    </e-menu-item>
    <e-menu-item index="3" disabled>
      <e-icon><document /></e-icon>
      <template #title>Navigator Three</template>
    </e-menu-item>
    <e-menu-item index="4">
      <e-icon><setting /></e-icon>
      <template #title>Navigator Four</template>
    </e-menu-item>
  </e-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Document, Menu as IconMenu, Location, Setting } from '@epoint-fe/eui-icons';

const isCollapse = ref(true);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style scoped>
.e-menu-vertical-demo:not(.e-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

```

## Menu API

### Menu Attributes

| Name                | Description                                                                                                                       | Type                                | Default  |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | -------- |
| mode                | 菜单展示模式                                                                                                                      | ^[枚举]`'horizontal' \| 'vertical'` | vertical |
| collapse            | 是否水平折叠收起菜单（仅在 `mode` 为 vertical 时可用）                                                                            | ^[boolean]                          | false    |
| ellipsis            | 是否省略多余的子项（仅在横向模式生效）                                                                                            | ^[boolean]                          | true     |
| background-color    | 菜单的背景颜色（十六进制格式） (deprecated, use `--bg-color` instead)                                                             | ^[string]                           | #ffffff  |
| text-color          | 文字颜色（十六进制格式 (deprecated, use `--text-color` instead)                                                                   | ^[string]                           | #171A1D  |
| active-text-color   | 活动菜单项的文本颜色（十六进制格式） (deprecated, use `--active-color` instead)                                                   | ^[string]                           | #2370EF  |
| is-round            | 设置活动菜单项为椭圆形（仅在 `mode` 为 horizontal 时可用）                                                                        | ^[boolean]                          | false    |
| default-active      | 页面加载时默认激活菜单的 index                                                                                                    | ^[string]                           | —        |
| default-openeds     | 默认打开的 sub-menu 的 index 的数组                                                                                               | `Array<number>`                     | —        |
| unique-opened       | 是否只保持一个子菜单的展开                                                                                                        | ^[boolean]                          | false    |
| menu-trigger        | 子菜单打开的触发方式，只在 `mode` 为 horizontal 时有效。                                                                          | ^[枚举]`'hover' \| 'click'`         | hover    |
| router              | 是否启用 `vue-router` 模式。 启用该模式会在激活导航时以 index 作为 path 进行路由跳转 使用 `default-active` 来设置加载时的激活项。 | ^[boolean]                          | false    |
| collapse-transition | 是否开启折叠动画                                                                                                                  | ^[string]                           | true     |
| popper-effect       | popper 效果: `dark` / `light`                                                                                                     | ^[枚举]`'dark' \| 'light'`          | dark     |

### Menu Methods

| Methods Name | Description         | Parameters                          |
| ------------ | ------------------- | ----------------------------------- |
| open         | 展开指定的 sub-menu | index: 需要打开的 sub-menu 的 index |
| close        | 展开指定的 sub-menu | index: 需要打开的 sub-menu 的 index |

### Menu Events

| Name   | Description         | Parameters                                                                                                                               |
| ------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| select | 菜单激活回调        | index: 选中菜单项的 index, indexPath: 选中菜单项的 index path, item: 选中菜单项, routeResult: vue-router 的返回值（如果 router 为 true） |
| open   | sub-menu 展开的回调 | index: 打开的 sub-menu 的 index, indexPath: 打开的 sub-menu 的 index path                                                                |
| close  | sub-menu 收起的回调 | index: 收起的 sub-menu 的 index, indexPath: 收起的 sub-menu 的 index path                                                                |

### Menu Slots

| Name | Description    | Subtags                               |
| ---- | -------------- | ------------------------------------- |
| —    | 自定义默认内容 | SubMenu / Menu-Item / Menu-Item-Group |

### SubMenu Attributes

| Name                | Description                                                                                          | Type                  | Default                                |
| ------------------- | ---------------------------------------------------------------------------------------------------- | --------------------- | -------------------------------------- |
| index               | 唯一标志                                                                                             | ^[string]             | —                                      |
| popper-class        | 为 popper 添加类名                                                                                   | ^[string]             | —                                      |
| show-timeout        | 展开 sub-menu 的延时                                                                                 | ^[number]             | 300                                    |
| hide-timeout        | 收起 sub-menu 的延时                                                                                 | ^[number]             | 300                                    |
| disabled            | 是否禁用                                                                                             | ^[boolean]            | false                                  |
| teleported          | 是否将 popup 的下拉列表插入至 body 元素                                                              | ^[boolean]            | 一级子菜单：true / 非一级子菜单：false |
| popper-offset       | 弹出窗口偏移                                                                                         | ^[number]             | 6                                      |
| expand-close-icon   | 父菜单展开且子菜单关闭时的图标， `expand-close-icon` 和 `expand-open-icon` 需要一起配置才能生效      | `string \| Component` | —                                      |
| expand-open-icon    | 父菜单展开且子菜单打开时的图标， `expand-open-icon` and `expand-close-icon` 需要一起配置才能生效     | `string \| Component` | —                                      |
| collapse-close-icon | 父菜单收起且子菜单关闭时的图标， `collapse-close-icon` and `collapse-open-icon` 需要一起配置才能生效 | `string \| Component` | —                                      |
| collapse-open-icon  | 父菜单收起且子菜单打开时的图标， `collapse-open-icon` and `collapse-close-icon` 需要一起配置才能生效 | `string \| Component` | —                                      |

## SubMenu API

### SubMenu Slots

| Name  | Description    | Subtags                               |
| ----- | -------------- | ------------------------------------- |
| —     | 自定义默认内容 | SubMenu / Menu-Item / Menu-Item-Group |
| title | 自定义标题内容 | —                                     |

### Menu-Item Attributes

| Name     | Description         | Type        | Default |
| -------- | ------------------- | ----------- | ------- |
| index    | 唯一标志            | string/null | null    |
| route    | Vue Router 路径对象 | object      | —       |
| disabled | 是否禁用            | boolean     | false   |

### Menu-Item Events

| Name  | Description          | Parameters         |
| ----- | -------------------- | ------------------ |
| click | 菜单点击时的回调函数 | menu-item instance |

### Menu-Item Slots

| Name  | Description    |
| ----- | -------------- |
| —     | 自定义默认内容 |
| title | 自定义标题内容 |

## Menu-Item-Group API

### Menu-Item-Group Attributes

| Name  | Description | Type   | Default |
| ----- | ----------- | ------ | ------- |
| title | 组标题      | string | —       |

### Menu-Item-Group Slots

| Name  | Description      | Subtags   |
| ----- | ---------------- | --------- |
| —     | 默认插槽内容     | Menu-Item |
| title | 自定义组标题内容 | —         |