# CHANGELOG · epoint-f10code-gen

> skill 自身的版本演进记录。**所有修改必须先跑 `workflows/update-rules.md` 的 AAR 闭环再进来**。

---

## v0.4.2 · 2026-05-28 · 接口文档明细化

### 背景

真实 IPD 套件生成后反馈：接口文档只有总览，缺少逐接口请求字段、响应字段和示例；`.api.json` 也只保留 `method/url/name`，无法支撑后端联调。

### 修改 (Changed)

- **接口文档契约升级**：`workflows/page/07-api-doc.md` 增加 single / suite 模式；多页面、多 mock、多 baseUrl 时必须按模块分章
- **逐接口 schema 强制化**：每个接口必须产出 `request.fields`、`request.example`、`response.fields`、`response.example`、`fieldSources`
- **接口分类扩展**：补充 `/detail`、`/data`、`*List`、`*Detail`、`add*`、`update*`、`/*Options`、`/common/*Options` 等业务接口形态
- **`gen-api-doc` CLI 增强**：支持 `<mock-file|mock-dir>`；新增 `--config <file>` 读取 `MODULE_CONFIGS` / `ACTION_FORM_CONFIGS`；新增 `--api-prefix <path>` 过滤业务接口
- **模板升级**：Markdown 从总览文档改为逐接口详情；JSON 从 `requestSchema/responseSchema` 改为实际 request / response 对象
- **回归样例**：新增 `ipd-lite` suite fixture，覆盖公共 options、dashboard data、stageDetail、action form 和框架端点过滤

### 验证

- ✓ `node --check scripts/gen-api-doc.mjs`
- ✓ `node --check scripts/smoke-test.mjs`
- ✓ `node --check bin/cli.mjs`
- ✓ `node scripts/__test-fixtures__/run-regression.sh` → 10 pass / 0 fail
- ✓ `node scripts/smoke-test.mjs`
- ✓ `node bin/cli.mjs smoke`

---

## v0.4.1 · 2026-05-28 · 触发描述瘦身

### 背景

用户反馈 `description` / `auto-triggers` 已堆叠过多组件、Hook、业务词、模板词和接口文档词，触发描述变重且容易漂移。

### 修改 (Changed)

- **触发层收敛**：`SKILL.md` frontmatter 只保留 `F10` / `F10 框架` / `epoint F10` / `EUI` / `EUI4.0` / `EUI4` / `EUI Vue` / `eui-cli`
- **IDE 入口同步精简**：Cursor / Claude Code / Windsurf 入口的描述和 Auto-Triggers 摘要改为 `F10` / `EUI` / `eui-cli` 三类
- **smoke 检查调整**：`scripts/smoke-test.mjs` 改为检查 `description` / `auto-triggers` 核心触发词，并确保组件、Hook、业务词、模板词不再留在触发描述层

### 设计决策

- 组件名、Hook、业务术语、模板路径、接口文档等细节仍保留在正文 rules / workflows / gotchas 中；触发后由 Common Tasks 路由表处理
- `eui-cli` 继续保留为触发词，因为它是 F10/EUI 工程创建与环境流程入口

### 验证

- 待跑：`node --check scripts/smoke-test.mjs`
- 待跑：`node scripts/smoke-test.mjs`

---

## v0.4.0 · 2026-05-28 · 真实 AAR 闭环补强 + 用户反馈二次迭代

### 背景

真实落地反馈暴露 4 类问题：
1. Dashboard 页面绕过 `defineDataModel`，模板引用 `model.global` 导致白屏
2. `mockServerPlugin` 全前缀接管后误拦 F10 框架端点，未匹配 handler 返回 404
3. 手写框架端点 mock 缺字段，主题 / 菜单解析失败
4. 业务 mock 中间件只按 JSON 解析请求体，遇到 F10 form-encoded 请求失败

用户在 v0.4 首版上线后反馈：
- EUI4.0 触发词覆盖不全（缺 `EUI 4.0`/`eui-4`/`eui4` 等变体），实际场景里多次错过激活
- 真实 AAR 暴露的坑点应当上升为 skill 通用约束，不仅仅是 dashboard 专属
- 缺少独立的"根据 mock 反推接口文档"CLI，老项目无法直接享受新功能

