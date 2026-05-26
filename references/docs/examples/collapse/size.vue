<template>
  <div class="demo-collapse">
    <e-select v-model="size">
      <e-option v-for="option in sizeOptions" :key="option" :value="option" />
    </e-select>
    <e-divider />
    <e-collapse :size="size">
      <e-collapse-item id="1" title="这是一个 size 为 small 的标题" size="small" tooltip="tooltip" />
      <e-collapse-item id="2" title="这是一个 size 为 large 的标题" size="large" tooltip="tooltip" />
      <e-collapse-item id="3" :title="`这是一个 size 为 ${size} 的标题`" tooltip="tooltip" />
      <e-collapse-item id="4" :title="`这是一个 size 为 ${size} 的标题`" tooltip="tooltip" tooltip-mode="text" />
    </e-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const sizeOptions = ['small', 'default', 'large'];

const size = ref('default');
</script>
