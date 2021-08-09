function New(constructor, ...args) {
  let instance = Object.create(constructor.prototype)
  let result = constructor.call(instance, ...args)
  
  return typeof result === 'object' || typeof result === 'function' ? result : instance
}
function Person(name) {
  this.name = name
}
let a = New(Person, '123')