Function.prototype.call = function(context) {
  if(typeof this !== 'function') {
    throw new TypeError("类型错误")
  } 
  let args = [...arguments].slice(1),
    result = null;
    context = context || window
    let fn = Symbol('fn')
    context[fn] = this
    result = context[fn](...args)
    delete context[fn]
    return result;
}
function A(name) {
  this.name = name
}
let obj = { name: 456 }
console.log(A.call(obj, 123))
console.log(obj)