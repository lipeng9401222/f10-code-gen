<template>
  <e-checkbox
    v-model="multiple"
    @change="
      () => {
        checkedKeys = [];
      }
    "
  >
    multiple
  </e-checkbox>
  <p>checkedKeys:{{ checkedKeys.join(',') }}</p>
  <e-tree v-model:checked-keys="checkedKeys" :checkable="true" :multiple="multiple" :data="treeData" />
</template>

<script setup>
import { ref } from 'vue';
const checkedKeys = ref(['0-0']);
const multiple = ref(false);

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
        disabled: true,
        children: [
          {
            label: 'Leaf',
            value: '0-0-2-1',
          },
          {
            label: 'Leaf',
            value: '0-0-2-2',
            disableCheckbox: true,
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
            label: 'Leaf ',
            value: '0-1-1-1',
          },
          {
            label: 'Leaf ',
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
