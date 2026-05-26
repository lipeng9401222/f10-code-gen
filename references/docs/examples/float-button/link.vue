<template>
  <div class="float-button-container">
    <e-float-button href="https://www.baidu.com" target="_blank" class="float-button" :icon="ShareFilled" />
  </div>
</template>
<script setup>
import { ShareFilled } from '@epoint-fe/eui-icons';
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
