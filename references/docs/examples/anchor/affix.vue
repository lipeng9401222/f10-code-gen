<template>
  <div class="wrapper">
    <div ref="contentRef" class="content">
      <h2>基本信息</h2>
      <section />
      <h2>业务指标</h2>
      <section />
      <h3>关键指标</h3>
      <section />
      <h3>模块化</h3>
      <section />
      <h4>主题</h4>
      <section />
      <h2>推进计划</h2>
      <section />
      <h2>反馈</h2>
      <section />
    </div>
    <e-anchor
      class="anchor"
      affix
      collapsible
      :affix-offset="offset"
      :offset="offset"
      :target="target"
      :tags="tags"
      @active-change="handleActiveChange"
    />
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { NodeItem } from '@eui-components/components/anchor';

const tags = ref(['h2', 'h3', 'h4', 'h5']);
const contentRef = ref();
const target = computed(() => contentRef.value);
const offset = ref(55);
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;

  .content {
    flex: 1;
    h2,
    h3,
    h4 {
      margin: 0;
      padding: 20px 0;
    }
    section {
      height: 100px;
      border-radius: 10px;
      background: #f0f0f0;
    }
  }

  .anchor {
    margin-left: 20px;
    z-index: 1;
  }
}
</style>
