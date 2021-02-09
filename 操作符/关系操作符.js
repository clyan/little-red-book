const { log } = console;

log( 1 > 2)
log( 1 >= 2)
log( 1 < 2)
log( 1 <= 2)


// 字符串比较 逐个比较字符的 编码
log( 'Brick' < 'alphabet')  // true, 原理 B的编码为 66， a的编码 97

log( 'Brick'.toUpperCase() < 'alphabet'.toUpperCase()) // false

log('23' < '3') // true   两个字符编码比较， 2编码：50 ， 3编码 51;

log('23' < 3) // false; //会先转换成数值再比较


// NaN比较任意值都为 false
log('a' <= 3) // false  'a' 转换成数字为 NaN
log(NaN <= 3) // false
log(NaN > 3) // false