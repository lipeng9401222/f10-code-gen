<template>
  <e-tabs type="border-card" class="demo-tabs">
    <e-tab-pane>
      <template #label>
        <span class="custom-tabs-label">
          <e-icon><calendar /></e-icon>
          <span>Route</span>
        </span>
      </template>
      Route
    </e-tab-pane>
    <e-tab-pane label="Config">Config</e-tab-pane>
    <e-tab-pane label="Role">Role</e-tab-pane>
    <e-tab-pane label="Task">Task</e-tab-pane>
  </e-tabs>
</template>

<script setup>
import { Calendar } from '@epoint-fe/eui-icons';
</script>
<style scoped>
.demo-tabs > .e-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs .custom-tabs-label .e-icon {
  vertical-align: middle;
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
</style>
