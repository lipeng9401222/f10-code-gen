<template>
  <e-toolbar ref="toolbarRef" filter-divider>
    <template #button>
      <e-button type="primary">Primary</e-button>
      <e-button type="success">Success</e-button>
    </template>
    <template #filter>
      <div class="filter-content">搜索区域</div>
    </template>
    <template #actions>
      <e-button-group>
        <e-button :icon="LayoutCardBold" text />
        <e-button :icon="LayoutTableBold" text />
        <e-button :icon="MoreFilled" text />
      </e-button-group>
    </template>
  </e-toolbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { LayoutCardBold, LayoutTableBold, MoreFilled } from '@epoint-fe/eui-icons';
</script>

<style lang="scss" scoped>
.e-toolbar {
  .e-form-item {
    margin-bottom: 0;
    flex-shrink: 0;
  }
}
</style>
