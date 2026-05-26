<template>
  <e-row>
    <e-col :span="8">
      <e-countdown title="Start to grab" :value="value" />
    </e-col>
    <e-col :span="8">
      <e-countdown title="Remaining VIP time" format="HH:mm:ss" :value="value1" />
      <e-button class="countdown-footer" type="primary" @click="reset">Reset </e-button>
    </e-col>
    <e-col :span="8">
      <e-countdown format="DD [days] HH:mm:ss" :value="value2">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            <e-icon style="margin-right: 4px" :size="12">
              <Calendar />
            </e-icon>
            Still to go until next month
          </div>
        </template>
      </e-countdown>
      <div class="countdown-footer">{{ value2.format('YYYY-MM-DD') }}</div>
    </e-col>
  </e-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import dayjs from 'dayjs';
import { Calendar } from '@epoint-fe/eui-icons';

const value = ref(Date.now() + 1000 * 60 * 60 * 7);
const value1 = ref(Date.now() + 1000 * 60 * 60 * 24 * 2);
const value2 = ref(dayjs().add(1, 'month').startOf('month'));

function reset() {
  value1.value = Date.now() + 1000 * 60 * 60 * 24 * 2;
}
</script>

<style scoped>
.e-col {
  text-align: center;
}

.countdown-footer {
  margin-top: 8px;
}
</style>
