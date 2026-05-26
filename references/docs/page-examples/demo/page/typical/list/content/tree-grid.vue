<template>
  <ep-layout-manager class="eui-page" v-loading="model.global.state.loading" :top-config="{ contentClass: 'eui-top-section', showDivider: false }">
    <template #top>
      <e-toolbar title-block="true">
        <template #title>
          <span>树状表格</span>
        </template>
        <template #actions>
          <e-button-group>
            <e-toolbar-more :table-ref="tableRef" :model="model" :help-url="'http://192.168.219.170/docs/vue/latest/component/component/button.html'" />
          </e-button-group>
        </template>
        <template #button>
          <e-toolbar-btns ref="toolbarBtnsRef" :items="toolbarBtnList" configurable max-display-count="3" config-id="toolbar-btns" />
        </template>
        <template #filter="{ opened }">
          <e-toolbar-search
            ref="toolbarSearchRef"
            :search-list="searchList"
            :is-open="opened"
            @advance-search="onAdvanceSearch"
            configurable
            config-id="toolbar-search"
            config-url="/showcase/f10-demo/grid"
          />
        </template>
      </e-toolbar>
    </template>

    <template #main>
      <div class="eui-main-section">
        <ep-data-grid
          ref="tableRef"
          class="eui-table"
          :id-field="model.gridList.idField"
          :data="model.gridList.data"
          :total="model.gridList.total"
          :page-size="model.gridList.pageSize"
          :current="model.gridList.current"
          :columns="columnList"
          :loading="model.gridList.loading"
          v-model:selectedRowKeys="model.selectedRowKeys"
          :show-index-column="true"
          :show-selection-column="true"
          :default-show-index="false"
          @change="model.gridList.change"
          @refresh="model.gridList.refresh"
          configurable
          config-id="datagrid"
          :key="tableKey"
        >
          <!-- 用于个性化展开收起的图标，目前ep-data-grid组件暂不支持，待后续框架更新 -->
          <!-- <template #expandIcon="props">
            <span class="expand-icon cursor-pointer mr-m" v-if="props?.record?.children?.length > 0" @click="()=>props.onExpand(props.record)">
              {{ props.expanded ? '▼' : '▶' }}
              {{ getExpandIcon(props) }}
            </span>
          </template> -->
          <template #bodyCell="{ column, text }">
            <template v-if="column.dataIndex === 'auditStatus'">
              <e-tag :type="reviewStateData[text - 1].cls" round class="text-primary">{{ getAuditStatusLabel(text) }}</e-tag>
            </template>
          </template>
        </ep-data-grid>
      </div>
    </template>
  </ep-layout-manager>
</template>

<script setup>
import { ref, computed, onMounted, onActivated } from 'vue';
import { EpDataGrid, Utils, Hooks } from '@epframe/eui-core';
import { EMessage } from '@epoint-fe/eui-components';

defineOptions({
  name: 'TreeGrid'
});

const { useTableModel, useListModel } = Hooks;
const { createSubModel, PageConfig } = Utils;

// 页面配置模型
const pageConfig = new PageConfig({});
// 定义数据模型
const model = Utils.defineDataModel(() => {
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

  // 审核状态下拉列表数据模型
  const auditStatusList = useListModel('/showcase/f10-demo/auditStatusOptions', {
    labelField: 'label',
    valueField: 'value',
    lazy: false // 懒加载
  });

  // 类型下拉列表数据模型
  const typeList = useListModel('/showcase/f10-demo/typeOptions', {
    labelField: 'label', // 显示文本字段
    lazy: false // 懒加载
  });

  // 表格数据模型
  const gridList = Hooks.useTableModel('/showcase/f10-demo/tree-grid', {
    idField: 'id',
    requestType: 'restful', // 请求类型
    lazy: false, // 懒加载
    params: computed(() => {
      return {
        ...searchParams.data,
        extendConditions: [{}]
      };
    })
  });

  return {
    global: { pageConfig }, // 全局模型
    models: {
      searchParams, // 页面搜索条件模型
      auditStatusList, // 审核状态下拉列表数据模型
      typeList, // 类型下拉列表数据模型
      selectedRowKeys, // 表格选中行 ID 列表
      gridList // 表格数据模型
    }
  };
});

// 工具栏按钮配置
const toolbarBtnsRef = ref(null);
const toolbarBtnList = [
  {
    type: 'primary',
    content: '新建信息',
    onClick: () => handleAdd()
  },
  {
    type: 'default',
    control: 'buttonGroup',
    items: [
      {
        content: '导出',
        disabled: () => !isSelected.value,
        onClick: () => {
          Utils.logger.info('导出');
        }
      },
      {
        content: '导入',
        onClick: () => {
          Utils.logger.info('导入');
        }
      }
    ]
  },
  {
    type: 'default',
    content: '转移',
    disabled: () => !isSelected.value,
    onClick: () => {
      Utils.logger.info('转移');
    }
  },
  {
    type: 'default',
    content: '编辑',
    disabled: () => !isSelected.value,
    onClick: () => {
      handleEdit(null, model.selectedRowKeys);
    }
  },
  {
    type: 'default',
    content: '删除',
    disabled: () => !isSelected.value,
    onClick: () => {
      handleDelete(null, model.selectedRowKeys);
    }
  }
];

