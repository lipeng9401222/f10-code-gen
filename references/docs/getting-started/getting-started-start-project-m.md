---
title: 启动工程
originUrl: http://192.168.219.170/docs/vue/latest/frame/getting-started/start-project-m/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/getting-started/start-project-m/)

## 第一步：安装依赖

在根目录执行 `pnpm i` 安装依赖；

```bash
 pnpm i
```

## 第二步：运行

进入 `eui-cli web` 创建的移动端的 demo-web 工程，执行 `pnpm run dev`；

```bash
(base) docDemo % cd demo-web
(base) demo-web % pnpm run dev

> @epframe/demo-web@8.4.4-beta.39 dev /docDemo/demo-web
> npm run dev:h5

npm warn config ignoring workspace config at /docDemo/demo-web/.npmrc

> @epframe/demo-web@8.4.4-beta.39 predev:h5
> node node_modules/@epoint-mrc/em-cli/dist/src/lib/resolution/componentization/scripts/handle-manifest.js

> @epframe/demo-web@8.4.4-beta.39 dev:h5
> uni --

请注意运行模式下，因日志输出、sourcemap 以及未压缩源码等原因，性能和包体积，均不及发行模式。
vite是按需编译，运行时点击某个未编译页面会先编译后加载，导致显示较慢，发行后无此问题。
编译器版本：4.61（vue3）
正在编译中...
​postcss-px-to-viewport: postcss.plugin was deprecated. Migration guide:
https://evilmartians.com/chronicles/postcss-8-plugin-migration​
发现 2 个可用组件化工程， @epframe/eui-core-m,componentization-m

=== 导入结果摘要 ===
✓ 成功导入: 7 个模块
⚠ 跳过导入: 0 个模块
✗ 导入失败: 0 个模块
==================

  vite v5.2.8 dev server running at:

  ➜  Local:   http://localhost:8080/epoint-web/mobile/
  ➜  Network: http://28.0.0.1:8080/epoint-web/mobile/
  ➜  Inspect: http://localhost:8080/epoint-web/mobile/__inspect/

  ready in 2635ms.

```

## 第三步：看效果

按住 ctrl，单击下图中地址打开访问的页面

```bash
vite v5.2.8 dev server running at:

➜  Local:   http://localhost:8080/epoint-web/mobile/
➜  Network: http://28.0.0.1:8080/epoint-web/mobile/

ready in 2635ms.
```

启动后会发现页面比较大，移动端预览效果开发阶段可以在浏览器中模拟开发预览，打开浏览器的 devTool 工具（F12）后，选择切换仿真模式预览。

![init](images/start/cli-start-m-1.png)

### 完整开发，依赖后端接口

见 [请求后端](getting-started-request-backend.md)
