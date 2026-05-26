# CHANGELOG · epoint-f10code-gen

> skill 自身的版本演进记录。**所有修改必须先跑 `workflows/update-rules.md` 的 AAR 闭环再进来**。

---

## v0.2.0 · 2026-05-26 · npx 化改造

### 重大变更（Breaking Changes）

- **去除"薄壳层"概念**：源仓库不再追踪 `.cursor/.claude/.windsurf/` 部署产物，改为由 `npx epoint-f10code-gen init` 在用户工程动态生成
- **`shells/` 重命名为 `installer/stubs/`**：明确这是"安装钩子模板"而不是"主体的一层"
- **删除 `scripts/deploy-shells.mjs`**：功能合并到新的 `bin/cli.mjs`

### 新增 (Added)

- **`bin/cli.mjs` · npx 入口**，子命令：
  - `init` 自动检测目标工程 IDE → 复制主体 + 安装入口（默认）
  - `check` 校验已装入口与本包模板是否一致
  - `update` 重新同步主体（保留 IDE 入口不动）
  - `smoke` 跑 skill 自身健康检查
  - `validate <vue-file>` 校验生成的 .vue 是否合规
  - `sync` 同步 vue-docs → references/docs/
- **`package.json`**：定义 `name` / `version` / `bin` / `files` 字段，可 `npm publish` + `npx <name>` 直接用
- **`installer/stubs/README.md`**：重写为"安装钩子模板"叙事
- **仓库 `.gitignore` 加规则**：屏蔽 `.cursor/skills/epoint-f10code-gen/` / `.claude/skills/epoint-f10code-gen/` / `.windsurf/rules/epoint-f10code-gen.md`，避免源仓库与"安装产物"混淆

### 设计决策

- **包名占位**：当前 `package.json` 的 `name` 设为 `epoint-f10code-gen`（无 scope）。发布到 nexus 时可改为 `@epoint/f10code-gen` 或 `@epframe/f10code-gen` 自适应私有源策略
- **主体复制 vs node_modules 引用**：选**复制到 `<user-project>/epoint-f10code-gen/`**，原因：AI 读 `epoint-f10code-gen/SKILL.md` 比读 `node_modules/.../SKILL.md` 自然，用户也能 commit 进自己工程
- **IDE 自动检测**：`init` 默认只为用户工程下**已存在**的 `.cursor/.claude/.windsurf` 目录安装入口；用 `--ide all` 可强制全装
- **smoke-test 第 10/11 项重构**：从"检查 .cursor/.claude/.windsurf 是否已部署"改为"检查 `installer/stubs/` 三份模板 + `bin/cli.mjs` + `package.json` 元数据"

### 升级路径

老用户跑：

```bash
# 1. 升级 skill 主体 + IDE 入口
npx epoint-f10code-gen@latest init

# 或仅升级主体不动 IDE 入口
npx epoint-f10code-gen@latest update
```

---

## v0.1.0 · 2026-01-15 · P0 MVP

### 新增 (Added)

#### 主体
- `README.md` 零基础用户入口（5 秒上手指南）
- `SKILL.md` 路由中心（含 frontmatter / Auto-Triggers / Red Flags / Common Tasks 路由表）
- `ANTI-TEMPLATES.md` 故意不预制清单 + Drift Log
- `CHANGELOG.md` 版本演进（本文件）

#### rules/（长期约束 5 份）
- `rules/project-rules.md` F10 仓库通用约定（pnpm/Node 版本/commit）
- `rules/coding-standards.md` Composition API + Vue 3
- `rules/data-model-rules.md` ★ defineDataModel 强制
- `rules/component-usage-rules.md` ep-* 与 e-* 边界 + $dialog 强制
- `rules/style-rules.md` 辅助类优先

#### workflows/（步骤流程）
- `workflows/00-orchestrator.md` ★ 总指挥状态机（Phase 1/2/3 + 自动跳过）
- `workflows/env/{00-detect,01-node,02-pnpm,03-source,04-login,05-eui-cli}.md` 6 份环境层流程（A/B/C 三档代劳）
- `workflows/project/{00-detect,01-workspace,02-web,03-component,04-register,05-install-build,06-run-dev}.md` 7 份工程层流程
- `workflows/page/{01-confirm-intent,02-match-template,03-generate,04-mock,05-route,06-verify}.md` 6 份页面层流程
- `workflows/fix-bug.md` 修 bug 流程（先查 gotchas 再走根因）
- `workflows/update-rules.md` ★ 合并 AAR + Rationalizations + Red Flags + 记录位置判断表

