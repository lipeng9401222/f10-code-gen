<template>
  <div class="float-button-container">
    <e-float-button class="float-button" :icon="ChatDotRound" />
    <e-float-button class="float-button" shape="square" type="primary" :icon="Edit" :style="{ right: '100px' }" />
  </div>
</template>
<script setup>
import { ChatDotRound, Edit } from '@epoint-fe/eui-icons';
import EFloatButton from '@eui-components/components/float-button';
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
