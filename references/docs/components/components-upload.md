---
title: Upload
originUrl: http://192.168.219.170/docs/vue/latest/component/component/upload.html
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/component/component/upload.html)

# Upload 上传

通过单击或拖放文件来上传。

## 基本用法

**Demo 示例**: `upload/basic`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/upload.html)

```vue
<template>
  <e-upload
    v-model:file-list="fileList"
    class="upload-demo"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    multiple
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :limit="3"
    :on-exceed="handleExceed"
  >
    <e-button type="primary">Click to upload</e-button>
    <template #tip>
      <div class="e-upload__tip">这里是对上传文件的提示说明文本，例如格式、大小等</div>
    </template>
  </e-upload>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { EMessage, EMessageBox } from '@epoint-fe/eui-components';

import type { UploadProps, UploadUserFile } from '@epoint-fe/eui-components';

const fileList = ref<UploadUserFile[]>([
  {
    name: 'element-plus-logo.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
  {
    name: 'element-plus-logo2.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
]);

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile);
};

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  EMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  );
};

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
  return EMessageBox.confirm(`Cancel the transfer of ${uploadFile.name} ?`).then(
    () => true,
    () => false
  );
};
</script>

```

## 覆盖先前文件

**Demo 示例**: `upload/limit-cover`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/upload.html)

```vue
<template>
  <e-upload
    ref="upload"
    class="upload-demo"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :limit="1"
    :on-exceed="handleExceed"
    :auto-upload="false"
  >
    <template #trigger>
      <e-button type="primary">select file</e-button>
    </template>
    <e-button class="ml-3" type="success" @click="submitUpload"> upload to server </e-button>
    <template #tip>
      <div class="e-upload__tip text-red">limit 1 file, new file will cover the old file</div>
    </template>
  </e-upload>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { genFileId } from '@epoint-fe/eui-components';
import type { UploadInstance, UploadProps, UploadRawFile } from '@epoint-fe/eui-components';

const upload = ref<UploadInstance>();

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

const submitUpload = () => {
  upload.value!.submit();
};
</script>

```

## 用户头像

使用 `before-upload` 钩子来限制上传文件的格式和大小。

**Demo 示例**: `upload/avatar`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/upload.html)

```vue
<template>
  <e-upload
    class="avatar-uploader"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <e-icon v-else class="avatar-uploader-icon"><Plus /></e-icon>
  </e-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';
import { Plus } from '@epoint-fe/eui-icons';

import type { UploadProps } from '@epoint-fe/eui-components';

const imageUrl = ref('');

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    EMessage.error('Avatar picture must be JPG format!');
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    EMessage.error('Avatar picture size can not exceed 2MB!');
    return false;
  }
  return true;
};
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 80px;
  height: 80px;
  display: block;
}
</style>

<style>
.avatar-uploader .e-upload {
  border: 1px dashed var(--e-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--e-transition-duration-fast);
}

.avatar-uploader .e-upload:hover {
  border-color: var(--e-color-primary);
}

.e-icon.avatar-uploader-icon {
  font-size: 16px;
  color: var(--e-icon-color-3);
  width: 80px;
  height: 80px;
  text-align: center;
}
</style>

```

## 照片墙

使用 `list-type` 来更改文件列表的样式。

**Demo 示例**: `upload/photo-wall`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/upload.html)

```vue
<template>
  <e-upload
    v-model:file-list="fileList"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
  >
    <e-icon><Plus /></e-icon>
  </e-upload>

  <e-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </e-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Plus } from '@epoint-fe/eui-icons';

import type { UploadProps, UploadUserFile } from '@epoint-fe/eui-components';

const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'plant-1.png',
    url: '/images/plant-1.png',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'plant-2.png',
    url: '/images/plant-2.png',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'figure-1.png',
    url: '/images/figure-1.png',
  },
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'figure-2.png',
    url: '/images/figure-2.png',
  },
]);

const dialogImageUrl = ref('');
const dialogVisible = ref(false);

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};
</script>

```

