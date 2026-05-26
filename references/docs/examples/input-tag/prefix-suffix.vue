<template>
  <e-input-tag v-model="input" clearable placeholder="Please input">
    <template #prefix>
      <e-icon><CollectionTag /></e-icon>
    </template>
    <template #suffix>
      <e-icon><Search /></e-icon>
    </template>
  </e-input-tag>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CollectionTag, Search } from '@epoint-fe/eui-icons';

const input = ref<string[]>();
</script>
