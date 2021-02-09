const { log } = console;

// 逻辑非  ！
// 相当于将 值先Boolean() 运算再取反
log(!0)
log(!undefined)
log(!null)
log(!'')
log(!NaN)
log(!false)

log('=================== 逻辑与 && ===================');
// 逻辑与
// 先进行Boolean() 运算, 前者为 ture 返回后者， 前者为false 返回本身
log( 3 && 2) // 2
log( {} && 2) // 2
log( undefined && 2) // undefined
log( null && 2) // null
if(3 && 2) {
    console.log('输出')
}
if(3 && undefined) {
    console.log('不输出')
}
if(null && 2) {
    console.log('不输出')
}

log('=================== 逻辑或 || ===================');
// 逻辑或 ||
log( 3 || 2) // 3
log( {} || 2) // {}
log( undefined || 2) // 2
log( null || 2 || 3) // 2
//如果都为false, 则返回最后一个
log( null || undefined) // undefined

