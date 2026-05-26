<template>
  <div class="demo-color-block">
    <span class="demonstration">默认</span>
    <e-color-picker v-model="color1" show-alpha enable-predefine />
  </div>
  <div class="demo-color-block">
    <span class="demonstration">自定义-一行</span>
    <e-color-picker v-model="color2" show-alpha enable-predefine :predefine="predefineColors1" />
  </div>
  <div class="demo-color-block">
    <span class="demonstration">自定义-多行</span>
    <e-color-picker v-model="color2" show-alpha enable-predefine :predefine="predefineColors2" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const color1 = ref('rgba(255, 69, 0, 0.68)');
const color2 = ref('rgba(19, 206, 102, 0.8)');
const predefineColors1 = ref(['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585']);
const predefineColors2 = ref([
  ['#B71C1C', '#C62828', '#D32F2F', '#E53935', '#F44336', '#EF5350', '#E57373', '#EF9A9A'],
  ['#F57F17', '#F9A825', '#FBC02D'],
  ['#004D40', '#00695C', '#00796B', '#00897B', '#009688', '#26A69A'],
]);
</script>
