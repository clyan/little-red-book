function New(func, ...params) {
  if(Object.prototype.toString.call(func) !== "[object Function]")
    throw new TypeError("The first argument should a function ")
  let obj = Object.create(func.prototype);
  let res = func.apply(obj, params)
  return typeof res === "object" ? res: obj;
}

// test 
function Person(name) {
  this.name = name
  return {
    age: 123
  }
}
const p = New(Person, "bbb");
console.log(p)