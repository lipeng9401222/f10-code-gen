---
title: DataGrid
originUrl: http://192.168.219.170/docs/vue/latest/frame/components/eui-core/ep-datagrid/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/components/eui-core/ep-datagrid/)

此组件由 `@epframe/eui-core` 包提供。

`DataGrid` 控件是基于 `@epoint-fe/eui-components` 中的 `ETable` 组件封装的，以方便实现单元格的可编辑功能，并让其更接近 F9 中的表格控件使用习惯。

## 基础使用

- 配合 [`useTableDataSource`](http://192.168.219.170/docs/vue/latest/frame/hooks/data-source.html#usetabledatasource) 实现数据源的获取和分页。

**Demo 示例**: `@epframe/eui-core/components/data-grid/base.vue`

```vue
<template>
  <ep-data-grid id-field="userGuid" :data="tableSource.dataSource" :total="tableSource.total"
    :current="tableSource.current" :page-size="tableSource.pageSize" :columns="columnList" :loading="tableSource.loading"
    @change="tableSource.onTableChange" @refresh="tableSource.refresh"
  >
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'displayName'">
        <e-button link @click="editRow(record)">{{ text }}</e-button>
      </template>
    </template>
  </ep-data-grid>
</template>

<script setup>
import { reactive } from 'vue';
import { EpDataGrid, Hooks, Utils } from '@epframe/eui-core';

const { useTableDataSource } = Hooks;

const editRow = (row) => {
  Utils.logger.info(row);
};

const columnList = [
  { dataIndex: 'displayName', title: '用户姓名', ellipsis: true },
  { dataIndex: 'showLoginId', title: '用户登录名', width: 150 },
  { dataIndex: 'ouName', title: '所在部门', ellipsis: true, width: 200 },
  { dataIndex: 'orderNumber', title: '排序', width: 100, sorter: true }
];

// 搜索条件
const searchParams = reactive({
  userName: '',
  loginId: '',
  ouName: '',
});
// tableSource 具备以下属性： { dataSource, pageSize, current, total, loading, refresh, onTableChange }
const tableSource = useTableDataSource(
  'https://fe.epoint.com.cn/mock/752/eui-vue/frameuserlistaction/getDataGridData',
  {
    requestType: 'restful',
    columns: columnList,
    params: searchParams,
  }
);
</script>
```

## 可编辑单元格

- 配置 `columns` 中的项的 `editor` 属性，即可实现单元格的编辑功能。

`editor` 属性格式如下：

```ts
{
  type: 'ep-input', // 编辑器类型，可选值为 ep-input、ep-select 等组件库中的表单控件名字
  props: {
    // 编辑器的属性配置，根据不同的类型，属性配置不同
    maxlength: 10,
  },
}
```
- 通过组件的 `getModifiedData` 方法可以获取到编辑后的数据。

**Demo 示例**: `@epframe/eui-core/components/data-grid/edit.vue`

```vue
<template>
  <ep-data-grid ref="tableRef" id-field="userGuid" :data="tableSource.dataSource" :total="tableSource.total"
    :current="tableSource.current" :page-size="tableSource.pageSize" :columns="columnList"
    :loading="tableSource.loading" @change="tableSource.onTableChange" @refresh="tableSource.refresh">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'displayName'">
        <e-button link @click="editRow(record)">{{ text }}</e-button>
      </template>
    </template>
  </ep-data-grid>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { EpDataGrid, Hooks, Utils } from '@epframe/eui-core';

const { useTableDataSource } = Hooks;

const tableRef = ref();

const editRow = (row) => {
  Utils.logger.info(row);
};

const columnList = [
  { dataIndex: 'displayName', title: '用户姓名', ellipsis: true },
  {
    dataIndex: 'showLoginId',
    title: '用户登录名',
    width: 150,
    editor: { type: 'e-input', props: { maxLength: 20 } },
  },
  { dataIndex: 'ouName', title: '所在部门', ellipsis: true, width: 200 },
  {
    dataIndex: 'orderNumber',
    title: '排序',
    width: 100,
    sorter: true,
    editor: { type: 'e-input-number', props: { min: 0, max: 99999999 } },
  }
];

// 搜索条件
const searchParams = reactive({
  userName: '',
  loginId: '',
  ouName: '',
});
// tableSource 具备以下属性： { dataSource, pageSize, current, total, loading, refresh, onTableChange }
const tableSource = useTableDataSource(
  'https://fe.epoint.com.cn/mock/752/eui-vue/frameuserlistaction/getDataGridData',
  {
    requestType: 'restful',
    columns: columnList,
    params: searchParams,
  }
);
// 通过getModifiedData获取修改后的数据
Utils.logger.info(tableRef.value.getModifiedData());
</script>

```

## 操作列

- 通过配置 `key` 值为 `action` 的列来实现操作列的功能。

`action` 属性格式如下：

```ts
{
  asText: false, // 是否以文本形式展示操作项，默认值为 false
  items: [ // 操作项列表
    {
      icon: 'Edit', // 操作项的图标，可选值为组件库中的图标名字
      label: '修改', // 操作项的文本标签
      onClick: (row) => { logger.info(row); }, // 操作项的点击事件处理函数
      visible: (row) => row.sex === '女', // 操作项是否可见的判断函数
      disabled: (row) => row.sex === '女', // 操作项是否禁用的判断函数
    },
  ],
  defaultShowItems: 4, // 默认展示的操作项数量，默认值为 4
}
```

**Demo 示例**: `@epframe/eui-core/components/data-grid/action.vue`

```vue
<template>
  <ep-data-grid id-field="userGuid" :data="tableSource.dataSource" :total="tableSource.total"
    :current="tableSource.current" :page-size="tableSource.pageSize" :columns="columnList" :loading="tableSource.loading"
    @change="tableSource.onTableChange" @refresh="tableSource.refresh"
  >
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'displayName'">
        <e-button link @click="editRow(record)">{{ text }}</e-button>
      </template>
    </template>
  </ep-data-grid>
</template>

<script setup>
import { reactive } from 'vue';
import { EpDataGrid, Hooks, Utils } from '@epframe/eui-core';

const { useTableDataSource } = Hooks;
const { logger } = Utils;

const editRow = (row) => {
  logger.info(row);
};

const columnList = [
  { dataIndex: 'displayName', title: '用户姓名', ellipsis: true },
  { dataIndex: 'showLoginId', title: '用户登录名', width: 150 },
  { dataIndex: 'ouName', title: '所在部门', ellipsis: true, width: 200 },
  {
    dataIndex: 'orderNumber',
    title: '排序',
    width: 100,
    sorter: true
  },
  {
    title: '操作',
    width: 140,
    key: 'action',
    action: {
      asText: false,
      items: [
        { icon: 'Edit', label: '修改', onClick: (row) => {logger.info(row); }, visible: (row) => row.sex === '女' },
        { icon: 'Setting', label: '配置', onClick: (row) => {logger.info(row); }, disabled: (row) => row.sex === '女'},
      ],
    },
  },
];

// 搜索条件
const searchParams = reactive({
  userName: '',
  loginId: '',
  ouName: '',
});
// tableSource 具备以下属性： { dataSource, pageSize, current, total, loading, refresh, onTableChange }
const tableSource = useTableDataSource(
  'https://fe.epoint.com.cn/mock/752/eui-vue/frameuserlistaction/getDataGridData',
  {
    requestType: 'restful',
    columns: columnList,
    params: searchParams,
  }
);
</script>
```

## API

### 属性

| 属性名               | 说明                                                                                                                                                | 类型      | 默认值 |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------ |
| idField              | 主键字段名字                                                                                                                                        | `string`  | —      |
| data                 | 数据源                                                                                                                                              | `Array`   | []     |
| total                | 总记录数                                                                                                                                            | `number`  | —      |
| pageSize             | 每页大小                                                                                                                                            | `number`  | —      |
| current              | 当前页码                                                                                                                                            | `number`  | —      |
| columns              | 列配置,见 [table](http://192.168.219.170/docs/vue/latest/component/component/table.html#column)                                                     | `Array`   | []     |
| autoHeight           | 高度是否自动撑开，需配合 `fui-page` 的 class 所在容器添加 `auto-h` class 一起使用上                                                                 | `boolean` | false  |
| showIndexColumn      | 是否显示序号列                                                                                                                                      | `boolean` | true   |
| showSelectionColumn  | 是否显示多选列                                                                                                                                      | `boolean` | false  |
| indexColumnWidth     | 序号列宽度                                                                                                                                          | `number`  | 40     |
| selectionColumnWidth | 多选列宽度                                                                                                                                          | `number`  | —      |
| defaultShowIndex     | 选择列合并序号列,效果见[Table表格-选择列合并序号列功能](http://192.168.219.170/docs/vue/latest/component/component/table.html#选择列合并序号列功能) | `boolean` | false  |
| loading              | 是否正在加载数据                                                                                                                                    | `boolean` | false  |
| height               | 高度                                                                                                                                                | `number`  | —      |

### 插槽

| 名称     | 描述                               |
| -------- | ---------------------------------- |
| bodyCell | 与 ETable 控件的 bodyCell 插槽一致 |

### 事件

| 名称    | 描述                                                     | 类型                                               |
| ------- | -------------------------------------------------------- | -------------------------------------------------- |
| refresh | 调用 refresh 方法触发的事件                              | ^[Function]`() => void`                            |
| change  | 分页、排序、筛选变化时触发，和 ETable 的 change 事件一致 | ^[Function]`(pagination, filters, sorter) => void` |

### 方法

| 名称             | 描述                                                                                       | 类型                          |
| ---------------- | ------------------------------------------------------------------------------------------ | ----------------------------- |
| refresh          | 重置表格状态并触发 refresh 事件。该方法不会正真发请求数据，需要在 refresh 事件中自己发请求 | `() => void`                  |
| clearSelection   | 清空勾选状态                                                                               | `() => void`                  |
| getSelectionRows | 获取勾选的行数据                                                                           | `() => Record<string, any>[]` |
| getModifiedData  | 获取修改的数据                                                                             | `() => Record<string, any>[]` |
| isValid          | 获取表格验证状态                                                                           | `() => boolean`               |