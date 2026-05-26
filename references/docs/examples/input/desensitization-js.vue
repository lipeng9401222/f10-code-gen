<template>
  <e-form label-width="120px">
    <e-form-item label="手机号">
      <e-input v-model="input" placeholder="Please input" desensitization-type="MOBILE_PHONE" />
    </e-form-item>

    <e-form-item label="身份证号">
      <e-input v-model="input2" placeholder="Please input" desensitization-type="ID_CARD" />
    </e-form-item>

    <e-button type="primary" @click="getInputValue">获取输入值</e-button>
  </e-form>
</template>

<script setup>
import { ref } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';

const input = ref('17215683972');
const input2 = ref('612300190001010000');

const getInputValue = () => {
  EMessage.success(`手机号:${input.value}`);
  EMessage.success(`身份证号:${input2.value}`);
};
</script>
