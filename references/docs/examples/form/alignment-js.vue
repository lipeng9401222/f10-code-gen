<template>
  <e-radio-group v-model="labelPosition" label="标签位置">
    <e-radio-button value="left">左侧</e-radio-button>
    <e-radio-button value="right">右侧</e-radio-button>
    <e-radio-button value="top">顶部</e-radio-button>
  </e-radio-group>
  <div style="margin: 20px" />
  <e-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" style="max-width: 460px">
    <e-form-item label="名称">
      <e-input v-model="formLabelAlign.name" />
    </e-form-item>
    <e-form-item label="活动区域">
      <e-input v-model="formLabelAlign.region" />
    </e-form-item>
    <e-form-item label="活动形式">
      <e-input v-model="formLabelAlign.type" />
    </e-form-item>
  </e-form>
</template>

<script setup>
import { reactive, ref } from 'vue';

const labelPosition = ref('right');

const formLabelAlign = reactive({
  name: '',
  region: '',
  type: '',
});
</script>
