---
title: FileUploadService
originUrl: http://192.168.219.170/docs/vue/latest/frame/components/eui-core/ep-file-upload-service/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/components/eui-core/ep-file-upload-service/)

此组件由 `@epframe/eui-core` 包提供。

`FileUploadService` 控件是基于 `@epoint-fe/eui-components` 中的 [FileUpload](http://192.168.219.170/docs/vue/latest/component/component/file-upload.html) 控件封装的，简化了上传地址的配置以及添加了初始化自动加载附件列表的功能。

## 基础使用

- 配置 `action` 属性为上传文件的接口地址。

**Demo 示例**: `@epframe/eui-core/components/file-upload/base.vue`

```vue
<template>
  <ep-file-upload-service v-model:file-list="fileList" action="https://fe.epoint.com.cn/mock/752/eui-vue/upload" />
</template>
<script setup>
import { ref } from 'vue';
import { EpFileUploadService } from '@epframe/eui-core'

const fileList = ref([]);
</script>
```

## API

与 [FileUpload](http://192.168.219.170/docs/vue/latest/component/component/file-upload.html#fileupload-attributes) 一致。

## 区别

组件库内有 `Upload` 控件和 `FileUpload` 控件，框架中又有提供的 `FileUploadService` 控件，他们区别是：

- `Upload` 是实现上传功能的基础控件，只提供了上传功能。
- `FileUpload` 是基于 `Upload` 控件封装的，添加的分片上传的能力，支持以action属性配置所有附件操作的接口地址，并提供 文件列表关联的能力。
- `FileUploadService` 是在 `FileUpload` 的基础上封装的，简化了上传地址的配置以及添加了初始化自动加载附件列表的功能。