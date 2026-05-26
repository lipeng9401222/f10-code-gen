<template>
  <div class="demo-color-palette">
    <div class="demo-color-block">
      <span class="demonstration">With default value</span>
      <e-color-palette v-model="color1" />
    </div>
    <div class="demo-color-block">
      <span class="demonstration">With no default value</span>
      <e-color-palette v-model="color2" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const color1 = ref('#409EFF');
const color2 = ref();
</script>

<style lang="scss" scoped>
.demo-color {
  &-palette {
    display: flex;
  }
  &-block {
    flex: 1;
    width: 0;
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    .demonstration {
      display: block;
      margin-bottom: 10px;
    }
  }
}
</style>
