<template>
  <e-button type="primary" :style="{ marginBottom: '20px' }" @click="scrollIntoView">
    Scroll to 0-0-2-2, i.e. the 26th.
  </e-button>
  <e-tree
    ref="treeRef"
    block-node
    checkable
    multiple
    :data="treeData"
    :virtual-list-props="{
      height: 200,
    }"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { TreeNodeData } from '@epoint-fe/eui-components';

const treeRef = ref();
const treeData = loop();

const scrollIntoView = () => {
  treeRef.value && treeRef.value.scrollIntoView({ key: '0-0-2-2' });
};

function loop(path = '0', level = 2) {
  const list: TreeNodeData[] = [];
  for (let i = 0; i < 10; i += 1) {
    const key = `${path}-${i}`;
    const treeNode: TreeNodeData = {
      label: key,
      value: key,
    };

    if (level > 0) {
      treeNode.children = loop(key, level - 1);
    }

    list.push(treeNode);
  }
  return list;
}
</script>
