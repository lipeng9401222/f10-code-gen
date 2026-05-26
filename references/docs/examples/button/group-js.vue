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
</template>

<script setup>
import { ArrowLeft, ArrowRight, Delete, Edit, Share } from '@epoint-fe/eui-icons';
</script>
