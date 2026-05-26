<template>
  <e-button type="primary" @click="open = true">Begin Tour</e-button>

  <e-divider />

  <e-space>
    <e-button id="btn1">Upload</e-button>
    <e-button id="btn2" type="primary">Save</e-button>
    <e-button ref="btnRef" :icon="MoreFilled" />
  </e-space>

  <e-tour v-model="open" type="primary">
    <e-tour-step target="#btn1" :icon="Menu" title="Upload File" description="Put you files here." />
    <e-tour-step :target="el" :icon="Save" title="Save" description="Save your changes" />
    <e-tour-step :target="btnRef?.$el" :icon="MoreFilled" title="Other Actions" description="Click to see other" />
  </e-tour>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Menu, MoreFilled, Save } from '@epoint-fe/eui-icons';
import type { ButtonInstance } from '@epoint-fe/eui-components';

const el = () => document.querySelector<HTMLElement>('#btn2');
const btnRef = ref<ButtonInstance>();

const open = ref(false);
</script>
