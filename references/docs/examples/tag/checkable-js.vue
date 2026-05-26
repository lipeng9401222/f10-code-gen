<template>
  <div>
    <e-check-tag checked style="margin-right: 8px">Checked</e-check-tag>
    <e-check-tag :checked="checked" @change="onChange">Toggle me</e-check-tag>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const checked = ref(false);

const onChange = (status) => {
  checked.value = status;
};
</script>
