# page/04-mock · Mock 配置（v0.4 · 业务定向中间件 + 智能数据 + 接口校验）

> **目的**：根据步骤 3 的 `generated_urls` 生成业务 mock，让页面可预览，同时避免 mock 误拦 F10 框架端点。
> **v0.4 默认策略**：使用业务定向 Vite 中间件，只拦截 `/api/<module>/` 业务接口；未命中业务接口必须 `next()` 放行给宿主 proxy。
> 官方 `@epframe/vite-plugin-mock-server` 仍保留为可选策略，但不再作为默认推荐。

---

## 决策树

```
apiMode == 'mock' ?
  ├─ Yes → 业务定向中间件（默认）→ 写 mock → 接口一致性校验
  ├─ restful → 跳过 mock，生成接口文档，校验 generated_urls 完整性
  └─ proxy → 跳过 mock，生成接口文档，提示配置宿主 proxy
```

---

## Step 0 · 策略选择（v0.4 默认）

| 策略 | 何时用 | 关键规则 |
| --- | --- | --- |
| `business_middleware`（默认） | 新生成页面 / 业务模块 mock | 只拦截 `/api/<module>/`，框架端点全部放行 |
| `mockServerPlugin`（可选） | 项目已稳定接入官方 mock-server 且 exclude 已完整 | 必须配置框架端点 exclude，不允许全前缀硬拦 |
| `proxy` / `restful` | 不使用本地 mock | 不写业务 mock，但仍产接口文档 |

### Red Flag

如果准备配置 `mockServerPlugin({ apiPrefix: Config.rootPath + '/rest' })` 但只 exclude 了 `/resource/`，STOP。必须改用默认业务定向中间件，或补全框架端点放行规则。

框架端点不要手写简化 mock：

```text
/resourceaction/*
/auth/*
/themedataaction/*
/api/v1/framevariable/*
/apisecurityconfig/*
```

---

## Step 1 · mock 文件位置

约定路径：`<component_package>/mock/<module>/<appName>.mock.ts`

要求：
- mock 文件必须在组件工程下，不写入 Web 工程
- URL 必须来自 `generated_urls`
- 所有模型接口 `method: 'post'`
- 业务路径统一为 `/api/<module>/<appName>/...`

---

## Step 2 · 业务定向中间件接入

在宿主工程 `vite.config.js` 中按需引入生成的中间件：

```js
import { createBusinessMockMiddleware } from './build/<module>-mock.middleware.mjs';

export default defineConfig({
  plugins: [
    vue(),
    createBusinessMockMiddleware()
  ]
});
```

生成中间件文件：`<web_package>/build/<module>-mock.middleware.mjs`。
优先复用模板：`templates/mock/business-mock.middleware.mjs.tmpl`。

最小骨架：

```js
export function createBusinessMockMiddleware() {
  const handlers = [
    // 由 mock 文件 / generated_urls 转换而来
  ];

  return {
    name: 'business-mock-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const urlPath = getUrlPath(req.url);
        if (!urlPath.includes('/api/<module>/')) return next();

        const handler = handlers.find((item) => {
          return item.method === (req.method || 'GET').toLowerCase() && urlPath.endsWith(item.url);
        });
        if (!handler) return next();

        const body = parseBody(await readBody(req));
        const data = await handler.response({ body, query: Object.fromEntries(new URL(req.url, 'http://mock.local').searchParams) });

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(data));
      });
    }
  };
}
```

---

## Step 3 · 请求体解析（JSON + form-encoded）

业务中间件必须内置 `parseBody`，同时支持 JSON 与 `application/x-www-form-urlencoded`：

```js
function parseBody(body = '') {
  if (!body) return {};
  try {
    return JSON.parse(body);
  } catch {
    const data = {};
    for (const pair of body.split('&')) {
      const [rawKey, rawValue = ''] = pair.split('=');
      if (!rawKey) continue;
      const key = decodeURIComponent(rawKey);
      const value = decodeURIComponent(rawValue.replace(/\+/g, ' '));
      data[key] = value;
    }
    if (typeof data.params === 'string') {
      try { data.params = JSON.parse(data.params); } catch { /* keep original */ }
    }
    return data;
  }
}
```

✓ 检验句：用 `viewstate=xxx&params=%7B%22id%22%3A1%7D` 测试时，`body.params.id === 1`。

