# page/04-mock · mock 配置（v0.3 · 探测 + 一键接入 + 智能数据 + 接口校验）

> **目的**：根据步骤 3 生成的 `generated_urls`，写出对应的 mock 数据，让页面在浏览器里能直接看到效果。
> **v0.3 升级**：
> 1. **Step 0 探测** mock-server 在用户工程的接入态，缺啥给一键接入向导（不再假设默认接好）
> 2. **基于 intent.fields 的智能 Mock 数据**（字段类型 → Mock.js 模板自动映射）
> 3. **接口一致性校验**（.vue URL ↔ .mock.ts URL 必须逐字匹配）
> 4. **路径取自** `intent_resolved.target_mock_dir`（组件工程下，不再硬编码 examples）

> **来源**：`references/docs/mock-development.md` + `references/docs/frontpage.md` § Mock 数据开发。

---

## 决策树

```
apiMode == 'mock' ? 
  ├─ Yes → 跑 Step 0 探测 → 接入完整 → 跑 Step 1~5 写 mock → Step 6 接口校验
  ├─ 'restful' → 跳过 mock，直接连公司测试服（但仍跑 Step 6 接口校验）
  └─ 'proxy' → 配 vite.config.js proxy → 跳过 mock（但仍跑 Step 6 接口校验）
```

---

## Step 0 · Mock 接入态探测（v0.3 新增 · 必跑）

> 解决用户痛点：之前 skill 假设 mock-server 已接入，但实际项目（如本仓库的 web-show）**没有**装 `@epframe/vite-plugin-mock-server`，导致 mock 文件写了跑不起来。

### Step 0.1 · 三件探测

| # | 探测项 | 命中标准 | 路径来源 |
| --- | --- | --- | --- |
| ① | **组件工程 exports** | `<component_package>/package.json` 含 `exports["./mock"]` | `intent_resolved.component_package` |
| ② | **宿主工程依赖** | `<web_package>/package.json` 的 `devDependencies` 含 `@epframe/vite-plugin-mock-server` + `@epframe/mock-server` | `intent_resolved.web_package` |
| ③ | **宿主工程插件配置** | `<web_package>/vite.config.js` 含 `mockServerPlugin(` 调用 | 同上 |

探测脚本（Node 跨平台）：

```sh
node -e "
const fs=require('fs'),path=require('path');
const comp = process.argv[1];
const web = process.argv[2];
const result = { exports: false, deps: false, plugin: false };

// ① 组件工程 exports
const compPkg = JSON.parse(fs.readFileSync(path.join(comp,'package.json'),'utf8'));
result.exports = !!(compPkg.exports && compPkg.exports['./mock']);

// ② 宿主工程依赖
const webPkg = JSON.parse(fs.readFileSync(path.join(web,'package.json'),'utf8'));
const allDeps = {...webPkg.dependencies, ...webPkg.devDependencies};
result.deps = !!allDeps['@epframe/vite-plugin-mock-server'] && !!allDeps['@epframe/mock-server'];

// ③ 插件配置
const viteCfg = fs.readFileSync(path.join(web,'vite.config.js'),'utf8');
result.plugin = /mockServerPlugin\s*\(/.test(viteCfg);

console.log(JSON.stringify(result));
" \"\$COMPONENT_PACKAGE\" \"\$WEB_PACKAGE\"
```

### Step 0.2 · 探测结果分支

| 结果 | 含义 | 处置 |
| --- | --- | --- |
| ① ② ③ 全 pass | 已接入 | **直接进 Step 1** 写 mock |
| 任一 fail | 未接入 / 半接入 | **暂停 → 给一键接入向导**（见 Step 0.3） |

### Step 0.3 · 一键接入向导（缺一补一）

输出 fix 报告给用户：

