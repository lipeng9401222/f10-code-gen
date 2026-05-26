<template>
  <ep-layout-manager class="eui-page" v-loading="model.global.state.loading" :top-config="{ contentClass: 'eui-top-section', showDivider: false }">
    <template #top>
      <e-toolbar title="嵌套表格" title-block="true">
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
            config-url="/showcase/f10-demo/inline-detail-grid"
          />
          <e-button-group>
            <e-toolbar-more :table-ref="tableRef" :model="model" :help-url="'http://192.168.219.170/docs/vue/latest/component/component/button.html'" />
          </e-button-group>
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
          v-model:selectedRowKeys="model.selectedRowKeys"
          :show-index-column="true"
          :show-selection-column="true"
          :default-show-index="false"
          :total="model.gridList.total"
          :page-size="model.gridList.pageSize"
          :current="model.gridList.current"
          :row-expandable="() => true"
          :columns="columnList"
          :loading="model.gridList.loading"
          @change="model.gridList.change"
          @refresh="model.gridList.refresh"
          configurable
          config-id="datagrid"
          :key="tableKey"
          :expand-row-by-click="false"
        >
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'franchisees'">
              <a class="text-brand" :href="record.franchiseesUrl" target="_blank">{{ text }}</a>
            </template>
            <template v-else-if="column.dataIndex === 'identificationCode'">
              <span>{{ text }}</span>
              <e-tooltip content="点击复制" placement="top">
                <e-button class="copy-btn" :icon="Copy" text @click.stop="handleCopy(text)" />
              </e-tooltip>
            </template>
            <template v-else-if="column.dataIndex === 'manager'">
              <div class="flex items-center gap-m">
                <e-avatar :src="record.avatarUrl" :size="avatarSize" @error="handleAvatarError">
                  <span class="w-full h-full flex justify-center items-center" :class="getAvatarClass(text)">
                    {{ text?.charAt(0) }}
                  </span>
                </e-avatar>
                <span>{{ text }}</span>
              </div>
            </template>
          </template>
          <template #expandedRowRender="{ record }">
            <div class="nested-table-container">
              <ep-data-grid
                :id-field="'id'"
                :data="getChildrenData(record)"
                :show-index-column="true"
                :show-selection-column="true"
                :default-show-index="true"
                :total="getChildrenData(record).length"
                :pagination="false"
                :columns="childColumnList"
                :auto-height="true"
                :loading="false"
                :key="`${record.id}-child`"
              >
                <template #bodyCell="{ column, record: childRecord }">
                  <template v-if="column.dataIndex === 'name'">
                    <div class="flex items-center gap-m">
                      <e-avatar :src="childRecord.avatarUrl" :size="avatarSize" @error="handleAvatarError">
                        <span class="w-full h-full flex justify-center items-center" :class="getAvatarClass(childRecord.name)">
                          {{ childRecord.name?.charAt(0) }}
                        </span>
                      </e-avatar>
                      <span>{{ childRecord.name }}</span>
                    </div>
                  </template>
                </template>
              </ep-data-grid>
            </div>
          </template>
        </ep-data-grid>
      </div>
    </template>
  </ep-layout-manager>
</template>

<script setup>
defineOptions({
  name: 'InlineDetailGrid'
});

import { ref, computed, onMounted, onActivated } from 'vue';
import { EpDataGrid, Utils, Hooks } from '@epframe/eui-core';
import { EMessage } from '@epoint-fe/eui-components';
import { Copy } from '@epoint-fe/eui-icons';

const { useTableModel, useListModel } = Hooks;
const { createSubModel, PageConfig } = Utils;

