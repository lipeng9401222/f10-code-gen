# page/07-api-doc · 根据 mock 生成接口文档（v0.4）

> **目的**：页面 / 应用创建完成后，根据 `generated_urls`、`mock_generated`、`intent.fields` 生成后端可实现的接口文档。
> 默认产物：Markdown + JSON。

---

## 输入

- `intent_resolved`
- `generated_urls`（来自 `03-generate.md`）
- `mock_generated` 与 `url_consistency`（来自 `04-mock.md`）
- 生成的 mock 文件或业务中间件 handlers

---

## 输出位置

默认写到组件工程：

```text
<component_package>/docs/api/<module>/<appName>.md
<component_package>/docs/api/<module>/<appName>.api.json
```

如果目标工程已有 `docs/api/`、`api-docs/` 或团队约定目录，优先复用；否则按默认路径创建。

---

## Step 1 · 标准化字段

把 `intent.fields` 统一为以下结构，旧字段缺失时兼容补齐：

```ts
type ApiField = {
  name: string;
  label: string;
  type: string;
  required: boolean;
  desc: string;
  options?: Array<{ label: string; value: string | number | boolean }>;
  example?: unknown;
  descSource: 'intent' | 'generated';
};
```

补齐规则：
- `label` 缺失 → 用 `name`
- `type` 缺失 → 用 `text`
- `required` 缺失 → 默认 `false`
- `desc` 缺失 → 生成 `${label}，类型：${type}（待后端确认）`
- `example` 缺失 → 根据 type/options 生成保守示例

---

## Step 2 · 接口分类

从 URL 后缀推导接口用途：

| 后缀 | 名称 | 请求 | 响应 |
| --- | --- | --- | --- |
| `/list` | 分页列表 | `current`、`pageSize`、`conditions` | `{ data: ApiField[], total: number }` |
| `/tree` / `/treeList` | 树数据 | 可选筛选字段 | `[{ value, label, children }]` |
| `/<field>Options` | 枚举选项 | 空对象或筛选参数 | `{ data: [{ label, value }] }` |
| `/info` | 详情 | `{ id }` | `{ state, data }` |
| `/add` | 新增 | 字段表单 | `{ state, message }` |
| `/update` | 更新 | `{ id, ...fields }` | `{ state, message }` |
| `/delete` | 删除 | `{ id }` | `{ state, message }` |
| `/batchDelete` | 批量删除 | `{ ids: [] }` | `{ state, message }` |

未命中固定后缀时，按 `mock_generated.interfaces[].purpose` 生成“自定义接口”。

---

## Step 3 · Markdown 文档结构

Markdown 必须包含：

```md
# <页面中文名> 接口文档

## 基本信息
- 模块：<module>
- 页面：<appName>
- 请求前缀：/api/<module>/<appName>
- 请求体：JSON 或 application/x-www-form-urlencoded（F10 Utils.request 兼容）

## 字段说明
| 字段 | 名称 | 类型 | 必填 | 描述 | 示例 |

## 接口列表
| 方法 | URL | 说明 |

## 接口详情
### 1. 分页列表
- Method: POST
- URL: /api/<module>/<appName>/list
- Request
- Response
```

描述缺失的字段要标记“待后端确认”，避免把 AI 推断伪装成业务事实。

---

## Step 4 · JSON 文档结构

`.api.json` 用于后续自动校验 / 二次生成：

```json
{
  "module": "<module>",
  "appName": "<appName>",
  "basePath": "/api/<module>/<appName>",
  "bodyParser": "json_and_form_encoded",
  "fields": [
    {
      "name": "status",
      "label": "状态",
      "type": "enum",
      "required": false,
      "desc": "状态",
      "descSource": "intent",
      "options": [{ "label": "启用", "value": "enabled" }],
      "example": "enabled"
    }
  ],
  "interfaces": [
    {
      "method": "post",
      "url": "/api/<module>/<appName>/list",
      "name": "分页列表",
      "request": { "params": {} },
      "response": { "data": [], "total": 0 }
    }
  ]
}
```

---

## Step 5 · 覆盖率校验

必须输出字段覆盖率：

```yaml
field_coverage:
  total: <字段数>
  with_desc: <descSource=intent 的字段数>
  generated_desc: <descSource=generated 的字段数>
  percent: <with_desc / total>
```

如果 `generated_desc > 0`，Markdown 顶部加一句：

```md
> 注：部分字段描述由字段名和类型推断，已标记“待后端确认”。
```

---

## 输出契约

```yaml
api_doc_generated:
  markdown: <component_package>/docs/api/<module>/<appName>.md
  json: <component_package>/docs/api/<module>/<appName>.api.json
  interface_count: <number>
  field_coverage:
    total: <number>
    with_desc: <number>
    generated_desc: <number>
    percent: <number>
```

---

## ✓ 检验句

- [ ] Markdown 与 JSON 都已生成
- [ ] 接口数量与 `generated_urls` / `mock_generated.interfaces` 对齐
- [ ] 字段表包含 `name` / `label` / `type` / `required` / `desc` / `example`
- [ ] 缺少原始描述的字段明确标记“待后端确认”
- [ ] 文档注明请求体兼容 JSON 与 `application/x-www-form-urlencoded`

---

_步骤 7 完成 → 进 `06-verify.md`。_