```
🔍 Mock 接入态探测：
  ① 组件工程 exports['./mock'] ........ ✓
  ② 宿主工程 @epframe/mock-server 依赖 .. ✗（未装）
  ③ 宿主工程 mockServerPlugin 配置 ..... ✗（未配）

→ 共发现 2 项缺失，可一键修复（约 30 秒）：

【修复 1】在宿主工程装依赖（A 档自动）：
   cd <web_package>
   pnpm add -D @epframe/mock-server @epframe/vite-plugin-mock-server

【修复 2】修改 <web_package>/vite.config.js（diff）：
   + import { mockServerPlugin } from '@epframe/vite-plugin-mock-server';
   + import Config from './src/config.js';
     export default defineConfig({
       plugins: [
         vue(),
   +     mockServerPlugin({
   +       enabled: Config.isMock,
   +       apiPrefix: `${Config.rootPath}/rest`,
   +       exclude: [`${Config.rootPath}/rest/resource/`],
   +       watch: true,
   +       logLevel: 'info'
   +     }),
         // ... 其他插件
       ]
     });

【修复 3】（如缺①）在 <component_package>/package.json 加 exports：
   {
     "exports": {
       ".": { "import": "./dist/index.js" },
       "./style.css": "./dist/style.css",
   +   "./mock": "./mock/index.ts"
     }
   }

→ 选项：
   A. 我帮你自动执行修复 1 + 修复 2 + 修复 3（默认推荐）
   B. 我只给 diff，你手动执行
   C. 跳过 mock 接入，apiMode 临时改为 proxy（连远程接口）

回复 "A" / "B" / "C"。
```

执行 A 档后：
- 跑 `pnpm add -D @epframe/mock-server @epframe/vite-plugin-mock-server` （在 web_package 下）
- 用 `edit` 工具改 vite.config.js
- 用 `edit` 工具改 component_package 的 package.json
- 改完跑 `pnpm install` 让 workspace 链接生效
- 进 Step 1

### Step 0.4 · 准备 `mock/index.ts` 入口（若不存在则自动建）

```ts
// <component_package>/mock/index.ts
export { default as <module><AppName>Mocks } from './<module>/<appName>.mock';

export const mockConfig = {
  basePriority: 10
};
```

---

## Step 1 · mock 文件位置（v0.3 路径参数化）

约定路径：`<intent_resolved.target_mock_dir><appName>.mock.ts`

即：`<component_package>/mock/<module>/<appName>.mock.ts`

文件命名：
- 主接口：`<appName>.mock.ts`
- 单独的子接口太多时拆分：`<appName>-options.mock.ts` / `<appName>-tree.mock.ts`

> ❌ 禁止硬编码到 `packages/examples/mock/...`（旧默认路径）。

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

## Step 4 · 数据生成（v0.3 · 字段类型智能映射）

**铁律**：mock 数据**禁止**硬编码"标段(包)管理"等业务语料（违反 ANTI-TEMPLATES.md C 项）。

正确做法：基于 `intent_resolved.intent.fields` 数组（含 `type` 字段）**自动**选 Mock.js 模板。

### v0.3 · 字段类型 → Mock.js 模板智能映射表

| `fields[].type` | Mock.js 模板 | 适用语境 |
| --- | --- | --- |
| `id` / `pk` | `'id|+1': 1` 或 `'@guid'` | 主键 |
| `text` | `'@ctitle(5, 15)'` | 中文短文本 |
| `paragraph` | `'@cparagraph(1, 3)'` | 中文段落 |
| `number` | `'|100-99999': 1` 或 `'|1-100.1-2': 1` | 整数 / 小数 |
| `amount` / `money` / `price` | `'amount|100-999999.2': 1` | 金额（2 位小数） |
| `enum` (含 options) | `'status|1': [<取自 options 数组>]` | 枚举值 |
| `date` | `'@date("yyyy-MM-dd")'` | 日期 |
| `datetime` | `'@datetime("yyyy-MM-dd HH:mm:ss")'` | 日期时间 |
| `time` | `'@time("HH:mm:ss")'` | 时间 |
| `phone` / `mobile` | `/^1[3-9]\\d{9}$/` | 手机号 |
| `email` | `'@email'` | 邮箱 |
| `cname` / `person` / `creator` | `'@cname'` | 中文姓名 |
| `address` / `region` | `'@county(true)'` 或 `'@city(true)'` | 中文地址 |
| `url` | `'@url'` | URL |
| `boolean` / `bool` | `'|1': true` | 布尔 |
| `tags` | `'tags|1-3': [<options>]` | 多选标签 |
| `description` / `remark` | `'@cparagraph(1)'` | 备注 |
| `image` / `avatar` | `'@image("200x100", "#1890ff", "#fff", "demo")'` | 图片 URL |

