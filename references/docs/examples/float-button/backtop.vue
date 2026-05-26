<template>
  <div class="float-button-group-container">
    <e-float-button-group class="float-button-group-inner" shape="square">
      <e-backtop />
      <e-float-button :icon="ChatDotRound" />
      <e-float-button :icon="Edit" />
      <e-float-button :icon="Setting" />
    </e-float-button-group>
    <e-float-button-group class="float-button-group-inner" :style="{ right: '100px' }">
      <e-backtop />
      <e-float-button :icon="ChatDotRound" />
      <e-float-button :icon="Edit" />
      <e-float-button :icon="Setting" />
    </e-float-button-group>
  </div>
</template>
<script setup>
import { ChatDotRound, Edit, Setting } from '@epoint-fe/eui-icons';
import EFloatButton, { EFloatButtonGroup } from '@eui-components/components/float-button';
</script>
<style lang="scss" scoped>
.float-button-group-container {
  height: 280px;
  position: relative;

  .float-button-group-inner {
    position: absolute;
  }
}
</style>
