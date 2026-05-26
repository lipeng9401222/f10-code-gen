# 宿主与业务包接入迁移

本文档说明如何把现有宿主工程和业务包接入到当前 mock 体系。

## 1. 宿主工程接入

### 安装

```sh
pnpm add -D @epframe/mock-server @epframe/vite-plugin-mock-server
```

### Vite 接入最小示例

```js
import path from 'path'
import { mockServerPlugin } from '@epframe/vite-plugin-mock-server'

const enableMock = true

export default {
  plugins: [
    mockServerPlugin({
      enabled: enableMock,
      apiPrefix: '/epoint-web/rest',
      exclude: ['/epoint-web/rest/resource/'],
      externalMockRoot: path.resolve(__dirname, '..'),
      proxyHost: undefined,
      watch: true,
      logLevel: 'info'
    })
  ]
}
```

### 配置说明

- `apiPrefix`
  命中后进入 mock 代理
- `exclude`
  从 mock 代理中放行的前缀
- `externalMockRoot`
  从某个起点目录递归发现外部 F9 mock
- `proxyHost`
  可选，显式指定回环地址

### 真实后端代理仍要保留

插件不会替代宿主原有的后端代理配置。宿主自己的 Vite `server.proxy` 仍然应该保留，用于：

- 未启用 mock 时走真实接口
- 非 mock 范围的其它代理规则
- 被 `exclude` 放行的请求继续转发给后端或 `f9server`

## 2. 业务包改造

### 必要条件

业务包要被宿主自动发现，必须同时满足：

1. 宿主真的依赖了这个包
2. 包在 `package.json` 中显式导出 `./mock`

### `package.json` 示例

```json
{
  "exports": {
    ".": {
      "import": "./dist/index.js"
    },
    "./mock": "./mock/index.ts"
  },
  "files": [
    "dist",
    "mock",
    "package.json"
  ]
}
```

### 目录结构

```text
your-package/
├── src/
├── package.json
└── mock/
    ├── index.ts
    └── example.mock.ts
```

### `mock/index.ts` 示例

```ts
export { default as exampleMocks } from './example.mock'

export const mockMenu = [
  {
    name: '示例页面',
    url: 'demo/example.vue',
    path: 'demo/example'
  }
]

export const mockConfig = {
  basePriority: 10
}
```

## 3. 宿主本地覆盖

如果宿主根目录存在本地 `mock/index.*`，运行时会额外加载它，并给它更高的默认优先级。

默认值：

- 依赖包：`0`
- 宿主本地：`100`

因此本地 mock 可直接覆盖依赖包中相同的 `method + url`。

## 4. F10/F9 混合模式接入

混合模式下建议：

- F10 拥有 `/rest` 的 mock ownership
- F9 页面由 `f9server` 提供
- F10 通过 `externalMockRoot` 自动发现 F9 mock

典型配置：

```js
mockServerPlugin({
  enabled: true,
  apiPrefix: '/epoint-web/rest',
  exclude: ['/epoint-web/rest/resource/'],
  externalMockRoot: path.resolve(__dirname, '..')
})
```

解释：

- 普通 `/rest` 请求进入 F10 mock
- `/rest/resource/*` 不进入 mock，继续回落到宿主自己的后端代理链
- 外部 F9 Java 组件包中的 `mock/` 会自动并入同一个 mock-server

## 5. 排查建议

- 看终端日志，确认 mock-server 是否成功启动及实际端口
- 打开 `GET /__dashboard__`，确认目标路由是否已注册
- 访问 `GET /__api__/status`，检查路由来源、优先级和菜单数据
- 如果宿主能启动但外部 F9 mock 没生效，优先检查：
  - `externalMockRoot` 是否正确
  - 目标目录下是否存在 `src/main/webapp` 或 `src/main/resources/META-INF/resources`
  - 同级是否存在 `mock/`
- 如果 F9 页面里的 `jsboot/cssboot` 404，优先检查：
  - 是否配置了 `exclude: ['/epoint-web/rest/resource/']`

## 6. 相关文档

- [根入口文档](../README.md)
- [架构文档](./architecture.md)
- [Mock 数据编写手册](./mock-server-user-guide.md)
- [F9 Mock 指南](./f9-mock-guide.md)
