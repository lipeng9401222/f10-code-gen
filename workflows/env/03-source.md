---
phase: env
step: 3-source
delegation: A  # 大部分自动，仅 npm login 需 B 档
---

# env/03-source · 配置公司私有源 epoint

> **A 档为主**：用 nrm 自动添加 + 切换源。
> 如需 `npm login` → 转 `env/04-login.md`（B 档）。

---

## Step 0 · 确保 nrm 已安装（前置依赖）

如果 `nrm -V` 失败（没装）：

```sh
# 必须用 npmmirror 装（默认 npm 源在公司可能不通）
npm install -g nrm --registry=https://registry.npmmirror.com
```

验证：
```sh
nrm -V
```

---

## Step 1 · 添加 epoint 私有源

```sh
nrm add epoint http://192.168.0.99:8081/nexus/repository/npmpublic/
```

> ⚠️ **不同产线 nexus 地址可能不同**。`192.168.0.99:8081` 是前端研发部默认。如果你的产线不一样：
> - 询问用户："你的产线 nexus 地址是 192.168.0.99:8081 还是其他？"
> - 让用户从产线负责人那里确认后给地址

---

## Step 2 · 切到 epoint 源

```sh
nrm use epoint
```

---

## Step 3 · 验证

```sh
nrm current
```

预期输出：`epoint`。

```sh
nrm test epoint
```

预期：响应时间 < 500ms（比公网源快得多）。

---

## Step 4 · 检查登录状态

跑一个**需要登录**的命令探测：

```sh
npm whoami
```

| 输出 | 含义 | 下一步 |
| --- | --- | --- |
| `epointfe` 或其他用户名 | 已登录 | 跳过 04-login.md |
| `npm ERR! code ENEEDAUTH` | 未登录 | 转 `env/04-login.md` |
| `npm ERR! code E401` | 凭证过期 | 同上 |

---

## Step 5 · 检查 .npmrc 文件

确认仓库根 / 用户目录的 `.npmrc` 文件：

```sh
cat ~/.npmrc
```

预期看到：
```
//192.168.0.99:8081/nexus/repository/npmpublic/:_authToken=xxxxx
```

如果没有这一行 → 用户**还没登录** → 转 `env/04-login.md`。

---

## 发布源（可选）

如果用户需要**发布**包到公司 nexus（不是只下载），还要加：

```sh
nrm add epointAdmin http://192.168.0.99:8081/nexus/repository/epoint-hosted/
```

但 P0 默认不做（仅生成代码不发布）。

---

## 常见错误

| 现象 | 原因 | 处置 |
| --- | --- | --- |
| `nrm test epoint` 显示 `Fetch error` 但能装包 | 测试请求路径与实际不一致 | 忽略，能装包就行 |
| 装包提示 `not found` 某个 @epoint-fe 包 | 没切到 epoint 源 / 没登录 | 跑 `nrm current` 确认 + `npm whoami` 确认 |
| 公司 VPN 没连 | 内网才能访问 192.168.x.x | 提示用户连 VPN |

---

## ✓ 检验句

- [ ] `nrm current` 输出 `epoint`
- [ ] `npm whoami` 输出用户名（不报 ENEEDAUTH）
- [ ] 用户位置在公司内网 / 已连 VPN

---

_完成 → 回 `env/00-detect.md` 重检。_
