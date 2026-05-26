<template>
  <e-button type="primary" loading>Loading</e-button>
  <e-button type="primary" :loading-icon="Football" loading>Loading</e-button>
  <e-button type="primary" loading>
    <template #loading>
      <div class="custom-loading">
        <svg class="circular" viewBox="0 0 50 50">
          <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="4" />
        </svg>
      </div>
    </template>
    Loading
  </e-button>
</template>

<script lang="ts" setup>
import { Football } from '@epoint-fe/eui-icons';
</script>

<style scoped>
.e-button .custom-loading .circular {
  margin-right: 6px;
  width: 18px;
  height: 18px;
  animation: loading-rotate 2s linear infinite;
}
.e-button .custom-loading .circular .path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: var(--e-button-text-color);
  stroke-linecap: round;
}
</style>
