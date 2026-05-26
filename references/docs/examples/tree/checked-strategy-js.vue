<template>
  <e-radio-group
    v-model="checkedStrategy"
    type="button"
    @change="
      (value) => {
        checkedKeys = [];
      }
    "
  >
    <e-radio v-for="item in strategyOptions" :key="item?.value" :value="item?.value">
      {{ item?.label }}
    </e-radio>
  </e-radio-group>
  <p>Current: {{ checkedKeys?.join(' , ') }}</p>
  <e-tree
    v-model:checked-keys="checkedKeys"
    :checkable="true"
    :multiple="true"
    :checked-strategy="checkedStrategy"
    :data="treeData"
  />
</template>

<script setup>
import { ref } from 'vue';

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

const strategyOptions = [
  {
    value: 'all',
    label: 'show all',
  },
  {
    value: 'parent',
    label: 'show parent',
  },
  {
    value: 'child',
    label: 'show child',
  },
];

const checkedKeys = ref([]);
const checkedStrategy = ref('all');
</script>
