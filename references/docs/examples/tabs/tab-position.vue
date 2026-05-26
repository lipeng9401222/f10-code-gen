<template>
  <e-radio-group v-model="tabPosition" style="margin-bottom: 30px">
    <e-radio-button value="top">top</e-radio-button>
    <e-radio-button value="right">right</e-radio-button>
    <e-radio-button value="bottom">bottom</e-radio-button>
    <e-radio-button value="left">left</e-radio-button>
  </e-radio-group>

  <e-tabs :tab-position="tabPosition" style="height: 200px" class="demo-tabs">
    <e-tab-pane label="User">User</e-tab-pane>
    <e-tab-pane label="Config">Config</e-tab-pane>
    <e-tab-pane label="Role">Role</e-tab-pane>
    <e-tab-pane label="Task">Task</e-tab-pane>
  </e-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const tabPosition = ref('left');
</script>
<style scoped>
.demo-tabs > .e-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.e-tabs--right .e-tabs__content,
.e-tabs--left .e-tabs__content {
  height: 100%;
}
</style>
