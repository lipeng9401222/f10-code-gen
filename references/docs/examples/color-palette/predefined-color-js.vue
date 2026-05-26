<template>
  <e-radio-group v-model="paletteType" @change="paletteTypeChange">
    <e-radio value="1" size="large">默认</e-radio>
    <e-radio value="2" size="large">自定义-一行</e-radio>
    <e-radio value="3" size="large">自定义-多行</e-radio>
  </e-radio-group>
  <e-color-palette v-model="color" :predefine="predefineColors" show-alpha enable-predefine />
</template>

<script setup>
import { ref } from 'vue';

const paletteType = ref('1');
const color = ref('rgba(255, 69, 0, 0.68)');
const predefineColors = ref();

const paletteTypeChange = (val) => {
  switch (val) {
    case '1':
      predefineColors.value = undefined;
      break;
    case '2':
      predefineColors.value = ['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585'];
      break;
    case '3':
      predefineColors.value = [
        ['#B71C1C', '#C62828', '#D32F2F', '#E53935', '#F44336', '#EF5350', '#E57373', '#EF9A9A'],
        ['#F57F17', '#F9A825', '#FBC02D'],
        ['#004D40', '#00695C', '#00796B', '#00897B', '#009688', '#26A69A'],
      ];
      break;
    default:
      break;
  }
};
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
    .demonstration {
      display: block;
      margin-bottom: 10px;
    }
  }
}
</style>
