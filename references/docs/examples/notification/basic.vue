<template>
  <e-button plain @click="open1"> Closes automatically </e-button>
  <e-button plain @click="open2"> Won't close automatically </e-button>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { ENotification } from '@epoint-fe/eui-components';

const open1 = () => {
  ENotification({
    title: 'Title',
    message: h('i', { style: 'color: teal' }, 'This is a reminder'),
  });
};

const open2 = () => {
  ENotification({
    title: 'Prompt',
    message: 'This is a message that does not automatically close',
    duration: 0,
  });
};
</script>
