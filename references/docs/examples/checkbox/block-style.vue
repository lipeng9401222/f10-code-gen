<template>
  <div>
    <e-checkbox-group v-model="checkboxGroup1" size="large" block>
      <e-checkbox-button v-for="city in cities" :key="city" :value="city" :label="city">
        {{ city }}
      </e-checkbox-button>
    </e-checkbox-group>
  </div>
  <div class="demo-button-style">
    <e-checkbox-group v-model="checkboxGroup2" block>
      <e-checkbox-button v-for="city in cities" :key="city" :value="city" :label="city">{{ city }}</e-checkbox-button>
    </e-checkbox-group>
  </div>
  <div class="demo-button-style">
    <e-checkbox-group v-model="checkboxGroup3" size="small" block>
      <e-checkbox-button
        v-for="city in cities"
        :key="city"
        :value="city"
        :label="city"
        :disabled="city === 'Beijing'"
        >{{ city }}</e-checkbox-button
      >
    </e-checkbox-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const checkboxGroup1 = ref(['Shanghai']);
const checkboxGroup2 = ref(['Shanghai']);
const checkboxGroup3 = ref(['Shanghai']);
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'];
</script>

<style scoped>
.demo-button-style {
  margin-top: 24px;
}
</style>
