<template>
  <e-button type="primary" @click="open = true">Begin Tour</e-button>

  <e-divider />

  <e-space>
    <e-button ref="ref1">Upload</e-button>
    <e-button ref="ref2" type="primary">Save</e-button>
    <e-button ref="ref3" :icon="MoreFilled" />
  </e-space>

  <e-tour
    v-model="open"
    :mask="{
      style: {
        boxShadow: 'inset 0 0 15px #333',
      },
      color: 'rgba(80, 255, 255, .4)',
    }"
  >
    <e-tour-step :target="ref1?.$el" title="Upload File">
      <div style="font-size: 24px; color: #409eff; font-weight: 500; width: 128; height: 60px; line-height: 60px">
        EUI Vue
      </div>
      <div>Put you files here.</div>
    </e-tour-step>
    <e-tour-step
      :target="ref2?.$el"
      title="Save"
      description="Save your changes"
      :mask="{
        style: {
          boxShadow: 'inset 0 0 15px #fff',
        },
        color: 'rgba(40, 0, 255, .4)',
      }"
    />
    <e-tour-step :target="ref3?.$el" title="Other Actions" description="Click to see other" :mask="false" />
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
