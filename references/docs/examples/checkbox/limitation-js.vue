<template>
  <e-checkbox-group v-model="checkedCities" :min="1" :max="2">
    <e-checkbox v-for="city in cities" :key="city" :label="city" :value="city">{{ city }}</e-checkbox>
  </e-checkbox-group>
</template>

<script setup>
import { ref } from 'vue';

const checkedCities = ref(['Shanghai', 'Beijing']);
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'];
</script>
