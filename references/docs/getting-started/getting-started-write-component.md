---
title: 组件编写
originUrl: http://192.168.219.170/docs/vue/latest/frame/getting-started/write-component/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/getting-started/write-component/)

在 [页面编写](./write-page) 文章的【文件及目录创建推荐写法】中介绍了几种推荐写法，其中关于组件的推荐写法在这个文章中进行
详细说明。

**命名规范：kebab-case 命名(小写+波折号)**

## 组件的场景

### 模块内共享

如果在 write-page 目录下的页面中有**通用的组件**，则建议在 write-page 目录下创建文件夹 components ，提取公共组件到这个文
件中；

**场景举例：** 在 write-page 的 list.vue 和 edit.vue 中都需要使用相同的表单验证组件 form-validator.vue，这时可以在
write-page/components/ 目录下创建这个组件，供同一模块内的页面共享使用。

```
demo-study-views/src/views/write-page/
├── components/
│   └── form-validator.vue    # write-page 模块内共享
├── index.vue
├── edit.vue
└── detail.vue
```

### 工程内共享

如果在 write-page 和与之同级的目录下有**通用的组件**，则建议在 demo-study-views/src/components 下创建目录编写公共组件 ；

**场景举例：** write-page 模块和 user-manage 模块都需要使用搜索框组件 search-bar.vue 和分页组件 pagination.vue，这时应该
在 demo-study-views/src/components 下创建这些组件，供整个工程内的所有页面模块使用。

```
demo-study-views/src/
├── components/
│   ├── search-bar.vue        # 工程内多个模块共享
│   └── pagination.vue
├── views/
│   ├── write-page/
│   │   └── index.vue
│   └── user-manage/
│       └── index.vue
```

### 跨工程共享

如果在 demo-study-views 组件工程和与之同级的另一个组件工程中存在**通用的组件**，则推荐创建一个通用的组件工程用于提取供其
他组件工程使用。

**场景举例：** demo-study-views 工程和 demo-system-views 工程都需要使用上传文件组件 file-uploader.vue、权限验证组件
permission-check.vue 等，这时应该创建一个新的通用组件工程 demo-common-components，将这些跨工程的通用组件提取到这个工程中
，然后在需要使用的工程中引入。

```
项目结构：
├── demo-study-views/         # 业务组件工程
├── demo-system-views/        # 业务组件工程
└── demo-common-components/   # 通用组件工程
    └── src/
        └── components/
            ├── file-uploader.vue      # 跨工程共享
            └── permission-check.vue
```

## 创建与使用

根据上面的三种场景，分别举例怎么写，怎么用。

**命名规范：kebab-case 命名(小写+波折号)**

**命名规范：kebab-case 命名(小写+波折号)**

**命名规范：kebab-case 命名(小写+波折号)**

以下示例组件文件命名以上述举例组件场景中的命名，仅供文档说明使用，实际组件命名务必以**业务需求为准**。

### 模块内共享

如下结构，在页面目录中添加 components 目录并添加 form-validator.vue 组件

```
demo-study-views/src/views/write-page/
├── components/
│   └── form-validator.vue    # write-page 模块内共享
├── index.vue
├── edit.vue
└── detail.vue
```

在页面中使用 `import FormValidator from './components/form-validator.vue';` 引入组件并使用，如下图

**命名规范：创建时使用 kebab-case 命名(小写+波折号)，引用时，使用 PascalCase 命名(首字母大写)注册组件**

![write](images/start/cli-write-comp-1.png)

页面效果：

![write](images/start/cli-write-comp-1-1.png)

### 工程内共享

如果是**单一**的组件，则直接在 `demo-study-views/src/components/` 下创建对应的 .vue 组件文件，如下结构

```
demo-study-views/src/
├── components/
│   ├── search-bar.vue        # 工程内多个模块共享
│   └── pagination.vue
├── views/
│   ├── write-page/
│   │   └── index.vue
│   └── user-manage/
│       └── index.vue
```

如果是**复杂或者后续会有扩展**的组件，则在 `demo-study-views/src/components/` 下创建对应的组件的文件夹，如下结构

```
demo-study-views/src/
├── components/
│   └── header-bar/
│       ├── header-title.vue
│       └─── index.vue
├── views/
│   ├── write-page/
│   │   └── index.vue
│   └── user-manage/
│       └── index.vue
```

工程内共享的组件在 `demo-study-views/src/components/index.js` 中将组件对外导出，方便在页面中使用，如下图

![write](images/start/cli-write-comp-2.png)

页面效果：

![write](images/start/cli-write-comp-3.png)

### 跨工程共享

当整个大项目中存在各个工程中都需要用的通用组件时，可以创建一个通用组件工程，比如 demo-common-components（此处名称只为文
档说明使用，实际以业务需要为准）。

```
项目结构：
├── demo-study-views/         # 业务组件工程
├── demo-system-views/        # 业务组件工程
└── demo-common-components/   # 通用组件工程
    └── src/
        └── components/
            ├── file-uploader.vue      # 跨工程共享
            └── permission-check.vue
```

**第一步：**

根据 [create-component-project](./create-component-project) 文章，创建 demo-common-components 通用工程。

如下图，创建业务组件并在 src/components/index.js 中导出

![write](images/start/cli-write-comp-4.png)

**第二步：**

在 编写页面的 demo-study-views 工程的 package.json 文件的 peerDependencies 中添加该工程的依赖配置，如下图：

![write](images/start/cli-write-comp-6.png)

在 编写页面的 demo-study-views 工程的 vite.config.js 文件中的 external 添加如下图配置：

![write](images/start/cli-write-comp-6-2.png)

**第三步：**

在 web 工程 demo-web 中的 package.json 文件的 dependencies 中添加该组件依赖，如下图：

![write](images/start/cli-write-comp-6-3.png)

**第四步：**

经过上述三步配置后即可在页面编写的组件工程中使用，如下图

![write](images/start/cli-write-comp-7.png)
