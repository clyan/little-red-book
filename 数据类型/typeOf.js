const { log } = console;

log(typeof 123);  // number
log(typeof ''); // string
log(typeof {}); // object
log(typeof true) // boolean
log(typeof Symbol()) //symbol
log(typeof null) // object
log(typeof undefined) // undefined
log(typeof (()=>{})) // function


// 注意，未声明变量也为 undefined
log(typeof a) // undefined

// undefined 由 null派生而来
log(undefined == null) // true
log(null == null) // true
log(undefined == undefined) // true

log(undefined === null) // false
log(null === null) // true
log(undefined === undefined) // true