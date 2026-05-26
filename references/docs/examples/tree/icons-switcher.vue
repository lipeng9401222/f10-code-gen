<template>
  <!-- <div>定制 switcher 图标</div> -->
  <e-tree :data="treeData" :show-line="false" :checkable="true" :multiple="true">
    <template #switcher-icon="{ isLeaf, expanded }">
      <!-- 定制 switcher 图标 -->
      <Plus v-if="!isLeaf && !expanded" />
      <Minus v-if="!isLeaf && expanded" />
      <Star v-if="isLeaf" />
    </template>
  </e-tree>
  <hr />
  <e-tree :data="treeData" :show-line="true" :checkable="true" :multiple="true">
    <template #switcher-icon="{ isLeaf, expanded }">
      <!-- 定制 switcher 图标 -->
      <Plus v-if="!isLeaf && !expanded" />
      <Minus v-if="!isLeaf && expanded" />
      <Star v-if="isLeaf" />
    </template>
  </e-tree>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { Camera, Minus, Notebook, Plus, Star } from '@epoint-fe/eui-icons';

const treeData = [
  {
    label: '父节点1',
    value: 'node1',
    children: [
      {
        label: 'Leaf',
        value: 'node2',
      },
    ],
  },
  {
    label: '父节点2',
    value: 'node3',
    children: [
      {
        label: '叶子节点switcher显示为笔记本',
        value: 'node4',
        switcherIcon: () => h(Notebook),
      },
      {
        label: '叶子节点switcher显示为照相机',
        value: 'node5',
        switcherIcon: () => h(Camera),
      },

      {
        label: '叶子节点没有定义，显示为树配置的星星',
        value: 'node6',
      },
    ],
  },
];
</script>
