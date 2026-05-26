<template>
  <e-row class="block-col-2">
    <e-col :span="8">
      <span class="demonstration">hover to trigger</span>
      <e-dropdown>
        <span class="e-dropdown-link">
          Dropdown List<e-icon class="e-icon--right"><arrow-down /></e-icon>
        </span>
        <template #dropdown>
          <e-dropdown-menu>
            <e-dropdown-item :icon="Plus">Action 1</e-dropdown-item>
            <e-dropdown-item :icon="CirclePlusFilled"> Action 2 </e-dropdown-item>
            <e-dropdown-item :icon="CirclePlus">Action 3</e-dropdown-item>
            <e-dropdown-item :icon="Check">Action 4</e-dropdown-item>
            <e-dropdown-item :icon="CircleCheck">Action 5</e-dropdown-item>
          </e-dropdown-menu>
        </template>
      </e-dropdown>
    </e-col>
    <e-col :span="8">
      <span class="demonstration">click to trigger</span>
      <e-dropdown trigger="click">
        <span class="e-dropdown-link">
          Dropdown List<e-icon class="e-icon--right"><arrow-down /></e-icon>
        </span>
        <template #dropdown>
          <e-dropdown-menu>
            <e-dropdown-item :icon="Plus">Action 1</e-dropdown-item>
            <e-dropdown-item :icon="CirclePlusFilled"> Action 2 </e-dropdown-item>
            <e-dropdown-item :icon="CirclePlus">Action 3</e-dropdown-item>
            <e-dropdown-item :icon="Check">Action 4</e-dropdown-item>
            <e-dropdown-item :icon="CircleCheck">Action 5</e-dropdown-item>
          </e-dropdown-menu>
        </template>
      </e-dropdown>
    </e-col>
    <e-col :span="8">
      <span class="demonstration">right click to trigger</span>
      <e-dropdown trigger="contextmenu">
        <span class="e-dropdown-link">
          Dropdown List<e-icon class="e-icon--right"><arrow-down /></e-icon>
        </span>
        <template #dropdown>
          <e-dropdown-menu>
            <e-dropdown-item :icon="Plus">Action 1</e-dropdown-item>
            <e-dropdown-item :icon="CirclePlusFilled"> Action 2 </e-dropdown-item>
            <e-dropdown-item :icon="CirclePlus">Action 3</e-dropdown-item>
            <e-dropdown-item :icon="Check">Action 4</e-dropdown-item>
            <e-dropdown-item :icon="CircleCheck">Action 5</e-dropdown-item>
          </e-dropdown-menu>
        </template>
      </e-dropdown>
    </e-col>
  </e-row>
</template>

<script setup>
import { ArrowDown, Check, CircleCheck, CirclePlus, CirclePlusFilled, Plus } from '@epoint-fe/eui-icons';
</script>

<style scoped>
.block-col-2 .demonstration {
  display: block;
  color: var(--e-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