### 自动生成器（伪代码）

```ts
function buildMockTemplate(fields) {
  const tpl = { 'id|+1': 1 };
  for (const f of fields) {
    switch (f.type) {
      case 'text':       tpl[f.name] = '@ctitle(5, 15)'; break;
      case 'paragraph':  tpl[f.name] = '@cparagraph(1, 3)'; break;
      case 'number':     tpl[`${f.name}|100-99999`] = 1; break;
      case 'amount':     tpl[`${f.name}|100-999999.2`] = 1; break;
      case 'enum':       tpl[`${f.name}|1`] = f.options.map(o => o.value); break;
      case 'date':       tpl[f.name] = '@date("yyyy-MM-dd")'; break;
      case 'datetime':   tpl[f.name] = '@datetime("yyyy-MM-dd HH:mm:ss")'; break;
      case 'time':       tpl[f.name] = '@time("HH:mm:ss")'; break;
      case 'phone':      tpl[f.name] = /^1[3-9]\d{9}$/; break;
      case 'email':      tpl[f.name] = '@email'; break;
      case 'cname':      tpl[f.name] = '@cname'; break;
      case 'address':    tpl[f.name] = '@county(true)'; break;
      case 'url':        tpl[f.name] = '@url'; break;
      case 'boolean':    tpl[`${f.name}|1`] = true; break;
      case 'image':      tpl[f.name] = '@image("200x100", "#1890ff", "#fff", "demo")'; break;
      default:           tpl[f.name] = '@ctitle(5, 10)';
    }
  }
  return tpl;
}
```

### 实际写出来的形态

```ts
import Mock from 'mockjs';

function generateMockData(count = 50) {
  const list = Mock.mock({
    [`list|${count}`]: [
      // ★ 这里的字段是根据 intent.fields 自动生成（避免硬编码业务语料）
      buildMockTemplate(intent.fields)
    ]
  }).list;
  return list;
}
```

> ⚠️ 不要把 `intent.fields` 里的具体字段名（如 "标段名称"）写死在模板里，要从 `intent.fields[].name` 动态取。

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

**已接入 Step 0 的工程**：mock 文件放进 `<component_package>/mock/` 后，由 `@epframe/vite-plugin-mock-server` **自动**扫描 monorepo 内所有有 `exports['./mock']` 的包，无需手动注册。

**重启时机**：默认 Vite + mock-server 热更新；如果浏览器没刷新出新接口，重启 dev server。

---

## Step 7 · 接口一致性校验（v0.3 新增 · 必跑）

> 目的：防止 .vue 改了 URL 但 mock 没跟改，导致页面 404。

### Step 7.1 · 从 step3 的 `generated_urls` 拉出预期 URL 清单

```yaml
expected_urls: <-- 来自 03-generate.md 的 generated_urls
  - /api/<m>/<a>/list
  - /api/<m>/<a>/info
  - /api/<m>/<a>/<field>Options
  - /api/<m>/<a>/tree
  - /api/<m>/<a>/add
  - /api/<m>/<a>/update
  - /api/<m>/<a>/delete
```

### Step 7.2 · 从 .mock.ts 抽出实际注册的 URL

