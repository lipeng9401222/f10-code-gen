# page/01-confirm-intent · 需求识别 + 分流确认（v0.3）

> **目的**：在生成代码前**5 分钟内**对齐用户需求，避免生成出来用户说"不是这个"返工。
> **v0.3 升级**：识别用户给的**输入类型**，按 4 种通道分流确认（短文字 / 详文字 / 文档图像 / 已结构化）。

---

## Step 0 · 输入类型识别（v0.3 新增·必跑）

拿到用户的页面需求后，**第一步识别输入类型**：

| 输入类型 | 识别特征 | 分流处置 |
| --- | --- | --- |
| **T1 · 简短文字** | 总字数 < 80，含"列表/表单/管理/页面"等关键词但缺字段/字段数 < 3 | **AI 抽取要素 → 强制对话补全 → 用户确认**（最常见） |
| **T2 · 详细文字** | 总字数 ≥ 80，含 ≥ 3 个字段名 / 操作描述 / 业务场景 | **AI 抽取要素 → 展示清单 → 用户轻量确认**（多数自动通过） |
| **T3 · 文档/图像** | 用户上传/粘贴：.docx / .pdf / .md / Figma 链接 / 截图 / PRD 长文（≥ 500 字） | **AI 深度解析 + 拆分多个页面候选 → 强制让用户勾选**（防止整篇生成出错） |
| **T4 · 结构化输入** | 用户直接给出 `intent_resolved` 等 YAML / JSON / 给定 6 字段格式 | **跳过对话，直接进 step2 模板匹配** |

### 识别伪代码

```
function classifyInput(userMessage, attachments) {
  if (attachments.length > 0 || /\.(docx|pdf|md|png|jpg|jpeg|figma)/.test(userMessage)) return 'T3';
  if (/intent_resolved|appName\s*:|pageType\s*:|^[\s\S]*\{[\s\S]*intent[\s\S]*\}/.test(userMessage)) return 'T4';
  const charCount = userMessage.replace(/\s+/g, '').length;
  const fieldHints = (userMessage.match(/(字段|名称|编号|状态|时间|类型|金额|描述|分类|备注|地址|电话|邮箱)/g) || []).length;
  if (charCount < 80 || fieldHints < 3) return 'T1';
  return 'T2';
}
```

### 通道分流流程

```
[用户输入]
   ↓
[识别 T1/T2/T3/T4]
   ↓
T1 → 抽取 → 强制对话补全 6 字段 → 用户确认 → 进 Step 2 (字段对话)
T2 → 抽取 → 展示清单 → 用户轻量确认 → 进 Step 2
T3 → 解析 (含多页面拆分) → 用户勾选目标页面 → 进 Step 2
T4 → 直接产出 intent_resolved → 跳过对话 → 进 02-match-template.md
```

---

## 6 字段清单

| 字段 | 必填？ | 默认值 | 你需要问的方式 |
| --- | --- | --- | --- |
| **1. 应用名 (appName)** | 否 | `demo-app` | "给应用取个名（中英都行），方便我命名文件夹" |
| **2. 包名 (pkgName)** | 否 | **取自 `project_detect_result.component_package` 的 `package.json.name`** | "已自动填充为目标组件工程的包名，不用改" |
| **3. 模块 (module)** | 否 | `default` | "页面归属哪个模块（如 procurement / bidding / public）？没有就 default" |
| **4. 页面诉求 (intent)** | **是** | — | "你要做啥页面？尽量详细：列表？表单？要不要树？要不要弹窗？字段有哪些？" |
| **5. 接口模式 (apiMode)** | 否 | `mock` | "数据从哪来？mock(本地假数据) / restful(连公司测试服) / proxy(自己后端地址)" |
| **6. 路由方式 (routeMode)** | 否 | `static` | "路由怎么注册？static(写死路由表) / dynamic(后端推送动态路由)" |

