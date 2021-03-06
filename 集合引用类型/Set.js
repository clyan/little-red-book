const { log } = console;

// set会维护值插入时的顺序
//使用数组初始化。set中的值唯一
const set = new Set(['1',1, 2]);
// set 中 '1' 与 1 是不同的元素。
log(set)        // Set(3) { '1', 1, 2 }

// 使用  *[Symbol.iterator] 初始化对象
const set2 = new Set({
    *[Symbol.iterator]() {
        yield "123";
        yield "789";
        yield "456";
    }
})
set2.add('1').add('3').add('4')
log(set2)   // Set(6) { '123', '789', '456', '1', '3', '4' }

for(let i of set2) {
    log(i)  
}

// 注意entries 返回的是 [‘val', 'val'] 的形式
for(let pair of set2.entries()) {
    log(pair)   // [ '123', '123' ] [ '789', '789' ] [ '456', '456' ] [ '1', '1' ] .... 
}
//keys() 与 values()返回的是一样的值


// 遍历中修改 ，key val 的表现与 Map表现一致。。