const { log } = console;
log('===================基本使用===================');
// 基本使用
(function SymbolNarmal() {
    // 基本类型之一
    let symbol = Symbol();
    log(typeof symbol);

    // 不能new 
    //let genericSymbo2 = new Symbol('genericSymbol'); // Symbol is not a constructor

    // 包装成Object
    let mySymbol = Symbol('mySymbol');
    let myWrapperedSymbol = Object(mySymbol);
    log(typeof  myWrapperedSymbol);

    // 参数：符号的描述 与值无关，Symbol唯一
    let foo = Symbol('genericSymbol');
    let foo1 = Symbol('genericSymbol');
    log(foo === foo1);  //false
})();

log('===================使用符号作为属性===================');
(function SymbolToObjectKey() {
    //使用符号作为属性
    let s1 = Symbol('foo');
    let s2 = Symbol('bar');
    let s3 = Symbol('baz');
    let s4 = Symbol('ggg');
    let o = {
        aaa: 123,
        [s1]: 'foo val',
    }
    log(o[s1]) //foo val

    Object.defineProperty(o, s2 , {
        value: 'bar val',
    });
    Object.defineProperties(o, {
        [s3]: {value: 'baz val'},
        [s4]: {value: 'ggg val'},
    });
    log(o[s2]) //bar val
    log(o[s3]) //baz val
    log(o[s4]) //ggg val

    //获取对象的key值和name，多个api的对比
    const oSymbols = Object.getOwnPropertySymbols(o);
    log(oSymbols) // [ Symbol(foo), Symbol(bar), Symbol(baz), Symbol(ggg) ]
    
    const oNames = Object.getOwnPropertyNames(o);
    log(oNames) // [ 'aaa' ]
    
    const ownKeys = Reflect.ownKeys(o); // 返回两种
    log(ownKeys) // [ 'aaa', Symbol(foo), Symbol(bar), Symbol(baz), Symbol(ggg) ]
    
    const keys = Object.keys(o) // [ 'aaa' ]
    log(keys) 
})();

log('===================Symbol.for全局符号表注册===================');
// Symbol.for全局符号表注册
(function globalTableWithFor() {
    let foo = Symbol('genericSymbol');
    let foo1 = Symbol('genericSymbol');
    let bar = Symbol.for('genericSymbol');
    let bar1 = Symbol.for('genericSymbol');
    log(bar === bar1);  //true

    // Symbol 与  Symbol.for 虽然符号描述相等，但也不相等
    log(foo1 === bar1);  //false

    // Symbol.for('字符串') 只能传入字符串，否则自动转成字符串 (按照 String() 转换规则进行转换)
    let fooBar = Symbol.for();
    log(fooBar);   //Symbol(undefined)

    let fooBar1 = Symbol.for({});
    log(fooBar1);   //Symbol([object Object])

    let fooBar2 = Symbol.for(null);
    log(fooBar2);   //Symbol(null)

    let fooBar3 = Symbol.for([]);
    log(fooBar3);   //Symbol(null)
})();


log('===================Symbol.hasInstance判断是否存在原型上===================');
// Symbol.hasInstance
(function hasInstance() {
    function Foo() {}
    let f = new Foo();
    log(Foo[Symbol.hasInstance](f));  // 判断是否在函数的原型上

    class Bar {}
    class Baz extends Bar {
        static [Symbol.hasInstance]() {
            return false;
        }
    }

    let b = new Baz();
    log(Bar[Symbol.hasInstance](b));    // true
    log(b instanceof Bar);  // true

    log(Baz[Symbol.hasInstance](b)); // false
    log(b instanceof Baz);  // false
})();

log('===================自定义Symbol.iterator，for...of 返回结果===================');
// 自定义Symbol.iterator 返回 generator next调用
(function iterator() {
    let obj = {
        *[Symbol.iterator]() {
            let keys = Object.keys(obj);
            let i = 0;
            while(i < keys.length) {
                yield [keys[i], obj[keys[i]]];
                i++;
            }
        },
        name: "123",
        age: 123,
    }
    for (const item of obj) {
        log('item', item[0], item[1]);
    }
})();

