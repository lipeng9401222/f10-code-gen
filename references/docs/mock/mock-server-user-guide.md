# Mock 数据编写手册

本文档面向实际编写 mock 的开发者，重点说明：

- 如何在业务包中暴露 `./mock`
- `defineMock` 支持的 3 种模式
- `MockRequest` / `useStore` 的使用方式
- Mock.js 与 Faker 的常见写法

如果你需要了解仓库整体协作关系和 Vite 插件链路，先看：

- [根 README](../../../README.md)
- [架构文档](./architecture.md)
- [接入迁移文档](./integration-migration.md)
- [F9 Mock 指南](./f9-mock-guide.md)

## 1. 目录与导出约定

要让宿主自动发现业务包里的 mock，业务包必须：

1. 被宿主声明为依赖或开发依赖
2. 在 `package.json` 中显式导出 `./mock`

推荐结构：

```text
your-package/
├── mock/
│   ├── index.ts
│   ├── user.mock.ts
│   └── order.mock.ts
└── package.json
```

`package.json` 示例：

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

`mock/index.ts` 示例：

```ts
export { default as userMocks } from './user.mock'
export { default as orderMocks } from './order.mock'

export const mockMenu = [
  {
    name: '用户列表',
    url: 'user/list.vue',
    path: 'user/list'
  }
]

export const mockConfig = {
  basePriority: 10
}
```

说明：

- `mockMenu` 可选，用于声明菜单
- `mockConfig.basePriority` 可选，用于指定当前包的默认优先级
- `default` 导出和具名数组导出都会被识别为路由

## 2. `defineMock` 与标准响应

`defineMock(routes)` 只是一个类型辅助函数，用来给 `MockRoute[]` 提供更清晰的提示。

```ts
import { defineMock } from '@epframe/mock-server'

export default defineMock([
  {
    url: '/user/list',
    method: 'get',
    body: {
      total: 2,
      records: [
        { id: '1', name: 'Alice' },
        { id: '2', name: 'Bob' }
      ]
    }
  }
])
```

当你使用 `body` 或 `response` 模式时，返回值会被自动包装成标准结构：

```json
{
  "status": {
    "code": 1,
    "text": ""
  },
  "custom": {}
}
```

只有 `handler` 模式不会自动包装。

## 3. 三种模式详解

## 3.1 `body` 模式

适合：

- 固定结构数据
- 使用 Mock.js 模板快速生成随机数据
- 不依赖请求参数的简单接口

示例：

```ts
import { defineMock } from '@epframe/mock-server'

export default defineMock([
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
])
```

行为说明：

- `body` 会先交给 Mock.js 渲染
- 渲染结果会自动包装为标准成功响应
- 可结合 `delay`、`statusCode`、`priority` 使用

带分页列表示例：

```ts
export default defineMock([
  {
    url: '/user/page',
    method: 'post',
    body: {
      pageIndex: 1,
      pageSize: 10,
      total: 58,
      'records|10': [
        {
          id: '@guid',
          name: '@cname',
          dept: '@pick(["研发部", "测试部", "产品部"])',
          status: '@pick(["enabled", "disabled"])',
          createdAt: '@datetime'
        }
      ]
    }
  }
])
```

什么时候不要用 `body`：

- 需要根据请求参数切换返回值
- 需要读写 `store`
- 需要设置特殊 Header、下载流或非标准结构

## 3.2 `response(req)` 模式

适合：

- 根据 `query`、`body`、`params` 计算返回结果
- 做条件判断、分页、过滤、状态切换
- 结合 `useStore` 做增删改查联调

`MockRequest` 结构：

```ts
interface MockRequest {
  url: string
  method: string
  query: Record<string, string>
  body: any
  params: Record<string, string>
  headers: Record<string, string | string[] | undefined>
  store: MockStore
}
```

基础示例：

```ts
import { defineMock } from '@epframe/mock-server'

export default defineMock([
  {
    url: '/auth/login',
    method: 'post',
    async response({ body }) {
      if (body.username === 'admin' && body.password === '123456') {
        return {
          token: 'mock-token-admin',
          role: 'admin'
        }
      }

      return {
        token: 'mock-token-guest',
        role: 'guest'
      }
    }
  }
])
```

带分页和筛选示例：

```ts
import { defineMock } from '@epframe/mock-server'
import { faker } from '@epframe/mock-server'

const records = Array.from({ length: 50 }).map((_, index) => ({
  id: String(index + 1),
  name: faker.person.fullName(),
  dept: faker.helpers.arrayElement(['研发部', '测试部', '产品部']),
  enabled: faker.datatype.boolean()
}))

export default defineMock([
  {
    url: '/user/search',
    method: 'post',
    response({ body }) {
      const pageIndex = Number(body.pageIndex || 1)
      const pageSize = Number(body.pageSize || 10)
      const keyword = String(body.keyword || '').trim()

      const filtered = keyword
        ? records.filter((item) => item.name.includes(keyword))
        : records

      const start = (pageIndex - 1) * pageSize
      const end = start + pageSize

      return {
        total: filtered.length,
        records: filtered.slice(start, end)
      }
    }
  }
])
```

