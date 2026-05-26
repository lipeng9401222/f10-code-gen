---
title: 数据子模型 Hooks
originUrl: http://192.168.219.170/docs/vue/latest/frame/api/hooks/data-model-hooks/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/api/hooks/data-model-hooks/)

为了方便在数据模型中与控件数据源进行绑定，我们提供了  `useDataModel`、 `useTableDataModel` 和 `useTreeDataModel` 三个 hooks ，它们分别用于绑定普通列表类控件数据模型、表格数据模型和树状数据模型。其用法和对应的 [数据获取 Hooks](api-hooks-data-fetch-hooks.md) 基本相同。

## useDataModel

`useDataModel` 用于绑定普通列表类控件数据模型。其参数和返回值与 [`useDataSource`](api-hooks-data-fetch-hooks.md#useDataSource) 基本相同。

与 `useDataSource` 不同的是，`useDataModel` 返回的控件数据源是在 `data` 和 `options` 字段中。

```ts
export declare function useDataModel(
  url: string, // 请求接口地址
  options?: DataSourceOption
): {
  data: Readonly<Ref<DataSourceItemType[]>>; // 数据源，方便数据模型使用
  options: Readonly<Ref<DataSourceItemType[]>>; // 数据源，方便与控件绑定
  loading: Readonly<Ref<boolean>>; // 是否加载中
  refresh: () => Promise<void>; // 刷新数据方法
  loadData: (needLoad: boolean) => void; // 加载数据方法，只有在数据源未加载时调用才起效果
  lazy: boolean; // 标识模型是否懒加载
};
```

### 使用示例

```vue
<template>
  <e-select v-model="model.models.sex" placeholder="选择您的性别" :options="model.models.sexInfo.options" :loading="model.models.sexInfo.loading" @visible-change="model.models.sexInfo.loadData" />
</template>

<script setup>
import { Utils, Hooks } from '@epframe/eui-core';

const model = Utils.defineDataModel(() => {
  const sex = ref('');
  const sexInfo = Hooks.useDataModel('/api/sex', {
    lazy: true,
  });

  return {
    models: {
      sex,
      sexInfo,
    }
  };
});
</script>
```

## useTreeDataModel

`useTreeDataModel` 用于绑定树状数据模型。其参数和返回值与 [`useTreeDataSource`](api-hooks-data-fetch-hooks.md#useTreeDataSource) 基本相同。

与 `useTreeDataSource` 不同的是，`useTreeDataModel` 返回的控件数据源是在 `data` 字段中。

```ts
export declare function useTreeDataModel(
  url: string, // 请求接口地址
  options?: TreeOptions
): {
  data: Readonly<Ref<Array>>; // 数据源，方便数据模型使用
  fieldNames: Readonly<{
    value: 'id';
    label: 'text';
  }>; // 树控件 fieldNames 配置
  loadMore: (node: Record<string, any>) => Promise<void>; // 树控件懒加载的方法
  filterMethod: (key: string) => Promise<Array>; // 树控件过滤方法
  expandedKeys: Ref<string[]>; // 树控件展开节点的 key 数组
  checkedKeys: Ref<string[]>; // 树控件勾选节点的 key 数组，初始值会根据数据源中节点的 checked 值来构建
  refresh: (keepExpand: boolean = false) => Promise<void>; // 刷新树数据方法，keepExpand 参数控制刷新后是否保持展开状态
  loadData: (needLoad: boolean) => void; // 加载数据方法，只有在数据源未加载时调用才起效果
  lazy: boolean; // 标识模型是否懒加载
};
```

### 使用示例

```vue
<template>
  <e-tree
    :data="model.treeModel.data"
    :field-names="model.treeModel.fieldNames"
    :load-more="model.treeModel.loadMore"
    show-filter
    :filter-method="model.treeModel.filterMethod"
    v-model::expanded-keys="model.treeModel.expandedKeys"
    v-model::checked-keys="model.treeModel.checkedKeys"
  />
</template>

<script setup>
import { Utils, Hooks } from '@epframe/eui-core';

const model = Utils.defineDataModel(() => {
  const treeModel = Hooks.useTreeDataModel('/api/tree');

  return {
    models: {
      treeModel
    }
  };
});
</script>
```

## useTableDataModel

`useTableDataModel` 用于绑定表格数据模型。其参数和返回值与 [`useTableDataSource`](api-hooks-data-fetch-hooks.md#useTableDataSource) 基本相同。

与 `useTableDataSource` 不同的是，`useTableDataModel` 返回的控件数据源是在 `data` 字段中，并且 `onTableChange` 方法改为了 `change` 方法。

```ts
export declare function useTableDataModel(
  url: string, // 请求接口地址
  options?: TableOptions
): {
  data: Readonly<Ref<Array>>; // 数据源，方便数据模型使用
  total: Readonly<Ref<number>>; // 总记录数
  current: Readonly<Ref<number>>; // 当前页数
  pageSize: Ref<number>; // 每页大小
  loading: Ref<boolean>; // 是否显示 loading
  columns: Ref<ColumnType[]>; // 列配置
  idField: string; // 主键字段
  refresh: () => Promise<void>; // 刷新方法
  change: (pagination: paginationType, filters: any, sorter: SorterType) => void; // 表格的 change 事件处理方法
  goToFirstPage: () => void; // 返回到第一页方法
  lazy: boolean; // 标识模型是否懒加载
};
```

### 使用示例

```vue
<template>
  <ep-data-grid
    :data="model.tableModel.data"
    :total="model.tableModel.total"
    :current="model.tableModel.current"
    :page-size="model.tableModel.pageSize"
    :columns="model.tableModel.columns"
    :loading="model.tableModel.loading"
    :id-field="model.tableModel.idField"
    @change="model.tableModel.change"
    @refresh="model.tableModel.refresh"
  />
</template>

<script setup>
import { EpDataGrid, Utils, Hooks } from '@epframe/eui-core';

const model = Utils.defineDataModel(() => {
  const tableModel = Hooks.useTableDataModel('/api/table', {
    idField: 'userGuid'
    columns: [
      { dataIndex: 'displayName', title: '用户姓名', ellipsis: true },
      { dataIndex: 'showLoginId', title: '用户登录名', width: 150 },
      { dataIndex: 'ouName', title: '所在部门', ellipsis: true, width: 200 }
    ]
  });

  return {
    models: {
      tableModel
    }
  };
});
</script>
```