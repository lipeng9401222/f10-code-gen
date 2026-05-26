# Mock 数据开发规范

本文档定义 F10 项目中 Mock 数据的使用与编写规范。

## 1. 概述

### 1.1 核心组件

| 组件                               | 职责                                                            |
| ---------------------------------- | --------------------------------------------------------------- |
| `@epframe/mock-server`             | 运行时核心：mock 发现、路由合并、请求处理、菜单收集、热更新     |
| `@epframe/vite-plugin-mock-server` | Vite 集成层：启动管理、apiPrefix 代理中间件、外部 mock 自动发现 |

### 1.2 启动链路

```
Vite Dev Server → vite-plugin-mock-server → mock-server → 发现并合并所有 mock 路由
```

## 2. 业务包目录与导出约定

### 2.1 结构

```
your-package/
├── mock/
│   ├── index.ts          # 导出所有 mock 模块和配置
│   ├── user.mock.ts      # 用户相关 mock
│   └── order.mock.ts     # 订单相关 mock
└── package.json
```

### 2.2 package.json 导出配置

```json
{
    "exports": {
        ".": {
            "import": "./dist/index.js"
        },
        "./mock": "./mock/index.ts"
    }
}
```

### 2.3 mock/order.mock.ts

```ts
import { defineMock, useStore, faker } from '@epframe/mock-server';

// 生成模拟数据
const records = Array.from({ length: 10 }).map(() => ({
    id: faker.string.uuid(),
    name: `订单-${faker.string.alphanumeric(4).toUpperCase()}`,
    amount: faker.number.int({ min: 100, max: 10000 }),
    status: faker.helpers.arrayElement(['pending', 'completed', 'cancelled']),
    createTime: faker.date.past().toISOString().slice(0, 19).replace('T', ' ')
}));

// 创建持久化存储
const store = useStore('order-demo', { records });

export default defineMock([
    // 列表查询（支持分页和过滤）
    {
        url: '/api/order/list',
        method: 'post',
        response({ body }) {
            const { pageIndex = 0, pageSize = 10, name } = body.params || {};
            let list = store.get('records');

            if (name) {
                list = list.filter(item => item.name.includes(name));
            }
            
            return {
                data: list.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
                total: list.length
            };
        }
    },

    // 详情查询
    {
        url: '/api/order/detail',
        method: 'post',
        response({ body }) {
            const { id } = body.params || {};
            const records = store.get('records');
            const item = records.find(r => r.id === id);

            if (item) {
                return { state: true, message: '查询成功', ...item };
            }
            return { state: false, message: '记录不存在' };
        }
    },

    // 新增
    {
        url: '/api/order/add',
        method: 'post',
        response({ body }) {
            const records = store.get('records');
            records.push({
                id: faker.string.uuid(),
                ...body.params,
                createTime: new Date().toISOString().slice(0, 19).replace('T', ' ')
            });
            store.set('records', records);
            return { state: true, message: '新增成功' };
        }
    },

    // 编辑
    {
        url: '/api/order/update',
        method: 'post',
        response({ body }) {
            const { id, ...data } = body.params || {};
            const records = store.get('records');
            const index = records.findIndex(r => r.id === id);
            if (index === -1) return { state: false, message: '记录不存在' };
            records[index] = { ...records[index], ...data };
            store.set('records', records);
            return { state: true, message: '更新成功' };
        }
    },

    // 删除
    {
        url: '/api/order/delete',
        method: 'post',
        response({ body }) {
            const { id } = body.params || {};
            const records = store.get('records');
            const index = records.findIndex(r => r.id === id);
            if (index === -1) return { state: false, message: '记录不存在' };
            records.splice(index, 1);
            store.set('records', records);
            return { state: true, message: '删除成功' };
        }
    }
]);
```

### 2.4 mock/index.ts 示例

