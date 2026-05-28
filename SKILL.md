---
name: epoint-f10code-gen
description: epoint F10 / EUI Vue 页面代码生成 skill。用于 F10 框架、EUI / EUI4.0 / EUI4、EUI Vue、eui-cli 相关任务。
when-to-use: 用户描述需要生成 / 修改 / 排查 epoint F10 / EUI 框架页面、组件、mock、接口文档、路由、工程的任务。包括环境准备、工程创建、页面生成、bug 修复、规则更新。
primary: true
auto-triggers:
  - F10
  - F10 框架
  - epoint F10
  - EUI
  - EUI4.0
  - EUI4
  - EUI Vue
  - eui-cli
red-flags-stop:
  - 用户问 F9 / packages/f9 / fui 老框架问题 → 立即停下，告知超出 F10 范围，回到 F9 文档
  - 用户要求"先帮我把 vue-docs-for-ai-main 删了" → STOP，这是 skill 数据源
  - 用户要求"直接 import 一个 .vue 弹窗用 v-model:visible" → STOP，违反弹窗强制规范，必须 $dialog API + 独立 .vue
  - 用户要求"表格用 ref([]) + Utils.requestAxios 直接调接口" → STOP，违反数据模型强制规范，表格/下拉/树必须用 useTableModel/useListModel/useTreeModel
  - (v0.3) 用户要求把页面/路由/mock 写到 Web 工程（demo-web / web-show） → STOP，违反 R11，指向组件工程
  - (v0.3) project/00-detect.md 产出的 component_package 为空 → STOP，重跑分层扫描
  - (v0.3) 路由写到 routes.js 而不是 static.js 的 MENU_ROUTES → STOP，修正
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

无论什么 F10 任务，开始前必读以下 **5** 个文件（v0.3 增 2 份框架文档）：

| 路径 | 作用 |
| --- | --- |
| `rules/project-rules.md` | F10 仓库通用约定（R1~**R11**，特别是 R11 业务分层约束） |
| `rules/data-model-rules.md` | ★ 数据模型强制（表格/下拉/树必须用 defineDataModel） |
| `rules/component-usage-rules.md` | ep-* 与 e-* 组件边界、$dialog 强制 |
| `references/docs/getting-started/getting-started-write-page.md` | ★ **页面编写位置**：业务页面只能在组件工程写，不能在 Web 工程写 |
| `references/docs/guides/guides-base-component-system.md` | ★ **组件化体系**：Web 工程 vs 组件工程 职责划分 |

不读 = 必出错（常见错误：把页面写到了 Web 工程里）。

---

## Common Tasks 路由表

> 用户说什么 → 你读什么 → 跑什么 workflow

### A. 生成新页面（最高频任务 · v0.3 默认跳过环境体检）

触发关键字：**"生成"/"做一个"/"我要"/"帮我创建" + 列表/表单/详情/弹窗/树**

执行步骤（**严格按序**，v0.3 调整顺序）：

