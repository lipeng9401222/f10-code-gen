<template>
  <div class="flex">
    <e-button text :icon="Search"></e-button>
    <e-button type="primary" :icon="Edit" />
    <e-button type="primary" :icon="Share" />
    <e-button type="primary" :icon="Delete" />
    <e-button type="primary" :icon="Search">Search</e-button>
    <e-button type="primary">
      Upload<e-icon class="e-icon--right"><Upload /></e-icon>
    </e-button>
    <e-button type="primary" :icon="Search" circle />
  </div>
</template>
<script setup lang="ts">
import { Delete, Edit, Search, Share, Upload } from '@epoint-fe/eui-icons';
</script>
