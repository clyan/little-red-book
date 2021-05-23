const getData =  () => new Promise((resolve, reject) => setTimeout(() => {
  throw new Error("a")
}, 1000));

// async function test() {
//   const data = await getData();
//   console.log("data", data);
//   const data2 = await getData();
//   console.log("data2", data2);
//   return 'success';
// }

// test().then(res => console.log(res))

// 结果如下
// data data
// data2 data
// success
console.log("====================使用generator函数改写======================")

function* testG() {
  // await被编译成了yield
  const data = yield getData()
  console.log('gendata: ', data); // 同步调用next, 次句会同步执行
  const data2 = yield getData()
  console.log('gendata2: ', data2);
  return 'success'
}

const gen = testG();
const rejectData = gen.next().value.then(res=> console.log("gen1", res)).catch(err =>console.log("err", gen.next().value))

// gen.next().value.then(res=> console.log("gen2", res))
// console.log("gen3", gen.next().value) // 直接输出 success

// 此时的输出结果如下，同步调用gen.next后, gendata，gendata2，success直接就同步输出了，
// 并且异步函数按照调用的顺序执行， test函数先执行，接着调用异步data先执行，此时该data未执行完成所以data2并未调用
// 接着gen.next调用两次，所以队列的顺序依次为， data,gen,gen2,data2
// ====================使用generator函数改写======================
// gendata:  undefined
// gendata2:  undefined
// gen3 success
// data data
// gen1 data
// gen2 data
// data2 data
// success


// 思考： 如果要让generator与await保持一致性（注意generator状态改变后不可逆）。 作如下操作
// 先注释testG
// function* testH() {
//   // await被编译成了yield
//   const data = yield getData()
//   console.log('testHdata: ', data); // 同步调用next, 次句会同步执行
//   const data2 = yield getData()
//   console.log('testHdata2: ', data2);
//   return 'success'
// }

// // 符合 async await的流程
// const gen = testH();
// let dataPromise = gen.next().value
// let dataPromise2 = dataPromise.then(res => gen.next(res).value)
// const lastPromise = dataPromise2.then(res => gen.next(res).value)
// lastPromise.then(res => console.log(res))

// 分析： 
// 1.先调用 gen.next() 将函数停留在  const data = yield getData(), dataPromise就是第一个getData这个异步函数。
// 2. dataPromise.then等待异步函数执行完毕， 在执行gen.next(res).value 此时getData返回的值就会赋值给 const data = yield getData()
// 3. 接着输出 console.log('testHdata: ', data); 
// 4. 函数停留在 const data2 = yield getData()
// 5. 第二步 gen.next(res).value 返回的是第二个getData这个异步函数， dataPromise2是。then返回的是promise
// 6. 接着输出  console.log('testHdata2: ', data2); dataPromise2.then 返回promise
// 7. 接着执行lastPromise.then 输出success.
// 符合 async await的流程


// 接着分析，要实现的效果
// function* testF() {
//   // await被编译成了yield
//   const data = yield getData()
//   console.log('testHdata: ', data); // 同步调用next, 次句会同步执行
//   const data2 = yield getData()
//   console.log('testHdata2: ', data2);
//   return 'success'
// }
// // 使用高阶函数，传入generator函数， 返回一个函数，并且函数执行后返回一个promise
// const test = asyncToGenerator(testF)
// // 跟async await调用保持一致
// test().then(res => console.log(res))

// 实现该函数,
/**
 * @description 确定输入输出， 使用高阶函数，传入generator函数， 返回一个函数，并且函数执行后返回一个promise
 * @param {*} generatorFunc 
 * @returns 
 */
// function asyncToGenerator(generatorFunc) {
//     return function(...params) {
//       // 先执行generatorFunc函数，对应 const gen = testH();
//       const gen = generatorFunc.apply(this, ...params)
//       // 返回一个promise 因为外部是用.then的方式 或者await的方式去使用这个函数的返回值的
//       // const test = asyncToGenerator(testF)
//       // test().then(res => console.log(res))
//       return new Promise((resolve, reject) => {
//         // 定义step函数用于自执行yield函数
//         // key有next和throw两种取值，分别对应了gen的next和throw方法
//         // arg参数则是用来把promise resolve出来的值交给下一个yield
//         function step(key, arg) {
//           let generatorResult
//           // 这个方法需要包裹在try catch中
//           // 如果报错了 就把promise给reject掉 外部通过.catch可以获取到错误
//           try {
//             generatorResult = gen[key](arg)
//           } catch (error) {
//             return reject(error)
//           }
//           // gen.next() 得到的结果是一个 { value, done } 的结构
//           const { done, value } = generatorResult;
//           // 如果已经完成了 就直接resolve这个promise
//           // 这个done是在最后一次调用next后才会为true
//           // 以本文的例子来说 此时的结果是 { done: true, value: 'success' }
//           // 这个value也就是generator函数最后的返回值
//           if (done) {
//             // 这个value对应的是yield后面的promise
//             return resolve(value)
//           } else {
//             return Promise.resolve(value).then(function onResolve(val) {
//               // value这个promise被resove的时候，就会执行next
//               // 并且只要done不是true的时候 就会递归的往下解开promise
//               // 对应gen.next().value.then(value => {
//               //    gen.next(value).value.then(value2 => {
//               //       gen.next() 
//               //
//               //      // 此时done为true了 整个promise被resolve了 
//               //      // 最外部的test().then(res => console.log(res))的then就开始执行了
//               //    })
//               // })
//               step("next", val)
//             }, function onReject(err) {
//                 // 如果promise被reject了 就再次进入step函数
//             // 不同的是，这次的try catch中调用的是gen.throw(err)
//             // 那么自然就被catch到 然后把promise给reject掉啦
//               step("throw", err)
//             })
//           }
//         }
//         // 执行第一次gen.next 对应
//         step("next");
//       })
//     }
// }
