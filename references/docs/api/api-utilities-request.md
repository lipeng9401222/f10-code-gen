---
title: 请求库
originUrl: http://192.168.219.170/docs/vue/latest/frame/api/utilities/request/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/api/utilities/request/)

框架工具库中提供了一个基于 axios 的请求库，用于发送 HTTP 请求。它包含 `restfulAxios`/(`request` 别名)、`action2restAxios` 和 `requestAxios` 三个方法。

## 请求方法对比

三种请求方法的核心区别如下：

| 方法 | 适用场景 | Content-Type | 地址处理 | viewState | 配置优先级 |
| --- | --- | --- | --- | --- | --- |
| `restfulAxios` | 框架标准编码模型接口 | `application/json` | 自动添加页面 URL 参数 | 无 | `ajaxConfig` → `ajaxBaseUrl` |
| `action2restAxios` | F9 旧版 action2rest 接口 | `application/x-www-form-urlencoded` | 自动添加 `isCommondto=true&action2rest=true` | 有（按 action 名分类） | `action2rest` → `ajaxConfig` → `ajaxBaseUrl` |
| `requestAxios` | 普通后台接口 | `application/x-www-form-urlencoded` | 自动添加页面 URL 参数 | 有 | `ajaxConfig` → `ajaxBaseUrl` |

**选择建议**：

- 新开发接口优先使用 `restfulAxios`，符合框架标准编码模型
- 对接遗留 F9 系统时使用 `action2restAxios`
- 其他需要请求格式是 urlencode 的场景 `requestAxios`

## restfulAxios

`restfulAxios` 是用于对接框架标准编码模型的请求方法。

```ts
import { Utils } from '@epframe/eui-core';

// 发起一个请求
Utils.restfulAxios({
  url: '',
});
```

### 请求配置项

`restfulAxios` 顾名思义，它是一个 Axios 的实例，所以它的配置项和 axios 的配置项是一样的，只是多了一些框架的配置项。

基础常用的配置项如下：

```ts
Utils.restfulAxios({
  // `url` 是用于请求的服务器 URL
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'POST', // 框架默认值

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://fe.epoint.com.cn/mock/api/',
  // 自定义请求头
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    // 比如将请求体格式切换为 application/x-www-form-urlencoded
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  // 请求体数据，框架默认使用 application/json
  // 如果需要使用 application/x-www-form-urlencoded，需要手动设置
  data: {
    firstName: 'Fred',
  },
  // `timeout` 指定请求超时的毫秒数。
  // 如果请求时间超过 `timeout` 的值，则请求会被中断
  timeout: 1000, // 默认值是 `0` (永不超时)
});
```

