//字符转换
(function characterConverion () {
    // String(), 与 toString()行为一致
    function a() {};
    let animals = [1, 2], dog = {}, map = new Map(), set = new Set(), sm = Symbol(), 
        isAnimal = true, eat = function(){}, size = 11, name, cat = null;
    //当数组为空时 // ''
    console.log(animals.toString() === '');    // '1, 2'
    console.log(dog.toString()); // [object Object]
    console.log(map.toString());  // [object Map]
    console.log(set.toString());  // [object Set]
    console.log(sm.toString());   // Symbol()
    console.log(isAnimal.toString());   // 'true'
    console.log(eat.toString());   //  function(){}
    console.log(a.toString());     // function a() {}

    //数字根据进制转换，默认10进制
    console.log(size.toString());   // '11'
    console.log(size.toString(10)); // '11'
    console.log(size.toString(2)); // '1011'
    
    // underfined, null 不存在.toString()方法;
    // console.log(name.toString());   // 'Cannot read property 'toString' of undefined'
    // console.log(cat.toString());   // 'Cannot read property 'toString' of null'
    console.log(String(name));  //  undefined
    console.log(String(cat));   //  null
    
})();

// 模板字面量
(function TemplateString () {
    let a = 123;
    let b = 456;
    /**
     * 
     * @param {*} strings 模板字符串数组，不包含参数  
     * @param  {...any} expression 参数数组
     */
    const tagRaw = (strings, ...expression) => {
        console.log(strings)        //  [ '\n + ', ' = ', '' ]
        console.log(expression)     //  [ 456, 579 ]
        for (const i of strings) {  // 输出字符表示的符号，如：\n会换行
            console.log(i)          
        }
        console.log('=====================================================')
        for (let i of strings.raw) {       //.raw属性获取原始字符串，如：\n 不会换行。相当于String.raw``
            console.log(i)
        }
        return strings[0] +  expression.map( (e, i) => `${e}${strings[i + 1]}`).join(''); //返回字符串
    }
    let re = tagRaw`\n + ${b} = ${ a + b }`;
    console.log(re);
})();


console.log(typeof null);