```ts
export { default as userMocks } from './user.mock';
export { default as orderMocks } from './order.mock';

export const mockMenu = [
    {
        name: '用户列表',
        url: 'user/list.vue',
        path: 'user/list'
    }
];

export const mockConfig = {
    basePriority: 10
};
```

**注意**：

- `mockMenu` 可选，用于声明菜单
- `mockConfig.basePriority` 可选，用于指定当前包的默认优先级
- `default` 导出和具名数组导出都会被识别为路由

## 3. 宿主工程接入

### 3.1 安装依赖

```sh
pnpm add -D @epframe/mock-server @epframe/vite-plugin-mock-server
```

### 3.2 Vite 配置

```js
import path from 'path';
import Config from './src/config.js';
import { mockServerPlugin } from '@epframe/vite-plugin-mock-server';

export default {
    plugins: [
        mockServerPlugin({
            enabled: Config.isMock,
            apiPrefix: `${Config.rootPath}/rest`, // 命中后进入 mock 代理
            exclude: [`${Config.rootPath}/rest/resource/`], // 放行的前缀
            externalMockRoot: path.resolve(__dirname, '..'), // 发现外部 F9 mock
            proxyHost: undefined,
            watch: true,
            logLevel: 'info'
        })
    ]
};
```

**配置说明**：

| 配置项             | 必选 | 说明                                                   |
| ------------------ | ---- | ------------------------------------------------------ |
| `apiPrefix`        | 是   | 命中后进入 mock 代理                                   |
| `exclude`          | 是   | 从 mock 代理中放行的前缀                               |
| `externalMockRoot` | 否   | 从某个起点目录递归发现外部 F9 mock                     |
| `proxyHost`        | 否   | 显式指定回环地址                                       |
| `watch`            | 否   | 监听 mock 文件变化，自动热更新                         |
| `logLevel`         | 否   | 控制日志输出级别: silent / error / warn / info / debug |

### 3.3 真实后端代理保留

插件不会替代宿主原有的后端代理配置，宿主自己的 `server.proxy` 仍然应该保留。

## 4. Mock 路由定义

### 4.1 defineMock 基础用法

```ts
import { defineMock } from '@epframe/mock-server';

export default defineMock([
    {
        url: '/user/list',
        method: 'get',
        body: {
            /* 固定数据 */
        }
    }
]);
```

### 4.2 三种响应模式

#### body 模式

适合固定结构数据、使用 Mock.js 模板快速生成随机数据。

```ts
{
  url: '/user/profile',
  method: 'get',
  body: {
    id: '@guid',
    name: '@cname',
    title: '@ctitle(4, 8)',
    mobile: /^1[3-9]\d{9}$/,
    createdAt: '@datetime'
  }
}
```

**自动包装**：使用 `body` 或 `response` 模式时，返回值会被自动包装为标准结构：

```json
{
    "status": { "code": 1, "text": "" },
    "custom": {}
}
```

#### response(req) 模式

适合根据请求参数计算返回结果、做条件判断、分页、过滤、状态切换。

```ts
{
  url: '/auth/login',
  method: 'post',
  async response({ body }) {
    if (body.username === 'admin' && body.password === '123456') {
      return { token: 'mock-token-admin', role: 'admin' }
    }
    return { token: 'mock-token-guest', role: 'guest' }
  }
}
```

**MockRequest 结构**：

```ts
interface MockRequest {
    url: string;
    method: string;
    query: Record<string, string>;
    body: any;
    params: Record<string, string>;
    headers: Record<string, string | string[] | undefined>;
    store: MockStore;
}
```

#### handler(req, res) 模式

适合返回文件流、非 JSON 内容、自定义 Header/Cookie/状态码。

```ts
{
  url: '/report/export',
  method: 'get',
  async handler(_req, res) {
    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Content-Disposition', 'attachment; filename="report.csv"')
    res.status(200).send(csv)
  }
}
```

**注意**：`handler` 模式不会自动包装，需要自行控制响应。

### 4.3 路由字段说明