### 新增 (Added)

- **EUI4.0 触发词**：`SKILL.md` + 3 个 IDE 入口模板补全 9+ 变体：`EUI4.0` / `EUI 4.0` / `EUI4` / `EUI 4` / `eui 4` / `eui-4` / `eui-4.0` / `eui4` / `EUI Vue` / `defineFrameModel` / `eui4 utility classes` / `eui4 css vars`
- **接口文档工作流**：新增 `workflows/page/07-api-doc.md`，in-flow 模式根据 `generated_urls` + mock + `intent.fields` 生成 Markdown + JSON
- **`gen-api-doc` 独立 CLI**：新增 `bin/cli.mjs gen-api-doc <mock-file>` 子命令 + `scripts/gen-api-doc.mjs`（约 320 行）+ `templates/api-doc/{markdown.md,api.json}.tmpl`，支持对老项目 standalone 反推接口文档
- **业务 mock 中间件模板**：新增 `templates/mock/business-mock.middleware.mjs.tmpl`，内置 JSON + form-encoded 双解
- **字段契约**：`workflows/page/01-confirm-intent.md` 明确 `intent.fields` 推荐结构：`name` / `label` / `type` / `required` / `desc` / `options` / `example`
- **真实坑点沉淀**：`references/gotchas.md` 新增 G013~G015（来源标注"真实 AAR · <场景>"）；G013 补 `defineFrameModel` 等价说明
- **EUI4 文档索引**：`references/docs-index.md` 增加 EUI4 utility classes 与 CSS vars 入口
- **回归 fixtures**：`scripts/__test-fixtures__/` 新增 4 个 .vue（DM-R11 子规则正反例）+ 1 个 .mock.ts（gen-api-doc 端到端样本）

### 修改 (Changed)

- **页面层流程扩展为 7 步**：`00-orchestrator.md` 将流程调整为 `.vue → mock → route → api doc → verify`（07 在 06 之前）
- **Mock 默认策略调整**：`page/04-mock.md` 从"优先接入 `mockServerPlugin`"改为默认"业务定向 Vite 中间件"，仅拦截 `/api/<module>/`
- **数据模型规则升级（用户反馈后二次迭代）**：`rules/data-model-rules.md` R11 从 dashboard 专属约束**扩展为全页面通用约束**，配套 `validate-page.mjs` 4 条静态校验：
  - DM-R11.1 模板 `model.` 引用必须有 `defineDataModel` 或 `defineFrameModel`（`defineFrameModel` 与 `defineDataModel` 等价合法）
  - DM-R11.2 数据模型必须 onMounted + `initData()`（兼容带/不带参数）
  - DM-R11.3 主数据禁止散装 `ref + onMounted + request`（三特征同时命中才报，避免误报局部 UI 状态）
  - DM-R11.4 引用 `model.global.pageConfig.xxx` / `model.pageConfig.xxx` 时必须实例化 `new PageConfig`（基于文档：pageConfig 是可选项，仅引用时才校验）
- **Web/组件边界补充**：`rules/project-rules.md` 明确 Web 工程可放 mock 接入中间件，但业务 mock 定义仍属于组件工程
- **页面校验加固为强制 gate**：`scripts/validate-page.mjs` 整体重写（以 SFC 拆分 + 谓词函数 + 括号配对解析为核心）；`workflows/page/03-generate.md` Step 6.0 把 `validate-page.mjs` 提升为生成完成后的强制 gate（violations > 0 → STOP）
- **smoke 检查增强**：`scripts/smoke-test.mjs` 期望关键词集扩充到 11 个；新增 `[8b] templates/api-doc/`、`[12] v0.4 CLI 子命令`；`walk()` 排除 `__test-fixtures__/`

### 设计决策

