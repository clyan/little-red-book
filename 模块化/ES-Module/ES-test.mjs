import a from './ES-a-default-base.mjs';
import b from './ES-a-default-object.mjs';
import { c } from './ES-a-export-base.mjs';
import { d } from './ES-a-export-object.mjs';
// export default 导出基本类型内部改变后，外部不会变
console.log('a', a); // a 1
// a = 3 // 不能修改
setTimeout(() => {
    console.log('a', a); // a 1
}, 100);

// export default 导出引用类型 内部改变后，外部引用也会变
console.log('b', b); // b { name: 'ywy' }
// b = 3 // 不能修改
setTimeout(() => {
    console.log('b', b); // b { name: 'wj' }
}, 100);


// export 导出基本类型内部改变后，外部也会变
console.log('c', c);
// c = 3 // 不能修改
setTimeout(() => {
    console.log('c', c);
}, 100);


// export 导出引用类型内部改变后，外部也会变
console.log('d', d);
// c = 3 // 不能修改
setTimeout(() => {
    console.log('d', d);
}, 100);