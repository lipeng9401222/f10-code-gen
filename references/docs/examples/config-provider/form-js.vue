<template>
  <div>
    <e-config-provider :form="formConfig">
      <e-form label-width="100px" :model="formConfig" style="max-width: 460px">
        <e-form-item label="标签后缀">
          <e-input v-model="formConfig.labelSuffix" style="width: 240px" />
        </e-form-item>
        <e-form-item label="标签对齐方式">
          <e-select v-model="formConfig.labelPosition" placeholder="请选择对齐方式" style="width: 240px">
            <e-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </e-select>
        </e-form-item>
      </e-form>
    </e-config-provider>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const formConfig = reactive({
  labelSuffix: ':',
  labelPosition: 'top',
});

const options = [
  {
    value: 'left',
    label: '左侧',
  },
  {
    value: 'right',
    label: '右侧',
  },
  {
    value: 'top',
    label: '顶部',
  },
];
</script>
