<template>
  <div class="demo-input-suffix">
    <e-row :gutter="20">
      <span class="ml-3 w-35 text-gray-600 inline-flex items-center">Using attributes</span>
      <e-input v-model="input1" class="w-50 m-2" placeholder="Pick a date" :suffix-icon="Calendar" />
      <e-input v-model="input2" class="w-50 m-2" placeholder="Type something" :prefix-icon="Search" />
    </e-row>
  </div>
  <div class="demo-input-suffix">
    <e-row :gutter="20">
      <span class="ml-3 w-35 text-gray-600 inline-flex items-center">Using slots</span>
      <e-input v-model="input3" class="w-50 m-2" placeholder="Pick a date">
        <template #suffix>
          <e-icon class="e-input__icon"><calendar /></e-icon>
        </template>
      </e-input>
      <e-input v-model="input4" class="w-50 m-2" placeholder="Type something">
        <template #prefix>
          <e-icon class="e-input__icon"><search /></e-icon>
        </template>
      </e-input>
    </e-row>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Calendar, Search } from '@epoint-fe/eui-icons';
const input1 = ref('');
const input2 = ref('');
const input3 = ref('');
const input4 = ref('');
</script>
