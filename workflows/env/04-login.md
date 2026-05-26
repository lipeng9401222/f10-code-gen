---
phase: env
step: 4-login
delegation: B  # 半自动，等用户在终端输密码
---

# env/04-login · 登录公司 nexus

> **B 档**：必须用户**在终端**手动输用户名 / 密码 / 邮箱（Agent 不能代劳输密码）。

---

## 当 03-source.md 探测到未登录时触发

如果 `npm whoami` 报 `ENEEDAUTH` → 来到本步。

---

## Step 1 · 给用户操作指南

输出：

```
现在需要你**在你自己的终端**跑下面这条命令并输入凭证：

  npm login

输入以下内容（按提示一次回车一次）：

  Username: epointfe
  Password: 11111
  Email: 任意邮箱（如 you@example.com）

跑完后告诉我"登录好了"，我继续。

⚠️ 如果你的产线 nexus 用的不是这个账号，请向产线负责人确认。
```

---

## Step 2 · 等用户回来

用户回复"登录好了" / "OK" / 类似 → 重检：

```sh
npm whoami
```

预期：输出用户名（不再是 ENEEDAUTH）。

---

## Step 3 · 检查 token 持久化

确保 `~/.npmrc` 写入了 token：

```sh
grep nexus ~/.npmrc
# 应该看到：
# //192.168.0.99:8081/nexus/repository/npmpublic/:_authToken=...
```

如果没有 → 提示用户重新跑 `npm login`，可能交互被中断。

---

## 常见错误

| 现象 | 原因 | 处置 |
| --- | --- | --- |
| `npm login` 卡在 `Username:` | 用户没输入 | 提醒"请打字输入用户名" |
| `Incorrect or missing password` | 密码错 | 默认是 `11111`（小写 5 个 1） |
| `Email format is invalid` | 邮箱必须有 @ | 任意合法邮箱即可 |
| 登录成功但 `npm whoami` 还报 ENEEDAUTH | source 没切对 | 回去检查 `nrm current` 是 `epoint` |

---

## 跨产线提醒

如果用户在**非前端研发部**产线（如政务 / 招投标 BG）：

```
你属于哪个产线？不同产线的 nexus 用户名 / 密码可能不同：
- 前端研发部：epointfe / 11111（默认，你已经试了？）
- 招投标 BG：xxx / xxx
- 政务 BG：xxx / xxx

请向你的产线负责人确认凭证。如果你不确定，直接问负责人："咱们前端 npm 私有仓库地址 + 账号密码是什么？"
```

---

## ✓ 检验句

- [ ] `npm whoami` 输出用户名
- [ ] `~/.npmrc` 含 `_authToken=` 行
- [ ] 跑 `npm install @epframe/eui-core --dry-run` 不报 401

---

## CICD / 共享凭证（高级，P0 不实现）

来源：`vue-docs/getting-started/getting-started-development-environment.md`：

> 如果你需要在集成平台、CICD 环境中也使用公司的私有源，可将这个 `.npmrc` 放到仓库的根目录下提交。

P0 默认不做（涉及凭证泄漏风险，用户应该用 CI 的 secret 注入而非提交 .npmrc）。

---

_完成 → 回 `env/00-detect.md` 重检。_
