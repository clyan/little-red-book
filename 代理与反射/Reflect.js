const { log } = require('console');
const target = {
   name:'name',
   a:{
     writable: false
   }
}
try {
    Object.defineProperty(target, 'foo', {// 需要使用try catch来捕获错误
        value: 'bar',
    })      
} catch (error) {
    
}

// 返回状态的反射APi
log(Reflect.defineProperty(target, 'foo', {
    value: 'bar'
}))  // true



log(Reflect.get(target, 'a')); // { writable: '' }

log(Reflect.set(target, 'a', 123)); // ture
log(Reflect.get(target, 'a'));  //123
log(Reflect.has(target, 'a')); // true
log(Reflect.deleteProperty(target, 'a')); // true
Reflect.construct(function(name){       //想当于new 操作
    log(name)  // aa
}, ['aa']);

function Person() {
    
}
Person.prototype.name = 'Person'
let obj = {};
// 第一个是现有对象，第二是原型对象。
log(Reflect.setPrototypeOf(obj, Person.prototype)) // true
log(obj)

// 让对象变得不可拓展
Reflect.preventExtensions(target);

log(Reflect.defineProperty(target, 'bar', {
    value: 'foo',
}))  // false

try {
    Object.defineProperty(target, 'bar', {  // 需要使用try catch来捕获错误
        value: 'foo',
    })      
} catch (error) {
    log(error);         // Cannot define property bar, object is not extensible
}

function A() {
    console.log(this.name)  // 哈哈哈
}
let object = {name:'哈哈哈'}
Reflect.apply(A, object, []);
