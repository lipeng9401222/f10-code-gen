<template>
  <e-button ref="btnRef" type="primary" @click="open = true"> Begin Tour </e-button>

  <e-tour v-model="open">
    <e-tour-step title="Center" description="Displayed in the center of screen." />
    <e-tour-step title="Right" description="On the right of target." placement="right" :target="btnRef?.$el" />
    <e-tour-step title="Top" description="On the top of target." placement="top" :target="btnRef?.$el" />
  </e-tour>
</template>

<script setup>
import { ref } from 'vue';

const btnRef = ref(null);

const open = ref(false);
</script>
