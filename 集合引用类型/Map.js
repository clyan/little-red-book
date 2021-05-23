const { log } = console;
log('=================== Map ===================');

const map = new Map();
log(map.has('firstname')) // false
log(map.get('fistname')) // undefined
log(map.size); // 

log(map.set('firstname', 'Matt').set('lastname', 'HHH'))   // 返回Map对象可链式调用。
log(map.has('firstname')) // true
log(map.get('fistname')) // Matt
log(map.size); // 2

log(map.delete('firstname'))    // true 
log(map.clear())    // undefined

// Objcet 与 Map的区别， Object 只能使用数值，字符串， 或者符号， 作为键
// Map 可以使用任意类型。 使用严格对象相等的标准验证键的匹配性。 
// Objcet 与 Map的值都没有任何限制

// Map 会维护键值插入的顺序，
log('=================== 迭代 ===================');
const m = new Map([
    ['key', 'val1'],
    ['key2', 'val2'],
    ['key3', 'val3']
])

log(m.entries === m[Symbol.iterator]); // true

// entries[key,val] 迭代
for(let pair of m.entries()) {
    log(pair)   // [ 'key', 'val1' ]  [ 'key2', 'val2' ]  [ 'key3', 'val3' ]
}
// 转为数组
log([...m]) // [ [ 'key', 'val1' ], [ 'key2', 'val2' ], [ 'key3', 'val3' ] ]

m.forEach((val, key) => log(`${key} -> ${val}`)); // key -> val1   key2 -> val2  key3 -> val3

// keys() ,key迭代
for(let key of m.keys()) {
    log(key)    // key   key2    key3
}

// values
for(let key of m.values()) {
    log(key)    // val1   val2    val3
}

// 遍历过程中 keys(), 或 val(), key和val可修改，但是如下
let m1 = new Map([
    ['key', 'vall']
])
log('=================== 迭代中修改 ===================');
// 修改后，键依旧不变，说明字符类型说明字符 key不在迭代的时候修改
for(let key of m1.keys()) {
    key = 'newKey';
    log(key);   // newKey 
    log(m1.get('key'))  // vall
}
log(m1) // Map(1) { 'key' => 'vall' }

let keyObj = {id: 1};
let m2 = new Map([
    [keyObj, 'c']
])
// 对象的值改变了，但是， 他在map中映射的值不变
for(let key of m2.keys()) {
    key.id = 'newKey';
    log(key);   // { id: 'newKey' } 
    log(m2.get(keyObj))  // c
}
log(keyObj) // { id: 'newKey' }


// Map 与Object 对比

// 内存占用
// 内存相同Map 大约比Object 多存储50% 键值对

// 插入性能
// 大量插入操作， map更佳，  一般没有明显区别

// 查找速度
// 代码涉及大量查找操作时，object与map查询性能差异很小，少量与将连续的整数时，object更佳。

// 删除性能
// 涉及大量删除操作， Map更佳。


