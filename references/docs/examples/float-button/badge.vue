<template>
  <div class="float-button-container">
    <e-float-button class="float-button" :icon="ChatDotRound" :badge="{ isDot: true }" />
    <e-float-button
      class="float-button"
      :icon="ChatDotRound"
      :badge="{ value: 10, type: 'primary' }"
      :style="{ right: '100px' }"
      shape="square"
    />
    <e-float-button-group class="float-button-group" :style="{ right: '180px' }">
      <e-float-button :icon="ChatDotRound" :badge="{ value: 10 }" />
      <e-float-button :icon="ChatDotRound" :badge="{ value: 10, type: 'primary' }" />
    </e-float-button-group>
    <e-float-button-group
      class="float-button-group"
      :style="{ right: '260px' }"
      :icon="ArrowUp"
      :badge="{ value: 'new' }"
      trigger="click"
      open
    >
      <e-float-button :icon="ChatDotRound" :badge="{ value: 10, type: 'primary' }" />
      <e-float-button :icon="ChatDotRound" :badge="{ value: 10, type: 'primary' }" />
    </e-float-button-group>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
import { ArrowUp, ChatDotRound } from '@epoint-fe/eui-icons';
import EFloatButton, { EFloatButtonGroup } from '@eui-components/components/float-button';

const badge = reactive({ value: 10 });
</script>
<style lang="scss" scoped>
.float-button-container {
  position: relative;
  height: 250px;

  .float-button {
    position: absolute;
  }

  .float-button-group {
    position: absolute;
  }
}
</style>
