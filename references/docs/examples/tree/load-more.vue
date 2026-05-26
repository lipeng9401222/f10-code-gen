<template>
  <e-tree :data="treeData" :load-more="loadMore" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const treeData = ref([
  {
    label: 'Trunk 0-0',
    value: '0-0',
    isLeaf: false,
  },
  {
    label: 'Trunk 0-1',
    value: '0-1',
    children: [
      {
        label: 'Branch 0-1-1',
        value: '0-1-1',
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
