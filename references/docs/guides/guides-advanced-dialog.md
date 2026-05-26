---
title: 弹窗方法
originUrl: http://192.168.219.170/docs/vue/latest/frame/guides/advanced/dialog/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/guides/advanced/dialog/)

在组件库中的 `EDialog`、`EDrawer`、`EModal` 组件提供了 [API 的方式](http://192.168.219.170/docs/vue/latest/component/component/dialog.html#openIframeDialog) 打开弹窗。但是它打开 iframe 和 vue 组件的方式不一致，对于 vue 组件还需要自己写 render 方法。为了抹平打开 iframe 和 vue 组件的使用差异，我们在 `eui-core` 包中提供了 `Utils.openDialog`、`Utils.openDrawer`、`Utils.openModal` 方法。

## 方法定义

```ts
interface CommonOpenOptions {
  /** 传递给目标组件的属性 */
  props?: Record<string, unknown>
  /** Vue 应用上下文（默认当前组件上下文） */
  context?: AppContext
  /** 是否顶层打开 */
  isTop?: boolean
}

interface OpenDialogOptions extends IframeDialogOptions, CommonOpenOptions {}
interface OpenDrawerOptions extends IframeDrawerOptions, CommonOpenOptions {}
interface OpenModalOptions extends IframeModalOptions, CommonOpenOptions {}

/**
 * 打开弹窗
 * @param title 弹窗标题
 * @param url 页面地址（支持路由地址或 iframe URL）
 * @param options 弹窗配置项
 */
type OpenDialogFunction = (title: string, url: string, options?: OpenDialogOptions) => void;

/**
 * 打开抽屉弹窗
 * @param title 弹窗标题
 * @param url 页面地址（支持路由地址或 iframe URL）
 * @param options 抽屉配置项
 */
type OpenDrawerFunction = (title: string, url: string, options?: OpenDrawerOptions) => void;

/**
 * 打开全屏弹窗
 * @param title 弹窗标题
 * @param url 页面地址（支持路由地址或 iframe URL）
 * @param options 全屏弹窗配置项
 */
type OpenModalFunction = (title: string, url: string, options?: OpenModalOptions) => void;
```

`openDialog`、`openDrawer`、`openModal` 方法的参数类型继承自组件库对应组件的全局方法（`$dialog`、`$drawer`、`$modal`）的 Options 类型。在保留原有功能的基础上，新增了以下三个扩展属性：

- `props`: 用于传递给目标组件的属性
- `context`: 指定 Vue 应用上下文
- `isTop`: 控制是否在顶层打开弹窗

## 使用示例

### 基础用法

```ts
import { Utils } from '@epframe/eui-core';

// 打开路由地址为 /frame-user/list 的组件的弹窗
Utils.openDialog('用户列表', '/frame-user/list');
// 以iframe的方式打开一个 F9 的用户列表页面弹窗
Utils.openDialog('用户列表', '/framemanager/orga/orga/user/frameuserlist');

```

### 关闭回调

由于 `openDialog` 方法继承了 `EDialog` 组件的全局打开方法的特性，你可以使用 `closeCallback` 属性来监听弹窗关闭事件并执行相应的回调函数。

```ts
import { Utils } from '@epframe/eui-core';

// 打开路由地址为 /frame-user/list 的组件的弹窗，在关闭时调用回调函数
Utils.openDialog('用户列表', '/frame-user/list', {
  closeCallback: (action) => {
    Utils.logger.info('关闭对话框, 回传值为', action);
  }
});
```

### 高级配置

```ts
// 在顶层打开路由地址为 /frame-user/list 的组件的弹窗
Utils.openDialog('用户列表', '/frame-user/list', { isTop: true });
// 顶层打开路由地址为 /frame-user/edit 的组件的弹窗，并给组件传递 userGuid 参数
Utils.openDialog('用户编辑', '/frame-user/edit', {
  isTop: true,
  props: { userGuid: '45f0c5f9-cad2-49e6-887d-b38dfcbc23de' }
});

// 我们还提供了专用顶层方法 openTopDialog（等效于 isTop: true）
Utils.openTopDialog('用户列表', '/frame-user/list');
```

### 打开抽屉弹窗

```ts
// 打开抽屉弹窗
Utils.openDrawer('用户列表', '/frame-user/list');

// 在顶层打开抽屉弹窗
Utils.openDrawer('用户编辑', '/frame-user/edit', { isTop: true });

// 带参数的抽屉弹窗
Utils.openDrawer('用户编辑', '/frame-user/edit', {
  props: { userGuid: '45f0c5f9-cad2-49e6-887d-b38dfcbc23de' }
});
```

### 打开全屏弹窗

```ts
// 打开全屏弹窗
Utils.openModal('用户列表', '/frame-user/list');

// 在顶层打开全屏弹窗
Utils.openModal('用户编辑', '/frame-user/edit', { isTop: true });

// 带参数的全屏弹窗
Utils.openModal('用户编辑', '/frame-user/edit', {
  props: { userGuid: '45f0c5f9-cad2-49e6-887d-b38dfcbc23de' }
});
```

> **💡 提示**
>
> 1. 顶层打开弹窗的前提：iframe 内外均为框架标准 Vue 项目且同域。
> 2. 若 `url` 为绝对地址，一律以 iframe 方式打开；若 `url` 是已注册的路由，则以组件的方式渲染弹窗；若既非绝对地址也未注册，则视为外部页面，仍以 iframe 加载。
> 3. 若 `url` 为已注册路由 + 顶层打开 ⇒ 通过 iframe 在顶层呈现。
> 4. 当 `url` 带查询参数且以组件方式弹窗时，查询参数将自动合并至 `props`。
> 
> ```ts
> // 下面两种写法是等效的
> Utils.openDialog('用户编辑', '/frame-user/edit', {
>   props: { userGuid: '45f0c5f9-cad2-49e6-887d-b38dfcbc23de' }
> });
> 
> Utils.openDialog('用户编辑', '/frame-user/edit?userGuid=45f0c5f9-cad2-49e6-887d-b38dfcbc23de');
> ```

### 弹窗组件的参数获取

在被打开的弹窗组件中，你可以通过以下两种方式来获取传递过来的参数：

1. **通过 `props` 获取**：

   弹窗组件的 `props` 中包含了所有传递过来的参数。你可以在组件的 `props` 中定义需要接收的参数，然后在组件中直接使用。

   ```vue
   <template>
     <div>
       <p>用户 Guid: {{ userGuid }}</p>
     </div>
   </template>

   <script setup>
   const props = defineProps({
     userGuid: {
       type: String,
       default: ''
     }
   });
   // 组件中可以直接使用 props.userGuid 来获取传递过来的参数
   console.log(props.userGuid);
   </script>
   ```

2. **通过 `attribute` 获取**：

   若弹窗组件事先并不清楚会传递哪些参数，或者参数的数量是动态的，无法事先在 `props` 中预定义好，那你可以通过 VUE 提供的 `useAttrs` 来获取所有传递过来的参数。

   ```vue
   <template>
     <div>
       <p>attrs: {{ JSON.stringify(attrs) }}</p>
     </div>
   </template>
   <script setup>
   import { useAttrs } from 'vue';
   const attrs = useAttrs();
   // 组件中可以直接使用 attrs.userGuid 来获取传递过来的参数
   console.log(attrs.userGuid);
   </script>
   ```