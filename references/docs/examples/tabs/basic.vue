<template>
  <e-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <e-tab-pane label="User" name="first">User</e-tab-pane>
    <e-tab-pane label="Config" name="second">Config</e-tab-pane>
    <e-tab-pane label="Role" name="third">Role</e-tab-pane>
    <e-tab-pane label="Task" name="fourth">Task</e-tab-pane>
  </e-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { TabsPaneContext } from '@epoint-fe/eui-components';

const activeName = ref('first');

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>
<style scoped>
.demo-tabs > .e-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
