<template>
  <div class="h-full" v-loading="model.global.state.loading">
    <ep-layout-manager>
      <template #main>
        <div class="h-full flex flex-col items-start px-xxl py-m">
          <div class="leading-base text-secondary text-base mb-xs">供应商</div>

          <div class="flex-auto h-0">
            <ep-data-grid
              ref="tableRef"
              class="box-table"
              :id-field="model.gridList.idField"
              :data="model.gridList.data"
              :total="model.gridList.total"
              :current="model.gridList.current"
              :page-size="model.gridList.pageSize"
              :columns="columnList"
              :loading="model.gridList.loading"
              :show-index-column="false"
              :show-selection-column="false"
              default-show-index
              :pagination="false"
              :showHeader="false"
              :cell-editable="false"
              border-style="none"
              :rowClassName="() => 'list-row'"
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
                <template v-if="column.dataIndex === 'action'">
                  <e-button :icon="Delete" text ghost type="danger" @click="handleDelete(record)" />
                </template>
              </template>
            </ep-data-grid>
          </div>
          <e-button type="primary" :icon="Add" plain text @click="handleAdd">添加内容</e-button>
        </div>
      </template>
      <template #bottom>
        <div class="flex justify-end py-l px-xxl">
          <e-button @click="handleCancel">取消</e-button>
          <e-button type="primary" @click="handleConfirm">确定</e-button>
        </div>
      </template>
    </ep-layout-manager>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onActivated, nextTick, inject } from 'vue';
import { EpDataGrid, Utils, Hooks } from '@epframe/eui-core';
import { Delete, Add } from '@epoint-fe/eui-icons';

defineOptions({
  name: 'ListEditDialog'
});

const { PageConfig, createSubModel, request, uuid } = Utils;
const { useListModel, useTableModel } = Hooks;

// 定义 props传参
const props = defineProps({
  ouGuid: { type: String, default: '' } // 组织节点 GUID
});

const getCurrentDialog = inject('getCurrentDialog');

// 关闭弹窗
const closeDialog = (action = 'close', data) => {
  if (getCurrentDialog) {
    getCurrentDialog().close(action === 'close' ? action : data);
  }
};

// 页面配置模型
const pageConfig = new PageConfig({});

const model = Utils.defineDataModel(() => {
  const ouGuid = ref(null); // 组织节点 GUID
  ouGuid.value = props.ouGuid;

  // 供应商公司数据模型
  const workplaceList = useListModel('/showcase/f10-demo/workplaceList', {
    labelField: 'label', // 显示文本字段
    lazy: false // 懒加载
  });

  const gridList = useTableModel('/showcase/f10-demo/dynamicEditList', {
    idField: 'id',
    requestType: 'restful', // 请求类型
    lazy: true, // 懒加载
    params: {
      extendConditions: [
        {
          path: 'ouguid',
          type: ouGuid.value ? 'EQ' : 'NQ',
          value: ouGuid.value
        }
      ]
    }
  });

  // 保存-提交
  const dynamicListSubmit = async ({ type }) => {
    tableRef.value?.commitEdit();
    tableRef.value?.beginEdit();
    const edited = tableRef.value?.getChanges();

    // 请求更新表单数据
    return await request({
      url: '/showcase/f10-demo/dynamicEditListSave',
      data: {
        entities: [edited], // 列表数据
        customParams: {
          ouGuid: ouGuid.value // 组织节点 GUID
        },
        type: type
      }
    });
  };

  return {
    global: { pageConfig }, // 全局模型
    models: {
      ouGuid, // 组织节点 GUID
      workplaceList, // 供应商公司
      gridList,
      dynamicListSubmit
    }
  };
});

// 解决第二次进入页面表格样式错乱的问题，根源是 keep-alive缓存列宽不会重新计算导致的
const tableKey = ref(0);

onActivated(() => {
  tableKey.value++;
});

// 表格引用
const tableRef = ref(null);

// 表格行
const columnList = ref();
const nodeList = ref({});

// 表格单元格文本转换
const renderText = (value, data) => {
  let node = data.find((item) => item.value === value);
  return node ? node.label : value;
};

// 在表格数据加载完成后自动进入编辑状态
model.methods.registerHook('onAfterInitData', () => {
  columnList.value = [
    {
      title: '供应商单位',
      dataIndex: 'workplace',
      ellipsis: true, // 内容过长显示省略号
      sorter: false, // 是否启用排序功能
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
      title: '联系人',
      dataIndex: 'linkName',
      width: 140,
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
      title: '联系方式',
      dataIndex: 'linkType',
      width: 140,
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
      dataIndex: 'action',
      title: '操作',
      width: 50
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

watch(
  () => model.gridList.data,
  () => {
    nextTick(() => {
      tableRef.value?.beginEdit();
    });
  },
  {
    deep: true,
    immediate: true
  }
);

// 添加内容
const handleAdd = () => {
  tableRef.value?.beginEdit();
  let record = { ...nodeList.value };
  record[model.gridList.idField] = uuid();
  tableRef.value?.addRow({
    record: record,
    position: 'top',
    editable: true
  });
};

// 删除
const handleDelete = (record) => {
  tableRef.value?.deleteRow(record);
};

// 取消
const handleCancel = () => {
  closeDialog('cancel');
};

// 确定
const handleConfirm = async () => {
  await model.dynamicListSubmit({
    type: 'save'
  });
  closeDialog('save', {});
};

// 初始化数据
onMounted(() => {
  model.methods.initData();
});
</script>

<style scoped lang="scss">
.box-table {
  &:deep {
    .list-row {
      td {
        padding: 6px 4px;
      }
    }
  }
}
</style>
