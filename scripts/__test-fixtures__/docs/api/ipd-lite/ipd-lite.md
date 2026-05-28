# ipd-lite 接口文档

> 生成方式：standalone_suite
> 生成时间：2026-05-28 10:50:09

> 注：6 个字段描述由字段名或 mock 结构推断，已标记“待后端确认”。

## 基本信息

- **模块**：ipd-lite
- **页面 / 应用**：ipd-lite
- **文档模式**：suite
- **请求前缀**：`/api/ipd-lite`
- **接口数量**：15
- **请求体格式**：JSON 或 `application/x-www-form-urlencoded`（F10 `Utils.request` / `Utils.requestAxios` 兼容）
- **字段来源**：mock: 18，config: 20

## 字段覆盖率

- **覆盖率**：77%（20/26）
- **说明**：`config` / `intent` 来源字段视为已有业务描述；`mock` / `generated` 来源字段需后端联调确认。

## 接口列表

| 模块 | 方法 | URL | 说明 | 字段来源 |
| --- | --- | --- | --- | --- |
| dashboard | `POST` | `/api/ipd-lite/dashboard/data` | data数据 | mock |
| common | `POST` | `/api/ipd-lite/common/personOptions` | 选项数据 | config |
| 需求管理 | `POST` | `/api/ipd-lite/requirement/list` | 分页列表 | config, mock |
| 需求管理 | `POST` | `/api/ipd-lite/requirement/detail` | 详情 | config, mock |
| 需求管理 | `POST` | `/api/ipd-lite/requirement/add` | 新增 | config |
| 需求管理 | `POST` | `/api/ipd-lite/requirement/update` | 更新 | config |
| 需求管理 | `POST` | `/api/ipd-lite/requirement/delete` | 删除 | config |
| 需求管理 | `POST` | `/api/ipd-lite/requirement/batchDelete` | 批量删除 | config |
| 需求管理 | `POST` | `/api/ipd-lite/requirement/feedbackStatusOptions` | feedbackStatusOptions | config |
| 需求管理 | `POST` | `/api/ipd-lite/requirement/sourceOptions` | sourceOptions | config |
| TR/DCP评审 | `POST` | `/api/ipd-lite/trdcp-review/stageList` | 阶段列表 | config, mock |
| TR/DCP评审 | `POST` | `/api/ipd-lite/trdcp-review/stageDetail` | 阶段配置 | config, mock |
| TR/DCP评审 | `POST` | `/api/ipd-lite/trdcp-review/addStage` | 阶段配置 | config |
| TR/DCP评审 | `POST` | `/api/ipd-lite/trdcp-review/updateStage` | 阶段配置 | config |
| TR/DCP评审 | `POST` | `/api/ipd-lite/trdcp-review/deleteStage` | 删除 | config |

## 接口详情

## dashboard

| 方法 | URL | 说明 | 字段来源 |
| --- | --- | --- | --- |
| `POST` | `/api/ipd-lite/dashboard/data` | data数据 | mock |

### 1. data数据

- **Method**：`POST`
- **URL**：`/api/ipd-lite/dashboard/data`
- **模块**：dashboard
- **字段来源**：mock

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
| `requirementTotal` | 数量 | number | 否 | 数量，类型：number（待后端确认） | `0` | - | mock |
| `requirementCompleted` | 数量 | number | 否 | 数量，类型：number（待后端确认） | `0` | - | mock |
| `taskTotal` | 数量 | number | 否 | 数量，类型：number（待后端确认） | `0` | - | mock |
| `taskCompleted` | 数量 | number | 否 | 数量，类型：number（待后端确认） | `0` | - | mock |
| `onTimeRate` | 数量 | number | 否 | 数量，类型：number（待后端确认） | `0` | - | mock |

**Response 示例**

```json
{
  "requirementTotal": 0,
  "requirementCompleted": 0,
  "taskTotal": 0,
  "taskCompleted": 0,
  "onTimeRate": 0
}
```


## common

| 方法 | URL | 说明 | 字段来源 |
| --- | --- | --- | --- |
| `POST` | `/api/ipd-lite/common/personOptions` | 选项数据 | config |

### 1. 选项数据

- **Method**：`POST`
- **URL**：`/api/ipd-lite/common/personOptions`
- **模块**：common
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
| `label` | 显示文本 | text | 否 | 显示文本，类型：text | `张三` | - | config |
| `value` | 选项值 | text | 否 | 选项值，类型：text | `zhangsan` | - | config |

