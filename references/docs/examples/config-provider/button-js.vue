<template>
  <div>
    <div m="b-2">
      <e-checkbox v-model="config.autoInsertSpace">autoInsertSpace</e-checkbox>
    </div>

    <e-config-provider :button="config">
      <e-button>中文</e-button>
    </e-config-provider>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const config = reactive({
  autoInsertSpace: true,
});
</script>
