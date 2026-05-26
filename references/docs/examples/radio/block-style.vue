<template>
  <div>
    <p>普通按钮组：</p>
    <e-radio-group v-model="radio1">
      <e-radio-button label="上海" value="Shanghai" />
      <e-radio-button label="北京" value="Beijing" />
      <e-radio-button label="广州" value="Guangzhou" />
      <e-radio-button label="深圳" value="Shenzhen" />
    </e-radio-group>

    <p>块级按钮组（宽度充满父容器）：</p>
    <e-radio-group v-model="radio2" block>
      <e-radio-button label="上海" value="Shanghai" />
      <e-radio-button label="北京" value="Beijing" />
      <e-radio-button label="广州" value="Guangzhou" />
      <e-radio-button label="深圳" value="Shenzhen" />
    </e-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radio1 = ref('Shanghai');
const radio2 = ref('Shanghai');
</script>
