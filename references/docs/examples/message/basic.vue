<template>
  <e-button :plain="true" @click="open">Show message</e-button>
  <e-button :plain="true" @click="openVn">VNode</e-button>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';

const open = () => {
  EMessage('this is a message.');
};

const openVn = () => {
  EMessage({
    message: h('p', null, [h('span', null, 'Message can be '), h('i', { style: 'color: teal' }, 'VNode')]),
  });
};
</script>
