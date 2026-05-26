<template>
  <e-button text @click="dialogVisible = true"> Click to open Dialog </e-button>

  <e-dialog v-model="dialogVisible" title="Tips" width="30%" draggable>
    <span> 这是可拖拽的 Dialog</span>
    <template #footer>
      <span class="dialog-footer">
        <e-button @click="dialogVisible = false">Cancel</e-button>
        <e-button type="primary" @click="dialogVisible = false"> Confirm </e-button>
      </span>
    </template>
  </e-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dialogVisible = ref(false);
</script>
