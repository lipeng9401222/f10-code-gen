<template>
  <e-button @click="showDialog"> 打开验证码 </e-button>
  <e-dialog v-model="dialogVisible" title="请完成安全验证" :width="340">
    <e-verify-code
      ref="verifyCodeRef"
      captcha-type="iconclick"
      icon-base-url="https://picsum.photos/20/20"
      action="https://fe.epoint.com.cn/mock/752/eui-vue/initAndCheckCaptcha"
      @validate="onValidate"
    />
  </e-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const verifyCodeRef = ref();

const dialogVisible = ref<boolean>(false);
const isValidate = ref<boolean>(false);
const validateCode = ref<string>('');

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
