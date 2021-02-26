const { log } = console;

// 布尔计算，记反例,其余的都为true

log(Boolean(''))
log(Boolean(null))
log(Boolean(undefined))
log(Boolean(false))
log(Boolean(0))
log(Boolean(NaN))

// 包装成对象，进行布尔运算时也是按照对象的转换规则
let booleanObject = new Boolean(false);
log(booleanObject) // [Boolean: false]
log(booleanObject && true) // true
log(false && true) // false
log(typeof booleanObject) // object
log(typeof false) // boolean

