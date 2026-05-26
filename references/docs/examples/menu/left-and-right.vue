<template>
  <e-menu :default-active="activeIndex" class="e-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
    <e-menu-item index="0">LOGO</e-menu-item>
    <div class="flex-grow" />
    <e-menu-item index="1">数据处理中心</e-menu-item>
    <e-sub-menu index="2">
      <template #title>工作台</template>
      <e-menu-item index="2-1">菜单1</e-menu-item>
      <e-menu-item index="2-2">菜单2</e-menu-item>
      <e-menu-item index="2-3">菜单3</e-menu-item>
      <e-sub-menu index="2-4">
        <template #title>item four</template>
        <e-menu-item index="2-4-1">菜单1</e-menu-item>
        <e-menu-item index="2-4-2">菜单2</e-menu-item>
        <e-menu-item index="2-4-3">菜单3</e-menu-item>
      </e-sub-menu>
    </e-sub-menu>
  </e-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeIndex = ref('1');
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
