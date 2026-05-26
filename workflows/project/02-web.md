---
phase: project
step: 2-web
delegation: B  # 交互式（选产线 / 业务）
---

# project/02-web · 创建 web 开发模板

> **B 档**：`eui-cli web` 会问产线 / 业务，让用户在终端选。

---

## 何时跑

- 分支 C（全新）：在 monorepo 内建第一个 web 工程
- 分支 A 但 monorepo 没 web 工程：在 monorepo 内加新 web

---

## 命令

```sh
# 在 workspace 根（不是包内！）
eui-cli web
```

来源：`vue-docs/getting-started/getting-started-development-environment.md` § 创建 web 开发模板。

---

## 交互流程

会问几个问题：

```
1. 项目名（用作目录名 + package.json name）：epoint-bid-mgmt
2. 项目描述：标段(包)管理系统
3. 选择业务模板：
   - 招投标
   - 政务办公
   - 通用
   - ...
4. 是否使用 TypeScript? Y/N
5. 是否包含 mock-server? Y/N （建议 Y）
6. 是否包含示例页面? Y/N
```

**你的角色**：
- 把命令告诉用户
- 提示关键选择（"建议选 mock-server: Y"）
- 等用户跑完报告

---

## 命名约定

来源：项目根 `CLAUDE.md` § Commit Message Convention 间接约定 + `package.json` 命名。

| 字段 | 约定 |
| --- | --- |
| 项目名 | kebab-case，业务前缀（`epoint-bid-mgmt` / `epoint-procurement`） |
| package.json `name` | `@epoint-fe/<项目名>`（前端研发部命名空间） |

---

## 完成后会生成

```
packages/<项目名>/
├── package.json
├── vite.config.js          # 含 mock 插件配置
├── index.html
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── router/             # 路由（待 04-register.md 加业务页）
│   ├── views/              # 页面
│   ├── store/              # Pinia
│   └── ...
├── mock/                   # mock 数据（待 04-mock.md 写）
└── public/
```

---

## ✓ 检验句

- [ ] 用户报告"建好了"
- [ ] `packages/<项目名>/package.json` 存在
- [ ] `package.json` 含 `@epframe/eui-core` 依赖
- [ ] 工程目录结构与上面一致

---

_完成 → 跳到 `04-register.md`（注册第一个页面），或先 `03-component.md` 建组件包。_
