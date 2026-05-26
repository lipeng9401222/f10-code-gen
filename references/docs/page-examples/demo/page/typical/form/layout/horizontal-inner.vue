<template>
  <ep-layout-manager class="eui-page" :right-config="layoutRightConfig" v-loading="model.global.state.loading">
    <template #main>
      <ep-layout-manager class="eui-main-section" :bottom-config="layoutBottomConfig">
        <template #main>
          <e-scrollbar ref="contentRef">
            <ep-layout-manager :right-config="mainLayoutRightConfig">
              <template #main>
                <div class="eui-sub-section">
                  <ep-form ref="formRef" class="eui-form" :model="formModel.data" :security-config="model.global.securityConfig" :validate-on-rule-change="model.global.state.validateOnRuleChange">
                    <e-collapse v-model="activeItemsLeft" :show-arrow="false">
                      <e-collapse-item id="1" title="公告信息">
                        <ep-form-layout :gutter="40">
                          <ep-form-item label="采购方式" prop="purchaseMode" :span="12">
                            <ep-input v-model="formModel.data.purchaseMode" disabled />
                          </ep-form-item>
                          <ep-form-item label="公告类型" prop="noticeType" :span="12">
                            <ep-input v-model="formModel.data.noticeType" disabled />
                          </ep-form-item>
                          <ep-form-item label="公告标题" prop="noticeTitle">
                            <ep-input v-model="formModel.data.noticeTitle" placeholder="请输入" />
                          </ep-form-item>
                          <ep-form-item label="投标截止时间" prop="bidDeadline" :span="12">
                            <ep-date-picker v-model="formModel.data.bidDeadline" type="datetime" placeholder="请选择" />
                          </ep-form-item>
                          <ep-form-item label="允许解密时长" prop="decryptDuration" :span="12">
                            <ep-time-picker v-model="formModel.data.decryptDuration" placeholder="请选择" />
                          </ep-form-item>
                          <ep-form-item label="公告发布时间" prop="publishTime" :span="12">
                            <ep-date-picker v-model="formModel.data.publishTime" type="datetime" placeholder="请选择" />
                          </ep-form-item>
                          <ep-form-item label="答疑澄清截止时间" prop="clarifyDeadline" :span="12">
                            <ep-date-picker v-model="formModel.data.clarifyDeadline" type="datetime" placeholder="请选择" />
                          </ep-form-item>
                          <ep-form-item label="发布媒介" prop="publishMedia">
                            <ep-select v-model="formModel.data.publishMedia" :options="publishMediaOptions" multiple placeholder="请选择" />
                          </ep-form-item>
                          <ep-form-item label="投标地点" prop="bidLocation">
                            <ep-input v-model="formModel.data.bidLocation" placeholder="请输入" />
                          </ep-form-item>
                        </ep-form-layout>
                      </e-collapse-item>
                      <e-collapse-item id="2" title="资质要求">
                        <ep-form-layout :gutter="40">
                          <ep-form-item label="企业指示要求" prop="enterpriseRequirements" :span="12">
                            <ep-select v-model="formModel.data.enterpriseRequirements" :options="enterpriseRequirementsOptions" multiple placeholder="请选择" />
                          </ep-form-item>
                          <ep-form-item label="项目负责人资质要求" prop="pmQualificationRequirements" :span="12">
                            <ep-select v-model="formModel.data.pmQualificationRequirements" :options="pmQualificationOptions" multiple placeholder="请选择" />
                          </ep-form-item>
                          <ep-form-item label="其他资质条件" prop="otherQualifications">
                            <ep-input v-model="formModel.data.otherQualifications" type="textarea" :rows="4" placeholder="请输入" />
                          </ep-form-item>
                        </ep-form-layout>
                      </e-collapse-item>
                    </e-collapse>
                  </ep-form>
                </div>
              </template>
              <template #right>
                <ep-form class="eui-form" filled>
                  <e-collapse v-model="activeItems" :show-arrow="false">
                    <e-collapse-item id="1" title="采购项目信息">
                      <ep-form-item label="项目编号">
                        <e-output :value="projectInfoModel.data.projectCode" />
                      </ep-form-item>
                      <ep-form-item label="项目名称">
                        <e-output :value="projectInfoModel.data.projectName" />
                      </ep-form-item>
                      <ep-form-item label="采购人">
                        <e-output :value="projectInfoModel.data.purchaser" />
                      </ep-form-item>
                      <ep-form-item label="采购联系人姓名">
                        <e-output :value="projectInfoModel.data.contactName" />
                      </ep-form-item>
                      <ep-form-item label="采购联系人电话">
                        <e-output :value="projectInfoModel.data.contactPhone" />
                      </ep-form-item>
                    </e-collapse-item>
                    <e-collapse-item id="2" title="标段（包）信息">
                      <e-checkbox-group v-model="selectedLots" class="lot-checkbox-group">
                        <e-checkbox v-for="(lot, index) in projectInfoModel.data.lots" class="mb-l w-full" :key="index" :label="lot.name" :value="index" :title="lot.name" border />
                      </e-checkbox-group>
                    </e-collapse-item>
                  </e-collapse>
                </ep-form>
              </template>
            </ep-layout-manager>
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

    <template #right>
      <e-anchor class="ml-xl" collapsible :target="target" :offset="offset" :tags="tags" />
    </template>
  </ep-layout-manager>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue';
