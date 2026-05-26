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

<script setup>
import { ref } from 'vue';
import IconMd from './icon-md.vue';
import IconVue from './icon-vue.vue';

const fileList = ref([
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
const customIconRender = (fileName) => {
  const ext = fileName.split('.').pop()?.toLowerCase();

  // 为 Markdown 文件自定义图标
  if (ext === 'md') {
    return IconMd;
  }

  // 为 Vue 文件自定义图标
  if (ext === 'vue') {
    return IconVue;
  }

  // 返回 null 使用默认图标
  return null;
};
</script>
