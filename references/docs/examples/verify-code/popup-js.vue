<template>
  <e-button @click="showDialog"> 打开验证码 </e-button>
  <e-dialog v-model="dialogVisible" title="请完成安全验证" :width="340">
    <e-verify-code
      ref="verifyCodeRef"
      action="https://fe.epoint.com.cn/mock/752/eui-vue/initAndCheckCaptcha"
      @validate="onValidate"
    />
  </e-dialog>
</template>

<script setup>
import { ref } from 'vue';

const verifyCodeRef = ref();

const dialogVisible = ref(false);
const isValidate = ref(false);
const validateCode = ref('');

const showDialog = () => {
  dialogVisible.value = true;
  verifyCodeRef.value?.reload();
};
const onValidate = (e) => {
  isValidate.value = e.isValid;
  validateCode.value = e.validateCode;

  if (e.isValid) {
    setTimeout(() => {
      dialogVisible.value = false;
    }, 1000);
  }
};
</script>
