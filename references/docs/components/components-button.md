---
title: Button
originUrl: http://192.168.219.170/docs/vue/latest/component/component/button.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/button.html)

# 按钮

## 常规使用

**Demo 示例**: `button/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/button.html)

```vue
<template>
  <e-row class="mb-4">
    <e-button>Default</e-button>
    <e-button type="primary">Primary</e-button>
    <e-button type="success">Success</e-button>
    <e-button type="info">Info</e-button>
    <e-button type="warning">Warning</e-button>
    <e-button type="danger">Danger</e-button>
  </e-row>

  <e-row class="mb-4">
    <e-button plain>Plain</e-button>
    <e-button type="primary" plain>Primary</e-button>
    <e-button type="success" plain>Success</e-button>
    <e-button type="info" plain>Info</e-button>
    <e-button type="warning" plain>Warning</e-button>
    <e-button type="danger" plain>Danger</e-button>
  </e-row>

  <e-row class="mb-4">
    <e-button round>Round</e-button>
    <e-button type="primary" round>Primary</e-button>
    <e-button type="success" round>Success</e-button>
    <e-button type="info" round>Info</e-button>
    <e-button type="warning" round>Warning</e-button>
    <e-button type="danger" round>Danger</e-button>
  </e-row>

  <e-row>
    <e-button :icon="Search" circle />
    <e-button type="primary" :icon="Edit" circle />
    <e-button type="success" :icon="Check" circle />
    <e-button type="info" :icon="Message" circle />
    <e-button type="warning" :icon="Star" circle />
    <e-button type="danger" :icon="Delete" circle />
  </e-row>
</template>

<script lang="ts" setup>
import { Check, Delete, Edit, Message, Search, Star } from '@epoint-fe/eui-icons';
</script>

```

## 禁用状态

你可以使用 `disabled` 属性来定义按钮是否被禁用。

**Demo 示例**: `button/disabled`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/button.html)

```vue
<template>
  <e-row class="mb-4">
    <e-button disabled>Default</e-button>
    <e-button type="primary" disabled>Primary</e-button>
    <e-button type="success" disabled>Success</e-button>
    <e-button type="info" disabled>Info</e-button>
    <e-button type="warning" disabled>Warning</e-button>
    <e-button type="danger" disabled>Danger</e-button>
  </e-row>

  <e-row>
    <e-button plain disabled>Plain</e-button>
    <e-button type="primary" plain disabled>Primary</e-button>
    <e-button type="success" plain disabled>Success</e-button>
    <e-button type="info" plain disabled>Info</e-button>
    <e-button type="warning" plain disabled>Warning</e-button>
    <e-button type="danger" plain disabled>Danger</e-button>
  </e-row>
</template>

```

## 链接按钮

**Demo 示例**: `button/link`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/button.html)

```vue
<template>
  <p>Basic link button</p>
  <div class="flex justify-space-between mb-4 flex-wrap gap-4">
    <e-button v-for="button in buttons" :key="button.text" :type="button.type" link>{{ button.text }}</e-button>
  </div>

  <p>Disabled link button</p>
  <div class="flex justify-space-between flex-wrap gap-4">
    <e-button v-for="button in buttons" :key="button.text" :type="button.type" link disabled>{{
      button.text
    }}</e-button>
  </div>
</template>

<script setup lang="ts">
const buttons = [
  { type: '', text: 'plain' },
  { type: 'primary', text: 'primary' },
  { type: 'success', text: 'success' },
  { type: 'info', text: 'info' },
  { type: 'warning', text: 'warning' },
  { type: 'danger', text: 'danger' },
] as const;
</script>

