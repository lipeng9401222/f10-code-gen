<template>
  <e-select v-model="value" class="demo-select" placeholder="自定义面板内容">
    <template #panel-header>
      <div style="padding: 8px 12px; border-bottom: 1px solid #eee; color: #409eff; text-align: center">
        <e-icon style="margin-right: 6px"><InfoFilled /></e-icon>
        自定义面板顶部内容
      </div>
    </template>
    <e-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    <template #panel-footer>
      <div style="padding: 8px 12px; border-top: 1px solid #eee; color: #67c23a; text-align: center">
        <e-button type="primary" size="small" style="width: 100%">添加选项</e-button>
      </div>
    </template>
  </e-select>

  <e-select v-model="value" :options="options" class="demo-select" placeholder="带操作的下拉面板">
    <template #panel-header>
      <div style="padding: 8px">
        <e-input v-model="searchText" placeholder="请输入关键字">
          <template #suffix>
            <e-icon><Search /></e-icon>
          </template>
        </e-input>
      </div>
    </template>
    <template #panel-footer>
      <div style="padding: 8px 12px; border-top: 1px solid var(--e-function-color-line); text-align: right">
        <e-button>重置</e-button>
        <e-button type="primary">确认</e-button>
      </div>
    </template>
  </e-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { InfoFilled, Search } from '@epoint-fe/eui-icons';

const value = ref('');
const searchText = ref('');

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
];
</script>

<style scoped>
.demo-select {
  width: 240px;
  margin-right: 16px;
  margin-bottom: 16px;
}
</style>
