<template>
  <e-badge is-dot class="item">query</e-badge>
  <e-badge is-dot class="item">
    <e-button class="share-button" :icon="Share" type="primary" />
  </e-badge>
</template>

<script lang="ts" setup>
import { Share } from '@epoint-fe/eui-icons';
</script>

<style scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
