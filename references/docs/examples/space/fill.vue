<template>
  <div>
    <div style="margin-bottom: 15px">fill: <e-switch v-model="fill" /></div>
    <e-space :fill="fill" wrap>
      <e-card v-for="i in 3" :key="i" class="box-card">
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

const fill = ref(true);
</script>
