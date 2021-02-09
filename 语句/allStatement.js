const { log } = console;

log('===================do While===================');
// 至少执行一次
let i = 0;
do {
    i+=2;
} while(i < 10)

log('===================While 与 For===================');
let j = 0;
while (j < 10){
    ++j;
}
//只写条件与while等效
let k =0;
for(;k < 10;) {
    ++k;
}

for (let i = 0; i < 10; ++i) {
}

log('===================for-in===================');
// 遍历属性， 返回 0 1 2 3 4
for(const i in [4,5,6,7,8]) {
    log(i)
}
let obj = {
    name: 'kkk',
    age: 123,
    height: 123,
    *[Symbol.iterator](){
        let keys = Object.keys(obj);
        for(let i = 0; i < keys.length; i++) {
            yield  [keys[i], obj[keys[i]]]
        }
    }
}
// 输出name
// age
// height
for(const i in obj) {
    log(i)
}

//输出
//[ 'name', 'kkk' ]
//[ 'age', 123 ]
//[ 'height', 123 ]
for(const i of obj) {
    log(i)
}

log('===================标签语句===================');

let num = 0;
statement: 
for(let i = 0; i < 10; i++) {
    for(let j = 0; j < 10; j++) {
        if(i === 5 && j ===5) {
            break statement;       //跳出到statement开始
        }
        num++; 
    }
}
log(num) // 55

let num1 = 0;
statement: 
for(let i = 0; i < 10; i++) {
    for(let j = 0; j < 10; j++) {
        if(i === 5 && j ===5) {
            continue statement;       //跳出到statement开始
        }
        num1++; 
    }
}
log(num1) // 95


log('===================with语句===================');
// 性能差， 难以调试， 不建议使用。
// 将指定对象设置为作用域内的全局对象。
let withObj = {name: 'll', age: 123};
with(withObj) {
    log(name, age) // ll 123
}

log('===================swith语句===================');
// 解释传入字符5 ，所以
let switchVaribale = '5'
switch(switchVaribale) {
    case 5 : console.log(4);
        break;
    case 2 : 
    default : console.log(switchVaribale);   // 5
}

log('===================swith语句===================');
function fun() {
    return ;
    log('returned'); // 不执行
}
const a = fun();
log(a)  // undefined