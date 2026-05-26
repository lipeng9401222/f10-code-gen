<template>
  <e-button type="primary" @click="reload">刷新选项卡</e-button>
  <e-tabs ref="tabs" v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <e-tab-pane
      ref="firstRef"
      label="EUI-Vue"
      name="first"
      url="http://192.168.219.170/showcase/eui3/components/"
      lazy
      @load="onload"
    />
    <e-tab-pane
      class="second"
      label="EUI-F9"
      name="second"
      url="http://192.168.219.170/docs/vue/latest/component/component/button.html"
      @load="onload"
    />
  </e-tabs>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { TabsPaneContext } from '@epoint-fe/eui-vue';

const activeName = ref('first');

const firstRef = ref();

let curtTab: TabsPaneContext | null;

const handleClick = (tab: TabsPaneContext, event: Event) => {
  curtTab = tab;
};

const onload = (pane: TabsPaneContext) => {
  console.log(pane);
};

const reload = () => {
  curtTab ? curtTab?.reload() : firstRef.value?.reload;
};
</script>
<style lang="scss">
.demo-tabs > .e-tabs__content {
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;

  .e-tab-pane {
    height: 500px;
  }
}
</style>