```

## 文字按钮

<!-- 
> **💡 提示**
>
> Text button has been upgraded with a new design since <e-tag round effect="plain" size="small">2.2.0</e-tag> , if you want to use the
> previous version like button, you might want to check [Link](http://192.168.219.170/docs/vue/latest/component/component/link.html#basic) out.
> 
> The API is also updated, because the `type` attribute also represents the button's style. So we have to make a new API
> `text: boolean` for text button.
 -->

没有边框和背景色的按钮。

**Demo 示例**: `button/text`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/button.html)

```vue
<template>
  <p>Basic text button</p>
  <div class="flex justify-space-between mb-4 flex-wrap gap-4">
    <e-button v-for="button in buttons" :key="button.text" :type="button.type" text>{{ button.text }}</e-button>
  </div>

  <p>Background color always on</p>
  <div class="flex justify-space-between mb-4 flex-wrap gap-4">
    <e-button v-for="button in buttons" :key="button.text" :type="button.type" text bg>{{ button.text }}</e-button>
  </div>

  <p>Disabled text button</p>
  <div class="flex justify-space-between flex-wrap gap-4">
    <e-button v-for="button in buttons" :key="button.text" :type="button.type" text disabled>{{
      button.text
    }}</e-button>
  </div>
</template>

<script setup lang="ts">
const buttons = [
  { type: '', text: 'plain' },
  { type: 'primary', text: 'primary' },
  { type: 'success', text: 'success' },
  { type: 'info', text: 'info' },
  { type: 'warning', text: 'warning' },
  { type: 'danger', text: 'danger' },
] as const;
</script>

```

## 图标按钮

使用图标为按钮添加更多的含义。 你也可以单独使用图标不添加文字来节省显示区域占用。

**Demo 示例**: `button/icon`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/button.html)

```vue
<template>
  <div class="flex">
    <e-button text :icon="Search"></e-button>
    <e-button type="primary" :icon="Edit" />
    <e-button type="primary" :icon="Share" />
    <e-button type="primary" :icon="Delete" />
    <e-button type="primary" :icon="Search">Search</e-button>
    <e-button type="primary">
      Upload<e-icon class="e-icon--right"><Upload /></e-icon>
    </e-button>
    <e-button type="primary" :icon="Search" circle />
  </div>
</template>
<script setup lang="ts">
import { Delete, Edit, Search, Share, Upload } from '@epoint-fe/eui-icons';
</script>

```

## 按钮组

以按钮组的方式出现，常用于多项类似操作。

**Demo 示例**: `button/group`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/button.html)

```vue
<template>
  <e-button-group>
    <e-button type="primary" :icon="ArrowLeft">Previous Page</e-button>
    <e-button type="primary">
      Next Page<e-icon class="e-icon--right"><ArrowRight /></e-icon>
    </e-button>
  </e-button-group>

  <e-button-group class="ml-4">
    <e-button type="primary" :icon="Edit" />
    <e-button type="primary" :icon="Share" />
    <e-button type="primary" :icon="Delete" />
  </e-button-group>

  <e-dropdown class="ml-4" split-button type="primary">
    Dropdown List
    <template #dropdown>
      <e-dropdown-menu>
        <e-dropdown-item>Action 1</e-dropdown-item>
        <e-dropdown-item>Action 2</e-dropdown-item>
        <e-dropdown-item>Action 3</e-dropdown-item>
        <e-dropdown-item>Action 4</e-dropdown-item>
        <e-dropdown-item>Action 5</e-dropdown-item>
      </e-dropdown-menu>
    </template>
  </e-dropdown>
</template>

<script setup lang="ts">
import { ArrowDown, ArrowLeft, ArrowRight, Delete, Edit, Share } from '@epoint-fe/eui-icons';
</script>

```

## 加载状态按钮

点击按钮来加载数据，并向用户反馈加载状态。

通过设置 `loading` 属性为 `true` 来显示加载中状态。

> **💡 提示**
>
> 您可以使用 `loading` 插槽或 `loadingIcon` 属性自定义您的 `loading` 图标
> 
> PS: `loading` 插槽优先级高于 `loadingIcon` 属性

**Demo 示例**: `button/loading`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/button.html)

```vue
<template>
  <e-button type="primary" loading>Loading</e-button>
  <e-button type="primary" :loading-icon="Football" loading>Loading</e-button>
  <e-button type="primary" loading>
    <template #loading>
      <div class="custom-loading">
        <svg class="circular" viewBox="0 0 50 50">
          <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="4" />
        </svg>
      </div>
    </template>
    Loading
  </e-button>
</template>

<script lang="ts" setup>
import { Football } from '@epoint-fe/eui-icons';
</script>

