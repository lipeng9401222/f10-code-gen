---
phase: env
step: 2-pnpm
delegation: A  # 自动跑
---

# env/02-pnpm · 安装 pnpm v10

> **A 档**：可以自动跑，安装 pnpm 全局包。

---

## 命令

```sh
npm install -g pnpm@10
```

注意：用 `pnpm@10` 而**不是** `pnpm@latest`（v11+ 与本仓库 lockfile 兼容性未验证）。

---

## Step 1 · 跑安装命令

`run_command`：
- `CommandLine`: `npm install -g pnpm@10`
- `Blocking`: true
- `WaitDurationSeconds`: 60

---

## Step 2 · 验证

```sh
pnpm -v
```

预期输出：`10.x.x`。

---

## 常见错误

| 现象 | 原因 | 处置 |
| --- | --- | --- |
| `EACCES permission denied` | mac/Linux 全局安装权限不够 | 引导用户：使用 `sudo npm install -g pnpm@10` 或配置 nvm 用户级 npm |
| `pnpm` 装上但 `pnpm -v` 提示找不到 | PATH 没刷新 | 让用户**新开**终端再跑 |
| 国内网超时 | 没配镜像 | 跑 `npm config set registry https://npmmirror.com/mirrors/npm/` 再装 |

---

## 镜像加速（可选）

如果安装慢，可以临时用：

```sh
npm install -g pnpm@10 --registry=https://registry.npmmirror.com
```

> ⚠️ 这只是**临时**用 npmmirror，**不要**改全局 registry（之后还要用 nrm 切到 epoint 私有源）。

---

## ✓ 检验句

- [ ] `pnpm -v` 输出 v10.x.x

---

_完成 → 回 `env/00-detect.md` 重检。_
