---
title: DataExport
originUrl: http://192.168.219.170/docs/vue/latest/frame/components/eui-core/ep-data-export/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/components/eui-core/ep-data-export/)

此组件由 `@epframe/eui-core` 包提供。

DataExport 导出控件是参照 F9 中的 mini.DataExport 控件开发的，用来导出表格数据的控件。

## 基础使用

- `grid` 属性用来指定要导出的表格组件，它的值是表格组件对象的引用。目前只支持`@epframe/eui-core` 包提供 [`DataGrid`](components-eui-core-ep-datagrid.md) 组件。
- `exportAction` 属性用来指定导出的接口地址。
- `fileName` 属性用来指定导出生成文件的名字。
- `params` 属性用来指定导出时的过滤条件，一般和绑定的表格控件的过滤条件一致。
- `getColumns` 属性可用来指定自定义获取待导出列数据，该属性是一个方法，需返回列数据，支持异步方法。

## 演示效果

**Demo 示例**: `@epframe/eui-core/components/data-export/base.vue`

```vue
<template>
  <e-data-export :grid="tableRef" file-name="部门列表" export-action="frameoulistaction/export" :params="params" />
  <ep-data-grid
    ref="tableRef"
    id-field="ouGuid"
    :data="dataSource"
    :total="total"
    :current="current"
    :page-size="pageSize"
    :columns="columnList"
    :loading="loading"
    @change="onTableChange"
    @refresh="refresh"
  />
</template>
<script setup>
import { ref } from 'vue';
import { EDataExport, EpDataGrid, Hooks } from '@epframe/eui-core';

const tableRef = ref();

const columnList = [
  {
    dataIndex: 'ouName',
    title: '部门名称',
  },
  {
    dataIndex: 'ouShortName',
    title: '部门简称',
    width: 280
  },
  {
    dataIndex: 'orderNumber',
    title: '排序',
    width: 100,
    sorter: true
  }
];
const params = {};
const { dataSource, pageSize, current, total, loading, refresh, onTableChange } = Hooks.useTableDataSource('https://fe.epoint.com.cn/mock/752/eui-vue/frameoulistaction/getDataGridData', {
  idField: 'ouGuid',
  columns: columnList,
  params
});
</script>

```

## 导出前钩子

组件提供了 `beforeExport` 钩子函数来支持外部在导出前做一些个性化处理。

```vue
<template>
  <e-data-export :grid="tableRef" file-name="部门列表" export-action="frameoulistaction/export" :before-export="beforeExport" />

</template>
<script setup>
import { ref } from 'vue';

const tableRef = ref();

const beforeExport = (data) => {
  // 可对导出请求的提交数据做个性化处理
  logger.info(data);

  // 做一些个性化验证，验证不成功可通过 return false 阻止导出
  return false;
}
</script>
```

## 自定义获取待导出列数据

组件提供了 `getColumns` 方法来支持外部自定义获取待导出列数据。可利用该方法来实现从服务端获取导出列数据。

```vue
<template>
  <e-data-export :grid="tableRef" file-name="部门列表" export-action="frameoulistaction/export" :get-columns="getColumns" />

</template>
<script setup>
import { ref } from 'vue';
import { Utils } from '@epframe/eui-core';

const { action2restAxios } = Utils;
const tableRef = ref();

const getColumns = async () => {

  const columns = await action2restAxios({
    url: '/frameoulistaction/getExportModel',
  });

  return columns;
}
</script>
```

## API

### 属性

| 属性名       | 说明                                                       | 类型                                             | 默认值            |
| ------------ | ---------------------------------------------------------- | ------------------------------------------------ | ----------------- |
| action       | 服务端导出的方法                                           | `string`                                         | 'getExportModel'  |
| beforeExport | 导出前的钩子函数，可通过修改参数来个性化请求数据或阻止导出 | ^[Function]`(data: Object) => void`              | —                 |
| exportAction | 导出请求接口地址                                           | `string`                                         | —                 |
| fileName     | 导出生成文件的名字                                         | `string`                                         | —                 |
| grid         | 要导出的表格组件引用                                       | `Ref<InstanceType<typeof DataGrid>>`             | —                 |
| gridAction   | 要导出表格的数据请求接口名字                               | `string`                                         | 'getDataGridData' |
| params       | 导出的过滤条件                                             | `Object`                                         | —                 |
| getColumns   | 自定义获取待导出列数据方法                                 | ^[Function]`() => Promise<Column[]> \| Column[]` | —                 |
| position     | 列值初始渲染时的位置，可选值为 left 和 right               | ^[enum]`'left' \| 'right'`                       | 'right'           |

### 事件

| 名称       | 描述               | 类型                    |
| ---------- | ------------------ | ----------------------- |
| show-panel | 弹出导出面板时触发 | ^[Function]`() => void` |
| hide-panel | 关闭导出面板时触发 | ^[Function]`() => void` |