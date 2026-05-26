# page/04-mock · mock 配置

> **目的**：根据步骤 3 生成的 .vue 中 `useTableModel` / `useListModel` / `useTreeModel` / `Utils.request` 的 URL，写出对应的 mock 数据，让页面在浏览器里能直接看到效果。
> **来源**：`vue-docs/mock-development.md` + `vue-docs/frontpage.md` § Mock 数据开发。

---

## 决策树

```
apiMode == 'mock' ? 
  ├─ Yes → 走本 workflow 完整流程
  ├─ 'restful' → 跳过 mock，直接连 192.168.219.170 测试服
  └─ 'proxy' → 配 vite.config.js proxy → 跳过 mock
```

---

## Step 0 · 配置检查（仅模式 A · examples 包内）

由于当前在 `packages/examples/`，已有 mock-server 配置（如果没有需检查）：

| 工程类型 | 依赖 | package.json `exports` | vite.config.js |
| --- | --- | --- | --- |
| 业务包 (mock 编写处) | 无需安装 | 必须导出 `"./mock"` | 无需配置 |
| 宿主工程 (运行时) | `@epframe/mock-server` + `@epframe/vite-plugin-mock-server` | 无需配置 | 必须配置 mockServerPlugin |

如果检测到 `packages/examples/package.json` 缺 `"./mock"` 导出 / 宿主工程缺 mock-server 配置 → **暂停**，先告诉用户：

```
检测到 mock 环境配置不完整，需先补：
- packages/examples/package.json 加 exports: { "./mock": "./mock/index.ts" }
- packages/web-show/vite.config.js 加 mockServerPlugin

参考：references/docs/mock-development.md
```

---

## Step 1 · mock 文件位置

约定路径：`packages/examples/mock/<module>/<appName>.mock.ts`

文件命名：
- 主接口：`<appName>.mock.ts`
- 单独的子接口太多时拆分：`<appName>-options.mock.ts` / `<appName>-tree.mock.ts`

---

## Step 2 · 三种响应模式（根据接口性质选）

来源：`vue-docs/mock-development.md`。

### 模式 A · `body` 模式（固定数据 / Mock.js 模板）

适合枚举选项、静态返回。

```ts
import { defineMock } from '@epframe/mock-server';

export default defineMock([
  {
    url: '/api/<module>/<appName>/reviewStateOptions',
    method: 'post',  // ⚠️ 必须 post（来源：data-model-rules.md R2）
    body: {
      data: [
        { label: '编辑中', value: 0 },
        { label: '审核不通过', value: 1 },
        { label: '待审核', value: 2 },
        { label: '审核通过', value: 3 }
      ]
    }
  }
]);
```

### 模式 B · `response` 模式（动态返回 / 处理参数）

适合 CRUD、列表搜索分页。

```ts
{
  url: '/api/<module>/<appName>/list',
  method: 'post',
  response({ body }) {
    const { current = 1, pageSize = 10, conditions = [] } = body || {};
    // 1. 生成基础数据集（这里用 Mock.js）
    const allData = generateMockData(50);
    // 2. 应用 conditions 过滤
    const filtered = applyConditions(allData, conditions);
    // 3. 分页
    const start = (current - 1) * pageSize;
    return {
      data: filtered.slice(start, start + pageSize),
      total: filtered.length
    };
  }
}
```

### 模式 C · `handler` 模式（流 / 自定义 Header）

适合下载、上传。

```ts
{
  url: '/api/<module>/<appName>/export',
  method: 'get',
  handler(_req, res) {
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.status(200).send('id,name\n1,测试');
  }
}
```

---

## Step 3 · CRUD 接口模板（最常见）

针对 `pageType: list + hasFormDialog + hasEditDialog + hasDetailDialog`，需要写以下 6~8 个接口：

| URL | method | mode | 返回格式 |
| --- | --- | --- | --- |
| `/api/<m>/<a>/list` | post | response | `{ data: [...], total: number }` |
| `/api/<m>/<a>/treeList`（如 hasTree） | post | response | `[{ value, label, children }]` |
| `/api/<m>/<a>/<field>Options`（每个枚举字段） | post | body | `{ data: [{ label, value }] }` |
| `/api/<m>/<a>/info` | post | response | `{ data: { ... } }` （edit/detail 用） |
| `/api/<m>/<a>/add` | post | response | `{ state: true, message: '新增成功' }` |
| `/api/<m>/<a>/update` | post | response | `{ state: true, message: '更新成功' }` |
| `/api/<m>/<a>/delete` | post | response | `{ state: true, message: '删除成功' }` |
| `/api/<m>/<a>/batchDelete` | post | response | `{ state: true, message: '批量删除成功' }` |

