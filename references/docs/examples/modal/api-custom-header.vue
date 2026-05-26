<template>
  <e-button @click="openModal">API 调用 - 完全自定义头部</e-button>
</template>

<script lang="ts" setup>
import { getCurrentInstance, h } from 'vue';
import { ArrowLeft } from '@epoint-fe/eui-icons';
import { EButton, EIcon } from '@epoint-fe/eui-components';
import ModalContent from './modal-content-basic.vue';

const { proxy } = getCurrentInstance()!;

const openModal = () => {
  proxy?.$modal(
    {
      title: '自定义头部',
      renderHeader: ({ close }) => {
        return h(
          'div',
          {
            class: 'flex items-center justify-between px-l text-white',
            style: 'height: 60px; background: linear-gradient(to right, #667eea, #764ba2);',
          },
          [
            h(EButton, { text: true, onClick: close }, () => [h(EIcon, null, () => h(ArrowLeft)), ' 离开']),
            h('h2', { class: 'm-0' }, '自定义标题'),
            h(EButton, { type: 'primary' }, () => '操作'),
          ]
        );
      },
    },
    () => h(ModalContent)
  );
};
</script>