```ts
interface MockRoute {
    url: string;
    method?: string; // 默认 post
    delay?: number | [number, number]; // 延迟毫秒
    priority?: number; // 冲突时的覆盖优先级
    statusCode?: number; // 仅对 body/response 模式生效
    body?: object;
    response?: (req: MockRequest) => any;
    handler?: (req: MockRequest, res: MockResponse) => void | Promise<void>;
}
```

## 5. 数据生成

### 5.1 Mock.js 模板

```ts
{
  id: '@guid',
  name: '@cname',
  title: '@ctitle(5, 10)',
  paragraph: '@cparagraph(1, 3)',
  dateTime: '@datetime',
  county: '@county(true)',
  email: '@email',
  image: '@image("200x100", "#1890ff", "#fff", "demo")'
}
```

**数值、布尔、枚举**：

```ts
{
  'age|18-60': 1,
  'score|60-100.1-2': 1,
  'enabled|1': true,
  'status|1': ['draft', 'published', 'archived']
}
```

**列表和嵌套对象**：

```ts
{
  'records|5-10': [
    {
      id: '@guid',
      name: '@cname',
      'tags|1-3': ['A', 'B', 'C', 'D']
    }
  ]
}
```

### 5.2 Faker 生成

更适合在逻辑代码里生成结构化数据，尤其是需要组合、筛选、分页时。

```ts
import { faker } from '@epframe/mock-server';

const user = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    company: faker.company.name(),
    createdAt: faker.date.recent().toISOString()
};
```

**生成列表**：

```ts
const records = Array.from({ length: 20 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    dept: faker.helpers.arrayElement(['研发部', '测试部', '产品部']),
    amount: faker.number.int({ min: 100, max: 10000 }),
    enabled: faker.datatype.boolean()
}));
```

### 5.3 手动调用 mock(template)

```ts
import { mock } from '@epframe/mock-server'

response() {
  return mock({
    onlineCount: '@integer(20, 100)',
    visitCount: '@integer(1000, 5000)',
    conversionRate: '@float(0, 1, 2, 2)'
  })
}
```

## 6. 状态管理 useStore

适合做跨请求共享状态。

```ts
import { defineMock, useStore, MockRandom } from '@epframe/mock-server';

const store = useStore('user-demo', {
    records: [
        { id: '1', name: 'Alice', dept: '研发部' },
        { id: '2', name: 'Bob', dept: '测试部' }
    ]
});

export default defineMock([
    {
        url: '/user/list',
        method: 'get',
        response() {
            return store.get('records');
        }
    },
    {
        url: '/user/create',
        method: 'post',
        response({ body }) {
            const records = store.get('records');
            const next = { id: MockRandom.guid(), ...body };
            records.push(next);
            store.set('records', records);
            return next;
        }
    }
]);
```

**MockStore 接口**：

```ts
interface MockStore {
    get<T = any>(key: string): T;
    set<T = any>(key: string, value: T): void;
    has(key: string): boolean;
    delete(key: string): boolean;
    clear(): void;
}
```

**建议**：

- `initialData` 只在首次创建命名空间时生效
- 一个业务域用一个独立的 namespace
- 返回数组或对象时注意是否需要手动克隆

## 7. F9 Mock 专用

### 7.1 F9 Helper 导入

```ts
import { parseF9Request, f9Success, mockControlValue, mockAllControls } from '@epframe/mock-server';
```

### 7.2 F9 响应结构

```ts
f9Success([{ id: 'username', value: '张三' }]);
f9Success([{ id: 'username', value: '张三' }], { message: '加载成功' });
// 返回: { status: { code: 1, text: '' }, controls: [...], custom: ... }
```

### 7.3 parseF9Request 返回值

```ts
interface ParsedF9Request {
    raw: Record<string, any>;
    controls: F9Control[];
    cmdParams: Record<string, any>;
    controlIds: Set<string>;
    getControl(id: string): F9Control | undefined;
    hasControl(id: string): boolean;
}
```

