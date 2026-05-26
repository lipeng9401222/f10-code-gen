<template>
  <div class="eui-page" v-loading="model.global.state.loading">
    <ep-layout-manager class="eui-main-section" :bottom-config="{ contentClass: 'eui-bottom-section' }">
      <template #main>
        <e-scrollbar>
          <ep-form
            ref="formRef"
            class="eui-form"
            :model="formModel.data"
            :security-config="model.global.securityConfig"
            :attach-rules="model.global.securityConfig.attach"
            :validate-on-rule-change="model.global.state.validateOnRuleChange"
          >
            <e-collapse v-model="activeItems" :show-nav="false" :scrollbar-option="{ visible: true }">
              <e-collapse-item id="datagrid-edit-base" title="项目信息">
                <ep-form-layout :gutter="40">
                  <ep-form-item label="项目编号" prop="projectCode" :span="12">
                    <ep-input v-model="formModel.data.projectCode" placeholder="请输入" />
                  </ep-form-item>
                  <ep-form-item label="项目名称" prop="projectName" :span="12">
                    <ep-input v-model="formModel.data.projectName" placeholder="请输入" :suffix-icon="SearchList" />
                  </ep-form-item>
                  <ep-form-item label="采购情形" prop="procurementSituation" :span="12">
                    <e-radio-group v-model="formModel.data.procurementSituation" :options="model.procurementSituationOptions.data" />
                  </ep-form-item>
                  <ep-form-item label="资金来源" prop="fundsSource" :span="12">
                    <e-radio-group v-model="formModel.data.fundsSource" :options="model.fundsSourceOptions.data" />
                  </ep-form-item>
                </ep-form-layout>
                <ep-form-item label="项目备注" prop="projectScale">
                  <ep-input v-model="formModel.data.projectScale" type="textarea" :rows="3" placeholder="请输入" />
                </ep-form-item>
              </e-collapse-item>
              <e-collapse-item id="datagrid-edit-other" title="供应商报价">
                <e-toolbar class="p-0">
                  <template #button>
                    <e-toolbar-btns ref="toolbarBtnsRef" :items="toolbarBtnList" configurable max-display-count="4" config-id="toolbar-btns" />
                  </template>
                  <template #filter="{ opened }">
                    <e-toolbar-search
                      ref="toolbarSearchRef"
                      :search-list="searchList"
                      :is-open="opened"
                      @advance-search="onAdvanceSearch"
                      configurable
                      config-id="toolbar-search"
                      config-url="/showcase/f10-demo/dynamicGrid"
                    />
                  </template>
                  <template #actions>
                    <e-toolbar-more :table-ref="tableRef" :model="model" :help-url="'http://192.168.219.170/docs/vue/latest/component/component/button.html'" />
                  </template>
                </e-toolbar>

                <div class="my-l auto-h">
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
                    :pagination="false"
                    auto-height
                    @change="model.gridList.change"
                    @refresh="model.gridList.refresh"
                    configurable
                    config-id="datagrid"
                    :key="tableKey"
                  >
                    <template #bodyCell="{ column, record }">
                      <template v-if="column.dataIndex === 'workplace'">
                        {{ renderText(record.workplace, model.workplaceList.data) }}
                      </template>
                      <template v-if="column.dataIndex === 'principal'">
                        {{ renderText(record.principal, model.principalList.data) }}
                      </template>
                      <template v-if="column.dataIndex === 'certification'">
                        {{ renderText(record.certification, model.certificationList.data) }}
                      </template>
                      <template v-if="column.dataIndex === 'file'">
                        <e-upload
                          v-model:file-list="record.file"
                          class="upload-demo no-show-upload"
                          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                          enable-preview="true"
                          multiple
                          :on-preview="handleUploadPreview"
                          :on-remove="handleUploadRemove"
                          :before-remove="beforeUploadRemove"
                          :limit="3"
                          :data="[record.id]"
                          :on-exceed="handleUploadExceed"
                          :enable-delete="false"
                          :enable-add="false"
                        >
                          <e-button type="primary" :icon="Upload" text>上传附件</e-button>
                        </e-upload>
                      </template>
                    </template>
                  </ep-data-grid>
                </div>
              </e-collapse-item>
            </e-collapse>
          </ep-form>
        </e-scrollbar>
      </template>
      <template #bottom>
        <e-toolbar button-position="right">
          <template #button>
            <e-toolbar-btns ref="footerBtnsRef" :items="footerBtnList" />
          </template>
        </e-toolbar>
      </template>
    </ep-layout-manager>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onActivated, defineAsyncComponent, getCurrentInstance, h } from 'vue';
