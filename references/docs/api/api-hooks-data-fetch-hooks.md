---
title: 数据获取Hooks
originUrl: http://192.168.219.170/docs/vue/latest/frame/api/hooks/data-fetch-hooks/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/api/hooks/data-fetch-hooks/)

> **💡 提示**
>
> 此文档适用于未使用统一编码模型的场景。统一编码模型场景请使用对应的 [`useXxxModel` 方法](api-hooks-data-model-hooks.md)。

为了方便实现控件数据源的请求和绑定，我们在 `@epoint-fe/eui-hooks` 包中提供了 `useDataSource`、 `useCodeDataSource`、 `useTableDataSource` 和 `useTreeDataSource` 四个 hooks。

## useDataSource

给常规包含数据源的控件（例如下拉选择、多选列表等）使用。其方法定义如下：

```ts
/** eslint-disable @typescript-eslint/no-explicit-any */
type DataSourceItemType = {
  label: string;
  value: string | number;
  disabled?: boolean;
};
type DataSourceOption = Partial<{
    transform: (data: any) => DataSourceItemType[]; // 个性化数据转换方法
    labelField: string; // 接口返回数据中对应 label 值的字段名字，默认值为 'label'
    valueField: string; // 接口返回数据中对应 value 值的字段名字，默认值为 'value'
    params: MaybeRef<Record<string, unknown>>; // 请求要提交的 params 参数
    cmdParams: MaybeRef<Record<string, unknown>>; // 请求要提交的 cmdParams 参数
    beforeRequest: (config: Partial<AxiosRequestConfig>) => Partial<AxiosRequestConfig> | undefined; // 请求发送前的事件钩子，可通过其个性化请求配置 config
    afterRequest: (data: any) => any; // 请求成功后，在调用 transform 转化数据之前的事件钩子
    requestType?: 'action2rest' |'restful'; // 请求方式，'restful' 模式为新的编码模型模式。不传此参数时，默认使用 action2rest 模式。
    cache: boolean; // 是否启用缓存。启用后，在 5 分钟内相同的请求会直接取前端缓存，不再向服务端发送请求。
    lazy: boolean; // 是否懒加载。启用后，初始化时不会自动发送请求，需要自己主动调用 loadData 方法发起请求。
}>;

export declare function useDataSource(
  url: string, // 请求接口地址
  options?: DataSourceOption
): {
  dataSource: Readonly<Ref<DataSourceItemType[]>>; // 数据源
  loading: Readonly<Ref<boolean>>; // 是否加载中
  refresh: () => Promise<void>; // 刷新数据方法
  loadData: (needLoad: boolean) => void; // 加载数据方法，只有在数据源未加载时调用才起效果
};
```

### 基础使用

对于框架标准的控件数据源接口，只需配置 `url` 参数即可：

```vue
<template>
  <e-select :options="dataSource" />
</template>

<script setup>
import { useDataSource } from '@epoint-fe/eui-hooks';

const { dataSource } = useDataSource('frameaction/getComboboxModel');
</script>
```

### 指定取值字段

如果接口返回的数据是非框架标准的字段，可以通过配置 `labelField` 和 `valueField` 来指定 label 和 value 对应的字段。

例如返回的数据是如下的格式：

```json
{
  "data": [
    { "title": "标签1", "value": "1" },
    { "title": "标签2", "value": "2" }
  ]
}
```

则可以指定 `labelField` 为 `'title'`：

```js
const { dataSource } = useDataSource('frameaction/getComboboxModel', {
  labelField: 'title'
});
```

### 自定义转换方法

如果仅通过配置 `labelField` 和 `valueField` 来用默认的转化方法无法满足需求（例如 `label` 的值是要通过几个字段拼接出来的，或者返回的数据不在响应的 `data` 节点下），那就需要配置 `transform` 方法来个性化转化逻辑了。

此方法接受原始响应数据，要求返回直接控件可用的数据格式 `Array<{value: string, label: string}>`。

> **💡 提示**
>
> 配置 `transform` 后，就不会再走内部默认的转化逻辑了，所以再配置 `labelField` 和 `valueField` 就无效了。

### 懒加载

