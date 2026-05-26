<template>
  <e-button-group>
    <e-button type="primary" :icon="ArrowLeft">Previous Page</e-button>
    <e-button type="primary">
      Next Page<e-icon class="e-icon--right"><ArrowRight /></e-icon>
    </e-button>
  </e-button-group>

  <e-button-group class="ml-4">
    <e-button type="primary" :icon="Edit" />
    <e-button type="primary" :icon="Share" />
    <e-button type="primary" :icon="Delete" />
  </e-button-group>

  <e-dropdown class="ml-4" split-button type="primary">
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
</template>

<script setup lang="ts">
import { ArrowDown, ArrowLeft, ArrowRight, Delete, Edit, Share } from '@epoint-fe/eui-icons';
</script>