// 工具栏按钮相关方法
// 是否选中某条数据
const isSelected = computed(() => model.selectedRowKeys.length > 0);
// 新增
const handleAdd = () => {
  EMessage({
    message: '新增',
    type: 'success'
  });
};
// 编辑
const handleEdit = (row, keys) => {
  Utils.logger.info('编辑', row, keys);
};
// 删除
const handleDelete = (row, keys) => {
  Utils.logger.info('删除', row, keys);
};
// 上传
const handleUpload = (row, keys) => {
  Utils.logger.info('上传', row, keys);
};
// 提交
const handleSubmit = (row, keys) => {
  Utils.logger.info('提交', row, keys);
};
// 查看
const handleView = (row, keys) => {
  Utils.logger.info('查看', row, keys);
};

// TODO 个性化展开图标,用于个性化展开收起的图标，目前ep-data-grid组件暂不支持，待后续框架更新
const getExpandIcon = (par) => {
  Utils.logger.info('getExpandIcon par=', par);
  return par;
};

// 获取类型标签
const getTypeLabel = (value) => {
  const typeItem = model.typeList.data.find((item) => item.value === String(value));
  return typeItem ? typeItem.label : value;
};

// 获取审核状态标签
const getAuditStatusLabel = (value) => {
  const statusItem = model.auditStatusList.data.find((item) => item.value === String(value));
  return statusItem ? statusItem.label : value;
};

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
      operations: operationsList,
      data: [
        { label: '名称', value: 'name' },
        { label: '审核状态', value: 'auditStatus' }
      ]
    },
    {
      label: '类型',
      field: 'type',
      type: 'select',
      dataType: 'select',
      default: true,
      operation: 'EQ',
      operations: operationsList,
      data: model.typeList.data,
      labelField: 'label',
      valueField: 'value'
    },
    {
      label: '审核状态',
      field: 'auditStatus',
      type: 'select',
      dataType: 'select',
      default: true,
      operation: 'EQ',
      operations: operationsList,
      data: model.auditStatusList.data,
      labelField: 'label',
      valueField: 'value'
    },
    {
      label: '修改人',
      field: 'editorName',
      default: false,
      type: 'input',
      operation: 'EQ',
      operations: operationsList
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
// 审核状态数据
const reviewStateData = [
  {
    cls: 'danger',
    text: '审核不通过'
  },
  {
    cls: '',
    text: '审核中'
  },
  {
    cls: 'success',
    text: '审核通过'
  },
  {
    cls: 'warning',
    text: '编辑中'
  }
];

// 表格列配置
const columnList = ref([
  {
    title: '名称',
    dataIndex: 'name',
    ellipsis: true, // 内容过长显示省略号
    sorter: true // 是否启用排序功能
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: 120,
    sorter: true, // 是否启用排序功能
    customRender: function ({ text }) {
      return getTypeLabel(text);
    }
  },
  {
    title: '修改人',
    dataIndex: 'editorName',
    width: 120
  },
  {
    title: '修改时间',
    dataIndex: 'editorTime',
    width: 180
  },
  {
    title: '审核状态',
    dataIndex: 'auditStatus',
    width: 130,
    allowHtml: true // 允许渲染 HTML 代码
  },
  {
    title: '描述',
    dataIndex: 'remark',
    width: 200,
    ellipsis: true
  },
  {
    dataIndex: 'action',
    title: '操作',
    width: 200,
    key: 'action',
    hidden: false,
    action: {
      asText: true, // 是否以文本形式展示操作项
      // defaultShowItems: 1, // 默认展示的操作项数量(此项配置不生效，请使用，maxCollapse)
      // collapse: true, // 是否将过多的按钮通过下拉折叠(默认为true)
      maxCollapse: 3, // 最多显示的按钮数量，其余按钮将被折叠
      // 操作项列表
      items: [
        {
          label: '编辑', // 操作项的文本标签
          // 操作项的点击事件处理函数
          onClick: (row) => handleEdit(row),
          // 操作项是否可见的判断函数
          visible: (row) => true,
          // 操作项是否禁用的判断函数
          disabled: (row) => false
        },
        {
          label: '删除',
          onClick: (row) => handleDelete(row),
          visible: (row) => row.isUploaded,
          disabled: (row) => false
        },
        {
          label: '上传',
          onClick: (row) => handleUpload(row),
          visible: (row) => !row.isUploaded,
          disabled: (row) => false
        },
        {
          label: '提交',
          onClick: (row) => handleSubmit(row),
          visible: (row) => true,
          disabled: (row) => false
        },
        {
          label: '查看',
          onClick: (row) => handleView(row),
          visible: (row) => true,
          disabled: (row) => false
        }
      ]
    }
  }
]);

// 监听组件激活事件
onActivated(() => {
  tableKey.value++;
});

// 初始化数据
onMounted(() => {
  model.methods.initData();
});
</script>
