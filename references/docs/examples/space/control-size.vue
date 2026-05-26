<template>
  <e-space direction="vertical" alignment="start" :size="30">
    <e-radio-group v-model="size">
      <e-radio value="large">large</e-radio>
      <e-radio value="default">default</e-radio>
      <e-radio value="small">small</e-radio>
    </e-radio-group>

    <e-space wrap :size="size">
      <e-card v-for="i in 3" :key="i" class="box-card" style="width: 250px">
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
  </e-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const size = ref('default');
</script>
