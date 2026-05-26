---
title: 工具 API
maxTocDepth: 3
originUrl: http://192.168.219.170/docs/vue/latest/frame/api/core/utils/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/api/core/utils/)

在 `@epframe/eui-core` 包中导出的 `Utils` 对象中包含了 [`@epoint-fe/utils`](api-utilities-helpers.md) 包中的所有工具方法和下文列出的框架相关工具方法。

## doOpen

#### 作用

框架统一的打开页面方法。

#### 类型定义

```ts
interface OpenDialogOptions extends Partial<IframeDialogOptions> {
  /** 传递给目标组件的属性 */
  props?: Record<string, unknown>;
  /** Vue 应用上下文（默认当前组件上下文） */
  context?: AppContext;
  /** 是否顶层打开 */
  isTop?: boolean;
}
type DoOpenOptions = {
  url: string;
  openType?: 'tabsnav' | 'dialog' | 'blank';
} & OpenDialogOptions;

function doOpen(options: DoOpenOptions): void;
```

#### 参数

- `options`：打开页面的配置，其中：

  - `url`：要打开页面的地址。
  - `openType`：打开的方式。支持 `tabsnav`、 `dialog` 和 `blank` 三种方式。默认为 `tabsnav`。

  当以 `dialog` 方式打开页面时，还有以下配置：

  - `title`：对话框的标题。
  - `props`：传递给要打开目标组件的属性。
  - `context`：Vue 应用上下文（默认当前组件上下文）。
  - `isTop`：是否顶层打开

  以及 [EDialog 组件 API 方法](http://192.168.219.170/docs/vue/latest/component/component/dialog.html#openIframeDialog) 的所有配置项。

#### 返回值

- 无

#### 示例

```ts
import { Utils } from '@epframe/eui-core';

// tabsnav 方式打开页面
// 该方式专门给主题内使用。该方式只会切换当前路由路径，不会去操作主题的 tabs 标签页。tabs 标签页的操作需要自己去实现
Utils.doOpen({
  url: '/frame-user/list'
});

// 以新浏览器标签页方式打开页面
Utils.doOpen({
  url: '/frame-user/list',
  openType: 'blank'
});

// 以对话框方式打开页面
Utils.doOpen({
  url: '/frame-user/list',
  openType: 'dialog',
  title: '用户列表'
});
```

## openDialog

#### 作用

以对话框的方式打开页面。等价于上面的 `doOpen` 方法将 `openType` 参数设置为 `dialog`。具体用法可以参考 [弹窗方法](../guides/guides-advanced-dialog.md)。

#### 类型定义

```ts
function openDialog(title: string, url: string, options: Partial<DoOpenOptions> = {}): ComponentDialogApi | IframeDialogApi;
```

#### 参数

- `title`：对话框的标题。
- `url`：要打开页面的地址。
- `options`：对话框的配置。

#### 返回值

- 打开 dialog 的 [操作 API](http://192.168.219.170/docs/vue/latest/component/component/dialog.html#openIframeDialog)

#### 示例

```ts
import { Utils } from '@epframe/eui-core';

// 打开路由地址为 /frame-user/list 的组件的弹窗，在关闭时调用回调函数
Utils.openDialog('用户列表', '/frame-user/list', {
  closeCallback: (action) => {
    Utils.logger.info('关闭对话框, 回传值为', action);
  }
});
```

## openTopDialog

#### 作用

在顶层以对话框的方式打开页面。等价于上面的 `openDialog` 方法将 `isTop` 参数设置为 `true`。

#### 类型定义

```ts
function openTopDialog(title: string, url: string, options: Partial<DoOpenOptions> = {}): ComponentDialogApi | IframeDialogApi;
```

## loading

#### 作用

显示/隐藏页面级 loading 效果。

#### 类型定义

```ts
interface loading: {
  show: () => void;
  hide: (time?: number) => void;
}
```

### show

显示页面级 loading。

```ts
import { Utils } from '@epframe/eui-core';

Utils.loading.show();
```

### hide

隐藏页面级 loading。参数 `time` 表示延迟时间，单位为毫秒，默认立即隐藏。

```ts
import { Utils } from '@epframe/eui-core';

// 立即隐藏loading
Utils.loading.hide();
// 1秒后隐藏loading
Utils.loading.hide(1000);
```

## defineDataModel

#### 作用

定义标准数据模型。具体使用参考 [使用编码模型文档](../getting-started/getting-started-use-data-model.md)。

## createSubModel

#### 作用

在数据模型中创建子模型数据。具体使用参考 [使用编码模型-普通子模型](../getting-started/getting-started-use-data-model.md#createSubModel-_pu_tong_zi_mo_xing_)。

## PollingManager

#### 作用

轮询管理器。

#### 类型定义

```ts
class PollingManager {
  constructor(
    refreshFn: () => Promise<void>, // 每次轮询时执行的刷新方法
    frequency: number, // 轮询频率
    config?: {
      onError?: (error: unknown) => void; // 发生错误时的回调
      pauseWhenPageHidden?: boolean; // 当页面被隐藏时是否停止轮询
    }
  );

  wrappedRefresh: async () => Promise<void>; // 包装的刷新函数，当调用时会重置计时器
  startPolling: () => void; // 启动轮询
  stopPolling: () => void; // 停止轮询
  setActiveState: (isActive: boolean) => void; // 设置活跃状态。非活跃状态时完全暂停轮询，活跃状态时恢复轮询
  updatePollingFrequency: (newFrequency: number) => void; // 动态更新轮询频率
  getStatus: () => { // 获取状态信息
    isPolling: boolean; // 是否正在轮询中
    frequency: number; // 轮询频率
    isActive: boolean; // 是否活跃状态
    lastUpdateTime: number; // 上次执行刷新方法的时间
    pauseWhenPageHidden: boolean; // 当页面被隐藏时是否停止轮询
  }
  destroy: () => void; // 销毁轮询管理器，清理资源
}
```

### 构造函数

构造函数有三个参数：

- `refreshFn`：每次轮询时执行的刷新方法。
- `frequency`：轮询频率。
- `config`：轮询管理器的配置，包括 `onError` 发生错误时的回调和 `pauseWhenPageHidden` 当页面被隐藏时是否停止轮询两个配置项。

### wrappedRefresh

包装的刷新函数，当调用时会重置计时器。

### startPolling

启动轮询。

### stopPolling

停止轮询。

### setActiveState

设置活跃状态。非活跃状态时完全暂停轮询，活跃状态时恢复轮询。

### updatePollingFrequency

动态更新轮询频率。

### getStatus

获取轮询管理器的状态信息，包括：

- `isPolling`：是否正在轮询中
- `frequency`：轮询频率
- `isActive`：是否活跃状态
- `lastUpdateTime`：上次执行刷新方法的时间
- `pauseWhenPageHidden`：当页面被隐藏时是否停止轮询

### destroy

销毁轮询管理器，清理资源。

#### 示例

```ts
import { Utils } from '@epframe/eui-core';

const refreshFn = () => {
  console.log('执行刷新方法')
}
const onError = (error) => {
  console.log('发生错误：', error)
}
const pollingManager = new Utils.PollingManager(refreshFn, 100, {
  onError
}); // 创建实例

pollingManager.startPolling(); // 启动轮询
pollingManager.stopPolling(); // 停止轮询
pollingManager.wrappedRefresh(); // 包装后的刷新函数，会重置计时器
pollingManager.setActiveState(false); // 设置活跃状态
pollingManager.updatePollingFrequency(1000); // 动态更新轮询频率
pollingManager.getStatus(); // 获取状态信息
```

## deletePrompt

#### 作用

弹出删除提示框。会根据系统参数 `strong_delete_remind` 配置，来决定使用 [强提醒](http://192.168.219.170/docs/vue/latest/component/component/message-box.html#deleteprompt) 还是 [普通的确认提醒](http://192.168.219.170/docs/vue/latest/component/component/message-box.html#confirm)。

#### 类型定义

```ts
function deletePrompt(options: {
    title?: string;
    message?: string;
    confirmText?: string;
    selectable?: boolean;
    inputErrorMessage: string;
    onConfirm: () => void;
    onCancel: () => void;
}): Promise<MessageBoxData>;
```

#### 参数

- `options`：配置项，包括：
  - `title`：弹框的标题。
  - `message`：提示文本。在强提醒模式下，会自动在后面拼接上 `，请输入 %s 确认`。
  - `confirmText`：强提醒模式下的确认文本。如果不传，会使用 `message` + `，请输入 %s 确认`。
  - `selectable`：强提醒模式下是否允许复制关键字，默认不允许。
  - `inputErrorMessage`：强提醒模式下输错关键字的提示信息，默认为`输入名称不匹配`。
  - `onConfirm`：确认按钮点击回调
  - `onCancel`：取消按钮点击回调

#### 返回值

- 创建的 `EMessageBox` 对象

#### 示例

```ts
import { Utils } from '@epframe/eui-core';

Utils.deletePrompt({
  title: '确认删除',
  message: '即将删除所选记录',
  onConfirm: () => {
    console.log('执行删除操作');
  }
})
```

## isExistRoute

#### 作用

判断系统内是否已注册该路由地址

#### 类型定义

```ts
function isExistRoute(path: string): boolean;
```

#### 参数

- `path`：要判断的路由地址

#### 返回值

- 若路由地址已注册，返回 `true`，否则返回 `false`。

#### 示例

```ts
import { Utils } from '@epframe/eui-core';

Utils.isExistRoute('/frame-user/list'); // true
```

## getSafeResolved

#### 作用

对 [Router.resolve](https://router.vuejs.org/zh/api/interfaces/Router.html#Methods-resolve) 方法的封装。传入带有 query 的 url 不会触发 router 的 parseQuery 逻辑，从而避免触发框架内部对 query 参数的加密操作。

#### 类型定义

```ts
function getSafeResolved(urlOrObj: string | RouteLocationRaw): RouteLocationResolved;
```

#### 参数

- `urlOrObj`：要处理的路由，可以直接传一个路由地址字符串，也可以是一个路由对象。

#### 返回值

- 返回一个路由地址的规范化版本

#### 示例

```ts
import { Utils } from '@epframe/eui-core';

const resolved = Utils.getSafeResolved('/frame-user/list');

console.log('路由完整地址：', resolved.fullPath);
```

## defineSetup

#### 作用

创建组件包的 setup 方法的工具方法。具体使用请参考 [setup API](api-core-setup.md)。

## getSharedParams

#### 作用

获取共享参数。该方法会挂载到全局对象 `app.config.globalProperties.$getSharedParams` 上。

#### 类型定义

```ts
function getSharedParams(isF9?: boolean): Record<string, unknown>;
```

#### 参数

- `isF9`：是否是 F9 页面。在 F9 页面中调用需要设置成 `true`。

#### 返回值

- 当前页面设置的共享参数值。

#### 示例

```ts
import { Utils } from '@epframe/eui-core';

const shareParams = Utils.getSharedParams();
```

## setSharedParams

#### 作用

设置共享参数。该方法会挂载到全局对象 `app.config.globalProperties.$setSharedParams` 上。

#### 类型定义

```ts
function setSharedParams(params: Record<string, unknown>, isF9?: boolean): void;
```

#### 参数

- `params`：要设置的共享参数值。
- `isF9`：是否是 F9 页面。在 F9 页面中调用需要设置成 `true`。

#### 返回值

- 无。

#### 示例

```ts
import { Utils } from '@epframe/eui-core';

Utils.setSharedParams({
  a: 1
});
```

## clearSharedParams

#### 作用

清除共享参数。该方法会挂载到全局对象 `app.config.globalProperties.$clearSharedParams` 上。

#### 类型定义

```ts
function clearSharedParams(isF9?: boolean): void;
```

#### 参数

- `isF9`：是否是 F9 页面。在 F9 页面中调用需要设置成 `true`。

#### 返回值

- 无。

#### 示例

```ts
import { Utils } from '@epframe/eui-core';

Utils.clearSharedParams();
```

## getRootRelativePath

#### 作用

获得根路径相对地址，以'/'开头。

#### 类型定义

```ts
function getRightRoutePath(url: string): string;
```

#### 参数

- `url`：要处理的地址

#### 返回值

- 根路径相对地址

#### 示例

```ts
import { Utils } from '@epframe/eui-core';

Utils.getRightRoutePath('/frame-user/list'); // /epoint-web/home/frame-user/list
```

## getFrontUrl

#### 作用

获得前端路由地址。

#### 类型定义

```ts
function getFrontUrl(url: string): string;
```

#### 参数

- `url`：要处理的地址

#### 返回值

- 若 url 为绝对路径则返回原 url，否则返回项目基础路径（basePath）拼接后的 url。

#### 示例

```ts
import { Utils } from '@epframe/eui-core';

Utils.getFrontUrl('/frame-user/list'); // http://localhost:5173/epoint-web/home/frame-user/list
```

## getCorrectUrl

#### 作用

获得正确的地址。

#### 类型定义

```ts
function getCorrectUrl(url: string): string;
```

#### 参数

- `url`：要处理的地址

#### 返回值

- 会根据 url 是否注册到路由中，若未注册，则调用 [getRightUrl](api-utilities-helpers.md#getRightUrl) 处理。若已注册，则调用 [getFrontUrl](#getFrontUrl) 处理。

#### 示例

```ts
import { Utils } from '@epframe/eui-core';

// 注册过的路由地址
Utils.getCorrectUrl('/frame-user/list'); // http://localhost:5173/epoint-web/home/frame-user/list

// 未注册过的路由地址
Utils.getCorrectUrl('/frame-user2/list2'); // http://localhost:5173/epoint-web/frame-user2/list2
```