<template>
  <ep-layout-manager
    class="eui-page"
    v-loading="model.global.state.loading"
    :top-config="{
      contentClass: 'eui-top-section',
      showDivider: false
    }"
    :bottom-config="{ contentClass: 'eui-bottom-section' }"
  >
    <template #main>
      <div class="eui-main-section bg-transparent rounded-t">
        <e-scrollbar>
          <ep-form
            ref="formRef"
            class="eui-form"
            :model="formModel.data"
            :security-config="model.global.securityConfig"
            :validate-on-rule-change="model.global.state.validateOnRuleChange"
            label-position="top"
          >
            <e-collapse v-model="activeItems" :show-nav="false" :show-arrow="false" @change="collapseChange">
              <e-collapse-item id="1" title="申请信息" class="eui-sub-section eui-sub-form">
                <ep-form-layout :gutter="40">
                  <ep-form-item label="接收人" prop="recipient" :span="12">
                    <e-select v-model="formModel.data.recipient" placeholder="请选择" :options="model.principalList.data" />
                  </ep-form-item>
                  <ep-form-item label="创建时间" prop="createTime" :span="12">
                    <ep-date-picker v-model="formModel.data.createTime" type="datetime" placeholder="选择日期时间" />
                  </ep-form-item>
                  <ep-form-item label="物品信息" prop="itemInfo">
                    <ep-input v-model="formModel.data.itemInfo" placeholder="请输入" />
                  </ep-form-item>
                  <ep-form-item label="老电脑使用年限" prop="lifeUsed" :span="12">
                    <e-select v-model="formModel.data.lifeUsed" placeholder="请选择" :options="model.useTimeList.data" />
                  </ep-form-item>
                  <ep-form-item label="初次使用时间" prop="useTime" :span="12">
                    <ep-date-picker v-model="formModel.data.useTime" type="datetime" placeholder="选择日期时间" />
                  </ep-form-item>
                </ep-form-layout>
              </e-collapse-item>
              <e-collapse-item id="2" title="采购信息" class="eui-sub-section eui-sub-form">
                <ep-data-grid
                  ref="purchaseTableRef"
                  :id-field="model.purchaseGrid.idField"
                  :data="model.purchaseGrid.data"
                  :total="model.purchaseGrid.total"
                  :current="model.purchaseGrid.current"
                  :page-size="model.purchaseGrid.pageSize"
                  :show-total="(total) => `共${total}条数据`"
                  :columns="purchaseColumnList"
                  :loading="model.purchaseGrid.loading"
                  v-model:selectedRowKeys="model.purchaseSelectedRowKeys"
                  show-index-column
                  show-selection-column
                  default-show-index
                  auto-height
                  :cell-editable="false"
                  @change="model.purchaseGrid.change"
                  @refresh="model.purchaseGrid.refresh"
                  configurable
                  config-id="purchase-grid"
                  :key="purchaseTableKey"
                >
                  <template #bodyCell="{ column, text, record }">
                    <template v-if="column.dataIndex === 'principal'">
                      {{ renderText(text, model.principalList.data) }}
                    </template>
                    <template v-if="column.dataIndex === 'certification'">
                      {{ renderText(text, model.certificationList.data) }}
                    </template>
                    <template v-if="column.dataIndex === 'file'">
                      <!-- TODO: 页面样例待优化: 组件使用错误 -->
                      <e-upload
                        v-model:file-list="record.file"
                        class="eui-list-upload"
                        :class="{ edit: record.isEdit, has: record.file && record.file.length }"
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                        enable-preview="true"
                        multiple
                        :enable-add="record.isEdit ? true : false"
                        :enable-delete="record.isEdit ? true : false"
                        :limit="3"
                        :data="[record.id]"
                        :on-exceed="handleUploadExceed"
                      >
                        <e-button type="primary" :icon="Upload" text>上传附件</e-button>
                      </e-upload>
                    </template>
                  </template>
                </ep-data-grid>
              </e-collapse-item>
              <e-collapse-item id="3" title="名下设备信息" class="eui-sub-section rounded-t eui-sub-form">
                <ep-data-grid
                  ref="deviceTableRef"
                  :id-field="model.deviceGrid.idField"
                  :data="model.deviceGrid.data"
                  :total="model.deviceGrid.total"
                  :current="model.deviceGrid.current"
                  :page-size="model.deviceGrid.pageSize"
                  :show-total="(total) => `共${total}条数据`"
                  :columns="deviceColumnList"
                  :loading="model.deviceGrid.loading"
                  show-index-column
                  default-show-index
                  auto-height
                  @change="model.deviceGrid.change"
                  @refresh="model.deviceGrid.refresh"
                  configurable
                  config-id="device-grid"
                  :key="deviceTableKey"
                >
                  <template #bodyCell="{ column, text, record }">
                    <template v-if="column.dataIndex === 'certification'">
                      {{ renderText(text, model.certificationList.data) }}
                    </template>
                    <template v-if="column.dataIndex === 'file'">
                      <e-upload
                        v-model:file-list="record.file"
                        class="eui-list-upload"
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                        enable-preview="true"
                        multiple
                        :enable-add="record.isEdit ? true : false"
                        :enable-delete="record.isEdit ? true : false"
                        :limit="3"
                        :data="[record.id]"
                        :on-exceed="handleUploadExceed"
                      >
                        <e-button type="primary" :icon="Upload" text>上传附件</e-button>
                      </e-upload>
                    </template>
                  </template>
                </ep-data-grid>
              </e-collapse-item>
            </e-collapse>
          </ep-form>
        </e-scrollbar>
      </div>
    </template>
    <template #bottom>
      <e-toolbar button-position="right">
        <template #button>
          <e-toolbar-btns ref="footerBtnsRef" :items="footerBtnList" />
        </template>
      </e-toolbar>
    </template>
  </ep-layout-manager>