错误处理建议：

- 如果只是返回业务失败，建议直接返回业务层需要的对象
- 如果要模拟真正的异常场景，可以 `throw new Error(...)`
- 抛错后服务端会返回 500，结构为：

```json
{
  "status": {
    "code": 0,
    "text": "[MockServer] Internal mock error"
  },
  "custom": null
}
```

## 3.3 `handler(req, res)` 模式

适合：

- 返回文件流
- 返回非 JSON 内容
- 自定义 Header、Cookie、状态码
- 需要完全控制 Express 响应

示例：

```ts
import { defineMock } from '@epframe/mock-server'

export default defineMock([
  {
    url: '/report/export',
    method: 'get',
    async handler(_req, res) {
      const csv = 'id,name\n1,Alice\n2,Bob'

      res.setHeader('Content-Type', 'text/csv; charset=utf-8')
      res.setHeader('Content-Disposition', 'attachment; filename=\"report.csv\"')
      res.status(200).send(csv)
    }
  }
])
```

自定义错误状态示例：

```ts
export default defineMock([
  {
    url: '/auth/forbidden',
    method: 'get',
    handler(_req, res) {
      res.status(403).json({
        code: 'FORBIDDEN',
        message: '当前账号无权限'
      })
    }
  }
])
```

注意：

- 一旦使用 `handler`，框架不会再帮你调用 `success(...)` 或 `error(...)`
- 你需要自己保证响应被正确结束

## 4. 路由字段说明

常用字段如下：

```ts
interface MockRoute {
  url: string
  method?: string
  delay?: number | [number, number]
  priority?: number
  statusCode?: number
  body?: object
  response?: (req: MockRequest) => any
  handler?: (req: MockRequest, res: MockResponse) => void | Promise<void>
}
```

说明：

- `url`
  支持普通路径，也支持 Express 风格参数路径，如 `/user/:id`
- `method`
  默认是 `post`
- `delay`
  可写固定毫秒值，如 `300`，也可写范围，如 `[200, 800]`
- `priority`
  用于同一路径冲突时的覆盖
- `statusCode`
  仅对 `body` 和 `response` 模式生效

示例：

```ts
{
  url: '/user/:id',
  method: 'get',
  delay: [200, 600],
  statusCode: 200,
  response({ params }) {
    return {
      id: params.id
    }
  }
}
```

## 5. `useStore` 状态存储

`useStore(namespace, initialData?)` 适合做跨请求共享状态。

接口：

```ts
interface MockStore {
  get<T = any>(key: string): T
  set<T = any>(key: string, value: T): void
  has(key: string): boolean
  delete(key: string): boolean
  clear(): void
}
```

CRUD 示例：

```ts
import { defineMock, useStore, MockRandom } from '@epframe/mock-server'

const store = useStore('user-demo', {
  records: [
    { id: '1', name: 'Alice', dept: '研发部' },
    { id: '2', name: 'Bob', dept: '测试部' }
  ]
})

export default defineMock([
  {
    url: '/user/list',
    method: 'get',
    response() {
      return store.get('records')
    }
  },
  {
    url: '/user/create',
    method: 'post',
    response({ body }) {
      const records = store.get('records')
      const next = { id: MockRandom.guid(), ...body }
      records.push(next)
      store.set('records', records)
      return next
    }
  },
  {
    url: '/user/delete/:id',
    method: 'post',
    response({ params }) {
      const records = store.get('records')
      const next = records.filter((item) => item.id !== params.id)
      store.set('records', next)
      return true
    }
  }
])
```

建议：

- `initialData` 只在首次创建命名空间时生效
- 一个业务域用一个独立的 namespace，避免互相污染
- 当返回数组或对象时，注意你是否需要手动克隆，避免后续引用被意外共享

## 6. Mock.js 常见用法

除了在 `body` 中直接写模板，也可以通过导出的 `mock(template)` 主动生成数据。

### 6.1 常见模板字段

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

### 6.2 数值、布尔、枚举

```ts
{
  'age|18-60': 1,
  'score|60-100.1-2': 1,
  'enabled|1': true,
  'status|1': ['draft', 'published', 'archived']
}
```

### 6.3 列表和嵌套对象

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

### 6.4 手动调用 `mock(template)`

