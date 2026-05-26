<template>
  <side-layout
    :specific="isSpecific"
    :tags="tags"
    :anchor-extra-nodes="anchorExtraNodes"
    :comment-config="commentConfig"
    :approve-history-config="approveHistoryConfig"
    @change-layout="changeLayout"
    @active-change="handleActiveChange"
    @type-change="handleTypeChange"
  >
    <template #content>
      <e-collapse v-model="activeItem" :show-nav="showNav" nav-affix :nav-offset="55" :nav-affix-offset="55">
        <e-collapse-item id="1" title="申请信息">
          <ep-form ref="ruleFormRef" :model="formModel.data" :rules="rules" label-position="top" :bordered="false">
            <e-row :gutter="40">
              <e-col :span="12">
                <ep-form-item label="接收人">
                  <ep-select v-model="formModel.data.name" :options="model.recipientList.data" multiple placeholder="请选择" />
                </ep-form-item>
              </e-col>
              <e-col :span="12">
                <ep-form-item label="创建时间">
                  <ep-date-picker v-model="formModel.data.createDate" type="date" label="选择日期" placeholder="选择日期" />
                </ep-form-item>
              </e-col>
            </e-row>
            <ep-form-item label="物品信息" required props="goodsName">
              <ep-input v-model="formModel.data.goodsName" placeholder="请输入" />
            </ep-form-item>

            <e-row :gutter="40">
              <e-col :span="12">
                <ep-form-item label="老电脑使用年限">
                  <ep-input v-model="formModel.data.limitYear" />
                </ep-form-item>
              </e-col>
              <e-col :span="12">
                <ep-form-item label="创建时间">
                  <ep-date-picker v-model="formModel.data.oldCreateDate" type="date" label="选择日期" placeholder="选择日期" />
                </ep-form-item>
              </e-col>
            </e-row>
          </ep-form>
        </e-collapse-item>
        <e-collapse-item id="2" title="采购信息">
          <div>
            <ep-data-grid
              ref="tableRef"
              :id-field="model.gridList.idField"
              :data="model.gridList.data"
              :total="model.gridList.total"
              :current="model.gridList.current"
              :page-size="model.gridList.pageSize"
              :columns="columnList"
              :loading="model.gridList.loading"
              v-model:selectedRowKeys="model.selectedRowKeys"
              show-index-column
              show-selection-column
              default-show-index
              :pagination="true"
              auto-height
              @change="model.gridList.change"
              @refresh="model.gridList.refresh"
              configurable
              config-id="datagrid"
              :key="tableKey"
            >
              <template #bodyCell="{ column, text, record }">
                <template v-if="column.dataIndex === 'workplace'">
                  {{ renderText(text, model.workplaceList.data) }}
                </template>
                <template v-if="column.dataIndex === 'principal'">
                  {{ renderText(text, model.principalList.data) }}
                </template>
                <template v-if="column.dataIndex === 'certification'">
                  {{ renderText(text, model.certificationList.data) }}
                </template>
                <template v-if="column.dataIndex === 'file'">
                  <e-upload v-model:file-list="record.file" enable-preview="true" :show-action="false" :show-file-status="false" :enable-delete="false" />
                </template>
              </template>
            </ep-data-grid>
          </div>
        </e-collapse-item>
      </e-collapse>
    </template>
    <template #footer>
      <workflow-opinion-write
        :data="pageConfig.workflow"
        :pvi-guid="pviGuid"
        :work-item-guid="workItemGuid"
        :handle-type="handleType"
        :form-data="formDataForWorkflow"
        :custom-params="customParamsForWorkflow"
        :form-ref-list="formRefList"
        :show-mode="showMode"
        @init="initPage"
        @saved="frozenForm"
        @close="closePage"
        @attach-change="attachChange"
      />
    </template>
  </side-layout>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { Utils, Hooks, EpDataGrid } from '@epframe/eui-core';
import { useRoute, useRouter } from 'vue-router';
import { logger } from '@epoint-fe/utils';
import sideLayout from './components/side-layout';
import { workflowOpinionWrite } from '@epframe/epoint-workflow-vue';

const { createSubModel, request, PageConfig } = Utils;
const { useListModel, useTableModel, useValidation } = Hooks;

const props = defineProps({
  ouGuid: { type: String, default: '' }
});

