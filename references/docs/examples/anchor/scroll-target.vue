<template>
  <div class="wrapper">
    <div ref="contentRef" class="content">
      <e-scrollbar ref="scrollbarRef" height="400px">
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
      </e-scrollbar>
    </div>
    <e-anchor
      class="anchor"
      :target="target"
      :scroll-target="scrollTarget"
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
const scrollbarRef = ref();

// target 指向包含标题的目标容器，用于扫描 DOM 生成导航
const target = computed(() => contentRef.value);
// scroll-target 单独指向滚动容器，用于绑定 scroll 事件
const scrollTarget = computed(() => scrollbarRef.value?.wrapRef);

const handleActiveChange = (newValue: NodeItem, oldValue: NodeItem) => {
  console.log(newValue, oldValue);
};
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;

  .content {
    flex: 1;
    padding-right: 20px;

    h2,
    h3,
    h4,
    h5 {
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
    margin-left: 10px;
  }
}
</style>
