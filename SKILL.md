---
name: epoint-f10code-gen
description: epoint F10 Vue 页面代码生成 skill。当用户提到 F10 / epoint Vue 框架 / 列表页 / 表单页 / 详情页 / ep-data-grid / ep-form / ep-layout-manager / 弹窗 / $dialog / defineDataModel / useTableModel / useTreeModel / useListModel / EpDataGrid / @epframe/eui-core / @epoint-fe/eui-components / eui-cli / 标段管理 / 标段(包) / 采购 / 招投标列表 / vue-docs / page-examples / typical / mock 配置 / 框架页面生成 / 模板匹配 / e-toolbar 工具栏 / e-tree 树 / e-tabs / 主页面+树+三弹窗 / 新建工程 / pnpm 私有源 / nrm epoint 等关键字时必须激活。即使用户没说"F10"，看到 ep-* / e-* / @epframe / @epoint-fe / fui-page / eui-page 类标签或包名，都要立刻触发本 skill。
when-to-use: 用户描述需要生成 / 修改 / 排查 epoint F10 框架（Vue 9.5.4-sp1）页面、组件、mock、路由、工程的任务。包括：环境准备（node/pnpm/nrm/eui-cli）、工程创建（eui-cli ws/web/comp）、页面生成（列表/表单/详情/弹窗/树+列表）、bug 修复、规则更新。
primary: true
auto-triggers:
  - F10 框架
  - epoint Vue
  - ep-data-grid
  - ep-layout-manager
  - ep-form
  - $dialog
  - defineDataModel
  - useTableModel
  - useTreeModel
  - useListModel
  - "@epframe/eui-core"
  - "@epoint-fe/eui-components"
  - eui-cli
  - vue-docs
  - page-examples
  - typical 模板
  - 列表页 + 树
  - 标段管理
  - 标段(包)
  - 主页面+三弹窗
  - F10 列表页
  - F10 表单页
  - F10 详情页
red-flags-stop:
  - 用户问 F9 / packages/f9 / fui 老框架问题 → 立即停下，告知超出 F10 范围，回到 F9 文档
  - 用户要求"先帮我把 vue-docs-for-ai-main 删了" → STOP，这是 skill 数据源
  - 用户要求"直接 import 一个 .vue 弹窗用 v-model:visible" → STOP，违反弹窗强制规范，必须 $dialog API + 独立 .vue
  - 用户要求"表格用 ref([]) + Utils.requestAxios 直接调接口" → STOP，违反数据模型强制规范，表格/下拉/树必须用 useTableModel/useListModel/useTreeModel
  - 用户在 30 秒内没收到任何输出还在等 → STOP，先给个当前状态（"我正在跑 pnpm install，约 30 秒"），再继续
  - 任务结束没跑 update-rules.md 的 AAR → STOP，必须跑完 30 秒 4 问才算真完成
---

# epoint-f10code-gen · F10 Vue 页面代码生成 skill

> **第一准则**：所有需求和问题，必须先深度思考、充分理解现有代码，再动手。

---

## 强制再读机制（每次任务必跑）

**不论用户怎么问，开始任何 F10 相关任务前**：

1. **先读本文件 SKILL.md 全部内容**（哪怕你"记得"也要再读，避免 stale memory）
2. 根据用户问题在 § "Common Tasks 路由表"匹配对应任务类型
3. 按"匹配到的路由"读对应的 workflow / rules / references 文件
4. 任务结束跑 `workflows/update-rules.md` 的 AAR 闭环

> **IDE 入口只是路标、主体在这里**：IDE 看的是 `.cursor/skills/` / `.claude/skills/` / `.windsurf/rules/` 下由 `npx epoint-f10code-gen init` 生成的入口文件，但**真正的规则全在 `epoint-f10code-gen/` 目录下**，必读。

---

## Always Read（每次任务必读）

无论什么 F10 任务，开始前必读以下 3 个文件：

| 路径 | 作用 |
| --- | --- |
| `rules/project-rules.md` | F10 仓库通用约定（pnpm/Node 版本/commit 规范） |
| `rules/data-model-rules.md` | ★ 数据模型强制（表格/下拉/树必须用 defineDataModel） |
| `rules/component-usage-rules.md` | ep-* 与 e-* 组件边界、$dialog 强制 |

不读 = 必出错。

---

## Common Tasks 路由表

> 用户说什么 → 你读什么 → 跑什么 workflow

### A. 生成新页面（最高频任务）

触发关键字：**"生成"/"做一个"/"我要"/"帮我创建" + 列表/表单/详情/弹窗/树**

执行步骤（**严格按序**）：