---

## Step 4 · CRUD 接口模板

针对 `pageType: list + hasFormDialog + hasEditDialog + hasDetailDialog`，生成以下接口：

| URL | method | 返回格式 |
| --- | --- | --- |
| `/api/<m>/<a>/list` | post | `{ data: [...], total: number }` |
| `/api/<m>/<a>/tree` | post | `[{ value, label, children }]` |
| `/api/<m>/<a>/<field>Options` | post | `{ data: [{ label, value }] }` |
| `/api/<m>/<a>/info` | post | `{ state: true, data: { ... } }` |
| `/api/<m>/<a>/add` | post | `{ state: true, message: '新增成功' }` |
| `/api/<m>/<a>/update` | post | `{ state: true, message: '更新成功' }` |
| `/api/<m>/<a>/delete` | post | `{ state: true, message: '删除成功' }` |
| `/api/<m>/<a>/batchDelete` | post | `{ state: true, message: '批量删除成功' }` |

---

## Step 5 · 数据生成与字段契约

基于 `intent_resolved.intent.fields` 生成 mock。字段对象推荐包含：

```ts
type IntentField = {
  name: string;
  label?: string;
  type?: string;
  required?: boolean;
  desc?: string;
  options?: Array<{ label: string; value: string | number | boolean }>;
  example?: unknown;
};
```

字段类型映射：

| `fields[].type` | Mock.js 模板 | 适用语境 |
| --- | --- | --- |
| `id` / `pk` | `'id|+1': 1` 或 `'@guid'` | 主键 |
| `text` | `'@ctitle(5, 15)'` | 中文短文本 |
| `paragraph` / `description` / `remark` | `'@cparagraph(1, 3)'` | 段落 / 备注 |
| `number` | `'|100-99999': 1` | 数字 |
| `amount` / `money` / `price` | `'|100-999999.2': 1` | 金额 |
| `enum` | `'|1': options.map(o => o.value)` | 枚举 |
| `date` | `'@date("yyyy-MM-dd")'` | 日期 |
| `datetime` | `'@datetime("yyyy-MM-dd HH:mm:ss")'` | 日期时间 |
| `phone` / `mobile` | `/^1[3-9]\\d{9}$/` | 手机号 |
| `email` | `'@email'` | 邮箱 |
| `cname` / `person` / `creator` | `'@cname'` | 中文姓名 |
| `boolean` / `bool` | `'|1': true` | 布尔 |

缺少 `desc` 时，后续 `07-api-doc.md` 用 `label/type` 生成保守描述并标记“待后端确认”。

---

## Step 6 · 接口一致性校验

从 `generated_urls` 拉出预期 URL，从 `.mock.ts` / 中间件 handlers 提取实际 URL，双向比对：

| 比对 | 处置 |
| --- | --- |
| `expected - actual` | STOP，补 mock 后重跑 |
| `actual - expected` | warning，列出多余 mock |
| 完全匹配 | pass |

---

## 输出契约

```yaml
mock_strategy: business_middleware
body_parser: json_and_form_encoded
mock_generated:
  - file: <绝对路径>
    interfaces:
      - url: <string>
        method: post
        mode: body | response | handler
        purpose: <一句话描述>
business_middleware:
  file: <web_package>/build/<module>-mock.middleware.mjs
  api_prefix: /api/<module>/
  pass_through_framework_endpoints: true
url_consistency:
  expected: [<string>]
  actual: [<string>]
  missing_in_mock: [<string>]
  extra_in_mock: [<string>]
  pass: <bool>
```

---

## ✓ 检验句

- [ ] mock 文件路径以 `<component_package>/mock/` 开头
- [ ] 中间件只拦截 `/api/<module>/`，未命中业务 handler 时 `next()`
- [ ] 不 mock `/resourceaction/*` / `/auth/*` / `/themedataaction/*` / `/apisecurityconfig/*`
- [ ] `parseBody` 同时支持 JSON 与 form-encoded
- [ ] 所有模型接口 `method: 'post'`
- [ ] 表格 / 下拉 / 树返回格式符合 `data-model-rules.md` R4
- [ ] `url_consistency.pass === true`

---

_步骤 4 完成 → 进 `05-route.md`。_
