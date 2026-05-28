# project-rules · F10 仓库通用约定

> **每条规则后跟 ✓ 检验句**，写完代码后必须逐条自检。
> 来源：项目根 `CLAUDE.md` + `vue-docs/getting-started/getting-started-development-environment.md` + `package.json`。

---

## R1 · Node / pnpm 版本

- Node.js **22.21.1**（项目 `engines.node` 要求 `^22.0.0`，框架推荐 22.21.1）
- 包管理器**必须**用 `pnpm@10.15.0`（`packageManager` 字段已锁定）
- **禁止**使用 npm / yarn 安装本仓库依赖（破坏 lockfile）

✓ 检验句：跑 `node -v && pnpm -v` 两个版本都对得上才算过。

---

## R2 · 私有源 epoint

- 仓库依赖来自公司 nexus：`http://192.168.0.99:8081/nexus/repository/npmpublic/`
- 用 `nrm` 切到 `epoint` 源（不能直接 `npm config set registry`）
- 第一次需要 `npm login`（用户名 `epointfe` / 密码 `11111`）

✓ 检验句：`nrm current` 输出 `epoint` 才算过。

---

## R3 · pnpm workspace

- 仓库是 **pnpm workspaces monorepo**，根 `pnpm-workspace.yaml` 已配置：`docs`、`shared`、`packages/*`（排除 `f9/frame/fui` 与 `server`）
- **始终在仓库根执行 `pnpm install`**（不要进子目录单独 `npm install`，会破坏链接）
- 子包之间用 `workspace:*` 协议引用（如 `@demo-live/shared`）

✓ 检验句：依赖装完后 `pnpm -r ls --depth -1` 不报"no matching"才算过。

---

## R4 · 子包 README 优先

- 修改 `packages/<name>` 之前**必须先读** `packages/<name>/README.md`（项目根 CLAUDE.md 第一准则）
- F10 主体在 `packages/web-show` 与 `packages/examples`
- `packages/f9` 是**老框架**，不在 F10 范围内（Red Flag）

✓ 检验句：你能在 1 分钟内说出该子包的"架构 / 命令 / 约束"三件事，且引用了 README 原文。

---

## R5 · Commit message 格式

- 格式：`type(scope): summary`
- **types**：`fix` / `feat` / `perf` / `docs` / `style` / `refactor` / `test` / `chore`
- **scopes**：`docs` / `examples` / `admin-components` / `site-tools` / `f9` / `web` / `server` / `shared`
- summary 用**中文**，单行 ≤72 字符
- 多变更在空行后加 bullet 列表

示例：
```
feat(examples): 新增标段(包)管理列表页

- 列表 + 树 + 三弹窗
- mock 走 page-examples mock-server 协议
```

✓ 检验句：commit 跑 git pre-commit hook 不被拦截才算过。

---

## R6 · F10 vs F9 边界

| 标志 | 范围 | 处置 |
| --- | --- | --- |
| `@epframe/eui-core` / `@epoint-fe/eui-components` import | F10 | 走本 skill |
| `packages/web-show` / `packages/examples` 路径 | F10 | 走本 skill |
| `fui` 前缀 / `packages/f9` / `f9/frame/fui` | **F9（不在范围）** | **STOP**，告知用户超出 F10 范围 |
| `pnpm start:f9` 命令 | F9 | 同上 |

✓ 检验句：你的产出**不含** `fui-` 前缀、**不引** `packages/f9`，才算合规。

---

## R7 · 启动命令清单（不要凭记忆瞎写）

来源：项目根 `package.json:scripts`。

| 我想… | 跑什么 |
| --- | --- |
| 装依赖 | `pnpm install` |
| 启动文档站 | `pnpm docs:dev` |
| 启动主 web 应用（F10 演示） | `pnpm dev` |
| 启动 examples（组件示例） | `pnpm -C packages/examples run dev` |
| 启动 server（NestJS mock） | `pnpm -C packages/server run start:dev` |
| 启动 f9 老框架 | `pnpm start:f9` ⚠️ Red Flag |
| 构建文档 | `pnpm docs:build` |
| 全量构建 demo | `pnpm build:demo` |

✓ 检验句：所有命令都能在 `package.json` 找到对应 script，**不允许凭记忆造一条不存在的命令**。

---

## R8 · 代码注释强制

- TypeScript / JavaScript **方法必须有 JSDoc**（来源：`.claude.md` 编码守则 + 项目根 CLAUDE.md "Documentation"）
- 函数注释包含：作用 / 参数 / 返回值 / 关键边界条件
- **禁止**仅写 `// 处理函数` 这种空注释

✓ 检验句：随机抽你写的 3 个 function，每一个都有 JSDoc 头才算过。

---

## R9 · 不动用户文件除非被要求

