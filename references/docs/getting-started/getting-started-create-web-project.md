---
title: 创建web工程
originUrl: http://192.168.219.170/docs/vue/latest/frame/getting-started/create-web-project/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/getting-started/create-web-project/)

## 概念理解

### PC web 工程：

PC web 前端框架对外提供一个核心包 `@epframe/eui-core` 和两个开发模板： `web` 和 `componentization` 模板。

- `@epframe/eui-core` 包为组件化开发的基础包，提供了框架封装的最基础的控件、布局、工具方法、路由、状态管理以及主题管理等
  能力。所有开发都需要依赖该包；

- `web` 模板是用来开发一个 web 项目的开发模板，所有需部署的网站开发都以该模板为基础进行开发，该模板生成的工程是一个启动
  入口，不推荐在这里面新增业务代码；

- `componentization` 模板为开发组件的模板，所有组件的开发都以该模板为基础进行开发，业务代码可根据模块分成不同组件进行开
  发。

### 移动 web 工程：

移动前端框架对外提供核心包 `@epframe/eui-core-m` 和两个开发模板： `ejs.m8.mobileframe.next` 和 `ejs.m8.componentization` 模板。

- `@epframe/eui-core-m` 包为移动端组件化开发的基础包，提供了框架封装的最基础的控件、工具方法等能力。所有开发都需要依赖该包。

- `ejs.m8.mobileframe.next` 为 M8.4移动前端框架，支持用来开发一个移动 H5 项目的开发模板，所有需部署的移动 H5 开发都以该模板为基础进行开发，该模板生成的工程是一个启动入口，组件化开发模式不推荐在这里面新增业务代码。

- `ejs.m8.componentization` 模板为基于 M8.4移动前端框架的 开发移动组件的模板，所有组件的开发都以该模板为基础进行开发，业务代码可根据模块分成不同组件进行开发。

### 注意

注意，PC web 工程加载 PC 组件工程，移动 web 工程加载 移动 组件工程。不可混用。

## 准备工作

确保 [环境准备](getting-started-development-environment.md#huan_jing_zhun_bei) 中的工具都已经安装完成。

## 第一步：创建 workspace 工作区

为了方便 vue 组件化工程开发和管理，统一编译环境，需要使用到 pnpm 工作空间能力。

通过 `eui-cli workspace` 命令（别名为 `eui-cli ws`）是用来创建一个 pnpm 的 workspace 工作区。

**命名规范： 驼峰(docDemo)或者 kebab-case 命名(小写+波折号：doc-demo)都可以**

![](./images/start/cli-ws.png)

该命令会在当前目录下创建一个 package.json 和 pnpm-workspace.yaml 文件。

pnpm-workspace.yaml 文件中已配置了通用的工作空间目录，让 pnpm 可以识别到我们工程中的所有前端包。

![](./images/start/ws-category.png)

## 第二步：创建 web 工程

`eui-cli web` 命令是用来创建一个 web 开发模板的。

**命名规范： kebab-case 命名(小写+波折号：demo-web)**

![web](images/start/cli-web.png)

- 键盘按上下键选择条线对应的组织，按回车；

- 输入项目名称，按回车；

- 选择设备类型 **PC** 或 **mobile** ，继续回车。

完成后输出如下：

![web](images/start/cli-web-3.png)

创建完成后，会在当前目录下新建一个以你输入的项目名字为命名的 web 模板工程。

![web](images/start/cli-web-4.png)