#### references/（内嵌知识库）
- `references/docs-index.md` 198 篇 .md 索引（任务关键字 → 路径）
- `references/examples-index.md` typical/* .vue 索引（场景 → 路径）
- `references/gotchas.md` 真实坑点（来源严限：troubleshooting.md + frontpage.md ⚠️ 强制段）
- `references/docs/` 整体 copy from `vue-docs-for-ai-main/vue-docs/`（含 page-examples 镜像）

#### templates/（仅结构骨架）
- `templates/data-model/list-model.js.tmpl`
- `templates/data-model/form-model.js.tmpl`
- `templates/mock/crud.mock.ts.tmpl`
- `templates/mock/tree-list.mock.ts.tmpl`
- `templates/route/static-route.js.tmpl`

#### scripts/（跨平台 .mjs）
- `scripts/sync-from-docs.mjs` 一次性 sync vue-docs → references/docs/
- `scripts/smoke-test.mjs` SKILL.md / 路由 / 占位符残留 / 跨工具入口检查
- `scripts/validate-page.mjs` 生成的 .vue 合规检查
- `scripts/deploy-shells.mjs` 把 shells/* 部署到 .cursor/.claude/.windsurf（含 --dry-run / --check / --force / --target）

#### shells/（跨工具薄壳源）
- `shells/cursor-skill.md` → 部署到 `.cursor/skills/epoint-f10code-gen/SKILL.md`
- `shells/claude-skill.md` → 部署到 `.claude/skills/epoint-f10code-gen/SKILL.md`
- `shells/windsurf-rule.md` → 部署到 `.windsurf/rules/epoint-f10code-gen.md`
- `shells/README.md` 薄壳设计原则 + 部署/检查命令

### 设计决策

- **数据源去重**：references/ 只整体 copy `vue-docs-for-ai-main/vue-docs/`（含 page-examples 镜像），不再单独 copy `packages/examples/src/views/`（节省 ~4000 行重复内容）
- **examples 包内零成本演示**：当前仓库已在 monorepo 内 → 默认 5 秒走 demo 模式；不在工作区 → 走完整 eui-cli ws/web/comp 链路
- **建新入口不追加原文**：3 个跨工具入口完全独立，不动现有 CLAUDE.md / AGENTS.md 一行
- **薄壳 body 字字一致**：3 个 IDE 薄壳只在 frontmatter 适配不同协议，body 完全一致（auto-triggers / red-flags / 路径速查），由 `deploy-shells.mjs --check` 校验
- **占位符自检防自咬**：`smoke-test.mjs` 用 `'<' + 'FILL' + ':'` 构造占位符标记，避免脚本自己被自己扫到
- **MVP 验收 prompt**：『标段(包)管理列表+树+三弹窗』

### MVP 端到端自检（阶段 10）

✓ smoke-test 全部 pass（10/10 检查项）
✓ deploy-shells --check 三个薄壳与源完全一致
✓ validate-page 在 reference `base/list.vue` 上完全合规
✓ MVP prompt "列表+树+三弹窗" 在 `references/examples-index.md` 第 265 行有显式映射
✓ 5 个 MVP 参考模板（`base/side-tree-list.vue` + `base/add.vue` + `base/edit.vue` + `base/detail.vue` + `typical/list/navigation/side-tree.vue`）全部存在于 `references/docs/page-examples/`
✓ `workflows/page/02-match-template.md` 第 75 行 "列表 + 树 + 弹窗" 行直接给出 5 个模板的组合方案
✓ `workflows/update-rules.md` AAR 30 秒 4 问协议完整定义

### 待办（P1+）

- [ ] SessionStart hook（自动注入 SKILL.md 到 Memory）
- [ ] test-trigger.sh（Cursor description 命中率测试）
- [ ] glossary.md 术语表
- [ ] 多产线 nexus 配置自适应（不同产品线私有源地址）
- [ ] 审批流页面专项支持（基于 epoint-workflow-vue）
- [ ] 真实 fresh-session MVP 端到端跑（fresh 上下文，prompt "标段管理列表+树+三弹窗"，期望 12 步全过）

---

_所有版本演进必须经过 AAR 闭环再合入。_
