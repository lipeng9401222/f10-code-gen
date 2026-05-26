<template>
  <div>
    <e-radio-group v-model="radio1" size="large">
      <e-radio-button label="New York" value="New York" />
      <e-radio-button label="Washington" value="Washington" />
      <e-radio-button label="Los Angeles" value="Los Angeles" />
      <e-radio-button label="Chicago" value="Chicago" />
    </e-radio-group>
  </div>
  <div style="margin-top: 20px">
    <e-radio-group v-model="radio2">
      <e-radio-button label="New York" value="New York" />
      <e-radio-button label="Washington" value="Washington" />
      <e-radio-button label="Los Angeles" value="Los Angeles" />
      <e-radio-button label="Chicago" value="Chicago" />
    </e-radio-group>
  </div>
  <div style="margin-top: 20px">
    <e-radio-group v-model="radio3" size="small">
      <e-radio-button label="New York" value="New York" />
      <e-radio-button label="Washington" value="Washington" />
      <e-radio-button label="Los Angeles" value="Los Angeles" />
      <e-radio-button label="Chicago" value="Chicago" />
    </e-radio-group>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const radio1 = ref('New York');
const radio2 = ref('New York');
const radio3 = ref('New York');
</script>
