<template>
  <p style="text-align: center; margin: 0 0 20px">Customize data items using render-content</p>
  <div style="text-align: center">
    <e-transfer
      v-model="leftValue"
      style="text-align: left; display: inline-block"
      filterable
      :left-default-checked="[2, 3]"
      :right-default-checked="[1]"
      :render-content="renderFunc"
      :titles="['Source', 'Target']"
      :button-texts="['To left', 'To right']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}',
      }"
      :data="data"
      @change="handleChange"
    >
      <template #left-footer>
        <e-button class="transfer-footer" size="small">Operation</e-button>
      </template>
      <template #right-footer>
        <e-button class="transfer-footer" size="small">Operation</e-button>
      </template>
    </e-transfer>
    <p style="text-align: center; margin: 50px 0 20px">Customize data items using scoped slot</p>
    <div style="text-align: center">
      <e-transfer
        v-model="rightValue"
        style="text-align: left; display: inline-block"
        filterable
        :left-default-checked="[2, 3]"
        :right-default-checked="[1]"
        :titles="['Source', 'Target']"
        :button-texts="['To left', 'To right']"
        :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}',
        }"
        :data="data"
        @change="handleChange"
      >
        <template #default="{ option }">
          <span>{{ option.key }} - {{ option.label }}</span>
        </template>
        <template #left-footer>
          <e-button class="transfer-footer" size="small">Operation</e-button>
        </template>
        <template #right-footer>
          <e-button class="transfer-footer" size="small">Operation</e-button>
        </template>
      </e-transfer>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const generateData = () => {
  const data = [];
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `Option ${i}`,
      disabled: i % 4 === 0,
    });
  }
  return data;
};

const data = ref(generateData());
const rightValue = ref([1]);
const leftValue = ref([1]);

const renderFunc = (h, option) => {
  return h('span', null, option.label);
};
const handleChange = (value, direction, movedKeys) => {
  console.log(value, direction, movedKeys);
};
</script>

<style scoped>
.transfer-footer {
  margin-left: 15px;
  padding: 6px 5px;
}
</style>
