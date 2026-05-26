<template>
  <e-tree :data="treeData" show-line>
    <template #switcher-icon="node, { isLeaf }">
      <ArrowDownBold v-if="!isLeaf" />
      <Star v-if="isLeaf" />
    </template>
  </e-tree>
</template>

<script setup>
import { h } from 'vue';
import { ArrowDownBold, Notebook, Star } from '@epoint-fe/eui-icons';

const treeData = [
  {
    label: 'Trunk',
    value: 'node1',
    children: [
      {
        label: 'Leaf',
        value: 'node2',
      },
    ],
  },
  {
    label: 'Trunk',
    value: 'node3',
    children: [
      {
        label: 'Leaf',
        value: 'node4',
        switcherIcon: () => h(Notebook),
      },
      {
        label: 'Leaf',
        value: 'node5',
        switcherIcon: () => h(Notebook),
      },
    ],
  },
];
</script>
