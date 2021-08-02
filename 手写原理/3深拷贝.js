
/**
 * @description 方案一 JSON.parse , JSON.stringfiy
 * 无法对于函数，正则,Symbol,Set,Map等特殊对象克隆
 * 对象循环引用报错。。。
 * 会抛弃对象的constructor,所有的构造函数会指向Object
 * @param {*} obj 待克隆对象
 */
function deepCopyByJson(obj) {
  return JSON.parse(JSON.stringify(obj))
}
let xunhun = { rr: 12};
xunhun.ww = xunhun
const cloneObj = deepCopyByJson({
  name: "123",
  mm: undefined,
  cc: null,
  nn: function (params) {},
  ll: /ll/,
  pp: Symbol("123"),
  vv: ["123"],
  qq: Date,
  hh: new Set(['456']),
  oo: new Map([{name:"Sd"}]),
 //  xunhun: xunhun // 带上报错，循环引用
})
// { name: '123', cc: null, ll: {}, vv: [ '123' ] }
console.log(cloneObj)






/**
 * @description 方案二， 递归！！ 
 * @param {*} obj 
 * @returns 
 */
function deepClone(obj) {
  if(typeof obj !== 'object' || obj === null) {
    return obj;
  }
  // 判断是数组还是对象。。
  // 或 obj.constructor === Array
  // 或 Array.isArray(obj) ? []: {}
  let copyObj =  Object.prototype.toString.call(obj) === "[object Array]" ? [] : {};
  for(let key in obj) {
      // 递归调用深拷贝方法
      if (obj.hasOwnProperty(key)) {
        copyObj[key] = deepClone(obj[key])
      }
  }
  return copyObj;
}
const clone = deepClone({
  name: 'a',
  age: 12,
  favo: ['basketball']
})
console.log("clone", clone)