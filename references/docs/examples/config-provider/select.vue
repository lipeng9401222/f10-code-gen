<template>
  <div>
    <div m="b-2">
      <e-checkbox v-model="selectConfig.clearable">showclearable</e-checkbox>
    </div>
    <e-config-provider :select="selectConfig">
      <e-select v-model="value1" multiple placeholder="请选择" style="width: 240px">
        <e-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </e-select>
    </e-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

const value1 = ref([]);

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
];

const selectConfig = reactive({
  clearable: true,
});
</script>
