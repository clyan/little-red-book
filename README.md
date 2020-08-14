## 系统文件

- .workbench
  - 不可删除，云开发平台应用部署配置文件
  - fcRouteDefault，「路由/函数入口」配置入口
  - cicd，构建打包部署应用的 Shell 指令集；核心：将要部署的内容全部打包到项目根目录的 code.zip 压缩包，云开发平台只认项目根目录的 code.zip 压缩包进行部署

- serverless.js
  - SAFE，不可访问扩展名的目录或文件配置入口。加入此列表的目录，代表该目录下所有的文件都不可通过扩展名进行访问；加入此列表的文件，也不能通过扩展名进行访问；

## 创建静态应用
- 将本地开发好的静态应用直接拖拽到 CloudIDE 项目文件列表即可
- 或者直接在 CloudIDE 项目文件列表创建

## 创建API
- 建议在 CloudIDE 项目文件列表创建目录用于统一存放相关的 API
- API 格式
```
module.exports.handler = function(event, context, callback) {
    var request = JSON.parse(event);// 请求内容都会存储在 event 中，JSON编码后可遍历查看具体的内容
    // do sth
    // 返回值格式
    var responseObject = {
        isBase64Encoded: false,//与 body 内容是否进行 base64 编码保持一致
        statusCode: 404,//状态码，根据返回值自行决定适合的状态码
        headers: {
        	"Content-type": "text/html; charset=utf-8"//根据返回值设置正确的 Content-type
        },
        body: "<h1>很抱歉，您要访问的页面不存在！</h1>"//返回值
    };
    callback(null, responseObject);//返回结果
}
```
- API 必须加入 serverless.js 的 SAFE 列表配置当中，避免泄漏

## 调试
- 打开云开发部署测试插件，选择「开发环境」，选择要测试的路由，点击「测试」即可

## 部署
- 系统默认路由 /* 不可更改
- 打开云开发部署测试插件，选择环境，直接部署