- **接口文档双模式**：In-flow（流程内）走 `07-api-doc.md`，输入完整含 intent，质量高；Standalone（CLI）从 mock 静态正则反推，描述标"待后端确认"，可对老项目兜底
- **mock 解析方案**：V1 用静态正则提取 `defineMock([{...}])` 的 url/method + `Array.from(...).map(...)` 内字段名；不真跑 handler，避免 ts/faker 依赖；后续 v0.5 可升级 AST
- **mock 策略**：默认业务定向中间件，而不是全前缀 mock-server 接管。原因是框架端点结构复杂，应继续走宿主 proxy / 官方 mock 服务
- **字段描述**：`desc` 缺失时只生成保守描述并标记"待后端确认"，避免把 AI 推断伪装成业务事实
- **DM-R11.4 触发条件精确化**：旧版"出现 `v-loading="model.global..."` 必须有 `pageConfig`"是错的，因为 `pageConfig` 是 `defineDataModel` 的可选项；新版只在真正读 `model.global.pageConfig.xxx` 时才校验，避免对仅用 `model.global.state.loading` 的页面误报

### 验证

- ✓ `node --check scripts/validate-page.mjs` / `scripts/smoke-test.mjs` / `scripts/gen-api-doc.mjs`
- ✓ `node scripts/smoke-test.mjs` 12 个检查点全 pass
- ✓ `node scripts/validate-page.mjs references/docs/page-examples/base/list.vue` → 完全合规
- ✓ 4 个 fixture 全部按预期：elform-prop（pass，不误报 :model prop）、pos-frame-model（pass，defineFrameModel 等价）、neg-scattered-dashboard（fail：DM-R11.1 + DM-R11.3）、neg-pageconfig-missing（fail：DM-R11.4）
- ✓ `node bin/cli.mjs gen-api-doc scripts/__test-fixtures__/mock/demo/order.mock.ts` → 6 接口 / 8 字段，phone/amount/datetime 类型自动识别正确

### Breaking Changes（升级注意）

- ⚠️ `validate-page.mjs` 从"软提示"升级为"生成强制 gate"：散装 `ref + onMounted + request` + 模板用 `model.` 的写法会直接 fail
- ⚠️ `04-mock.md` 默认策略翻转，新生成页面默认用业务定向中间件；旧项目不影响但建议迁移
- ⚠️ 页面层流程 6 步 → 7 步（07-api-doc.md 是新节点，apiMode == mock 时强制产出）
- ⚠️ `package.json` version 从 0.1.0 升到 0.4.0，对齐 CHANGELOG

### 兼容性

- 老用户跑 `npx epoint-f10code-gen update` 自动升级到 v0.4
- 旧版生成的 .vue 走标准 `defineDataModel` 模式不需要重写
- `defineFrameModel` 与 `defineDataModel` 在所有规则中**等价对待**，老项目用前者无需改
- `gen-api-doc` 是新增独立命令，不影响现有任何流程

---

## v0.3.0 · 2026-05-27 · 架构优化大改造

### 背景

用户反馈 5 个核心痛点（详见 `OPTIMIZATION_PLAN.md`）：
1. 环境体检每次都跑太冗余，开发场景应默认跳过
2. 需求确认缺乏按输入类型分流（文字/文档/结构化）
3. Mock 接入没有探测与一键接入，写完跑不起来
4. **页面写到了 Web 工程而不是组件工程**（违反框架文档明确规定，最严重）
5. 路由没有同步到组件工程的 `static.js`

### 重大变更（Breaking Changes）

- ⚠️ `project_detect_result` 输出契约新增 3 个**强制字段**（`web_package` / `component_package` / `target_view_dir`），缺失会 STOP
- ⚠️ `intent_resolved` 输出契约新增 `input_type` / `component_package` / `target_*` 字段；`intent.fields` 从字符串数组改为对象数组（含 `type` 字段）
- ⚠️ `05-route.md` 写入文件从 `routes.js` 改为 `static.js`，写入位置从顶层 export default 改为 `MENU_ROUTES` 数组（path 不带前导 `/`）
- ⚠️ 默认入口从 Phase 1 环境层 改为 Phase 2 工程层

### 新增 (Added)

