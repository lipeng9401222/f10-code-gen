<template>
  <e-button v-popover="popoverRef" v-click-outside="onClickOutside">Click me</e-button>

  <e-popover ref="popoverRef" trigger="click" title="With title" virtual-triggering persistent>
    <span> Some content </span>
  </e-popover>
</template>

<script setup lang="ts">
import { ref, unref } from 'vue';
import { ClickOutside as vClickOutside } from '@epoint-fe/eui-components';
const buttonRef = ref();
const popoverRef = ref();
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.();
};
</script>
