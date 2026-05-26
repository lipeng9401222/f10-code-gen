<template>
  <ep-layout-manager class="eui-page">
    <template #main>
      <e-tabs class="h-full w-full" :full-layout="true" type="section" v-model="activeTab" @tab-change="handleTabChange">
        <e-tab-pane name="announcement" label="公告内容">
          <ToolbarBottom class="p-0" :show-nav="false" :in-tab="true" />
        </e-tab-pane>
        <e-tab-pane name="update-plan" label="更新计划">
          <e-empty class="h-full w-full bg-fill rounded overflow-hidden" />
        </e-tab-pane>
        <e-tab-pane name="backup" label="更新前备份">
          <e-empty class="h-full w-full bg-fill rounded overflow-hidden" />
        </e-tab-pane>
        <e-tab-pane name="configuration" label="更新后配置">
          <e-empty class="h-full w-full bg-fill rounded overflow-hidden" />
        </e-tab-pane>
        <e-tab-pane name="logging" label="日志记录">
          <e-empty class="h-full w-full bg-fill rounded overflow-hidden" />
        </e-tab-pane>
      </e-tabs>
    </template>
  </ep-layout-manager>
</template>

<script setup>
import { ref } from 'vue';
import ToolbarBottom from '../toolbar/toolbar-bottom.vue';
import { Utils } from '@epframe/eui-core';

defineOptions({
  name: 'TabNavigation'
});

// 当前激活的tab
const activeTab = ref('announcement');

// Tab切换事件
const handleTabChange = (tabName) => {
  Utils.logger.info('切换到tab:', tabName);
};
</script>
<style scoped lang="scss"></style>
