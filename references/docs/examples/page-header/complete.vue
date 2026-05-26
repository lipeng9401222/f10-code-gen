<template>
  <div aria-label="A complete example of page header">
    <e-page-header @back="onBack">
      <template #breadcrumb>
        <e-breadcrumb separator="/">
          <e-breadcrumb-item :to="{ path: './page-header.html' }"> homepage </e-breadcrumb-item>
          <e-breadcrumb-item><a href="./page-header.html">route 1</a></e-breadcrumb-item>
          <e-breadcrumb-item>route 2</e-breadcrumb-item>
        </e-breadcrumb>
      </template>
      <template #content>
        <div class="flex items-center">
          <e-avatar class="mr-3" :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <span class="text-large font-600 mr-3"> Title </span>
          <span class="text-sm mr-2" style="color: var(--e-text-color-regular)"> Sub title </span>
          <e-tag>Default</e-tag>
        </div>
      </template>
      <template #extra>
        <div class="flex items-center">
          <e-button>Print</e-button>
          <e-button type="primary" class="ml-2">Edit</e-button>
        </div>
      </template>

      <e-descriptions :column="3" size="small" class="mt-4">
        <e-descriptions-item label="Username">kooriookami</e-descriptions-item>
        <e-descriptions-item label="Telephone">18100000000</e-descriptions-item>
        <e-descriptions-item label="Place">Suzhou</e-descriptions-item>
        <e-descriptions-item label="Remarks">
          <e-tag size="small">School</e-tag>
        </e-descriptions-item>
        <e-descriptions-item label="Address"
          >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
        </e-descriptions-item>
      </e-descriptions>
      <p class="mt-4 text-sm">
        Element Plus team uses <b>weekly</b> release strategy under normal circumstance, but critical bug fixes would
        require hotfix so the actual release number <b>could be</b> more than 1 per week.
      </p>
    </e-page-header>
  </div>
</template>

<script setup lang="ts">
import { ENotification as notify } from '@epoint-fe/eui-components';

const onBack = () => {
  notify('Back');
};
</script>
