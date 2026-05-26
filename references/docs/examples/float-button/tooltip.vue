<template>
  <div class="float-button-container">
    <e-float-button class="float-button" :tooltip="tooltip" :icon="ChatDotRound" />
  </div>
</template>
<script setup>
import { reactive } from 'vue';
import { ChatDotRound, Edit } from '@epoint-fe/eui-icons';
import EFloatButton from '@eui-components/components/float-button';

const tooltip = reactive({
  content: '这是一个悬浮按钮',
  placement: 'right',
  effect: 'light',
});
</script>
<style lang="scss" scoped>
.float-button-container {
  height: 150px;
  position: relative;

  .float-button {
    position: absolute;
  }
}
</style>
