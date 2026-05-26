<template>
  <ep-layout-manager>
    <template #main>
      <ep-tabs-tree-select
        ref="tabsTreeSelectRef"
        :select-tabs="tabs"
        v-model="localValue"
        v-model:text="localText"
        action="/showcase/f10-demo/form-person-depart-tree-model"
        :before-check="beforeCheck"
      />
    </template>
    <template #bottom>
      <e-toolbar class="px-xxl py-l" button-position="right">
        <template #button>
          <e-toolbar-btns :items="footerBtnList" />
        </template>
      </e-toolbar>
    </template>
  </ep-layout-manager>
</template>

<script setup>
import { ref, inject, computed, onMounted } from 'vue';
import { EpTabsTreeSelect, Utils } from '@epframe/eui-core';
import { EMessage } from '@epoint-fe/eui-components';

defineOptions({
  name: 'PersonDepartSelect'
});

// 是否处于弹窗中
const getCurrentDialog = inject('getCurrentDialog');
// 关闭弹窗
const closeDialog = (action = 'close', data) => {
  if (getCurrentDialog) {
    getCurrentDialog().close(action || 'close', data);
  }
};

const tabsTreeSelectRef = ref(null);
// 存储node数据
const optNodeData = ref({});

const props = defineProps({
  cacheData: {
    type: Array,
    default: () => []
  }
});

// 本地状态 - 用于 v-model 双向绑定
const localValue = ref(props.cacheData?.map((item) => item.id) ?? []);
const localText = ref(props.cacheData?.map((item) => item.name) ?? []);

const tabs = [
  { label: '全部', name: 'allou' },
  { label: '本部门', name: 'ou' },
  { label: '用户组', name: 'user' }
];

// 底部按钮列表
const footerBtnList = computed(() => [
  {
    type: 'default',
    content: '取消',
    onClick: onCancel
  },
  {
    type: 'primary',
    content: '提交',
    onClick: onSubmit
  }
]);

// 取消
const onCancel = () => {
  EMessage({ message: '取消' });
  closeDialog('close');
};

// 提交
const onSubmit = async () => {
  const rawData = tabsTreeSelectRef.value?.getSelectedData();
  // 转换数据格式：{ text, value } → { id, name, icon }
  const data = rawData.map((item) => {
    const node = optNodeData.value[item.value];
    return {
      id: item.value,
      name: item.text,
      icon: node?.icon ?? '',
      parentName: node?.parentName ?? ''
    };
  });
  Utils.logger.info('onSubmit data=', data);

  EMessage({ message: '提交成功！', type: 'success' });
  closeDialog(JSON.stringify({ action: 'save', data }));
};

const beforeCheck = (node) => {
  updateOptNodeData([node]);
};

// 存储节点数据
const updateOptNodeData = (data) => {
  data.forEach((item) => {
    if (item?.id && !optNodeData.value[item.id]) {
      optNodeData.value[item.id] = item;
    }
  });
};

// 初始化：从 cacheData 同步到本地状态
onMounted(() => {
  if (props.cacheData?.length) {
    updateOptNodeData(props.cacheData);
  }
});
</script>

<style lang="scss" scoped>
// 为适配 EpTabsTreeSelect 在弹窗中的布局，调整其内部样式
:deep(.tab-select-section) {
  .section-left-body,
  .section-right-body {
    padding: 0;
    background-color: transparent;
  }

  .section-left-body {
    .e-tree {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
