<template>
  <div>
    <e-input v-model="input1" placeholder="Please input">
      <template #prepend>Http://</template>
    </e-input>
  </div>
  <div class="mt-4">
    <e-input v-model="input2" placeholder="Please input">
      <template #append>.com</template>
    </e-input>
  </div>
  <div class="mt-4">
    <e-input v-model="input3" placeholder="Please input" class="input-with-select">
      <template #prepend>
        <e-select v-model="select" placeholder="请选择" style="width: 115px">
          <e-option label="Restaurant" value="1" />
          <e-option label="Order No." value="2" />
          <e-option label="Tel" value="3" />
        </e-select>
      </template>
      <template #append>
        <e-button :icon="Search" />
      </template>
    </e-input>
  </div>
  <div class="mt-4">
    <e-input v-model="input3" placeholder="Please input" class="input-with-select">
      <template #prepend>
        <e-button :icon="Search" />
      </template>
      <template #append>
        <e-select v-model="select" placeholder="请选择" style="width: 115px">
          <e-option label="Restaurant" value="1" />
          <e-option label="Order No." value="2" />
          <e-option label="Tel" value="3" />
        </e-select>
      </template>
    </e-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Search } from '@epoint-fe/eui-icons';
const input1 = ref('');
const input2 = ref('');
const input3 = ref('');
const select = ref('');
</script>

<style scoped>
.input-with-select .e-input-group__prepend {
  background-color: var(--e-fill-color-blank);
}
</style>
