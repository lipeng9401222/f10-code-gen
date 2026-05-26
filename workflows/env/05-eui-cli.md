---
phase: env
step: 5-eui-cli
delegation: A  # 自动跑
---

# env/05-eui-cli · 安装 @epframe/eui-cli

> **A 档**：自动安装。前置：03-source 已切 epoint + 04-login 已登录。

---

## 命令

```sh
npm install @epframe/eui-cli -g
```

> ⚠️ **依赖前置条件**：必须在 epoint 源已切 + 登录的前提下，否则会 404（`@epframe/eui-cli` 是私有包）。

---

## Step 1 · 跑安装

```sh
npm install @epframe/eui-cli -g
```

或用 pnpm（如果偏好）：

```sh
pnpm add -g @epframe/eui-cli
```

---

## Step 2 · 验证

```sh
eui-cli -v
```

预期输出：版本号（如 `3.5.0`）。

---

## Step 3 · 查看可用子命令

```sh
eui-cli -h
```

预期看到：
- `init` 创建标准组件化开发工程（含 monorepo + web 模板）
- `web` 创建 web 开发模板
- `comp` 创建组件开发模板
- `workspace` (`ws`) 把现有非 pnpm 工程改造成 workspace
- `init-config` (`ic`) 初始化脚手架配置
- `build` 编译所有包
- `publish` 发布包
- `update` (`up`) 更新 @ep 开头的包

来源：`vue-docs/getting-started/getting-started-development-environment.md`。

---

## 初始化脚手架配置（可选）

如果用户多次需要在同一目录下用 eui-cli，可以一次性配 `eui-cli.config.json`：

```sh
eui-cli init-config
```

会生成：

```json
{
  "build": {
    "silent": false,
    "ignoreVersionCheck": false,
    "skipPackages": []
  },
  "update": {
    "silent": false,
    "noSave": false
  }
}
```

P0 默认不做（用户自行决定是否需要配置）。

---

## 常见错误

| 现象 | 原因 | 处置 |
| --- | --- | --- |
| `404 Not Found - GET ... @epframe/eui-cli` | 没切 epoint 源 / 没登录 | 回查 03-source + 04-login |
| `EACCES permission denied` | 全局安装权限 | `sudo` 或用 nvm 用户级 |
| `eui-cli` 装上但找不到命令 | PATH 没更新 | 新开终端 / 检查 `npm config get prefix` 路径在 PATH |
| `eui-cli -v` 输出旧版本 | 之前装过老版本 | 跑 `npm i -g @epframe/eui-cli@latest` |

---

## ✓ 检验句

- [ ] `eui-cli -v` 输出版本号
- [ ] `eui-cli -h` 能看到 init / web / comp / workspace 等子命令

---

_完成 → 回 `env/00-detect.md` 重检 → 全过 → 进 `project/00-detect.md`。_
