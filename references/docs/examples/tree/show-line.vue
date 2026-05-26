<template>
  <div>
    <span>showLine</span>
    <e-switch v-model="showLine" style="margin-left: 12px" />
  </div>
  <e-tree :default-selected-keys="['0-0-1']" :data="treeData" :show-line="showLine" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const showLine = ref(true);

const treeData = [
  {
    label: 'Trunk 1',
    value: '0-0',
    children: [
      {
        label: 'Trunk 1-0',
        value: '0-0-0',
        children: [
          { label: 'leaf', value: '0-0-0-0' },
          {
            label: 'leaf',
            value: '0-0-0-1',
            children: [{ label: 'leaf', value: '0-0-0-1-0' }],
          },
          { label: 'leaf', value: '0-0-0-2' },
        ],
      },
      {
        label: 'Trunk 1-1',
        value: '0-0-1',
      },
      {
        label: 'Trunk 1-2',
        value: '0-0-2',
        children: [
          { label: 'leaf', value: '0-0-2-0' },
          {
            label: 'leaf',
            value: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Trunk 2',
    value: '0-1',
  },
  {
    label: 'Trunk 3',
    value: '0-2',
    children: [
      {
        label: 'Trunk 3-0',
        value: '0-2-0',
        children: [
          { label: 'leaf', value: '0-2-0-0' },
          { label: 'leaf', value: '0-2-0-1' },
        ],
      },
    ],
  },
];
</script>
