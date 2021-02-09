const { log } = console;

log('===================加法操作===================');

log(1 + 1) //2

log(+0 + +0) //0
log(-0 + -0) //-0
log(-0 + +0) //0
log(Infinity + -Infinity) // NaN
log(Infinity + Infinity) //Infinity
log(-Infinity + -Infinity) //-Infinity
log('aaaa' + 5) // aaaa5

// 特别注意
let num1 = 5;
let num2 = 10;
let message = 'The sum of 5 and 10 is ' + num1 + num2;  
log(message) // 'The sum of 5 and 10 is 510'

    message = 'The sum of 5 and 10 is ' + (num1 + num2);  
log(message) // 'The sum of 5 and 10 is 15'

// 运算，先调用 valueOf, 再调用toString
let objLiteral = {
    name: '123',
    valueOf() {
        return 456;
    },
    toString() {
        return '123'
    }
}
console.log(objLiteral + 1); // 457
delete objLiteral['valueOf'];
console.log(objLiteral + 1); // 1231
delete objLiteral['toString'];
console.log(objLiteral + 1); // [object Object]1


log('===================减法操作===================');

log(+0 - +0) //0
log(-0 - -0) //0
log(-0 - +0) //-0
log(Infinity - Infinity) //NaN
log(-Infinity - -Infinity) //NaN
log(Infinity - -Infinity) //Infinity
log(-Infinity - Infinity) // -Infinity