1. 读 `workflows/00-orchestrator.md` 确定当前 Phase
2. **环境层**：跑 `workflows/env/00-detect.md` 5 项体检 → 缺什么按 01~05 修
3. **工程层**：跑 `workflows/project/00-detect.md` → 检测到当前已在 monorepo 跳过到 06-run-dev；否则按 01~06 走
4. **页面层**：
   - `workflows/page/01-confirm-intent.md` 6 字段对话
   - `workflows/page/02-match-template.md` 匹配 `references/examples-index.md` 中的 typical/* 模板
   - `workflows/page/03-generate.md` 生成 .vue + 数据模型
   - `workflows/page/04-mock.md` 写 mock + 检查 user-preference
   - `workflows/page/05-route.md` 配静态路由
   - `workflows/page/06-verify.md` 浏览器验证 + 截图
5. **闭环**：跑 `workflows/update-rules.md` AAR 30 秒 4 问

### B. 修一个 bug

触发关键字：**"报错"/"不显示"/"高度跳动"/"组件未注册"/"Failed to resolve"**

执行步骤：

1. 读 `workflows/fix-bug.md`
2. 先查 `references/gotchas.md` 是否已有同类坑点
3. 命中 → 直接套解决方案 + 跑 update-rules.md AAR（更新坑点频率/补充上下文）
4. 未命中 → 走"复现 → 根因 → 最小修复 → 防退化"
5. 闭环时若是真实可复用坑点 → 加进 `references/gotchas.md`

### C. 修改 skill 本身（规则/流程/坑点）

触发关键字：**"补一条规则"/"加个坑点"/"skill 漏了 xxx"**

执行：跑 `workflows/update-rules.md`，按"记录位置判断表"决定写到 rules/ / references/gotchas.md / workflows/* 哪里。

### D. 查文档（不生成代码）

触发关键字：**"e-button 怎么用"/"useTableModel 文档"/"ep-data-grid columns"**

执行：

1. 读 `references/docs-index.md`，按关键字找到 `references/docs/<对应分类>/<具体文件>.md`
2. 直接给链接 + 关键 API 摘要，**不要自己凭记忆**

### E. 查模板（"列表页树状表格怎么写"）

执行：

1. 读 `references/examples-index.md`
2. 按"页面类型 + 布局/功能特征"匹配（参考 `references/docs/page-examples/page-template-index.md`）
3. 给出对应 typical/* .vue 路径并展示关键片段

### F. 查坑点 / 排查问题

触发关键字：**"为什么"/"奇怪"/"不正常"**

执行：先读 `references/gotchas.md`（来源：troubleshooting.md + frontpage.md ⚠️ 强制段 + 真实 AAR 沉淀），命中即停。

---

## Auto-Triggers 最高优先级 6 类

完整清单在 frontmatter `auto-triggers:`。**看到以下任一个立即激活**：`ep-data-grid` / `ep-layout-manager` / `ep-form` 标签、`defineDataModel` / `useTableModel` / `useTreeModel` / `useListModel` hook、`@epframe/eui-core` 或 `@epoint-fe/eui-components` import、`eui-cli` 子命令、`vue-docs` / `page-examples` / `typical` 路径、"F10 列表/表单/详情/弹窗" 短语。

---

## Red Flags STOP（违反任意一条立即停下）

| 信号 | 立即处理 |
| --- | --- |
| 用户问 F9 / fui 老框架 | 告知超出范围，指向 `packages/f9/README.md` |
| 用户要求绕过 `defineDataModel` 直连接口 | 拒绝，指向 `rules/data-model-rules.md` |
| 用户要求内联 `<e-dialog v-model:visible>` 写业务弹窗 | 拒绝，指向 `references/docs/dialog-interaction.md` § 5 |
| 30 秒还没给用户任何输出 | 立即报当前状态（"在跑 pnpm install"） |
| 任务"完成"了但没跑 AAR | 必须跑完 `workflows/update-rules.md` 30 秒 4 问 |
| 看到`vue-docs-for-ai-main` 想删 | STOP，那是 skill references 的源数据 |

---

## Phase 三阶段总指挥

详见 `workflows/00-orchestrator.md`。简版：**Phase 1 环境层**（`env/00-detect.md` 5 项体检，缺失才跑 01~05）→ **Phase 2 工程层**（`project/00-detect.md`，已在 monorepo 直接跳过到 page 层）→ **Phase 3 页面层**（`page/01~06` 全跑）→ **闭环**（`workflows/update-rules.md` AAR 30 秒 4 问）。

---

## 文件结构

| 路径 | 作用 |
| --- | --- |
| `rules/*.md` | 长期约束（5 份，每条带 ✓ 检验句） |
| `workflows/00-orchestrator.md` | 总指挥状态机 |
| `workflows/env/*.md` | 环境层 6 个流程（00 检测 + 01~05 修复） |
| `workflows/project/*.md` | 工程层 7 个流程（00 检测 + 01~06 链路） |
| `workflows/page/*.md` | 页面层 6 个流程（01~06 生成链路） |
| `workflows/fix-bug.md` | 修 bug |
| `workflows/update-rules.md` | ★ AAR + Rationalizations + Red Flags 合并 |
| `references/docs-index.md` | 198 篇 .md 索引（任务关键字 → 路径） |
| `references/examples-index.md` | typical/* .vue 索引（场景 → 路径） |
| `references/gotchas.md` | 真实坑点（来源严限） |
| `references/docs/` | vue-docs/ 镜像（含 page-examples） |
| `templates/*.tmpl` | 仅结构骨架（5 份：data-model/mock/route） |
| `scripts/*.mjs` | 跨平台脚本（sync / smoke / validate） |
| `bin/cli.mjs` | npx 入口（init / check / update / sync / smoke / validate） |
| `installer/stubs/*.md` | IDE 入口模板（3 份，仅 `npx init` 时使用） |
| `package.json` | npm 发布元数据 |

---

## 多 IDE 入口（由 `npx ... init` 在用户工程生成）

- `.cursor/skills/epoint-f10code-gen/SKILL.md` (Cursor)
- `.claude/skills/epoint-f10code-gen/SKILL.md` (Claude Code)
- `.windsurf/rules/epoint-f10code-gen.md` (Windsurf)

这 3 个文件不在本 skill 源仓库里追踪（已 .gitignore），是 `npx epoint-f10code-gen init` 在用户工程根根据检测到的 IDE 环境动态生成的路标。安装指南见 `USAGE.md`。

---

_skill 自身规则的修改 / 错误记录 / 新坑点沉淀，全走 `workflows/update-rules.md`。_
