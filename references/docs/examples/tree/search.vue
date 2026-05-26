<template>
  <e-tree :data="originTreeData" show-filter />
</template>

<script lang="ts" setup>
const originTreeData = [
  {
    label: 'Trunk 0-0',
    value: '0-0',
    children: [
      {
        label: 'Branch 0-0-1',
        value: '0-0-1',
        children: [
          {
            label: 'Leaf 0-0-1-1',
            value: '0-0-1-1',
          },
          {
            label: 'Leaf 0-0-1-2',
            value: '0-0-1-2',
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
            label: 'Leaf 0-1-1-0',
            value: '0-1-1-0',
          },
        ],
      },
      {
        label: 'Branch 0-1-2',
        value: '0-1-2',
        children: [
          {
            label: 'Leaf 0-1-2-0',
            value: '0-1-2-0',
          },
        ],
      },
    ],
  },
];
</script>
