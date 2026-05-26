<template>
  <e-button type="primary" @click="open = true">Begin Tour</e-button>

  <e-divider />

  <e-space>
    <e-button ref="ref1">Upload</e-button>
    <e-button ref="ref2" type="primary">Save</e-button>
    <e-button ref="ref3" :icon="MoreFilled" />
  </e-space>

  <e-tour v-model="open">
    <e-tour-step :target="ref1?.$el" title="Upload File">
      <div style="font-size: 24px; color: #409eff; font-weight: 500; width: 128; height: 60px; line-height: 60px">
        EUI Vue
      </div>
      <div>Put you files here.</div>
    </e-tour-step>
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
