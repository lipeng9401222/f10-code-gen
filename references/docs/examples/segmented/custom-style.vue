<template>
  <div class="custom-style">
    <e-segmented v-model="value" :options="options" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('Delicacy');

const options = ['Delicacy', 'Desserts&Drinks', 'Fresh foods', 'Supermarket'];
</script>

<style scoped>
.custom-style .e-segmented {
  --e-segmented-item-selected-color: var(--e-text-color-primary);
  --e-segmented-item-selected-bg-color: #ffd100;
  --e-border-radius-base: 16px;
}
</style>
