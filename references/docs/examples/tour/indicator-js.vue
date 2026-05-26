<template>
  <e-button type="primary" @click="open = true">Begin Tour</e-button>

  <e-divider />

  <e-space>
    <e-button ref="ref1">Upload</e-button>
    <e-button ref="ref2" type="primary">Save</e-button>
    <e-button ref="ref3" :icon="MoreFilled" />
  </e-space>

  <e-tour v-model="open">
    <e-tour-step :target="ref1?.$el" title="Upload File" description="Put you files here." />
    <e-tour-step :target="ref2?.$el" title="Save" description="Save your changes" />
    <e-tour-step :target="ref3?.$el" title="Other Actions" description="Click to see other" />
    <template #indicators="{ current, total }">
      <span>{{ current + 1 }} / {{ total }}</span>
    </template>
  </e-tour>
</template>

<script setup>
import { ref } from 'vue';
import { MoreFilled } from '@epoint-fe/eui-icons';

const ref1 = ref(null);
const ref2 = ref(null);
const ref3 = ref(null);

const open = ref(false);
</script>
