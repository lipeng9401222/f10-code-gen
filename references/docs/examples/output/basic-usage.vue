<template>
  <div>
    <e-output :value="html" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const html = ref('<div style="color: red;">123</div>&lt;div&gt;123&lt;/div&gt;');
</script>
