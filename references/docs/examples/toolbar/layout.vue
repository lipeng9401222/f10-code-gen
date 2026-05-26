<template>
  <e-toolbar filter-divider>
    <template #button>
      <e-button type="primary">Primary</e-button>
    </template>
    <template #filter>
      <div class="filter">搜索区域</div>
    </template>
    <template #actions>
      <e-button-group>
        <e-button :icon="MoreFilled" text />
      </e-button-group>
    </template>
  </e-toolbar>
  <e-divider />
  <e-toolbar filter-position="left" button-position="right" button-divider>
    <template #button>
      <e-button type="primary">Primary</e-button>
    </template>
    <template #filter>
      <div class="filter">搜索区域</div>
    </template>
    <template #actions>
      <e-button-group>
        <e-button :icon="MoreFilled" text />
      </e-button-group>
    </template>
  </e-toolbar>
  <e-divider />

  <e-toolbar title="页面名称" button-position="right" filter-position="right">
    <template #button>
      <e-button type="primary">Primary</e-button>
    </template>
    <template #filter>
      <div class="filter">搜索区域</div>
    </template>
    <template #actions>
      <e-button-group>
        <e-button :icon="MoreFilled" text />
      </e-button-group>
    </template>
  </e-toolbar>
  <e-divider />
  <e-toolbar title="页面名称" button-position="left" filter-position="left">
    <template #button>
      <e-button type="primary">Primary</e-button>
    </template>
    <template #filter>
      <div class="filter">搜索区域</div>
    </template>
    <template #actions>
      <e-button-group>
        <e-button :icon="MoreFilled" text />
      </e-button-group>
    </template>
  </e-toolbar>
  <e-divider />
  <e-toolbar title="页面名称" title-block filter-position="left" button-position="right">
    <template #button>
      <e-button type="primary">Primary</e-button>
    </template>
    <template #filter>
      <div class="filter">搜索区域</div>
    </template>
    <template #actions>
      <e-button-group>
        <e-button :icon="MoreFilled" text />
      </e-button-group>
    </template>
  </e-toolbar>
  <e-divider />
  <e-toolbar title="页面名称" filter-position="right" filter-block>
    <template #filter>
      <div class="filter">搜索区域</div>
    </template>
    <template #actions>
      <e-button-group>
        <e-button :icon="MoreFilled" text />
      </e-button-group>
    </template>
  </e-toolbar>
  <e-divider />
  <e-toolbar title="页面名称" button-position="left" filter-position="left" button-block filter-block>
    <template #filter>
      <div class="filter">搜索区域</div>
    </template>
    <template #button>
      <e-button type="primary">Primary</e-button>
    </template>
    <template #actions>
      <e-button-group>
        <e-button :icon="MoreFilled" text />
      </e-button-group>
    </template>
  </e-toolbar>
  <e-divider />
  <e-toolbar title="页面名称" button-position="right" filter-position="left" button-block filter-block>
    <template #filter>
      <div class="filter">搜索区域</div>
    </template>
    <template #button>
      <e-button type="primary">Primary</e-button>
    </template>
    <template #actions>
      <e-button-group>
        <e-button :icon="MoreFilled" text />
      </e-button-group>
    </template>
  </e-toolbar>
  <e-divider />
  <e-toolbar button-position="left" filter-position="left" filter-block>
    <template #button>
      <e-button type="primary">Primary</e-button>
    </template>
    <template #filter>
      <div class="filter">搜索区域</div>
    </template>
    <template #actions>
      <e-button-group>
        <e-button :icon="MoreFilled" text />
      </e-button-group>
    </template>
  </e-toolbar>
  <e-divider />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { MoreFilled } from '@epoint-fe/eui-icons';
</script>

<style lang="scss" scoped>
.e-toolbar {
  .e-form-item {
    margin-bottom: 0;
    flex-shrink: 0;
  }

  & ~ .e-toolbar {
    margin-top: 20px;
  }

  .filter {
    height: 32px;
    width: 100px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e5e9f2;
  }
}
</style>