通过 `options.lazy` 参数开启懒加载，并在控件的下拉菜单显示时通过调用 `loadData` 方法加载数据源。

```vue
<template>
  <e-select :options="dataSource" :loading="loading" @visible-change="loadData"/>
</template>

<script setup>
import { useDataSource } from '@epoint-fe/eui-hooks';

const { dataSource, loading, loadData } = useDataSource('frameaction/getComboboxModel', { lazy: true });

</script>
```

### 启用缓存

通过 `options.cache` 参数开启缓存，在 5 分钟内相同的请求会直接取前端缓存，不再向服务端发送请求。

```vue
<template>
  <e-select :options="dataSource" :loading="loading"/>
</template>

<script setup>
import { useDataSource } from '@epoint-fe/eui-hooks';

const { dataSource, loading } = useDataSource('frameaction/getComboboxModel', { cache: true });

</script>
```

## useCodeDataSource

专门给代码项数据源使用。其方法定义如下：

```ts
export declare function useDataSource(
  codeName: string, // 代码项名称
  options?: DataSourceOption // 与 useDataSource 相同的参数
): {
  dataSource: Readonly<Ref<DataSourceItemType[]>>; // 数据源
  loading: Readonly<Ref<boolean>>; // 是否加载中
  refresh: () => Promise<void>; // 刷新数据方法
  loadData: (needLoad: boolean) => void; // 加载数据方法，只有在数据源未加载时调用才起效果
}
```

方法内部已默认将 `labelField` 设置为 `'text'` 来对接代码项接口。

使用示例：

```vue
<template>
  <e-select :options="dataSource" />
</template>

<script setup>
import { useCodeDataSource } from '@epoint-fe/eui-hooks';

const { dataSource } = useCodeDataSource('sex');
</script>
```

## useTreeDataSource

专门给树类型控件（树，下拉树等）使用。其方法定义如下：

```ts
export declare function useTreeDataSource(
  url: string, // 请求接口地址
  options?: {
    cmdParams?: MaybeRef<Record<string, any>>; // 请求要提交的 cmdParams 参数，只在 'action2rest' 模式下生效
    customParams?: MaybeRef<Record<string, any>>; // 请求要提交的 customParams 参数，只在 'restful' 模式下生效
    beforeRequest?: (config: Partial<AxiosRequestConfig>) => Partial<AxiosRequestConfig> | undefined; // 请求发送前的事件钩子，可通过其个性化请求配置 config
    afterRequest?: (data: any) => any; // 请求成功后，返回数据之前的事件钩子
    requestType?: 'action2rest' | 'restful'; // 请求方式，'restful' 模式为新的编码模型模式。不传此参数时，默认使用 action2rest 模式。
    lazy: boolean; // 是否懒加载。启用后，初始化时不会自动发送请求，需要自己主动调用 loadData 方法发起请求。
  }
): {
  dataSource: Readonly<Ref<Array>>; // 数据源
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
};
```

使用示例：

```vue
<template>
  <e-tree v-model:expanded-keys="expandedKeys" v-model:checked-keys="checkedKeys" :data="dataSource" :field-names="fieldNames" :load-more="loadMore" show-filter :filter-method="filterMethod" />
</template>

<script setup>
import { useTreeDataSource } from '@epoint-fe/eui-hooks';

const { dataSource, fieldNames, expandedKeys, checkedKeys, loadMore, filterMethod } = useTreeDataSource('frameaction/getTreeModel');
</script>
```

### 懒加载

通过 `options.lazy` 参数开启懒加载，并在控件的下拉菜单显示时通过调用 `loadData` 方法加载数据源。

```vue
<template>
  <e-tree-select :data="dataSource" :field-names="fieldNames" :loading="loading" @visible-change="loadData"/>
</template>

<script setup>
import { useDataSource } from '@epoint-fe/eui-hooks';

const { dataSource, fieldNames, loadMore, loadData } = useTreeDataSource('frameaction/getTreeModel', { lazy:true });
</script>
```

### 级联控件 ^(1.1.5+)

`1.1.5` 版本后 `useTreeDataSource` 也可用于级联组件 `ECascader`。

