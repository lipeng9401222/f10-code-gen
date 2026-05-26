<template>
  <e-button type="primary" @click="open = true">Begin Tour</e-button>

  <e-divider />

  <e-space>
    <e-button ref="ref1">Upload</e-button>
    <e-button ref="ref2" type="primary">Save</e-button>
    <e-button ref="ref3" :icon="MoreFilled" />
  </e-space>

  <e-tour v-model="open" type="primary" :mask="false">
    <e-tour-step :target="ref1?.$el" title="Upload File" description="Put you files here." />
    <e-tour-step :target="ref2?.$el" title="Save" description="Save your changes" />
    <e-tour-step :target="ref3?.$el" title="Other Actions" description="Click to see other" />
  </e-tour>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MoreFilled } from '@epoint-fe/eui-icons';
import type { ButtonInstance } from '@epoint-fe/eui-components';

const ref1 = ref<ButtonInstance>();
const ref2 = ref<ButtonInstance>();
const ref3 = ref<ButtonInstance>();

const open = ref(false);
</script>
