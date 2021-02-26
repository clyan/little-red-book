const target = {
  id: 'target'
}

const handler = {}
const proxy = new Proxy(target, handler);
console.log(proxy.id)       //target
console.log(target.id)      //target

target.id = 'foo';
console.log(proxy.id)       //foo
console.log(target.id)      //foo


proxy.id = 'bar';
console.log(proxy.id)       //bar
console.log(target.id)      //bar

// 同时应用到 target 和 proxy
proxy.name = 'name';
console.log(proxy.name)       //name
console.log(target.name)      //name


// Proxy 的prototype 是 undefined
// console.log(target instanceof Proxy)     // Function has non-object prototype 'undefined' in instanceof check


// ===区分代理与原对象
console.log(target === proxy); // false