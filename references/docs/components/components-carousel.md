---
title: Carousel 走马灯
originUrl: http://192.168.219.170/docs/vue/latest/component/component/carousel.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/carousel.html)

# Carousel 走马灯

在有限的空间内循环显示一系列图像或文本

## 基本用法

**Demo 示例**: `carousel/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/carousel.html)

```vue
<template>
  <div class="block text-center">
    <span class="demonstration">Switch when indicator is hovered (default)</span>
    <e-carousel height="150px">
      <e-carousel-item v-for="item in 4" :key="item">
        <h3 class="small justify-center" text="2xl">{{ item }}</h3>
      </e-carousel-item>
    </e-carousel>
  </div>
  <div class="block text-center" m="t-4">
    <span class="demonstration">Switch when indicator is clicked</span>
    <e-carousel trigger="click" height="150px">
      <e-carousel-item v-for="item in 4" :key="item">
        <h3 class="small justify-center" text="2xl">{{ item }}</h3>
      </e-carousel-item>
    </e-carousel>
  </div>
</template>

<style scoped>
.demonstration {
  color: var(--e-text-color-secondary);
}

.e-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.e-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.e-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

```

## 指示器

指示器可以显示在走马灯之外

**Demo 示例**: `carousel/indicator`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/carousel.html)

```vue
<template>
  <e-carousel indicator-position="outside">
    <e-carousel-item v-for="item in 4" :key="item">
      <h3 text="2xl" justify="center">{{ item }}</h3>
    </e-carousel-item>
  </e-carousel>
</template>

<style scoped>
.e-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.e-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.e-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

```

## 箭头

您可以定义何时显示箭头

**Demo 示例**: `carousel/arrows`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/carousel.html)

```vue
<template>
  <e-carousel :interval="5000" arrow="always">
    <e-carousel-item v-for="item in 4" :key="item">
      <h3 text="2xl" justify="center">{{ item }}</h3>
    </e-carousel-item>
  </e-carousel>
</template>

<style scoped>
.e-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.e-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.e-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

```

## 自动高度

当 `carousel` 的 `height` 设置为 `auto` 时，`carousel` 的高度将根据 `carousel item` 的高度自动调整

**Demo 示例**: `carousel/auto-height`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/carousel.html)

```vue
<template>
  <div class="block text-center" style="height: 300px">
    <span class="demonstration">每个 carouselItem 有不同的高度</span>
    <e-carousel height="auto" autoplay>
      <e-carousel-item style="height: 100px">
        <h3 class="small justify-center" text="2xl">height 100px</h3>
      </e-carousel-item>
      <e-carousel-item style="height: 200px">
        <h3 class="small justify-center" text="2xl">height 200px</h3>
      </e-carousel-item>
      <e-carousel-item style="height: 300px">
        <h3 class="small justify-center" text="2xl">height 300px</h3>
      </e-carousel-item>
    </e-carousel>
  </div>
</template>

<style scoped>
.carouse-item {
  color: #475669;
  opacity: 0.75;
  margin: 0;
  text-align: center;
}

.e-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  display: flex;
  align-items: center;
  margin: 0;
  text-align: center;
  height: 100%;
}

.e-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.e-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

```

## 卡片模式

当页面足够宽但高度有限时，您可以激活走马灯的卡片模式

**Demo 示例**: `carousel/card`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/carousel.html)

```vue
<template>
  <e-carousel :interval="4000" :loop="false" type="card" height="200px">
    <e-carousel-item v-for="item in 6" :key="item">
      <h3 text="2xl" justify="center">{{ item }}</h3>
    </e-carousel-item>
  </e-carousel>
</template>

<style scoped>
.e-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.e-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.e-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

```

## 垂直方向

默认情况下，`direction` 为 `horizontal`。通过将 `direction` 设置为 `vertical`，可以使走马灯以垂直方向显示。

**Demo 示例**: `carousel/vertical`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/carousel.html)

```vue
<template>
  <p class="text-center demonstration">normal vertical layout</p>
  <e-carousel height="200px" direction="vertical" :autoplay="false">
    <e-carousel-item v-for="item in 4" :key="item">
      <h3 text="2xl" justify="center">{{ item }}</h3>
    </e-carousel-item>
  </e-carousel>
  <p class="text-center demonstration">card vertical layout</p>
  <e-carousel height="400px" direction="vertical" type="card" :autoplay="false">
    <e-carousel-item v-for="item in 4" :key="item">
      <h3 text="2xl" justify="center">{{ item }}</h3>
    </e-carousel-item>
  </e-carousel>
</template>

<style scoped>
.e-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.e-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.e-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

```

## API

### Carousel Attributes

| Name               | Description                       | Type                                    | 默认值     |
| ------------------ | --------------------------------- | --------------------------------------- | ---------- |
| height             | 走马灯的高度                      | ^[字符串]                               | —          |
| initial-index      | 初始激活幻灯片的索引（从 0 开始） | ^[数字]                                 | 0          |
| trigger            | 指示器触发方式                    | ^[枚举]`'hover' \| 'click'`             | hover      |
| autoplay           | 是否自动循环播放幻灯片            | ^[布尔值]                               | true       |
| interval           | 自动循环的时间间隔，以毫秒为单位  | ^[数字]                                 | 3000       |
| indicator-position | 指示器的位置                      | ^[枚举]`'outside' \| 'none'`            | —          |
| arrow              | 何时显示箭头                      | ^[枚举]`'always' \| 'hover' \| 'never'` | hover      |
| type               | 走马灯的类型                      | ^[枚举]`'card'`                         | card       |
| loop               | 循环显示项目                      | ^[布尔值]                               | true       |
| direction          | 显示方向                          | ^[枚举]`'horizontal' \| 'vertical'`     | horizontal |
| pause-on-hover     | 悬停时是否暂停自动播放            | ^[布尔值]                               | true       |

### Carousel Events

| Name   | Description              | Type                                   |
| ------ | ------------------------ | -------------------------------------- |
| change | 当激活的幻灯片切换时触发 | 新激活幻灯片的索引，旧激活幻灯片的索引 |

### Carousel Methods

| Name          | Description        | Type                                                         |
| ------------- | ------------------ | ------------------------------------------------------------ |
| setActiveItem | 手动切换幻灯片     | 要切换到的幻灯片的索引，从 0 开始；或对应的 `e-carousel-item` 的 `name` |
| prev          | 切换到上一张幻灯片 | —                                                            |
| next          | 切换到下一张幻灯片 | —                                                            |

### Carousel Slots

| Name | Description    | 子标签        |
| ---- | -------------- | ------------- |
| -    | 自定义默认内容 | Carousel-Item |

### Carousel-Item Attributes

| Name  | Description                             | Type      | 默认值 |
| ----- | --------------------------------------- | --------- | ------ |
| name  | 项目的名称，可在 `setActiveItem` 中使用 | ^[字符串] | —      |
| label | 相应指示器的文本内容                    | ^[字符串] | —      |

### Carousel-Item Slots

| Name | Description    |
| ---- | -------------- |
| —    | 自定义默认内容 |