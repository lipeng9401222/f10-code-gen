<template>
  <div class="demo-progress">
    <e-progress :percentage="50">
      <e-button text>Content</e-button>
    </e-progress>
    <e-progress :text-inside="true" :stroke-width="20" :percentage="50" status="exception">
      <span>Content</span>
    </e-progress>
    <e-progress type="circle" :percentage="100" status="success">
      <e-button type="success" :icon="Check" circle />
    </e-progress>
    <e-progress type="dashboard" :percentage="80">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
        <span class="percentage-label">Progressing</span>
      </template>
    </e-progress>
  </div>
</template>

<script lang="ts" setup>
import { Check } from '@epoint-fe/eui-icons';
</script>

<style scoped>
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
.demo-progress .e-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
.demo-progress .e-progress--circle {
  margin-right: 15px;
}
</style>
