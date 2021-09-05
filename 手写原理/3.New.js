function New(constructor, ...args) {
  let instance = Object.create(constructor.prototype);
  let result = constructor.call(instance, ...args);

  return typeof result === "object" || typeof result === "function"
    ? result
    : instance;
}
function Person(name) {
  this.name = name;
  return null;
}
let a = New(Person, "123");

function N(constructor, ...args) {
  const obj = Object.create(constructor.prototype);
  const result = Person.call(obj, ...args);
  return typeof result === "object" || typeof result === "function"
    ? result
    : obj;
}
