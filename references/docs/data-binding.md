# 数据绑定详解

> epoint Vue 数据绑定规范

## Vue 双向绑定

在 Vue 框架中，我们主要使用 `v-model` 进行数据的双向绑定。

```vue
<e-input v-model:value="userName" />
```

## 数据源 Hooks

对于表格、下拉框等需要从后端获取数据的组件，推荐使用框架提供的 Hooks。

详细文档请参考：[api-core-hooks.md](./api/api-core-hooks.md)

### useDataSource

```js
import { Hooks } from '@epframe/eui-core';
const { useDataSource } = Hooks;

const { dataSource } = useDataSource('action/getUrl');
```

### useTableDataSource

用于表格数据的加载、分页处理。

```js
import { Hooks } from '@epframe/eui-core';
const { useTableDataSource } = Hooks;

const tableSource = useTableDataSource('action/getList', { ... });
```

---

_epoint 框架前端开发规范 (Vue 版)_
