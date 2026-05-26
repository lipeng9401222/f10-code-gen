<template>
  <e-row class="tac">
    <e-col :span="12">
      <h5 class="mb-2">Default colors</h5>
      <e-menu default-active="2" class="e-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <e-sub-menu index="1">
          <template #title>
            <e-icon><location /></e-icon>
            <span>Navigator One</span>
          </template>
          <e-menu-item-group title="Group One">
            <e-menu-item index="1-1">菜单1</e-menu-item>
            <e-menu-item index="1-2">菜单2</e-menu-item>
          </e-menu-item-group>
          <e-menu-item-group title="Group Two">
            <e-menu-item index="1-3">菜单3</e-menu-item>
          </e-menu-item-group>
          <e-sub-menu index="1-4">
            <template #title>item four</template>
            <e-menu-item index="1-4-1">菜单1</e-menu-item>
          </e-sub-menu>
        </e-sub-menu>
        <e-menu-item index="2">
          <e-icon><icon-menu /></e-icon>
          <span>Navigator Two</span>
        </e-menu-item>
        <e-menu-item index="3" disabled>
          <e-icon><document /></e-icon>
          <span>Navigator Three</span>
        </e-menu-item>
        <e-menu-item index="4">
          <e-icon><setting /></e-icon>
          <span>Navigator Four</span>
        </e-menu-item>
      </e-menu>
    </e-col>
    <e-col :span="12">
      <h5 class="mb-2">Custom colors</h5>
      <e-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="e-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <e-sub-menu index="1">
          <template #title>
            <e-icon><location /></e-icon>
            <span>Navigator One</span>
          </template>
          <e-menu-item-group title="Group One">
            <e-menu-item index="1-1">菜单1</e-menu-item>
            <e-menu-item index="1-2">菜单2</e-menu-item>
          </e-menu-item-group>
          <e-menu-item-group title="Group Two">
            <e-menu-item index="1-3">菜单3</e-menu-item>
          </e-menu-item-group>
          <e-sub-menu index="1-4">
            <template #title>item four</template>
            <e-menu-item index="1-4-1">菜单1</e-menu-item>
          </e-sub-menu>
        </e-sub-menu>
        <e-menu-item index="2">
          <e-icon><icon-menu /></e-icon>
          <span>Navigator Two</span>
        </e-menu-item>
        <e-menu-item index="3" disabled>
          <e-icon><document /></e-icon>
          <span>Navigator Three</span>
        </e-menu-item>
        <e-menu-item index="4">
          <e-icon><setting /></e-icon>
          <span>Navigator Four</span>
        </e-menu-item>
      </e-menu>
    </e-col>
  </e-row>
</template>

<script lang="ts" setup>
import { Document, Menu as IconMenu, Location, Setting } from '@epoint-fe/eui-icons';
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>
