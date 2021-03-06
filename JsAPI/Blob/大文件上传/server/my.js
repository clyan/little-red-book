const express = require('express');
const fs = require('fs');
const path = require('path');
const multiparty = require('multiparty');
const bodyParser = require('body-parser')
const app = express();
const UPLOAD_DIR = path.resolve(__dirname, '../upload');
const jsonParser = bodyParser.json()
app.use(express.static('./util'))

app.get('/', (req, resp) => {
    resp.sendFile(path.resolve(__dirname, './my.html'))
})
function extractExt(filename) {
    return filename.slice(filename.lastIndexOf('.'), filename.length) 
}

app.post('/upload', (req, resp) => {
    let multipart = new multiparty.Form();
    multipart.parse(req,async (err, fields, files) => {
        if(err) {
            resp.status = 500;
            resp.statusMessage = err;
            resp.end('process file chunk failed');
            return;
        }
        let {chunk} = files;
        let {hash, filename, fileHash} = fields;
        chunk = chunk[0]
        hash = hash[0];
        filename= filename[0];
        fileHash = fileHash[0];
        const filePath = path.resolve(UPLOAD_DIR, `${fileHash}${extractExt(filename)}`)
        const chunkDir = path.resolve(UPLOAD_DIR, `${fileHash}`)

        if(fs.existsSync(filePath)) {
            resp.status = 200;
            resp.end("file exist");
            return;
        }
        if(!fs.existsSync(chunkDir)) {
            await fs.mkdirSync(chunkDir)
        }
        // 跨磁盘报错
        // await fs.renameSync(chunk.path, path.resolve(chunkDir, hash))
        var  readStream = await fs.createReadStream(chunk.path)
        var  writeStream = await fs.createWriteStream(path.resolve(chunkDir, hash));
        readStream.pipe(writeStream);
        readStream.on('end',async function(){
            await fs.unlinkSync(chunk.path);
            resp.status = 200;
            resp.end("上传完成");
        });
    })

})
app.post('/merge', jsonParser,async (req, resp) => {
   const { size, filename, fileHash } = req.body;
   const extractExtName = extractExt(filename);
   const uploadPath = path.resolve(UPLOAD_DIR,`./${fileHash}${extractExtName}`);
   const chunkDir = path.resolve(UPLOAD_DIR, fileHash);
   const chunkPaths = await fs.readdirSync(chunkDir);
   chunkPaths.sort((a, b) => a.split('-')[0] - b.split('-')[0]);
    await Promise.all(chunkPaths.map((chunkPath, index) => {
        return new Promise((resolve) => {
            const readStream = fs.createReadStream(chunkPath);
            readStream.on('end',() => {
                fs.unlinkSync();
            })
            const writeStream = fs.createWriteStream(uploadPath, {
                start: index * size,
                end: (index + 1) * size
            })
            readStream.pipe(writeStream);
        })
    }))
    fs.rmdirSync(chunkDir);
   resp.status = 200;
   resp.end('yes')
})
app.listen(3000, ()=> {
    console.log('http://127.0.0.1:3000')
})