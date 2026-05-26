<template>
  <div>
    <e-checkbox v-model="checked1" label="Option1" size="large" border />
    <e-checkbox v-model="checked2" label="Option2" size="large" border />
  </div>
  <div class="mt-4">
    <e-checkbox v-model="checked3" label="Option1" border />
    <e-checkbox v-model="checked4" label="Option2" border />
  </div>
  <div class="mt-4">
    <e-checkbox-group v-model="checkboxGroup1" size="small">
      <e-checkbox label="选项1" value="Option1" border />
      <e-checkbox label="选项2" value="Option2" border />
    </e-checkbox-group>
  </div>
  <div class="mt-4">
    <e-checkbox-group v-model="checkboxGroup1" size="small">
      <e-checkbox label="选项1" value="Option1" border disabled />
      <e-checkbox label="选项2" value="Option2" border disabled />
    </e-checkbox-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checked1 = ref(true);
const checked2 = ref(false);
const checked3 = ref(false);
const checked4 = ref(true);
const checkboxGroup1 = ref(['Option1']);
</script>
