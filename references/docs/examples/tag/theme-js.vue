<template>
  <div class="tag-group my-2 flex flex-wrap gap-1 items-center">
    <span class="tag-group__title m-1 line-height-2">Dark</span>
    <e-tag v-for="item in items" :key="item.label" :type="item.type" class="mx-1" effect="dark">
      {{ item.label }}
    </e-tag>
    <e-tag v-for="item in items" :key="item.label" :type="item.type" class="mx-1" effect="dark" closable>
      {{ item.label }}
    </e-tag>
  </div>
  <div class="tag-group my-2 flex flex-wrap gap-1 items-center">
    <span class="tag-group__title m-1">Light</span>
    <e-tag v-for="item in items" :key="item.label" class="mx-1" :type="item.type" effect="light">
      {{ item.label }}
    </e-tag>
    <e-tag v-for="item in items" :key="item.label" class="mx-1" :type="item.type" effect="light" closable>
      {{ item.label }}
    </e-tag>
  </div>
  <div class="tag-group my-2 flex flex-wrap gap-1 items-center">
    <span class="tag-group__title m-1">Plain</span>
    <e-tag v-for="item in items" :key="item.label" class="mx-1" :type="item.type" effect="plain">
      {{ item.label }}
    </e-tag>
    <e-tag v-for="item in items" :key="item.label" class="mx-1" :type="item.type" effect="plain" closable>
      {{ item.label }}
    </e-tag>
  </div>
  <div class="tag-group my-2 flex flex-wrap gap-1 items-center">
    <span class="tag-group__title m-1">Soft</span>
    <e-tag v-for="item in items" :key="item.label" class="mx-1" :type="item.type" effect="soft">
      {{ item.label }}
    </e-tag>
    <e-tag v-for="item in items" :key="item.label" class="mx-1" :type="item.type" effect="soft" closable>
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
