<template>
  <div class="demo-date-picker">
    <div class="block">
      <span class="demonstration">周一作为一周的第一天</span>
      <e-date-picker v-model="value1" type="date" placeholder="请选择日期" :first-day-of-week="1" />
    </div>
    <div class="block">
      <span class="demonstration">周日作为一周的第一天（默认）</span>
      <e-date-picker v-model="value2" type="date" placeholder="请选择日期" :first-day-of-week="7" />
    </div>
  </div>
</template>

<script lang="ts" setup>
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
