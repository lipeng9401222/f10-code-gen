# order 接口文档

> 生成方式：standalone_single
> 生成时间：2026-05-28 10:50:09

> 注：7 个字段描述由字段名或 mock 结构推断，已标记“待后端确认”。

## 基本信息

- **模块**：demo
- **页面 / 应用**：order
- **文档模式**：single
- **请求前缀**：`/api/demo/order`
- **接口数量**：6
- **请求体格式**：JSON 或 `application/x-www-form-urlencoded`（F10 `Utils.request` / `Utils.requestAxios` 兼容）
- **字段来源**：config: 8，mock: 8

## 字段覆盖率

- **覆盖率**：53%（8/15）
- **说明**：`config` / `intent` 来源字段视为已有业务描述；`mock` / `generated` 来源字段需后端联调确认。

## 接口列表

| 方法 | URL | 说明 | 字段来源 |
| --- | --- | --- | --- |
| `POST` | `/api/demo/order/list` | 分页列表 | config, mock |
| `POST` | `/api/demo/order/info` | 详情 | config, mock |
| `POST` | `/api/demo/order/add` | 新增 | mock, config |
| `POST` | `/api/demo/order/update` | 更新 | config, mock |
| `POST` | `/api/demo/order/delete` | 删除 | config |
| `POST` | `/api/demo/order/statusOptions` | 选项数据 | config |

## 接口详情

### 1. 分页列表

- **Method**：`POST`
- **URL**：`/api/demo/order/list`
- **模块**：order
- **字段来源**：config, mock

**Request 字段**

| 字段 | 名称 | 类型 | 必填 | 描述 | 示例 | 选项 | 来源 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `current` | 当前页 | number | 否 | 当前页，类型：number | `1` | - | config |
| `pageSize` | 每页条数 | number | 否 | 每页条数，类型：number | `10` | - | config |
| `conditions` | 查询条件 | array | 否 | 查询条件，类型：array | `[]` | - | config |

**Request 示例**

```json
{
  "params": {
    "current": 1,
    "pageSize": 10,
    "logicOperator": "and",
    "conditions": []
  }
}
```

**Response 字段**

| 字段 | 名称 | 类型 | 必填 | 描述 | 示例 | 选项 | 来源 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `id` | 主键 | id | 否 | 主键，类型：id（待后端确认） | `<id>` | - | mock |
| `name` | 名称 | text | 否 | 名称，类型：text（待后端确认） | `<text>` | - | mock |
| `amount` | 金额 | amount | 否 | 金额，类型：amount（待后端确认） | `0` | - | mock |
| `status` | 状态 | enum | 否 | 状态，类型：enum（待后端确认） | `<enum>` | - | mock |
| `customerName` | 名称 | text | 否 | 名称，类型：text（待后端确认） | `<text>` | - | mock |
| `customerPhone` | 电话 | phone | 否 | 电话，类型：phone（待后端确认） | `13900000000` | - | mock |
| `createTime` | 时间 | datetime | 否 | 时间，类型：datetime（待后端确认） | `2026-05-28 12:00:00` | - | mock |
| `remark` | 说明 | text | 否 | 说明，类型：text（待后端确认） | `<text>` | - | mock |

**Response 示例**

```json
{
  "data": [
    {
      "id": "<id>",
      "name": "<text>",
      "amount": 0,
      "status": "<enum>",
      "customerName": "<text>",
      "customerPhone": "13900000000",
      "createTime": "2026-05-28 12:00:00",
      "remark": "<text>"
    }
  ],
  "total": 0
}
```

### 2. 详情

- **Method**：`POST`
- **URL**：`/api/demo/order/info`
- **模块**：order
- **字段来源**：config, mock

**Request 字段**

| 字段 | 名称 | 类型 | 必填 | 描述 | 示例 | 选项 | 来源 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `id` | 主键 | id | 是 | 主键，类型：id | `<id>` | - | config |

**Request 示例**

```json
{
  "params": {
    "id": "<id>"
  }
}
```

**Response 字段**

| 字段 | 名称 | 类型 | 必填 | 描述 | 示例 | 选项 | 来源 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `id` | 主键 | id | 否 | 主键，类型：id（待后端确认） | `<id>` | - | mock |
| `name` | 名称 | text | 否 | 名称，类型：text（待后端确认） | `<text>` | - | mock |
| `amount` | 金额 | amount | 否 | 金额，类型：amount（待后端确认） | `0` | - | mock |
| `status` | 状态 | enum | 否 | 状态，类型：enum（待后端确认） | `<enum>` | - | mock |
| `customerName` | 名称 | text | 否 | 名称，类型：text（待后端确认） | `<text>` | - | mock |
| `customerPhone` | 电话 | phone | 否 | 电话，类型：phone（待后端确认） | `13900000000` | - | mock |
| `createTime` | 时间 | datetime | 否 | 时间，类型：datetime（待后端确认） | `2026-05-28 12:00:00` | - | mock |
| `remark` | 说明 | text | 否 | 说明，类型：text（待后端确认） | `<text>` | - | mock |

**Response 示例**

```json
{
  "state": true,
  "data": {
    "id": "<id>",
    "name": "<text>",
    "amount": 0,
    "status": "<enum>",
    "customerName": "<text>",
    "customerPhone": "13900000000",
    "createTime": "2026-05-28 12:00:00",
    "remark": "<text>"
  }
}
```

### 3. 新增