**Response 示例**

```json
{
  "data": [
    {
      "label": "张三",
      "value": "zhangsan"
    }
  ]
}
```


## 需求管理

| 方法 | URL | 说明 | 字段来源 |
| --- | --- | --- | --- |
| `POST` | `/api/ipd-lite/requirement/list` | 分页列表 | config, mock |
| `POST` | `/api/ipd-lite/requirement/detail` | 详情 | config, mock |
| `POST` | `/api/ipd-lite/requirement/add` | 新增 | config |
| `POST` | `/api/ipd-lite/requirement/update` | 更新 | config |
| `POST` | `/api/ipd-lite/requirement/delete` | 删除 | config |
| `POST` | `/api/ipd-lite/requirement/batchDelete` | 批量删除 | config |
| `POST` | `/api/ipd-lite/requirement/feedbackStatusOptions` | feedbackStatusOptions | config |
| `POST` | `/api/ipd-lite/requirement/sourceOptions` | sourceOptions | config |

### 1. 分页列表

- **Method**：`POST`
- **URL**：`/api/ipd-lite/requirement/list`
- **模块**：需求管理
- **字段来源**：config, mock

**Request 字段**

| 字段 | 名称 | 类型 | 必填 | 描述 | 示例 | 选项 | 来源 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `current` | 当前页 | number | 否 | 当前页，类型：number | `1` | - | config |
| `pageSize` | 每页条数 | number | 否 | 每页条数，类型：number | `10` | - | config |
| `conditions` | 查询条件 | array | 否 | 查询条件，类型：array | `[]` | - | config |
| `feedbackStatus` | 反馈状态 | enum | 否 | 反馈状态，类型：enum | `<enum>` | - | config |

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
| `name` | 需求名称 | text | 否 | 需求名称，类型：text | `<text>` | - | config, mock |
| `owner` | 负责人 | text | 否 | 负责人，类型：text | `<text>` | - | config, mock |
| `feedbackStatus` | 反馈状态 | enum | 否 | 反馈状态，类型：enum | `<enum>` | - | config, mock |
| `createTime` | 登记时间 | text | 否 | 登记时间，类型：text | `<text>` | - | config, mock |
| `source` | 需求来源 | enum | 否 | 需求来源，类型：enum | `<enum>` | - | config, mock |
| `content` | 需求内容 | text | 否 | 需求内容，类型：text | `<text>` | - | config |
| `id` | 主键 | id | 否 | 主键，类型：id（待后端确认） | `<id>` | - | mock |

**Response 示例**

```json
{
  "data": [
    {
      "name": "<text>",
      "owner": "<text>",
      "feedbackStatus": "<enum>",
      "createTime": "<text>",
      "source": "<enum>",
      "content": "<text>",
      "id": "<id>"
    }
  ],
  "total": 0
}
```

### 2. 详情

- **Method**：`POST`
- **URL**：`/api/ipd-lite/requirement/detail`
- **模块**：需求管理
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
| `name` | 需求名称 | text | 是 | 需求名称，类型：text | `<text>` | - | config, mock |
| `owner` | 负责人 | enum | 是 | 负责人，类型：enum | `zhangsan` | 张三:zhangsan, 李四:lisi | config, mock |
| `feedbackStatus` | 反馈状态 | enum | 否 | 反馈状态，类型：enum | `<enum>` | - | config, mock |
| `source` | 需求来源 | enum | 否 | 需求来源，类型：enum | `<enum>` | - | config, mock |
| `content` | 需求内容 | text | 是 | 需求内容，类型：text | `<text>` | - | config, mock |
| `id` | 主键 | id | 否 | 主键，类型：id（待后端确认） | `<id>` | - | mock |
| `feedbackList` | 列表 | array | 否 | 列表，类型：array（待后端确认） | `[]` | - | mock |

**Response 示例**

```json
{
  "name": "<text>",
  "owner": "zhangsan",
  "feedbackStatus": "<enum>",
  "source": "<enum>",
  "content": "<text>",
  "id": "<id>",
  "feedbackList": []
}
```

### 3. 新增

- **Method**：`POST`
- **URL**：`/api/ipd-lite/requirement/add`
- **模块**：需求管理
- **字段来源**：config

**Request 字段**

