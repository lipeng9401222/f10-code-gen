---
title: 工程部署
originUrl: http://192.168.219.170/docs/vue/latest/frame/getting-started/deploy-project/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/getting-started/deploy-project/)

## 准备工作

在环境准备中，我们安装了 create-eui 命令行工具，部署时前端打包依赖该命令行工具，下面我们要了解以下三个命令。

### 编译所有包

为了方便一次性编译所有包，脚手架工具提供了一个 `eui-cli build` 命令来编译所有包。

该命令**在工作区根目录下执行**会扫描当前目录下的所有 npm 包，然后依次执行包里面的 `build` 脚本命令。

![build](./images/start/cli-build.png)

### 发布包

脚手架工具提供了一个 `eui-cli publish` 命令来进行包的发布。

该命令需要**在要发布包的根目录下**运行。该命令会根据你的选择来自动提升包的版本号，并发布到 npm 仓库中。

![publish](./images/start/cli-publish.png)

**可选参数：**

- `--increment`：指定版本号升级类型，可选值为 "major"、"minor"、"patch" 或 "prerelease"，默认为 "patch"。对应命令行交互
  中的版本升级选项：

![publish-increment](./images/start/cli-publish-increment.png)

- `--no-git-checks`：跳过 git 代码检测与提交流程。
- `--silent`：以静默模式执行发布，无需人工交互。可与 `--increment` 参数搭配使用，指定版本号的升级类型。

![publish-help](./images/start/cli-publish-help.png)

### 更新包

脚手架工具提供了 `eui-cli update`，简写 `eui-cli up` 命令用于检测和更新依赖包。

**使用说明：**

- 该命令必须在 web 工程根目录下运行
- 仅检测并更新以 `@ep` 开头的自研包，不处理第三方依赖包
- 更新完成后会自动修改 `package.json` 和 `pnpm-lock.yaml` 文件中的版本信息

![cli-up](./images/start/cli-up.png)

**可选参数：**

- `--no-save`：更新包但不修改 `package.json` 和 `pnpm-lock.yaml` 文件
- `--silent`：静默模式执行更新，自动将所有可更新的包升级到最新版本
- `--all`：一次性将所有包都更新到最新版。

> **⚠️ 警告**
>
> 更新后需手动将修改提交到 git 仓库中

## 打包

### 打包发布组件

开发完成后，可通过 `pnpm run build` 命令来打包组件。通过 `eui-cli` 脚手架提供的 `eui-cli publish` 命令来发布组件。

#### 不打包子组件

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

### 打包 web 工程

检查 `src/config.js` 文件中的配置是否正确：`BASEPATH_PRODUCTION` 为项目正式环境路径无误, 例如: `'/epoint-web/'`，实际值
以项目要求为准。

可通过 `pnpm run build` 命令将项目在 `dist` 目录下打包成一个 web 部署包，可将该目录拷贝出去进行部署。

## 部署

基于上面的 web 工程打包后，部署会分 2 中模式，完全前后端分离和前端资源放入老的 F9 工程内部署。

本文档仅做简要介绍，具体操作参考框架文档 https://fdoc.epoint.com.cn/onlinedoc/rest/d/QJbIv2

### 前后端分离模式

以 nginx 为例，此时将构建得到的前端资源放在 nginx 的静态资源目录下，然后配置 nginx 的代理转发。

```nginx
server {
    listen       80;
    server_name  localhost;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        # 必须配置 try_files，否则刷新页面会出现 404
        try_files $uri $uri/ /index.html;
    }
    # 接口转发设置
    location /epoint-web/rest {
        proxy_pass http://localhost:8080;
        proxy_set_header   Host              $http_host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }
}
```

### F9 工程内部署

将得到的 dist 内的资源放在 F9 工程的 webapp 下即可。

1. 注意不要包含 dist 本身，是 dist 里面的全部内容。
2. 注意前端打包命令产出的 `.project-info.json` 一定要复制过去。

## FAQ:

### 编译所有包失败

当我们执行 `eui-cli build` 尝试编译所有包时。

可能会出现下图中版本不一致的问题，此时根据提示将版本号改成一样的即可。

你可能会说，那我执行 `eui-cli up` 命令不行吗？ 并不行，因为 `eui-cli up` 只能自动更新 `@ep` 开头的包。

![cli-up](./images/start/cli-build-1.png)

改完版本号后，再次执行 `eui-cli build`，如下图所示表示打包成功。

![cli-up](./images/start/cli-build-2.png)
