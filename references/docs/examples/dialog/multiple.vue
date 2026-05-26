<template>
  <e-button text @click="visible1 = true"> 点击打开对话框1 </e-button>
  <e-button text @click="visible2 = true"> 点击打开对话框2 </e-button>

  <e-dialog v-model="visible1" title="提示1" draggable :modal="false"> 这是对话框内容。 </e-dialog>
  <e-dialog v-model="visible2" title="提示2" width="30%" draggable :modal="false"> 这是对话框内容。 </e-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { EMessageBox } from '@epoint-fe/eui-components';

const visible1 = ref(false);
const visible2 = ref(false);
</script>
