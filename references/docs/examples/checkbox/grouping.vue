<template>
  <e-checkbox-group v-model="checkList">
    <e-checkbox value="A" label="选项 A" />
    <e-checkbox value="B" label="选项 B" />
    <e-checkbox value="C" label="选项 C" />
    <e-checkbox value="D" label="禁用的" disabled />
    <e-checkbox value="E" label="禁用的 已被勾选" disabled />
  </e-checkbox-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checkList = ref(['E', 'A']);
</script>
