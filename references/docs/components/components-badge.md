---
title: Badge
originUrl: http://192.168.219.170/docs/vue/latest/component/component/badge.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/badge.html)

# Badge 徽章

按钮和图标上的数字或状态标记。

## Basic Usage

可以用来展示新消息的数量。

**Demo 示例**: `badge/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/badge.html)

```vue
<template>
  <e-badge :value="12" class="item">
    <e-button>comments</e-button>
  </e-badge>
  <e-badge :value="3" class="item">
    <e-button>replies</e-button>
  </e-badge>
  <e-badge :value="1" class="item" type="primary">
    <e-button>comments</e-button>
  </e-badge>
  <e-badge :value="2" class="item" type="warning">
    <e-button>replies</e-button>
  </e-badge>

  <e-dropdown trigger="click">
    <span class="e-dropdown-link">
      Click Me
      <e-icon class="e-icon--right"><caret-bottom /></e-icon>
    </span>
    <template #dropdown>
      <e-dropdown-menu>
        <e-dropdown-item class="clearfix">
          comments
          <e-badge class="mark" :value="12" />
        </e-dropdown-item>
        <e-dropdown-item class="clearfix">
          replies
          <e-badge class="mark" :value="3" />
        </e-dropdown-item>
      </e-dropdown-menu>
    </template>
  </e-dropdown>
</template>

<script lang="ts" setup>
import { CaretBottom } from '@epoint-fe/eui-icons';
</script>

<style scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}

.e-dropdown {
  margin-top: 1.1rem;
}
</style>

```

## 最大值

你还可以自定义最大值

**Demo 示例**: `badge/max`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/badge.html)

```vue
<template>
  <e-badge :value="200" :max="99" class="item">
    <e-button>comments</e-button>
  </e-badge>
  <e-badge :value="100" :max="10" class="item">
    <e-button>replies</e-button>
  </e-badge>
</template>

<style scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>

```

## 自定义显示内容

你也可以展示除数字以外你想要展示的任何值。

**Demo 示例**: `badge/customize`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/badge.html)

```vue
<template>
  <e-badge value="new" class="item">
    <e-button>comments</e-button>
  </e-badge>
  <e-badge value="hot" class="item">
    <e-button>replies</e-button>
  </e-badge>
</template>

<style scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>

```

## 小红点

通过一个小红点标记来告知用户有新内容。

**Demo 示例**: `badge/dot`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/badge.html)

```vue
<template>
  <e-badge is-dot class="item">query</e-badge>
  <e-badge is-dot class="item">
    <e-button class="share-button" :icon="Share" type="primary" />
  </e-badge>
</template>

<script lang="ts" setup>
import { Share } from '@epoint-fe/eui-icons';
</script>

<style scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>

```

## API

### Attributes

| Name   | Description                                                           | Type                                                               | Default |
| ------ | --------------------------------------------------------------------- | ------------------------------------------------------------------ | ------- |
| value  | 显示值                                                                | ^[string] / ^[number]                                              | ''      |
| max    | 最大值，超过最大值会显示 `{max}+`。 只有当 value 是数字类型时起作用。 | ^[number]                                                          | 99      |
| is-dot | 是否显示小圆点。                                                      | ^[boolean]                                                         | false   |
| hidden | 是否隐藏 Badge。                                                      | ^[boolean]                                                         | false   |
| type   | badge type.                                                           | ^[enum]`'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | danger  |

### Slots

| Name    | Description    |
| ------- | -------------- |
| default | 自定义默认内容 |