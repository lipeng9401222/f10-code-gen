<template>
  <div class="float-button-container">
    <e-float-button class="float-button" :icon="ChatDotRound" />
    <e-float-button class="float-button" :icon="Edit" disabled :style="{ right: '100px' }" />
  </div>
</template>
<script setup>
import { ChatDotRound, Edit } from '@epoint-fe/eui-icons';
import EFloatButton from '@eui-components/components/float-button';
</script>
<style lang="scss" scoped>
.float-button-container {
  position: relative;
  height: 200px;

  .float-button {
    position: absolute;
  }
}
</style>
