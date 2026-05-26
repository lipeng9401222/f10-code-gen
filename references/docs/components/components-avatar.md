---
title: 头像
originUrl: http://192.168.219.170/docs/vue/latest/component/component/avatar.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/avatar.html)

# 头像

头像组件可用于表示人物或对象。它支持图片、图标或文字。

## 基础用法

使用 `shape` 和 `size` 属性来设置头像的形状和大小。

**Demo 示例**: `avatar/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/avatar.html)

```vue
<template>
  <e-row class="demo-avatar demo-basic">
    <e-col :span="12">
      <div class="sub-title">circle</div>
      <div class="demo-basic--circle">
        <div class="block">
          <e-avatar :size="50" :src="circleUrl" />
        </div>
        <div v-for="size in sizeList" :key="size" class="block">
          <e-avatar :size="size" :src="circleUrl" />
        </div>
      </div>
    </e-col>
    <e-col :span="12">
      <div class="sub-title">square</div>
      <div class="demo-basic--circle">
        <div class="block">
          <e-avatar shape="square" :size="50" :src="squareUrl" />
        </div>
        <div v-for="size in sizeList" :key="size" class="block">
          <e-avatar shape="square" :size="size" :src="squareUrl" />
        </div>
      </div>
    </e-col>
  </e-row>
</template>
<script lang="ts" setup>
import { reactive, toRefs } from 'vue';

const state = reactive({
  circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
  sizeList: ['small', '', 'large'] as const,
});

const { circleUrl, squareUrl, sizeList } = toRefs(state);
</script>

<style scoped>
.demo-basic {
  text-align: center;
}
.demo-basic .sub-title {
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--e-text-color-secondary);
}
.demo-basic .demo-basic--circle,
.demo-basic .demo-basic--square {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.demo-basic .block:not(:last-child) {
  border-right: 1px solid var(--e-border-color);
}
.demo-basic .block {
  flex: 1;
}
.demo-basic .e-col:not(:last-child) {
  border-right: 1px solid var(--e-border-color);
}
</style>

```

## 类型

支持图片、图标或文字。

传入 `text` 时，在 `src` 和 `icon` 都为空的情况下会渲染文字头像。`text-truncate` 用于控制文字截取规则：正数表示从开头保留指定字符数，负数表示从末尾保留指定字符数，`0` 表示不截取。`background-color` 可用于自定义文字头像背景色。

当默认插槽和 `text` 同时存在时，优先渲染默认插槽。

**Demo 示例**: `avatar/types`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/avatar.html)

```vue
<template>
  <div class="demo-type">
    <div>
      <e-avatar :icon="UserFilled" />
      <p>Icon</p>
    </div>
    <div>
      <e-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <p>Image</p>
    </div>
    <div>
      <e-avatar text="ZhangSanLiSi" />
      <p>Last two chars</p>
    </div>
    <div>
      <e-avatar text="OuYangNaNa" :text-truncate="2" background-color="#1677ff" />
      <p>First two + custom bg</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserFilled } from '@epoint-fe/eui-icons';
</script>

<style scoped>
.demo-type {
  display: flex;
}

.demo-type > div {
  flex: 1;
  text-align: center;
}

.demo-type p {
  margin-top: 8px;
  font-size: 12px;
  color: var(--e-text-color-secondary);
}

.demo-type > div:not(:last-child) {
  border-right: 1px solid var(--e-border-color);
}
</style>

```

## 加载失败

图片加载失败时的回退显示。若存在默认插槽则优先显示插槽，否则会回退显示 `text`。

**Demo 示例**: `avatar/fallback`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/avatar.html)

```vue
<template>
  <div class="demo-type">
    <div class="item">
      <e-avatar :size="60" src="https://empty" text="ZhangSanLiSi" @error="errorHandler" />
      <p>Fallback to text</p>
    </div>
    <div class="item">
      <e-avatar :size="60" src="https://empty" text="ZhangSanLiSi" @error="errorHandler">
        <span>slot</span>
      </e-avatar>
      <p>Slot overrides text</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const errorHandler = () => true;
</script>

<style scoped>
.demo-type {
  display: flex;
  gap: 24px;
}

.item {
  text-align: center;
}

