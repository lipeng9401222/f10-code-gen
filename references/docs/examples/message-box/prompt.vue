<template>
  <e-button text @click="open">Click to open Message Box</e-button>
</template>

<script lang="ts" setup>
import { EMessage, EMessageBox } from '@epoint-fe/eui-components';

const open = () => {
  EMessageBox.prompt('请输入您的邮箱', '提示', {
    inputPattern:
      /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    inputErrorMessage: '无效的邮箱格式',
    confirmButtonDisabled: true,
    inputProps: {
      placeholder: '请输入您的邮箱',
      maxlength: 20,
      showWordLimit: true,
    },
    inputValidator: (value, state, isValid) => {
      state.confirmButtonDisabled = !isValid;
      return isValid;
    },
  })
    .then(({ value }) => {
      EMessage({
        type: 'success',
        message: `您的邮箱是: ${value}`,
      });
    })
    .catch(() => {
      EMessage({
        type: 'info',
        message: '输入已取消',
      });
    });
};
</script>