```vue
<template>
  <e-cascader v-model="value" :options="dataSource" :props="{
    ...fieldNames,
    loadMore,
    lazy: true
  }" />
</template>

<script setup>
import { ref } from 'vue';
import { useTreeDataSource } from '@epoint-fe/eui-hooks';

const value = ref('');
const { dataSource, fieldNames, loadMore } = useTreeDataSource('frameaction/getTreeModel');
</script>
```

> **💡 提示**
>
> `epoint-fe/eui-hooks` 包版本需大于等于 `1.1.5`，并且 `epoint-fe/eui-components` 包版本需大于等于 `1.0.27`。

## useTableDataSource

专门给表格控件使用。其方法定义如下：

```ts
export declare function useTableDataSource(
  url: string, // 请求接口地址
  options: {
    idField: string; // 表格的 idField
    pageSize?: number; // 默认 pageSize 大小
    current?: number; // 默认当前页数
    params?: MaybeRef<RecordType>; // 请求要提交的 params 参数
    customParams?: MaybeRef<any>; // 请求要提交的 customParams 参数
    beforeRequest?: (config: Partial<AxiosRequestConfig>) => Partial<AxiosRequestConfig> | undefined; // 请求发送前的事件钩子，可通过其个性化请求配置 config
    afterRequest?: (data: any) => any; // 请求成功后，返回数据之前的事件钩子
    lazy?: boolean; // 是否懒加载。启用后，初始化时不会自动发送请求，需要自己主动调用 refresh 方法发起请求。
    autoSearch?: boolean; // 是否在 params 改变时自动发起请求。默认值为 true。设置成false后，需主动调用 refresh 方法才会触发搜索
  }
): {
  dataSource: Readonly<Ref<Array>>; // 数据源
  total: Readonly<Ref<number>>; // 总记录数
  current: Readonly<Ref<number>>; // 当前页数
  pageSize: Ref<number>; // 每页大小
  loading: Ref<boolean>; // 是否显示 loading
  refresh: () => Promise<void>; // 刷新方法
  onTableChange: (pagination: paginationType, filters: any, sorter: SorterType) => void; // 表格的 change 事件处理方法
  goToFirstPage: () => void; // 返回到第一页方法
};
```

使用示例：

```vue
<template>
  <ep-data-grid id-field="userGuid" :data="dataSource" :total="total" :current="current" :page-size="pageSize" :columns="columnList" :loading="loading" @change="onTableChange" @refresh="refresh" />
</template>

<script setup>
import { EpDataGrid, Hooks } from '@epframe/eui-core';
const columnList = [
  { dataIndex: 'displayName', title: '用户姓名', ellipsis: true },
  { dataIndex: 'showLoginId', title: '用户登录名', width: 150 },
  { dataIndex: 'ouName', title: '所在部门', ellipsis: true, width: 200 }
];

const { dataSource, pageSize, current, total, loading, refresh, onTableChange } = Hooks.useTableDataSource('/frameaction/getDataGridData', {
  idField: 'userGuid'
});
</script>
```

### action2rest 模式

对于请求为 action2rest 模式的接口，我们专门提供了 `useAction2restTableDataSource` 方法。其方法定义如下：

```ts
export declare function useAction2restTableDataSource(
  url: string, // 请求接口地址
  options: {
    columns: MaybeRef<{ dataIndex?: string }[]>; // 表格的列配置
    idField: string; // 表格的 idField
    pageSize?: number; // 默认 pageSize 大小
    current?: number; // 默认当前页数
    params?: MaybeRef<RecordType>; // 请求要提交的 params 参数
    cmdParams?: MaybeRef<any>; // 请求要提交的 cmdParams 参数
    beforeRequest?: (config: Partial<AxiosRequestConfig>) => Partial<AxiosRequestConfig> | undefined; // 请求发送前的事件钩子，可通过其个性化请求配置 config
    afterRequest?: (data: any) => any; // 请求成功后，返回数据之前的事件钩子
    lazy?: boolean; // 是否懒加载。启用后，初始化时不会自动发送请求，需要自己主动调用 refresh 方法发起请求。
    autoSearch?: boolean; // 是否在 params 改变时自动发起请求。默认值为 true。设置成false后，需主动调用 refresh 方法才会触发搜索
  }
): {
  dataSource: Readonly<Ref<Array>>; // 数据源
  total: Readonly<Ref<number>>; // 总记录数
  current: Readonly<Ref<number>>; // 当前页数
  pageSize: Ref<number>; // 每页大小
  loading: Ref<boolean>; // 是否显示 loading
  refresh: () => Promise<void>; // 刷新方法
  onTableChange: (pagination: paginationType, filters: any, sorter: SorterType) => void; // 表格的 change 事件处理方法
  goToFirstPage: () => void; // 返回到第一页方法
};
```

