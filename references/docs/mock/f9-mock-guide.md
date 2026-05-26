# F9 Mock 指南

本文档面向 F10 接口 mock 编写。

当前 `@epframe/mock-server` 已内置 4 个 F9 helper：

- `parseF9Request`
- `f9Success`
- `mockControlValue`
- `mockAllControls`

## 1. F9 请求和响应特点

F9 常见请求体包含：

- `commonDto`
  控件定义，通常是 JSON 字符串
- `cmdParams`
  命令参数，通常是 JSON 字符串
- `ctrls`
  当前提交控件值

当前 helper 的能力边界是：

- `parseF9Request` 只负责解析 `commonDto` 和 `cmdParams`
- 如果你需要读取实际提交的控件值，仍然要自己查看 `req.body.ctrls`

## 2. 导入方式

```ts
import { parseF9Request, f9Success, mockControlValue, mockAllControls } from '@epframe/mock-server';
```

## 3. `parseF9Request(body)`

返回值结构：

```ts
interface ParsedF9Request {
    raw: Record<string, any>;
    controls: F9Control[];
    cmdParams: Record<string, any>;
    controlIds: Set<string>;
    getControl(id: string): F9Control | undefined;
    hasControl(id: string): boolean;
}
```

示例：

```ts
handler(req, res) {
  const parsed = parseF9Request(req.body)
  const { controls, cmdParams, getControl, hasControl } = parsed

  const nameControl = getControl('username')

  if (hasControl('status')) {
    // ...
  }
}
```

## 4. `f9Success(controls, custom?)`

用于构建 F9 响应结构。

当前实现返回：

```ts
{
  status: { code: 1, text: '' },
  controls: [...],
  custom: ... | null
}
```

示例：

```ts
f9Success([{ id: 'username', value: '张三' }]);

f9Success([{ id: 'username', value: '张三' }], { message: '加载成功' });
```

## 5. `mockControlValue(control)`

根据控件类型自动生成 mock 数据。

常见类型支持：

| 类型                                            | 返回形式                              |
| ----------------------------------------------- | ------------------------------------- |
| `textbox` / `hidden`                            | `{ value }`                           |
| `textarea`                                      | `{ value }`                           |
| `datepicker` / `datetimepicker`                 | `{ value }`                           |
| `combobox` / `radiobuttonlist` / `checkboxlist` | `{ value, text, data }`               |
| `tree*` / `treeselect*` / `filtertree*`         | `{ data }` 或 `{ value, text, data }` |
| `datagrid` / `treegrid`                         | `{ data, pageIndex, pageSize }`       |
| `upload` / `webuploader`                        | `{ value, data }`                     |

## 6. `mockAllControls(controls)`

为整批控件生成 mock 数据：

```ts
const parsed = parseF9Request(req.body);
const mocked = mockAllControls(parsed.controls);
res.json(f9Success(mocked));
```

## 7. 示例

### 最简自动生成

```ts
import { defineMock, parseF9Request, f9Success, mockAllControls } from '@epframe/mock-server';

export default defineMock([
    {
        url: '/egoshareaddaction/page_load',
        method: 'post',
        handler(req, res) {
            const parsed = parseF9Request(req.body);
            const mocked = mockAllControls(parsed.controls);
            res.json(f9Success(mocked, { message: '加载成功' }));
        }
    }
]);
```

### 部分控件手动覆盖

```ts
import { defineMock, parseF9Request, f9Success, mockControlValue } from '@epframe/mock-server';

export default defineMock([
    {
        url: '/egoshareaddaction/page_load',
        method: 'post',
        handler(req, res) {
            const parsed = parseF9Request(req.body);

            const mocked = parsed.controls.map((ctrl) => {
                if (ctrl.id === 'sharename') {
                    return { id: 'sharename', value: '自定义名称' };
                }
                return mockControlValue(ctrl);
            });

            res.json(f9Success(mocked));
        }
    }
]);
```

### 读取实际提交值

```ts
handler(req, res) {
  const parsed = parseF9Request(req.body)
  const ctrls = Array.isArray(req.body.ctrls) ? req.body.ctrls : []

  const shareName = ctrls.find((item) => item.id === 'sharename')?.value || ''

  res.json(f9Success([], {
    saved: true,
    shareName,
    pageUrl: parsed.cmdParams.pageUrl || ''
  }))
}
```

## 8. 何时使用 helper

适合：

- F9 页面初始化类接口
- 表单控件回填
- 控件结构比较标准、需要快速出 mock 的接口

不适合：

- 你需要完全模拟真实后端复杂行为
- 你必须精确读取 `ctrls` 并自行组织响应

这时直接使用 `handler(req, res)` 自己控制即可。

## 9. 相关文档

- [根入口文档](../README.md)
- [Mock 数据编写手册](./mock-server-user-guide.md)
- [架构文档](./architecture.md)

## ⚠️ 重要说明

### mockAllControls 不是万能的

`mockAllControls` 和 `mockControlValue` **仅用于快速生成符合 F9 格式规范的数据结构**，它们的作用是：

1. **格式正确** - 返回的数据结构符合 F9 控件的响应格式要求
2. **快速原型** - 在开发初期快速搭建可用的 Mock 接口
3. **开发调试** - 让页面能够正常渲染和交互

**它们不能替代真实的业务 Mock**：

- 生成的数据是随机的、无业务含义的（如 `faker.word.noun()` 生成的随机单词）
- DataGrid 的列数据不会按照实际的列定义生成有意义的值
- 树形结构的数据是固定的模拟组织架构，不是真实的业务数据
- 下拉选项是随机生成的，不对应实际的数据字典

**实际开发中**，你需要：

- 根据页面需求自行构造有业务含义的数据
- 对于高仿真 Mock，需要参考真实接口的返回数据
- 使用 `mockAllControls` 生成的数据作为起点，再手动覆盖关键字段
