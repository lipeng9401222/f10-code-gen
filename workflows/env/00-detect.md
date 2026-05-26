---
phase: env
step: detect
delegation: A  # 全自动
---

# env/00-detect · 5 项环境体检

> **目的**：在生成代码前确认环境就绪，缺什么自动修（A 档）/ 引导用户修（B/C 档）。

---

## 5 项体检命令

按序跑，记录每项结果（pass / fail）：

| # | 检测项 | 命令 | pass 标准 | fail 时跑 |
| --- | --- | --- | --- | --- |
| 1 | Node.js | `node -v` | 输出 `v22.x.x`（≥ v22.0.0） | `env/01-node.md`（C 档） |
| 2 | pnpm | `pnpm -v` | 输出 `10.x.x`（≥ 10.0.0） | `env/02-pnpm.md`（A 档） |
| 3 | nrm（包管理工具） | `nrm -V` | 输出版本号 | `env/03-source.md` § Step 0（A 档） |
| 4 | 私有源 epoint | `nrm current` | 输出 `epoint` | `env/03-source.md`（A 档） |
| 5 | eui-cli | `eui-cli -v` | 输出版本号 | `env/05-eui-cli.md`（A 档） |

> 备注：**nexus 登录**（`npm login`）不在自动体检里，因为 `nrm current` 不能直接判断登录状态。它在`env/04-login.md` 中按需触发（B 档：用户在终端登录）。

---

## Step 1 · 跑体检

```sh
# 一次性跑完，每个失败都记下
node -v && pnpm -v && nrm -V && nrm current && eui-cli -v
```

或者**分别跑**（更精确捕获错误）：

```sh
node -v
pnpm -v
nrm -V
nrm current
eui-cli -v
```

---

## Step 2 · 输出体检报告

格式：

```
环境体检报告：
✓ Node.js v22.21.1
✓ pnpm v10.15.0
✓ nrm v2.0.1
✗ 私有源 epoint （当前是 npm）→ 将自动 nrm add epoint
✓ eui-cli v3.5.0

修复计划：
1. 跑 env/03-source.md（A 档自动，约 5 秒）

进入修复...
```

---

## Step 3 · 按 fail 项跑修复

按"fail 时跑"列对应的 workflow，**逐个**跑（不并发，避免互相干扰）。

### 修复完后重检

跑完每个 fix → 回到 Step 1 重检 → 直到 5 项全 pass → 退出 env Phase。

---

## 中断条件

| 触发 | 处置 |
| --- | --- |
| 用户明确说"跳过环境检查" | 输出"⚠️ 跳过环境检查，可能后续步骤失败" → 进 Phase 2 |
| 第 1 项 (Node) fail 且用户 30 分钟没装好 | STOP，告知用户回来继续 |
| 第 4 项 (源) 修复后需要 `npm login` | 转 `env/04-login.md` （B 档） |

---

## ✓ 检验句

退出本 workflow 前自查：
- [ ] 5 项全 pass
- [ ] 没有跳过的 fail 项
- [ ] 用户已知道当前是模式 A（在 monorepo 内）/ B（已有工程）/ C（新工程）

---

_体检通过 → 进 `project/00-detect.md`。_
