
// 语法知识
let { log } = console;
log('=================== ?: ===================');
// ?: 表示不把分组的内容显示出来
let reg = /(\.?\.)/
let reg1 = /(?:\.?\.)/
let str = '.'
log(str.match(reg)) // 输出了（）匹配的结果 [ '.', '.', index: 0, input: '.', groups: undefined ]
log(str.match(reg1)) // 未输出（）匹配的结果  [ '.', index: 0, input: '.', groups: undefined ]



log('=================== ^ ===================');
// ^ 符号在不同情况下是不同的含义
 // 1. 代表一个空字符
let re = /^/
let str1 = ''
log(str1.match(re))  // [ '', index: 0, input: '', groups: undefined ]

// 2. 在[]中代表取反，这里代表非 .的字符
let re1 = /[^\.]/
let str2 = '.'
let str3 = 'a'
log(str2.match(re1)) //返回： null
log(str3.match(re1)) //匹配成功返回： [ 'a', index: 0, input: 'a', groups: undefined ]


log('=================== 惰性匹配 ===================');
// ? 惰性匹配效率低， 涉及到回溯
var regex = /id=".*?"/
var string = '<div id="container" class="main"></div>';
console.log(string.match(regex)[0]);
//解决
var regex1 = /id="[^"]*"/
console.log(string.match(regex)[0]);