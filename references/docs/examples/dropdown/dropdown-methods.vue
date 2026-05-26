<template>
  <div style="font-size: 14px">
    <p>右键打开（关闭）下拉菜单2将关闭（打开）下拉菜单1。</p>
  </div>
  <div style="margin: 15px">
    <e-button @click="showClick">show</e-button>
  </div>
  <e-dropdown ref="dropdown1" trigger="contextmenu" style="margin-right: 30px">
    <span class="e-dropdown-link"> Dropdown List1 </span>
    <template #dropdown>
      <e-dropdown-menu>
        <e-dropdown-item>Action 1</e-dropdown-item>
        <e-dropdown-item>Action 2</e-dropdown-item>
        <e-dropdown-item>Action 3</e-dropdown-item>
        <e-dropdown-item disabled>Action 4</e-dropdown-item>
        <e-dropdown-item divided>Action 5</e-dropdown-item>
      </e-dropdown-menu>
    </template>
  </e-dropdown>

  <e-dropdown trigger="contextmenu" @visible-change="handleVisible2">
    <span class="e-dropdown-link"> Dropdown List2 </span>
    <template #dropdown>
      <e-dropdown-menu>
        <e-dropdown-item>Action 1</e-dropdown-item>
        <e-dropdown-item>Action 2</e-dropdown-item>
        <e-dropdown-item>Action 3</e-dropdown-item>
        <e-dropdown-item disabled>Action 4</e-dropdown-item>
        <e-dropdown-item divided>Action 5</e-dropdown-item>
      </e-dropdown-menu>
    </template>
  </e-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { DropdownInstance } from '@epoint-fe/eui-components';

const dropdown1 = ref<DropdownInstance>();
function handleVisible2(visible: any) {
  if (!dropdown1.value) return;
  if (visible) {
    dropdown1.value.handleClose();
  } else {
    dropdown1.value.handleOpen();
  }
}
function showClick() {
  if (!dropdown1.value) return;
  dropdown1.value.handleOpen();
}
</script>
<style scoped>
.example-showcase .e-dropdown-link {
  cursor: pointer;
  color: var(--e-color-primary);
  display: flex;
  align-items: center;
}
</style>