| 字段 | 名称 | 类型 | 必填 | 描述 | 示例 | 选项 | 来源 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `name` | 需求名称 | text | 是 | 需求名称，类型：text | `<text>` | - | config |
| `owner` | 负责人 | enum | 是 | 负责人，类型：enum | `zhangsan` | 张三:zhangsan, 李四:lisi | config |
| `source` | 需求来源 | enum | 否 | 需求来源，类型：enum | `<enum>` | - | config |
| `content` | 需求内容 | text | 是 | 需求内容，类型：text | `<text>` | - | config |

**Request 示例**

```json
{
  "params": {
    "name": "<text>",
    "owner": "zhangsan",
    "source": "<enum>",
    "content": "<text>"
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
- **URL**：`/api/ipd-lite/requirement/update`
- **模块**：需求管理
- **字段来源**：config

**Request 字段**

| 字段 | 名称 | 类型 | 必填 | 描述 | 示例 | 选项 | 来源 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `id` | 主键 | id | 是 | 主键，类型：id | `<id>` | - | config |
| `name` | 需求名称 | text | 是 | 需求名称，类型：text | `<text>` | - | config |
| `owner` | 负责人 | enum | 是 | 负责人，类型：enum | `zhangsan` | 张三:zhangsan, 李四:lisi | config |
| `source` | 需求来源 | enum | 否 | 需求来源，类型：enum | `<enum>` | - | config |
| `content` | 需求内容 | text | 是 | 需求内容，类型：text | `<text>` | - | config |

**Request 示例**

```json
{
  "params": {
    "id": "<id>",
    "name": "<text>",
    "owner": "zhangsan",
    "source": "<enum>",
    "content": "<text>"
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
- **URL**：`/api/ipd-lite/requirement/delete`
- **模块**：需求管理
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

### 6. 批量删除

- **Method**：`POST`
- **URL**：`/api/ipd-lite/requirement/batchDelete`
- **模块**：需求管理
- **字段来源**：config

**Request 字段**

| 字段 | 名称 | 类型 | 必填 | 描述 | 示例 | 选项 | 来源 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `ids` | 主键集合 | array | 是 | 主键集合，类型：array | `["<id1>","<id2>"]` | - | config |

**Request 示例**

```json
{
  "params": {
    "ids": [
      "<id1>",
      "<id2>"
    ]
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

### 7. feedbackStatusOptions

- **Method**：`POST`
- **URL**：`/api/ipd-lite/requirement/feedbackStatusOptions`
- **模块**：需求管理
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
| `label` | 显示文本 | text | 否 | 显示文本，类型：text | `处理中` | - | config |
| `value` | 选项值 | text | 否 | 选项值，类型：text | `processing` | - | config |

**Response 示例**

```json
{
  "data": [
    {
      "label": "处理中",
      "value": "processing"
    }
  ]
}
```

### 8. sourceOptions

- **Method**：`POST`
- **URL**：`/api/ipd-lite/requirement/sourceOptions`
- **模块**：需求管理
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
| `label` | 显示文本 | text | 否 | 显示文本，类型：text | `业务部门` | - | config |
| `value` | 选项值 | text | 否 | 选项值，类型：text | `business` | - | config |

**Response 示例**

```json
{
  "data": [
    {
      "label": "业务部门",
      "value": "business"
    }
  ]
}
```


## TR/DCP评审

| 方法 | URL | 说明 | 字段来源 |
| --- | --- | --- | --- |
| `POST` | `/api/ipd-lite/trdcp-review/stageList` | 阶段列表 | config, mock |
| `POST` | `/api/ipd-lite/trdcp-review/stageDetail` | 阶段配置 | config, mock |
| `POST` | `/api/ipd-lite/trdcp-review/addStage` | 阶段配置 | config |
| `POST` | `/api/ipd-lite/trdcp-review/updateStage` | 阶段配置 | config |
| `POST` | `/api/ipd-lite/trdcp-review/deleteStage` | 删除 | config |

### 1. 阶段列表

- **Method**：`POST`
- **URL**：`/api/ipd-lite/trdcp-review/stageList`
- **模块**：TR/DCP评审
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
| `stageName` | 阶段名称 | text | 否 | 阶段名称，类型：text | `<text>` | - | config, mock |
| `reviewType` | 评审类型 | text | 否 | 评审类型，类型：text | `<text>` | - | config, mock |
| `startDate` | 开始日期 | text | 否 | 开始日期，类型：text | `<text>` | - | config, mock |
| `endDate` | 结束日期 | text | 否 | 结束日期，类型：text | `<text>` | - | config, mock |
| `attendees` | 参会人 | text | 否 | 参会人，类型：text | `<text>` | - | config, mock |
| `id` | 主键 | id | 否 | 主键，类型：id（待后端确认） | `<id>` | - | mock |

**Response 示例**

```json
{
  "data": [
    {
      "stageName": "<text>",
      "reviewType": "<text>",
      "startDate": "<text>",
      "endDate": "<text>",
      "attendees": "<text>",
      "id": "<id>"
    }
  ],
  "total": 0
}
```

### 2. 阶段配置

- **Method**：`POST`
- **URL**：`/api/ipd-lite/trdcp-review/stageDetail`
- **模块**：TR/DCP评审
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
| `stageName` | 阶段名称 | text | 是 | 阶段名称，类型：text | `<text>` | - | config, mock |
| `reviewType` | 评审类型 | text | 是 | 评审类型，类型：text | `<text>` | TR:TR, DCP:DCP | config, mock |
| `startDate` | 开始日期 | text | 是 | 开始日期，类型：text | `<text>` | - | config, mock |
| `endDate` | 结束日期 | text | 是 | 结束日期，类型：text | `<text>` | - | config, mock |
| `attendees` | 参会人 | text | 是 | 参会人，类型：text | `<text>` | - | config, mock |
| `id` | 主键 | id | 否 | 主键，类型：id（待后端确认） | `<id>` | - | mock |

**Response 示例**

```json
{
  "stageName": "<text>",
  "reviewType": "<text>",
  "startDate": "<text>",
  "endDate": "<text>",
  "attendees": "<text>",
  "id": "<id>"
}
```

### 3. 阶段配置

- **Method**：`POST`
- **URL**：`/api/ipd-lite/trdcp-review/addStage`
- **模块**：TR/DCP评审
- **字段来源**：config

**Request 字段**

| 字段 | 名称 | 类型 | 必填 | 描述 | 示例 | 选项 | 来源 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `stageName` | 阶段名称 | text | 是 | 阶段名称，类型：text | `<text>` | - | config |
| `reviewType` | 评审类型 | enum | 是 | 评审类型，类型：enum | `TR` | TR:TR, DCP:DCP | config |
| `startDate` | 开始日期 | date | 是 | 开始日期，类型：date | `2026-05-28` | - | config |
| `endDate` | 结束日期 | date | 是 | 结束日期，类型：date | `2026-05-28` | - | config |
| `attendees` | 参会人 | text | 是 | 参会人，类型：text | `<text>` | - | config |

**Request 示例**

```json
{
  "params": {
    "stageName": "<text>",
    "reviewType": "TR",
    "startDate": "2026-05-28",
    "endDate": "2026-05-28",
    "attendees": "<text>"
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

### 4. 阶段配置

- **Method**：`POST`
- **URL**：`/api/ipd-lite/trdcp-review/updateStage`
- **模块**：TR/DCP评审
- **字段来源**：config

**Request 字段**

| 字段 | 名称 | 类型 | 必填 | 描述 | 示例 | 选项 | 来源 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `id` | 主键 | id | 是 | 主键，类型：id | `<id>` | - | config |
| `stageName` | 阶段名称 | text | 是 | 阶段名称，类型：text | `<text>` | - | config |
| `reviewType` | 评审类型 | enum | 是 | 评审类型，类型：enum | `TR` | TR:TR, DCP:DCP | config |
| `startDate` | 开始日期 | date | 是 | 开始日期，类型：date | `2026-05-28` | - | config |
| `endDate` | 结束日期 | date | 是 | 结束日期，类型：date | `2026-05-28` | - | config |
| `attendees` | 参会人 | text | 是 | 参会人，类型：text | `<text>` | - | config |

**Request 示例**

```json
{
  "params": {
    "id": "<id>",
    "stageName": "<text>",
    "reviewType": "TR",
    "startDate": "2026-05-28",
    "endDate": "2026-05-28",
    "attendees": "<text>"
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
- **URL**：`/api/ipd-lite/trdcp-review/deleteStage`
- **模块**：TR/DCP评审
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



---

_修改后端实现时，请同步更新本文档与同名 `*.api.json`。_
