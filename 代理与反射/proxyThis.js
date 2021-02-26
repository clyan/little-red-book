const { log } = require('console');
const target = {
    thisValEqualProxy() {
        return this === proxy;
    }
}

const proxy = new Proxy(target, {});
log(target.thisValEqualProxy())     // false
log(proxy.thisValEqualProxy())  // true

const wm = new WeakMap();
class User {
    constructor(userId) {
        wm.set(this, userId);
    }
    set id(userId) {
        wm.set(this, userId)
    }
    get id() {
        log(this)
       return wm.get(this)
    }
}

const user = new User(123);
log(user.id) //123
const userInstanceProxy = new Proxy(user, {
    get: Reflect.get
});
log(userInstanceProxy.id) //undefined, 尝试从自身获取这个实例,

// 先代理对象，再new 
const UserClassProxy = new Proxy(User, {});
const proxyUser = new UserClassProxy(456);
log(proxyUser.id) //456



// 代理Date对象存在的问题

const date = new Date();
const dateProxy = new Proxy(date, {});
log(dateProxy instanceof Date);
dateProxy.getDate();    //  TypeError: this is not a Date object.