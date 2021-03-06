function extractExt(filename) {
    return filename.slice(filename.lastIndexOf('.'), filename.length) 
}

console.log(extractExt('第1章 课程介绍.mp4'))