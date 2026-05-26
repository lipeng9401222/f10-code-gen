<template>
  <e-input-amount v-model="amount" :controls="false" placeholder="请输入金额" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const amount = ref(99.99);
</script>