const emits = defineEmits(['save', 'cancel']);

const PROCESS_GUID = 'ac7de324-ce86-48f2-b773-18dc35ce04ef';

const route = useRoute();
const router = useRouter();

const ruleFormRef = ref(null);
const tableRef = ref(null);

const tags = ref(['.e-collapse-item__title']);
const activeItem = ref(['1', '2']);
const showNav = ref(false);
const isSpecific = ref(true);
const isDialogOpen = ref(false);

const pviGuid = ref(route.query.ProcessVersionInstanceGuid || PROCESS_GUID);
const workItemGuid = ref(route.query.WorkItemGuid || '');
const handleType = ref(route.query.handletype || '');
const showMode = ref(route.query.showmode || '');
const tableKey = ref(0);
const columnList = ref();

const anchorExtraNodes = ref([
  {
    id: 'communication',
    name: '沟通交流',
    level: 0
  },
  {
    id: 'approveHistory',
    name: '审批记录',
    level: 0
  }
]);

const pageConfig = new PageConfig({
  variableCategory: ['soa'],
  framevariable: {},
  workflow: {
    httpAction: 'showcase/f10-demo/workflowcommoncontroller/',
    formAction: 'v1/showcase/f10-demo/frameuserworkflow/',
    fileUploadAction: 'https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile',
    processGuid: PROCESS_GUID,
    pviGuid: '',
    stepName: '',
    opinion: ''
  }
});

const rules = {
  goodsName: [
    {
      required: false,
      trigger: 'blur'
    }
  ]
};

const { validate } = useValidation();
const formDataForWorkflow = ref({});
const formRefList = computed(() => [ruleFormRef.value]);
const commentConfig = computed(() => {
  return {
    httpAction: 'rest/v1/showcase/f10-demo/comment',
    fileUploadAction: 'https://fe.epoint.com.cn/mock/752/eui-vue/uploadFile',
    pageId: pviGuid.value
  };
});
const approveHistoryConfig = computed(() => {
  return {
    httpAction: 'rest/v1/showcase/f10-demo/workflowcommoncontroller',
    flowChartWidth: 1152,
    pviGuid: pviGuid.value,
    workItemGuid: ''
  };
});

const customParamsForWorkflow = computed(() => {
  return {
    userguid: ''
  };
});

const model = Utils.defineDataModel(() => {
  const ouGuid = ref(null);
  const selectedRowKeys = ref([]);
  const searchParams = createSubModel(
    {
      logicOperator: 'and',
      conditions: []
    },
    {
      update: (params) => {
        searchParams.data.conditions = params.conditions;
        searchParams.data.logicOperator = params.logicOperator;
      }
    }
  );

  const workplaceList = useListModel('/showcase/f10-demo/workplaceList', {
    labelField: 'label',
    lazy: false
  });

  const principalList = useListModel('/showcase/f10-demo/principalList', {
    labelField: 'label',
    lazy: false
  });

  const certificationList = useListModel('/showcase/f10-demo/dynamicList', {
    labelField: 'label',
    lazy: false
  });

  const recipientList = useListModel('/showcase/f10-demo/recipientList', {
    labelField: 'label',
    lazy: false
  });

  const gridList = useTableModel('/showcase/f10-demo/purcharseInfoGrid', {
    idField: 'id',
    requestType: 'restful',
    lazy: true,
    params: computed(() => {
      return {
        ...searchParams.data,
        extendConditions: [
          {
            path: 'ouguid',
            type: ouGuid.value ? 'EQ' : 'NQ',
            value: ouGuid.value
          }
        ]
      };
    })
  });

  const formModel = createSubModel(
    {},
    {
      refresh: async () => {
        return request({
          url: `/showcase/f10-demo/applyInfoForm`,
          data: {}
        });
      },
      submitForm: async ({ type }) => {
        return request({
          url: `/showcase/f10-demo/baseFormSave`,
          data: {
            entities: [formModel.data],
            customParams: {},
            type
          }
        });
      },
      lazy: true
    }
  );

  const securityConfig = {};

  const dynamicGridSubmit = async ({ type, newData }) => {
    return request({
      url: '/showcase/f10-demo/dynamicGridSave',
      data: {
        entities: [newData],
        customParams: {
          ouGuid: ouGuid.value
        },
        type
      }
    });
  };

  const saveAll = async ({ type }) => {
    const isValid = await validate(ruleFormRef);
    const edited = tableRef.value?.getChanges();
    if (!isValid) return;

    return Promise.all([formModel.submitForm({ type }), dynamicGridSubmit({ type, newData: edited })]);
  };

  return {
    global: { pageConfig, securityConfig },
    models: {
      ouGuid,
      searchParams,
      selectedRowKeys,
      workplaceList,
      principalList,
      certificationList,
      recipientList,
      gridList,
      formModel,
      saveAll
    }
  };
});