### 7.4 mockControlValue 控件类型支持

| 类型                                            | 返回形式                              |
| ----------------------------------------------- | ------------------------------------- |
| `textbox` / `hidden`                            | `{ value }`                           |
| `textarea`                                      | `{ value }`                           |
| `datepicker` / `datetimepicker`                 | `{ value }`                           |
| `combobox` / `radiobuttonlist` / `checkboxlist` | `{ value, text, data }`               |
| `tree*` / `treeselect*` / `filtertree*`         | `{ data }` 或 `{ value, text, data }` |
| `datagrid` / `treegrid`                         | `{ data, pageIndex, pageSize }`       |
| `upload` / `webuploader`                        | `{ value, data }`                     |

### 7.5 F9 Mock 示例

**最简自动生成**：

```ts
{
  url: '/egoshareaddaction/page_load',
  method: 'post',
  handler(req, res) {
    const parsed = parseF9Request(req.body)
    const mocked = mockAllControls(parsed.controls)
    res.json(f9Success(mocked, { message: '加载成功' }))
  }
}
```

**部分控件手动覆盖**：

```ts
handler(req, res) {
  const parsed = parseF9Request(req.body)
  const mocked = parsed.controls.map((ctrl) => {
    if (ctrl.id === 'sharename') {
      return { id: 'sharename', value: '自定义名称' }
    }
    return mockControlValue(ctrl)
  })
  res.json(f9Success(mocked))
}
```

**重要说明**：`mockAllControls` 和 `mockControlValue` **仅用于快速生成符合 F9 格式规范的数据结构**，它们：

- 生成的数据是随机的、无业务含义的
- DataGrid 的列数据不会按实际列定义生成有意义的值
- 实际开发中需要根据页面需求自行构造有业务含义的数据

## 8. 路由合并规则

- **唯一键**：`method + url`
- **冲突时**：保留 `priority` 更高者
- **默认优先级**：
- 依赖包：`mockConfig.basePriority ?? 0`
- 宿主本地：`mockConfig.basePriority ?? 100`
- 外部 F9 mock：`origin === 'local' ? 100 : 0`

## 9. 热更新

文件变化后会重新执行整套发现和合并流程，而不是做单路由局部替换。

监听范围：

- 宿主本地 `mock/`
- 依赖包真实 `mock/` 路径
- 外部 F9 `mock/`

## 10. 调试与排查

### Dashboard 端点

- `GET /__dashboard__`
- `GET /__api__/status`

可确认：

- 当前注册了哪些路由
- 每条路由来自哪个包
- 哪条路由的优先级更高
- 菜单是否被成功收集

### 常见排查点

| 问题                       | 检查项                                               |
| -------------------------- | ---------------------------------------------------- |
| 路由没生效                 | `method` 和 `url` 是否完全一致                       |
| 被覆盖                     | 是否存在更高 `priority` 的同路径定义                 |
| 包未被发现                 | 宿主是否依赖该包，该包是否声明了 `./mock`            |
| 返回结构不符               | 确认当前是否用了 `handler`                           |
| F9 页面 jsboot/cssboot 404 | 是否配置了 `exclude: ['/epoint-web/rest/resource/']` |

## 11. 最佳实践

| 场景             | 推荐方式                        |
| ---------------- | ------------------------------- |
| 简单静态数据     | `body`                          |
| 需要逻辑和分页   | `response`                      |
| 需要完全控制响应 | `handler`                       |
| 随机模板         | Mock.js                         |
| 复杂逻辑数据     | Faker                           |
| 业务联调状态共享 | `useStore` 按领域拆分 namespace |

## 12. 相关文档

- [Mock 架构文档](./mock/architecture.md)
- [接入迁移文档](./mock/integration-migration.md)
- [Mock 数据编写手册](./mock/mock-server-user-guide.md)
- [F9 Mock 指南](./mock/f9-mock-guide.md)
