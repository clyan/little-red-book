const MPromise = require('../promise-demo');


// p1
new MPromise((resolve) => {
  console.log(1)
  // p2
  const a = resolve(new MPromise((resolve) => {
    console.log(2)
    resolve(4)
  }))
  console.log(3)
}).then(res => {
  console.log(res)
})

// 1 -> resolve(3) -> 