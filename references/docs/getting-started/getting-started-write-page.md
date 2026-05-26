---
title: 页面编写
originUrl: http://192.168.219.170/docs/vue/latest/frame/getting-started/write-page/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/getting-started/write-page/)

## 准备工作

在 [创建 web 工程-概念理解](./create-web-project/#gai_nian_li_jie) 中有已经明确，web 模板是一个启动入口，不推荐在这个工
程中写页面代码，在我们这个文档示例中对应的就是 `demo-web` 中不推荐写页面。

如果是从零开始的项目，那我们需要参考 [创建组件工程](./create-component-project) 文档，使用 `eui-cli comp` 创建用于写页面
的组件工程，如下图，我们创建一个 `demo-study-views` 工程。

**命名规范： 小写+波折号(demo-study-views)**

![write](images/start/cli-write-1.png)

![write](images/start/cli-write-2.png)

## 配置

### 在 `demo-web` 工程中配置

1、在 `package.json` 中引入包;

![write](images/start/cli-comp-q-1-1.png)

2、引入创建的组件工程。

在 `demo-web/src/setup.js` 中引入创建的 `demo-study-views` 工程。

![write](images/start/cli-write-3.png)

### 在 `demo-study-views` 工程中配置

#### 创建页面

在 `demo-study-views/src/views/` 下创建需要的页面目录和页面 `write-page/index.vue`;

**命名规范： kebab-case 命名(小写+波折号：write-page)**

文件创建推荐写法见本文最后

![write](images/start/cli-write-4.png)

#### 配置访问路由

有两种场景，推荐后端模块管理中配置菜单；前端路由配置一般用于公开且不需要后端安全、权限、维护管理的，比如登录、注册页或者
临时调试功能页面。

1、场景一：后台管理中菜单配置

步骤一：打开项目后台管理-界面配置-模块管理-模块管理页面

![write](images/start/cli-write-6.png)

步骤二：选择目录-新增模块，如下填写信息

**组件地址：带 .vue 后缀的文件的地址，从目录 views/ 后面开始**

**路由地址：最终浏览器访问的 url 路径**

![write](images/start/cli-write-7.png)

2、场景二：前端路由配置

在 `demo-study-views/src/router/static.js` 文件中根据业务需要在 `ROOT_ROUTES` 或者 `MENU_ROUTES` 中配置路由。

**纯前端本地测试的话，可以把 needAuth 设置为 false，这样不需要走登录流程**

```js
{
  path: 'write-page',
  name: 'write-page',
  component: () => import('@/views/write-page/index.vue'),
  meta: {
    title: '页面编写',
    needAuth: false // 该路由是否需要授权才能访问
  }
}
```

![write](images/start/cli-write-8.png)

## 访问页面

访问 [http://localhost: 5173/epoint-web/home/write-page](http://localhost:5173/epoint-web/home/write-page) 即可看到刚才
创建的页面内容，如下图

![write](images/start/cli-write-9.png)

## 文件及目录创建推荐写法

以 `write-page` 为例

- 表格列表页：在 write-page 目录下可以用 index.vue 或 list.vue 命名；

- 详情页、编辑页: 在 write-page 目录下可以用 detail.vue 或 edit.vue 命名；

- 其他页面：根据业务名称进行使用 kebab-case 命名(小写+波折号) 命名;

- 组件见 [组件编写](./write-component) 文章。
