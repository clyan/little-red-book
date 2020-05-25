const uuidv4 = require('uuid/v4');

//html页面响应，云函数处理入口
module.exports.handler = function(event, context, callback) {
    try {
      const newUUID = uuidv4();
      let bodyContext = "<h1>Hello World</h1><div>您好！ 生成了一个UUID:" + newUUID + "</div>"; 
      bodyContext += "<h1>Hello world</h1><a href='list/200156'>打开 Gallery 列表</a>"
      const htmlResponse = {
        isBase64Encoded: true,
        statusCode: "200",
        headers: {
          "Content-type": "text/html; charset=utf-8"
        },
        body: new Buffer( bodyContext ).toString('base64')
      };
      callback(null, htmlResponse);
    } catch (err) {
      callback(err);
    }
};
  