- **Method**：`POST`
- **URL**：`/api/demo/order/add`
- **模块**：order
- **字段来源**：mock, config

**Request 字段**

| 字段 | 名称 | 类型 | 必填 | 描述 | 示例 | 选项 | 来源 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `name` | 名称 | text | 否 | 名称，类型：text（待后端确认） | `<text>` | - | mock |
| `amount` | 金额 | amount | 否 | 金额，类型：amount（待后端确认） | `0` | - | mock |
| `status` | 状态 | enum | 否 | 状态，类型：enum（待后端确认） | `<enum>` | - | mock |
| `customerName` | 名称 | text | 否 | 名称，类型：text（待后端确认） | `<text>` | - | mock |
| `customerPhone` | 电话 | phone | 否 | 电话，类型：phone（待后端确认） | `13900000000` | - | mock |
| `createTime` | 时间 | datetime | 否 | 时间，类型：datetime（待后端确认） | `2026-05-28 12:00:00` | - | mock |
| `remark` | 说明 | text | 否 | 说明，类型：text（待后端确认） | `<text>` | - | mock |

**Request 示例**

```json
{
  "params": {
    "name": "<text>",
    "amount": 0,
    "status": "<enum>",
    "customerName": "<text>",
    "customerPhone": "13900000000",
    "createTime": "2026-05-28 12:00:00",
    "remark": "<text>"
  }
}
```

**Response 字段**

| 字段 | 名称 | 类型 | 必填 | 描述 | 示例 | 选项 | 来源 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `state` | 操作状态 | boolean | 否 | 操作状态，类型：boolean | `true` | - | config |
| `message` | 提示信息 | text | 否 | 提示信息，类型：text | `操作成功` | - | config |

**Response 示例**

```json
{
  "state": true,
  "message": "操作成功"
}
```

### 4. 更新

- **Method**：`POST`
- **URL**：`/api/demo/order/update`
- **模块**：order
- **字段来源**：config, mock

**Request 字段**

| 字段 | 名称 | 类型 | 必填 | 描述 | 示例 | 选项 | 来源 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `id` | 主键 | id | 是 | 主键，类型：id | `<id>` | - | config |
| `name` | 名称 | text | 否 | 名称，类型：text（待后端确认） | `<text>` | - | mock |
| `amount` | 金额 | amount | 否 | 金额，类型：amount（待后端确认） | `0` | - | mock |
| `status` | 状态 | enum | 否 | 状态，类型：enum（待后端确认） | `<enum>` | - | mock |
| `customerName` | 名称 | text | 否 | 名称，类型：text（待后端确认） | `<text>` | - | mock |
| `customerPhone` | 电话 | phone | 否 | 电话，类型：phone（待后端确认） | `13900000000` | - | mock |
| `createTime` | 时间 | datetime | 否 | 时间，类型：datetime（待后端确认） | `2026-05-28 12:00:00` | - | mock |
| `remark` | 说明 | text | 否 | 说明，类型：text（待后端确认） | `<text>` | - | mock |

**Request 示例**

```json
{
  "params": {
    "id": "<id>",
    "name": "<text>",
    "amount": 0,
    "status": "<enum>",
    "customerName": "<text>",
    "customerPhone": "13900000000",
    "createTime": "2026-05-28 12:00:00",
    "remark": "<text>"
  }
}
```

**Response 字段**

| 字段 | 名称 | 类型 | 必填 | 描述 | 示例 | 选项 | 来源 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `state` | 操作状态 | boolean | 否 | 操作状态，类型：boolean | `true` | - | config |
| `message` | 提示信息 | text | 否 | 提示信息，类型：text | `操作成功` | - | config |

**Response 示例**

```json
{
  "state": true,
  "message": "操作成功"
}
```

### 5. 删除

- **Method**：`POST`
- **URL**：`/api/demo/order/delete`
- **模块**：order
- **字段来源**：config

**Request 字段**

| 字段 | 名称 | 类型 | 必填 | 描述 | 示例 | 选项 | 来源 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `id` | 主键 | id | 是 | 主键，类型：id | `<id>` | - | config |

**Request 示例**

```json
{
  "params": {
    "id": "<id>"
  }
}
```

**Response 字段**

| 字段 | 名称 | 类型 | 必填 | 描述 | 示例 | 选项 | 来源 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `state` | 操作状态 | boolean | 否 | 操作状态，类型：boolean | `true` | - | config |
| `message` | 提示信息 | text | 否 | 提示信息，类型：text | `操作成功` | - | config |

**Response 示例**

```json
{
  "state": true,
  "message": "操作成功"
}
```

### 6. 选项数据

- **Method**：`POST`
- **URL**：`/api/demo/order/statusOptions`
- **模块**：order
- **字段来源**：config

**Request 字段**

| 字段 | 名称 | 类型 | 必填 | 描述 | 示例 | 选项 | 来源 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| - | - | - | - | - | - |

**Request 示例**

```json
{
  "params": {}
}
```

**Response 字段**

| 字段 | 名称 | 类型 | 必填 | 描述 | 示例 | 选项 | 来源 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `label` | 显示文本 | text | 否 | 显示文本，类型：text | `待处理` | - | config |
| `value` | 选项值 | text | 否 | 选项值，类型：text | `pending` | - | config |

**Response 示例**

```json
{
  "data": [
    {
      "label": "待处理",
      "value": "pending"
    }
  ]
}
```


---

_修改后端实现时，请同步更新本文档与同名 `*.api.json`。_