使用示例：

```vue
<template>
  <ep-data-grid id-field="userGuid" :data="dataSource" :total="total" :current="current" :page-size="pageSize" :columns="columnList" :loading="loading" @change="onTableChange" @refresh="refresh" />
</template>

<script setup>
import { EpDataGrid, Hooks } from '@epframe/eui-core';
const columnList = [
  { dataIndex: 'displayName', title: '用户姓名', ellipsis: true },
  { dataIndex: 'showLoginId', title: '用户登录名', width: 150 },
  { dataIndex: 'ouName', title: '所在部门', ellipsis: true, width: 200 }
];

const { dataSource, pageSize, current, total, loading, refresh, onTableChange } = Hooks.useAction2restTableDataSource('/frameaction/getDataGridData', {
  idField: 'userGuid'
  columns: columnList
});
</script>
```

## 解构和不解构的情况

通常使用情况如下：

```vue
<template>
  <e-select :options="dataSource" />
  <e-select :options="dataSource1" />
  <e-select :options="dataSource2" />
  <e-select :options="dataSource3" />
  <e-select :options="dataSource4" />
  <e-tree v-model:expanded-keys="expandedKeys" :data="treeData" :field-names="fieldNames" :load-more="loadMore" show-filter :filter-method="filterMethod" />
  <data-grid id-field="userGuid" :data="gridData" :total="total" :current="current" :page-size="pageSize" :columns="columnList" :loading="loading" @change="onTableChange" @refresh="refresh" />
  <data-grid id-field="ouGuid" :data="gridData2" :total="total2" :current="current2" :page-size="pageSize2" :columns="columnList2" :loading="loading2" @change="onTableChange2" @refresh="refresh2" />
</template>
<script setup>
const { dataSource } = useDataSource('frameaction/getComboboxModel');
const { dataSource: dataSource1 } = useDataSource('frameaction/getComboboxModel1');
const { dataSource: dataSource2 } = useDataSource('frameaction/getComboboxModel2');
const { dataSource: dataSource3 } = useDataSource('frameaction/getComboboxModel3');
const { dataSource: dataSource4 } = useDataSource('frameaction/getComboboxModel4');
const {
  dataSource: gridData,
  pageSize,
  current,
  total,
  loading,
  refresh,
  onTableChange
} = useTableDataSource('/frameaction/getDataGridData', {
  idField: 'userGuid',
  columns: columnList
});

const {
  dataSource: gridData2,
  pageSize: pageSize2,
  current: current2,
  total: total2,
  loading: loading2,
  refresh: refresh2,
  onTableChange: onTableChange2
} = useTableDataSource('/frameaction/getDataGridData2', {
  idField: 'ouGuid',
  columns: columnList2
});

const { dataSource: treeData, fieldNames, expandedKeys, loadMore, filterMethod } = useTreeDataSource('frameaction/getTreeModel');
</script>
```

可以看到在页面多个控件均需要数据源的情况下，调用 `useDataSource` / `useTableDataSource` / `useTreeDataSource` 后，由于返回的数据对象中的格式都是一样的，直接使用解构语法的情况必须为每个字段指定新的别名。当页面控件比较多，尤其是多个表格的情况下，这样的写法会显得比较冗余。

此时可以考虑时使用非解构的方式，直接使用返回的对象，这样就不需要为每个字段指定新的别名了。 ^(@epoint-fe/eui-hooks@0.0.20)

需要注意的是，不能把返回对象的key直接绑定给控件，而是：

