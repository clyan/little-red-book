function InstanceOf(instance, constructor) {
  if(typeof constructor !== 'function') return false;
  let proto = Object.getPrototypeOf(instance);
  while(true) {
    if(proto === null) {
      return false
    }
    if(proto === constructor.prototype) {
      return true
    }
    proto =  Object.getPrototypeOf(proto);
  }
} 