<template>
  <div class="demo-input-number">
    <p>使用千分位分隔符展示：</p>
    <e-input-number
      v-model="value1"
      :formatter="(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
      :parser="(value) => value.replace(/,/g, '')"
      :min="0"
    />
    <p>添加前缀：</p>
    <e-input-number
      v-model="value2"
      :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
      :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
      :min="0"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const value1 = ref(10000);
const value2 = ref(100);
</script>
