<template>
  <e-button type="primary" @click="reload">刷新选项卡</e-button>
  <e-tabs ref="tabs" v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <e-tab-pane
      ref="firstRef"
      label="EUI-Vue"
      name="first"
      url="http://192.168.219.170/docs/vue/latest/component/component/button.html"
      @load="onload"
    />
    <e-tab-pane
      class="second"
      label="EUI-F9"
      url="http://192.168.219.170/showcase/eui3/components/"
      lazy
      @load="onload"
    />
  </e-tabs>
</template>
<script setup>
import { onMounted, ref } from 'vue';

const activeName = ref('first');

const firstRef = ref();

let curtTab;

const handleClick = (tab, event) => {
  curtTab = tab;
};

const onload = (pane) => {
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
