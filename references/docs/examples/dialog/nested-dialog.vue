<template>
  <e-button text @click="outerVisible = true"> open the outer Dialog </e-button>

  <e-dialog v-model="outerVisible" title="Outer Dialog">
    <template #default>
      <e-dialog v-model="innerVisible" width="30%" title="Inner Dialog" append-to-body />
    </template>
    <template #footer>
      <div class="dialog-footer">
        <e-button @click="outerVisible = false">Cancel</e-button>
        <e-button type="primary" @click="innerVisible = true"> 打开内部的 Dialog </e-button>
      </div>
    </template>
  </e-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const outerVisible = ref(false);
const innerVisible = ref(false);
</script>
