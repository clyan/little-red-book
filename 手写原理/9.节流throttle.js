// 利用时间
function throttle(fn, delay = 100) {
  let time = Date.now()
  return function(...rest) {
    let self = this
    let currentTime = Date.now();
    if(currentTime - time >= delay) {
      time = Date.now()
      return fn.apply(self, rest)
    }
  }
}

// const fn = function(a) {
//   console.log(a)
// }
// const dfn = throttle(fn, 1000)
// setInterval(() => {
//   dfn(1) 
// }, 100)


// 利用setTimeout
function throttle1(fn, delay = 100) {
  let timer = null
  return function(...rest) {
    let self = this
    if(!timer) {
      timer = setTimeout(() => {
        fn.apply(self, rest)
        clearTimeout(timer)
        timer = null
      }, delay);
    }
  }
}
// 时间戳+定时器： https://www.cnblogs.com/momo798/p/9177767.html
var throttle3 = function(func, delay) {     
  var timer = null;     
  var startTime = Date.now();     
  return function(...rest) {             
      var curTime = Date.now();             
      var remaining = delay - (curTime - startTime);             
      var context = this;        
      clearTimeout(timer);              
      if (remaining <= 0) {                    
          func.apply(context, rest);                    
          startTime = Date.now();              
      } else {                    
          timer = setTimeout(()=> {
            func.apply(context, rest);   
          }, remaining);              
      }      
  }
}

const fn = function(a) {
  console.log(a)
}
const dfn1 = throttle3(fn, 1000)
setInterval(() => {
  dfn1(1) 
}, 100)