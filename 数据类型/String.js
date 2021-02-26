const { log } = require('console');
//字符转换
+(function characterConverion () {
    // String(), 与 toString()行为一致
    function a() {};
    let animals = [1, 2], dog = {}, map = new Map(), set = new Set(), sm = Symbol(), 
        isAnimal = true, eat = function(){}, size = 11, name, cat = null;
    //当数组为空时 // ''
    log(animals.toString() === '');    // '1, 2'
    log(dog.toString()); // [object Object]
    log(map.toString());  // [object Map]
    log(set.toString());  // [object Set]
    log(sm.toString());   // Symbol()
    log(isAnimal.toString());   // 'true'
    log(eat.toString());   //  function(){}
    log(a.toString());     // function a() {}

    //数字根据进制转换，默认10进制
    log(size.toString());   // '11'
    log(size.toString(10)); // '11'
    log(size.toString(2)); // '1011'
    
    // underfined, null 不存在.toString()方法;
    // log(name.toString());   // 'Cannot read property 'toString' of undefined'
    // log(cat.toString());   // 'Cannot read property 'toString' of null'
    log(String(name));  //  undefined
    log(String(cat));   //  null
    
})();

// 模板字面量
+(function TemplateString () {
    let a = 123;
    let b = 456;
    /**
     * 
     * @param {*} strings 模板字符串数组，不包含参数  
     * @param  {...any} expression 参数数组
     */
    const tagRaw = (strings, ...expression) => {
        log(strings)        //  [ '\n + ', ' = ', '' ]
        log(expression)     //  [ 456, 579 ]
        for (const i of strings) {  // 输出字符表示的符号，如：\n会换行
            log(i)          
        }
        log('=====================================================')
        for (let i of strings.raw) {       //.raw属性获取原始字符串，如：\n 不会换行。相当于String.raw``
            log(i)
        }
        return strings[0] +  expression.map( (e, i) => `${e}${strings[i + 1]}`).join(''); //返回字符串
    }
    let re = tagRaw`\n + ${b} = ${ a + b }`;
    log(re);
})();

