<template>
  <e-popup-header-extra>
    <e-button class="my-0 e-dialog__header_btn" text size="small" title="刷新" :icon="Refresh" @click="refreshDialog" />
  </e-popup-header-extra>
  <ep-layout-manager class="eui-page" v-loading="model.global.state.loading" :bottom-config="{ contentClass: 'eui-bottom-section' }">
    <template #main>
      <div class="eui-main-section">
        <e-scrollbar>
          <ul class="p-xxl py-m">
            <li
              v-for="(item, key) in model.gridList.data.data"
              :key="'card-' + key"
              class="flex flex-row justify-between items-center px-l py-l border rounded-sm cursor-pointer"
              :class="{ 'mt-l': key !== 0, 'border-primary': key === selectKey || item.active || key === hoverKey }"
              @mouseover="hoverKey = key"
              @mouseleave="hoverKey = null"
              @click="handleClick(key, item)"
            >
              <e-image class="rounded" style="width: 42px; height: 42px" :src="item.icon" fit="cover" />

              <div class="flex-auto w-0 ml-xl">
                <div class="h-xs leading-lg text-lg text-primary ellipsis">
                  <e-tooltip placement="top" :content="item.title" :show-arrow="false" show-after="200">
                    {{ item.title }}
                  </e-tooltip>
                </div>
                <div class="leading-base text-base text-secondary ellipsis">
                  <e-tooltip placement="top" :content="item.detail" :show-arrow="false" show-after="200">
                    {{ item.detail }}
                  </e-tooltip>
                </div>
              </div>
            </li>
          </ul>
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
import { ref, inject, onMounted } from 'vue';
import { Utils } from '@epframe/eui-core';
import { Refresh } from '@epoint-fe/eui-icons';

defineOptions({
  name: 'CardList'
});

const { PageConfig, createSubModel, request } = Utils;

// 定义 props传参
const props = defineProps({
  data: { type: Object, default: () => ({}) } // 数据
});

const getCurrentDialog = inject('getCurrentDialog');

// 关闭弹窗
const closeDialog = (action = 'close', data = '') => {
  if (getCurrentDialog) {
    getCurrentDialog().close(action === 'close' ? action : data);
  }
};

// 页面配置模型
const pageConfig = new PageConfig({});
// 定义数据模型
const model = Utils.defineDataModel(() => {
  const condition = ref(null); // 条件

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
          url: `/showcase/f10-demo/chosenCardList`,
          data: {
            // 查询条件
            conditions: [
              {
                path: 'condition',
                type: condition.value ? 'EQ' : 'NQ',
                value: condition.value
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
      url: `/showcase/f10-demo/chosenCardListSave`,
      data: {
        customParams: {
          condition: condition.value
        },
        selectIds: [id]
      }
    });
  };

  return {
    global: { pageConfig }, // 全局模型
    models: {
      condition, // 基础条件
      gridList, // 数据模型
      submitSelect // 保存选择
    }
  };
});

const hoverKey = ref(null);
const selectKey = ref(null);
const selectIds = ref(null);

/**
 * 刷新弹窗内容
 */
const refreshDialog = () => {
  hoverKey.value = null;
  selectKey.value = null;
  selectIds.value = null;
  model.methods.initData();
};

const handleClick = (key, item) => {
  selectKey.value = key;
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
  model.methods.initData();
});
</script>

<style scoped></style>
