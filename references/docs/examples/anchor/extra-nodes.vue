<template>
  <div class="wrapper">
    <e-scrollbar ref="contentRef" class="content">
      <h2>基本信息</h2>
      <section />
      <h2>业务指标</h2>
      <section />
      <h3>关键指标</h3>
      <section />
      <h2>推进计划</h2>
      <section />
    </e-scrollbar>
    <e-tabs v-model="activeName" class="demo-tabs">
      <e-tab-pane label="User" name="first">User</e-tab-pane>
      <e-tab-pane label="Config" name="second">Config</e-tab-pane>
    </e-tabs>
    <e-anchor
      class="anchor"
      :target="target"
      :extra-nodes="extraNodes"
      :tags="tags"
      @active-change="handleActiveChange"
    />
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { ExtraNodeItem, NodeItem } from '@eui-components/components/anchor';

const tags = ref(['h2', 'h3']);
const contentRef = ref();
const target = computed(() => contentRef.value?.wrapRef);

const activeName = ref('first');

// 额外节点：无 elem 时仅支持点击切换 active，不参与滚动联动
const extraNodes = ref<ExtraNodeItem[]>([
  { id: 'User', name: 'User', level: 0 },
  { id: 'Config', name: 'Config', level: 0 },
]);

const handleActiveChange = (newValue: NodeItem) => {
  if (newValue.id === 'User') {
    activeName.value = 'first';
  } else if (newValue.id === 'Config') {
    activeName.value = 'second';
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  height: 800px;

  .content {
    height: 100%;
    background: #fff;
    flex: 1;
    border-radius: 10px;
    padding-right: 20px;

    h2,
    h3 {
      margin: 0;
      padding: 20px 0;
    }
    section {
      height: 500px;
      border-radius: 10px;
      background: #f0f0f0;
    }
  }

  .demo-tabs {
    flex: 1;
  }
  .anchor {
    margin-left: 10px;
  }
}
</style>
