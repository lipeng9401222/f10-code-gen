<template>
  <e-form label-width="120px">
    <e-form-item label="自定义脱敏">
      <e-input
        v-model="input"
        placeholder="Please input"
        :desensitization-type="DESENDATATYPE_CUSTOM"
        :desensitizer="desensitizer"
      />
    </e-form-item>
    <e-button type="primary" @click="getInputValue">获取输入值</e-button>
  </e-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { DESENDATATYPE_CUSTOM, EMessage } from '@epoint-fe/eui-components';

const input = ref('epoint@epoint.com.cn');

const desensitizer = (val) => {
  const index = val.indexOf('@');
  return `****${val.slice(index)}`;
};

const getInputValue = () => {
  EMessage(`输入框值：${input.value}`);
};
</script>
