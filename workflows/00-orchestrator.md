# 00-orchestrator · 总指挥状态机

> **本文件是页面生成任务的"总入口"**。Agent 收到生成 / 修改 F10 页面的需求后**第一件事**就是读这里，由本文件决定走哪个 Phase。

---

## 状态机总览

```
[START]
   │
   ▼
[Phase 1 · 环境层]  env/00-detect.md  →  5 项体检
   │  ├─ 全过 → 跳到 Phase 2
   │  └─ 有 fail → 按 fail 项跑 env/01~05 → 重检
   ▼
[Phase 2 · 工程层]  project/00-detect.md  →  检测当前位置
   │  ├─ 在 monorepo 内（如本仓库）→ 跳到 06-run-dev → Phase 3
   │  ├─ 不在工作区 → 跑 project/01~06 完整链路
   │  └─ 在已存在的 web 工程内 → 跳到 04-register
   ▼
[Phase 3 · 页面层]  page/01-confirm-intent.md → ... → page/06-verify.md
   │
   ▼
[闭环]  update-rules.md  →  AAR 30 秒 4 问
   │
   ▼
[END]
```

---

## 启动协议（每次任务）

### Step 0 · 重新读 SKILL.md

**不论你"记得不记得"**：

1. 读 `epoint-f10code-gen/SKILL.md` 完整内容
2. 读 `epoint-f10code-gen/rules/project-rules.md` + `rules/data-model-rules.md` + `rules/component-usage-rules.md`（Always Read 三件套）

不读 = 必出错（stale memory）。

### Step 1 · 给用户当前状态简报（30 秒以内）

输出格式：

```
我准备帮你生成 F10 页面，先做 3 件事：
1. 跑 5 项环境体检（约 10 秒）
2. 检测当前工程位置
3. 跟你确认 6 字段需求

体检中...（开始 Phase 1）
```

**禁止**：30 秒不给用户任何输出（违反 SKILL.md Red Flags）。

---

## Phase 1 · 环境层

**目的**：确保 Node / pnpm / 私有源 / eui-cli 都齐了。

### 触发文件

`workflows/env/00-detect.md`

### 逻辑

1. 跑 5 项体检（详见该文件）
2. 输出体检报告：

   ```
   ✓ Node.js v22.21.1
   ✓ pnpm v10.15.0
   ✗ 私有源 epoint  → 当前是 npm，需要 nrm add epoint
   ✓ eui-cli v3.x
   ✓ 当前在 monorepo 内（vue-frame-live-docs）
   ```

3. 对每个 ✗ 项，按对应 workflow 修复：

   | fail 项 | 跑 |
   | --- | --- |
   | Node 缺失 / 版本错 | `env/01-node.md`（C 档：给链接，用户自装） |
   | pnpm 缺 | `env/02-pnpm.md`（A 档：自动 `npm i -g pnpm@10`） |
   | 私有源 epoint 没切 | `env/03-source.md`（A 档：`nrm add` + `nrm use`） |
   | nexus 没登录 | `env/04-login.md`（B 档：等用户在终端 `npm login`） |
   | eui-cli 缺 | `env/05-eui-cli.md`（A 档：`npm i -g @epframe/eui-cli`） |

4. **重检**直到 5 项全过 → 进 Phase 2。

### 中断条件

- 用户明确说 "跳过环境检查" → 记录 warning，进 Phase 2
- C 档（Node 缺）用户没安装 → STOP，等用户装好回来

---

## Phase 2 · 工程层

**目的**：定位代码该写在哪个工程的哪个目录。

### 触发文件

`workflows/project/00-detect.md`

### 三种分支

| 当前位置 | 走法 | 耗时 |
| --- | --- | --- |
| **A. 已在 monorepo 内**（pwd 含 `vue-frame-live-docs` / `pnpm-workspace.yaml` 在祖先目录） | **零成本演示模式**：`project/06-run-dev.md`（直接 `pnpm dev`） | 5 秒 |
| **B. 在已存在的 web 工程内**（有 `package.json` 含 `@epframe/eui-core` 依赖） | `project/04-register.md` → `05-install-build.md` → `06-run-dev.md` | 1 分钟 |
| **C. 完全不在任何工程内** | 完整链路：`01-workspace.md` → `02-web.md` → (可选 `03-component.md`) → `04` → `05` → `06` | 5 分钟 |

### 默认行为

**当前 monorepo 内默认走 A**（用户已确认采用零成本演示模式）。

### 中断条件

- 用户明确说"我要新工程" → 跳 A 模式，强制走 C
- B 模式下 `package.json` 检测失败 → 询问用户是否清理重来 / 跳到 C

---

## Phase 3 · 页面层

**目的**：6 步完成 .vue + mock + 路由生成。

### 触发顺序（**严格按序**）

1. `workflows/page/01-confirm-intent.md` · 6 字段对话
2. `workflows/page/02-match-template.md` · 模板匹配
3. `workflows/page/03-generate.md` · 生成 .vue + 数据模型
4. `workflows/page/04-mock.md` · mock 配置
5. `workflows/page/05-route.md` · 路由配置
6. `workflows/page/06-verify.md` · 浏览器验证

### 跨步耦合

- 步骤 1 产出的 6 字段是步骤 2~5 的输入
- 步骤 2 匹配的模板是步骤 3 的骨架来源
- 步骤 3 生成的接口路径是步骤 4 mock 的 URL
- 步骤 5 路由是步骤 6 浏览器访问的入口

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
