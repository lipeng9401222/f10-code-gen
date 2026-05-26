<template>
  <div class="flex flex-wrap items-center">
    <e-dropdown>
      <e-button type="primary">
        Dropdown List<e-icon class="e-icon--right"><arrow-down /></e-icon>
      </e-button>
      <template #dropdown>
        <e-dropdown-menu>
          <e-dropdown-item>Action 1</e-dropdown-item>
          <e-dropdown-item>Action 2</e-dropdown-item>
          <e-dropdown-item>Action 3</e-dropdown-item>
          <e-dropdown-item>Action 4</e-dropdown-item>
          <e-dropdown-item>Action 5</e-dropdown-item>
        </e-dropdown-menu>
      </template>
    </e-dropdown>
    <e-dropdown split-button type="primary" @click="handleClick">
      Dropdown List
      <template #dropdown>
        <e-dropdown-menu>
          <e-dropdown-item>Action 1</e-dropdown-item>
          <e-dropdown-item>Action 2</e-dropdown-item>
          <e-dropdown-item>Action 3</e-dropdown-item>
          <e-dropdown-item>Action 4</e-dropdown-item>
          <e-dropdown-item>Action 5</e-dropdown-item>
        </e-dropdown-menu>
      </template>
    </e-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ArrowDown } from '@epoint-fe/eui-icons';

const handleClick = () => {
  // eslint-disable-next-line no-alert
  alert('button click');
};
</script>
<style scoped>
.example-showcase .e-dropdown + .e-dropdown {
  margin-left: 15px;
}
.example-showcase .e-dropdown-link {
  cursor: pointer;
  color: var(--e-color-primary);
  display: flex;
  align-items: center;
}
</style>
