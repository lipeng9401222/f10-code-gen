---
title: 通用底层工具库
originUrl: http://192.168.219.170/docs/vue/latest/frame/api/common-utils/index/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/api/common-utils/index/)

此工具库是框架的组件库和框架 Utils 都依赖的底层工具库，包含了常用的工具函数。

此包虽然独立发布，但是对于框架来说， 被内置在 `epoint-fe/utils` 包中, 你可以直接从 `@epoint-fe/utils` 包中引入:

```ts
import { toArray, debounce, throttle } from "@epoint-fe/utils";
// ...
```

如果你喜欢统一的工具库调用调用形式， 也可以从 `@epframe/eui-core` 包中引入:

```ts
import { Utils } from "@epframe/eui-core";

// Utils 命名空间下具备此包的全部方法
// eg:
Utils.isObject({}); // true
Utils.toArray(1); // [1]
Utils.toArray([1, 2]); // [1, 2]
Utils.toArray(null); // []
Utils.toArray(undefined); // []
```

Utils 下将具备此包的全部方法。

另外此工具库独立发布为 npm 包, 可通过以下命令安装

```sh
pnpm install @epoint-fe/common-utils
```

具体文档可以点击左侧导航查看。