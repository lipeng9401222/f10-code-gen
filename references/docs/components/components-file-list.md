---
title: FileList
originUrl: http://192.168.219.170/docs/vue/latest/component/component/file-list.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/file-list.html)

# FileList

文件上传控件的文件列表。

## 基础用法

使用 `data` 指定文件列表。

**Demo 示例**: `file-list/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/file-list.html)

```vue
<template>
  <e-file-list :data="fileList" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const fileList = ref([
  {
    name: '图片1.jpg',
    attachGuid: 'c8ecece4-0a99-46dc-b419-fb7050aab4c8',
    downloadUrl: 'https://picsum.photos/800/800/',
    uploadDate: '2023-10-27 18:17:31',
    size: 1392528,
  },
  {
    name: '图片2.png',
    attachGuid: '19314fdd-be3b-42f4-ab7e-78c90b797b2b',
    downloadUrl: 'https://picsum.photos/800/800/',
    uploadDate: '2023-10-27 18:18:55',
    size: 79358,
  },
]);
</script>

```

## API

### Attributes

| Name   | Description | Type             | Default |
| ------ | ----------- | ---------------- | ------- |
| `data` | 文件列表    | `UploadedFile[]` | `[]`    |

### Type Declarations

<details>
  <summary>查看类型定义</summary>

```ts
type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail';
interface UploadRawFile extends File {
  uid: number;
}

interface UploadedFile {
  uploadDate: string;
  attachGuid: string;
  downloadUrl: string;
  name: string;
  size: number;
  percentage?: number;
  status?: UploadStatus;
  response?: unknown;
  uid?: number;
  url?: string;
  raw?: UploadRawFile;
}
```

</details>