- 不要修改用户的 `CLAUDE.md` / `AGENTS.md` / `.cursor/rules/`，**除非**用户明确说"改 xxx"
- skill 部署到 `.cursor/` `.claude/` `.windsurf/` 时**必须只新增不修改**已有文件
- 任何改动 commit 前给用户看 diff 确认

✓ 检验句：`git diff` 命令运行后，**没有意外的修改文件出现**才算过。

---

## R10 · 两份 frontpage / docs 数据源关系

- 真正的源是 `packages/examples/src/views/demo/page/`（生产实际跑的）
- `vue-docs-for-ai-main/vue-docs/` 是**为 AI 优化的快照**（含 page-examples 镜像 + 198 篇规范 .md）
- skill 内 `references/docs/` 是上面这份的**整体 copy**（一次性 sync）
- 出现差异时**以 vue-docs 为准**（因为是规范化版本）

✓ 检验句：你引用模板时给的路径在 `references/docs/page-examples/` 下能找到才算过。

---

## R11 · ★ 业务开发分层约束（Web 工程 vs 组件工程）

**来源**：`references/docs/getting-started/getting-started-write-page.md` + `references/docs/guides/guides-base-component-system.md` 框架两份核心文档明确规定。

### 规则

F10 组件化架构下，工程分两层，**职责严格分离**：

| 层级 | 角色 | 职责 | 写哪些代码 |
| --- | --- | --- | --- |
| **Web 工程**（启动入口） | `demo-web` / `web-show` / `web-eva-plus` | 启动应用、整合组件包、全局配置、主题、构建部署 | **只**写 `setup.js` 引用组件包、`vite.config.js` 构建配置、`config.js` 全局参数 |
| **组件工程**（业务开发） | `demo-view` / `examples` / `admin-components` / `xxx-views` | 业务页面、业务组件、路由、mock、业务 i18n | **所有** `.vue` 业务页面、`router/static.js` 业务路由、`mock/*.mock.ts`、业务组件、业务工具方法 |

### 强制约束

- ❌ **禁止**在 Web 工程的 `src/views/` 下创建任何**业务**页面
- ❌ **禁止**在 Web 工程的 `src/router/static.js` 中追加任何**业务**路由（保留为骨架/空数组）
- ❌ **禁止**在 Web 工程的 `mock/` 下写业务 mock 接口
- ✅ **业务页面** → 组件工程 `src/views/<module>/<appName>/<appName>-list.vue`
- ✅ **业务路由** → 组件工程 `src/router/static.js` 的 `MENU_ROUTES`（有授权）/ `ROOT_ROUTES`（无授权）数组
- ✅ **业务 mock** → 组件工程 `mock/<module>/<appName>.mock.ts`（且 `package.json.exports` 暴露 `"./mock"`）
- ✅ **mock 接入中间件** → 可写 Web 工程 `build/<module>-mock.middleware.mjs`，但只能作为 Vite 接入层，业务接口定义仍以组件工程 mock / generated_urls 为来源

### 识别 Web 工程 / 组件工程的特征签名

**Web 工程**（命中 ≥ 2 项 = 是 Web 工程）：
- `src/main.js` 存在（最强信号，组件包不会有 main.js）
- `package.json` 的 `dependencies` 列了 `@epframe/eui-core`
- `package.json` 的 `dependencies` 含**多个** `workspace:*` 包引用
- `src/setup.js` 内含 `deps: [...]` 数组引入其他组件包
- `vite.config.js` 中有 `extWebPlugin` / 启动模式相关插件

**组件工程**（命中 ≥ 2 项 = 是组件工程）：
- `src/index.js` 存在并 `export { setup }`
- `package.json` 的 `peerDependencies`（不是 dependencies）列 `@epframe/eui-core`
- `src/router/static.js` 存在且**以 `ROOT_ROUTES`/`MENU_ROUTES` 形式导出**
- `package.json` 含 `"exports": { ".": {...}, "./style.css": ... }` 库模式
- `vite.config.js` 含 `build.lib: { entry: 'src/index.js' }` 库构建配置
- **被某个 Web 工程的 `src/setup.js` 中 import**（最强信号，需要反向扫）

✓ 检验句：
- [ ] 任何生成的 `.vue` 业务页面，绝对路径里**不出现** Web 工程目录名（如 `web-show` / `demo-web`）
- [ ] 任何生成的路由记录，写入的是**组件工程**的 `src/router/static.js`
- [ ] 任何生成的 mock 文件，落在**组件工程**的 `mock/` 目录下
- [ ] 如生成 Web 工程 mock 中间件，它只拦截 `/api/<module>/` 并放行框架端点
- [ ] 写完后，用 `grep -r "<新生成的 appName>" packages/<web 工程>/src/` 应返回 **0 行**

---

_R1~R11 都没满足？跑 `workflows/update-rules.md` 看是规则缺失还是过时。_
