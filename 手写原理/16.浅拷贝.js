// Object.assign()
// ... 
//Array.slice()
//Array.concat()
// 数组或对象浅拷贝
let arr = [1,2,3,4];
console.log(Object.assign([], arr)); // [1,2,3,4]
console.log([...arr]); // [1,2,3,4]
// 数组浅拷贝
console.log(arr.slice()); // [1,2,3,4]
console.log(arr.concat()); // [1,2,3,4]

// 手写实现
function shallowClone(object) {
  if(!object || typeof object !== 'object') return;
  let result = Array.isArray(object) ? [] : {}
  for(let key in object) {
    if(object.hasOwnProperty(key)) {
      result[key] = object[key]
    }
  }
  return result;
}