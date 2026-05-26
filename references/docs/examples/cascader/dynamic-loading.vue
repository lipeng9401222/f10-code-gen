<template>
  <e-cascader v-model="value" :props="props" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { CascaderProps } from '@epoint-fe/eui-components';
const value = ref([]);
let id = 0;
const props: CascaderProps = {
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
