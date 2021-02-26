const { log } = require('console');
const target = {
   name:'name'
}

const oneProxy = new Proxy(target, {
    get() {
        log('oneProxy');
        return Reflect.get(...arguments)
    }
});
const twoProxy = new Proxy(oneProxy, {
    get() {
        log('twoProxy');
        return Reflect.get(...arguments)
    }
});
// twoProxy
// oneProxy
// name 
log(twoProxy.name)


