<template>
  <div v-loading="model.global.state.loading">
    <e-toolbar class="p-0">
      <template #title>
        <e-toolbar-title>
          <e-toolbar-title class="text-lg" title="供应商报价"></e-toolbar-title>
        </e-toolbar-title>
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
        :cell-editable="false"
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
              class="upload-demo"
              :class="{ 'no-show-upload': record.isEdit ? false : true }"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              enable-preview="true"
              multiple
              :on-preview="handleUploadPreview"
              :on-remove="handleUploadRemove"
              :before-remove="beforeUploadRemove"
              :limit="3"
              :data="[record.id]"
              :on-exceed="handleUploadExceed"
              :enable-delete="record.isEdit ? true : false"
              :enable-add="record.isEdit && (!record.file || record.file.length < 3) ? true : false"
            >
              <e-button type="primary" :icon="Upload" text>上传附件</e-button>
            </e-upload>
          </template>
        </template>
      </ep-data-grid>
    </div>

    <e-toolbar class="p-0">
      <template #button>
        <e-toolbar-btns ref="toolbarBtnsRef" :items="toolbarBtnList" configurable max-display-count="4" config-id="toolbar-btns" />
      </template>
    </e-toolbar>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onActivated } from 'vue';
import { EpDataGrid, Utils, Hooks } from '@epframe/eui-core';
import { SearchList, Upload } from '@epoint-fe/eui-icons';
import { EMessage, EMessageBox } from '@epoint-fe/eui-components';

defineOptions({
  name: 'DatagridEditBase'
});

const { PageConfig, createSubModel, request, uuid } = Utils;
const { useListModel, useTableModel } = Hooks;

// 页面配置模型
const pageConfig = new PageConfig({});

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

  // 给 initSecurityConfig 请求的 securityConfigParams 参数
  const securityConfig = { apiUrl: 'rest/announcement/addAnnouncement' };

  return {
    global: { pageConfig, securityConfig }, // 全局模型
    models: {
      ouGuid, // 组织节点 GUID
      searchParams, // 页面搜索条件模型
      selectedRowKeys, // 表格选中行 ID 列表
      workplaceList, // 单位数据模型
      principalList, // 负责人数据模型
      certificationList, // 资质数据模型
      gridList // 表格数据模型
    }
  };
});

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
  tableRef.value?.addRow({
    record: record,
    position: 'top',
    editable: true,
    position: 'bottom'
  });
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

// 获取修改的数据
const getEdited = () => {
  const edited = tableRef.value?.getChanges();
  return edited;
};

// 暴露方法给父组件
defineExpose({ getEdited });

// 表格行
const columnList = ref();
const nodeList = ref({});

// 表格单元格文本转换
const renderText = (value, data) => {
  let node = data.find((item) => item.value === value);
  return node ? node.label : value ? value : '--';
};

// 上传按钮预览
const handleUploadPreview = (file, uploadFiles) => {};
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
      sorter: false, // 是否启用排序功能
      editor: {
        component: 'e-select',
        props: {
          placeholder: '请选择',
          multiple: false,
          options: model.workplaceList.data
        },
        rules: []
      }
    },
    {
      title: '负责人',
      dataIndex: 'principal',
      width: 120,
      ellipsis: true, // 内容过长显示省略号
      sorter: false, // 是否启用排序功能
      editor: {
        component: 'e-select',
        props: {
          placeholder: '请选择',
          multiple: false,
          options: model.principalList.data
        },
        rules: []
      }
    },
    {
      title: '联系方式',
      dataIndex: 'linkType',
      width: 150,
      ellipsis: true, // 内容过长显示省略号
      sorter: false, // 是否启用排序功能
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
      width: 220,
      ellipsis: true, // 内容过长显示省略号
      sorter: false, // 是否启用排序功能
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
      width: 160,
      ellipsis: true, // 内容过长显示省略号
      sorter: false, // 是否启用排序功能
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
      width: 150,
      ellipsis: true, // 内容过长显示省略号
      sorter: false, // 是否启用排序功能
      editor: {
        component: 'e-input-number',
        props: {
          placeholder: '请输入',
          precision: 2,
          step: 0.01
        },
        rules: [{ type: 'float' }]
      }
    },
    {
      title: '单价',
      dataIndex: 'unitPrice',
      width: 150,
      ellipsis: true, // 内容过长显示省略号
      sorter: false, // 是否启用排序功能
      editor: {
        component: 'e-input-number',
        props: {
          placeholder: '请输入',
          precision: 2,
          step: 0.01
        },
        rules: [{ type: 'float' }]
      }
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
              row.isEdit = true;
              tableRef.value.beginEditRow(row);
            },
            // 操作项是否可见的判断函数
            visible: (params) => !params.isRowEditing,
            // 操作项是否禁用的判断函数
            disabled: false
          },
          {
            icon: '', // 操作项的图标，可选值为组件库中的图标名字
            label: '保存', // 操作项的文本标签
            // 操作项的点击事件处理函数
            onClick: (row) => {
              // 提交行编辑
              row.isEdit = false;
              tableRef.value.commitEditRow(row);
            },
            // 操作项是否可见的判断函数
            visible: (params) => params.isRowEditing,
            // 操作项是否禁用的判断函数
            disabled: false
          },
          {
            icon: '', // 操作项的图标，可选值为组件库中的图标名字
            label: '取消', // 操作项的文本标签
            // 操作项的点击事件处理函数
            onClick: (row) => {
              // 提交行编辑
              row.isEdit = false;
              tableRef.value.cancelEditRow(row);
            },
            // 操作项是否可见的判断函数
            visible: (params) => params.isRowEditing,
            // 操作项是否禁用的判断函数
            disabled: false
          },
          {
            icon: '', // 操作项的图标，可选值为组件库中的图标名字
            label: '删除', // 操作项的文本标签
            type: 'danger',
            plain: true,
            // 操作项的点击事件处理函数
            onClick: (row) => {
              tableRef.value.deleteRow(row);
            },
            // 操作项是否可见的判断函数
            visible: (params) => !params.isRowEditing,
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

// 初始化数据
onMounted(() => {
  model.methods.initData();
});

onActivated(() => {
  tableKey.value++;
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
