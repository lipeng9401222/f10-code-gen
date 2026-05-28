# epoint-f10code-gen · F10 Vue 页面代码生成 skill

> 给**所有人**的 5 秒上手指南。完整规则与流程见 `SKILL.md`（AI 读），安装指南见 `USAGE.md`。

---

## 安装（一行命令）

```bash
npx epoint-f10code-gen init
```

会自动检测你项目下已有哪些 IDE（`.cursor` / `.claude` / `.windsurf`），只为存在的安装入口。安装后主体会被复制到 `<你的项目>/epoint-f10code-gen/`。

---

## 一句话用法

安装后在你的 IDE 里（Windsurf / Cursor / Claude Code）直接说：

> "**用 epoint-f10code-gen 帮我生成一个标段管理列表页**"

或者更详细：

> "我要做一个标段(包)管理页：左边树是标段分类，右边列表，能新增/编辑/详情，详情用弹窗。包名 epoint-bid-mgmt，模块 procurement。"

AI 会自动按 F10 / EUI4.0 框架规范产出符合规范的页面 + mock + 路由 + 接口文档，并在浏览器里打开预览。

---

## 这是什么

一个**自动化 F10 页面生成 skill**：
- 你描述需求 → AI 走完整流程 → 浏览器看到能跑的页面
- 跨 IDE 通用：Windsurf / Cursor / Claude Code / Codex
- 不污染你现有的 `CLAUDE.md` / `AGENTS.md` 一行

## 它会自动做什么 / 不会做什么

### ✅ 自动做（A 档代劳）

- 按需求写 `.vue` 页面（列表/表单/详情/弹窗）
- 写 mock 数据（含分页/搜索/CRUD）
- 配置静态路由
- 根据 mock 生成接口文档（Markdown + JSON）
- `pnpm install` / `pnpm dev`
- 安装 `pnpm` / `nrm`（如果缺）
- 配置公司私有 npm 源 `nrm add epoint`
- 安装 `@epframe/eui-cli` 命令行工具

### ⏸️ 半自动（B 档：等你确认）

- `eui-cli init/web/comp` 创建工程（要在终端选择产线）
- `npm login` 登录公司 nexus（要输用户名密码）

### 🚫 不能代劳（C 档：给你链接）

- 安装 Node.js 22.21.1（系统级）
- 安装 nvm（Windows / mac / Linux 各自方式不同）
- 安装 Git

---

## 智能跳过：3 个 Phase 自动检测

skill 启动时跑 5 项体检，**已完成的项自动跳过**：

| 检测项 | 检查命令 | 缺失时 |
| --- | --- | --- |
| Node.js | `node -v` ≥ 22.21.1 | 弹链接 + 安装命令（C 档） |
| pnpm | `pnpm -v` ≥ 10 | 自动 `npm i -g pnpm@10`（A） |
| 公司源 | `nrm current` 是 epoint | 自动 `nrm add epoint` + 提醒登录（A→B） |
| eui-cli | `eui-cli -v` 存在 | 自动 `npm i -g @epframe/eui-cli`（A） |
| 当前工程 | 是否在 monorepo 内 | 是 → 5 秒走零成本演示模式；否 → 走完整 `eui-cli ws/web/comp` |

最快路径：**当前已在 `vue-frame-live-docs` 仓库内 → 5 秒出页面**。

---

## 6 字段对话（生成页面前 AI 会问你）

| 字段 | 问什么 | 默认值 | 必须？ |
| --- | --- | --- | --- |
| 应用名 | 业务取个名 | "demo-app" | 否 |
| 包名 | npm 包名（可选） | `@epoint-fe/<应用名>` | 否 |
| 模块 | 一级分类（procurement / bidding / ...） | "default" | 否 |
| 页面诉求 | 功能描述（"列表+树+三弹窗"） | — | **是** |
| 接口模式 | mock / restful（公司测试服） / proxy | "mock" | 否 |
| 路由方式 | 静态路由 / 动态注册 | "static" | 否 |

只有"页面诉求"必填，其他可全省（用默认值秒过）。

---

## 项目结构

