<template>
  <ep-layout-manager v-loading="model.global.state.loading">
    <div>使用 defineFrameModel 的简化页面</div>
  </ep-layout-manager>
</template>

<script setup>
import { onMounted } from 'vue';
import { Utils } from '@epframe/eui-core';

const { PageConfig } = Utils;

const model = Utils.defineFrameModel({
  pageConfig: new PageConfig({ variableCategory: ['soa'] })
});

onMounted(() => {
  model.methods.initData();
});
</script>
