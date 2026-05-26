<template>
  <div>
    <e-link :icon="Edit">Edit</e-link>
    <e-link>
      Check<e-icon class="e-icon--right"><icon-view /></e-icon>
    </e-link>
  </div>
</template>

<script setup lang="ts">
import { Edit, View as IconView } from '@epoint-fe/eui-icons';
</script>

<style scoped>
.e-link {
  margin-right: 8px;
}
</style>
