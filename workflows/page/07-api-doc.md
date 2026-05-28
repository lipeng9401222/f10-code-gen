# page/07-api-doc · 生成后端联调版接口文档（v0.4.2）

> **目的**：页面 / 应用创建完成后，根据 `generated_urls`、mock handlers、页面配置和 `intent.fields` 生成可用于后端开发与联调的 Markdown + JSON 接口文档。

---

## 输入

- `intent_resolved`
- `generated_urls`（来自 `03-generate.md`）
- `mock_generated` 与 `url_consistency`（来自 `04-mock.md`）
- 生成的 mock 文件或业务中间件 handlers
- 可选：页面配置源，如 `MODULE_CONFIGS`、`ACTION_FORM_CONFIGS`

---

## 模式判断

### 单页面模式

满足以下任一条件时走单页面模式：
- 只有 1 个页面 / 1 个业务 baseUrl
- 只有 1 个 mock 文件
- 输出文档语义明确是某个页面

输出：

```text
<component_package>/docs/api/<module>/<appName>.md
<component_package>/docs/api/<module>/<appName>.api.json
```

### 多页面套件模式

满足以下任一条件时走 suite mode：
- 一次生成多个页面
- 存在多个 mock 文件
- 存在多个业务 baseUrl，如 `/api/ipd/requirement`、`/api/ipd/task-mgmt`
- 存在公共 options、动作弹窗、看板指标等跨页面接口

输出仍放在同一目录，但 Markdown 必须按页面 / 模块分章：

```text
<component_package>/docs/api/<module>/<suiteName>.md
<component_package>/docs/api/<module>/<suiteName>.api.json
```

---

## 字段来源

字段按以下顺序合并，后者只能补充，不能覆盖更明确的来源：

1. `intent.fields`
2. 页面配置：`MODULE_CONFIGS.columns`、`filters`、`searchFields`、`formFields`、`detailFields`、`detailLists`、`extraLists`、`optionModels`
3. 动作配置：`ACTION_FORM_CONFIGS.fields`、`submitUrl`、`addUrl`、`detailUrl`
4. mock 返回对象字段
5. URL 分类推断字段，如分页、主键、批量主键、操作结果

字段标准结构：

```ts
type ApiField = {
  name: string;
  label: string;
  type: string;
  required: boolean;
  desc: string;
  descSource: 'intent' | 'config' | 'mock' | 'generated';
  sources: string[];
  options?: Array<{ label: string; value: string | number | boolean }>;
  example: unknown;
  children?: ApiField[];
};
```

缺少描述时只能按字段名 / 类型生成保守描述，并标记“待后端确认”。

---

## 接口分类

从 URL 后缀推导接口用途：

| 后缀 / 形态 | 名称 | 请求字段 | 响应字段 |
| --- | --- | --- | --- |
| `/list`、`*List` | 分页列表 / 子列表 | `current`、`pageSize`、`conditions` + filters/searchFields | columns/detailFields/mock list fields |
| `/tree`、`/treeList` | 树数据 | 可选筛选字段 | `value`、`label`、`children` |
| `/*Options`、`/common/*Options` | 选项数据 | 空对象或筛选字段 | `label`、`value`，options 取 mock 示例 |
| `/info`、`/detail`、`*Detail` | 详情 | `id` | detailFields/formFields/mock detail fields |
| `/data`、`*Data` | 看板 / 指标数据 | 空对象或筛选字段 | mock 返回对象字段 |
| `/add`、`add*` | 新增 / 动作新增 | formFields 或 ACTION_FORM_CONFIGS.fields | `state`、`message` |
| `/update`、`update*` | 更新 / 动作更新 | `id` + formFields 或 ACTION_FORM_CONFIGS.fields | `state`、`message` |
| `/delete`、`delete*` | 删除 | `id` | `state`、`message` |
| `/batchDelete` | 批量删除 | `ids` | `state`、`message` |

未命中固定后缀时，按 mock handler、动作配置和字段来源生成自定义接口，不能只写接口名。

---

## Markdown 必须包含

```md
# <页面 / 套件> 接口文档

## 基本信息
- 模块
- 页面 / 应用
- 文档模式：single / suite
- 请求前缀
- 接口数量
- 请求体：JSON 或 application/x-www-form-urlencoded
- 字段来源

## 字段覆盖率

## 接口列表

## 接口详情
### 1. <接口名>
- Method
- URL
- 模块
- 字段来源
- Request 字段表
- Request 示例
- Response 字段表
- Response 示例
```

禁止只写“通用请求 / 通用响应”。每个接口都必须有独立 Request / Response。

---

## JSON 必须包含

```json
{
  "module": "<module>",
  "appName": "<appName>",
  "basePath": "/api/<module>",
  "bodyParser": "json_and_form_encoded",
  "generationMode": "in_flow_single | in_flow_suite | standalone_single | standalone_suite",
  "mode": "single | suite",
  "mockCoverage": {
    "scanned": 0,
    "documented": 0,
    "percent": 100
  },
  "fieldCoverage": {
    "total": 0,
    "withDesc": 0,
    "generatedDesc": 0,
    "percent": 0,
    "bySource": {}
  },
  "fields": [],
  "interfaces": [
    {
      "method": "post",
      "url": "/api/module/app/list",
      "name": "分页列表",
      "moduleKey": "app",
      "moduleTitle": "页面名称",
      "fieldSources": ["intent", "config", "mock"],
      "request": {
        "fields": [],
        "example": { "params": {} }
      },
      "response": {
        "fields": [],
        "example": { "data": [], "total": 0 }
      }
    }
  ]
}
```

---

## 硬性校验

生成完成前必须检查：

- [ ] Markdown 与 JSON 都已生成
- [ ] `interfaces.length` 与 mock / `generated_urls` 中业务接口数量一致
- [ ] suite mode 下接口按页面 / 模块分章
- [ ] 每个接口都有 `request.fields`、`request.example`、`response.fields`、`response.example`
- [ ] 每个字段都有 `name`、`label`、`type`、`required`、`desc`、`example`、`sources`
- [ ] 缺少原始描述的字段明确标记“待后端确认”
- [ ] 字段覆盖率按真实字段计算，不允许只写总数
- [ ] 文档注明请求体兼容 JSON 与 `application/x-www-form-urlencoded`

任一校验失败，接口文档不能算完成，必须回到 mock / 字段来源补齐。

---

## CLI 兜底

老项目或已生成 mock 可直接运行：

```bash
npx epoint-f10code-gen gen-api-doc <mock-file|mock-dir> \
  --config <src/views/.../config.js> \
  --api-prefix /api/<module>
```

目录输入自动进入 suite mode；`--api-prefix` 用于只收集业务接口，避免把 `/resourceaction/*`、`/auth/*`、`/themedataaction/*` 等框架端点写进业务文档。

---

## 输出契约

```yaml
api_doc_generated:
  markdown: <component_package>/docs/api/<module>/<appName>.md
  json: <component_package>/docs/api/<module>/<appName>.api.json
  mode: single | suite
  interface_count: <number>
  field_coverage:
    total: <number>
    with_desc: <number>
    generated_desc: <number>
    percent: <number>
```

---

_步骤 7 完成 → 进 `06-verify.md`。_
