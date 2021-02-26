const { log } = require('console');
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
uProxy.push('a');