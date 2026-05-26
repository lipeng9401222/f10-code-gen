<template>
  <div>
    <p class="mb-2">水平排布（默认）：</p>
    <e-checkbox-group v-model="checkList1">
      <e-checkbox value="A" label="选项 A" />
      <e-checkbox value="B" label="选项 B" />
      <e-checkbox value="C" label="选项 C" />
      <e-checkbox value="D" label="禁用的" disabled />
      <e-checkbox value="E" label="禁用的 已被勾选" disabled />
    </e-checkbox-group>

    <p class="mt-4 mb-2">垂直排布：</p>
    <e-checkbox-group v-model="checkList2" direction="vertical">
      <e-checkbox value="A" label="选项 A" />
      <e-checkbox value="B" label="选项 B" />
      <e-checkbox value="C" label="选项 C" />
      <e-checkbox value="D" label="禁用的" disabled />
      <e-checkbox value="E" label="禁用的 已被勾选" disabled />
    </e-checkbox-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checkList1 = ref(['E', 'A']);
const checkList2 = ref(['E', 'A']);
</script>

<style scoped>
.mb-2 {
  margin-bottom: 8px;
}
.mt-4 {
  margin-top: 16px;
}
</style>
