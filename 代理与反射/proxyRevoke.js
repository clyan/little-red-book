const { log } = require('console');
const target = {
    id: 'target',
    name:'name'
}
const handler = {
    // 目标对象， 当前触发属性， 会接收到的对象
    get(trapTarget, property, receiver) {
        return 'aaa'
    },
    // get: Reflect.get   // 简化方式
}
// 撤销代理
const { proxy, revoke } = Proxy.revocable(target, handler);


log(proxy.id) // aaa
log(target.id) // target

revoke();   //断开关联
log(proxy.id) // Cannot perform 'get' on a proxy that has been revoked