```
epoint-f10code-gen/
├── README.md                  # 你正在看的（人类入口）
├── USAGE.md                   # npx 安装指南
├── SKILL.md                   # AI 读的路由中心
├── ANTI-TEMPLATES.md          # 故意不预制清单（防漂移）
├── CHANGELOG.md               # 版本演进
├── package.json               # npm 发布元数据
│
├── bin/cli.mjs                # npx 入口（init / check / update / sync / smoke / validate）
├── rules/                     # 长期约束（每条带检验句）
├── workflows/                 # 步骤流程（orchestrator + env/project/page）
├── references/                # 内嵌知识库（含 vue-docs 镜像）
├── templates/                 # 模板骨架（仅结构不预制业务）
├── scripts/                   # 跨平台 .mjs 自检脚本
└── installer/stubs/           # 3 份 IDE 入口模板（仅 npx init 时用）
```

---

## 我想做的事

| 我想… | 跑什么 |
| --- | --- |
| 生成一个新页面 | 在 IDE 里描述需求即可（skill 自动触发） |
| 修一个 bug | "skill 修一下 xxx 报错"（走 `workflows/fix-bug.md`） |
| 生成接口文档 | 页面生成流程会自动跑 `workflows/page/07-api-doc.md` |
| 安装到现有项目 | `npx epoint-f10code-gen init` |
| 检查已装入口与本包模板是否一致 | `npx epoint-f10code-gen check` |
| 升级主体（不动 IDE 入口） | `npx epoint-f10code-gen update` |
| 同步最新规范文档到 skill 里 | `npx epoint-f10code-gen sync` |
| 自检 skill 完整性 | `npx epoint-f10code-gen smoke` |
| 验证生成的 .vue 是否合规 | `npx epoint-f10code-gen validate <文件路径>` |
| 根据 mock 反推接口文档（v0.4.2） | `npx epoint-f10code-gen gen-api-doc <mock-file\|mock-dir>` |

接口文档支持单文件和套件目录两种输入：

```bash
# 单页面
npx epoint-f10code-gen gen-api-doc ./mock/demo/order.mock.ts

# 多页面套件：按页面配置补齐字段，并只收集业务接口
npx epoint-f10code-gen gen-api-doc ./mock/ipd \
  --config ./src/views/ipd/config.js \
  --api-prefix /api/ipd
```

生成的 Markdown / JSON 会按接口展开 `request.fields`、`response.fields`、示例请求、示例响应和字段来源。

---

## FAQ

### Q1: 我已经是 F10 开发者了，还需要这个 skill 吗？

需要。它把 198 篇 F10 规范文档 + 1352 个示例 .vue + 真实坑点（如 Tab 内表格 / Flex 高度跳动）压成一个 AI 能秒查的索引，**比你翻文档快 100 倍**。

### Q2: 我不想用 mock，想直接连后端可以吗？

可以。第 5 字段"接口模式"选 `restful`（接公司 192.168.219.170 测试环境）或 `proxy`（你自己的后端地址）。

### Q3: 这个 skill 会污染我的项目吗？

**不会**。
- `npx ... init` 默认**仅**在你项目下已存在的 IDE 目录（`.cursor` / `.claude` / `.windsurf`）里添加一个新文件
- 不动你 `CLAUDE.md` / `AGENTS.md` 一行
- 主体被复制到 `<你的项目>/epoint-f10code-gen/`，是独立目录，删也可以
- 升级只需跑 `npx epoint-f10code-gen update`

### Q4: 出错了怎么办？

skill 自带 AAR（After Action Review）机制：
1. 任务结束自动跑 30 秒 4 问，**复盘哪里漏了规则**
2. 如果是真实可复用的坑 → 自动追加到 `references/gotchas.md`
3. 下次同类任务自动避坑

也可以手动跑 `npx epoint-f10code-gen smoke` 检查 skill 自身是否健康。

---

_需要修改 skill 本身？看 `workflows/update-rules.md`。_
_想了解设计哲学？看 `ANTI-TEMPLATES.md` 与 `如何写一个好的skill.md`。_
