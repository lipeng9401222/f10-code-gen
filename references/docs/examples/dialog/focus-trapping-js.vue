<template>
  <e-button text @click="dialogVisible = true"> click to open the Dialog </e-button>

  <div>
    <p>关闭对话框后，输入框将获得焦点。</p>
    <e-input ref="inputRef" placeholder="Please input" />
  </div>

  <e-dialog v-model="dialogVisible" destroy-on-close title="Tips" width="30%" @close-auto-focus="handleCloseAutoFocus">
    <span>This is a message</span>
    <e-divider />
    <e-input placeholder="Initially focused" />
    <template #footer>
      <span class="dialog-footer">
        <e-button @click="dialogVisible = false">Cancel</e-button>
        <e-button type="primary" @click="dialogVisible = false"> Confirm </e-button>
      </span>
    </template>
  </e-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { EInput } from '@epoint-fe/eui-components';

const dialogVisible = ref(false);
const inputRef = ref();

const handleCloseAutoFocus = () => {
  inputRef.value?.focus();
};
</script>
