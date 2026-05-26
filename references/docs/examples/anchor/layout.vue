<template>
  <div class="debug-panel">
    <span>layout</span>
    <e-segmented v-model="layout" :options="layoutOptions" size="small" />
    <span>type</span>
    <e-segmented v-model="type" :options="typeOptions" size="small" />
  </div>
  <div class="wrapper" :class="`is-${layout}`">
    <e-scrollbar ref="contentRef" class="content">
      <h2>基本信息</h2>
      <section />
      <h2>业务指标</h2>
      <section />
      <h3>关键指标</h3>
      <section />
      <h4>指标明细</h4>
      <section />
      <h2>推进计划</h2>
      <section />
    </e-scrollbar>
    <div class="side" :class="`is-${layout}`">
      <e-anchor
        class="anchor"
        :target="target"
        :tags="tags"
        :layout="layout"
        :type="type"
        @active-change="handleActiveChange"
        @type-change="handleTypeChange"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { NodeItem } from '@eui-components/components/anchor';

type AnchorLayout = 'right' | 'left';
type AnchorType = 'text' | 'module';

const tags = ref(['h2', 'h3', 'h4']);
const contentRef = ref();
const target = computed(() => contentRef.value?.wrapRef);
const layout = ref<AnchorLayout>('right');
const type = ref<AnchorType>('text');

const layoutOptions = ['right', 'left'];
const typeOptions = ['text', 'module'];

const handleActiveChange = (newValue: NodeItem, oldValue: NodeItem) => {
  console.log(newValue, oldValue);
};

const handleTypeChange = (showType: AnchorType) => {
  type.value = showType;
};
</script>
<style lang="scss" scoped>
.debug-panel {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.wrapper {
  display: flex;
  gap: 10px;

  &.is-left {
    flex-direction: row-reverse;
  }

  .side {
    display: flex;
    width: 180px;
    flex: 0 0 180px;

    &.is-left {
      justify-content: flex-end;
    }
  }
  .content {
    height: 800px;
    background: #fff;
    flex: 1;
    border-radius: 10px;
    padding: 0 20px;

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

  .anchor {
    width: max-content;
  }
}
</style>
