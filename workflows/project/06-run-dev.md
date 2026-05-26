---
phase: project
step: 6-run-dev
delegation: A  # 后台启动
---

# project/06-run-dev · 启动 dev server

> **A 档**：自动后台启动 dev server，监控 5 秒判断启动是否成功。

---

## 命令清单

来源：项目根 `package.json:scripts`。

| 目标 | 命令 |
| --- | --- |
| **examples 包内**（默认） | `pnpm -C packages/examples run dev` |
| **web-show 主应用** | `pnpm dev`（等价 `pnpm -C packages/web-show run dev`） |
| **新建的独立工程** | `pnpm -C <workspace>/<webApp> run dev` |
| **文档站**（一般用不到） | `pnpm docs:dev` |

---

## Step 1 · 选择启动目标

根据 `project/00-detect.md` 的 `target_workspace`：

```yaml
project_detect_result:
  target_workspace: packages/examples   # → 跑 pnpm -C packages/examples run dev
```

---

## Step 2 · 后台启动

`run_command` 必须用：

```yaml
CommandLine: pnpm -C packages/examples run dev
Cwd: <monorepo 根>
Blocking: false               # ★ 不阻塞，长时运行
WaitMsBeforeAsync: 5000       # 5 秒后转后台
SafeToAutoRun: false          # 让用户看到命令再决定
```

---

## Step 3 · 5 秒内观察输出

5 秒内应该看到的关键字：

| 关键字 | 含义 | 处置 |
| --- | --- | --- |
| `Local: http://localhost:<port>` | 启动成功 | 记下 port，进 Step 4 |
| `Mock server started` | mock 接管 | OK |
| `Port <port> is in use` | 端口冲突 | 选 1：杀进程；选 2：让 vite 自动选下一个端口 |
| `Cannot find module` | 缺依赖 | 回去跑 `05-install-build.md` |
| `[plugin:xxx] Cannot ...` | 配置错误 | 给用户看具体 trace 决定 |

如果 5 秒内**没有**关键字 → 继续等到 30 秒，再没有 → STOP，告知"启动可能卡住"。

---

## Step 4 · 输出 URL

```
✓ dev server 启动成功

访问地址：http://localhost:5174
新生成的页面：http://localhost:5174/#/<module>/<appName>

下一步：进入 page/06-verify.md 浏览器验证
```

---

## Step 5 · 端口约定

| 工程 | 默认端口 |
| --- | --- |
| examples | 5173~5176（按 vite 自动） |
| web-show | 5173 |
| docs | 5174 |
| server | 3000~3001（NestJS） |
| f9 | 80（自定义） |

> ⚠️ 如果端口冲突，vite 会自动顺位选下一个（`5173 → 5174 → 5175`），**关注实际输出**别用错。

---

## 中断条件

| 触发 | 处置 |
| --- | --- |
| 用户说"我自己启动" | 跳过 Step 2，直接进 verify |
| dev server 已在跑（端口能 ping 通）| 跳过启动，直接用现有 |
| 反复启动失败 3 次以上 | STOP，给用户看 trace 让他决定 |

---

## 输出契约

```yaml
run_dev_result:
  started: <bool>
  url: <string>
  port: <number>
  command_id: <run_command 返回的 CommandId>   # 后续可能要查状态
  initial_logs: <string>
```

---

## ✓ 检验句

- [ ] dev server URL 能在浏览器打开（不是 ECONNREFUSED）
- [ ] 启动日志没有 ❌ red 错误
- [ ] mock server 已注册（如果 apiMode == mock）

---

_完成 → 进 Phase 3 `page/01-confirm-intent.md`。_
