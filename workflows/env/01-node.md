---
phase: env
step: 1-node
delegation: C  # 不可代劳，给链接 + 等用户
---

# env/01-node · 安装 Node.js v22.21.1

> **C 档**：Node 是系统级安装，必须用户自己装。Agent 给链接 + 步骤 + 等用户回来。

---

## 第一性原理

Node.js 安装方式因 OS 不同：
- Windows → 用 `nvm-windows`
- mac / Linux → 用 `nvm` (`nvm-sh/nvm`)
- 不熟 nvm → 直接装 LTS 安装包

Agent **不能**跨 OS 自动装（涉及环境变量 / 用户权限）。

---

## Step 1 · 检测当前 OS

```sh
uname -a
# Darwin xxx → mac
# Linux xxx → Linux
# MINGW64 / cmd 输出 → Windows
```

---

## Step 2 · 给对应安装链接（按 OS 分支）

### Windows

输出给用户：

```
Windows 系统请按以下顺序安装：

1. 下载 nvm-windows（推荐使用 nvm 管理多版本）：
   - GitHub: https://github.com/coreybutler/nvm-windows
   - 备用: http://192.168.219.54/docs/software/nvm-setup.exe

2. 安装完毕后，**新开** cmd / PowerShell 跑：
   nvm node_mirror https://npmmirror.com/mirrors/node/
   nvm npm_mirror https://npmmirror.com/mirrors/npm/
   nvm install 22.21.1
   nvm use 22.21.1

3. 验证（应输出 v22.21.1）：
   node -v

装好回来告诉我"Node 装好了"，我继续。
```

### mac

```
mac 系统请按以下顺序安装：

1. 装 nvm：
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

2. 重启终端 / 执行：
   source ~/.zshrc   # 或 ~/.bash_profile

3. 设置国内镜像（避免下载慢）：
   export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node

4. 安装 Node 22.21.1：
   nvm install 22.21.1
   nvm use 22.21.1

5. 验证：
   node -v   # 应输出 v22.21.1

装好回来告诉我"Node 装好了"。

⚠️ M 系列 Mac 需要 v16 以下版本时有问题，看：
   https://github.com/nvm-sh/nvm?tab=readme-ov-file#macos-troubleshooting
```

### Linux

```
Linux 系统请按以下顺序安装：

1. 装 nvm（同 mac）：
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

2. source ~/.bashrc 或重启终端

3. 设置镜像 + 安装：
   export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node
   nvm install 22.21.1
   nvm use 22.21.1

4. 验证：
   node -v
```

---

## Step 3 · 等待用户

用户回来后**重检**：

```sh
node -v
```

- 输出 `v22.x.x` ≥ 22.0.0 → 标记 pass，回到 `00-detect.md` 继续下一项
- 仍然失败 → 询问用户具体错误，可能要重启终端 / 检查 PATH

---

## 常见问题

| 现象 | 原因 | 处置 |
| --- | --- | --- |
| Windows 装完 `node -v` 提示"不是命令" | 没新开终端 / PATH 没更新 | 关掉所有终端重开 |
| mac `nvm: command not found` | source 失败 | `source ~/.zshrc` 或编辑 `.zshrc` 加 `export NVM_DIR="$HOME/.nvm"` 等 |
| `nvm install 22.21.1` 卡住 | 镜像没设 | 重新跑 `export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node` |
| 装了多个 Node 版本但 `node -v` 输出错版本 | 没 `nvm use` | 跑 `nvm use 22.21.1` |

---

## ✓ 检验句

- [ ] `node -v` 输出 v22.x.x（≥ 22.0.0）
- [ ] 用户**显式确认**"装好了"
- [ ] 终端重启后再跑一次 `node -v` 仍然 OK

---

_完成 → 回 `env/00-detect.md` 重检。_
