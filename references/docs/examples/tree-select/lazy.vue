<template>
  <EForm label-width="100px">
    <EFormItem label="懒加载">
      <e-tree-select v-model="value" :data="defaultTreeData" :load-more="loadMore" />
    </EFormItem>
    <EFormItem label="缓存数据">
      <e-tree-select v-model="value2" :data="defaultTreeData" :load-more="loadMore" :cache-data="cacheData" />
    </EFormItem>
  </EForm>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref();
const value2 = ref('node2-1');

const cacheData = [{ value: 'node2-1', label: 'lazy load node2-1' }];

const defaultTreeData = ref([
  {
    value: 'node1',
    label: 'node1',
    disabled: true,
    children: [
      {
        value: 'node2',
        label: 'node2',
      },
    ],
  },
  {
    value: 'node3',
    label: 'node3',
    children: [
      {
        value: 'node4',
        label: 'node4',
        isLeaf: true,
      },
      {
        value: 'node5',
        label: 'node5',
        isLeaf: true,
      },
    ],
  },
]);

const loadMore = (nodeData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      nodeData.children = Array.from({ length: (Math.random() * 10 + 2) >>> 0 })
        .fill(0)
        .map((_, i) => {
          const n = i + 1;
          return {
            label: `${nodeData.label}-${n}`,
            value: `${nodeData.value}-${n}`,
            isLeaf: Math.random() > 0.6,
          };
        });
      resolve('');
    }, 1000);
  });
};
</script>
