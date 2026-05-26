<template>
  <div class="flex justify-between items-center flex-wrap">
    <div v-for="(shadow, i) in shadowGroup" :key="i" class="flex flex-col justify-center items-center" m="auto" w="46">
      <div
        class="inline-flex"
        h="30"
        w="30"
        m="2"
        :style="{
          boxShadow: `var(${getCssVarName(shadow.type)})`,
        }"
      />
      <span p="y-4" class="demo-shadow-text" text="sm">
        {{ shadow.name }}
      </span>
      <code text="xs">
        {{ getCssVarName(shadow.type) }}
      </code>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const shadowGroup = ref([
  {
    name: '元件，卡片元素',
    type: 's',
  },
  {
    name: '下拉菜单',
    type: 'm',
  },
  {
    name: '弹窗',
    type: 'l',
  },
  {
    name: '客户端窗体',
    type: 'xl',
  },
]);

const getCssVarName = (type) => {
  return `--e-box-shadow${type ? '-' : ''}${type}`;
};
</script>
