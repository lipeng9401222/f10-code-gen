<template>
  <e-button @click="openModal">API 调用 - 自定义右侧区域</e-button>
</template>

<script lang="ts" setup>
import { getCurrentInstance, h } from 'vue';
import { Edit } from '@epoint-fe/eui-icons';
import { EButton, EMessage } from '@epoint-fe/eui-components';
import ModalContent from './modal-content-basic.vue';

const { proxy } = getCurrentInstance()!;

const handleSave = () => {
  EMessage.success('保存草稿');
};

const handleSubmit = () => {
  EMessage.success('提交成功');
};

const openModal = () => {
  proxy?.$modal(
    {
      title: '编辑用户信息',
      icon: Edit,
      renderHeaderExtra: () =>
        h('div', { class: 'flex gap-s' }, [
          h(EButton, { onClick: handleSave }, () => '保存草稿'),
          h(EButton, { type: 'primary', onClick: handleSubmit }, () => '提交'),
        ]),
      closeCallback: (action) => {
        console.log('关闭动作:', action);
      },
    },
    () => h(ModalContent)
  );
};
</script>