- **R11 业务开发分层约束** (`rules/project-rules.md`)：业务页面/路由/mock 必须写在组件工程；含 Web 工程 / 组件工程的 5 项识别签名
- **Monorepo 分层扫描** (`workflows/project/00-detect.md`)：解析 → 打分 → 反向引用 → 综合判定 → 用户确认 6 步法
- **输入类型分流** (`workflows/page/01-confirm-intent.md`)：T1 简短文字 / T2 详细文字 / T3 文档图像 / T4 结构化 4 通道，各自对话脚本独立
- **Mock 接入态探测** (`workflows/page/04-mock.md` Step 0)：三件探测（exports/deps/plugin）+ A/B/C 档一键接入向导
- **字段类型 → Mock.js 模板智能映射表** (`workflows/page/04-mock.md` Step 4)：18 种字段类型对应模板
- **接口一致性校验** (`workflows/page/04-mock.md` Step 7)：.vue URL ↔ .mock.ts URL 双向比对，缺啥自动补
- **R11 合规校验** (`workflows/page/03-generate.md` 写入前 + `05-route.md` Step 7)：强制校验文件路径不在 Web 工程下
- **`generated_urls` 跨步契约** (`workflows/page/03-generate.md` → `04-mock.md`)：03 产出 URL 清单，04 用它做一致性校验
- **环境体检按需触发** (`workflows/00-orchestrator.md` Phase 1)：默认跳过；命令失败自动回流；用户可显式触发

### 修正 (Fixed)

- **路由文件名错误**：`workflows/page/05-route.md` 从 `routes.js` 改为 `static.js`（之前是错的，实际框架文件名）
- **路由数据结构错误**：从顶层 `export default` 改为 `MENU_ROUTES` / `ROOT_ROUTES` 数组追加（之前是错的）
- **MENU_ROUTES path 格式**：明确不带前导 `/`（之前误带）
- **产出路径硬编码**：`workflows/page/03-generate.md` 从硬编码 `packages/examples/src/views/...` 改为 `intent_resolved.target_view_dir` 动态值（兼容用户的 `demo-web + demo-view` 项目）
- **`page/01-confirm-intent.md` 路由模式表**：static 模式描述从 "在 `src/router/routes.js` 写死" 改为 "在【组件工程】`src/router/static.js` 的 MENU_ROUTES/ROOT_ROUTES 数组中追加"

### 设计决策

- **环境体检默认跳过 vs 主动跑**：选默认跳过 + 自动回流。理由：（1）90% 任务用户环境已就绪；（2）命令失败时回流诊断比预先体检更准确；（3）省 10 秒启动时间提升体验
- **分层扫描 vs 用户手工指定**：选自动扫描 + 用户确认。理由：（1）自动扫描覆盖 80% 默认场景；（2）多组件工程时让用户选避免猜错；（3）反向引用是最强信号，能区分被 Web 工程引用的"业务组件包"和被其他组件包引用的"通用组件包"
- **Mock 一键接入 vs 仅给文档**：选 A/B/C 档代劳。理由：（1）`@epframe/vite-plugin-mock-server` 接入步骤跨 3 个文件易出错；（2）A 档自动修复对用户最友好；（3）C 档降级 proxy 是兜底
- **字段类型枚举 vs 自由文本**：选枚举 18 种。理由：（1）枚举可对应 Mock.js 模板自动生成；（2）覆盖业务场景 ≥ 95%；（3）超出枚举的字段降级 `@ctitle`
- **R11 失败 STOP vs warning**：选 STOP。理由：（1）违反 R11 会导致生成结果不可用；（2）用户可能不知道框架文档规定；（3）强制重选比生成出错后返工成本低

### 升级路径

```bash
# 推荐：完整升级
npx epoint-f10code-gen@latest update

# 老用户旧产物如何处理：
# 1. 旧版生成的 .vue 文件无需重写（结构未变），但建议手动检查路径是否在组件工程下
# 2. 旧版的 routes.js（如有）建议手动迁移到 static.js 的 MENU_ROUTES
# 3. mock 文件未接入 mock-server 的工程，新版会自动探测并给一键接入向导
```

### v0.3 验证

- ✓ `npx epoint-f10code-gen smoke`：11 项检查全 pass，skill 健康度满分
- ✓ `node bin/cli.mjs validate references/docs/page-examples/base/list.vue`：合规
- 待办：在用户 `demo-web + demo-view` 真实项目端到端回归（见 OPTIMIZATION_PLAN.md § P1 待办）

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
