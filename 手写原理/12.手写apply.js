Function.prototype.apply = function(context) {
  if(typeof this !== 'function') throw new TypeError("类型错误")
  let args = [...arguments].slice(1),
    result = null;
    context = context || window;
    let fn = Symbol('fn')
    context[fn] = this
    if(arguments[1]) {
      result = context[fn](...args[0])
    } else {
      result = context[fn]()
    }
    delete context[fn]
    return result;
}
function A(name) {
  this.name = name
}
let obj = { name: 456 }
console.log(A.apply(obj, [123]))
console.log(obj)