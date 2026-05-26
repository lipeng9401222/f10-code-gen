<template>
  <div>
    <p>
      整个文本框的值： <span>{{ value }}</span>
    </p>
    <e-mention v-model="value" :options="options" style="width: 320px" placeholder="Please input" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const value = ref('@');

const options = ref([
  {
    label: '张三',
    value: '张三',
  },
  {
    label: '李四',
    value: '张三',
  },
  {
    label: '王五',
    value: '张三',
  },
  {
    label: 'btea',
    value: 'btea',
  },
]);
</script>