</template>

<script setup>
import { ref, computed, onMounted, watch, onActivated } from 'vue';
import { EpDataGrid, Utils, Hooks } from '@epframe/eui-core';
import { Upload } from '@epoint-fe/eui-icons';
import { EMessage, EMessageBox } from '@epoint-fe/eui-components';

defineOptions({
  name: 'SectionVertical'
});

const { createSubModel, request, uuid } = Utils;
const { useValidation, useListModel, useTableModel } = Hooks;

// 定义 props传参
const props = defineProps({
  guid: { type: String, default: '' } // GUID
});

// 表单验证
const { validate } = useValidation();

// 表单引用
const formRef = ref(null);
// 折叠面板展开项
const activeItems = ref(['1', '2', '3']);

// 定义数据模型
const model = Utils.defineDataModel(() => {
  const guid = ref(null); // 节点 GUID
  // 采购信息表格选中行
  const purchaseSelectedRowKeys = ref([]);
  // 页面搜索条件 创建普通子模型
  const searchParams = createSubModel(
    {
      logicOperator: 'and', // 逻辑操作符
      conditions: [] // 搜索条件
    },
    {
      update: (params) => {
        searchParams.data.conditions = params.conditions; // 更新搜索条件
        searchParams.data.logicOperator = params.logicOperator; // 更新逻辑操作符
      }
    }
  );

  // 接收人下拉列表
  const principalList = useListModel('/showcase/f10/typical/form/layout/section-vertical/principalList', {
    labelField: 'label', // 显示文本字段
    lazy: false // 懒加载
  });

  // 老电脑使用年限下拉列表
  const useTimeList = useListModel('/showcase/f10/typical/form/layout/section-vertical/useTimeList', {
    labelField: 'label',
    lazy: false
  });

  // 资质下拉列表
  const certificationList = useListModel('/showcase/f10/typical/form/layout/section-vertical/certification', {
    labelField: 'label',
    lazy: false
  });

  // 申请信息表单模型
  const formModel = createSubModel(
    {
      // 以下为字段默认值，可为空
      recipient: '',
      createTime: '',
      itemInfo: '',
      lifeUsed: '',
      useTime: ''
    },
    {
      refresh: async () => {
        const formData = await request({
          url: '/showcase/f10/typical/form/layout/section-vertical/form',
          data: {
            // 查询条件
            conditions: [
              {
                path: 'guid', //  GUID
                type: 'EQ', // 等于
                value: guid.value // GUID 值
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
          url: `/showcase/f10/typical/form/layout/section-vertical/form-save`,
          data: {
            entities: [formModel.data], // 表单数据
            customParams: {
              guid: guid.value // GUID
            },
            type: type
          }
        });
      },
      lazy: true // 懒加载，只有调用 refresh 方法时才会请求数据
    }
  );

  // 采购信息表格模型
  const purchaseGrid = useTableModel('/showcase/f10/typical/form/layout/section-vertical/purchase-grid', {
    idField: 'id',
    requestType: 'restful',
    lazy: true, // 懒加载
    params: computed(() => {
      return {
        ...searchParams.data,
        extendConditions: [
          {
            path: 'guid',
            type: guid.value ? 'EQ' : 'NQ',
            value: guid.value
          }
        ]
      };
    })
  });

  // 名下设备信息表格模型
  const deviceGrid = useTableModel('/showcase/f10/typical/form/layout/section-vertical/device-grid', {
    idField: 'id',
    requestType: 'restful',
    lazy: true, // 懒加载
    params: computed(() => {
      return {
        ...searchParams.data,
        extendConditions: [
          {
            path: 'guid',
            type: guid.value ? 'EQ' : 'NQ',
            value: guid.value
          }
        ]
      };
    })
  });

  // 安全配置
  const securityConfig = {};

  // 保存列表
  const deviceGridSubmit = async ({ type, newData }) => {
    return await request({
      url: '/showcase/f10/typical/form/layout/section-vertical/device-grid-save',
      data: {
        entities: [newData], // 列表数据
        customParams: {
          guid: guid.value // GUID
        },
        type: type
      }
    });
  };

  // 保存-提交
  const saveAll = async ({ type }) => {
    const isValid = await validate(formRef);
    const edited = purchaseTableRef.value?.getChanges();
    if (!isValid) {
      return Promise.reject({ message: '表单验证未通过！' });
    }

    const isEditing = purchaseTableRef.value?.isEditing();
    if (isEditing) {
      EMessage({
        message: '请先保存正在编辑的行！',
        type: 'error'
      });
      return Promise.reject({ message: '请先保存正在编辑的行！' });
    }

    // 请求更新表单数据
    return Promise.all([formModel.submitForm({ type }), deviceGridSubmit({ type, newData: edited })]);
  };

  return {
    global: { securityConfig },
    models: {
      guid, // GUID
      purchaseSelectedRowKeys, // 采购信息表格选中行 ID 列表
      searchParams, // 采购信息表格 搜索条件
      principalList, // 接收人下拉列表
      useTimeList, // 使用年限下拉列表
      certificationList, // 资质下拉列表
      formModel, // 表单模型
      purchaseGrid, // 采购信息表格
      deviceGrid, // 名下设备信息表格
      saveAll
    }
  };
});

const { formModel } = model;

// 解决第二次进入页面表格样式错乱的问题，根源是 keep-alive缓存列宽不会重新计算导致的
const purchaseTableKey = ref(0);
const deviceTableKey = ref(0);

// 表格引用
const purchaseTableRef = ref(null);
const deviceTableRef = ref(null);

// 采购信息表格列配置
const purchaseColumnList = ref([]);
const nodeList = ref({});

// 名下设备信息表格列配置
const deviceColumnList = [
  {
    title: '设备信息',
    dataIndex: 'deviceInfo',
    ellipsis: true,
    sorter: false
  },
  {
    title: '申请时间',
    dataIndex: 'applyTime',
    width: 180,
    ellipsis: true,
    sorter: false
  },
  {
    title: '单位',
    dataIndex: 'company',
    width: 200,
    ellipsis: true,
    sorter: false
  },
  {
    title: '资质',
    dataIndex: 'certification',
    width: 120,
    ellipsis: true,
    sorter: false
  },
  {
    title: '联系方式',
    dataIndex: 'linkType',
    width: 150,
    ellipsis: true,
    sorter: false
  },
  {
    title: '单价',
    dataIndex: 'unitPrice',
    width: 110,
    ellipsis: true,
    sorter: false
  },
  {
    title: '附件',
    dataIndex: 'file',
    width: 180,
    ellipsis: true,
    sorter: false
  }
];

// 表格单元格文本转换
const renderText = (value, data) => {
  const node = data.find((item) => item.value === value);
  return node ? node.label : value;
};

// 是否选中采购信息数据
const isPurchaseSelected = computed(() => model.purchaseSelectedRowKeys.length);

// 工具栏搜索相关方法
const toolbarSearchRef = ref(null);

// 搜索操作符列表
const operationsList = [
  {
    label: '等于',
    type: 'input',
    value: 'EQ'
  },
  {
    label: '不等于',
    type: 'input',
    value: 'NQ'
  },
  {
    label: '等于空',
    type: 'none',
    value: 'EQBLANK'
  },
  {
    label: '不等于空',
    type: 'none',
    value: 'NQBLANK'
  },
  {
    label: '模糊匹配',
    type: 'input',
    value: 'LIKE'
  },
  {
    label: '模糊匹配（排除）',
    type: 'input',
    value: 'NOTLIKE'
  },
  {
    label: '以...开头',
    type: 'input',
    value: 'LEFTLIKE'
  },
  {
    label: '以...结尾',
    type: 'input',
    value: 'RIGHTLIKE'
  },
  {
    label: '包含',
    type: 'multiSelect',
    value: 'IN'
  },
  {
    label: '不包含',
    type: 'multiSelect',
    value: 'NOTIN'
  }
];

// 添加采购信息
const handleAddPurchase = () => {
  const record = { ...nodeList.value };
  record[model.purchaseGrid.idField] = uuid();
  purchaseTableRef.value?.addRow({
    record: record,
    position: 'top',
    editable: true
  });
};

// 删除采购信息
const handleDeletePurchase = () => {
  EMessageBox.confirm('此操作将永久删除选中记录, 是否继续?', '警告', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    callback: (action) => {
      if (action === 'confirm') {
        const data = model.purchaseGrid.data.filter((item) => model.purchaseSelectedRowKeys.includes(item.id));
        purchaseTableRef.value?.deleteRow(data);
      }
    }
  });
};

// 上传相关方法
const handleUploadExceed = (file, uploadFiles) => {
  EMessage({
    message: '超出上传个数限制！',
    type: 'warning'
  });
};

// 初始化表格列配置
model.methods.registerHook('onAfterInitData', () => {
  // 针对动态添加的列表必须放到这里面，否则新添加的行获取不到下拉列表的选项
  // 采购信息表格列
  purchaseColumnList.value = [
    {
      title: '单位',
      dataIndex: 'workplace',
      width: 192,
      ellipsis: true, // 内容过长显示省略号
      sorter: false, // 是否启用排序功能
      editor: {
        component: 'e-input',
        props: {
          placeholder: '单位'
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
          placeholder: '负责人',
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
          placeholder: '联系方式'
        },
        rules: [{ type: 'phone' }]
      }
    },
    {
      title: '资质',
      dataIndex: 'certification',
      width: 120,
      ellipsis: true,
      sorter: false,
      editor: {
        component: 'e-select',
        props: {
          placeholder: '资质',
          multiple: false,
          options: model.certificationList.data
        },
        rules: []
      }
    },
    {
      title: '商品信息',
      dataIndex: 'merchandise',
      width: 180,
      ellipsis: true,
      sorter: false,
      editor: {
        component: 'e-input',
        props: {
          placeholder: '商品信息'
        },
        rules: [{ type: 'string' }]
      }
    },
    {
      title: '报价',
      dataIndex: 'quotedPrice',
      width: 110,
      ellipsis: true,
      sorter: false,
      editor: {
        component: 'e-input-number',
        props: {
          placeholder: '报价',
          precision: 2,
          step: 0.01
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
        component: 'e-input-number',
        props: {
          placeholder: '单价',
          precision: 2,
          step: 0.01
        },
        rules: [{ type: 'float' }]
      }
    },
    {
      title: '明细单(附件)',
      dataIndex: 'file',
      width: 180,
      ellipsis: true,
      sorter: false
    },
    {
      align: 'center',
      dataIndex: 'action',
      title: '操作',
      width: 120,
      key: 'action',
      hidden: false,
      action: {
        asText: true, // 是否以文本形式展示操作项，默认值为 false
        defaultShowItems: 4, // 默认展示的操作项数量，默认值为 4
        maxCollapse: 4, // 最多显示的按钮数量，其余按钮将被折叠
        // 操作项列表
        items: [
          {
            // 操作项的图标，可选值为组件库中的图标名字
            icon: '',
            // 操作项的文本标签
            label: '编辑',
            // 操作项的点击事件处理函数
            onClick: (row) => {
              row.isEdit = true;
              // 开始行编辑
              purchaseTableRef.value.beginEditRow(row);
            },
            // 操作项是否可见的判断函数
            visible: (params) => !params.isRowEditing,
            // 操作项是否禁用的判断函数
            disabled: () => false
          },
          {
            icon: '',
            label: '保存',
            onClick: (row) => {
              row.isEdit = false;
              // 提交行编辑
              purchaseTableRef.value.commitEditRow(row);
            },
            visible: (params) => params.isRowEditing,
            disabled: () => false
          },
          {
            icon: '',
            label: '取消',
            onClick: (row) => {
              row.isEdit = false;
              // 取消行编辑
              purchaseTableRef.value.cancelEditRow(row);
            },
            visible: (params) => params.isRowEditing,
            disabled: () => false
          },
          {
            icon: '',
            label: '删除',
            onClick: (row) => {
              EMessageBox.confirm('此操作将永久删除该记录, 是否继续?', '警告', {
                type: 'warning',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                callback: (action) => {
                  if (action === 'confirm') {
                    purchaseTableRef.value.deleteRow(row);
                  }
                }
              });
            },
            visible: (params) => !params.isRowEditing,
            disabled: () => false
          }
        ]
      }
    }
  ];

  nodeList.value = {};
  // 遍历 columnList 数组
  purchaseColumnList.value.forEach((item) => {
    const key = item.dataIndex;
    if (key !== 'action') {
      nodeList.value[key] = key === 'file' ? [] : '';
    }
  });
});

// 监听组织节点 GUID 变化，刷新表单数据
watch(
  () => props.guid,
  (newVal) => {
    model.guid = newVal;
    model.formModel.refresh();
  },
  {
    deep: true,
    immediate: true
  }
);

// 折叠面板展开项变更
const collapseChange = (val) => {
  Utils.logger.info('collapseChange val=', val);
};

// 底部按钮
const footerBtnsRef = ref(null);
const footerBtnList = [
  {
    type: 'default',
    content: '暂存',
    onClick: async () => {
      model.saveAll({ type: 'save' }).then(
        (data) => {
          EMessage({
            message: '暂存成功！',
            type: 'success'
          });
        },
        (rejected) => {
          console.log('rejected=', rejected);
        }
      );
    }
  },
  {
    type: 'primary',
    content: '提交',
    onClick: async () => {
      model.saveAll({ type: 'submit' }).then(
        (data) => {
          EMessage({
            message: '提交成功！',
            type: 'success'
          });
        },
        (rejected) => {
          console.log('rejected=', rejected);
        }
      );
    }
  }
];

// 初始化数据
onMounted(() => {
  model.methods.initData();
});

onActivated(() => {
  purchaseTableKey.value++;
  deviceTableKey.value++;
});
</script>

<style scoped lang="scss">
// NOTE: 是否应该有独立的附件展示组件？
.eui-list-upload {
  &:not(.edit) :deep {
    .e-upload-list__item-status-label {
      display: none;
    }
  }
}
</style>
