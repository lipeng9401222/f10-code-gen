---
title: 发布自己的组件包
originUrl: http://192.168.219.170/docs/vue/latest/frame/guides/base/publish-component-package/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/guides/base/publish-component-package/)

在 [创建组件化开发工程](../getting-started/getting-started-create-component-project.md#chuang_jian_zu_jian_hua_kai_fa_gong_cheng) 和
[跨工程组件](../getting-started/getting-started-write-component.md#gong_cheng_nei_gong_xiang-2) 开发后，如果需要发布组件按本文操作即
可。

## 打包发布组件

开发完成后，可通过 `pnpm run build` 命令来打包组件。通过 `eui-cli` 脚手架提供的 [`eui-cli publish`](#发布包) 命令来发布
组件。

在打包时，会利用 [`route-info-build`](./route-info-build.md) 插件自动将工程中的静态路由信息生成到发布包中。

### 不打包子组件

默认情况下，依赖的子组件会被一起被打包到组件包中。如果不想要子组件被一起打包，可以按照下面的方式来配置：

1. 修改 `package.json` 文件，将不需要被一起打包的子组件放到 `peerDependencies` 字段下。

```json
{
  // 不需要被一起打包的子组件
  "peerDependencies": {
    "子组件1": "^1.0.0",
    "子组件2": "^1.0.0"
  },
  // 需要被一起打包的子组件
  "dependencies": {
    "子组件3": "^1.0.0"
  }
}
```

2. 修改 `vite.config.js` 文件，将不需要被一起打包的子组件放到 `build.rollupOptions.external` 字段下。

```js
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['子组件1', '子组件2']
    }
  }
});
```

这样修改后，子组件就不会被一起打包到组件包中了。而使用组件的工程中，就需要自己去安装这些未一起打包的子组件。