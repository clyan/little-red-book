### 一分钟说明
+ 这个Demo演示了基于云开发平台来构建Serverless应用便捷性。
+ 能看到这个README说明您已经通过云开发平台创建了HelloWorld应用
1. 在CloudIDE右下角”终端“执行：npm install
2. 接下来仅需要打开CloudIDE左上角的弹出对话框，然后点击“部署”按钮，就可以在阿里云上“0”费用部署您的第一个应用了
3. 部署完后，可以在“调试”分页中看到部署后的效果，将收到“Hello World: 服务端收到消息：xxx“。
+ 至此，您的第一个应用已经上线到测试环境中了。
1. ![1、部署图](https://image.workbenchapi.com/helloworld/deploy1.png）
2. ![2、调试图](http://image.workbenchapi.com/helloworld/%E8%B0%83%E8%AF%95.png）

---
### 路由信息（**拷贝**到部署路由文本框）
```
[
  [
    "/helloworld",  "HelloworldHandler.handler"
  ],
  [
    "/index",  "IndexHandler.handler"
  ]
]
```

