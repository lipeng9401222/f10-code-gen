<template>
  <e-verify-code
    captcha-type="textclick"
    action="https://fe.epoint.com.cn/mock/752/eui-vue/initAndCheckCaptcha"
    @validate="onValidate"
  />
  <p>验证状态：{{ isValidate ? '成功' : '失败' }}</p>
  <p>validateCode: {{ validateCode }}</p>
</template>

<script setup>
import { ref } from 'vue';

const isValidate = ref(false);
const validateCode = ref('');

const onValidate = (e) => {
  isValidate.value = e.isValid;
  validateCode.value = e.validateCode;
};
</script>
