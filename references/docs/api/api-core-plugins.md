---
title: 框架插件
originUrl: http://192.168.219.170/docs/vue/latest/frame/api/core/plugins/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/api/core/plugins/)

## 热更新插件

在 Monorepo 开发模式下，若子包通过 pnpm 的 [workspace: 协议](https://www.pnpm.cn/workspaces#工作空间协议-workspace) 引入，修改后无法立即生效。为此，我们提供了 `vite-plugin-workspace-hmr` 插件，web 模板已默认集成。

### 插件配置

#### 配置子包的 alias

该插件会自动扫描当前工程中通过 `workspace:` 引入的子包，通过给子包名配置 alias 来将对子包的引入指向到子包源码入口 `src/index.js` 文件，从而实现子包的热更新效果。

但是当子包中也配置了自己的 alias，子包源码中的 alias 运行上下文就会变成父包的了，就会导致解析出来的路径不对问题。为解决该问题，需要将子包的 alias 配置传递给插件，让插件去实现子包的 alias 替换。

插件的配置格式是如下的一个以包名为键， alias 配置为值的对象

```json
{
  'packageName1': {
    '@': './src',
    '@utils': './src/utils'
  },
  'packageName2': {
    '@': './src',
    '@components': './src/components'
  },
}
```

插件中默认给每个子包添加了 `'@': './src'` 的 alias 配置。所以如果子包只有这一个 alias 配置，就可以不配置。

#### 配置忽略的子包

如果子包不是用我们的组件化框架创建的（比如一些第三方的包），它们的工程结构和我们的组件化框架的工程结构不一样，就需要我们手动配置插件的 `ignores` 配置项来忽略这些子包，让插件不去自动扫描它们。

```json
{
  ignores: [
    "packageName1",
    "packageName2"
  ]
}
```

如果你想要这些被忽略的子包也能具有热更新的能力，你可以在 vite 的 alias 配置中手动添加它们的 alias 配置。

```json
{
  resolve: {
    alias: [
      {
        find: /^packageName$/, // 匹配子包名的正则表达式
        replacement: path.resolve(__dirname, '../xxxx/xxxx/index.js') // 子包的源码入口文件路径
      }
    ]
  }
}
```

### 完整示例

```js
import { defineConfig } from 'vite';
import { workspaceHMR } from '@epframe/vite-plugin-workspace-hmr';

export default defineConfig({
  plugins: [
    // 不传配置，所有子包都默认只有 '@': './src' 替换
    workspaceHMR()
  ]
});

export default defineConfig({
  plugins: [
    // packageName1 子包按照传的配置来替换，其他子包按照默认的 '@': './src' 替换
    workspaceHMR({
      'packageName1': {
        '@': './src',
        '@utils': './src/utils'
      }
    })
  ]
});

export default defineConfig({
  plugins: [
    // packageName1 子包按照传的配置来替换，其他子包按照默认的 '@': './src' 替换，同时忽略 packageName2 子包
    workspaceHMR({
      'packageName1': {
        '@': './src',
        '@utils': './src/utils'
      },
      ignores: [
        "packageName2"
      ]
    })
  ],
  resolve: {
    alias: [
      {
        find: /^packageName2$/,
        replacement: path.resolve(__dirname, '../packageName2/src/enter.js') // 子包的源码入口文件路径
      }
    ]
  }
});
```

## 静态路由构建插件

在组件化工程中，静态路由统一配置在 `src/route/static.js`。由于服务端无法感知这些路由，直接访问时会返回 404。为此，我们提供 `vite-plugin-route-info-build` 插件：构建阶段自动聚合当前工程及依赖组件内的静态路由，生成映射文件并输出至构建目录，供服务端读取，避免 404 问题。

### 插件配置

#### orders

插件会自动扫描当前工程中依赖的子组件包，并将其与当前工程的静态路由信息合并为一个大对象。合并时，以路由的 path 值为键，若遇到相同 path 值的路由，后者会覆盖前者。默认合并顺序依据子包在 `package.json` 的 `dependencies` 中的出现顺序（通常为包名的 ASCII 顺序）。

正确的合并顺序应为子组件在 `src/setup.js` 中注册的顺序。若与默认顺序不一致，可通过插件的第一个参数 `orders` 配置项指定。该配置项为一个数组，元素为子组件包的包名。排在前面的子组件包优先合并，排在后面的子组件包随后合并。未在 `orders` 中配置的子组件包的路由信息将在最后合并，顺序按默认顺序。

例如子组件包在 `package.json` 的 `dependencies` 中的出现顺序是：

```json
{
  "dependencies": {
    "a": "^1.0.0",
    "b": "^1.0.0",
    "c": "^1.0.0",
    "d": "^1.0.0",
    "e": "^1.0.0"
  }
}
```

而子组件包在 `src/setup.js` 中的注册顺序是：

```js
export const setup = async (app, options) => {
  // 框架的初始化逻辑
  await euiCore.setup(app, options);

  await e.setup(app, options);
  await c.setup(app, options);
  await a.setup(app, options);
  await b.setup(app, options);
  await d.setup(app, options);
};
```

因此，插件的 `orders` 配置应为：`['e', 'c', 'a', 'b', 'd']`。由于后三个子组件包的顺序与 `package.json` 中的 `dependencies` 顺序一致，可以省略不写，所以 `orders` 可简化为：`['e', 'c']`。

#### excludes

插件默认扫描当前工程中依赖的子组件包，规则为：包名以 `@ep` 开头，但不以 `@epoint-fe` 开头。此规则较宽松，可能会误扫描不需要的包。可通过插件的第二个参数 `excludes` 配置项排除这些包。该配置项为一个数组，包含需排除的子组件包名，插件扫描时将忽略这些包。

例如想要排除子组件包 `@epframe/utils` 和 `@epdzjy/plugins`，则 `excludes` 配置应为：`['@epframe/utils', '@epdzjy/plugins']`。

### 完整示例

```js
import { defineConfig } from 'vite';
import { routeInfoBuild } from '@epframe/vite-plugin-route-info-build';

export default defineConfig({
  plugins: [
    // 不传配置，按照默认的配置来构建
    routeInfoBuild()
  ]
});

export default defineConfig({
  plugins: [
    // 构建时，最先合并 packageName1 和 packageName2 子组件包的路由信息，其余子组件包的路由信息最后合并
    routeInfoBuild(['packageName1', 'packageName2'])
  ]
});

export default defineConfig({
  plugins: [
    // 构建时，排除 packageName1 和 packageName2 子组件包
    routeInfoBuild([], ['packageName1', 'packageName2'])
  ]
});
```