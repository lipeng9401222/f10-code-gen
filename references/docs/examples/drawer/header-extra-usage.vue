<template>
  <e-button @click="visible = true">打开带有额外操作的抽屉</e-button>
  <e-drawer v-model="visible" title="审批详情">
    <template #header-extra>
      <e-tag type="warning">待审批</e-tag>
    </template>
    这是抽屉内容。
    <template #footer>
      <e-button>驳回</e-button>
      <e-button type="primary">通过</e-button>
    </template>
  </e-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
</script>
