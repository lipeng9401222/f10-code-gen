<template>
  <e-toolbar ref="toolbarRef" filter-divider>
    <template #button>
      <e-button type="primary">Primary</e-button>
      <e-button type="success">Success</e-button>
      <e-button type="info">Info</e-button>
    </template>
    <template #filter="{ overload, opened }">
      <e-form class="filter-content" :class="{ opened: opened }">
        <e-form-item label="是否重载">
          <e-switch :model-value="overload" />
        </e-form-item>
        <e-form-item label="是否展开">
          <e-switch :model-value="opened" />
        </e-form-item>
        <e-form-item label="搜索">
          <e-input />
        </e-form-item>
      </e-form>
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
  .filter-content {
    display: flex;
    &.opened {
      flex-wrap: wrap;
    }

    .e-form-item {
      margin-bottom: 0;
      flex-shrink: 0;
    }
  }
}
</style>
