<template>
  <div>
    <div class="flex justify-between items-center h-md p-m pb-0 box-content">
      <div class="h-xs text-lg fw-md text-primary leading-lg">财务审批</div>
      <e-icon class="more cursor-pointer fw-md" :size="14"><ArrowRight /></e-icon>
    </div>
    <div class="px-m">
      <e-scrollbar class="financial">
        <ul>
          <li v-for="(item, key) in financialData" :key="'financial-' + key" class="flex justify-between items-start py-m border-b border-1 financial-li">
            <e-avatar size="default" :src="item.portrait" />

            <div class="flex-auto w-0 mx-m">
              <div class="flex justify-between items-center">
                <e-tooltip placement="top" :content="item.username" :show-arrow="false" show-after="200">
                  <span class="leading-base text-base text-primary flex-auto w-0">{{ item.username }}</span>
                </e-tooltip>

                <div class="financial-card mr-l cursor-pointer">
                   <e-icon class="cursor-pointer financial-chat" color="#7D8DA6" :size="14"><BusinessCard /></e-icon>
                </div>
                <e-icon class="cursor-pointer financial-chat" color="#7D8DA6" :size="14"><ChatBubbleSmile /></e-icon>
              </div>
              <e-tooltip placement="top" :content="item.department" :show-arrow="false" show-after="200">
                <span class="text-sm text-secondary leading-sm">{{ item.department }}</span>
              </e-tooltip>
            </div>
          </li>
        </ul>
      </e-scrollbar>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Utils } from '@epframe/eui-core';
import { ArrowRight, ChatBubbleSmile, BusinessCard } from '@epoint-fe/eui-icons';

defineOptions({
  name: 'ComplexDataPopover'
});
// 定义 props传参
const props = defineProps({
  ouGuid: { type: String, default: '' } // 组织节点 GUID
});

const { createSubModel, PageConfig, request } = Utils;

// 页面配置模型
const pageConfig = new PageConfig({});
// 定义数据模型
const model = Utils.defineDataModel(() => {
  const ouGuid = ref('');

  // 财务审批数据
  const financialApprovalData = createSubModel(
    {
      data: []
    },
    {
      // 刷新表单数据
      refresh: async () => {
        // 请求表单数据
        const formData = await request({
          url: `/showcase/f10-demo/financialApprovalData`,
          data: {
            // 查询条件
            conditions: [
              {
                path: 'ouGuid', //  组织节点 GUID
                type: 'EQ', // 等于
                value: ouGuid.value // 组织节点 GUID 值
              }
            ]
          }
        });
        return formData;
      },
      lazy: false // 懒加载，只有调用 refresh 方法时才会请求数据
    }
  );

  return {
    global: { pageConfig }, // 全局模型
    models: {
      ouGuid, //
      financialApprovalData
    }
  };
});

const financialData = ref(null);
// 监听组织节点 GUID 变化，刷新表单数据
watch(
  () => props.ouGuid,
  (newVal) => {
    model.ouGuid = newVal;
  },
  {
    deep: true,
    immediate: true
  }
);

watch(
  () => model.financialApprovalData.data,
  (newVal) => {
    financialData.value = newVal?.data;
  },
  {
    deep: true,
    immediate: true
  }
);

// 初始化数据
onMounted(() => {
  model.methods.initData();
});
</script>

<style lang="scss" scoped>
.more {
  color: var(--e-color-1);

  &:hover {
    color: var(--e-text-color-primary);
  }
}

.financial {
  max-height: 228px;
  &-li {
    border-color: var(--e-function-color-line);
  }
  &-card {
    width: 14px;
    height: 14px;
  }
}
</style>
