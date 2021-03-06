const { log } = console;
// weakMap 的键只能时Object, 否则报 TypeError
let key1 = {id:1};
let key2 = {id:2};
let key3 = {id:3};
const wm = new WeakMap([
    [key1, '123'],
    [key2, '1234'],
    [key3, '12345'],
]);

log(wm.get(key1)) // 123

// TypeError: Invalid value used as weak map key
// const wm1 = new WeakMap([
//     [key1, '123'],
//     ['key2', '1234'],       // Invalid value used as weak map key
//     [key3, '12345'],
// ]);


const wm2 = new WeakMap();
wm2.set({}, 123);
// 原因 ，{} 定义在内部，没有指向这个对象的其他引用, 对象键会被垃圾回收，就娶不到值了
log(wm2.get({}))    // undefined

let wm2obj = {}

const wm3 = new WeakMap();
wm3.set(wm2obj, 123);
// 可以取到值
log(wm3.get(wm2obj))    // 123

// WeakMap 不提供 迭代， 与clear, 因为对象作为键，随时会被清空，没有意义