import { EpLayoutManager, Hooks, Utils } from '@epframe/eui-core';
import { EMessage } from '@epoint-fe/eui-components';
import { ArrowDown, ArrowUp } from '@epoint-fe/eui-icons';

// 页面布局配置
const layoutRightConfig = {
  defaultWidth: 'fit-content',
  contentClass: 'eui-right-section',
  showDivider: false
};
const layoutBottomConfig = {
  inset: true,
  contentClass: 'eui-bottom-section'
};
const mainLayoutRightConfig = {
  defaultWidth: '30%'
};

const { createSubModel, defineDataModel, request } = Utils;
const { useValidation } = Hooks;
const { validate } = useValidation();

const activeItems = ref(['1', '2']);
const activeItemsLeft = ref(['1', '2']);
const tags = ref(['.e-collapse-item__title']);
const contentRef = ref(null);
const target = computed(() => contentRef.value?.wrapRef);
const formRef = ref(null);
const offset = ref(70);

const publishMediaOptions = [
  { label: '江苏招投标网', value: 'jiangsu' },
  { label: '中国招投标网', value: 'china' },
  { label: '政府采购网', value: 'gov' }
];

const enterpriseRequirementsOptions = [
  { label: '综合资质甲级', value: 'classA' },
  { label: '中国招投标网', value: 'china' }
];

const pmQualificationOptions = [
  { label: '注册一级结构工程师', value: 'structure1' },
  { label: '注册一级建造师·建筑工程', value: 'construction1' }
];

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

const model = defineDataModel(() => {
  // 右侧采购项目信息数据模型
  const projectInfoModel = createSubModel(
    {
      projectCode: 'A320582000100679001',
      projectName: '苏州博物馆改建一阶段项目',
      purchaser: '苏州文化局',
      contactName: '顾博',
      contactPhone: '15895888868',
      lots: [
        { name: '苏州市综合物馆改建一阶段工程咨询评价（标段1）', active: false },
        { name: '苏州市综合物馆改建一阶段工程咨询评价（标段2）', active: true }
      ]
    },
    {
      refresh: async () => {
        return await request({
          url: `/showcase/f10-demo/horizontal-inner/project-info`
        });
      }
    }
  );

  // 左侧表单数据模型
  const formModel = createSubModel(
    {
      purchaseMode: 'open',
      noticeType: 'bid',
      noticeTitle: '',
      bidDeadline: undefined,
      decryptDuration: undefined,
      publishTime: undefined,
      clarifyDeadline: undefined,
      publishMedia: ['jiangsu', 'china'],
      bidLocation: '',
      enterpriseRequirements: ['classA', 'china'],
      pmQualificationRequirements: ['structure1', 'construction1'],
      otherQualifications: ''
    },
    {
      refresh: async () => {
        return await request({
          url: `/showcase/f10-demo/horizontal-inner/form`
        });
      },
      saveForm: async ({ formData }) => {
        return await request({
          url: `/showcase/f10-demo/horizontal-inner/form`,
          data: {
            entities: [formData],
            type: 'saveForm'
          }
        });
      },
      submitForm: async ({ formData }) => {
        return await request({
          url: `/showcase/f10-demo/horizontal-inner/form`,
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
    models: { formModel, projectInfoModel }
  };
});

const { formModel, projectInfoModel } = model;

const selectedLots = computed({
  get() {
    return (projectInfoModel.data.lots ?? []).reduce((acc, lot, index) => {
      if (lot.active) acc.push(index);
      return acc;
    }, []);
  },
  set(selected) {
    projectInfoModel.data.lots.forEach((lot, index) => {
      lot.active = selected.includes(index);
    });
  }
});

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

<style scoped lang="scss"></style>
