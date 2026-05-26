<template>
  <div>
    <p>水平排列（默认）：</p>
    <e-radio-group v-model="radio1">
      <e-radio :value="1">选项 A</e-radio>
      <e-radio :value="2">选项 B</e-radio>
      <e-radio :value="3">选项 C</e-radio>
    </e-radio-group>

    <p>垂直排列：</p>
    <e-radio-group v-model="radio2" direction="vertical">
      <e-radio :value="1">选项 A</e-radio>
      <e-radio :value="2">选项 B</e-radio>
      <e-radio :value="3">选项 C</e-radio>
    </e-radio-group>
  </div>
</template>

<script lang="js" setup>
import { ref } from 'vue';

const radio1 = ref(1);
const radio2 = ref(1);
</script>