<style scoped>
.e-button .custom-loading .circular {
  margin-right: 6px;
  width: 18px;
  height: 18px;
  animation: loading-rotate 2s linear infinite;
}
.e-button .custom-loading .circular .path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: var(--e-button-text-color);
  stroke-linecap: round;
}
</style>

```

## 块级按钮

使用 `block` 属性可以让按钮占据父容器的全部宽度。

**Demo 示例**: `button/block`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/button.html)

```vue
<template>
  <div class="demo-block">
    <e-button block>块级按钮</e-button>
    <e-button type="primary" block>主要按钮</e-button>
    <e-button type="success" block>成功按钮</e-button>
    <e-button type="warning" block>警告按钮</e-button>
    <e-button type="danger" block>危险按钮</e-button>
    <e-button type="info" block>信息按钮</e-button>
  </div>
</template>

<style scoped>
.demo-block {
  width: 300px;
}
.demo-block .e-button {
  margin-bottom: 10px;
}
</style>

```

## 调整尺寸

除了默认的大小，按钮组件还提供了几种额外的尺寸可供选择，以便适配不同的场景。

**Demo 示例**: `button/size`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/button.html)

```vue
<template>
  <e-row>
    <e-button size="large">Large</e-button>
    <e-button>Default</e-button>
    <e-button size="small">Small</e-button>
    <e-button size="large" :icon="Search">Search</e-button>
    <e-button :icon="Search">Search</e-button>
    <e-button size="small" :icon="Search">Search</e-button>
  </e-row>
  <e-row class="my-4">
    <e-button size="large" round>Large</e-button>
    <e-button round>Default</e-button>
    <e-button size="small" round>Small</e-button>
    <e-button size="large" :icon="Search" round>Search</e-button>
    <e-button :icon="Search" round>Search</e-button>
    <e-button size="small" :icon="Search" round>Search</e-button>
  </e-row>
  <e-row>
    <e-button :icon="Search" size="large" circle />
    <e-button :icon="Search" circle />
    <e-button :icon="Search" size="small" circle />
  </e-row>
</template>

<script setup lang="ts">
import { Search } from '@epoint-fe/eui-icons';
</script>

```

## 自定义标签 Tag

按钮默认渲染为 `button` 标签，您可以自定义元素标签。例如，`div`，路由链接， `a` 标签等。

**Demo 示例**: `button/tag`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/button.html)

```vue
<template>
  <e-button>button</e-button>
  <e-button tag="div" role="button" tabindex="0">div</e-button>
  <e-button
    type="primary"
    tag="a"
    href="http://192.168.217.8/febase/vue/eui-components"
    target="_blank"
    rel="noopener noreferrer"
  >
    a
  </e-button>
</template>

```

## 自定义颜色 ^(beta)

您可以自定义按钮的颜色。

我们将自动计算按钮处于 hover 和 active 状态时的颜色。

**Demo 示例**: `button/custom`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/button.html)

```vue
<script lang="ts" setup>
import { isDark } from '~/utils/is-dark';
</script>

<template>
  <div class="flex">
    <e-button color="#626aef" :dark="isDark">Default</e-button>
    <e-button color="#626aef" :dark="isDark" plain>Plain</e-button>

    <e-button color="#626aef" :dark="isDark" disabled>Disabled</e-button>
    <e-button color="#626aef" :dark="isDark" disabled plain>Disabled Plain</e-button>
  </div>
</template>

```

## 幽灵按钮

使用 `ghost` 属性创建幽灵按钮，该按钮在非hover状态下显示默认样式，仅在hover时显示语义颜色。

**Demo 示例**: `button/ghost`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/button.html)

```vue
<template>
  <e-row class="mb-4">
    <e-button ghost>Default</e-button>
    <e-button type="primary" ghost>Primary</e-button>
    <e-button type="success" ghost>Success</e-button>
    <e-button type="info" ghost>Info</e-button>
    <e-button type="warning" ghost>Warning</e-button>
    <e-button type="danger" ghost>Danger</e-button>
  </e-row>

  <e-row class="mb-4">
    <e-button plain ghost>Plain Ghost</e-button>
    <e-button type="primary" plain ghost>Primary</e-button>
    <e-button type="success" plain ghost>Success</e-button>
    <e-button type="info" plain ghost>Info</e-button>
    <e-button type="warning" plain ghost>Warning</e-button>
    <e-button type="danger" plain ghost>Danger</e-button>
  </e-row>

  <e-row class="mb-4">
    <e-button round ghost>Round Ghost</e-button>
    <e-button type="primary" round ghost>Primary</e-button>
    <e-button type="success" round ghost>Success</e-button>
    <e-button type="info" round ghost>Info</e-button>
    <e-button type="warning" round ghost>Warning</e-button>
    <e-button type="danger" round ghost>Danger</e-button>
  </e-row>
