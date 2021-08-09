Function.prototype.bind = function(context){
  if(typeof this !== 'function') throw new TypeError("类型错误")
  let arg = [...arguments].slice(1),
    fn = this;
  return function Fn(...args) {
    return fn.apply(this instanceof Fn ? this : context, [...arg, ...args])
  }
}

function A(age) {
  this.age = age
}
let obj = {
  name: 'ywy'
}
const B = A.bind(obj, 1)
B()
console.log(obj)