<template>
  <e-switch v-model="open" />
  <div class="float-button-group-container">
    <e-float-button-group class="float-button-group-inner" :open="open" shape="square" trigger="hover" :icon="ArrowUp">
      <e-float-button :icon="ChatDotRound" />
      <e-float-button :icon="Edit" />
      <e-float-button :icon="Setting" />
    </e-float-button-group>
    <e-float-button-group
      class="float-button-group-inner"
      :open="open"
      trigger="click"
      :icon="ArrowUp"
      :style="{ right: '100px' }"
    >
      <e-float-button :icon="ChatDotRound" />
      <e-float-button :icon="Edit" />
      <e-float-button :icon="Setting" />
    </e-float-button-group>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { ArrowUp, ChatDotRound, Edit, Setting } from '@epoint-fe/eui-icons';
import EFloatButton, { EFloatButtonGroup } from '@eui-components/components/float-button';
const open = ref(true);
</script>
<style lang="scss" scoped>
.float-button-group-container {
  height: 300px;
  position: relative;

  .float-button-group-inner {
    position: absolute;
  }
}
</style>
