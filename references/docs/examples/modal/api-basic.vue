<template>
  <e-button @click="openModal">通过 API 打开 Modal</e-button>
</template>

<script lang="ts" setup>
import { getCurrentInstance, h } from 'vue';
import { Edit } from '@epoint-fe/eui-icons';
import ModalContent from './modal-content-basic.vue';

const { proxy } = getCurrentInstance()!;

const openModal = () => {
  proxy?.$modal(
    {
      title: '编辑用户信息',
      icon: Edit,
      closeCallback: (action) => {
        console.log('Modal 关闭,回传值:', action);
      },
    },
    () => h(ModalContent)
  );
};
</script>
