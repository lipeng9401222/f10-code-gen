---
title: Image
originUrl: http://192.168.219.170/docs/vue/latest/component/component/image.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/image.html)

# Image 图片

图片容器，在保留所有原生 img 的特性下，支持懒加载，自定义占位、加载失败等

## Basic Usage

**Demo 示例**: `image/basic-usage`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/image.html)

```vue
<template>
  <div class="demo-image">
    <div v-for="fit in fits" :key="fit" class="block">
      <span class="demonstration">{{ fit }}</span>
      <e-image style="width: 100px; height: 100px" :src="url" :fit="fit" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const fits = ['fill', 'contain', 'cover', 'none', 'scale-down'];
const url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg';
</script>

<style scoped>
.demo-image .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--e-border-color);
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image .block:last-child {
  border-right: none;
}
.demo-image .demonstration {
  display: block;
  color: var(--e-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>

```

## 占位内容

**Demo 示例**: `image/placeholder`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/image.html)

```vue
<template>
  <div class="demo-image__placeholder">
    <div class="block">
      <span class="demonstration">Default</span>
      <e-image :src="src" />
    </div>
    <div class="block">
      <span class="demonstration">Custom</span>
      <e-image :src="src">
        <template #placeholder>
          <div class="image-slot">Loading<span class="dot">...</span></div>
        </template>
      </e-image>
    </div>
  </div>
</template>

<script lang="ts" setup>
const src = 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg';
</script>

<style scoped>
.demo-image__placeholder .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--e-border-color);
  display: inline-block;
  width: 49%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image__placeholder .demonstration {
  display: block;
  color: var(--e-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.demo-image__placeholder .e-image {
  padding: 0 5px;
  max-width: 300px;
  max-height: 200px;
}

.demo-image__placeholder.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--e-fill-color-light);
  color: var(--e-text-color-secondary);
  font-size: 14px;
}
.demo-image__placeholder .dot {
  animation: dot 2s infinite steps(3, start);
  overflow: hidden;
}
</style>

```

## 加载失败

**Demo 示例**: `image/load-failed`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/image.html)

```vue
<template>
  <div class="demo-image__error">
    <div class="block">
      <span class="demonstration">Default</span>
      <e-image />
    </div>
    <div class="block">
      <span class="demonstration">Custom</span>
      <e-image>
        <template #error>
          <div class="image-slot">
            <e-icon><icon-picture /></e-icon>
          </div>
        </template>
      </e-image>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Picture as IconPicture } from '@epoint-fe/eui-icons';
</script>

<style scoped>
.demo-image__error .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--e-border-color);
  display: inline-block;
  width: 49%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image__error .demonstration {
  display: block;
  color: var(--e-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.demo-image__error .e-image {
  padding: 0 5px;
  max-width: 300px;
  max-height: 200px;
  width: 100%;
  height: 200px;
}

.demo-image__error .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--e-fill-color-light);
  color: var(--e-text-color-secondary);
  font-size: 30px;
}
.demo-image__error .image-slot .e-icon {
  font-size: 30px;
}
</style>

```

## 懒加载

> **💡 提示**
>
> 已支持原生的 `loading`，您可以使用 `loading = "lazy"` 代替 `lazy = true`。
> 
> 如果当前浏览器支持原生的懒加载，将首先使用原生懒加载，否则将通过滚动来实现。

**Demo 示例**: `image/lazy-load`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/image.html)

```vue
<template>
  <div class="demo-image__lazy">
    <e-image v-for="url in urls" :key="url" :src="url" lazy />
  </div>
</template>

<script lang="ts" setup>
const urls = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
];
</script>

<style scoped>
.demo-image__lazy {
  height: 400px;
  overflow-y: auto;
}
.demo-image__lazy .e-image {
  display: block;
  min-height: 200px;
  margin-bottom: 10px;
}
.demo-image__lazy .e-image:last-child {
  margin-bottom: 0;
}
</style>

```

## 图像预览

**Demo 示例**: `image/image-preview`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/image.html)

```vue
<template>
  <div class="demo-image__preview">
    <e-image
      style="width: 100px; height: 100px"
      :src="url"
      :zoom-rate="1.2"
      :preview-src-list="srcList"
      :initial-index="4"
      fit="cover"
    />
  </div>
</template>

<script lang="ts" setup>
const url = 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg';
const srcList = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
];
</script>

<style scoped>
.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .e-icon {
  font-size: 30px;
}
.demo-image__error .e-image {
  width: 100%;
  height: 200px;
}
</style>

```

