
//ResponseBody 云函数处理入口
module.exports.handler = function(event, context, callback) {
    try {
      event = JSON.parse(event);
      const strBody = event.isBase64Encoded
        ? new Buffer(event.body, "base64").toString()
        : event.body;
      const reply = `Hello World: 服务端收到消息：${strBody}`;
      const response = {
        isBase64Encoded: false,
        statusCode: "200",
        headers: {
          "content-type": "application/json"
        },
        body: reply
      };
      callback(null, response);
    } catch (err) {
      callback(err);
    }
};
  