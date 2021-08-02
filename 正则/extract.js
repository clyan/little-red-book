// 提取
// 
// matching中虽然整体匹配上了，但有时需要提取部分匹配的数据。
// 此时正则通常要使用分组引用（分组捕获）功能，还需要配合使用相关 API。

let { log } = console;

// match 和exec本身即返回了匹配结果
log('===================match===================');
var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
var string = "2017-06-26";
console.log( string.match(regex) ); // ["2017-06-26", "2017", "06", "26", index: 0, input: "2017-06-26"]

log('===================exec===================');
console.log( regex.exec(string) ); // ["2017-06-26", "2017", "06", "26", index: 0, input: "2017-06-26"]

log('===================test===================');
// 对于test 和search需要利用RegExp.$1，  RegExp.$2 提取（）中匹配的结果
var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
regex.test(string);
console.log( RegExp.$1, RegExp.$2, RegExp.$3 );  // => "2017" "06" "26


log('===================search===================');
// 对于test 和search需要利用RegExp.$1，  RegExp.$2 提取（）中匹配的结果
var regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
string.search(regex);
console.log( RegExp.$1, RegExp.$2, RegExp.$3 );  // => "2017" "06" "26


/**
 * 替换
 */

log('===================replace===================');
string.replace(regex, (match, year, month, day)=> {
  console.log(match, year, month, day) // 2017-06-26 2017 06 26
})

log('===================利用replace模板匹配===================');
let template = '<div>{{ name }}<div>'
let data = { name: 'ywy'}
let r = /\{\{\ (.*?) }\}/g
let result = template.replace(r, (match, key)=> {
  console.log(key)
  return data[key] 
})
log(result)


/**
 * 正则操作的方法，共有 6 个，字符串实例 4 个，正则实例 2 个
 *  String#search
    String#split
    String#match
    String#replace
    RegExp#test
    RegExp#exec
 */