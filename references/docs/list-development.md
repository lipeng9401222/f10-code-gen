# 表格基础用法

> epoint Vue 表格页面开发规范

## EpDataGrid 企业级表格

`EpDataGrid` 是基于 `@epframe/eui-core` 的核心组件，封装了数据源管理、分页、编辑等常用功能。

详细文档请参考：[components-eui-core-ep-datagrid.md](./ep-components/components-eui-core-ep-datagrid.md)

### 基础示例

```vue
<template>
    <ep-data-grid
        id-field="userGuid"
        :data="tableSource.dataSource"
        :total="tableSource.total"
        :current="tableSource.current"
        :page-size="tableSource.pageSize"
        :columns="columnList"
        :loading="tableSource.loading"
        @change="tableSource.onTableChange"
        @refresh="tableSource.refresh">
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

const columnList = [
    { dataIndex: 'displayName', title: '用户姓名', ellipsis: true },
    { dataIndex: 'showLoginId', title: '用户登录名', width: 150 },
    { dataIndex: 'ouName', title: '所在部门', ellipsis: true, width: 200 }
];

const tableSource = useTableDataSource('frameuserlistaction/getDataGridData', {
    requestType: 'restful',
    columns: columnList
});
</script>
```

## 布局示例

创建列表页时，请参考以下布局示例：

| 示例类型 | 说明                                                            |
| -------- | --------------------------------------------------------------- |
| 容器布局 | [components-container.md](./components/components-container.md) |
| 布局示例 | `examples/container/` 目录下的 Vue 文件                         |

### AI Agent 加载建议

创建列表页时，**建议同时加载以下文档**：

```yaml
load:
    - 'frontend/list-development.md' # 本文档
    - 'frontend/ep-components/components-eui-core-ep-datagrid.md' # 表格组件文档
    - 'frontend/api/api-hooks-data-model-hooks.md' # 数据 Hooks
```

---

_epoint 框架前端开发规范 (Vue 版)_
