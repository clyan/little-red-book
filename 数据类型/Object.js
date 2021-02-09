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

console.log(obj.toLocaleString()) // [object Object]
console.log(objLiteral.toLocaleString())  // 123
// 运算，先调用 valueOf, 再调用toString
console.log(objLiteral + 1);