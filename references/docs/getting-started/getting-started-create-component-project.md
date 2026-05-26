---
title: 创建组件包工程
originUrl: http://192.168.219.170/docs/vue/latest/frame/getting-started/create-component-project/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/getting-started/create-component-project/)

## 准备工作

确保 [环境准备](getting-started-development-environment.md#huan_jing_zhun_bei) 中的工具都已经安装完成。

## 创建组件化开发工程

`eui-cli comp` 命令是用来创建一个标准组件化开发工程的。

**命名规范： kebab-case 命名(小写+波折号：demo-study-components)**

![comp](images/start/cli-comp.png)

- 键盘按上下键选择条线对应的组织，按回车；

- 输入项目名称，按回车；

- 选择设备类型 **PC** 或 **mobile** ，继续回车。

创建完成后，会在当前目录下新建一个以你输入的项目名字为命名的文件夹，作为组件化开发的工程，如下图。

![comp](images/start/cli-comp-r.png)

## 接入 Web 工程

上面的命令已经创建好了组件工程，为了能实际运行时看到组件工程内编写的页面和组件， 还需要把组件接入 Web 工程。

接入涉及以下几个部分：

1. web 工程的 package.json 中引入组件工程, 下图中的第三行， key 是你的组件名，value 是 `workspace:*`，表示引用当前工作区的组件工程。
  ```json meta="{3}"
  {
    "dependencies": {
      "@epframe/demo-study-components": "workspace:*"
    }
  }
  ```
2. 在 web 工程的 setup.js/setup.ts 中导入组件
  ```js meta="{3,5,9}"
    // ... 省略其他代码
  // 导入组件包的样式文件
  import '@epframe/demo-study-components/style.css';
  // 导入组件包
  import DemoStudyComponents from '@epframe/demo-study-components';

  export const setup = Utils.defineSetup({
    // ... 省略其他代码
    deps: [/* 其他依赖的组件包 */, DemoStudyComponents], // 这里添加 DemoStudyComponents 组件包
    // ... 省略其他代码
  });
  ```

## FAQ:

### 当新增组件工程时出现依赖安装失败

![comp](images/start/cli-comp-q-1.png)

#### 问题场景及原因：

可能正在开发中，但是要创建一个新的组件工程，此时在 `demo-web` 工程中为了方便 调试，在 `package.json` 文件中对某个包配置
了 `workspace:*`。

![comp](images/start/cli-comp-q-1-1.png)

#### 解决方案：

web 工程 `demo-web` 下的 `package.json` 文件中有配置 `workspace:*`，暂时删除一下后进行创建即可，创建成功后再恢复。
