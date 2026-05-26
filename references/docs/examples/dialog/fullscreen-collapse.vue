<template>
  <e-button @click="visible = true"> 打开对话框 </e-button>
  <e-dialog v-model="visible" title="提示" show-fullscreen show-collapse> 这是对话框内容。 </e-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const collapse = ref(false);
const fullscreen = ref(false);
</script>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
