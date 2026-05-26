<template>
  <e-checkbox
    v-model="multiple"
    @change="
      () => {
        selectedKeys = [];
      }
    "
  >
    multiple
  </e-checkbox>
  <p>Current: {{ selectedKeys?.join(' , ') }}</p>
  <e-tree v-model:selected-keys="selectedKeys" :multiple="multiple" :data="treeData" />
</template>

<script setup>
import { ref } from 'vue';

const selectedKeys = ref([]);
const multiple = ref(true);
const treeData = [
  {
    label: 'Trunk 0-0',
    value: '0-0',
    children: [
      {
        label: 'Leaf',
        value: '0-0-1',
      },
      {
        label: 'Branch 0-0-2',
        value: '0-0-2',
        children: [
          {
            label: 'Leaf',
            value: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Trunk 0-1',
    value: '0-1',
    children: [
      {
        label: 'Branch 0-1-1',
        value: '0-1-1',
        children: [
          {
            label: 'Leaf',
            value: '0-1-1-1',
          },
          {
            label: 'Leaf',
            value: '0-1-1-2',
          },
        ],
      },
      {
        label: 'Leaf',
        value: '0-1-2',
      },
    ],
  },
];
</script>
