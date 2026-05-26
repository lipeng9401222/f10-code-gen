<template>
  <e-dropdown @command="handleCommand">
    <span class="e-dropdown-link">
      Dropdown List<e-icon class="e-icon--right"><arrow-down /></e-icon>
    </span>
    <template #dropdown>
      <e-dropdown-menu>
        <e-dropdown-item command="a">Action 1</e-dropdown-item>
        <e-dropdown-item command="b">Action 2</e-dropdown-item>
        <e-dropdown-item command="c">Action 3</e-dropdown-item>
        <e-dropdown-item command="d" disabled>Action 4</e-dropdown-item>
        <e-dropdown-item command="e" divided>Action 5</e-dropdown-item>
      </e-dropdown-menu>
    </template>
  </e-dropdown>
</template>

<script setup>
import { EMessage } from '@epoint-fe/eui-components';
import { ArrowDown } from '@epoint-fe/eui-icons';

const handleCommand = (command) => {
  EMessage(`click on item ${command}`);
};
</script>
<style scoped>
.example-showcase .e-dropdown-link {
  cursor: pointer;
  color: var(--e-color-primary);
  display: flex;
  align-items: center;
}
</style>
