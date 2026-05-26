---
title: ImageUploadService
originUrl: http://192.168.219.170/docs/vue/latest/frame/components/eui-core/ep-image-upload-service/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/components/eui-core/ep-image-upload-service/)

此组件由 `@epframe/eui-core` 包提供。

`ImageUploadService` 控件是基于 `@epoint-fe/eui-components` 中的 [ImageUpload](http://192.168.219.170/docs/vue/latest/component/component/image-upload.html) 控件封装的，简化了上传地址的配置以及添加了初始化自动加载图片列表的功能。

## 基础使用​

- 配置 `action` 属性为上传图片的接口地址。

**Demo 示例**: `@epframe/eui-core/components/image-upload/base.vue`

```vue
<template>
  <ep-image-upload-service v-model:image-list="imageList" action="https://fe.epoint.com.cn/mock/752/eui-vue/upload_image" />
</template>
<script setup>
import { ref } from 'vue';
import { EpImageUploadService } from '@epframe/eui-core'

const imageList = ref([]);
</script>
```

## API

与 [ImageUpload](http://192.168.219.170/docs/vue/latest/component/component/image-upload.html#imageupload-attributes) 一致。

## 区别

与组件库中的 [ImageUpload](http://192.168.219.170/docs/vue/latest/component/component/image-upload.html) 控件相比，ImageUploadService 控件主要有以下区别：

- `action` 属性值像 ajax 请求一样可直接配相对路径即可
- 初始化时会自动加载图片列表