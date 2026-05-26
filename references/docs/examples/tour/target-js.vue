<template>
  <e-button type="primary" @click="open = true">Begin Tour</e-button>

  <e-divider />

  <e-space>
    <e-button id="btn1">Upload</e-button>
    <e-button id="btn2" type="primary">Save</e-button>
    <e-button ref="btnRef" :icon="MoreFilled" />
  </e-space>

  <e-tour v-model="open">
    <e-tour-step target="#btn1" title="Upload File" description="Put you files here." />
    <e-tour-step :target="el" title="Save" description="Save your changes" />
    <e-tour-step :target="btnRef?.$el" title="Other Actions" description="Click to see other" />
  </e-tour>
</template>

<script setup>
import { ref } from 'vue';
import { MoreFilled } from '@epoint-fe/eui-icons';

const el = () => document.querySelector('#btn2');
const btnRef = ref(null);

const open = ref(false);
</script>
