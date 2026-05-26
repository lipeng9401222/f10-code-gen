<template>
  <e-button text @click="centerDialogVisible = true"> 点击打开对话框 </e-button>

  <e-dialog v-model="centerDialogVisible" title="警告" width="30%" align-center>
    <span>从屏幕中心打开对话框</span>
    <template #footer>
      <span class="dialog-footer">
        <e-button @click="centerDialogVisible = false">取消</e-button>
        <e-button type="primary" @click="centerDialogVisible = false"> 确认 </e-button>
      </span>
    </template>
  </e-dialog>
</template>

<script setup>
import { ref } from 'vue';

const centerDialogVisible = ref(false);
</script>