.item p {
  margin-top: 8px;
  font-size: 12px;
  color: var(--e-text-color-secondary);
}
</style>

```

## 适应容器

设置图片如何适应容器框，与 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) 属性相同。

**Demo 示例**: `avatar/fit`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/avatar.html)

```vue
<template>
  <div class="demo-fit">
    <div v-for="fit in fits" :key="fit" class="block">
      <span class="title">{{ fit }}</span>
      <e-avatar shape="square" :size="100" :fit="fit" :src="url" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs } from 'vue';

const state = reactive({
  fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
  url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
});

const { fits, url } = toRefs(state);
</script>

<style scoped>
.demo-fit {
  display: flex;
  text-align: center;
  justify-content: space-between;
}
.demo-fit .block {
  flex: 1;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
}

.demo-fit .title {
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--e-text-color-secondary);
}
</style>

```

## 徽标

头像组件可以与徽标（Badge）一起使用，用于显示计数或状态指示。

您可以使用 `count` 属性设置徽标的数值，或使用 `is-dot` 属性显示一个小圆点。当数值超过 `max` 值时，将显示为 `{max}+`。

**Demo 示例**: `avatar/badge`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/avatar.html)

```vue
<template>
  <div class="container">
    <div class="avatar-group">
      <e-avatar shape="square" :count="10" src="https://picsum.photos/200/200/?random=1" alt="用户头像" />
      <e-avatar shape="square" is-dot src="https://picsum.photos/200/200/?random=2" alt="用户头像" />
      <e-avatar shape="square" :count="100">张三</e-avatar>
    </div>

    <div class="avatar-group">
      <e-avatar :count="10" src="https://picsum.photos/200/200/?random=1" alt="用户头像" />
      <e-avatar is-dot src="https://picsum.photos/200/200/?random=2" alt="用户头像" />
      <e-avatar :count="100">张三</e-avatar>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.container {
  display: flex;
  // gap: 10px;
  justify-content: space-around;
}

.avatar-group {
  display: flex;
  gap: 30px;
}
</style>

```

## 大小

头像组件支持多种尺寸设置，以适应不同的界面需求。

您可以通过 `size` 属性设置头像的大小，该属性接受以下值：
- 预设尺寸：`large(50px)`、`default(42px)`、`small(38px)` 或 `compact(30px)`
- 自定义数值：直接传入数字（单位为像素）

**Demo 示例**: `avatar/size`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/avatar.html)

```vue
<template>
  <div class="container">
    <div class="avatar-group">
      <e-avatar shape="square" size="compact" src="https://picsum.photos/200/200/?random=1" alt="用户头像" />
      <e-avatar shape="square" size="small" src="https://picsum.photos/200/200/?random=2" alt="用户头像" />
      <e-avatar shape="square">张三</e-avatar>
      <e-avatar shape="square" size="large" :icon="UserFilled" alt="用户头像" />
    </div>

    <div class="avatar-group">
      <e-avatar shape="circle" size="compact" src="https://picsum.photos/200/200/?random=1" alt="用户头像" />
      <e-avatar shape="circle" size="small" src="https://picsum.photos/200/200/?random=2" alt="用户头像" />
      <e-avatar shape="circle">张三</e-avatar>
      <e-avatar shape="circle" size="large" :icon="UserFilled" alt="用户头像" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserFilled } from '@epoint-fe/eui-icons';
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  // gap: 10px;
  justify-content: space-around;
}

.avatar-group {
  display: flex;
  gap: 30px;
}
</style>

```

## 头像组

头像组件提供了强大的头像组功能，能够以紧凑美观的方式展示多个用户头像。

通过 `avatarList` 属性传入头像数据数组，每个元素可包含 `src`、`alt`、`text`、`textTruncate`、`backgroundColor` 或 `icon` 属性。

当头像数量超过 `maxCount` 设置的阈值时，会自动显示 `+n` 的溢出指示器，溢出指示器会计算并显示未展示的头像数量。

默认情况下，溢出指示器显示在头像组的末尾，添加 `before-order` 属性可将溢出指示器放置在头像组的开头。

**Demo 示例**: `avatar/group`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/avatar.html)

```vue
<template>
  <div class="container">
    <e-avatar-group :avatar-list="avatarList" before-order />
    <e-avatar-group :avatar-list="avatarList" />
    <e-avatar-group :avatar-list="avatarList" :max-count="3" />
    <e-avatar-group shape="circle" :avatar-list="avatarList2" />
    <e-avatar-group shape="square" :avatar-list="avatarList2" />
    <e-avatar-group shape="square" :avatar-list="avatarList2" :max-count="3" />
  </div>
