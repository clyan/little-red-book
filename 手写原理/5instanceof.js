function instance_of(A, B) {
  if(typeof A !== 'object') throw new TypeError("A should a object")
  if(Object.prototype.toString.call(B) !== "[object Function]") throw new TypeError("B is a function")
  let proto = Object.getPrototypeOf(A);
  while(true) {
    if(proto === null) return false;
    if(proto === B.prototype) return true;
    proto = Object.getPrototypeOf(proto)
  }
}

var a = []
var b = {}

function Foo(){}
var c = new Foo()

function child(){}
function father(){}
child.prototype = new father()
var d = new child()

console.log(instance_of(a, Array)) // true
console.log(instance_of(b, Object)) // true
console.log(instance_of(b, Array)) // false
console.log(instance_of(a, Object)) // true
console.log(instance_of(c, Foo)) // true
console.log(instance_of(d, child)) // true
console.log(instance_of(d, father)) // true