# 00-orchestrator · 总指挥状态机

> **本文件是页面生成任务的"总入口"**。Agent 收到生成 / 修改 F10 页面的需求后**第一件事**就是读这里，由本文件决定走哪个 Phase。

---

## 状态机总览（v0.3 · 按需触发体检版）

```
[START]
   │
   ▼
[Phase 2 · 工程层]  project/00-detect.md  →  分层扫描（Web 工程 vs 组件工程）
   │  ├─ 在 monorepo 内（如本仓库）→ 跳到 06-run-dev → Phase 3
   │  ├─ 不在工作区 → 跑 project/01~06 完整链路
   │  └─ 在已存在的 web 工程内 → 跳到 04-register
   │       ↓ 任一步命令失败 (pnpm install / pnpm dev / eui-cli 等)
   │       └→ 触发 [Phase 1 · 环境层] env/00-detect.md 自动诊断 → 修复 → 续跑
   ▼
[Phase 3 · 页面层]
   page/01-confirm-intent.md  →  按输入类型分流（4 种）
   page/02-match-template.md
   page/03-generate.md         →  写入【组件工程】(不是 Web 工程)
   page/04-mock.md             →  默认业务定向 mock 中间件（只拦截 /api/<module>/）
   page/05-route.md            →  写入【组件工程】static.js MENU_ROUTES
   page/07-api-doc.md          →  根据 mock 生成 Markdown + JSON 接口文档
   page/06-verify.md
   │
   ▼
[闭环]  update-rules.md  →  AAR 30 秒 4 问
   │
   ▼
[END]

[Phase 1 · 环境层]  (默认不主动跑，只在以下场景触发)
  ① 用户显式要求"先做环境体检"
  ② 命令执行失败 (ENOENT / command not found / 404 私有源等)
  ③ project/00-detect.md 探测到关键依赖缺失
```

---

## 启动协议（每次任务）

### Step 0 · 重新读 SKILL.md + 框架核心 5 件套

**不论你"记得不记得"**：

1. 读 `epoint-f10code-gen/SKILL.md` 完整内容
2. **Always Read 五件套**（不读 = 必出错）：
   - `rules/project-rules.md`（R1~R11，**特别是 R11 业务分层约束**）
   - `rules/data-model-rules.md`（数据模型强制）
   - `rules/component-usage-rules.md`（ep-/e- 边界 + $dialog）
   - `references/docs/getting-started/getting-started-write-page.md`（页面编写位置：组件工程，不是 Web 工程）
   - `references/docs/guides/guides-base-component-system.md`（组件化体系：分层约束）

不读 = 必出错（stale memory + 把页面写到 Web 工程的常见错误）。

### Step 1 · 给用户当前状态简报（30 秒以内）

输出格式（**默认版**，跳过环境体检）：

```
我准备帮你生成 F10 页面，3 步搞定：
1. 工程定位（识别 Web 工程 + 组件工程，约 3 秒）
2. 需求确认（按你给的描述类型分流：简短文字 / 详细文字 / 文档 / 结构化）
3. 生成 .vue + mock + 路由 + 接口文档（产出到【组件工程】）

环境体检已默认跳过（命令报错会自动回流诊断）；如你想先做体检，回复"先体检"。

开始工程定位...（进入 Phase 2）
```

**禁止**：30 秒不给用户任何输出（违反 SKILL.md Red Flags）。

---

## Phase 1 · 环境层（按需触发，默认跳过）

**新策略（v0.3）**：环境体检**不再默认主动执行**，只在以下三种场景触发：

### 触发场景

| # | 触发条件 | 处置 |
| --- | --- | --- |
| ① | 用户显式说 "先做环境体检" / "check env" / "环境检查" | 立刻进 `env/00-detect.md` 全量 5 项体检 |
| ② | 后续任意命令执行失败：`pnpm install` 报 ENOENT、`pnpm dev` 报 cannot find module、`eui-cli` 报 command not found、`npm install` 报 401/403（私有源未登录） | **自动**回流到 `env/00-detect.md`，定位失败项并按 A/B/C 档修复，修完**自动续跑**原命令 |
| ③ | `project/00-detect.md` 探测到关键依赖（Node / pnpm / eui-cli / nrm）二进制不存在 | 同 ② |

### 自动回流伪代码

```
try:
  run_command("pnpm install")
except CommandFailed as e:
  if matches(e.output, ["ENOENT", "command not found", "E401", "E403", "version mismatch"]):
    notify_user("检测到环境问题，回流到环境层诊断...")
    run("workflows/env/00-detect.md")  # 自动诊断 + 修复
    run_command("pnpm install")  # 自动续跑
  else:
    raise  # 非环境类错误，往上抛
```

### 触发文件

`workflows/env/00-detect.md`（详见该文件 5 项体检规范）

### 中断条件

- C 档（Node 缺）用户没安装 → STOP，等用户装好回来
- 用户回复"我自己装" → 输出待装清单 + 进 Phase 2（带 warning）

### 显式跳过

用户说 "不要做环境体检" / "我环境是好的" → **直接进 Phase 2**，但在后续命令失败时仍然回流（这是安全网，无法关闭）。

---

## Phase 2 · 工程层（默认入口）

**目的**：定位代码该写在哪个工程的哪个目录。
**新版重点**：在 monorepo 内必须**分层扫描**，识别出「Web 工程」和「组件工程」，把生成位置锁定到**组件工程**（违反 = 触发 R11）。

### 触发文件

`workflows/project/00-detect.md`

### 三种分支

