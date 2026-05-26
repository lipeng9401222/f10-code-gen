<template>
  <e-popup-header-extra>
    <e-button class="my-0 e-dialog__header_btn" text size="small" title="刷新" :icon="Refresh" @click="refreshDialog" />
  </e-popup-header-extra>
  <ep-layout-manager class="eui-page" v-loading="model.global.state.loading" :bottom-config="{ contentClass: 'eui-bottom-section' }">
    <template #main>
      <div class="eui-main-section">
        <div class="header-area px-xxl"></div>
        <e-scrollbar class="pt-xl pb-xxl px-xxl">
          <e-tabs v-model="model.tabIds" header-target=".header-area" type="section" @tab-change="handleTabChange">
            <e-tab-pane v-for="(item, key) in tabList" :key="'e-tab-pane-' + key" :label="item.label" :name="item.name"></e-tab-pane>
          </e-tabs>
          <div class="overflow-x-hidden">
            <e-row :gutter="24">
              <e-col v-for="(item, key) in cardList[model.tabIds]" :key="'card-' + key" :span="6" :class="{ 'mt-xxl': key > 3 }">
                <div
                  class="border rounded-sm cursor-pointer"
                  :class="{ 'border-primary': item.id === selectIds || item.active || item.id === hoverKey }"
                  @mouseover="hoverKey = item.id"
                  @mouseleave="hoverKey = null"
                  @click="handleClick(key, item)"
                >
                  <div class="relative" :class="'type-' + item.type">
                    <e-image class="rounded-t block w-full" style="height: 146px" :src="bgList[item.type - 1]" fit="cover" />

                    <div class="absolute inset-0 box-border px-xl py-xxl">
                      <div class="h-sm leading-xl text-xl fw-md text-primary ellipsis ml-xs mt-m mb-l">
                        <e-tooltip placement="top" :content="item.title" :show-arrow="false" show-after="200">
                          <span class="text">{{ item.title }}</span>
                        </e-tooltip>
                      </div>

                      <ul class="flex flex-row justify-start items-center">
                        <li v-for="(tags, tagKey) in item.tags" :key="'tag-' + tagKey" :class="{ 'ml-m': tagKey !== 0 }">
                          <span class="tag py-xs px-l text-sm leading-sm rounded-sm block">{{ tags }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="p-l">
                    <div class="h-xs leading-lg text-lg fw-md text-primary ellipsis">
                      <e-tooltip placement="top" :content="item.title" :show-arrow="false" show-after="200">
                        {{ item.title }}
                      </e-tooltip>
                    </div>
                    <div class="leading-base text-base fw-md text-secondary ellipsis mt-xs">
                      <e-tooltip placement="top" :content="item.detail" :show-arrow="false" show-after="200">
                        {{ item.detail }}
                      </e-tooltip>
                    </div>
                  </div>
                </div>
              </e-col>
            </e-row>
          </div>
        </e-scrollbar>
      </div>
    </template>
    <template #bottom>
      <e-toolbar button-position="right">
        <template #button>
          <e-button @click="handleDrawerCancel">取消</e-button>
          <e-button type="primary" @click="handleDrawerConfirm">确认</e-button>
        </template>
      </e-toolbar>
    </template>
  </ep-layout-manager>
</template>

<script setup>
import { ref, watch, inject, onMounted } from 'vue';
import { Utils } from '@epframe/eui-core';
import { Refresh } from '@epoint-fe/eui-icons';

import BG1 from './images/bg_1.png';
import BG2 from './images/bg_2.png';
import BG3 from './images/bg_3.png';
import BG4 from './images/bg_4.png';
import BG5 from './images/bg_5.png';
import BG6 from './images/bg_6.png';
import BG7 from './images/bg_7.png';

defineOptions({
  name: 'CardBulk'
});

const { PageConfig, createSubModel, request } = Utils;

const getCurrentDialog = inject('getCurrentDialog');

// 关闭弹窗
const closeDialog = (action = 'close', data = '') => {
  if (getCurrentDialog) {
    getCurrentDialog().close(action === 'close' ? action : data);
  }
};

// 定义 props传参
const props = defineProps({
  data: { type: Object, default: () => ({}) } // 数据
});

// 页面配置模型
const pageConfig = new PageConfig({});
// 定义数据模型
const model = Utils.defineDataModel(() => {
  const condition = ref(null); // 条件
  const tabIds = ref(null); // 已选标签ID列表

  condition.value = props.data;

  // 表格数据模型
  const gridList = createSubModel(
    {
      data: [],
      total: 0
    },
    {
      // 刷新表单数据
      refresh: async () => {
        // 请求表单数据
        const listData = await request({
          url: `/showcase/f10-demo/chosenCardBulk`,
          data: {
            // 查询条件
            conditions: [
              {
                path: 'condition',
                type: condition.value ? 'EQ' : 'NQ',
                value: condition.value
              },
              {
                path: 'tabIds',
                type: tabIds.value ? 'EQ' : 'NQ',
                value: tabIds.value
              }
            ]
          }
        });

        return listData;
      },
      lazy: false
    }
  );

  // 保存选择
  const submitSelect = async ({ id }) => {
    return await request({
      url: `/showcase/f10-demo/chosenCardBulkSave`,
      data: {
        customParams: {
          condition: condition.value,
          tabIds: tabIds.value
        },
        selectIds: [id]
      }
    });
  };

  return {
    global: { pageConfig }, // 全局模型
    models: {
      condition, // 基础条件
      tabIds,
      gridList, // 数据模型
      submitSelect // 保存选择
    }
  };
});

const bgList = [BG1, BG2, BG3, BG4, BG5, BG6, BG7];

const tabList = [
  { name: 'first', label: '全部' },
  { name: 'second', label: '工程项目' },
  { name: 'third', label: '财务管理' },
  { name: 'fourth', label: '基础人事' }
];
const handleTabChange = (name) => {
  model.tabIds = name;
  if (!cardList.value[name]) {
    model.gridList.refresh();
  }
};

const cardList = ref({});
const selectIds = ref(null);
const hoverKey = ref(null);

/**
 * 刷新弹窗内容
 */
const refreshDialog = () => {
  cardList.value = {};
  selectIds.value = null;
  hoverKey.value = null;
  model.tabIds = 'first';
  model.methods.initData();
};

watch(
  () => model.gridList.data,
  (newVal) => {
    cardList.value[model.tabIds] = newVal.data;
  },
  {
    deep: true,
    immediate: true
  }
);

const handleClick = (key, item) => {
  selectIds.value = item.id;
};

// 取消
const handleDrawerCancel = () => {
  closeDialog('close');
};
// 确认
const handleDrawerConfirm = async () => {
  if (selectIds.value) {
    await model.submitSelect({ id: selectIds.value });
  }
  closeDialog('save', [selectIds.value]);
};

// 初始化数据
onMounted(() => {
  model.tabIds = 'first';
  model.methods.initData();
});
</script>

<style scoped lang="scss">
@use 'sass:list';
.type {
  $color: #224c91, #2f7266, #5c458f, #764564, #2f7266, #3f673b, #224c91;
  $border: #9cb4d5, #aee4d8, #d3caed, #e7c6e1, #aee4d8, #c4e0ba, #bdd4fa;
  @for $i from 1 through 7 {
    &-#{$i} {
      .text {
        color: list.nth($color, $i);
      }
      .tag {
        color: list.nth($color, $i);
        border: 1px solid list.nth($border, $i);
        background: rgba($color: #fff, $alpha: 0.6);
      }
    }
  }
}

:deep(.e-tabs__header) {
  margin-bottom: 0;
}

:deep(.e-tabs) {
  --e-tabs-header-height: 32px;
}

:deep(.e-tabs--top.e-tabs--section .e-tabs__active-bar) {
  bottom: 0;
}
</style>