const { formModel } = model;

const renderText = (value, data) => {
  const node = data.find((item) => item.value === value);
  return node ? node.label : value;
};

const changeLayout = () => {
  isSpecific.value = !isSpecific.value;
};

const initPage = async () => {};

const frozenForm = (saveData) => {
  logger.debug('[入库返回]:', saveData);
};

const closePage = () => {
  emits('save');
  if (isDialogOpen.value) {
    emits('cancel');
  } else if (window.close) {
    window.close();
  } else {
    router.back();
  }
};

const handleActiveChange = () => {};

const handleTypeChange = () => {};

const attachChange = (fileList) => {
  logger.debug('附件变化', fileList);
};

model.methods.registerHook('onAfterInitData', () => {
  columnList.value = [
    {
      title: '单位',
      dataIndex: 'workplace',
      width: 192,
      ellipsis: true,
      sorter: false,
      editor: {
        component: 'e-select',
        props: {
          placeholder: '请选择',
          multiple: false,
          options: model.workplaceList.data
        },
        rules: [{ type: 'string' }]
      }
    },
    {
      title: '负责人',
      dataIndex: 'principal',
      width: 120,
      ellipsis: true,
      sorter: false,
      editor: {
        component: 'e-select',
        props: {
          placeholder: '请选择',
          multiple: false,
          options: model.principalList.data
        },
        rules: [{ type: 'string' }]
      }
    },
    {
      title: '联系方式',
      dataIndex: 'linkType',
      width: 150,
      ellipsis: true,
      sorter: false,
      editor: {
        component: 'e-input',
        props: {
          placeholder: '请输入'
        },
        rules: [{ type: 'phone' }]
      }
    },
    {
      title: '资质',
      dataIndex: 'certification',
      ellipsis: true,
      sorter: false,
      editor: {
        component: 'e-select',
        props: {
          placeholder: '请选择',
          multiple: false,
          options: model.certificationList.data
        },
        rules: []
      }
    },
    {
      title: '商品信息',
      dataIndex: 'merchandise',
      ellipsis: true,
      sorter: false,
      editor: {
        component: 'e-input',
        props: {
          placeholder: '请输入'
        },
        rules: [{ type: 'string' }]
      }
    },
    {
      title: '报价',
      dataIndex: 'quotedPrice',
      width: 120,
      ellipsis: true,
      sorter: false,
      editor: {
        component: 'e-input',
        props: {
          placeholder: '请输入'
        },
        rules: [{ type: 'float' }]
      }
    },
    {
      title: '单价',
      dataIndex: 'unitPrice',
      width: 110,
      ellipsis: true,
      sorter: false,
      editor: {
        component: 'e-input',
        props: {
          placeholder: '请输入'
        },
        rules: [{ type: 'float' }]
      }
    },
    {
      title: '明细单(附件)',
      dataIndex: 'file',
      width: 228,
      ellipsis: true,
      sorter: false
    },
    {
      dataIndex: 'action',
      title: '操作',
      width: 65,
      key: 'action',
      action: {
        asText: true,
        items: [
          {
            label: '删除',
            type: 'danger',
            onClick: (row) => {
              tableRef.value.deleteRow(row);
            }
          }
        ]
      }
    }
  ];
});

const setOuGuid = (val) => {
  model.ouGuid = val;
  model.formModel.refresh();
};

watch(
  () => formModel.data,
  () => {
    formDataForWorkflow.value = ruleFormRef.value?.getCleanData() || {};
  },
  {
    immediate: true,
    deep: true
  }
);

watch(
  () => props.ouGuid,
  (newVal) => {
    setOuGuid(newVal);
  },
  { immediate: true }
);

onMounted(() => {
  model.methods.initData();
});
</script>