> **v0.3 注意**：`pkgName` 不再是 `@epoint-fe/<appName>` 默认值，而是**取自 Phase 2 的 `component_package`** 包名，避免和组件工程名错位。

---

## intent.fields 字段契约（v0.4）

字段必须尽量结构化，供 `03-generate.md`、`04-mock.md`、`07-api-doc.md` 复用：

```ts
type IntentField = {
  name: string;      // 英文字段名，必填
  label?: string;    // 中文名 / 显示名
  type?: string;     // text / enum / date / datetime / number / amount / boolean ...
  required?: boolean;
  desc?: string;     // 给后端接口文档使用
  options?: Array<{ label: string; value: string | number | boolean }>;
  example?: unknown;
};
```

抽取要求：
- 用户只给中文字段时，补 `name`，例如“创建时间” → `createTime`
- 枚举字段必须尽量补 `options`
- 用户没给 `desc` 不要硬编业务事实；后续接口文档会标记“待后端确认”
- 旧版字符串数组仍可兼容，但进入 Step 2 前要转换为对象数组

---

## 对话模板（按 T1/T2/T3/T4 分流）

### Step 1 · 通道 T1 · 简短文字 → 强制对话补全

**触发示例**：用户说 "做个标段管理页"、"我要列表+树+弹窗"、"做个待办事项"。

#### Step 1.1 · 抽取已给字段 + 列追问清单

```
我从你的描述里识别到：
- 页面诉求 (intent)：<回填用户原话 + 你的解读>

但信息不够生成代码，我需要你补 2~3 个细节：
1. **字段**有哪些？（至少 3 个，例：名称 / 编号 / 状态 / 创建时间 / 创建人）
2. **操作**要哪些？（新增 / 编辑 / 删除 / 详情 / 导出 / 审批）
3. **是否要左侧树**做分类导航？

举个最快回复格式：
> 字段：名称、编号、状态、创建时间、创建人
> 操作：新增、编辑、删除、详情
> 树：要，按分类
> 应用名 epoint-bid-mgmt，模块 procurement，其他默认

5 秒搞定。
```

#### Step 1.2 · 用户回复后

把抽取到的字段、操作、是否带树等组装成 `intent_resolved`，展示给用户**强制确认**：

```
请确认以下需求清单，没问题回"确认"，要改回"改 xxx"：

✓ 页面类型：列表 + 左侧分类树 + 3 个弹窗（新增/编辑/详情）
✓ 字段（5 个）：名称(name) / 编号(code) / 状态(status, 枚举) / 创建时间(createTime) / 创建人(creator)
✓ 操作按钮：新增、编辑、删除、详情、批量删除
✓ 应用名：epoint-bid-mgmt
✓ 模块：procurement
✓ 接口模式：mock（默认）
✓ 路由方式：static（默认）
✓ 产出位置：packages/examples/src/views/procurement/epoint-bid-mgmt/  ← 来自 Phase 2

确认？
```

---

### Step 1 · 通道 T2 · 详细文字 → 轻量确认

**触发示例**：用户给了 ≥ 80 字描述、包含 ≥ 3 个字段名、含操作描述。

#### Step 1.1 · 一次性抽取 → 展示清单 → 询问确认

```
我从你的描述里识别到完整需求（请扫一眼，没问题回"确认"，要改回"改 xxx"）：

✓ 页面类型：<list / form / detail / dialog>
✓ 主结构：<树+列表+弹窗 / 单纯列表 / 表单+步骤>
✓ 字段（共 N 个）：
  - <field1> (<type1>)
  - <field2> (<type2, 枚举/日期/数字>)
  - ...
✓ 操作：<新增 / 编辑 / 删除 / 详情 / 导出 / 上传>
✓ 应用名：<推测的或用户给的>
✓ 模块：<推测的或 default>
✓ 接口模式：<mock/restful/proxy>，默认 mock
✓ 路由方式：static
✓ 产出位置：<component_package>/src/views/<module>/<appName>/

确认？（默认 5 秒后无回复视为确认）
```

---