</template>

```

## Button API

### Button Attributes

| Name              | Description                                                 | Type                                                         | Default |
| ----------------- | ----------------------------------------------------------- | ------------------------------------------------------------ | ------- |
| size              | 尺寸                                                        | ^[enum]`'large'\| 'default'\| 'small'`                       | —       |
| type              | 类型                                                        | ^[enum]`'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'` | —       |
| plain             | 是否为朴素按钮                                              | ^[boolean]                                                   | false   |
| text              | 是否为文字按钮                                              | ^[boolean]                                                   | false   |
| bg               | 是否显示文字按钮背景颜色                                    | ^[boolean]                                                   | false   |
| link             | 是否为链接按钮                                              | ^[boolean]                                                   | false   |
| round             | 是否为圆角按钮                                              | ^[boolean]                                                   | false   |
| circle            | 是否为圆形按钮                                              | ^[boolean]                                                   | false   |
| block ^(1.0.10)   | 是否为块级按钮                                              | ^[boolean]                                                   | false   |
| loading           | 是否为加载中状态                                            | ^[boolean]                                                   | false   |
| loading-icon      | 自定义加载中状态图标组件                                    | ^[string] / ^[Component]                                     | Loading |
| disabled          | 按钮是否为禁用状态                                          | ^[boolean]                                                   | false   |
| icon              | 图标组件                                                    | ^[string] / ^[Component]                                     | —       |
| autofocus         | 原生 autofocus 属性                                         | ^[boolean]                                                   | false   |
| native-type       | 原生 type 属性                                              | ^[enum]`'button'\| 'submit'\| 'reset'`                       | button  |
| auto-insert-space | 自动在两个中文字符之间插入空格                              | ^[boolean]                                                   | —       |
| color             | 自定义按钮颜色, 并自动计算 `hover` 和 `active` 触发后的颜色 | ^[string]                                                    | —       |
| dark              | dark 模式, 意味着自动设置 `color` 为 `dark` 模式的颜色      | ^[boolean]                                                   | false   |
| tag               | 自定义元素标签                                              | ^[string] / ^[Component]                                     | button  |
| ghost             | 是否为幽灵按钮，仅在hover时显示语义颜色                     | ^[boolean]                                                   | false   |

### Button Slots

| Name    | Description      |
| ------- | ---------------- |
| default | 自定义默认内容   |
| loading | 自定义加载中组件 |
| icon    | 自定义图标组件   |

### Button Exposes

| Name           | Description                | Type                                                         |
| -------------- | -------------------------- | ------------------------------------------------------------ |
| ref            | 按钮 html 元素             | ^[object]`Ref<HTMLButtonElement>`                            |
| size           | 按钮尺寸                   | ^[object]`ComputedRef<'' \| 'small' \| 'default' \| 'large'>` |
| type           | 按钮类型                   | ^[object]`ComputedRef<'' \| 'default' \| 'primary' \| 'success' \| 'warning' \| 'info' \| 'danger'>` |
| disabled       | 是否禁用                   | ^[object]`ComputedRef<boolean>`                              |
| shouldAddSpace | 是否在两个字符之间插入空格 | ^[object]`ComputedRef<boolean>`                              |

## ButtonGroup API

### ButtonGroup Attributes

| Name | Description                  | Type                                                         | Default |
| ---- | ---------------------------- | ------------------------------------------------------------ | ------- |
| size | 用于控制该按钮组内按钮的大小 | ^[enum]`'large'\| 'default'\| 'small'`                       | —       |
| type | 用于控制该按钮组内按钮的类型 | ^[enum]`'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'` | —       |

### ButtonGroup Slots

| Name    | Description      | Subtags |
| ------- | ---------------- | ------- |
| default | 自定义按钮组内容 | Button  |