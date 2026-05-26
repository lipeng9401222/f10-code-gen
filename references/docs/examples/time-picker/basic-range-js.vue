<template>
  <div class="example-basic">
    <e-time-picker
      v-model="value1"
      :disabled-hours="disabledHours"
      :disabled-minutes="disabledMinutes"
      :disabled-seconds="disabledSeconds"
      placeholder="Arbitrary time"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const value1 = ref(new Date(2016, 9, 10, 18, 30));

const makeRange = (start, end) => {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};
const disabledHours = () => {
  return makeRange(0, 16).concat(makeRange(19, 23));
};
const disabledMinutes = (hour) => {
  if (hour === 17) {
    return makeRange(0, 29);
  }
  if (hour === 18) {
    return makeRange(31, 59);
  }
};
const disabledSeconds = (hour, minute) => {
  if (hour === 18 && minute === 30) {
    return makeRange(1, 59);
  }
};
</script>

<style scoped>
.example-basic .e-time-picker {
  margin: 8px;
}
</style>
