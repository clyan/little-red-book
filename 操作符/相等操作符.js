const { log } = console;

log('===================相等与不相等操作===================');
log(null == undefined) // true

log(null == 0) // true

log(null == null) // true

log(undefined == undefined) // true

log(undefined == void 0) // true

log(NaN == NaN) // false


log('===================全等与不全等操作===================');
log('55' === 55) //false 

log(undefined === null) //false 

log(undefined !== null) //true 