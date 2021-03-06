const express = require('express')
const path = require('path')
const fse = require("fs-extra");
const app = express();
const multiparty = require("multiparty");
const port = 3000;
// 文件存储目录
const UPLOAD_DIR = path.resolve(__dirname, "..", "upload"); 
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","*");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
      res.send(200);  // 让options尝试请求快速结束
    else
      next();
});
app.use(express.static('util'))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
})
app.post('/upload', (req, res) => {
  console.log("上传中......")
  if (req.method === "OPTIONS") {
      res.status = 200;
      res.end();
      return;
  }
  const multipart = new multiparty.Form();
  multipart.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      res.status = 500;
      res.end("process file chunk failed");
      return;
    }
    const [chunk] = files.chunk;
    const [hash] = fields.hash;
    const [filename] = fields.filename;
    const chunkDir = path.resolve(UPLOAD_DIR, filename);
    const filePath = path.resolve(
      UPLOAD_DIR,
      `${hash}${extractExt(filename)}`
    );
    console.log('filePath', filePath)
    // 文件存在直接返回
    if (fse.existsSync(filePath)) {
      res.end("file exist");
      return;
    }
    // 切片目录不存在，创建切片目录
    if (!fse.existsSync(chunkDir)) {
      await fse.mkdirSync(chunkDir)
    }

      // fs-extra 专用方法，类似 fs.rename 并且跨平台
      // fs-extra 的 rename 方法 windows 平台会有权限问题
      // https://github.com/meteor/meteor/issues/7852#issuecomment-255767835
      await fse.move(chunk.path, `${chunkDir}/${hash}`);
    res.end("received file chunk");
  });
})

app.post('/merge',async (req, res) => {
    console.log('合并中......')
    const data = await resolvePost(req);
    const { filename, size } = data;
    console.log('filename', 'filename')
    const ext = extractExt(filename);
    const filePath = path.resolve(UPLOAD_DIR, `${filename}${ext}`);
    await mergeFileChunk(filePath, filename, size);
    res.end(
      JSON.stringify({
        code: 0,
        message: "file merged success"
      })
    );
})
const resolvePost = req =>
  new Promise(resolve => {
    let chunk = "";
    req.on("data", data => {
      chunk += data;
    });
    req.on("end", () => {
      resolve(JSON.parse(chunk));
    });
  });
const extractExt = filename =>
filename.slice(filename.lastIndexOf("."), filename.length); // 提取后缀名

const pipeStream = (path, writeStream) =>{
  return new Promise(resolve => {
    const readStream = fse.createReadStream(path);
    readStream.on("end", () => {
      fse.unlinkSync(path);
      resolve();
    });
    readStream.pipe(writeStream);
  });

}

// 合并切片
 const mergeFileChunk = async (filePath, filename, size) => {
  const chunkDir = path.resolve(UPLOAD_DIR, filename);
  
  const chunkPaths = await fse.readdir(chunkDir);
  // 根据切片下标进行排序
  // 否则直接读取目录的获得的顺序可能会错乱
  chunkPaths.sort((a, b) => a.split("-")[1] - b.split("-")[1]);

  await Promise.all(
    chunkPaths.map((chunkPath, index) =>
      pipeStream(
        path.resolve(chunkDir, chunkPath),
        // 指定位置创建可写流
        fse.createWriteStream(filePath, {
              start: index * size,
              end: (index + 1) * size
        })
      )
    )
  );
  console.log('chunkPaths', chunkPaths)
  fse.rmdirSync(chunkDir); // 合并后删除保存切片的目录
};

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})