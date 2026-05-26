<template>
  <e-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <e-radio-button :value="false">expand</e-radio-button>
    <e-radio-button :value="true">collapse</e-radio-button>
  </e-radio-group>
  <e-menu
    default-active="2"
    class="e-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <e-sub-menu index="1">
      <template #title>
        <e-icon><location /></e-icon>
        <span>Navigator One</span>
      </template>
      <e-menu-item-group>
        <template #title><span>Group One</span></template>
        <e-menu-item index="1-1">菜单1</e-menu-item>
        <e-menu-item index="1-2">菜单2</e-menu-item>
      </e-menu-item-group>
      <e-menu-item-group title="Group Two">
        <e-menu-item index="1-3">菜单3</e-menu-item>
      </e-menu-item-group>
      <e-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <e-menu-item index="1-4-1">菜单1</e-menu-item>
      </e-sub-menu>
    </e-sub-menu>
    <e-menu-item index="2">
      <e-icon><icon-menu /></e-icon>
      <template #title>Navigator Two</template>
    </e-menu-item>
    <e-menu-item index="3" disabled>
      <e-icon><document /></e-icon>
      <template #title>Navigator Three</template>
    </e-menu-item>
    <e-menu-item index="4">
      <e-icon><setting /></e-icon>
      <template #title>Navigator Four</template>
    </e-menu-item>
  </e-menu>
</template>

<script setup>
import { ref } from 'vue';
import { Document, Menu as IconMenu, Location, Setting } from '@epoint-fe/eui-icons';

const isCollapse = ref(true);
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>

<style scoped>
.e-menu-vertical-demo:not(.e-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
