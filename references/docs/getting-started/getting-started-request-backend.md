---
title: 请求后端
originUrl: http://192.168.219.170/docs/vue/latest/frame/getting-started/request-backend/
---
> 📖 **原文档地址**: [点击查看线上文档](http://192.168.219.170/docs/vue/latest/frame/getting-started/request-backend/)

在第一次启动工程时，如果本地后端接口工程没有启动，或者端口不是 8080 ，那么大概率就会报错，见
[启动工程](getting-started-start-project/.md#di_san_bu_-_kan_xiao_guo) 文中第三步内容。

## vite.config.js

想访问后端，需要在 `demo-web/vite.config.js` 中配置 `BACKEND_SERVER_URL` 参数为当前后端启动的工程访问地址进行代理，如下
图。

![init](images/start/cli-start-4.png)

## config.js

当配置完后如果访问没有问题，则不需要往下看；

如果还是不能访问，此时需要查看 `demo-web/src/config.js` 中 `BASEPATH` 和 `ROOTPATH`。

![init](images/start/cli-start-6.png)

如上图，配置为当前后端启动工程访问名。

![init](images/start/cli-start-5.png)