### Step 1 · 通道 T3 · 文档/图像 → 解析 + 多页面拆分 + 强制勾选

**触发示例**：用户上传 .docx PRD、贴 Figma 链接、给截图、贴 ≥ 500 字业务描述。

#### Step 1.1 · 深度解析为多个候选页面

文档级输入往往**含多个页面需求**，必须**拆**：

```
我解析你提供的<PRD/Figma/截图>，识别出 3 个候选页面：

【候选 1】标段管理列表页（高优先级）
  类型：list + 左树 + 3 弹窗
  字段：标段名称、编号、采购项目、负责人、招标状态、截止时间
  操作：新增、编辑、删除、查看、导出、审批

【候选 2】供应商详情弹窗
  类型：detail dialog
  字段：供应商名称、联系人、电话、资质等级、合作历史

【候选 3】采购项目甘特图
  类型：list + 时间轴可视化（不在 typical 模板支持范围，建议拆为单独任务）

------
请勾选要本次生成的页面（多选）：
- [ ] 1. 标段管理列表页
- [ ] 2. 供应商详情弹窗
- [ ] 3. 采购项目甘特图（⚠️ 暂不支持，跳过）

回复格式：「我要 1, 2」或「全选」或「先做 1」
```

#### Step 1.2 · 每个被勾选页面单独走 T1/T2 确认

对每个勾选的候选 → 抽取要素 → 走 T2 的"轻量确认"流程。

#### Step 1.3 · 输入物落档（避免重复解析）

把解析出的结构化结果保存到 `.epoint-skill-cache/<task-id>/intent-parsed.yaml`（git ignore），方便用户后续追问 / 重新生成时复用。

---

### Step 1 · 通道 T4 · 结构化输入 → 直接跳过

**触发示例**：用户直接贴 `intent_resolved` YAML、贴 6 字段对应值、用 JSON 给完整 schema。

```
检测到你给了结构化需求，已直接采纳，无需对话确认：

intent_resolved:
  appName: <用户给的>
  ...

跳过对话，进入步骤 2 · 模板匹配...
```

---

### Step 2 · 用户回复后的兜底（适用所有通道）

#### 情况 A · 全用默认

用户："默认即可" / "都用默认" / "你定吧"

→ 你产出最终参数（**注意 pkgName 必须取自 component_package**）：
```
确认参数：
- appName: demo-app
- pkgName: <自动取自 component_package 的 package.json.name>
- module: default
- intent: <用户原话或抽取结果>
- apiMode: mock
- routeMode: static
- target_view_dir: <component_package>/src/views/default/demo-app/

进入步骤 2 · 模板匹配...
```

#### 情况 B · 用户给的 intent 还是太模糊

用户："我要做个管理页面"

→ 你**追问**：
```
"管理页面"信息不够，我需要再问 3 个细节：
1. 是单纯列表 (CRUD)？还是带左侧分类树？
2. 字段大概有哪些？（举 3~5 个就行）
3. 操作里要不要弹窗（新增 / 编辑 / 详情）？

举个例子，你可以说："列表 + 树 + 三个弹窗，字段有名称/分类/状态/创建时间，操作含新增编辑删除详情"
```

#### 情况 C · 用户改某个字段

用户："改字段：加一个负责人，去掉创建人"

→ 更新 `intent_resolved.intent.fields`，重新展示清单确认。

---

## intent 解析规则（你要从话里识别这些信号）

| 用户的话里出现… | 识别为… |
| --- | --- |
| "列表" / "表格" / "数据表" | `pageType: list` |
| "新增" / "编辑" / "表单" / "提交" | `pageType: form` 或 `hasFormDialog: true` |
| "详情" / "查看" / "明细" | `hasDetailDialog: true` |
| "树" / "分类" / "目录" / "左边导航" | `hasTree: true`（必匹配 `side-tree.vue` 模板） |
| "Tab" / "选项卡" / "分组" | `hasTabs: true` |
| "搜索" / "筛选" / "查询条件" | `hasSearch: true`（默认含，除非明说不要） |
| "导出" / "下载" / "Excel" | `hasExport: true` |
| "权限" / "角色" / "rbac" | `hasPermission: true`（这是 admin-components 范围） |
| "审批" / "工作流" / "流程" | `hasWorkflow: true`（基于 epoint-workflow-vue） |
| "上传" / "附件" / "文件" | `hasUpload: true` |