| 当前位置 | 走法 | 耗时 |
| --- | --- | --- |
| **A. 已在 monorepo 内**（pwd 含 `pnpm-workspace.yaml` 在祖先目录） | **分层扫描** → 识别 Web 工程 + 组件工程 → 让用户确认目标组件工程 → 跳到 `06-run-dev.md` 启动 Web 工程 → 进 Phase 3 | 10 秒 |
| **B. 在已存在的 web 工程内**（有 `package.json` 含 `@epframe/eui-core` 在 `dependencies` + `src/main.js`） | 检查是否有配套组件工程；没有则建议先建一个 → `project/04-register.md` → `05-install-build.md` → `06-run-dev.md` | 1 分钟 |
| **C. 完全不在任何工程内** | 完整链路：`01-workspace.md` → `02-web.md` → **`03-component.md`（强制）** → `04` → `05` → `06` | 5 分钟 |

### 默认行为

**当前 monorepo 内默认走 A**（分层扫描 + 用户确认目标组件工程）。

### 关键产出契约（v0.3 新增）

`project/00-detect.md` 必须产出以下三个字段（缺一项 → STOP）：

```yaml
web_package:           # Web 工程绝对路径
component_package:     # 目标【组件工程】绝对路径 ← Phase 3 全部写入这里
target_view_dir:       # = <component_package>/src/views/<module>/<appName>/
```

### 中断条件

- 用户明确说"我要新工程" → 跳 A 模式，强制走 C
- 检测到 monorepo 但**没有**组件工程 → 强制提示用户先 `eui-cli comp` 建一个，**不允许**回退到把页面写进 Web 工程
- B 模式下 `package.json` 检测失败 → 询问用户是否清理重来 / 跳到 C

---

## Phase 3 · 页面层

**目的**：7 步完成 .vue + mock + 路由 + 接口文档生成，**全部写入组件工程**（违反 = 触发 R11）。

### 触发顺序（**严格按序**）

1. `workflows/page/01-confirm-intent.md` · **输入类型分流确认**（4 种：简短文字 / 详细文字 / 文档/图像 / 结构化）
2. `workflows/page/02-match-template.md` · 模板匹配
3. `workflows/page/03-generate.md` · 生成 `.vue` + 数据模型 → 写到 `<component_package>/src/views/`
4. `workflows/page/04-mock.md` · **默认业务定向 mock 中间件** → 写到 `<component_package>/mock/`，仅拦截 `/api/<module>/`
5. `workflows/page/05-route.md` · 路由写到 `<component_package>/src/router/static.js` 的 **MENU_ROUTES** 数组（不是 routes.js）
6. `workflows/page/07-api-doc.md` · 根据 `generated_urls` + mock handlers + `intent.fields` 生成 Markdown + JSON 接口文档
7. `workflows/page/06-verify.md` · 浏览器验证

### 跨步耦合

- 步骤 1 产出的 `intent_resolved` 是步骤 2~7 的输入
- 步骤 2 匹配的模板是步骤 3 的骨架来源
- 步骤 3 生成的接口路径是步骤 4 mock 的 URL（必须**逐字对得上**，加接口一致性校验）
- 步骤 5 路由是步骤 7 浏览器访问的入口
- 步骤 6 接口文档依赖步骤 3 的 `generated_urls`、步骤 4 的 `mock_generated`、步骤 1 的 `intent.fields`
- **步骤 3/4/5/6 的业务产物根目录都是 `component_package`**（来自 `project_detect_result`；Web 工程只允许写 mock 接入中间件）

### Mock 门控（v0.3 新增）

- 若 `intent_resolved.apiMode == 'mock'`，**必须**跑完步骤 4，否则步骤 7 浏览器验证会出现 404
- 步骤 3 自检清单加一条：**「apiMode=mock 时，必须先看 step4 mock 文件路径是否已规划」**

**不允许跳步**（哪怕你觉得很简单）。

---

## 闭环 · update-rules.md

无论 Phase 1/2/3 哪一步出 / 没出问题，**任务结束必须**跑：

`workflows/update-rules.md` 的 30 秒 4 问 AAR。

不跑 = 任务没完成（违反 SKILL.md Red Flags 第 5 条）。

---

## A/B/C 三档代劳总表

| 档 | 含义 | 你应该 | 用户应该 |
| --- | --- | --- | --- |
| **A** | 全自动 | 直接 `run_command` 跑（SafeToAutoRun=false 但说明清楚） | 等结果 |
| **B** | 半自动 / 等用户 | 给用户终端命令 + 截图 / 输入提示 | 自己跑 + 反馈结果 |
| **C** | 不可代劳 | 给链接 + 步骤 + 等用户回到聊天告诉你"装好了" | 自己安装 + 回来确认 |

具体每个步骤是 A/B/C 见对应 workflow 文件 frontmatter。

---

## 状态汇报频率

| 何时汇报 | 内容 |
| --- | --- |
| Phase 切换 | "Phase 1 完成（×秒），进入 Phase 2..." |
| 长任务（>30 秒） | "正在跑 pnpm install，预计 60 秒..." |
| 用户输入等待 | "需要你做 X，地址是 Y" |
| 错误 | "X 步失败，错误：Y，建议：Z" |
| 任务完成 | 完整产物清单 + 浏览器截图 + AAR 4 问触发 |

---

## 当前 Phase 状态记录

`.windsurf-skill-state` 不要创建持久状态文件（避免污染仓库）。每次任务从 0 开始检测，**用 Step 1 的体检报告作为状态判断**，跑得快、不会 stale。

---

_orchestrator 永远不直接生成代码 / 修配置，**只是路由**。具体动作全在子 workflow。_
