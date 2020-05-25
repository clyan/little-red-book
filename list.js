//ResponseBody 云函数处理入口
module.exports.handler = function(event, context, callback) {
    try {
      let request = JSON.parse(event);
      let content = "<h1>Gallery 列表</h1>";
      content += "<div>Gallery 列表的 ID 是："+request['pathParameters']['listId']+"</div>";
      content += "<div>它从一个 Restful 的 API中解析得到 request['pathParameters']['listId']</div>";
      content += "<a href='/'>回到首页</a>";
      const response = {
        isBase64Encoded: true,
        statusCode: "200",
        headers: {
          "content-type": "text/html; charset=utf-8"
        },
        body: new Buffer( content ).toString('base64')
      };
      callback(null, response);
    } catch (err) {
      callback(err);
    }
};