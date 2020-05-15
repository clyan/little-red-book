
const uuidv4 = require('uuid/v4');

//html页面响应，云函数处理入口
module.exports.handler = function(event, context, callback) {
    try {
      event = JSON.parse(event);
      const strBody = event.isBase64Encoded
        ? new Buffer(event.body, "base64").toString()
        : event.body;

      const newUUID = uuidv4();
      let bodyContext = "<html><h1>您好！ 生成了一个UUID:" + newUUID + "</h1></html>"; 
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
  