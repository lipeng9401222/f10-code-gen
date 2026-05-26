<template>
  <e-slider v-model="size" />
  <e-space wrap :size="size">
    <e-card v-for="i in 2" :key="i" class="box-card" style="width: 250px">
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
</template>

<script setup>
import { ref } from 'vue';

const size = ref(20);
</script>