把识别结果产出为结构化对象，传给步骤 2。

---

## 接口模式 (apiMode) 详解

| 模式 | 含义 | 何时用 |
| --- | --- | --- |
| `mock` | 本地 mock-server 假数据 | 演示 / 原型 / 后端没好（默认） |
| `restful` | 接公司测试服 `http://192.168.219.170/...` | 已经有真实接口要联调 |
| `proxy` | Vite proxy 转发到自定义地址 | 接私有后端 |

不同模式的代码差异：

```js
// mock 模式：useTableModel 的 url 是 mock 路径
const gridList = useTableModel('/api/page-examples/list', { ... });

// restful 模式：完整 URL 或后端约定的路径
const gridList = useTableModel('/showcase/f10-demo/list', { requestType: 'restful', ... });

// proxy 模式：本地路径 + Vite proxy 配置在 vite.config.js
const gridList = useTableModel('/api/list', { ... });
// + vite.config.js: proxy: { '/api': 'http://192.168.x.x:8080' }
```

---

## 路由方式 (routeMode) 详解

| 模式 | 含义 | 何时用 |
| --- | --- | --- |
| `static` | 在【组件工程】`src/router/static.js` 的 `MENU_ROUTES`/`ROOT_ROUTES` 数组中追加 | 默认 / 简单页面 |
| `dynamic` | 后端推送菜单 / 角色权限决定 | 业务系统的真实场景 |

P0 阶段**默认 static**（dynamic 实现复杂度大、需后端配合，P1 再支持）。

---

## 输出契约（v0.3 · 加 input_type + 引用 component_package）

本步骤的最终产出**必须**是：

```yaml
intent_resolved:
  input_type: T1 | T2 | T3 | T4         # ★ v0.3 新增·识别的输入类型
  appName: <string>
  pkgName: <string>                      # ★ v0.3 默认取自 component_package
  module: <string>
  intent:
    pageType: list | form | detail | dialog
    hasTree: <bool>
    hasFormDialog: <bool>
    hasDetailDialog: <bool>
    hasEditDialog: <bool>
    hasTabs: <bool>
    hasSearch: <bool>
    hasExport: <bool>
    fields:                              # ★ v0.3 结构化字段（用于 mock 智能数据 + form-item 生成）
      - { name: <string>, type: text|number|enum|date|datetime|phone|email|amount|address|cname, label: <string>, options: [<可选枚举值>] }
    actions: [<add|edit|delete|detail|export|batchDelete|...>]
  apiMode: mock | restful | proxy
  routeMode: static | dynamic
  # ★ v0.3 新增·从 project_detect_result 透传
  component_package: <绝对路径>
  target_view_dir: <绝对路径>
  target_mock_dir: <绝对路径>
  target_route_file: <绝对路径>
```

把这个对象作为**步骤 2 模板匹配**的输入。

---

## ✓ 检验句

退出本步骤前自查：

- [ ] 已识别 `input_type` 并按对应通道流转
- [ ] 6 个字段每个都**有值**（默认值也算）
- [ ] `intent.fields` 是**结构化数组**（含 type 字段），不是原始字符串列表
- [ ] 用户已**显式确认**（T1/T2/T3 通道）或**直接采纳**（T4 通道）
- [ ] `component_package` / `target_view_dir` / `target_mock_dir` / `target_route_file` 均从 `project_detect_result` 透传，**不能为空**
- [ ] 整个对话耗时 < 5 分钟

任一项 fail → 回头重新对话。

---

_步骤 1 完成 → 进 `02-match-template.md`。_
