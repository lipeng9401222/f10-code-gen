<template>
  <ep-layout-manager
    class="eui-page gap-xl"
    v-loading="model.global.state.loading"
    :left-config="{
      defaultWidth: '50%',
      showDivider: false
    }"
  >
    <template #left>
      <e-scrollbar class="eui-sub-section">
        <ep-form class="eui-form" filled>
          <e-collapse v-model="activeItemsLeft" @change="handleChange" :show-arrow="false">
            <e-collapse-item id="1" title="工单信息">
              <ep-form-item label="问题描述 (AI 总结)">
                <e-output :value="workItemModel.data.title" />
              </ep-form-item>
              <e-row :gutter="40">
                <e-col :span="12">
                  <ep-form-item label="问题类型">
                    <e-output :value="workItemModel.data.type" />
                  </ep-form-item>
                </e-col>
                <e-col :span="12">
                  <ep-form-item label="所属模块">
                    <e-output :value="workItemModel.data.module" />
                  </ep-form-item>
                </e-col>
              </e-row>
              <e-row :gutter="40">
                <e-col :span="12">
                  <ep-form-item label="提交日期">
                    <e-output :value="workItemModel.data.date" />
                  </ep-form-item>
                </e-col>
                <e-col :span="12">
                  <ep-form-item label="办结倒计时">
                    <e-output :value="workItemModel.data.countdown" />
                  </ep-form-item>
                </e-col>
              </e-row>
              <ep-form-item label="详情描述">
                <e-output :value="workItemModel.data.description" />
              </ep-form-item>
              <ep-form-item label="故障截图">
                <div class="eui-image-wrapper">
                  <e-image v-for="(img, index) in workItemModel.data.images" :key="index" :src="img" :preview-src-list="workItemModel.data.images" fit="cover" />
                </div>
              </ep-form-item>
            </e-collapse-item>
          </e-collapse>
        </ep-form>
      </e-scrollbar>
    </template>
    <template #main>
      <ep-layout-manager
        class="eui-main-section"
        :bottom-config="{
          contentClass: 'eui-bottom-section',
          inset: true
        }"
      >
        <template #main>
          <e-scrollbar>
            <ep-form ref="formRef" class="eui-form" :model="formModel.data" :security-config="model.global.securityConfig" :validate-on-rule-change="model.global.state.validateOnRuleChange">
              <e-collapse v-model="activeItems" :show-arrow="false">
                <e-collapse-item id="1" title="工单设定">
                  <e-row :gutter="40">
                    <e-col :span="12">
                      <ep-form-item label="工单状态" prop="status">
                        <ep-select v-model="formModel.data.status" :options="statusOptions" placeholder="请选择" />
                      </ep-form-item>
                    </e-col>
                    <e-col :span="12">
                      <ep-form-item label="优先级" prop="priority">
                        <ep-radio-group v-model="formModel.data.priority">
                          <ep-radio label="紧急" value="urgent">紧急</ep-radio>
                          <ep-radio label="高" value="high">高</ep-radio>
                          <ep-radio label="中" value="medium">中</ep-radio>
                          <ep-radio label="低" value="low">低</ep-radio>
                        </ep-radio-group>
                      </ep-form-item>
                    </e-col>
                  </e-row>
                  <ep-form-item label="关联工单" prop="relatedWorkOrders">
                    <ep-select v-model="formModel.data.relatedWorkOrders" :options="workOrderOptions" multiple placeholder="请选择" />
                  </ep-form-item>
                  <ep-form-item label="预计解决时间" prop="solveTimeRange">
                    <ep-date-picker v-model="formModel.data.solveTimeRange" type="daterange" range-separator="-" start-placeholder="开始" end-placeholder="结束" />
                  </ep-form-item>
                </e-collapse-item>
                <e-collapse-item id="2" title="办理记录">
                  <ep-form-item label="解决方案" prop="solution">
                    <ep-input v-model="formModel.data.solution" type="textarea" :rows="3" placeholder="请输入" />
                  </ep-form-item>
                  <ep-form-item label="办理结果" prop="result">
                    <ep-input v-model="formModel.data.result" type="textarea" :rows="3" placeholder="请输入" />
                  </ep-form-item>
                  <ep-form-item label="其他意见" prop="otherComments">
                    <ep-input v-model="formModel.data.otherComments" type="textarea" :rows="3" placeholder="请输入" />
                  </ep-form-item>
                </e-collapse-item>
              </e-collapse>
            </ep-form>
          </e-scrollbar>
        </template>
        <template #bottom>
          <e-toolbar button-position="right">
            <template #button>
              <e-toolbar-btns :items="footerBtnList" />
            </template>
          </e-toolbar>
        </template>
      </ep-layout-manager>
    </template>
  </ep-layout-manager>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { EpLayoutManager, Hooks, Utils } from '@epframe/eui-core';