## 自定义缩略图

使用 `scoped-slot` 来更改默认缩略图模板。

**Demo 示例**: `upload/custom-thumbnail`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/upload.html)

```vue
<template>
  <e-upload action="#" list-type="picture-card" :auto-upload="false">
    <e-icon><Plus /></e-icon>

    <template #file="{ file }">
      <div>
        <img class="e-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="e-upload-list__item-actions">
          <span class="e-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <e-icon><zoom-in /></e-icon>
          </span>
          <span v-if="!disabled" class="e-upload-list__item-delete" @click="handleDownload(file)">
            <e-icon><Download /></e-icon>
          </span>
          <span v-if="!disabled" class="e-upload-list__item-delete" @click="handleRemove(file)">
            <e-icon><Delete /></e-icon>
          </span>
        </span>
      </div>
    </template>
  </e-upload>

  <e-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </e-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Delete, Download, Plus, ZoomIn } from '@epoint-fe/eui-icons';

import type { UploadFile } from '@epoint-fe/eui-components';

const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const disabled = ref(false);

const handleRemove = (file: UploadFile) => {
  console.log(file);
};

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
};

const handleDownload = (file: UploadFile) => {
  console.log(file);
};
</script>

```

## 带缩略图的文件列表

**Demo 示例**: `upload/file-list-with-thumbnail`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/upload.html)

```vue
<template>
  <e-upload
    v-model:file-list="fileList"
    class="upload-demo"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    list-type="picture"
  >
    <e-button type="primary">Click to upload</e-button>
    <template #tip>
      <div class="e-upload__tip">jpg/png files with a size less than 500kb</div>
    </template>
  </e-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import type { UploadProps, UploadUserFile } from '@epoint-fe/eui-components';

const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'food2.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
]);

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePreview: UploadProps['onPreview'] = (file) => {
  console.log(file);
};
</script>

```

## 文件列表控制

使用 `on-change` 钩子函数来控制上传文件列表。

**Demo 示例**: `upload/file-list`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/upload.html)

```vue
<template>
  <e-upload
    v-model:file-list="fileList"
    class="upload-demo"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :on-change="handleChange"
  >
    <e-button type="primary">Click to upload</e-button>
    <template #tip>
      <div class="e-upload__tip">jpg/png files with a size less than 500kb</div>
    </template>
  </e-upload>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

import type { UploadProps, UploadUserFile } from '@epoint-fe/eui-components';

const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'food2.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
]);

const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  fileList.value = fileList.value.slice(-3);
};
</script>

```

## 拖拽上传

您可以将文件拖放到特定区域以上传它。

**Demo 示例**: `upload/drag-and-drop`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/upload.html)

```vue
<template>
  <e-upload class="upload-demo" drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple>
    <e-icon class="e-icon--upload"><upload-filled /></e-icon>
    <div class="e-upload__text">拖拽到此区域<em>点击上传</em></div>
    <template #tip>
      <div class="e-upload__tip">支持 jpg/png 格式文件，且文件大小不超过 500kb</div>
    </template>
  </e-upload>
</template>

<script setup lang="ts">
import { UploadFilled } from '@epoint-fe/eui-icons';
</script>

```

## 手动上传

**Demo 示例**: `upload/manual`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/upload.html)

```vue
<template>
  <e-upload
    ref="uploadRef"
    class="upload-demo"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :auto-upload="false"
  >
    <template #trigger>
      <e-button type="primary">select file</e-button>
    </template>

    <e-button class="ml-3" type="success" @click="submitUpload"> upload to server </e-button>

    <template #tip>
      <div class="e-upload__tip">jpg/png files with a size less than 500kb</div>
    </template>
  </e-upload>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { UploadInstance } from '@epoint-fe/eui-components';

const uploadRef = ref<UploadInstance>();

const submitUpload = () => {
  uploadRef.value!.submit();
};
</script>

```

## 排序

使用 `enableSort` 来开启拖拽排序

**Demo 示例**: `upload/sort`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/upload.html)

