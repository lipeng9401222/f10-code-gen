<template>
  <e-form label-width="80px" :model="filters">
    <e-form-item label="关键词">
      <e-input v-model="filters.keyword" />
    </e-form-item>
    <e-form-item label="状态">
      <e-select v-model="filters.status" placeholder="请选择">
        <e-option label="全部" value="all" />
        <e-option label="待处理" value="pending" />
        <e-option label="已完成" value="done" />
      </e-select>
    </e-form-item>
  </e-form>

  <e-popup-header-extra>
    <e-button @click="clear">清空</e-button>
    <e-button type="primary" @click="apply">应用</e-button>
  </e-popup-header-extra>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { EMessage } from '@epoint-fe/eui-components';

const filters = reactive({
  keyword: '合同',
  status: 'pending',
});

const clear = () => {
  filters.keyword = '';
  filters.status = 'all';
};

const apply = () => {
  EMessage.success(`已应用筛选：${filters.keyword || '全部'}`);
};
</script>
