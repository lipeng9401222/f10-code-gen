<template>
  <e-button @click="visible = true"> 打开自定义头部抽屉 </e-button>
  <e-drawer v-model="visible" :show-close="false">
    <template #header="{ actions, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">这是自定义头部！</h4>
      <e-button type="danger" @click="actions.close">
        <e-icon class="e-icon--left"><CircleCloseFilled /></e-icon>
        关闭
      </e-button>
    </template>
    This is drawer content.
  </e-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { EButton, EDrawer } from '@epoint-fe/eui-components';
import { CircleCloseFilled } from '@epoint-fe/eui-icons';

const visible = ref(false);
</script>
