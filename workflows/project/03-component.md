---
phase: project
step: 3-component
delegation: B  # 交互式
optional: true  # 可选步骤
---

# project/03-component · 创建组件开发模板（可选）

> **B 档** + **可选**：仅当用户**显式说要建组件包**时才跑。

---

## 何时跑

- 用户说"我要建一个组件包" / "封装一个新组件用于跨工程复用"
- 否则**跳过**（业务页面直接在 web 工程的 `src/views/` 下写就够了）

---

## 命令

```sh
# 在 workspace 根
eui-cli comp
```

或别名 `eui-cli c`。

---

## 交互流程

```
1. 组件名（kebab-case + 唯一性检查）：xxx-form-table
2. 包名：@epoint-fe/xxx-form-table
3. 描述：xxx 业务场景的表单 + 表格组合
4. 是否使用 TypeScript? Y/N
```

**eui-cli 会做重名检测**，确保你输入的组件名在 npm 上不冲突。

---

## 命名约定

| 类型 | 前缀 |
| --- | --- |
| UI 类组件 | `@epoint-fe/eui-<name>` |
| 业务组件 | `@epoint-fe/<biz-prefix>-<name>` |
| 电子表单 | `@epoint-fe/sform-<name>` |
| 工作流 | `@epframe/<workflow-name>` |

---

## 完成后会生成

```
packages/<组件名>/
├── package.json            # name: @epoint-fe/<组件名>
├── README.md
├── src/
│   ├── index.ts            # 主入口
│   ├── components/         # 组件源码
│   └── ...
├── docs/                   # 组件文档（vitepress 风格）
└── tests/                  # 单元测试
```

---

## 在 web 工程引用

回到 web 工程的 `package.json`：

```json
{
  "dependencies": {
    "@epoint-fe/<组件名>": "workspace:*"
  }
}
```

然后 `pnpm install` 让 pnpm 链接。

---

## ✓ 检验句

- [ ] 用户报告"组件包建好了"
- [ ] 包名通过重名检测
- [ ] 按 `<biz>-<name>` 命名约定
- [ ] web 工程已用 `workspace:*` 协议引用

---

_完成 → 回到 `02-web.md` / `04-register.md`。_

---

## 备注：P0 默认不建组件包

P0 阶段**默认跳过**本步骤。生成业务页面优先在 web 工程的 `src/views/` 下，**不要**为了"代码复用"提前建组件包（YAGNI）。

只有用户**反复**强调"这个要做成可复用组件"才走本步骤。
