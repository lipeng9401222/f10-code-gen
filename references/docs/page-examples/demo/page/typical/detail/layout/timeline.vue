<template>
  <div class="eui-page" v-loading="model.global.state.loading">
    <e-scrollbar class="eui-main-section">
      <ep-form
        ref="formRef"
        class="eui-form"
        :model="formModel.data"
        :security-config="model.global.securityConfig"
        :attach-rules="model.global.securityConfig.attach"
        :validate-on-rule-change="model.global.state.validateOnRuleChange"
      >
        <e-collapse v-model="activeItems" :show-nav="false" :scrollbar-option="{ visible: true }">
          <e-collapse-item id="datagrid-edit-base" title="申请人信息">
            <ep-form-layout :gutter="40">
              <ep-form-item label="申请人" prop="proposer" :span="12">
                <ep-input v-model="formModel.data.proposer" placeholder="请输入" />
              </ep-form-item>

              <ep-form-item label="申请时间" prop="applicationTime" :span="12">
                <e-date-picker v-model="formModel.data.applicationTime" type="datetime" placeholder="请选择" format="YYYY-MM-DD HH:mm" />
              </ep-form-item>
            </ep-form-layout>
            <ep-form-item label="备注说明" prop="descr">
              <ep-input v-model="formModel.data.descr" type="textarea" :rows="3" placeholder="请输入" />
            </ep-form-item>
          </e-collapse-item>
          <e-collapse-item id="datagrid-edit-other" title="回复信息">
            <e-timeline>
              <e-timeline-item v-for="(item, key) in model.gridList.data.data" :key="'timeline-' + key" hide-timestamp :type="item.state === 1 ? 'primary' : item.state === 2 ? 'success' : ''">
                <div class="leading-base text-base text-primary fw-md mb-m">{{ item.type }}</div>
                <ul class="flex justify-start flex-col gap-m">
                  <li v-for="(infoItem, infoKey) in item.data" :key="'info-' + infoKey" class="flex justify-start py-xs">
                    <e-avatar size="default" :src="infoItem.portrait" />

                    <div class="ml-l">
                      <div class="flex justify-start items-center mb-s">
                        <span class="leading-base text-base text-primary mr-m">{{ infoItem.name }}</span>
                        <span class="leading-sm text-sm text-third">{{ infoItem.date }}</span>
                      </div>
                      <div class="flex justify-start items-center">
                        <span class="leading-base text-base" :class="infoItem.state === 1 ? 'text-brand' : infoItem.state === 2 ? 'text-success' : 'text-danger'">[{{ infoItem.stateText }}]</span>
                        <span class="leading-base text-base text-primary">{{ infoItem.stateExplain }}</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </e-timeline-item>
            </e-timeline>
          </e-collapse-item>
        </e-collapse>
      </ep-form>
    </e-scrollbar>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Utils, Hooks } from '@epframe/eui-core';

defineOptions({
  name: 'Timeline'
});

const { PageConfig, createSubModel, request } = Utils;
const { useValidation } = Hooks;

// 页面配置模型
const pageConfig = new PageConfig({});

// 表单验证
const { validate } = useValidation();

// 定义数据模型
const model = Utils.defineDataModel(() => {
  const condition = ref(null); // 组织

  // 其他信息表单模型
  const formModel = createSubModel(
    {},
    {
      // 刷新表单数据
      refresh: async () => {
        // 请求表单数据
        const formData = await request({
          url: `/showcase/f10-demo/detailTimelineForm`,
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
        return formData;
      },
      // 更新保存表单数据
      submitForm: async ({ type }) => {
        // 请求保存表单数据
        return await request({
          url: `/showcase/f10-demo/detailTimelineFormSave`,
          data: {
            entities: [formModel.data], // 表单数据
            customParams: {
              condition: condition.value // 组织节点 GUID
            },
            type: type
          }
        });
      },
      lazy: false // 懒加载，只有调用 refresh 方法时才会请求数据
    }
  );

  // 给 initSecurityConfig 请求的 securityConfigParams 参数
  const securityConfig = { apiUrl: 'rest/announcement/addAnnouncement' };

  // 数据模型
  const gridList = createSubModel(
    {
      data: []
    },
    {
      // 刷新表单数据
      refresh: async () => {
        // 请求表单数据
        const listData = await request({
          url: `/showcase/f10-demo/detailTimeline`,
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

  return {
    global: { pageConfig, securityConfig }, // 全局模型
    models: {
      condition, // 组织节点 GUID
      formModel, // 表单模型
      gridList
    }
  };
});

const { formModel } = model;

// 定义表单引用
const formRef = ref(null);

// 默认展开所有项
const activeItems = ref(['datagrid-edit-base', 'datagrid-edit-other']);

// 初始化数据
onMounted(() => {
  model.methods.initData();
});
</script>

<style lang="scss" scoped></style>
