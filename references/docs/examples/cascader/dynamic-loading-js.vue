<template>
  <e-cascader v-model="value" :props="props" />
</template>

<script setup>
import { ref } from 'vue';
import { CascaderProps } from '@epoint-fe/eui-components';
const value = ref([]);
let id = 0;
const props = {
  lazy: true,
  loadMore(node, resolve) {
    const { level } = node;
    setTimeout(() => {
      const nodes = Array.from({ length: level + 1 }).map((item, i) => ({
        value: ++id,
        label: `Option - ${level} - ${i + 1}`,
        isLeaf: level >= 2,
      }));
      // Invoke `resolve` callback to return the child nodes data and indicate the loading is finished.
      resolve(nodes);
    }, 1000);
  },
};
</script>