</template>

<script setup lang="ts">
const avatarList = [
  { src: 'https://picsum.photos/200/200/?random=1', alt: 'user avatar' },
  { src: 'https://picsum.photos/200/200/?random=2', alt: 'user avatar' },
  { src: 'https://picsum.photos/200/200/?random=3', alt: 'user avatar' },
  { text: 'ZhangSanLiSi' },
  { text: 'OuYangNaNa', textTruncate: 2, backgroundColor: '#1677ff' },
  { src: 'https://picsum.photos/200/200/?random=6', alt: 'user avatar' },
  { src: 'https://picsum.photos/200/200/?random=7', alt: 'user avatar' },
  { src: 'https://picsum.photos/200/200/?random=8', alt: 'user avatar' },
];

const avatarList2 = [
  { src: 'https://picsum.photos/200/200/?random=1', alt: 'user avatar' },
  { src: 'https://picsum.photos/200/200/?random=2', alt: 'user avatar' },
  { text: 'WangXiaoMing', textTruncate: -2, backgroundColor: '#13c2c2' },
  { src: 'https://picsum.photos/200/200/?random=4', alt: 'user avatar' },
];
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-around;
}

.avatar-group {
  display: flex;
  gap: 30px;
}
</style>

```

## API

### 属性
| Name      | Description                                               | Type                                                              | Default |
| --------- | --------------------------------------------------------- | ----------------------------------------------------------------- | ------- |
| icon      | 设置头像的图标类型，更多信息请参考 Icon 组件。            | ^[string] / ^[Component]                                          | —       |
| text      | 文字头像内容，在 `src` 和 `icon` 为空时显示。             | `string`                                                          | —       |
| text-truncate | 文字截取规则。正数从开头截取，负数从末尾截取，`0` 不截取。 | `number`                                                          | -2      |
| background-color | 文字头像背景色，为空时使用默认背景样式。             | `string`                                                          | —       |
| size      | 设置头像的大小。                                          | ^[number] / ^[enum]`'large' \| 'default' \| 'small' \| 'compact'` | default |
| shape     | 设置头像的形状。                                          | ^[enum]`'circle' \| 'square'`                                     | circle  |
| src       | 图片头像的资源地址。                                      | `string`                                                          | —       |
| src-set   | 图片头像的原生 `srcset` 属性。                            | `string`                                                          | —       |
| alt       | 图片头像的原生 `alt` 属性。                               | `string`                                                          | —       |
| fit       | 设置图片如何适应容器框。                                  | ^[enum]`'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | cover   |
| count     | 显示头像右上角的徽标数字。                                | `number`                                                          | —       |
| is-dot    | 显示头像右上角的徽标点。                                  | `boolean`                                                         | false   |

### 事件

| Name  | Description                    | Type                            |
| ----- | ------------------------------ | ------------------------------- |
| error | 图片加载失败时触发 | ^[Function]`(e: Event) => void` |

### 插槽

| Name    | Description               |
| ------- | ------------------------- |
| default | 自定义头像内容，优先级高于 `text` |

### 头像组 API

## 属性

| Name      | Description                                               | Type                                                              | Default |
| --------- | --------------------------------------------------------- | ----------------------------------------------------------------- | ------- |
| avatarList| 头像组数据，用于展示多个头像。                            | `Array<{src?: string, alt?: string, text?: string, textTruncate?: number, backgroundColor?: string, icon?: string}>` | —       |
| maxCount  | 头像组最大显示数量，超出部分将以 +n 的形式显示。          | `number`                                                          | 5       |
| before-order| 是否将溢出指示器放置在头像组的开头。                      | `boolean`                                                         | false   |
| shape     | 设置头像的形状（头像组没有溢出的情况下生效）。                                          | ^[enum]`'circle' \| 'square'`                                     | circle  |