log('===================自定义Symbol.isConcatSpreadable , 决定 Array.prototype.concat===================');
// 自定义Symbol.isConcatSpreadable , 决定 Array.prototype.concat 的合并行为
(function isConcatSpreadable(){
    let  initial = ['foo'];
    let array = ['bar'];
    log(array[Symbol.isConcatSpreadable]); // undefined

    // 会直接将数组添加进去
    array[Symbol.isConcatSpreadable] = false;
    log(initial.concat(array)); // [ 'foo', [ 'bar', [Symbol(Symbol.isConcatSpreadable)]: false ] ]
    log(array.concat(initial)); // [ [ 'bar', [Symbol(Symbol.isConcatSpreadable)]: false ], 'foo' ]

    array[Symbol.isConcatSpreadable] = true;
    log(initial.concat(array)); // [ 'foo', 'bar' ]
    log(array.concat(initial)); // [ 'bar', 'foo' ]

    let arrayLikeObject = { 0: 'bar', length: 1};
    log(arrayLikeObject[Symbol.isConcatSpreadable]);  // undefined
    log(initial.concat(arrayLikeObject)); // [ 'foo', { '0': 'bar', length: 1 } ]
    arrayLikeObject[Symbol.isConcatSpreadable] = true;
    log(initial.concat(arrayLikeObject)); // [ 'foo', 'bar' ]

    let otherObject = new Set().add('bax');
    log(otherObject[Symbol.isConcatSpreadable]);  // undefined
    log(initial.concat(otherObject));   // [ 'foo', Set { 'bax' } ]
    otherObject[Symbol.isConcatSpreadable] = true;
    log(initial.concat(otherObject));  // [ 'foo' ]
})();


(function SymbolwithRegExp() {
    log('===================自定义Symbol.match===================');
    log(RegExp.prototype[Symbol.match]); // [Function: [Symbol.match]]
    log('foobar'.match(/bar/)); // [ 'bar', index: 3, input: 'foobar', groups: undefined ]
    class FooMatcher {
        static [Symbol.match](target) {
            return target.includes('foo')
        }
    }
    log('foobar'.match(FooMatcher));  // true
    log('baxbar'.match(FooMatcher));  // fasle

    class StringMatcher {
        constructor(str) {
            this.str = str;
        }
        [Symbol.match](target) {
            return target.includes(this.str)
        }
    }
    log('foobar'.match(new StringMatcher('ba')));  // true
    log('baxbar'.match(new StringMatcher('foo')));  // fasle

    log('===================自定义Symbol.replace===================');
    log(RegExp.prototype[Symbol.replace]); // [Function: [Symbol.replace]]
    log('foobaz'.replace('baz', 'foo')) // foofoo

    class StringReplacer {
        constructor(str) {
            this.str = str;
        }
        [Symbol.replace](target, replacement) {
            return target.split(this.str).join(replacement); // 将字符串分割，再连接
        }
    }
    log('barfoobaz'.replace(new StringReplacer('foo'), 'bbb')); // barbbbbaz


    log('===================自定义Symbol.search===================');
    log(RegExp.prototype[Symbol.search]); // [Function: [Symbol.search]]
    log('foobaz'.search(/baz/)) // 3  // 查找索引

    class StringSearcher {
        constructor(str) {
            this.str = str;
        }
        [Symbol.search](target) {
            return target.indexOf(this.str); // 将字符串分割，再连接
        }
    }
    log('fooBar'.search(new StringSearcher('foo'))) // 0
    log('fooBar'.search(new StringSearcher('Bar'))) // 3
    log('fooBar'.search(new StringSearcher('baz'))) // -1

    log('===================自定义Symbol.split===================');
    log(RegExp.prototype[Symbol.split]); // [Function: [Symbol.split]]
    log('foobaz'.split('oo')) //[ 'f', 'baz' ]

    class StringSpliter {
        constructor(str) {
            this.str = str;
        }
        [Symbol.search](target) {
            return target.split(this.str); // 将字符串分割，再连接
        }
    }
    log('fooBar'.search(new StringSpliter('oo'))) // [ 'f', 'Bar' ]

})()

log('===================自定义Symbol.toPrimitive , 定义对象转换成原始值（基本数据类型）的行为===================');
(function SymbolwithObject() {
    // 根据提供给这个参数（string, number, defalut） 可以控制返回的原始值
    class Foo{}
    let foo = new Foo();
    log(3 + foo); // 3[object Object]
    log(3 - foo); // NaN
    log(String(foo)) // [object Object]
    class Bar {
        constructor() {
            this[Symbol.toPrimitive] = function(hint){
                switch (hint) {
                    case 'number': 
                        return 3;
                    case 'string':
                        return 'string bar';
                    case 'defalut':
                    default:
                        return 'defalut bar'
                }
            }
        }
    }

    let bar = new Bar();
    log(3 + bar);   // 3defalut bar
    log(3 - bar);   // 0
    log(String(bar)); // string bar

    log('===================自定义Symbol.toStringTag , 定义对象转换成原始值（基本数据类型）的行为===================');
    let s = new Set();
    console.log(s);  // Set {}
    console.log(s.toString()); // [object Set]
    console.log(s[Symbol.toStringTag]); // Set

    console.log(Foo) // node: [Function: Foo] ; js: class Foo{}

    class FooBar {
        constructor() {
            this[Symbol.toStringTag] = '123456'
        }
    }
    let fooBar = new FooBar();
    console.log(fooBar);  // FooBar { [Symbol(Symbol.toStringTag)]: '123456' }
    console.log(fooBar.toString()); // [object 123456]
    console.log(fooBar[Symbol.toStringTag]); // 123456
})()

// others
// Symbol.unscopables, Symbol.species, Symbol.asyncIterator