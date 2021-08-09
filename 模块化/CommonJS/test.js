let a = require('./Com-b-base').a;
console.log('a', a); // 1
a = 4
console.log('a',a)  // 4
setTimeout(() => {
    const b = require('./Com-b-base').a;
    console.log('a', b); // 1
}, 100);





let b = require('./Com-b-object').b;
console.log('b', b);
b.name = 'll' // 影响内部模块
// b = {} 只影响外部， 不影响内部模块
console.log('b', b);

let c = require('./Com-b-object').b;
console.log('b', c);