const { log } = console;
let obj = new Object; // 不推荐，建议加（）
log(obj.constructor);  // node: [Function: Object], js : ƒ Object() { [native code] }

let objLiteral = {
    name: '123',
    valueOf() {
        return 456;
    },
    toString() {
        return '123'
    }
}
log(obj.toLocaleString()) // [object Object]
log(objLiteral.toLocaleString())  // 123
// 运算，先调用 valueOf, 再调用toString
log(objLiteral + 1);

log('======================Object.defineProperty========================') // [object Object]
let ob = {
}

// writable 、 value 与 get set不能同时使用。
Object.defineProperty(ob, 'name', {
    congifurable: false,
    enumerable: true,
    get() {
        return 456
    },
    set(newval) {
        return val;
    }
})
delete ob.name;
log(ob.name)

