---
title: 卡片

originUrl: http://192.168.219.170/docs/vue/latest/component/component/card.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/card.html)

# 卡片

将信息整合到卡片容器中。

## 基本用法

卡片包括标题、内容和操作。

**Demo 示例**: `card/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/card.html)

```vue
<template>
  <e-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Card name</span>
        <e-button class="button" text>Operation button</e-button>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
    <template #footer>
      <e-button text>Footer Content</e-button>
    </template>
  </e-card>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>

```

## 简单卡片

标题部分可以省略。

**Demo 示例**: `card/simple`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/card.html)

```vue
<template>
  <e-card class="box-card">
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
  </e-card>
</template>
<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
</style>

```

## 带图片

通过添加一些配置来显示更丰富的内容。

**Demo 示例**: `card/with-images`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/card.html)

```vue
<template>
  <e-row>
    <e-col v-for="(o, index) in 2" :key="o" :span="8" :offset="index > 0 ? 2 : 0">
      <e-card :body-style="{ padding: '0px' }">
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="image"
        />
        <div style="padding: 14px">
          <span>Yummy hamburger</span>
          <div class="bottom">
            <time class="time">{{ currentDate }}</time>
            <e-button text class="button">Operating</e-button>
          </div>
        </div>
      </e-card>
    </e-col>
  </e-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const currentDate = ref(new Date());
</script>

<style scoped>
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>

```

## 阴影

您可以定义何时显示卡片阴影。

**Demo 示例**: `card/shadow`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/card.html)

```vue
<template>
  <e-row :gutter="12">
    <e-col :span="8">
      <e-card shadow="always"> Always </e-card>
    </e-col>
    <e-col :span="8">
      <e-card shadow="hover"> Hover </e-card>
    </e-col>
    <e-col :span="8">
      <e-card shadow="never"> Never </e-card>
    </e-col>
  </e-row>
</template>

```

## API

### Attributes

| Name    | Description                            | Type                           | Default |
| ---------- | ---------------------------------------- | --------------------------------- | ------- |
| header     | 卡片的标题。还可以通过 `slot#header` 传递 DOM 元素 | ^[string]                         | —       |
| footer     | 卡片的底部。还可以通过 `slot#footer` 传递 DOM 元素 | ^[string]                         | —       |
| body-style | 卡片主体的 CSS 样式                        | ^[object]`CSSProperties`          | —       |
| shadow     | 何时显示卡片阴影                          | ^[enum]`always \| never \| hover` | always  |

### Slots

| Name | Description         |
| ------- | -------------------------- |
| default | 自定义默认内容  |
| header  | 卡片标题的内容 |
| footer  | 卡片底部的内容 |