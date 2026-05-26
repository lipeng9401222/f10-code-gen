---
phase: project
step: 4-register
delegation: A
---

# project/04-register · 注册子模块 / 路由

> **A 档**：在 web 工程的 `src/router/` + `src/setup.js`（如有）改文件，**不需要**用户介入。

---

## 何时跑

每次生成新页面时，**都要跑这一步**（页面层 `05-route.md` 是它的细化版，本文件主要是"工程层视角的注册检查"）。

---

## Step 1 · 检查 `setup.js`（如果有）

某些 F10 web 工程用 `setup.js` 集中注册全局组件 / Pinia store / 路由钩子：

```sh
ls packages/<workspace>/src/setup.js
```

如果存在 → 检查是否需要 hook 注册（一般业务页面**不用**）。

---

## Step 2 · 路由文件定位

参考 `workflows/page/05-route.md` 详细方案。本文件不重复。

---

## Step 3 · 菜单注册（如果有）

某些工程通过 `config.js` / `menu.json` 注册侧边栏菜单：

```sh
ls packages/<workspace>/src/config.js
ls packages/<workspace>/src/menu.json
```

如果有 → 在合适分组下加菜单项（参考 `05-route.md` Step 3）。

---

## Step 4 · `vite.config.js` proxy 检查（如果 apiMode == proxy）

```js
// packages/<workspace>/vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.x.x:8080',  // 用户的后端
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
};
```

如果 `apiMode == 'proxy'` 但 vite.config.js 没配 → 自动加。

---

## Step 5 · `eui-cli update` 检查包版本

如果用户的 web 工程是从老版本 `eui-cli web` 创建的，依赖包可能旧：

```sh
# 在 web 工程根
eui-cli update
# 或别名
eui-cli up
```

来源：`vue-docs/getting-started/getting-started-development-environment.md` § 更新包。

仅当用户**明确希望升级**时跑（默认不跑，避免引入未知 break change）。

---

## 输出契约

```yaml
register_result:
  routes_added:
    - path: <string>
      file: <routes.js 路径>
  menu_added: <bool>
  proxy_configured: <bool>
  packages_updated: <bool>
```

---

## ✓ 检验句

- [ ] `routes.js` 内有新加的路由记录
- [ ] grep 路由 path **唯一**
- [ ] 如有菜单 → 菜单项已添加
- [ ] 如 apiMode == proxy → vite.config.js proxy 已配
- [ ] 改动的文件用 `git diff` 检查**只动了**应该动的（没误改）

---

_完成 → 跳到 `05-install-build.md`（如果是首次创建工程）或 `06-run-dev.md`（如果工程已 ready）。_