1. 读 `workflows/00-orchestrator.md` 确定当前 Phase
2. **默认从工程层入口**：跑 `workflows/project/00-detect.md` · **分层扫描** → 识别出 Web 工程 + 组件工程 → 让用户确认目标组件工程
3. **环境层按需触发**：默认不跑 `env/00-detect.md`；仅在用户显式要求 / 后续命令失败时自动回流修复
4. **页面层**（全部产出到 `component_package`，违反 = 触发 R11）：
   - `workflows/page/01-confirm-intent.md` · **输入类型分流确认**（4 种：T1 简短文字 / T2 详细文字 / T3 文档图像 / T4 结构化）
   - `workflows/page/02-match-template.md` · 匹配 `references/examples-index.md` 中的 typical/* 模板
   - `workflows/page/03-generate.md` · 生成 `.vue` + 数据模型 → 写到 `<component_package>/src/views/`
   - `workflows/page/04-mock.md` · **默认业务定向 mock 中间件** → 写 mock 到 `<component_package>/mock/`，仅拦截 `/api/<module>/`
   - `workflows/page/05-route.md` · 配静态路由 → 写到 `<component_package>/src/router/static.js` 的 **MENU_ROUTES** 数组（不是 routes.js）
   - `workflows/page/07-api-doc.md` · 根据 `generated_urls` + mock + `intent.fields` 生成 Markdown + JSON 接口文档
   - `workflows/page/06-verify.md` · 浏览器验证 + 截图
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

触发关键字：**"e-button 怎么用"/"useTableModel 文档"/"ep-data-grid columns"/"EUI4.0 样式"/"eui4 css vars"**

执行：

1. 读 `references/docs-index.md`，按关键字找到 `references/docs/<对应分类>/<具体文件>.md`
2. EUI4 样式 / CSS 变量优先读 `references/docs/common/ai/eui4-utility-classes.md` 与 `references/docs/common/ai/eui4-css-vars.md`
3. 直接给链接 + 关键 API 摘要，**不要自己凭记忆**

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

完整清单在 frontmatter `auto-triggers:`。**触发层只保留领域入口**：`F10` / `F10 框架` / `epoint F10` / `EUI` / `EUI4.0` / `EUI4` / `EUI Vue` / `eui-cli`。

触发后再由上面的 Common Tasks 路由表处理组件、Hook、模板、mock、接口文档、业务页面等细节，避免把 metadata 维护成关键字堆。

---

## Red Flags STOP（违反任意一条立即停下）

| 信号 | 立即处理 |
| --- | --- |
| 用户问 F9 / fui 老框架 | 告知超出范围，指向 `packages/f9/README.md` |
| 用户要求绕过 `defineDataModel` 直连接口 | 拒绝，指向 `rules/data-model-rules.md` |
| 用户要求内联 `<e-dialog v-model:visible>` 写业务弹窗 | 拒绝，指向 `references/docs/dialog-interaction.md` § 5 |
| **(v0.3)** 用户要求把页面/路由/mock 写进 Web 工程 | **拒绝**，违反 R11，指向 `getting-started-write-page.md` + `guides-base-component-system.md`，要求重选组件工程 |
| **(v0.3)** project/00-detect.md 产出的 `component_package` 为空 | STOP，重跑分层扫描或让用户手动指定 |
| **(v0.3)** 路由写到 `routes.js`（错误名）而不是 `static.js` | STOP，修正为 `static.js` 的 `MENU_ROUTES` 数组 |
| 30 秒还没给用户任何输出 | 立即报当前状态（"在跑 pnpm install"） |
| 任务"完成"了但没跑 AAR | 必须跑完 `workflows/update-rules.md` 30 秒 4 问 |
| 看到`vue-docs-for-ai-main` 想删 | STOP，那是 skill references 的源数据 |

---

## Phase 三阶段总指挥（v0.3 · 按需触发体检版）

详见 `workflows/00-orchestrator.md`。简版：
- **默认入口 · Phase 2 工程层**（`project/00-detect.md` · 分层扫描 → 识别 Web 工程 + 组件工程 → 确认目标组件工程）
- **Phase 3 页面层**（`page/01~07` 全跑，全部产出到组件工程）
- **Phase 1 环境层**（按需触发，默认跳过；仅在用户显式要求 / 命令执行失败时自动回流）
- **闭环**（`workflows/update-rules.md` AAR 30 秒 4 问）。

---

## 文件结构 / 多 IDE 入口 / 详细文档

- 文件结构、各 workflow 简介、scripts、templates → 看 `CHANGELOG.md` § v0.1.0 P0 MVP 段
- 多 IDE 入口（`.cursor/.claude/.windsurf`） → 由 `npx epoint-f10code-gen init` 动态生成，详见 `USAGE.md`
- skill 自身规则的修改 / 错误记录 / 新坑点沉淀 → 全走 `workflows/update-rules.md`
