<template>
  <div class="flex flex-wrap gap-2 my-2">
    <e-tag v-for="item in items" :key="item.label" :type="item.type" class="mx-1" effect="dark" round>
      {{ item.label }}
    </e-tag>
  </div>
  <div class="flex flex-wrap gap-2">
    <e-tag v-for="item in items" :key="item.label" :type="item.type" class="mx-1" effect="light" round>
      {{ item.label }}
    </e-tag>
  </div>
  <div class="flex flex-wrap gap-2 my-2">
    <e-tag v-for="item in items" :key="item.label" :type="item.type" class="mx-1" effect="plain" round>
      {{ item.label }}
    </e-tag>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([
  { type: '', label: 'Tag 1' },
  { type: 'success', label: 'Tag 2' },
  { type: 'info', label: 'Tag 3' },
  { type: 'danger', label: 'Tag 4' },
  { type: 'warning', label: 'Tag 5' },
]);
</script>
