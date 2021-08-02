
// 匹配的方法  string.search,  regex.test,  string.exec,  regex.match

let { log } = console;

let regex = /\d/;
let string = 'abc123';
log('===================search===================');
// 返回查找的匹配的下标， 没有则返回 -1
// 判断一个字符串中是否有数字
console.log(string.search(regex));


log('===================test===================');
// 返回 true | false
log(string.test(string));


log('===================match===================');
let regex1 = /^(\d{4})\D(\d{2})\D(\d{2})$/;
let string1 = "2017-06-26";
log( string1.match(regex1) );
// 整个表达式返回的结果, 第一个（）匹配的结果，第二个（）匹配的结果， 第三个（）匹配的结果， 第一个匹配的下标
// =>["2017-06-26", "2017", "06", "26", index: 0, input: "2017-06-26"]

log('===================exec===================');
log( regex1.exec(string1) );

// exec与 match的区别
// 正则规则在有全局对象 (/ /g)时，匹配的数组用String.match()，能得到所有匹配项，而RegExp.exec()只能匹配第一项。
let text="cat,bat,sat,fat" ;
let pattern1=/.at/g
log(pattern1.exec(text))
log(text.match(pattern1));
