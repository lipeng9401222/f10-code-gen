<template>
  <div>
    <e-config-provider :message="config">
      <e-button @click="open">OPEN</e-button>
    </e-config-provider>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';
const config = reactive({
  max: 3,
});
const open = () => {
  EMessage({
    message: 'This is a normal message',
    // duration: 0,
  });
};
</script>
