<template>
  <e-menu :default-active="activeIndex" class="e-menu-demo" mode="horizontal" @select="handleSelect">
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
    <e-menu-item index="3" disabled>禁用的菜单</e-menu-item>
    <e-menu-item index="4">其他菜单</e-menu-item>
  </e-menu>
  <div class="h-6" />
  <e-menu
    :default-active="activeIndex2"
    class="e-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleSelect"
  >
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
    <e-menu-item index="3" disabled>禁用的菜单</e-menu-item>
    <e-menu-item index="4">其他菜单</e-menu-item>
  </e-menu>
  <div class="h-6" />
  <e-menu :default-active="activeIndex" class="e-menu-demo" mode="horizontal" is-round @select="handleSelect">
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
    <e-menu-item index="3" disabled>禁用的菜单</e-menu-item>
    <e-menu-item index="4">其他菜单</e-menu-item>
  </e-menu>
  <div class="h-6" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeIndex = ref('1');
const activeIndex2 = ref('1');
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>
