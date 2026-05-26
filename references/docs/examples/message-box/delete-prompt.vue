<template>
  <div>
    <e-divider>默认弹框</e-divider>
    <e-button text @click="openDefault">Click to open Default Delete Prompt Message Box</e-button>
    <e-divider>个性化弹框</e-divider>
    <e-button text @click="openCustom">Click to open Message Box</e-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { EMessage, EMessageBox } from '@epoint-fe/eui-components';

// -- 默认
const hintValueDefault = ref('删除');
const openDefault = () => {
  EMessageBox.deletePrompt({
    keyword: hintValueDefault.value,
  })
    .then(() => {
      EMessage({
        type: 'success',
        message: `Delete success`,
      });
    })
    .catch(() => {
      EMessage({
        type: 'info',
        message: 'Delete canceled',
      });
    });
};

// -- 个性化
const hintValueCustom = ref('你的名字');

const openCustom = () => {
  EMessageBox.deletePrompt({
    message: '检查姓名',
    title: '确认删除',
    confirmTpl: ', 请再次输入姓名 %s ',
    keyword: hintValueCustom.value,
    inputErrorMessage: '输入名称不匹配',
    keywordSelectable: true,
  })
    .then(() => {
      EMessage({
        type: 'success',
        message: `Delete success`,
      });
    })
    .catch(() => {
      EMessage({
        type: 'info',
        message: 'Delete canceled',
      });
    });
};
</script>
