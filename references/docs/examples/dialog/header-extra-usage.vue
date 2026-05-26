<template>
  <e-button @click="visible = true">打开带有额外操作按钮的对话框</e-button>

  <e-button @click="visible2 = true">打开带有额外操作按钮的对话框2</e-button>
  <e-dialog v-model="visible" title="审批详情">
    <template #header-extra>
      <e-tag type="warning">待审批</e-tag>
    </template>
    这是对话框内容。
    <template #footer>
      <e-button>驳回</e-button>
      <e-button type="primary">通过</e-button>
    </template>
  </e-dialog>

  <e-dialog v-model="visible2" title="审批详情" content-class="my-dialog">
    <template #header-extra>
      <div class="flex justify-end gap-m">
        <e-button type="primary">按钮 1</e-button>
        <e-button>按钮 2</e-button>
      </div>
    </template>
    这是对话框内容。
    <template #footer>
      <e-button>驳回</e-button>
      <e-button type="primary">通过</e-button>
    </template>
  </e-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const visible2 = ref(false);
</script>