log(typeof null);   // object
log('=====================================================');
+(function api(params) {
    const message = 'abcde';
    log(message.length);
    log(message.charAt(0)); // a
    log(message.charCodeAt(0)); // 97   ps: 查看指定位置字符的字符编码
    log(97 == 0x61);    // true  ps: 97 等于十六进制0x61
    log(String.fromCharCode(0x61));  // a

    //正确解析单码元字符、代理元字符。此处未演示代理元字符
    log(message.codePointAt(0));  // 97
    // 不同编码显示同样的符号，互不相等
    log(String.fromCharCode(0x0041, 0x030A));   // Å  ps: 带圈圈的A
    log(String.fromCharCode(0x00c5)); // Å  ps: 带圈圈的A
    log(String.fromCharCode(0x212B)); // Å  ps: 带圈圈的A
    log(String.fromCharCode(0x212B) === String.fromCharCode(0x00c5));   // false ,互不相等
    // 规范化编码 NFC NFD NFKD NDKC
    log(String.fromCharCode(0x212B).normalize('NFC') === String.fromCharCode(0x00c5).normalize('NFC')); 


    log('a'.concat('b')); // ab;
    log('=========================提取子串============================');
    log('=========================slice============================');

    // 提取子串 slice substring  substr
    const stringValue = 'hello world';
     // 注意！！！！ slice 的第二参数表示，截取此前的字符串，如果小于第一个参数，则截取的为''(空字符串) 
    // 第一个参数 ： 起始位置 ， 第二个参数结束位置(不包括此位置)
    log(stringValue.slice(3)) // lo world
    log(stringValue.slice(3, 5)) // lo
    // 第一个与第二个负值参数 ： 字符串长度 + 负值（相当于：从后往前数。
    log(stringValue.slice(-3)) // rld
    log(stringValue.slice(3, -6)) // lo     ps:从后往前 第6位为 ' '(空格)
    log('=========================substring============================');
     // 第一个参数 ： 起始位置 ， 第二个参数结束位置(不包括此位置)
     // 注意！！！！ substring 的第二参数如果小于第一个参数，则截取的起始位置为第二参数， 结束位置为第一参数
    log(stringValue.substring(3)) // lo world
    log(stringValue.substring(3, 5)) // lo
    // 两个参数负值都会转换成 0;
    log(stringValue.substring(-3)) // hello world
    log(stringValue.substring(4, -2)) // hell     ps: -2转换成0 ，截取0 - 4

    log('=========================substr============================');
     // 第一个参数 ： 起始位置 ， 第二个参数: 子串的长度
    log(stringValue.substr(3)) // lo world
    log(stringValue.substr(3, 5)) // lo wo

    // // 第一个负值参数 ： 字符串长度 + 负值，  第二个参数负值会转换成0
    log(stringValue.substr(-3, 4)) //  rld  ps ：字符串长度-3,截取后面4位
    log(stringValue.substr(3, -5)) // '' ps ：第三位开始,截取后面0位


    log('=========================获取字符位置============================');
    const  indexStr = 'abcdebfg';
    log('=========================indexOf============================');
       // 从前往后搜索，搜索匹配到一个就停止
    log(indexStr.indexOf('b'))  // 1
    // 第二参数，从该位置开始往后搜索（包括该位置）
    log(indexStr.indexOf('b', 2))  // 5

    log('=========================lastIndexOf============================');
    // 从后往前搜索，搜索匹配到一个就停止
    log(indexStr.lastIndexOf('b'))  // 5
     // 第二参数，从该位置开始往前搜索,（包括该位置）
    log(indexStr.indexOf('b', 1))  // 1   



    log('=========================字符串包含============================');
    const  includeStr = 'abcdebfg';
    log('=========================includes============================');
     // 任意存在的连续的字符
    log(includeStr.includes('deb'));    //true
    log(includeStr.includes('acs'));    //false
    // 第二参数： 指定位置，忽略之前的位置, 负值转为 0 
    log(includeStr.includes('deb', 5));    //false
    log(includeStr.includes('abc', -5));   // true

    log('=========================startsWith============================');
    // 从前往后匹配，必须包含第一位，且连续
    log(includeStr.startsWith('abc'));    //true
    log(includeStr.startsWith('bcd'));    //false
    // 第二参数： 指定位置开始，忽略之前的位置, 负值转为 0
    log(includeStr.startsWith('bcd', 1));    //true
    log(includeStr.startsWith('abc', -3));    //true

    log('=========================endsWith============================');
    // 结束位置为字符串的长度  ，从后往前匹配，必须包含最后一位，且连续
    log(includeStr.endsWith('bfg'));    //true
    log(includeStr.endsWith('ebf'));    //true
    // 第二参数： 指定结束位置 (结束的位置之后的忽略)     , 负值转为 0
    log(includeStr.endsWith('abc', 3));    //true
    log(includeStr.endsWith('bfg', -3));    //fasle

   log('=========================消除空格============================');
   // 删除前后的空格， 中间的不删除！！！
    let tirmStr = '  abc   defg  '; 
    log(tirmStr.trim());         // 'abc   defg'    
    log(tirmStr.trimRight());    //'  abc   defg'
    log(tirmStr.trimLeft());     //'abc   defg  '


    log('=========================复制字符串============================');
    log('=========================repeat============================');
    let repeatStr = 'na';
    log(repeatStr.repeat(5) + ' five') // 'nanananana five'

    log('=========================padStart============================');
    // 第一参数： 指定长度， 第二参数：指定字符，（ 如果小于指定长度，则在左边添加对应字符）
    log(repeatStr.padStart(6))   // '    na'
    log(repeatStr.padStart(6, '.'))   //'....na'
    log('=========================padEnd============================');
    log(repeatStr.padEnd(6))   // 'na    '
    log(repeatStr.padEnd(6, '.'))   //'na....'


    log('=========================字符串迭代解构@@Iterator============================');
    let iteStr = 'abc';
    
    let iteratorStr = iteStr[Symbol.iterator]();
    // log([...iteratorStr]); //[ 'a', 'b', 'c' ];   ps：此处如果已经使用...解构,那么迭代器已经done,
    // 下面的iteratorStr.next() 输出 { value: undefined, done: true }， for of 不会再执行

    log(iteratorStr.next());    // { value: 'a', done: false }
    for(const i of iteratorStr) {
        log(i)      // b  // c     ps：因为iteratorStr.next() 已经执行了一次，所以不输出a
    }
    log([...iteratorStr]); //[]  ps ：迭代器已经done,所以为空


    log('=========================字符串大小转换============================');
    const bigSmallStr = 'aBcD';
    log(bigSmallStr.toUpperCase())   //ABCD

    log(bigSmallStr.toLowerCase())  // abcd
    // 用于特定地区， toUpperCase与toLowerCase在某些语言如土耳其语，转换会有问题，
    // 优先使用toLocaleUpperCase, toLocaleLowerCase
    log(bigSmallStr.toLocaleUpperCase()) //ABCD
    log(bigSmallStr.toLocaleLowerCase()) // abcd

    log('=========================字符串模式匹配============================');
    // 正则阶段统一学,初步了解
    let pattenStr = 'cat,cat,cat';
    let patten = /,cat/

    // 相当于正则的exec
    log(pattenStr.match(patten))    // [ ',cat', index: 3, input: 'cat,cat,cat', groups: undefined ]
    // 查找位置
    log(pattenStr.search(patten))   // 3
    // 替换特定字符
    log(pattenStr.replace(patten, 'aaa'));


    log('=========================比较字符串字母的顺序============================');
    // 从首字母开始一个个比较，相等就都往后移一位比较，都相等则返回0， 遇到有大的就返回1 ,小的返回-1,并不再往后比较
    // 与语言有关，英文按照A-Za-z,大写字母排前面(Z < a; z < a ; A > a; A > Z)
    let compareStr = 'yellow';
    log(compareStr.localeCompare('bggggg'));   // 1
    log(compareStr.localeCompare('yellom')); // 0
    log(compareStr.localeCompare('zff')); // -1
    log(compareStr.localeCompare('Zff')); // -1


})();