完整文档参阅 [Axios中文网(非官方)](https://www.axios-http.cn/docs/req_config) [Axios 官方文档](https://axios-http.com/docs/req_config)

我们扩展的配置项如下：

```ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface AxiosRequestConfig {
  // 框架 csrf 防御存储在 cookie 中的键值
  csrfCookieName?: string;
  // 框架 csrf 防御请求头的键值
  csrfHdName?: string;

  // 是否显示loading
  showLoading?: boolean;

  // loading 的 target 值为一个 selector 即遮罩添加到这个元素中
  loadingTarget?: string | HTMLElement;

  // 是否用接口中返回的url进行页面跳转
  allowChangeLocation?: boolean;

  // 自定义签名头
  signHeaders?: string[];
  // 自定义状态码处理 hook
  requestStatusCodeHook?: RequestStatusCodeHook;
  // 自定义状态数据处理 hook
  requestStatusDataHook?: (status: Record<string, unknown>) => boolean | void;
}

type RequestStatusCodeHookFunction = (res: AxiosResponse) => boolean | void;

type RequestStatusCodeHook = Partial<{
  '400': RequestStatusCodeHookFunction;
  '401': RequestStatusCodeHookFunction;
  '403': RequestStatusCodeHookFunction;
  '404': RequestStatusCodeHookFunction;
  '503': RequestStatusCodeHookFunction;
  [k: string | number]: RequestStatusCodeHookFunction;
  // 其他状态码
  '*': RequestStatusCodeHookFunction;
}>
```

### 基础能力

- 地址处理，自动补全地址，自动添加当前页面 url 的参数
- 框架 csrf 相关请求头
- 添加/移除全局遮罩
- 请求染色
- 加/解密
- 签名、防重放攻击
- 响应数据转换
- 框架通用状态码处理、统一错误处理

以上全部能力均通过 axios 的请求/响应拦截器实现。拦截器被定义为请求插件，全部安装的插件挂载在 `restfulAxios._epoint.installedPlugins` 下，格式如下：

```ts
type AxiosPlugin = {
  /**
   * 插件的名字
   */
  name?: string;
  /**
   * 插件的描述
   */
  description?: string;
  /**
   * 插件的执行函数
   */
  install: (axiosInstance: AxiosInstance, ...arg: unknown[]) => void;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Plugins = {
  request: AxiosPlugin[];
  response: AxiosPlugin[];
};
```

### 全局配置

自动创建好的 `restfulAxios` 实例会使用默认配置，全局的配置默认从 [全局配置](/) 下的 `ajaxConfig` 或 `ajaxBaseUrl` 下获取，因此可以通过下面的方式进行全局配置：

```js
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const config = {
  ajaxConfig: {
    timeout: 0,
    // baseURL 可以不配置，会从 ajaxBaseUrl 中获取
    // baseURL: '/rest',
    headers: {
      'X-Front-Path': window.location?.origin,
    },
  },
  //! 优先级最低，但必须
  ajaxBaseUrl: '/rest'
};
```

整个获取逻辑是：

1. 首先，尝试获取 `ajaxConfig` 配置，作为配置对象 `config`。
2. 如果成功获取到配置对象（即 `config` 存在）：
   - 检查配置对象是否配了 `baseURL`。如果不包含，且 `ajaxBaseUrl` 变量存在值，则将 `ajaxBaseUrl` 添加到配置对象中。 也既将 `ajaxBaseUrl` 作为默认的 `baseURL`。
   - 返回完整的配置对象。
3. 如果未能获取到配置对象（2未配置），则返回一个仅包含 `ajaxBaseUrl` 的新对象。

### 自定义状态码处理

框架中已默认提供了常见状态码的处理。若请求对某些状态码需要自定义处理，你可以通过 `requestStatusCodeHook` 来自定义状态码处理，例如：

```ts
const restfulAxios = restfulFactory.create({
  requestStatusCodeHook: {
    '401': (res) => {
      // 处理 401 状态码
      // 例如跳转到登录页
      window.location.href = '/login';
      return false;
    },
  },
});
```

也可通过 `@epframe/eui-core` 包中提供的 `register` 工具方法来进行全局注册：

```ts
import { Utils } from '@epframe/eui-core';
// 全局注册 401 状态码处理
Utils.register({
  requestStatusCodeHook: {
    401: () => {},
  }
});
```

方法自己指定的优先级高于全局注册的。

### 自定义 status 数据处理

框架中已默认提供了响应数据字段 `status` 的处理。若 `status` 字段需要自定义处理，你可以通过 `statusDataHook` 来自定义响应数据处理。如果 `statusDataHook` 返回 `false`，则会中断后续框架的默认处理流程。例如：

```ts
const restfulAxios = restfulFactory.create({
  requestStatusDataHook: (status) => {
    // 处理响应数据

    // 阻止后续框架默认处理
    return false;
  },
});
```
也可通过 `@epframe/eui-core` 包中提供的 `register` 工具方法来进行全局注册：

```ts
import { Utils } from '@epframe/eui-core';
// 全局注册 status 数据处理
Utils.register({
  requestStatusDataHook: (status) => {
    // 处理响应数据

    // 阻止后续框架默认处理
    return false;
  },
});
```

方法自己指定的优先级高于全局注册的。

### 手动创建新实例

如果你想要创建一个新的实例，或自由组装框架请求中提供的能力，可以使用 `restfulFactory` 来实现。

```ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const restfulFactory = {
  // 默认创建好的实例
  restfulAxios,
  // 提供拦截器的列表
  interceptors,
  // 自己可以继续创建实例 不会应用任何框架提供的拦截器
  create: createInstance,
};
```

`restfulFactory` 中暴露了创建实例的方法和全部提供的拦截器插件，你可以自由组装你的请求实例。

## action2restAxios

如果请求接口还是老的 F9 的 action2rest 接口，你可以使用 `action2restAxios` 来发起请求。

```ts
import { Utils } from '@epframe/eui-core';

// 发起一个 action2rest 请求
Utils.action2restAxios({
  url: '',
});
```

### 请求配置项

此处和 `restfulAxios` 相同，参阅前文文档即可。

### 基础能力

基本和 `restfulAxios` 一样，只是在地址处理上有所不同，并添加了通用隐藏域的处理。

- 地址处理，自动补全地址，自动添加 `isCommondto=true&action2rest=true`
- 框架 csrf 相关请求头
- 添加/移除全局遮罩
- 请求染色
- 加/解密
- 签名、防重放攻击
- 通用隐藏域
- 响应数据转换
- 框架通用状态码处理、统一错误处理

以上全部能力均通过 axios 的请求/响应拦截器实现。拦截器被定义为请求插件，全部安装的插件挂载在 `action2restAxios._epoint.installedPlugins` 下，每个插件的格式和 `restfulAxios` 一样。

### 全局配置

自动创建好的 `action2restAxios` 实例会使用默认配置，全局的配置默认从 [全局配置](/) 下的 `action2rest` 或 `ajaxConfig` 或 `ajaxBaseUrl` 下获取，因此可以通过下面的方式进行全局配置：

```js
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const config = {
  // 优先级高于 ajaxConfig
  action2rest: {
    timeout: 0,
    // baseURL 可以不配置，会从 ajaxBaseUrl 中获取
    // baseURL: '/rest',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  },
  ajaxConfig: {
    timeout: 0,
    // baseURL 可以不配置，会从 ajaxBaseUrl 中获取
    // baseURL: '/rest',
    headers: {
      'X-Front-Path': window.location?.origin,
    },
  },
  //! 优先级最低，但必须
  ajaxBaseUrl: '/rest'
};
```

整个获取逻辑和 `restfulAxios` 类似，只是会优先从 `action2rest` 中获取配置。

### 自定义状态码处理

此处和 `restfulAxios` 相同，参阅前文文档即可。

### 自定义 status 数据处理

此处和 `restfulAxios` 相同，参阅前文文档即可。

### viewState 处理

参照 F9 中的通用隐藏域功能，请求也会自动携带上上一个请求返回的 `viewstate` 数据。但是由于在 VUE 中我们是一个单页面应用，所有请求都在一个页面中。为了避免混淆，我们约定以请求接口的 action 名字为分类，即一个请求会自动携带上一个与它相同 action 接口返回的 `viewstate` 数据。

例如请求地址是 `/rest/frameuseraction/getDataGridData`，则会将 `frameuseraction` 作为分类，自动携带上一个接口 action 名字也为 `frameuseraction` 的请求 （例如 `/rest/frameuseraction/getTreeModel`）返回的 `viewstate` 数据。

对于使用框架标准 `action2rest` 请求的，已默认内置了该功能，不需要做任何的额外配置。

如果想要自己指定请求携带的 `viewstate` 数据，可以通过请求配置项中的 `viewStateScope` 字段来指定。比如给多个请求设置不同的 `viewStateScope` 值，则可以在这些接口之间共享(前端这按照此值作为范围来进行数据的设置和请求回传)viewState数据：

```js
action2restAxios({
  // `url` 是用于请求的服务器 URL
  url: 'xxxuseraction/method1',
  // 指定一个名字作为范围来共享 viewState 数据
  viewStateScope: 'xxxUserScope'
});

action2restAxios({
  // `url` 是用于请求的服务器 URL
  url: 'xxxuseraction2/method1',
  // 指定一个名字作为范围来共享 viewState 数据
  viewStateScope: 'xxxUserScope'
});
```

### 手动创建新实例

如果你想要创建一个新的实例，或自由组装框架请求中提供的能力，可以使用 `action2restFactory` 来实现。

```ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const action2restFactory = {
  // 默认创建好的实例
  action2restAxios,
  // 提供拦截器的列表
  interceptors,
  // 自己可以继续创建实例 不会应用任何框架提供的拦截器
  create: createInstance,
};
```

`action2restFactory` 中暴露了创建实例的方法和全部提供的拦截器插件，你可以自由组装你的请求实例。

## requestAxios

如果请求是一个普通后台接口，则可以使用 requestAxios 来发起请求。

```ts
import { Utils } from '@epframe/eui-core';

// 发起一个普通后台接口请求
Utils.requestAxios({
  url: '',
});
```

### 请求配置项

此处和 `restfulAxios` 相同，参阅前文文档即可。

### 基础能力

基本和 `restfulAxios` 一样，只是请求的默认 Content-Type 为 `application/x-www-form-urlencoded; charset=UTF-8`。

- 地址处理，自动补全地址，自动添加当前页面 url 的参数
- 框架 csrf 相关请求头
- 添加/移除全局遮罩
- 请求染色
- 加/解密
- 签名、防重放攻击
- 通用隐藏域
- 响应数据转换
- 框架通用状态码处理、统一错误处理

以上全部能力均通过 axios 的请求/响应拦截器实现。拦截器被定义为请求插件，全部安装的插件挂载在 `requestAxios._epoint.installedPlugins` 下，每个插件的格式和 `restfulAxios` 一样。

### 全局配置

自动创建好的 `requestAxios` 实例会使用默认配置，其配置方式和获取逻辑与 `restfulAxios` 相同，参阅前文文档即可。

### 自定义状态码处理

此处和 `restfulAxios` 相同，参阅前文文档即可。

### 自定义 status 数据处理

此处和 `restfulAxios` 相同，参阅前文文档即可。

### 手动创建新实例

如果你想要创建一个新的实例，或自由组装框架请求中提供的能力，可以使用 `requestFactory` 来实现。

```ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const requestFactory = {
  // 默认创建好的实例
  requestAxios,
  // 提供拦截器的列表
  interceptors,
  // 自己可以继续创建实例 不会应用任何框架提供的拦截器
  create: createInstance,
};
```

`requestFactory` 中暴露了创建实例的方法和全部提供的拦截器插件，你可以自由组装你的请求实例。