```javascript
// 伪代码：扫 mock 文件，提取 url 列表
function extractMockUrls(mockFilePath) {
  const src = fs.readFileSync(mockFilePath, 'utf8');
  return [...src.matchAll(/url\s*:\s*['"`]([^'"`]+)['"`]/g)].map(m => m[1]);
}
```

### Step 7.3 · 双向比对

| 比对 | 含义 | 处置 |
| --- | --- | --- |
| `expected - actual` | .vue 用到的 URL 在 mock 里没注册 | **STOP**，必须补 mock，否则浏览器必 404 |
| `actual - expected` | mock 注册了 .vue 没用的 URL | warning，列出多余 URL 让用户决定 |
| `expected ∩ actual` | 完全匹配 | ✓ pass |

输出比对报告：

```
🔍 接口一致性校验（intent: epoint-bid-mgmt）：
  .vue 用到 URL 共 7 个：
    /api/procurement/epoint-bid-mgmt/list      ✓ 已注册
    /api/procurement/epoint-bid-mgmt/info      ✓ 已注册
    /api/procurement/epoint-bid-mgmt/statusOptions  ✓ 已注册
    /api/procurement/epoint-bid-mgmt/tree      ✗ 未注册（mock 缺）
    /api/procurement/epoint-bid-mgmt/add       ✓ 已注册
    /api/procurement/epoint-bid-mgmt/update    ✓ 已注册
    /api/procurement/epoint-bid-mgmt/delete    ✓ 已注册

→ 缺 1 个：tree 接口。我将补到 <mock_file>，给 hasTree 用。
```

### Step 7.4 · 自动补全 / 报错

- 缺 mock → **自动**追加到 .mock.ts（基于映射表生成 mock data）
- 缺 .vue 使用 → **warning**（不阻塞），让用户决定是否删 mock

---

## 输出契约（v0.3 加 url 一致性校验结果）

```yaml
mock_generated:
  - file: <绝对路径>                     # 必须在 component_package/mock/ 下
    interfaces:
      - url: <string>
        method: post
        mode: body | response | handler
        purpose: <一句话描述>
sync_to_dev_server: <bool>
# ★ v0.3 新增
mock_environment_status:
  has_exports: <bool>
  has_deps: <bool>
  has_plugin: <bool>
  fix_applied: <bool>                   # 是否执行了一键接入
url_consistency:
  expected: [<string>]                  # 来自 generated_urls
  actual: [<string>]                    # 从 .mock.ts 抽出
  missing_in_mock: [<string>]
  extra_in_mock: [<string>]
  pass: <bool>
```

---

## ✓ 检验句

- [ ] 所有 mock URL 与步骤 3 .vue 里的 `useTableModel` / `useListModel` / `useTreeModel` / `Utils.request` URL **逐一对得上**
- [ ] 所有给 model Hook 用的 mock 都是 `method: 'post'`（违反 = 必出"接口 404"或"返回不被识别"）
- [ ] 树形 mock 数据用 `value` / `label` / `children`（不是 `id` / `text`）
- [ ] 表格 mock 返回 `{ data: [...], total: number }`
- [ ] 列表 mock 返回 `{ data: [{ label, value }] }`
- [ ] 没有"标段(包)"等业务语料硬编码（数据来自 `intent.fields` 动态生成）
- [ ] **(v0.3)** Step 0 探测已跑，三件接入状态明确（fix_applied 或 全 pass）
- [ ] **(v0.3)** mock 文件路径以 `<component_package>/mock/` 开头，**不**写到 Web 工程下
- [ ] **(v0.3)** Step 7 接口一致性校验 `pass=true`（missing_in_mock 为空）

---

## Red Flags

| 信号 | 处理 |
| --- | --- |
| 用户说"先不写 mock，我直接连后端" | 跳过本 workflow 的 Step 1~6，但**仍跑 Step 7 接口校验**（restful/proxy 模式下校验 URL 在后端是否存在） |
| mock 文件已存在（重新生成）| 询问用户是否覆盖；默认追加新接口不动旧的 |
| `method: 'get'` 给了模型接口 | STOP，违反 R2 |
| **(v0.3)** Step 0 探测全 fail，用户选 "C 跳过 mock 接入" | 自动把 apiMode 改为 proxy，提示用户在 vite.config.js 加 proxy 配 |
| **(v0.3)** Step 7 missing_in_mock 非空 | 自动补 mock，补完再校验一次 |

---

_步骤 4 完成 → 进 `05-route.md`。_
