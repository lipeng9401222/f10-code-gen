<template>
  <e-dropdown>
    <span class="e-dropdown-link">
      Dropdown List
      <e-icon class="e-icon--right">
        <arrow-down />
      </e-icon>
    </span>
    <template #dropdown>
      <e-dropdown-menu>
        <e-dropdown-item>Action 1</e-dropdown-item>
        <e-dropdown-item>Action 2</e-dropdown-item>
        <e-dropdown-item>Action 3</e-dropdown-item>
        <e-dropdown-sub-menu title="Action 4">
          <e-dropdown-item>Action 4-1</e-dropdown-item>
          <e-dropdown-item>Action 4-2</e-dropdown-item>
          <e-dropdown-item>Action 4-3</e-dropdown-item>
          <e-dropdown-sub-menu title="Action 4-4">
            <e-dropdown-item>Action 4-4-1</e-dropdown-item>
            <e-dropdown-item>Action 4-4-2</e-dropdown-item>
            <e-dropdown-item>Action 4-4-3</e-dropdown-item>
          </e-dropdown-sub-menu>
        </e-dropdown-sub-menu>
      </e-dropdown-menu>
    </template>
  </e-dropdown>
</template>
<script lang="ts" setup>
import { ArrowDown } from '@epoint-fe/eui-icons';
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
