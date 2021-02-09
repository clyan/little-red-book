const { log } = console;

log('=================== 数字运算规则===================');
let i = 0;
log(++i)  //1
log(i++) //1
log(i) //2

let j = 0;
log(--j)  // -1
log(j--) // -1
log(j) // -2

log('=================== 其他类型运算规则===================');
// 先转数值再运算
let s1 = '2'
let s2 = 'z'
let s3 = false
let s4 = 1.1
// 操作对象时，以调用valueOf 、toString的顺序调用
let s5 = {
    valueOf(){
        return -1;
    }
}
log(s1++)
log(s2++)
log(s3++)
log(s4--)
log(s5++)

log('=================== 单个符号运算规则===================');
// + 与 - 同理
// 先转数值再运算
let t1 = '2'
let t2 = 'z'
let t3 = false
let t4 = 1.1
// 操作对象时，以调用valueOf 、toString的顺序调用
let t5 = {
    valueOf(){
        return -1;
    }
}
log(+t1) // 2
log(+t2) // NaN
log(+t3) // 0
log(+t4) // 1.1
log(+t5) // -1
