
const { log } = console;

log('===================乘法操作===================');
// 乘法操作
log( 5 * 5 ) // 25

log( 5 * NaN ) // NaN
log( Infinity * Infinity ) // Infinity

log( -Infinity * Infinity ) // -Infinity
log( -Infinity * -Infinity ) // Infinity
log( 5 * Infinity ) // Infinity

log( 5 * -Infinity ) // -Infinity

log( 0 * Infinity ) // NaN

// 存在非数字，先默认使用Number转成数值类型再运算
log( 5 * '') // 0
log( 5 * []) // 0
log( 5 * false) // 0
log( 5 * true) // 5
log( 5 * {}) // NaN
log( 5 * '12a') // NaN

log('===================除法操作===================');
log( 5 / 5) // 1
log( 5 / NaN) // NaN
log( Infinity / Infinity) // NaN
log( Infinity / 12) // Infinity  (Infinity / -12) => -Infinity
log( 0 / 0) // NaN
log( 5 / 0) // Infinity -5/0 => -Infinity

//存在非数值，先转数值

log('===================取模操作===================');
log( 5 % 5)  // 0
log( 5 % Infinity)  // 5
log( Infinity % 5)  // NaN
log( Infinity % Infinity)  // NaN
log( 0 % 5)  // 0
log( 5 % 0)  // NaN