## Image API

### Image Attributes

| Name                    | Description                                                                                                              | Type                                                       | Default                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- | ---------------------------------------------- |
| `src`                   | 图像源，与原生相同。                                                                                                     | `string`                                                   | —                                              |
| `fit`                   | 指示图像应如何调整大小以适应其容器，与 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) 相同。  | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | —                                              |
| `hide-on-click-modal`   | 启用预览时，使用此标志来控制是否点击背景可以退出预览模式。                                                               | `boolean`                                                  | `false`                                        |
| `loading`               | 指示浏览器应如何加载图像，与 [native](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading) 相同。 | `'eager' \| 'lazy'`                                        | —                                              |
| `lazy`                  | 是否使用懒加载。                                                                                                         | `boolean`                                                  | `false`                                        |
| `scroll-container`      | 使用懒加载时要添加滚动监听器的容器。                                                                                     | `string \| HTMLElement`                                    | 具有溢出属性为 auto 或 scroll 的最近的父容器。 |
| `alt`                   | 原生属性 `alt`。                                                                                                         | `string`                                                   | —                                              |
| `referrerpolicy`        | 原生属性 [referrerPolicy](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/referrerPolicy)。            | `string`                                                   | —                                              |
| `preview-src-list`      | 允许大图像预览。                                                                                                         | `string[]`                                                 | —                                              |
| `z-index`               | 设置图像预览的 z-index。                                                                                                 | `number`                                                   | —                                              |
| `initial-index`         | 初始预览图像索引，必须小于 `url-list` 的长度。                                                                           | `number`                                                   | `0`                                            |
| `close-on-press-escape` | 图像查看器是否可以通过按 ESC 键关闭。                                                                                    | `boolean`                                                  | `true`                                         |
| `preview-teleported`    | 是否将图像查看器附加到 body。嵌套的父元素属性 transform 应设置为 `true`。                                                | `boolean`                                                  | `false`                                        |

### Image Events

| Name     | Description                                                 | Type                      |
| -------- | ----------------------------------------------------------- | ------------------------- |
| `load`   | 与原生 load 相同。                                          | `(e: Event) => void`      |
| `error`  | 与原生 error 相同。                                         | `(e: Error) => void`      |
| `switch` | 切换图像时触发。                                            | `(index: number) => void` |
| `close`  | 单击关闭按钮或启用 `hide-on-click-modal` 后单击背景时触发。 | `() => void`              |

### Image Slots

| Name          | Description                      |
| ------------- | -------------------------------- |
| `placeholder` | 图像尚未加载时的自定义占位内容。 |
| `error`       | 自定义图像加载失败内容。         |
| `viewer`      | 图像的描述。                     |

## Image Viewer API

### Image Viewer Attributes

| Name                  | Description                                                             | Type               | Default |
| --------------------- | ----------------------------------------------------------------------- | ------------------ | ------- |
| `url-list`            | 预览链接列表。                                                          | `string[]`         | `[]`    |
| `z-index`             | 预览背景的 z-index。                                                    | `number \| string` | —       |
| `initial-index`       | 初始预览图像索引，必须小于或等于 `url-list` 的长度。                    | `number`           | `0`     |
| `infinite`            | 预览是否无限循环。                                                      | `boolean`          | `true`  |
| `hide-on-click-modal` | 用户是否可以在点击背景时触发关闭事件。                                  | `boolean`          | `false` |
| `teleported`          | 是否将图像自身附加到 body。嵌套的父元素属性 transform 应设置为 `true`。 | `boolean`          | `false` |
| `zoom-rate`           | 图像查看器缩放事件的缩放比率。                                          | `number`           | `1.2`   |

### Image Viewer Events

| Name     | Description                                                 | Type                      |
| -------- | ----------------------------------------------------------- | ------------------------- |
| `close`  | 单击关闭按钮或启用 `hide-on-click-modal` 后单击背景时触发。 | `() => void`              |
| `switch` | 切换图像时触发。                                            | `(index: number) => void` |

## Image Viewer Methods

| Method        | Description  | Parameters                            |
| ------------- | ------------ | ------------------------------------- |
| setActiveItem | 手动切换图像 | 要切换到的图像的索引，从 0 开始计数。 |