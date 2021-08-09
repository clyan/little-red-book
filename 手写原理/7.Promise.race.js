function PromiseRace(promiseList) {
  if(!Array.isArray(promiseList)) throw new TypeError("类型错误")
  return new Promise((resolve, reject) => {
    for(let promise of promiseList) {
      promise.then(resolve, reject)
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
PromiseRace([p3, p1, p2]).then(res => {
  console.log(res) // [3, 1, 2]
})
Promise.race([p3, p1, p2]).then(res => {
  console.log(res) // [3, 1, 2]
})