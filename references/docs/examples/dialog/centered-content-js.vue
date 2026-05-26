<template>
  <e-button text @click="centerDialogVisible = true"> 点击打开对话框 </e-button>

  <e-dialog v-model="centerDialogVisible" title="警告" width="30%" center>
    <span> 需要注意，默认情况下内容不会居中对齐 </span>
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
