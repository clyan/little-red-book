
//使用Promise实现每隔1秒输出1,2,3
// const obj = {
//     name: '王瑾',
//     *[Symbol.iterator]() {
//         let keys = Object.keys(obj);
//         let i = 0;
//         while(i < keys.length) {
//             yield [keys[i], obj[keys[i]]];
//             i++;
//         }
//     },
// }
// for (const item  of obj) {
//    console.log(item)
// }


// const arr = ['a', 'b', 'v'];
// arr.reduce((acc, cur) => {
//     return acc.then(res => {
//         return new Promise(resolve => {
//             setTimeout(() => {
//                 resolve(console.log(cur))
//             }, 1000);
//         })
//     })
// }, Promise.resolve());
    // for(let i = 1 ; i <= arr.length; i++) {
    //     new Promise(resolve => {
    //         setTimeout(() => {
    //             resolve(arr[i-1])
    //         }, i * 1000);
    //     })
    // }

// 使用Promise实现红绿灯交替重复亮
// function red() {
//     console.log("red");
// }
// function green() {
//     console.log("green");
// }
// function yellow() {
//     console.log("yellow");
// }

// function light(timeout, cb) {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             cb();
//             resolve();
//         }, timeout);
//     })
// }

// function step() {
//     light(3000, red).then(() => {
//         return light(2000, green)
//     }).then(() => {
//         return light(1000, yellow)
//     }).then(() => {
//         return  step();
//     })
// } 
// step();




// const time = (timer) => {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve()
//       }, timer)
//     })
//   }
//   const ajax1 = () => time(2000).then(() => {
//     console.log(1);
//     return 1
//   })
//   const ajax2 = () => time(1000).then(() => {
//     console.log(2);
//     return 2
//   })
//   const ajax3 = () => time(1000).then(() => {
//     console.log(3);
//     return 3
//   })
//   const ajax4 = () => time(1000).then(() => {
//     console.log(3);
//     return 3
//   })
//   function mergePromise (ajaxArray) {
//     // 在这里写代码
//     const data = [];
//     let promise = Promise.resolve();
//     ajaxArray.forEach(ajax => {
//         promise = promise.then(ajax).then(res=> {
//             data.push(res);
//             return data;
//         })
//     });
//     return promise;
//   }
  
//   mergePromise([ajax1, ajax2, ajax3]).then(data => {
//     console.log("done");
//     console.log(data); // data 为 [1, 2, 3]
//   });


function loadImg(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = function() {
        console.log("一张图片加载完成");
        resolve(img);
      };
      img.onerror = function() {
          reject(new Error('Could not load image at' + url));
      };
      img.src = url;
    });
}



const p = new Promise((resolve, reject)=> {
  resolve(1)
}).then(res => {
  console.log(res) 
})