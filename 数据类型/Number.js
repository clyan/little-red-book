// 'use strict';
const { log } = console;
(function normal(){
    log('===================十进制===================');
    // 十进制
    log(15)

    log('===================二进制===================');
    // 二进制
    log(Number('0b01'))  // 1

    log('===================八进制===================');
    //严格模式下报错, 在严格模式下不允许前导为零的小数。
    // 八进制, 三位二进制
    log(075)  // 61 解释：(5 * 1) + (7 * 8 )
    log(079) // 79 ，解释： 9超过8进制最大数， 所以当作10进制处理
    log(Number('0o79'))  // 61

    log('===================十六进制===================');
    // 十六进制, 四位二进制
    log(0xA) // 10
    log(0x1f) // 31 解释：001f =  (15 * 1) + (1 * 16)  , f = 15

    log('===================浮点数===================');
    // 浮点数
    log(1.0); // 1  //小数点后面接0， 自动转整数, 节省内存空间
    log(1.1); // 1.1
    log(.1);  // 0.1 ,不推荐，建议使用 0.1

    log('===================科学计数法===================');
    // 科学计数法
    log(3.14e7) // 31400000 , 表示 3.14 乘 10 的 7 次方
    log(3.14e-6) // 0.00000314
    log(3.14e-7) // 3.14e-7, 默认情况下小数点超过6位，使用科学计数法

    log('===================浮点精度问题===================');
    // 浮点精度问题
    log(0.1 + 0.2) // 0.30000000000000004, 原因 IEEE 754 数值导致

    log('===================值的范围===================');
    // 值的范围
    log(Number.MAX_VALUE) // 1.7976931348623157e+308 
    log(Number.MIN_VALUE) // 5e-324
    log(5e-325) // 0
    // Infinity 不能用于计算
    log(1.7976931348623157e+309) // Infinity
    log(Number.NEGATIVE_INFINITY) // -Infinity
    log(Number.POSITIVE_INFINITY) // Infinity

    log('===================是否有限isFinite===================');
    log(isFinite(Number.NEGATIVE_INFINITY)) // false
    log(isFinite(111))   // true

    log('===================是否是数值isNaN===================');
    // 不是数值
    log(NaN) // NaN
    log(isNaN(123)) // false
    log(isNaN(Number('ss'))) // true
    log(2 / 0) // Infinity
    log(0 / 0) // NaN
    log(0 / 2) // 0



    log('===================Number 转换规则===================');
    log(Number(true), Number(false)) // 1    // 0
    log(Number(''), Number('123'), Number('jkl'), Number('123jkl')) // 0   // 123  // NaN  //NaN
    log(Number(null), Number(undefined)) // 0   //NaN
    log(Number({}), Number([]))  // NaN   //0
    log(Number('0xf'), Number('1.1'), Number('.1'), Number('001')) // 15   //1.1  // 0.1  // 1


    log('=================== parseInt转换规则===================');
    // parseInt('123', 1) //第二个参为进制数
    // parseInt 从字符的第一个开始匹配，直到匹配的不是数字，
    log(parseInt(true), parseInt(false)) // NaN    // NaN
    log(parseInt(''), parseInt('123'), parseInt('jkl'), parseInt('123jkl')) // NaN   // 123  // NaN  // 123
    log(parseInt(null), parseInt(undefined)) // NaN   //NaN
    log(parseInt({}), parseInt([]))  // NaN   // NaN
    log(parseInt('0xf'), parseInt('1.1'), parseInt('.1'), parseInt('001')) // 15   //1  // 0  // 1


    log('=================== parseFloat 转换规则===================');
    // parseFloat 只能解析十进制数,第二参数无效   从字符的第一个开始匹配，直到匹配的不是数字，或者不是第一个小数点， 
    log(parseFloat(true), parseFloat(false)) // NaN    // NaN
    log(parseFloat(''), parseFloat('123'), parseFloat('jkl'), parseFloat('123jkl')) // NaN   // 123  // NaN  // 123
    log(parseFloat('.5'), parseFloat('.5.5'), parseFloat('.5ff')) // 0.5  // 0.5  // 0.5
    log(parseFloat(null), parseFloat(undefined)) // NaN   //NaN
    log(parseFloat({}), parseFloat([]))  // NaN   // NaN
    log(parseFloat(0xf), parseFloat('0xf'),parseFloat(1.1), parseFloat(.1), parseFloat(001)) // 15  // 0  //1。1  // 0.1  // 1
    // 16进制的字符串永远返回 0

    log('===================isNaN===================');
    // 由isNaN('123fs') 可知, 数值转换默认使用Number 的转换方式
    log(isNaN(true)) // false
    log(isNaN('123')) // false
    log(isNaN('123fs')) // true
    log(isNaN('')) // false
    log(isNaN({})) // true
    log(isNaN([])) // false
})();
(function numberObject() {           
    let numblerObject = new Number(0.15158888888888888888888888888888888888888888888888888888888888888);
    // node v14.15.0 最大支持17位
    log(numblerObject.toFixed(17)) // 0.15158888888888888
    log(numblerObject.toFixed(50)) // 错误结果 0.15158888888888888413220001893932931125164031982422
})();
