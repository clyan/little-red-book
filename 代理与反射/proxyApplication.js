const { log } = require('console');

// 跟踪属性访问， 捕获get, set,has操作，监控对象何处被访问的。


// 隐藏属性
const hiddenProperty = ['foo', 'bar'];
const targetObject = {
    foo: 1,
    bar: 2,
    baz: 3,
}
const proxy = new Proxy(targetObject, {
    get(target, property) {
        if(hiddenProperty.includes(property)) {
            return undefined;
        }
        return Reflect.get(...arguments);
    },
    set(target, property, value) {
        if(hiddenProperty.includes(property)) {
            return false;
        }
        return Reflect.set(...arguments);
    },
    has() {
        if(hiddenProperty.includes(property)) {
            return false;
        }
        return true;
    }
})
log(proxy.foo); // undefined
log(proxy.baz); // 3

// set中拒绝赋值
proxy.foo = 4;
log(targetObject.foo); // 1


// 函数与构造函数参数验证


function median(...nums) {
    return nums.sort()[Math.floor(nums.length / 2)];
}

const fProxy = new Proxy(median, {
    apply(target, thisArg, argumentsList) {
        for(const arg of argumentsList) {
            if(typeof arg !== 'number') {
                throw 'Non-number argument provided';
            }
        }
        return Reflect.apply(...arguments)
    }
})
//log(fProxy(4, '5'));    //throw 'Non-number argument provided';


// //数据绑定与可观察对象

function Person(name) {
   this.name = name;
}

let userList = [];
//事件分派
function emit(params) {
    console.log(arguments)
}
const uProxy = new Proxy(userList, {
    set(target, property, value, receiver) {

        const result = Reflect.set(...arguments);
        // 默认会触发一次length的改变
        if(property === 'length') {
            return result;
        }
        if (result) {
            emit(Reflect.get(target, property));
        }
        return result;

    }
})
//数据绑定
const pProxy = new Proxy(Person, {
    construct() {
        const newUser = Reflect.construct(...arguments);
        uProxy.push(newUser);
        return newUser;
    }
})

new pProxy('a')    
new pProxy('b')    
new pProxy('c')    
log(userList)   // [ Person { name: 'a' }, Person { name: 'b' }, Person { name: 'c' } ]