- 每个值类型的返回值中都有同名的加 `_` 前缀的字段，这些字段已经通过 Vue 的 `toValue` 方法转换为不需要使用 `.value` 访问的响应式的数据，可以直接在模板中使用。
- 手动加上 `.value` 后缀的字段，这些字段响应式的是 Ref 对象，这种情况下Vue不会自动解构，需要使用 `.value` 访问。

```vue
<template>
  <e-select :options="comboSource._dataSource" />
  <e-select :options="comboSource1._dataSource" />
  <e-select :options="comboSource2._dataSource" />
  <!-- 不习惯 + 下划线也可以在后面.value -->
  <e-select :options="comboSource3.dataSource.value" />
  <e-select :options="comboSource4.dataSource.value" />

  <e-tree
    v-model:expanded-keys="treeSource._expandedKeys"
    :data="treeSource._dataSource"
    :field-names="treeSource._fieldNames"
    :load-more="treeSource.loadMore"
    show-filter
    :filter-method="treeSource.filterMethod"
  />
  <data-grid
    id-field="userGuid"
    :data="tableSource._dataSource"
    :total="tableSource._total"
    :current="tableSource._current"
    :page-size="tableSource._pageSize"
    :columns="columnList"
    :loading="tableSource._loading"
    @change="tableSource.onTableChange"
    @refresh="tableSource.refresh"
  />
  <data-grid
    id-field="ouGuid"
    :data="tableSource2._dataSource"
    :total="tableSource2._total"
    :current="tableSource2._current"
    :page-size="tableSource2._pageSize"
    :columns="columnList2"
    :loading="tableSource2._loading"
    @change="tableSource2.onTableChange"
    @refresh="tableSource2.refresh"
  />
</template>
<script setup>
const comboSource = useDataSource('frameaction/getComboboxModel');
const comboSource1 = useDataSource('frameaction/getComboboxModel1');
const comboSource2 = useDataSource('frameaction/getComboboxModel2');
const comboSource3 = useDataSource('frameaction/getComboboxModel3');
const comboSource4 = useDataSource('frameaction/getComboboxModel4');

const tableSource = useTableDataSource('/frameaction/getDataGridData', {
  idField: 'userGuid',
  columns: columnList
});
const tableSource2 = useTableDataSource('/frameaction/getDataGridData2', {
  idField: 'ouGuid',
  columns: columnList2
});

const treeSource = useTreeDataSource('frameaction/getTreeModel');
</script>
```

此时js的代码量将可以大幅度减少。

> **💡 提示**
>
> 需要使用 `_` 前缀或者 `.value` 后缀的字段的根本原因是Vue内针对Ref对象的处理机制，Vue会自动解构Ref对象，但是对于对象内的Ref的访问，Vue不会自动解构，需要手动添加`.value`后缀。
> 
> 总结规则如下：
> 
> 自动解包的情况：
> 
> - 模板中直接使用 ref
> - 作为 props 直接传递：`:msg="message"`
> - reactive 对象中的 ref：`reactive({ count: ref(0) }).count`
> - 解构后的 ref：`const { count } = useHook()`
> 
> 不会自动解包的情况：
> 
> - 普通对象中的 ref：`{ count: ref(0) }.count`
> - 数组中的 ref：`[ref(0)][0]`
> 
> 此处提供的 `useXXXSource` 返回的就是一个普通对象，其中的数据属性是Ref类型，不符合Vue的自动解包规则，所以需要手动添加`.value`后缀，或使用方法内额外返回的处理定好的数据(加 `_` 前缀)。

## 提示

> **⚠️ 警告**
>
> 若果需要传递 cmdParams 参数，不能直接拼接在 `url` 参数上，而是应该通过 `options` 参数中的 `cmdParams` 字段进行传递。
> 
> ```js
> // 错误用法
> const { dataSource } = useDataSource('frameaction/getComboboxModel?cmdParams=xx代码项');
> 
> // 正确用法
> // eslint-disable-next-line no-redeclare
> const { dataSource } = useDataSource('frameaction/getComboboxModel', {
>   cmdParams: 'xx代码项'
> });
> ```