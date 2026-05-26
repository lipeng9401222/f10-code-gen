<template>
  <e-button text @click="dialogVisible = true"> 点击打开对话框 </e-button>

  <e-dialog v-model="dialogVisible" title="提示" width="30%" :before-close="handleClose">
    <span>这是一条消息</span>
    <template #footer>
      <span class="dialog-footer">
        <e-button @click="dialogVisible = false">取消</e-button>
        <e-button type="primary" @click="dialogVisible = false"> 确定 </e-button>
      </span>
    </template>
  </e-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { EMessageBox } from '@epoint-fe/eui-components';

const dialogVisible = ref(false);

const handleClose = (done) => {
  EMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
</script>
