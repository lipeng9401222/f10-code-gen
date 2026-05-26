<template>
  <div>
    <div style="margin-bottom: 15px">
      direction:
      <e-radio v-model="direction" label="horizontal">horizontal</e-radio>
      <e-radio v-model="direction" label="vertical">vertical</e-radio>
    </div>
    <div style="margin-bottom: 15px">fillRatio:<e-slider v-model="fillRatio" /></div>
    <e-space fill wrap :fill-ratio="fillRatio" :direction="direction" style="width: 100%">
      <e-card v-for="i in 5" :key="i" class="box-card">
        <template #header>
          <div class="card-header">
            <span>Card name</span>
            <e-button class="button" text>Operation button</e-button>
          </div>
        </template>
        <div v-for="o in 4" :key="o" class="text item">
          {{ 'List item ' + o }}
        </div>
      </e-card>
    </e-space>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const direction = ref('horizontal');
const fillRatio = ref(30);
</script>
