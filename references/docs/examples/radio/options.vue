<template>
  <div>
    <e-button @click="add">新增选项</e-button>

    <e-form v-model="formData">
      <e-form-item label="选项" props="radio">
        <e-radio-group v-model="formData.radio" :options="data" />
      </e-form-item>
      <e-form-item label="选项" props="radio">
        <e-radio-group v-model="formData.radio" :options="data" option-type="button" />
      </e-form-item>

      <e-alert type="info" show-icon :closable="false">
        <p>自己写标签时优先级更高,options 不会生效</p>
      </e-alert>
      <e-form-item label="选项" props="radio">
        <e-radio-group v-model="formData.radio" :options="data">
          <e-radio value="1">1</e-radio>
          <e-radio value="2">2</e-radio>
          <e-radio value="3">3</e-radio>
        </e-radio-group>
      </e-form-item>
    </e-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
const _data = Array.from({ length: 10 })
  .fill(0)
  .map((_, i) => ({
    label: `选项${i + 1}`,
    value: `${i + 1}`,
    disabled: false,
  }));
_data[0].disabled = true;
_data[2].disabled = true;
_data[4].disabled = true;
const data = reactive(_data);

const formData = reactive({
  radio: '1',
  check: ['1', '2', '3'],
});

function add() {
  const i = data.length + 1;
  data.push({
    label: `选项${i}`,
    value: `${i}`,
    disabled: false,
  });
  console.log(data);
}
</script>
