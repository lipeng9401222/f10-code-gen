<template>
  <e-button text @click="centerDialogVisible = true"> 点击以打开对话框 </e-button>

  <e-dialog v-model="centerDialogVisible" title="通知" width="30%" destroy-on-close center>
    <span> 注意：在首次打开对话框之前，此节点和下面的节点将不会被渲染 </span>
    <div>
      <strong>额外内容（未被渲染）</strong>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <e-button @click="centerDialogVisible = false">取消</e-button>
        <e-button type="primary" @click="centerDialogVisible = false"> 确认 </e-button>
      </span>
    </template>
  </e-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const centerDialogVisible = ref(false);
</script>
