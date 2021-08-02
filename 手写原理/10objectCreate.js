function ObjectCreate(obj) {
  function Fn() {
  }
  Fn.prototype = obj;

  let instance = new Fn();
  return instance;
}