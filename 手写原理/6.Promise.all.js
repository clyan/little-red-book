function promiseAll(promiseList) {
  if(!Array.isArray(promiseList)) throw new TypeError("数组")
  return new Promise((resolve, reject) => {
    let result = []
    for(let i = 0; i < promiseList.length; i++) {
      promiseList[i].then(res => {
        result.push(res)
        if(result.length === promiseList.length) {
          resolve(result)
        }
      }, err => {
        reject(err)
      })
    }
  })
}
let p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
      resolve(1)
  }, 1000)
})
let p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
      resolve(2)
  }, 2000)
})
let p3 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(3)
  }, 3000)
})
promiseAll([p3, p1, p2]).then(res => {
  console.log(res) // [3, 1, 2]
})