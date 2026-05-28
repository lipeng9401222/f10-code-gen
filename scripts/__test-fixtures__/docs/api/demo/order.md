# order 接口文档

> 生成方式：standalone（mock 反推）（in-flow 走 `workflows/page/07-api-doc.md`，standalone 由 `npx epoint-f10code-gen gen-api-doc <mock-file>` 反推）
> 生成时间：2026-05-28 06:35:23

> 注：8 个字段的描述由字段名 / 类型推断，已标记"待后端确认"。

## 基本信息

- **模块**：demo
- **页面 / 应用**：order
- **请求前缀**：`/api/demo/order`
- **请求体格式**：JSON 或 `application/x-www-form-urlencoded`（F10 `Utils.request` / `Utils.requestAxios` 兼容）
- **响应体格式**：业务接口统一返回 `{ state: boolean, message?: string, data?: any, total?: number }`

## 字段说明

字段覆盖率：0%（`0/8`，描述来自 intent.fields；其余由字段名/类型推断，标注"待后端确认"）

| 字段 | 中文名 | 类型 | 必填 | 描述 | 示例 |
| --- | --- | --- | --- | --- | --- |
| `name` | 名称 | text | 否 | 名称（待后端确认） | `<text>` |
| `amount` | 金额 | amount | 否 | 金额（待后端确认） | `<amount>` |
| `status` | 状态 | enum | 否 | 状态（待后端确认） | `<enum>` |
| `customerName` | 名称 | text | 否 | 名称（待后端确认） | `<text>` |
| `customerPhone` | 电话 | phone | 否 | 电话（待后端确认） | `<phone>` |
| `createTime` | 时间 | datetime | 否 | 时间（待后端确认） | `<datetime>` |
| `remark` | 备注 | text | 否 | 备注（待后端确认） | `<text>` |
| `id` | 主键 | id | 否 | 主键（待后端确认） | `<id>` |

## 接口列表

| 方法 | URL | 说明 |
| --- | --- | --- |
| `POST` | `/api/demo/order/list` | 分页列表 |
| `POST` | `/api/demo/order/info` | 详情 |
| `POST` | `/api/demo/order/add` | 新增 |
| `POST` | `/api/demo/order/update` | 更新 |
| `POST` | `/api/demo/order/delete` | 删除 |
| `POST` | `/api/demo/order/statusOptions` | 选项数据 |

## 接口详情

### 1. 分页列表

- **Method**: `POST`
- **URL**: `/api/demo/order/list`
- **用途**: 分页列表

**Request**:

```json
{
  "params": {
    "current": 1,
    "pageSize": 10,
    "conditions": {}
  }
}
```

**Response**:

```json
{
  "data": [
    {
      "name": "<text>",
      "amount": 0,
      "status": "<enum>",
      "customerName": "<text>",
      "customerPhone": "13900000000",
      "createTime": "2026-05-28 12:00:00",
      "remark": "<text>",
      "id": "<id>"
    }
  ],
  "total": 0
}
```

### 2. 详情

- **Method**: `POST`
- **URL**: `/api/demo/order/info`
- **用途**: 详情

**Request**:

```json
{
  "params": {
    "id": "<id>"
  }
}
```

**Response**:

```json
{
  "state": true,
  "data": {
    "name": "<text>",
    "amount": 0,
    "status": "<enum>",
    "customerName": "<text>",
    "customerPhone": "13900000000",
    "createTime": "2026-05-28 12:00:00",
    "remark": "<text>",
    "id": "<id>"
  }
}
```

### 3. 新增

- **Method**: `POST`
- **URL**: `/api/demo/order/add`
- **用途**: 新增

**Request**:

```json
{
  "params": {
    "name": "<text>",
    "amount": 0,
    "status": "<enum>",
    "customerName": "<text>",
    "customerPhone": "13900000000",
    "createTime": "2026-05-28 12:00:00",
    "remark": "<text>",
    "id": "<id>"
  }
}
```

**Response**:

```json
{
  "state": true,
  "message": "操作成功"
}
```

### 4. 更新

- **Method**: `POST`
- **URL**: `/api/demo/order/update`
- **用途**: 更新

**Request**:

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

**Response**:

```json
{
  "state": true,
  "message": "操作成功"
}
```

### 5. 删除

- **Method**: `POST`
- **URL**: `/api/demo/order/delete`
- **用途**: 删除

**Request**:

```json
{
  "params": {
    "id": "<id>"
  }
}
```

**Response**:

```json
{
  "state": true,
  "message": "操作成功"
}
```

### 6. 选项数据

- **Method**: `POST`
- **URL**: `/api/demo/order/statusOptions`
- **用途**: 选项数据

**Request**:

```json
{
  "params": {}
}
```

**Response**:

```json
{
  "data": [
    {
      "label": "<label>",
      "value": "<value>"
    }
  ]
}
```


---

_本文档由 `epoint-f10code-gen` skill 自动生成。修改后端实现时请同步更新本文档与同名 `*.api.json`。_
