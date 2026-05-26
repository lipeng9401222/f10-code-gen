<template>
  <e-radio-group v-model="size" label="size control" size="small">
    <e-radio-button value="large">large</e-radio-button>
    <e-radio-button value="default">default</e-radio-button>
    <e-radio-button value="small">small</e-radio-button>
  </e-radio-group>
  <div class="demo-date-picker">
    <div class="block">
      <span class="demonstration">Default</span>
      <e-date-picker v-model="value1" type="date" placeholder="请选择日期" :size="size" />
    </div>
    <div class="block">
      <span class="demonstration">Picker with quick options</span>
      <e-date-picker
        v-model="value2"
        type="date"
        placeholder="请选择日期"
        :disabled-date="disabledDate"
        :shortcuts="shortcuts"
        :size="size"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const size = (ref < 'default') | 'large' | ('small' > 'default');

const value1 = ref('');
const value2 = ref('');

const shortcuts = [
  {
    text: '今天',
    value: new Date(),
  },
  {
    text: '昨天',
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24);
      return date;
    },
  },
  {
    text: '一周前',
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      return date;
    },
  },
];

const disabledDate = (time) => {
  return time.getTime() > Date.now();
};
</script>

<style scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--e-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--e-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