参考完整示例：`references/docs/page-examples/base/list.vue` 对应的 mock 文件位置（找仓库内现有的 `packages/examples/mock/page-examples/`）。

---

## Step 4 · 数据生成（避免硬编码具体业务字段）

**铁律**：mock 数据**禁止**硬编码"标段(包)管理"等业务语料（违反 ANTI-TEMPLATES.md C 项）。

正确做法：用 Mock.js 模板根据 `intent.fields` 动态生成。

```ts
import Mock from 'mockjs';

function generateMockData(count = 50) {
  const list = Mock.mock({
    [`list|${count}`]: [{
      'id|+1': 1,
      // 根据 intent.fields 生成（这里只是示意）
      'name': '@ctitle(5,15)',
      'code|+1': 1000,
      'classification|1': [1, 2],
      'status|1': [0, 1, 2, 3],
      'createTime': '@datetime',
      'creator': '@cname'
    }]
  }).list;
  return list;
}
```

**Mock.js 常用模板**：

| 占位 | 含义 |
| --- | --- |
| `@guid` | UUID |
| `@cname` | 中文姓名 |
| `@ctitle(min, max)` | 中文标题 |
| `@datetime` | 日期时间 |
| `@cparagraph(1)` | 中文段落 |
| `@email` | 邮箱 |
| `@phone` / `/^1[3-9]\d{9}$/` | 手机号 |
| `'name|3'` | 数组取一个 |
| `'count|+1': 1` | 自增 |

---

## Step 5 · user-preference 检查

如果项目根有 `.epoint-skill-preferences.json`（用户级偏好），读取以下字段并应用：

```json
{
  "mock": {
    "totalCount": 100,           // 默认生成多少条数据
    "delay": 200,                // 模拟延迟（ms）
    "useChineseNames": true,     // 中文姓名
    "fixedDataSeed": "demo-2026" // 固定 Mock.js seed 让数据可复现
  }
}
```

如果文件不存在 → 使用默认值（不要弹错）。

---

## Step 6 · mock 注册

**examples 包内**：mock 文件放对位置后会被 `@epframe/vite-plugin-mock-server` 自动扫描，无需手动注册。

**新工程**：在 web 工程的 `vite.config.js`：

```js
import { mockServerPlugin } from '@epframe/vite-plugin-mock-server';

export default {
  plugins: [
    mockServerPlugin({
      mockDir: ['./mock', '../packages/<appName>/mock'],  // 扫描多个目录
      // ...
    })
  ]
};
```

---

## 输出契约

```yaml
mock_generated:
  - file: <绝对路径>
    interfaces:
      - url: <string>
        method: post
        mode: body | response | handler
        purpose: <一句话描述>
sync_to_dev_server: <bool>     # 是否需要重启 dev server (一般不用)
```

---

## ✓ 检验句

- [ ] 所有 mock URL 与步骤 3 .vue 里的 `useTableModel` / `useListModel` / `useTreeModel` / `Utils.request` URL **逐一对得上**
- [ ] 所有给 model Hook 用的 mock 都是 `method: 'post'`（违反 = 必出"接口 404"或"返回不被识别"）
- [ ] 树形 mock 数据用 `value` / `label` / `children`（不是 `id` / `text`）
- [ ] 表格 mock 返回 `{ data: [...], total: number }`
- [ ] 列表 mock 返回 `{ data: [{ label, value }] }`
- [ ] 没有"标段(包)"等业务语料硬编码（数据来自 `intent.fields` 动态生成）

---

## Red Flags

| 信号 | 处理 |
| --- | --- |
| 用户说"先不写 mock，我直接连后端" | 跳过本步骤，将 apiMode 改为 restful / proxy |
| mock 文件已存在（重新生成）| 询问用户是否覆盖；默认追加新接口不动旧的 |
| `method: 'get'` 给了模型接口 | STOP，违反 R2 |

---

_步骤 4 完成 → 进 `05-route.md`。_
