const { log } = require('console');
const obj = {
    name: '123'
};

const proxy = new Proxy(obj, {
    // proxy.property 、proxy[property] 、Object.create(proxy)[property] 、Reflect.get(proxy, property, receiver)
    // receiver:proxy函数本身
    get(trapTarget, property, receiver) {
        log('get')
        
        return Reflect.get(...arguments)
    },
    // proxy.property = value 、proxy[property] = value、 Object.create(proxy)[property] = value、Reflect.set(proxy, property, value, receiver)
    set(trapTarget, property, value, receiver) {
        log('set')
        return Reflect.set(...arguments)
    },
    // property in proxy 、 property in Object.create(proxy)、with(proxy){(property)} 、 Reflect.has(proxy, property)
    has(trapTarget, property) {
        log('has')
        return Reflect.has(...arguments)
    },
    //  Reflect.defineProperty(trapTarget, property, descriptor) 、 Object.defineProperty(proxy, property)
    defineProperty(trapTarget, property, descriptor) {
        log('defineProperty')
        return Reflect.defineProperty(...arguments)
    },
    //  Reflect.getOwnPropertyDescriptor(proxy, property) 、 Object.getOwnPropertyDescriptor(proxy, property)
    getOwnPropertyDescriptor(trapTarget, property) {
        log('getOwnPropertyDescriptor')
        return Reflect.getOwnPropertyDescriptor(...arguments)
    },
    // 拦截delete proxy[property] delete proxy.property Reflect.deleteProperty(proxy, property)
    // 返回值：布尔值，是否删除成功
    // 属性不可配置时，不能删除
    deleteProperty(trapTarget, property) {
        log('deleteProperty')
        return Reflect.deleteProperty(...arguments)
    },
    // 拦截：Object.keys() 、Reflect.ownKeys() 、 Object.getOwnPropertySymbols(proxy)、Object.getOwnPropertyNames(proxy)
    // 返回值：包含字符串或者符号的可枚举对象。
    ownKeys(target) {
        log('ownKeys')
        return Reflect.ownKeys(...arguments)
    },
     // 拦截:Reflect.getPrototypeOf() 、 Object.getPrototypeOf() 、proxy.__proto__ 、
     // Object.prototype 、Object.prototype.isPrototype(proxy)
     // target目标对象。
     // 返回值： 对象或null
    getPrototypeOf(target) {
        log('getPrototypeOf')
        return Reflect.getPrototypeOf(...arguments)
    },
    // 拦截:Reflect.setPrototypeOf() 、 Object.setPrototypeOf()
    setPrototypeOf(target, prototype) {
        log('setPrototypeOf')
        return Reflect.setPrototypeOf(...arguments)
    },
     // 拦截: Reflect.isExtensible(target) 、 Object.isExtensible(target)
     // 返回值：布尔值， 表示target是否可以拓展
    isExtensible(target) {
        log('isExtensible')
        return Reflect.isExtensible(...arguments)
    },
    // 拦截: Reflect.preventExtensions(target) 、 Object.preventExtensions(target)
    preventExtensions(target) {
        log('preventExtensions')
        return Reflect.preventExtensions(...arguments)
    },
    // 拦截: 函数调用， function.prototype,apply(thisArg, argumentsList) 、
    // function.prototype,call(thisArg, argumentsList) 、Reflect.apply(target, thisArgs, argumentsList)
    // target目标对象， thisArgs调用时的this, argumentsList 调用时的参数列表
    // 返回值：无限制
    apply(target, thisArgs, ...argumentsList) {
        log('apply')
        return Reflect.apply(...arguments)
    },
    //拦截 new 、Reflect.construct(target, argumentsList, newTarget)
    // target目标构造函数，argumentsList传给目标函数的参数列表, newTarget最初被调用的构造函数。
    // target必须是拥有construct
    // 返回值：必须返回对象
    construct(target, argumentsList, newTarget) {
        log('construct')
        return Reflect.construct(...arguments)
    }
});
// 触发get测试
proxy.name
proxy['name']
Object.create(proxy).name;
Reflect.get(proxy, 'name')


// 触发set
proxy.name = 456;               // 额外触发 getOwnPropertyDescriptor 、  defineProperty
proxy['name'] = 456;            // 额外触发 getOwnPropertyDescriptor 、  defineProperty
Object.create(proxy).name = 456;
Reflect.set(proxy, 'name', 456);        // 额外触发 getOwnPropertyDescriptor   defineProperty


// 触发has
'name' in proxy;
'name' in Object.create(proxy);
with(proxy) {      
    (name)     // 触发了两次 get
}
Reflect.has(proxy, 'name')  


// 触发defineProperty
Reflect.defineProperty(proxy, 'name', {
    value: 'define'
})
Object.defineProperty(proxy, 'name', {
    value: 'define'
})

// 触发getOwnPropertyDescriptor
Object.getOwnPropertyDescriptor(proxy, 'name');
Reflect.getOwnPropertyDescriptor(proxy, 'name');
log(Object.getOwnPropertyDescriptors(proxy));  // 额外触发ownKeys

// 触发ownKeys
log(Object.keys(proxy));  // 额外触发 getOwnPropertyDescriptor
Object.getOwnPropertyNames(proxy);
Object.getOwnPropertySymbols(proxy);
Reflect.ownKeys(proxy);

// 触发deleteProperty
delete proxy.name;
delete proxy['name'];
Reflect.deleteProperty(proxy, 'name');


// getPrototypeOf
Reflect.getPrototypeOf(proxy);
Object.getPrototypeOf(proxy);
proxy.__proto__;   // 额外触发get
Object.prototype.isPrototypeOf(proxy);
proxy instanceof Object;

// preventExtensions
Object.preventExtensions(proxy);
Reflect.preventExtensions(proxy);


// 代理函数
const F = function F(params) {
    
}

const fProxy = new Proxy(F, {
    apply(target, thisArgs, ...argumentsList) {
        log('apply')
        return Reflect.apply(...arguments)
    },
    //拦截 new 、Reflect.construct(target, argumentsList, newTarget)
    // target目标构造函数，argumentsList传给目标函数的参数列表, newTarget最初被调用的构造函数。
    // target必须是拥有construct
    // 返回值：必须返回对象
    construct(target, argumentsList, newTarget) {
        log('construct')
        return Reflect.construct(...arguments)
    }
});

// 触发apply
fProxy();
fProxy.apply();
fProxy.call();
Reflect.apply(fProxy,undefined,[]);

// 触发construct()
new fProxy();
// 第三个参数 作为新创建对象的原型对象的constructor属性， 参考 new.target 操作符，默认值为target。
Reflect.construct(fProxy, [], fProxy)


