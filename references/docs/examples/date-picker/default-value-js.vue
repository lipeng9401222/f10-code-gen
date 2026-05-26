<template>
  <div class="demo-date-picker">
    <div class="block">
      <span class="demonstration">date</span>
      <e-date-picker v-model="value1" type="date" placeholder="请选择日期" :default-value="new Date(2010, 9, 1)" />
    </div>
    <div class="block">
      <span class="demonstration">daterange</span>
      <e-date-picker
        v-model="value2"
        type="daterange"
        start-placeholder="开始"
        end-placeholder="结束"
        :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const value1 = ref('');
const value2 = ref('');
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