import { EMessage } from '@epoint-fe/eui-components';

const { createSubModel, defineDataModel, request } = Utils;
const { useValidation } = Hooks;
const { validate } = useValidation();

const activeItems = ref(['1', '2']);
const activeItemsLeft = ref(['1']);

// 状态定义
const formRef = ref(null);

const statusOptions = [
  { label: '办理中', value: 'processing' },
  { label: '待处理', value: 'pending' },
  { label: '已关闭', value: 'closed' }
];

const workOrderOptions = [
  { label: '公务邮件无法开启免打扰功能', value: '1' },
  { label: '邮件反馈消息重复提醒', value: '2' }
];

const model = defineDataModel(() => {
  // 左侧工单信息数据模型
  const workItemModel = createSubModel(
    {
      title: '',
      type: '',
      module: '',
      date: '',
      countdown: '',
      description: '',
      images: []
    },
    {
      refresh: async () => {
        return await request({
          url: `/showcase/f10-demo/horizontal-outer/work-item`
        });
      }
    }
  );

  const formModel = createSubModel(
    {
      status: 'processing',
      priority: 'high',
      relatedWorkOrders: ['1', '2'],
      solveTimeRange: [],
      solution: '',
      result: '',
      otherComments: ''
    },
    {
      refresh: async () => {
        return await request({
          url: `/showcase/f10-demo/horizontal-outer/work-form`
        });
      },
      saveForm: async ({ formData }) => {
        return await request({
          url: `/showcase/f10-demo/horizontal-outer/work-form`,
          data: {
            entities: [formData],
            type: 'saveForm'
          }
        });
      },
      submitForm: async ({ formData }) => {
        return await request({
          url: `/showcase/f10-demo/horizontal-outer/work-form`,
          data: {
            entities: [formData],
            type: 'submitForm'
          }
        });
      }
    }
  );

  return {
    global: {
      securityConfig: { apiUrl: 'rest/frameuserlist/addUser' }
    },
    models: { formModel, workItemModel }
  };
});

const { formModel, workItemModel } = model;

const footerBtnList = ref([
  {
    type: 'default',
    content: '暂存',
    onClick: () => {
      onSave();
    }
  },
  {
    type: 'primary',
    content: '提交',
    onClick: () => {
      onSubmit();
    }
  }
]);

const onSave = async () => {
  await formModel.saveForm({ formData: formModel.data });
  EMessage.success('暂存成功！');
};

const onSubmit = async () => {
  const isValid = await validate(formRef);
  if (!isValid) return;

  await formModel.submitForm({ formData: formModel.data });
  EMessage.success('提交成功！');
};

onMounted(() => {
  model.methods.initData();
});
</script>

<style scoped lang="scss">
// 页面包裹
.eui-image-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--e-space-l);
  padding: var(--e-space-l) 0;
  .e-image {
    width: 80px;
    height: 80px;
    border-radius: var(--e-border-radius-small);
    box-shadow: var(--e-shadow-s);
  }
}
</style>
