<template>
  <div class="float-button-group-container">
    <e-float-button-group
      class="float-button-group-inner"
      shape="square"
      trigger="hover"
      :icon="ArrowUp"
      description="展开"
      close-description="关闭"
    >
      <e-float-button :icon="ChatDotRound" description="客服" />
      <e-float-button :icon="Edit" description="编辑" />
      <e-float-button :icon="Setting" description="设置" />
    </e-float-button-group>
    <e-float-button-group
      class="float-button-group-inner"
      trigger="click"
      :icon="ArrowUp"
      description="展开"
      close-description="关闭"
      :style="{ right: '100px' }"
    >
      <e-float-button :icon="ChatDotRound" description="客服" />
      <e-float-button :icon="Edit" description="编辑" />
      <e-float-button :icon="Setting" description="设置" />
    </e-float-button-group>
  </div>
</template>
<script setup>
import { ArrowUp, ChatDotRound, Edit, Setting } from '@epoint-fe/eui-icons';
import EFloatButton, { EFloatButtonGroup } from '@eui-components/components/float-button';
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