```vue
<template>
  <e-upload
    v-model:file-list="fileList"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    list-type="picture-card"
    enable-sort
    :on-sort-change="handleSortChange"
  >
    <e-icon>
      <Plus />
    </e-icon>
  </e-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Plus } from '@epoint-fe/eui-icons';

import type { UploadProps, UploadUserFile } from '@epoint-fe/eui-components';

const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'plant-1.png',
    url: '/images/plant-1.png',
  },
  {
    name: 'plant-2.png',
    url: '/images/plant-2.png',
  },
  {
    name: 'figure-1.png',
    url: '/images/figure-1.png',
  },
  {
    name: 'figure-2.png',
    url: '/images/figure-2.png',
  },
]);

const handleSortChange: UploadProps['onSortChange'] = (uploadFiles) => {
  console.log(uploadFiles);
};
</script>

```

## 权限控制

通过 `enable-add`、`enable-delete`、`enable-download`、`enable-preview`、`show-file-status` 可以控制组件上传、删除、下载、预览、文件状态标识的开启情况。

**Demo 示例**: `upload/right-control`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/upload.html)

```vue
<template>
  <e-upload
    action="#"
    list-type="picture-card"
    :enable-add="true"
    :enable-download="true"
    :enable-delete="true"
    :enable-preview="true"
  >
    <e-icon><Plus /></e-icon>

    <template #file="{ file, enableDelete, enableDownload, enablePreview }">
      <div>
        <img class="e-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="e-upload-list__item-actions">
          <span v-if="enablePreview" class="e-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <e-icon><zoom-in /></e-icon>
          </span>
          <span v-if="enableDownload" class="e-upload-list__item-delete" @click="handleDownload(file)">
            <e-icon><Download /></e-icon>
          </span>
          <span v-if="enableDelete" class="e-upload-list__item-delete" @click="handleRemove(file)">
            <e-icon><Delete /></e-icon>
          </span>
        </span>
      </div>
    </template>
  </e-upload>

  <e-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </e-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Delete, Download, Plus, ZoomIn } from '@epoint-fe/eui-icons';

import type { UploadFile } from '@epoint-fe/eui-components';

const dialogImageUrl = ref('');
const dialogVisible = ref(false);

const handleRemove = (file: UploadFile) => {
  console.log('Delete', file);
};

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
};

const handleDownload = (file: UploadFile) => {
  console.log('Download', file);
};
</script>

```

## 自定义文件图标

使用 `custom-icon-render` 属性可以自定义文件图标的渲染。该函数接收文件名作为参数,返回一个 Vue 组件或 `null`/`undefined`（使用默认图标）。

