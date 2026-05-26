---
phase: project
step: 5-install-build
delegation: A
---

# project/05-install-build · 安装依赖 / 编译

> **A 档**：自动跑 `pnpm install` + （可选）`eui-cli build`。

---

## 何时跑

- 首次进入新工程（依赖未装）
- 检测到 `node_modules/` 不存在
- 用户报告"组件未注册"等典型缺依赖错误
- 升级了某些包之后

---

## Step 1 · `pnpm install`

**始终在仓库根（pnpm-workspace.yaml 所在目录）**：

```sh
pnpm install
```

`run_command`:
- `Cwd`: monorepo 根
- `Blocking`: true
- `WaitDurationSeconds`: 180（私有源 + 大量依赖，可能 1~3 分钟）

观察输出：

| 关键字 | 含义 |
| --- | --- |
| `Progress: ...` | 正在解析 / 下载 |
| `Done in <s>` | 装完 |
| `peer dependencies issues` | warning，可忽略 |
| `ERR_PNPM_FETCH_404` | 包不存在 / 私有源没切对 |
| `ERR_PNPM_NO_MATCHING_VERSION` | 版本不存在 |

---

## Step 2 · 处理常见错误

### 错误 1：`ERR_PNPM_FETCH_404` 关于 @epframe / @epoint-fe 包

**根因**：私有源没切 / 没登录。

```sh
nrm current  # 必须是 epoint
npm whoami   # 必须输出用户名
```

回 `env/03-source.md` 或 `env/04-login.md` 修复。

### 错误 2：`Cannot find module ...`

**根因**：lockfile 与代码不一致。

```sh
pnpm install --force
```

或删除 `node_modules/` 与 `pnpm-lock.yaml` 重装（**慎用**，会拉新版本）：

```sh
# 确认用户同意
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### 错误 3：`peer dependencies` 大量 warning

通常可以**忽略**（pnpm 严格 peer 检查比 npm/yarn 严，warning 不影响运行）。

---

## Step 3 · 编译 packages（按需）

如果 monorepo 内有源码包（如 `packages/eui-icons-custom/`），**首次启动前**需要编译一次：

```sh
# monorepo 根
pnpm run -r build
# 或用 eui-cli
eui-cli build
```

来源：`vue-docs/getting-started/getting-started-development-environment.md` § 编译所有包。

**仅当**：
- 工程 `eui-cli build` 命令存在
- 有未编译的源码包（可通过检查 `packages/*/dist/` 是否存在判断）

否则跳过。

---

## Step 4 · 检查 stub 脚本（vue-frame-live-docs 特有）

仓库根 `package.json` 有 `postinstall: pnpm run stub` 自动跑 stub。

如果 stub 失败（`pnpm run stub` 报错）：
- 检查 `packages/<name>/package.json` 是否有 `stub` script
- 失败的包可以暂时跳过（在 `pnpm run -r --parallel stub` 中允许部分失败）

---

## 输出契约

```yaml
install_result:
  install_success: <bool>
  install_duration_seconds: <number>
  build_run: <bool>
  build_success: <bool>
  warnings_count: <number>
  errors: [<string>]
```

---

## ✓ 检验句

- [ ] `node_modules/` 在 monorepo 根存在
- [ ] `node_modules/` 在 web 工程根**也**存在（说明 workspace 链接成功）
- [ ] `pnpm -r ls --depth -1` 不报"no matching"
- [ ] grep `@epframe/eui-core` 在 lockfile 命中（说明私有包真正下载了）

---

_完成 → 进 `06-run-dev.md` 启动 dev server。_
