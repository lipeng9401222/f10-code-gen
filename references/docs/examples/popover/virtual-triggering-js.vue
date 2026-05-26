<template>
  <e-button ref="buttonRef" v-click-outside="onClickOutside">Click me</e-button>

  <e-popover ref="popoverRef" :virtual-ref="buttonRef" trigger="click" title="With title" virtual-triggering>
    <span> Some content </span>
  </e-popover>
</template>

<script setup>
import { ref, unref } from 'vue';
import { ClickOutside as vClickOutside } from '@epoint-fe/eui-components';
const buttonRef = ref();
const popoverRef = ref();
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.();
};
</script>
