<template>
  <div class="demo-date-picker">
    <div class="block">
      <span class="demonstration">禁用周末的日期选择器</span>
      <e-date-picker v-model="value2" type="date" placeholder="请选择日期" :disabled-date="disabledDate" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value2 = ref('');

const disabledDate = (time: Date) => {
  // 获取星期几（0是周日，6是周六）
  const day = time.getDay();
  // 如果是周六(6)或周日(0)，则禁用
  return day === 0 || day === 6;
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
