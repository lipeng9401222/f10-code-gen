# F10 框架 API 开发指南（精简版）

> 仅保留常用入口与核心用法，详细说明请看文末参考文档。

---

## 核心包 @epframe/eui-core

- 提供组件、工具方法、Hooks、路由、状态管理、主题管理等能力。
- 常用导入：

```ts
import { Utils, Hooks, EpDataGrid } from '@epframe/eui-core';
```

---

## 请求库 Utils.request

### restfulAxios

- 标准编码模型接口。
- 适合对接框架统一编码模型，默认使用 JSON 请求体。

```ts
const res = await Utils.restfulAxios({
    url: '/user',
    method: 'POST',
    data: { name: 'test' }
});
```

### action2restAxios

- F9 action2rest 接口。
- 可选 `viewStateScope` 用于共享 viewState 数据范围。

```ts
const res = await Utils.action2restAxios({
    url: 'frameaction/getData',
    viewStateScope: 'customScope'
});
```

### requestAxios

- 普通接口请求（默认 `application/x-www-form-urlencoded`）。
- 用于非统一编码模型的常规后台接口。

```ts
const res = await Utils.requestAxios({
    url: '/api/demo/list',
    method: 'POST',
    data: JSON.stringify({ params: { pageIndex: 0, pageSize: 10 } })
});
```

### 统一响应格式

```ts
{ list: [], total: 0, message: '', state: true }
```

### 全局状态码处理

- 可注册状态码钩子，用于统一异常处理或登录态失效跳转。

```ts
Utils.register({
    requestStatusCodeHook: {
        401: () => {
            window.location.href = '/login';
            return false;
        }
    }
});
```

---

## 工具方法 Utils

### 配置

- `getConfig`：读取全局配置。
- `getFrameSysParam` / `refreshFrameSysParam`：读取与刷新系统参数。

```ts
const baseURL = Utils.getConfig<string>('baseURL');
Utils.refreshFrameSysParam();
```

### URL

- `getUrlParams`：读 query。
- `addUrlParams`：拼接 query。
- `getRightUrl`：得到正确服务端地址。
- `isAbsoluteURL`：判断绝对路径。

```ts
const params = Utils.getUrlParams();
const url = Utils.addUrlParams('https://example.com/path', { key1: 'value1' });
const rightUrl = Utils.getRightUrl('/path');
```

### 加解密

- `encrypt` / `decrypt`
- `encryptAjaxUrlParams`

```ts
const encrypted = Utils.encrypt('abc');
const decrypted = Utils.decrypt(encrypted);
```

### Cookie

- `writeCookie` / `readCookie` / `removeCookie`

```ts
Utils.writeCookie('token', 'xxx', { expires: 7 });
const token = Utils.readCookie('token');
```

### 其他

- `getFileSize`
- `LRU` 缓存
- `EventEmitter`

```ts
const size = Utils.getFileSize(2048000);
```

---

## 数据获取 Hooks

- `useDataSource`：普通数据源控件。
- `useCodeDataSource`：代码项数据源。
- `useTreeDataSource`：树数据源（含懒加载、过滤、展开/勾选）。
- `useTableDataSource`：表格数据源（分页、loading、refresh）。

> 说明：未使用统一编码模型时使用该组 Hooks。

```ts
const { dataSource, loading, refresh } = Hooks.useDataSource('frameaction/getComboboxModel', {
    labelField: 'title',
    valueField: 'id'
});
```

```vue
<template>
    <e-select :options="dataSource" />
</template>
```

---

## 数据模型 Hooks（统一编码模型）

- `useDataModel`：普通列表模型，数据在 `data`。
- `useTableDataModel`：表格模型（idField、columns、分页等统一管理）。

```ts
const model = Utils.defineDataModel(() => {
    const tableModel = Hooks.useTableDataModel('/api/table', { idField: 'userGuid' });
    return { models: { tableModel } };
});
```

---

## 日志库 Logger

- `Utils.logger`：多级别日志。
- 支持 `setLevel`、`enableAll`、`disableAll`、`getLogger`。
- 可通过 Sink 扩展日志上报。

```ts
Utils.logger.setLevel('INFO');
Utils.logger.info('fetch done');
```

```ts
const apiLogger = Utils.logger.getLogger('api');
apiLogger.error('api error');
```

---

## 组件 setup API

- `Utils.defineSetup`：用于组件包注册。
- 常用配置：`meta`、`deps`、`components`、`directives`、`locale`、`theme`、`routerMap`、`initRouter`、`hooks`。

```ts
export const setup = Utils.defineSetup({
    meta: pkg,
    deps: [euiCore],
    components: globalComponents,
    isWeb: true
});
```

---

## 权限 / 表单 / 消息

- 权限：`Hooks.usePermit`
- 表单：`Hooks.useValidation`
- 消息：`EMessage` / `EMessageBox`

```ts
const hasAdd = Hooks.usePermit(['system:user:add']);
```

```ts
const { validate } = Hooks.useValidation();
await validate(formRef);
```

```ts
EMessage({ message: '操作成功', type: 'success' });
EMessageBox.confirm('确认删除选中的数据吗？', '删除确认', {
  confirmButtonText: '确认删除',
  cancelButtonText: '取消',
  type: 'warning'
});
```

---

## 参考文档

- [框架核心包](api/api-core-overview.md)
- [请求库](api/api-utilities-request.md)
- [工具库](api/api-utilities-helpers.md)
- [数据获取 Hooks](api/api-hooks-data-fetch-hooks.md)
- [数据模型 Hooks](api/api-hooks-data-model-hooks.md)
- [日志库](api/api-logger-index.md)