// 头像尺寸
const avatarSize = ref(24);

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

  // 加盟性质下拉列表数据模型
  const natureList = useListModel('/showcase/f10-demo/natureOptions', {
    labelField: 'label',
    valueField: 'value',
    lazy: false // 懒加载
  });

  // 表格数据模型
  const gridList = Hooks.useTableModel('/showcase/f10-demo/inline-detail-grid', {
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
      natureList, // 加盟性质下拉列表数据模型
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
const onSelectChange = (changableRowKeys) => {
  model.selectedRowKeys = changableRowKeys;
};

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

// 获取加盟性质标签
const getNatureLabel = (value) => {
  const natureItem = model.natureList.data.find((item) => item.value === String(value));
  return natureItem ? natureItem.label : value;
};

// 复制标识代码
const handleCopy = (text) => {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        EMessage({
          message: '复制成功',
          type: 'success'
        });
      })
      .catch(() => {
        EMessage({
          message: '复制失败',
          type: 'error'
        });
      });
  } else {
    // 兼容旧浏览器
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      EMessage({
        message: '复制成功',
        type: 'success'
      });
    } catch (err) {
      EMessage({
        message: '复制失败',
        type: 'error'
      });
    }
    document.body.removeChild(textarea);
  }
};

// 详情
const handleDetail = (row) => {
  Utils.logger.info('详情', row);
};

// 获取子列表数据
const getChildrenData = (record) => {
  return record.childTable || [];
};

// 头像背景色类名列表(用于没有头像图片，显示名字的时候)
const avatarClasses = ['bg-primary', 'bg-success', 'bg-warning', 'bg-danger', 'bg-info'];

// 获取头像背景色类名(用于没有头像图片，显示名字的时候)
const getAvatarClass = (name) => {
  if (!name) return avatarClasses[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % avatarClasses.length;
  return avatarClasses[index];
};

// 处理头像加载失败
const handleAvatarError = (e) => {
  // 图片加载失败时移除 src，显示文字
  e.target.removeAttribute('src');
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
        { label: '加盟商', value: 'franchisees' },
        { label: '加盟编号', value: 'joinNumber' },
        { label: '经办人', value: 'manager' }
      ]
    },
    {
      label: '加盟商',
      field: 'franchisees',
      default: false,
      type: 'input',
      operation: 'EQ',
      operations: operationsList
    },
    {
      label: '加盟性质',
      field: 'nature',
      type: 'select',
      dataType: 'select',
      default: true,
      operation: 'EQ',
      operations: operationsList,
      data: model.natureList.data,
      labelField: 'label',
      valueField: 'value'
    },
    {
      label: '加盟编号',
      field: 'joinNumber',
      default: true,
      type: 'input',
      operation: 'EQ',
      operations: operationsList
    },
    {
      label: '经办人',
      field: 'manager',
      default: true,
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

// 父表格列配置
const columnList = ref([
  {
    title: '加盟商',
    dataIndex: 'franchisees',
    // width: 280,
    ellipsis: true,
    allowHtml: true
  },
  {
    title: '加盟性质',
    dataIndex: 'nature',
    width: 180,
    customRender: function ({ text }) {
      return getNatureLabel(text);
    }
  },
  {
    title: '标识代码',
    dataIndex: 'identificationCode',
    width: 260,
    allowHtml: true
  },
  {
    title: '加盟编号',
    dataIndex: 'joinNumber',
    width: 240
  },
  {
    title: '经办人',
    dataIndex: 'manager',
    width: 180,
    allowHtml: true
  },
  {
    title: '手机号',
    dataIndex: 'phoneNumber',
    width: 180
  },
  {
    dataIndex: 'action',
    title: '操作',
    width: 70,
    key: 'action',
    hidden: false,
    action: {
      asText: true,
      maxCollapse: 1,
      items: [
        {
          label: '详情',
          onClick: (row) => handleDetail(row),
          visible: (row) => true,
          disabled: (row) => false
        }
      ]
    }
  }
]);

// 子表格列配置
const childColumnList = ref([
  {
    title: '姓名',
    dataIndex: 'name',
    width: 160,
    allowHtml: true
  },
  {
    title: '加盟性质',
    dataIndex: 'nature',
    width: 160,
    customRender: function ({ text }) {
      return getNatureLabel(text);
    }
  },
  {
    title: '手机号',
    dataIndex: 'phoneNumber',
    width: 160
  },
  {
    title: '身份证号码',
    dataIndex: 'IDCode',
    width: 220
  },
  {
    title: '出生日期',
    dataIndex: 'birthDate',
    width: 160
  },
  {
    title: '详细地址',
    dataIndex: 'address',
    // width: 200,
    ellipsis: true
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 220,
    ellipsis: true
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

<style lang="scss" scoped>
.e-badge {
  height: var(--e-size-mini);
}
</style>
