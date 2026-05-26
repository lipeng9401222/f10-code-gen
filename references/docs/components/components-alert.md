---
title: Alert 提示
originUrl: http://192.168.219.170/docs/vue/latest/component/component/alert.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/alert.html)

# Alert 提示

用于显示重要的提示信息。

## 基础用法

Alert 组件不会自动消失，是页面中的非浮动元素。

**Demo 示例**: `alert/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/alert.html)

```vue
<template>
  <e-alert title="primary alert" type="primary" />
  <e-alert title="success alert" type="success" />
  <e-alert title="info alert" type="info" />
  <e-alert title="warning alert" type="warning" />
  <e-alert title="error alert" type="error" />
</template>

<style scoped>
.e-alert {
  margin: 20px 0 0;
}
.e-alert:first-child {
  margin: 0;
}
</style>

```

## 主题

Alert 组件提供了两个不同的主题：`light` 和 `dark`。

**Demo 示例**: `alert/theme`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/alert.html)

```vue
<template>
  <e-alert title="success alert" type="success" effect="dark" />
  <e-alert title="info alert" type="info" effect="dark" />
  <e-alert title="warning alert" type="warning" effect="dark" />
  <e-alert title="error alert" type="error" effect="dark" />
</template>
<style scoped>
.e-alert {
  margin: 20px 0 0;
}
.e-alert:first-child {
  margin: 0;
}
</style>

```

## 自定义关闭按钮

可自定义关闭按钮为文字或其他符号。

**Demo 示例**: `alert/close-button`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/alert.html)

```vue
<template>
  <e-alert title="unclosable alert" type="success" :closable="false" />
  <e-alert title="customized close-text" type="info" close-text="Gotcha" />
  <e-alert title="alert with callback" type="warning" @close="hello" />
</template>

<script lang="ts" setup>
const hello = () => {
  // eslint-disable-next-line no-alert
  alert('Hello World!');
};
</script>
<style scoped>
.e-alert {
  margin: 20px 0 0;
}
.e-alert:first-child {
  margin: 0;
}
</style>

```

## 图标

显示图标可以让信息更易读。

**Demo 示例**: `alert/icon`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/alert.html)

```vue
<template>
  <e-alert title="success alert" type="success" show-icon />
  <e-alert title="info alert" type="info" show-icon />
  <e-alert title="warning alert" type="warning" show-icon />
  <e-alert title="error alert" type="error" show-icon />
</template>
<style scoped>
.e-alert {
  margin: 20px 0 0;
}
.e-alert:first-child {
  margin: 0;
}
</style>

```

## 文字居中

使用 `center` 属性让文字水平居中。

**Demo 示例**: `alert/center`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/alert.html)

```vue
<template>
  <e-alert title="success alert" type="success" center show-icon />
  <e-alert title="info alert" type="info" center show-icon />
  <e-alert title="warning alert" type="warning" center show-icon />
  <e-alert title="error alert" type="error" center show-icon />
</template>
<style scoped>
.e-alert {
  margin: 20px 0 0;
}
.e-alert:first-child {
  margin: 0;
}
</style>

```

## 辅助性文字

包含标题和内容，解释更详细的警告。

**Demo 示例**: `alert/description`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/alert.html)

```vue
<template>
  <e-alert title="with description" type="success" description="This is a description." />
</template>

```

## 图标和描述

**Demo 示例**: `alert/icon-description`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/alert.html)

```vue
<template>
  <e-alert title="success alert" type="success" description="more text description" show-icon />
  <e-alert title="info alert" type="info" description="more text description" show-icon />
  <e-alert title="warning alert" type="warning" description="more text description" show-icon />
  <e-alert title="error alert" type="error" description="more text description" show-icon />
</template>
<style scoped>
.e-alert {
  margin: 20px 0 0;
}
.e-alert:first-child {
  margin: 0;
}
</style>

```

## 折叠面板

通过设置 `collapsible` 属性来启用折叠面板功能。你可以使用 `expand-text` 和 `collapse-text` 属性来自定义展开和收起状态下的按钮文本。

**Demo 示例**: `alert/accordion`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/alert.html)

```vue
<template>
  <e-alert title="success alert" type="success" description="more text description" collapsible />
  <e-alert
    title="info alert"
    type="info"
    description="more text description"
    collapsible
    collapse-text="collapse"
    expand-text="expand"
  />
  <e-alert
    title="warning alert"
    type="warning"
    description="more text description"
    center
    collapsible
    collapse-text="collapse"
    expand-text="expand"
  />
  <e-alert
    title="error alert"
    type="error"
    description="more text description"
    center
    show-icon
    collapsible
    collapse-text="collapse"
    expand-text="expand"
  />
</template>
<style scoped>
.e-alert {
  margin: 20px 0 0;
}
.e-alert:first-child {
  margin: 0;
}
</style>

```

## Alert API

### Attributes

| Name          | Description          | Type                                                              | Default   | Required |
| ------------- | -------------------- | ----------------------------------------------------------------- | --------- | -------- |
| title         | 标题                 | ^[string]                                                         | —         | 否       |
| type          | 类型                 | ^[enum]`'success' \| 'primary' \|'warning' \| 'info' \| 'error' ` | `info`    | 否       |
| description   | 描述性文本           | ^[string]                                                         | —         | 否       |
| closable      | 是否可关闭           | ^[boolean]                                                        | `true`    | 否       |
| center        | 文字是否居中         | ^[boolean]                                                        | `false`   | 否       |
| close-text    | 自定义关闭按钮文本   | ^[string]                                                         | —         | 否       |
| show-icon     | 是否显示类型图标     | ^[boolean]                                                        | `false`   | 否       |
| effect        | 主题样式             | ^[enum]`'light' \| 'dark'`                                        | `'light'` | 否       |
| collapsible   | 是否显示折叠按钮     | ^[boolean]                                                        | `false`   | 否       |
| expand-text   | 展开状态下的按钮文本 | ^[string]                                                         | `'收起'`  | 否       |
| collapse-text | 收起状态下的按钮文本 | ^[string]                                                         | `'展开'`  | 否       |

### Events

| Name  | Description       | Type                                     |
| ----- | ----------------- | ---------------------------------------- |
| close | 关闭 Alert 时触发 | ^[Function]`(event: MouseEvent) => void` |

### Slots

| Name    | Description    |
| ------- | -------------- |
| default | Alert 描述内容 |
| title   | Alert 标题内容 |