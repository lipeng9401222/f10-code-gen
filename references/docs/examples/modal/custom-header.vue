<template>
  <e-button @click="visible = true">打开自定义头部的 Modal</e-button>

  <e-modal v-model="visible" title="详情展示">
    <template #header="{ close, title }">
      <div class="flex items-center">
        <e-button @click="close">
          <e-icon><ArrowLeft /></e-icon>
          返回
        </e-button>
        <span class="ml-l">{{ title }}</span>
      </div>
    </template>

    <p>这是一个自定义头部示例。</p>
  </e-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ArrowLeft } from '@epoint-fe/eui-icons';

const visible = ref(false);
</script>
