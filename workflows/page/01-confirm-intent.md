# page/01-confirm-intent · 6 字段对话

> **目的**：在生成代码前**5 分钟内**对齐用户需求，避免生成出来用户说"不是这个"返工。

---

## 6 字段清单

| 字段 | 必填？ | 默认值 | 你需要问的方式 |
| --- | --- | --- | --- |
| **1. 应用名 (appName)** | 否 | `demo-app` | "给应用取个名（中英都行），方便我命名文件夹" |
| **2. 包名 (pkgName)** | 否 | `@epoint-fe/<appName>` | "需要发布到 npm 吗？要的话给个 npm 包名" |
| **3. 模块 (module)** | 否 | `default` | "页面归属哪个模块（如 procurement / bidding / public）？没有就 default" |
| **4. 页面诉求 (intent)** | **是** | — | "你要做啥页面？尽量详细：列表？表单？要不要树？要不要弹窗？字段有哪些？" |
| **5. 接口模式 (apiMode)** | 否 | `mock` | "数据从哪来？mock(本地假数据) / restful(连公司测试服) / proxy(自己后端地址)" |
| **6. 路由方式 (routeMode)** | 否 | `static` | "路由怎么注册？static(写死路由表) / dynamic(后端推送动态路由)" |

---

## 对话模板

### Step 1 · 解析用户原始需求

从用户的话里**抽取**已经给的字段，**只问没给的**。

**示例 1**（用户说"我要做一个标段(包)管理页：左边树是分类，右边列表，能新增/编辑/详情，详情用弹窗"）：

```
我从你的描述里识别到：
- 页面诉求 (intent) ✓：标段(包)管理列表 + 左侧分类树 + 三个弹窗（新增/编辑/详情）

还需要确认 5 个字段（都有默认值，不想填可以说"用默认"）：
1. 应用名：默认 demo-app（建议你写：epoint-bid-mgmt）
2. 包名：默认 @epoint-fe/<应用名>
3. 模块：默认 default（建议你写：procurement）
4. 接口模式：默认 mock（连公司测试服选 restful）
5. 路由方式：默认 static

直接说"全用默认" 或 "应用名 epoint-bid-mgmt 模块 procurement 其他默认"，5 秒搞定。
```

**示例 2**（用户说"做个简单的待办事项列表"）：

```
我从你的描述里识别到：
- 页面诉求 (intent)：待办事项列表（CRUD 表格）

还需要确认 5 个字段：
1. 应用名：默认 demo-app（建议你写：epoint-todo）
2~6. 全用默认 (mock + static)？

如果只想最快出原型，直接回："默认即可"。
```

### Step 2 · 用户回复

用户回复有 3 种典型情况：

#### 情况 A · 全用默认

用户："默认即可" / "都用默认" / "你定吧"

→ 你产出最终参数：
```
确认参数：
- appName: demo-app  （想改告诉我）
- pkgName: @epoint-fe/demo-app
- module: default
- intent: <用户原话>
- apiMode: mock
- routeMode: static

进入步骤 2 · 模板匹配...
```

#### 情况 B · 部分明确

用户："应用名叫 epoint-bid-mgmt 模块 procurement 其他默认"

→ 你产出：
```
确认参数：
- appName: epoint-bid-mgmt
- pkgName: @epoint-fe/epoint-bid-mgmt
- module: procurement
- intent: 标段(包)管理列表 + 左侧分类树 + 三个弹窗
- apiMode: mock
- routeMode: static

进入步骤 2 · 模板匹配...
```

#### 情况 C · 用户给的 intent 太模糊

用户："我要做个管理页面"

→ 你**追问**：
```
"管理页面"信息不够，我需要再问 3 个细节：
1. 是单纯列表 (CRUD)？还是带左侧分类树？
2. 字段大概有哪些？（举 3~5 个就行）
3. 操作里要不要弹窗（新增 / 编辑 / 详情）？

举个例子，你可以说："列表 + 树 + 三个弹窗，字段有名称/分类/状态/创建时间，操作含新增编辑删除详情"
```

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
| `static` | 在 `src/router/routes.js` 写死 | 默认 / 简单页面 |
| `dynamic` | 后端推送菜单 / 角色权限决定 | 业务系统的真实场景 |

P0 阶段**默认 static**（dynamic 实现复杂度大、需后端配合，P1 再支持）。

---

## 输出契约

本步骤的最终产出**必须**是：

```yaml
intent_resolved:
  appName: <string>
  pkgName: <string>
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
    fields: [<可选：用户提到的字段列表>]
    actions: [<可选：用户提到的操作按钮>]
  apiMode: mock | restful | proxy
  routeMode: static | dynamic
```

把这个对象作为**步骤 2 模板匹配**的输入。

---

## ✓ 检验句

退出本步骤前自查：

- [ ] 6 个字段每个都**有值**（默认值也算）
- [ ] `intent` 字段不是空的（必填）
- [ ] 用户已**显式确认**（你输出参数后用户没否认）
- [ ] 整个对话耗时 < 5 分钟

任一项 fail → 回头重新对话。

---

_步骤 1 完成 → 进 `02-match-template.md`。_