```ts
import { defineMock, mock } from '@epframe/mock-server'

export default defineMock([
  {
    url: '/stats/summary',
    method: 'get',
    response() {
      return mock({
        onlineCount: '@integer(20, 100)',
        visitCount: '@integer(1000, 5000)',
        conversionRate: '@float(0, 1, 2, 2)'
      })
    }
  }
])
```

适用场景：

- 你想在 `response()` 里拼出部分静态、部分随机的结构
- 你不想把整条路由写成纯 `body`

## 7. Faker 常见用法

`faker` 更适合在逻辑代码里生成结构化数据，尤其是需要组合、筛选、分页时。

### 7.1 生成基础字段

```ts
import { faker } from '@epframe/mock-server'

const user = {
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  company: faker.company.name(),
  createdAt: faker.date.recent().toISOString()
}
```

### 7.2 生成列表

```ts
const records = Array.from({ length: 20 }).map(() => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  dept: faker.helpers.arrayElement(['研发部', '测试部', '产品部']),
  amount: faker.number.int({ min: 100, max: 10000 }),
  enabled: faker.datatype.boolean()
}))
```

### 7.3 生成层级数据

```ts
const tree = Array.from({ length: 3 }).map(() => ({
  id: faker.string.uuid(),
  name: faker.commerce.department(),
  children: Array.from({ length: 2 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName()
  }))
}))
```

### 7.4 在 `response()` 中组合使用

```ts
import { defineMock, faker } from '@epframe/mock-server'

export default defineMock([
  {
    url: '/message/list',
    method: 'post',
    response({ body }) {
      const pageSize = Number(body.pageSize || 10)

      return {
        total: 100,
        records: Array.from({ length: pageSize }).map(() => ({
          id: faker.string.uuid(),
          title: faker.lorem.sentence(),
          sender: faker.person.fullName(),
          sendTime: faker.date.recent().toISOString(),
          read: faker.datatype.boolean()
        }))
      }
    }
  }
])
```

什么时候更适合用 Faker：

- 需要在 JS/TS 逻辑里反复生成对象
- 需要先生成数据，再做筛选、排序、分页
- 你更习惯函数式生成而不是模板语法

## 8. 常见组合示例

## 8.1 登录 + 用户信息

```ts
import { defineMock, faker } from '@epframe/mock-server'

export default defineMock([
  {
    url: '/auth/login',
    method: 'post',
    response({ body }) {
      return {
        token: `token-${body.username || 'guest'}`,
        expireAt: faker.date.soon().toISOString()
      }
    }
  },
  {
    url: '/auth/profile',
    method: 'get',
    body: {
      id: '@guid',
      name: '@cname',
      roles: ['admin'],
      orgName: '@ctitle(4, 8)'
    }
  }
])
```

## 8.2 表格分页 + 条件筛选

```ts
import { defineMock, faker } from '@epframe/mock-server'

const allUsers = Array.from({ length: 80 }).map(() => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  dept: faker.helpers.arrayElement(['研发部', '测试部', '产品部']),
  enabled: faker.datatype.boolean()
}))

export default defineMock([
  {
    url: '/table/users',
    method: 'post',
    response({ body }) {
      const pageIndex = Number(body.pageIndex || 1)
      const pageSize = Number(body.pageSize || 10)
      const dept = String(body.dept || '')

      const filtered = dept
        ? allUsers.filter((item) => item.dept === dept)
        : allUsers

      return {
        total: filtered.length,
        records: filtered.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
      }
    }
  }
])
```

## 8.3 下载接口

```ts
import { defineMock } from '@epframe/mock-server'

export default defineMock([
  {
    url: '/file/export',
    method: 'get',
    handler(_req, res) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.setHeader('Content-Disposition', 'attachment; filename=\"demo.txt\"')
      res.status(200).send('hello mock file')
    }
  }
])
```

## 9. 调试与排查

### 看 Dashboard

启动后访问：

- `GET /__dashboard__`
- `GET /__api__/status`

这里可以确认：

- 当前注册了哪些路由
- 每条路由来自哪个包
- 哪条路由的优先级更高
- 菜单是否被成功收集

### 常见排查点

- 路由没生效：先看 `method` 和 `url` 是否完全一致
- 被覆盖：检查是否存在更高 `priority` 的同路径定义
- 包未被发现：检查宿主是否依赖该包，以及该包是否声明了 `./mock`
- 返回结构不符预期：确认当前是否用了 `handler`

## 10. 经验建议

- 简单静态数据优先用 `body`
- 需要逻辑和分页时用 `response`
- 需要完全控制响应时再用 `handler`
- 随机模板优先考虑 Mock.js，复杂逻辑数据优先考虑 Faker
- 业务联调用 `useStore` 时，把 namespace 按领域拆开

这样可以让大多数 mock 文件保持可读、稳定，也更容易在不同业务包之间复用写法。
