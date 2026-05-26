<template>
  <div class="float-button-group-wrapper">
    <div class="content">
      <e-float-button-group
        v-for="(config, index) in configs"
        :key="index"
        trigger="click"
        class="float-button-group-inner"
        :style="getStyle(config)"
        :placement="config.placement"
        :icon="config.icon"
      >
        <e-float-button :icon="ChatDotRound" />
        <e-float-button :icon="Edit" />
        <e-float-button :icon="Setting" />
      </e-float-button-group>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ChatDotRound, Edit, Setting } from '@epoint-fe/eui-icons';
import EFloatButton, { EFloatButtonGroup } from '@eui-components/components/float-button';

const configs = ref([
  {
    left: '0',
    bottom: '0',
    placement: 'bottom',
    icon: ArrowUp,
  },
  {
    left: '42px',
    top: '0',
    right: 'auto',
    placement: 'left',
    icon: ArrowRight,
  },
  {
    left: '0',
    top: '42px',
    bottom: 'auto',
    placement: 'top',
    icon: ArrowDown,
  },
  {
    right: '0',
    top: '0',
    placement: 'right',
    icon: ArrowLeft,
  },
]);

const getStyle = (config) => {
  const { placement, ...style } = config;
  return style;
};
</script>
<style lang="scss" scoped>
.float-button-group-wrapper {
  position: relative;
  height: 500px;
  .content {
    position: absolute;
    left: 50%;
    top: 50%;

    .float-button-group-inner {
      position: absolute;
    }
  }
}
</style>
