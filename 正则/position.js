// 位置匹配
const { log } = console;

log('===================是正向先行断言和负向先行断言===================');
log('===================  (?=)  ===================');
// (?=p)，其中 p 是一个子模式，即 p 前面的位置，或者说，该位置后面的字符要匹配 p。
// 比如 (?=l)，表示 "l" 字符前面的位置，例如：

var result = "hello".replace(/(?=l)/g, '#');
console.log(result); // => "he#l#lo"

log('===================  (?!)  ===================');
// 而 (?!p) 就是 (?=p) 的反面意思，比如：
var result = "hello".replace(/(?!l)/g, '#');
console.log(result); // #h#ell#o#

log('===================  千分位分割  ===================');
var num = '123456.789 123456.456'
log(isNaN(num))
var reg = /\B(?=(\d{3})+\.)/g
console.log(num.replace(reg, ','))



log('===================  (?<=) 后行断言  ===================');
// (?<=l)代表所有满足在 l 后面的位置
var result = "hello".replace(/(?<=l)/g, '#');
console.log(result); // hel#l#o
// (?<=l)o 代表所有满足在 l 后面的 o
console.log("heollo".replace(/(?<=l)o/g, '#')); // heoll#

log('===================  (?<!) 后行否断言  ===================');
// (?<!l)l 代表除了所有满足在 l 后面的 o
console.log("heollo".replace(/(?<!l)o/g, '#')); // he#llo





log('===================  替换b前面的a  ===================');
var str = 'vanababfa'
var reg = /a(?=b)/g
log(str.replace(reg, 'c'))

log('===================  匹配身份证  ===================');
let shenfen = /^[1-6]\d{5}([1-2]\d{3})(0[1-9]|1[1-2])(0[1-9]|[1-2][0-9]|3[0-1])(?:\d{4}|\d{3}[xX])$/
let s = "43042619990231011x"
log(s.match(shenfen))