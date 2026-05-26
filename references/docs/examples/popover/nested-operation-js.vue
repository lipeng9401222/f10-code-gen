<template>
  <e-popover :visible="visible" placement="top" :width="160">
    <p>Are you sure to delete this?</p>
    <div style="text-align: right; margin: 0">
      <e-button size="small" text @click="visible = false">cancel</e-button>
      <e-button size="small" type="primary" @click="visible = false">confirm</e-button>
    </div>
    <template #reference>
      <e-button @click="visible = true">Delete</e-button>
    </template>
  </e-popover>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false);
</script>
