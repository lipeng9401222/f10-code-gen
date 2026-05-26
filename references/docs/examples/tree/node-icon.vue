<template>
  <e-switch v-model="showIcon" style="margin-left: 12px" active-text="显示节点图标" inactive-text="隐藏节点图标" />
  <e-tree
    checkable
    multiple
    :data="treeData"
    :default-expanded-keys="['0-0-0']"
    :default-selected-keys="['0-0-0', '0-0-1']"
    :show-icon="showIcon"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const showIcon = ref(true);
const treeData = [
  {
    label: 'Trunk 0-0',
    value: '0-0',
    children: [
      {
        label: 'Branch 0-0-0',
        value: '0-0-0',
        disabled: true,
        children: [
          {
            label: 'Leaf',
            value: '0-0-0-0',
          },
          {
            label: 'Leaf',
            value: '0-0-0-1',
          },
        ],
      },
      {
        label: 'Branch 0-0-1',
        value: '0-0-1',
        children: [
          {
            label: 'Leaf',
            value: '0-0-1-0',
          },
        ],
      },
    ],
  },
];
</script>
