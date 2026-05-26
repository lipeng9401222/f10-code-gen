<template>
  <e-row>
    <e-col :span="6">
      <e-statistic title="Daily active users" :value="268500" />
    </e-col>
    <e-col :span="6">
      <e-statistic :value="138">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            Ratio of men to women
            <e-icon style="margin-left: 4px" :size="12">
              <Male />
            </e-icon>
          </div>
        </template>
        <template #suffix>/100</template>
      </e-statistic>
    </e-col>
    <e-col :span="6">
      <e-statistic title="Total Transactions" :value="172000" />
    </e-col>
    <e-col :span="6">
      <e-statistic title="Feedback number" :value="562">
        <template #suffix>
          <e-icon style="vertical-align: -0.125em">
            <ChatLineRound />
          </e-icon>
        </template>
      </e-statistic>
    </e-col>
  </e-row>
</template>

<script setup>
import { ChatLineRound, Male } from '@epoint-fe/eui-icons';
</script>

<style scoped>
.e-col {
  text-align: center;
}
</style>