import { EpDataGrid, Utils, Hooks } from '@epframe/eui-core';
import { SearchList, Upload } from '@epoint-fe/eui-icons';
import { EMessage, EMessageBox } from '@epoint-fe/eui-components';

defineOptions({
  name: 'DrawerEdit'
});

const { PageConfig, createSubModel, request, uuid } = Utils;
const { useListModel, useValidation, useTableModel } = Hooks;

// 页面配置模型
const pageConfig = new PageConfig({});

// 表单验证
const { validate } = useValidation();

// 定义数据模型
const model = Utils.defineDataModel(() => {
  const ouGuid = ref(null); // 组织节点 GUID

  const selectedRowKeys = ref([]); // 表格选中行 id
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

  // 采购情形下拉列表数据模型
  const procurementSituationOptions = useListModel('/showcase/f10-demo/procurementSituationOptions', {
    labelField: 'label', // 显示文本字段
    lazy: false // 懒加载
  });
  // 资金来源数据模型
  const fundsSourceOptions = useListModel('/showcase/f10-demo/fundsSourceOptions', {
    labelField: 'label', // 显示文本字段
    lazy: false // 懒加载
  });
  // 项目分类数据模型
  const projectClassificationOptions = useListModel('/showcase/f10-demo/projectClassificationOptions', {
    labelField: 'label', // 显示文本字段
    lazy: false // 懒加载
  });
  // 项目所在地数据模型
  const projectAreaOptions = useListModel('/showcase/f10-demo/projectAreaOptions', {
    labelField: 'label', // 显示文本字段
    lazy: false // 懒加载
  });

  // 单位数据模型
  const workplaceList = useListModel('/showcase/f10-demo/workplaceList', {
    labelField: 'label', // 显示文本字段
    lazy: false // 懒加载
  });

  // 负责人数据模型
  const principalList = useListModel('/showcase/f10-demo/principalList', {
    labelField: 'label', // 显示文本字段
    lazy: false // 懒加载
  });

  // 资质数据模型
  const certificationList = useListModel('/showcase/f10-demo/dynamicList', {
    labelField: 'label', // 显示文本字段
    lazy: false // 懒加载
  });

  const gridList = useTableModel('/showcase/f10-demo/dynamicGrid', {
    idField: 'id',
    requestType: 'restful', // 请求类型
    lazy: true, // 懒加载
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

  // 其他信息表单模型
  const formModel = createSubModel(
    {},
    {
      // 刷新表单数据
      refresh: async () => {
        // 请求表单数据
        const formData = await request({
          url: `/showcase/f10-demo/baseForm`,
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
      // 更新保存表单数据
      submitForm: async ({ type }) => {
        // 请求保存表单数据
        return await request({
          url: `/showcase/f10-demo/baseFormSave`,
          data: {
            entities: [formModel.data], // 表单数据
            customParams: {
              ouGuid: ouGuid.value // 组织节点 GUID
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

  // 保存列表
  const dynamicGridSubmit = async ({ type, newData }) => {
    return await request({
      url: '/showcase/f10-demo/dynamicGridSave',
      data: {
        entities: [newData], // 列表数据
        customParams: {
          ouGuid: ouGuid.value // 组织节点 GUID
        },
        type: type
      }
    });
  };

  // 保存-提交
  const saveAll = async ({ type }) => {
    const isValid = await validate(formRef);
    const edited = tableRef.value?.getChanges();

    if (!isValid) {
      return;
    }

    // 请求更新表单数据
    return await Promise.all([formModel.submitForm({ type }), dynamicGridSubmit({ type, newData: edited })]);
  };

  return {
    global: { pageConfig, securityConfig }, // 全局模型
    models: {
      ouGuid, // 组织节点 GUID
      searchParams, // 页面搜索条件模型
      selectedRowKeys, // 表格选中行 ID 列表
      procurementSituationOptions, // 采购情形下拉列表数据模型
      fundsSourceOptions, //  资金来源数据模型
      projectClassificationOptions, // 项目分类数据模型
      projectAreaOptions, // 项目所在地数据模型
      formModel, // 表单模型
      workplaceList, // 单位数据模型
      principalList, // 负责人数据模型
      certificationList, // 资质数据模型
      gridList, // 表格数据模型
      dynamicGridSubmit, // 保存列表
      saveAll: saveAll
    }
  };
});

const { formModel } = model;

const footerBtnList = ref([
  {
    type: 'default',
    content: '保存修改',
    onClick: () => {
      handleSave();
    }
  },
  {
    type: 'primary',
    content: '确认提交',
    onClick: () => {
      handleSubmit();
    }
  }
]);

// 定义表单引用
const formRef = ref(null);

// 默认展开所有项
const activeItems = ref(['datagrid-edit-base', 'datagrid-edit-other']);

// 工具栏按钮相关方法
// 是否选中某条数据
const isSelected = computed(() => model.selectedRowKeys.length);
// 工具栏按钮配置
const toolbarBtnsRef = ref(null);
const toolbarBtnList = ref([
  {
    type: 'primary',
    onClick: async () => handleAdd(),
    content: '添加'
  },
  {
    type: 'danger',
    plain: true,
    ghost: true,
    onClick: async () => handleDelete(),
    disabled: () => !isSelected.value,
    content: '删除'
  }
]);
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
// 工具栏搜索配置
const searchList = computed(() => {
  return [
    {
      label: '全部',
      field: 'searchField',
      fieldType: 'string',
      type: 'mixSearch', // 复合搜索 搜索按钮
      default: true,
      operation: 'LIKE',
      operations: operationsList.value,
      data: [
        { label: '单位', value: 'workplace' },
        { label: '负责人', value: 'principal' }
      ]
    }
  ];
});
// 高级搜索回调
const onAdvanceSearch = (params) => {
  // 更新搜索参数模型
  model.searchParams.update(params);
};

// 解决第二次进入页面表格样式错乱的问题，根源是 keep-alive缓存列宽不会重新计算导致的
const tableKey = ref(0);
// 表格引用
const tableRef = ref(null);

// 添加
const handleAdd = () => {
  let record = { ...nodeList.value };
  record[model.gridList.idField] = uuid();
  editNode.value = { ...record };
  // 打开对话框
  openComponentDialog('新增信息');
};
// 删除
const handleDelete = () => {
  EMessageBox.confirm('此操作将永久删除, 是否继续?', '警告', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    callback: (action) => {
      if (action === 'confirm') {
        const data = model.gridList.data.filter((item) => {
          return model.selectedRowKeys.indexOf(item[model.gridList.idField]) !== -1;
        });
        tableRef.value?.deleteRow(data);
      }
    }
  });
};

// 表格行
const columnList = ref();
const nodeList = ref({});

// 表格单元格文本转换
const renderText = (value, data) => {
  let node = data.find((item) => item.value === value);
  return node ? node.label : value ? value : '--';
};

// 上传删除
const handleUploadRemove = (file, uploadFiles) => {};
// 上传删除之前
const beforeUploadRemove = (file, uploadFiles) => {};
// 上传超出限制
const handleUploadExceed = (file, uploadFiles) => {
  EMessage({
    message: '超出上传个数限制！',
    type: 'warning'
  });
};

// 在表格数据加载完成后自动进入编辑状态
model.methods.registerHook('onAfterInitData', () => {
  columnList.value = [
    {
      title: '单位',
      dataIndex: 'workplace',
      width: 192,
      ellipsis: true, // 内容过长显示省略号
      sorter: false // 是否启用排序功能
    },
    {
      title: '负责人',
      dataIndex: 'principal',
      width: 120,
      ellipsis: true, // 内容过长显示省略号
      sorter: false // 是否启用排序功能
    },
    {
      title: '联系方式',
      dataIndex: 'linkType',
      width: 150,
      ellipsis: true, // 内容过长显示省略号
      sorter: false // 是否启用排序功能
    },
    {
      title: '资质',
      dataIndex: 'certification',
      width: 220,
      ellipsis: true, // 内容过长显示省略号
      sorter: false // 是否启用排序功能
    },
    {
      title: '商品信息',
      dataIndex: 'merchandise',
      width: 160,
      ellipsis: true, // 内容过长显示省略号
      sorter: false // 是否启用排序功能
    },
    {
      title: '报价',
      dataIndex: 'quotedPrice',
      width: 150,
      ellipsis: true, // 内容过长显示省略号
      sorter: false // 是否启用排序功能
    },
    {
      title: '单价',
      dataIndex: 'unitPrice',
      width: 150,
      ellipsis: true, // 内容过长显示省略号
      sorter: false // 是否启用排序功能
    },
    {
      title: '明细单(附件)',
      dataIndex: 'file',
      minWidth: 200,
      ellipsis: true, // 内容过长显示省略号
      sorter: false // 是否启用排序功能
    },
    {
      dataIndex: 'action',
      title: '操作',
      width: 116,
      key: 'action',
      hidden: false,
      action: {
        asText: true, // 是否以文本形式展示操作项，默认值为 false
        defaultShowItems: 4, // 默认展示的操作项数量，默认值为 4
        maxCollapse: 4, // 最多显示的按钮数量，其余按钮将被折叠
        // 操作项列表
        items: [
          {
            icon: '', // 操作项的图标，可选值为组件库中的图标名字
            label: '编辑', // 操作项的文本标签
            // 操作项的点击事件处理函数
            onClick: (row) => {
              // 开始行编辑
              editNode.value = { ...row };
              // 打开对话框
              openComponentDialog('编辑信息');
            },
            // 操作项是否可见的判断函数
            visible: true,
            // 操作项是否禁用的判断函数
            disabled: false
          },
          {
            icon: '', // 操作项的图标，可选值为组件库中的图标名字
            label: '删除', // 操作项的文本标签
            // 操作项的点击事件处理函数
            onClick: (row) => {
              tableRef.value?.deleteRow(row);
            },
            // 操作项是否可见的判断函数
            visible: true,
            // 操作项是否禁用的判断函数
            disabled: false
          }
        ]
      }
    }
  ];

  nodeList.value = {};
  // 遍历 columnList 数组
  columnList.value.forEach((item) => {
    const key = item.dataIndex;
    if (key !== 'action') {
      nodeList.value[key] = key === 'file' ? [] : '';
    }
  });
  // 表头更新完成，数据才能更新
  model.gridList.refresh();
});


// 编辑抽屉
const { proxy } = getCurrentInstance();
const editNode = ref(null);

// 打开对话框
const openComponentDialog = (title) => {
  proxy?.$drawer(
    {
      title: title,
      size: '480px',
      direction: 'rtl',
      contentPadding: 0,
      closeCallback: (action) => {
        if (action !== 'close') {
          let edited = tableRef.value?.getChanges();

          if (Object.keys(edited).length === 0) {
            // 刷新表格数据
            model.gridList.refresh();
            return false;
          }

          // 先保存后刷新
          model
            .dynamicGridSubmit({
              type: 'save',
              newData: edited
            })
            .then(() => {
              // 刷新表格数据
              model.gridList.refresh();
            });
        }
      }
    },
    () => {
      return h(
        defineAsyncComponent(() => import('@/views/demo/page/typical/form/subform/drawer-edit-dialog.vue')),
        {
          ouGuid: model.ouGuid,
          editNodes: editNode.value,
          idField: model.gridList.idField
        }
      );
    }
  );
};

// 底部按钮
// 修改保存
const handleSave = () => {
  model.saveAll({ type: 'save' }).then((data) => {
    EMessage({
      message: '暂存成功！',
      type: 'success'
    });
  });
};
// 提交信息
const handleSubmit = () => {
  model.saveAll({ type: 'submit' }).then((data) => {
    EMessage({
      message: '提交成功！',
      type: 'success'
    });
  });
};

onActivated(() => {
  tableKey.value++;
});

// 初始化数据
onMounted(() => {
  model.methods.initData();
});
</script>

<style lang="scss" scoped>
.no-show-upload {
  :deep {
    .e-upload-list__item.is-success .e-upload-list__item-status-label {
      display: none;
    }
  }
}
</style>
