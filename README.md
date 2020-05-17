### 1分钟说明
+ 这个Demo演示了基于云开发平台来构建Serverless应用便捷性。
+ 能看到这个README说明您已经通过云开发平台创建了HelloWorld应用，接下来仅需要打开CloudIDE左上角的弹出对话框，然后点击“部署”按钮，就可以在阿里云上“0”费用部署您的第一个应用了，部署完后（由于需要下载Maven编译插件，需要等较长时间），可以在“调试”分页中看到部署后的效果，将收到“Hello world, Received params xxx“。
+ 至此，您的第一个应用已经上线到测试环境中了。
1. ![部署图](https://ecoboost-readme-image.oss-cn-shanghai.aliyuncs.com/helloworld/%E9%83%A8%E7%BD%B2.png   ''应用部署''）
2. ![调试图](https://ecoboost-readme-image.oss-cn-shanghai.aliyuncs.com/helloworld/%E8%B0%83%E8%AF%95.png   ''应用调试''）

---
### 路由信息（**拷贝**到部署路由文本框）
```
[
  [
    "/helloworld",  "com.alibaba.serverless.helloworld.MainHandler::handleRequest"
  ]
]
```