**Demo 示例**: `upload/custom-icon`
> 💡 **查看实际效果**: [在原文档中查看](http://192.168.219.170/docs/vue/latest/component/component/upload.html)

```vue
<template>
  <e-upload
    v-model:file-list="fileList"
    class="upload-demo"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    multiple
    :custom-icon-render="customIconRender"
    :limit="5"
  >
    <e-button type="primary">点击上传文件</e-button>
    <template #tip>
      <div class="e-upload__tip">演示自定义文件图标渲染，支持 .md 和 .vue 文件的自定义图标</div>
    </template>
  </e-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import IconMd from './icon-md.vue';
import IconVue from './icon-vue.vue';
import type { UploadUserFile } from '@epoint-fe/eui-components';

const fileList = ref<UploadUserFile[]>([
  {
    name: 'README.md',
    url: 'https://example.com/readme.md',
  },
  {
    name: 'component.vue',
    url: 'https://example.com/component.vue',
  },
  {
    name: 'document.pdf',
    url: 'https://example.com/document.pdf',
  },
]);

// 自定义文件图标渲染函数
const customIconRender = (fileName: string) => {
  const ext = fileName.split('.').pop()?.toLowerCase();

  if (ext === 'md') {
    return IconMd;
  }

  if (ext === 'vue') {
    return IconVue;
  }

  // 返回 null 使用默认图标
  return null;
};
</script>

```

::: tip 提示
如果需要全局注册自定义图标，请参考 [FileIcon 组件 - 全局注册自定义图标](http://192.168.219.170/docs/vue/latest/component/component/file-icon.html#全局注册自定义图标)
:::

## Upload API

### Attributes

| Name                              | Description                                                                                                                                                               | Type                                                                                                                      | Default  | Required |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------- | -------- |
| `action`                          | 请求的 URL 地址                                                                                                                                                           | `string`                                                                                                                  | —        | 是       |
| `headers`                         | 请求头部信息                                                                                                                                                              | `Headers \| Record<string, any>`                                                                                          | —        | 否       |
| `method`                          | 设置上传请求的方法                                                                                                                                                        | `string`                                                                                                                  | `'post'` | 否       |
| `multiple`                        | 是否允许上传多个文件                                                                                                                                                      | `boolean`                                                                                                                 | `false`  | 否       |
| `data`                            | 请求的附加参数                                                                                                                                                            | `Record<string, any>`                                                                                                     | —        | 否       |
| `name`                            | 上传文件的键名                                                                                                                                                            | `string`                                                                                                                  | `'file'` | 否       |
| `with-credentials`                | 是否发送 cookies                                                                                                                                                          | `boolean`                                                                                                                 | `false`  | 否       |
| `show-file-list`                  | 是否显示已上传文件列表                                                                                                                                                    | `boolean`                                                                                                                 | `true`   | 否       |
| `show-action`                     | 是否显示上传按钮，使用默认插槽或 `trigger` 插槽时会强制显示                                                                                                               | `boolean`                                                                                                                 | `true`   | 否       |
| `drag`                            | 是否启用拖拽模式                                                                                                                                                          | `boolean`                                                                                                                 | `false`  | 否       |
| `accept`                          | 接受的文件类型，当 `thumbnail-mode === true` 时不起作用                                                                                                                   | `string`                                                                                                                  | —        | 否       |
| `enable-sort`                     | 是否启用拖拽排序                                                                                                                                                          | `boolean`                                                                                                                 | `false`  | 否       |
| `on-preview`                      | 点击已上传文件时的钩子函数                                                                                                                                                | `(uploadFile: UploadFile) => void`                                                                                        | —        | 否       |
| `on-remove`                       | 删除文件时的钩子函数                                                                                                                                                      | `(uploadFile: UploadFile, uploadFiles: UploadFiles) => void`                                                              | —        | 否       |
| `on-success`                      | 上传成功时的钩子函数                                                                                                                                                      | `(response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void`                                               | —        | 否       |
| `on-error`                        | 发生错误时的钩子函数                                                                                                                                                      | `(error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void`                                                | —        | 否       |
| `on-progress`                     | 上传过程中的钩子函数                                                                                                                                                      | `(evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => void`                                    | —        | 否       |
| `on-change`                       | 选择文件、上传成功或上传失败时的钩子函数                                                                                                                                  | `(uploadFile: UploadFile, uploadFiles: UploadFiles) => void`                                                              | —        | 否       |
| `on-exceed`                       | 超出限制时的钩子函数                                                                                                                                                      | `(files: File[], uploadFiles: UploadUserFile[]) => void`                                                                  | —        | 否       |
| `before-start`                    | 开始添加文件前的钩子函数，接受待添加的文件作为参数。如果返回 `false` 或返回一个被拒绝的 `Promise`，则会中止添加。可用来做文件的验证。                                     | `(rawFile: UploadRawFile) => Awaitable<boolean>`                                                                          | —        | 否       |
| `before-upload`                   | 上传前的钩子函数，接受待上传的文件和可选的替换目标文件作为参数。如果返回 `false` 或返回一个被拒绝的 `Promise`，则会中止上传。当进行文件替换时，第二个参数为被替换的文件。 | `(rawFile: UploadRawFile, replaceTarget?: UploadFile) => Awaitable<void \| undefined \| null \| boolean \| File \| Blob>` | —        | 否       |
| `before-remove`                   | 删除文件前的钩子函数，接受文件和文件列表作为参数。如果返回 `false` 或返回一个被拒绝的 `Promise`，则会中止删除。                                                           | `(uploadFile: UploadFile, uploadFiles: UploadFiles) => Awaitable<boolean>`                                                | —        | 否       |
| `file-list` / `v-model:file-list` | 默认的已上传文件列表                                                                                                                                                      | `UploadUserFile[]`                                                                                                        | `[]`     | 否       |
| `on-sort-change`                  | 排序成功后的钩子函数                                                                                                                                                      | `(uploadFiles: UploadFiles) => void`                                                                                      | —        | 否       |
| `list-type`                       | 文件列表的类型                                                                                                                                                            | `'text' \| 'picture' \| 'picture-card'`                                                                                   | `'text'` | 否       |
| `auto-upload`                     | 是否自动上传文件                                                                                                                                                          | `boolean`                                                                                                                 | `true`   | 否       |
| `http-request`                    | 覆盖默认的 xhr 行为，允许你实现自己的上传文件请求                                                                                                                         | `(options: UploadRequestOptions) => XMLHttpRequest \| Promise<unknown>`                                                   | —        | 否       |
| `disabled`                        | 是否禁用上传                                                                                                                                                              | `boolean`                                                                                                                 | `false`  | 否       |
| `enable-add`                      | 是否允许新增文件                                                                                                                                                          | `boolean`                                                                                                                 | `true`   | 否       |
| `enable-delete`                   | 是否允许删除文件                                                                                                                                                          | `boolean`                                                                                                                 | `true`   | 否       |
| `enable-download`                 | 是否允许下载文件                                                                                                                                                          | `boolean`                                                                                                                 | `false`  | 否       |
| `enable-preview`                  | 是否允许预览文件                                                                                                                                                          | `boolean`                                                                                                                 | `false`  | 否       |
| `show-file-status`                | 是否显示文件状态标识                                                                                                                                                      | `boolean`                                                                                                                 | `true`   | 否       |
| `limit`                           | 允许的最大上传数量                                                                                                                                                        | `number`                                                                                                                  | —        | 否       |
| `limit-alert`                     | 上传超过最大可上传文件数的文本提示                                                                                                                                        | `string`                                                                                                                  | —        | 否       |
| `custom-icon-render`              | 自定义文件图标渲染函数，会自动注入给所有文件列表中的图标。返回图标组件或 `null`/`undefined` 则使用默认逻辑                                                                | `(fileName: string) => Component \| null \| undefined`                                                                    | —        | 否       |

### Slots

| Name      | Description          | Type                                                                                           |
| --------- | -------------------- | ---------------------------------------------------------------------------------------------- |
| `default` | 自定义默认内容       | -                                                                                              |
| `trigger` | 触发文件对话框的内容 | -                                                                                              |
| `tip`     | 提示内容             | -                                                                                              |
| `file`    | 缩略图模板的内容     | `{ file: UploadFile, enableDelete: Boolean, enableDownload: Boolean, enablePreview: Boolean }` |

### Exposes

| Name           | Description                                               | Type                                                                      |
| -------------- | --------------------------------------------------------- | ------------------------------------------------------------------------- |
| `abort`        | 取消上传请求                                              | `(file: UploadFile) => void`                                              |
| `submit`       | 手动上传文件列表                                          | `() => void`                                                              |
| `clearFiles`   | 清空文件列表（此方法不支持在 `before-upload` 钩子中使用） | `(status?: Array<"ready" \| "uploading" \| "success" \| "fail">) => void` |
| `handleStart`  | 手动选择文件                                              | `(rawFile: UploadRawFile) => void`                                        |
| `handleRemove` | 手动移除文件                                              | `(file: UploadFile \| UploadRawFile, rawFile?: UploadRawFile) => void`    |
| `triggerClick` | 手动触发选择文件，可传入文件参数进行替换                  | `(replaceFile?: UploadFile) => void`                                      |