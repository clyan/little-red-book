const { log } = require('console');
const target = {
   id: 'target',
   name:'name'
}

// Reflect方法 与 Proxy的handler里的方法 一一对应
const handler = {
    // 目标对象， 当前触发属性， 会接收到的对象
    get(trapTarget, property, receiver) {
        log('trapTarget', trapTarget);  // { id: 'target', name: 'name' }
        log('property', property);   // id
        log('receiver', receiver)   //  { id: 'target', name: 'name' }
        if (property === 'foo') return 'bar';       // 当对象属性不可配置，不可写时，不能修改
        return Reflect.get(...arguments);   // 使用 Reflect 重建原始行为
        // 
    },
    // get: Reflect.get   // 简化方式
}
const primaryProxy = new Proxy(target, handler);

// 返回一个空代理对象
const proxyEmpty = new Proxy(target, Reflect);

console.log(primaryProxy.id) // target
console.log(target.id) // target

Reflect.defineProperty(target, 'foo', {
    writable: false,
    configurable: false,
    value: 'foo'
})
//console.log(proxy.foo) // 出错，此时foo属性不能被修改



