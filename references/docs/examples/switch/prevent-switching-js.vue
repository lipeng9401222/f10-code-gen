<template>
  <e-switch v-model="value1" :loading="loading1" :before-change="beforeChange1" />
  <e-switch v-model="value2" class="ml-2" :loading="loading2" :before-change="beforeChange2" />
</template>
<script setup>
import { ref } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';

const value1 = ref(false);
const value2 = ref(false);
const loading1 = ref(false);
const loading2 = ref(false);

const beforeChange1 = () => {
  loading1.value = true;
  return new Promise((resolve) => {
    setTimeout(() => {
      loading1.value = false;
      EMessage.success('Switch success');
      return resolve(true);
    }, 1000);
  });
};

const beforeChange2 = () => {
  loading2.value = true;
  return new Promise((_, reject) => {
    setTimeout(() => {
      loading2.value = false;
      EMessage.error('Switch failed');
      return reject(new Error('Error'));
    }, 1000);
  });
};
</script>
