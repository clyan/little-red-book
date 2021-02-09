const { log } = console;
//正则专门挑一本书学
log('=================== RegExp ===================');
let txt = 'cat, bat, sat, fat';
// 全局匹配
let pattenHasG = /at/g;
let matchHasG = pattenHasG.exec(txt);
log(matchHasG)

// 忽略大小写
log(/at/i)

// 多行匹配
log(/at/m)
log('=================== 粘贴模式 ===================');
// 粘贴模式，表示只查找从lastIndex开始及之后的字符串。
let pattenHasY = /.at/y;

let match = pattenHasY.exec(txt);
log(match['index'])  // 0
log(match[0])  // cat
log(pattenHasY.lastIndex)  // 3


match = pattenHasY.exec(txt);
log(match)  // null
log(pattenHasY.lastIndex)  // 0

//向前设置lastIndex
pattenHasY.lastIndex = 5
match = pattenHasY.exec(txt);
log(match['index'])  // 5
log(match[0])  // bat
log(pattenHasY.lastIndex)  // 8

// unicode模式，启动unicode匹配
log(/at/u)

// dotAll模式，表示元字符.匹配任何字符。
log(/at/s)

let patten1 = /[bc]at/i;
log(patten1.global, patten1.ignoreCase, patten1.unicode, patten1.sticky, 
    patten1.multiline, patten1.source, patten1.flags); // false true false false false [bc]at i

// 
log('=================== exec ===================');

let text = 'mom and dad and baby';
let patten = /mom( and dad( and baby)?)?/gi;
let matches = patten.exec(text)
log(matches) // [
            //'mom and dad and baby',   
            //' and dad and baby',
            //' and baby',
            //index: 0,
            // input: 'mom and dad and baby',
            //groups: undefined
            //]

log('=================== test ===================');
log(patten.test(text)) // false