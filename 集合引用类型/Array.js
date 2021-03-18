const { log } = console;
log('=================== Array ===================');

log('=================== concat ===================');
// 不影响原数组。。
const a = [1]
const b = [2]
log(a.concat(b))
log(a)
log(b)

log('=================== copyWithin ===================');

// copyWithin() 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。
const array1 = ['a', 'b', 'c', 'd', 'e'];
log(array1.copyWithin(0, 3, 4));    // [ 'd', 'b', 'c', 'd', 'e' ]

log('=================== entries ===================');
const iterator1 = array1.entries();
log(iterator1.next().value, iterator1.next().value, iterator1.next().value); // [ 0, 'd' ] [ 1, 'b' ] [ 2, 'c' ]


log('=================== every ===================');
// every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。
const isBelowThreshold = (currentValue, index, arr) => {
    return currentValue < 40
};

const array2 = [1, 30, 39, 29, 10, 13];

console.log(array2.every(isBelowThreshold)); // true

log('=================== fill ===================');
// fill() 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。

const array3= [1, 2, 3, 4];
// value  start end;
// fill with 0 from position 2 until position 4
console.log(array3.fill('a', 2, 4)); // [ 1, 2, 'a', 'a' ]

console.log(array3.fill(5, 1)); //  [1, 5, 5, 5]

console.log(array1.fill(6)); // [6, 6, 6, 6]

log('=================== filter ===================');
// filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。

const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);
log(result); // [ 'exuberant', 'destruction', 'present' ]

log('=================== find ===================');
//  find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
const array4 = [5, 12, 8, 130, 44];
const found = array4.find(element => element > 10);
console.log(found); // 12

log('=================== findIndex ===================');
// findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回-1。

const isLargeNumber = (element) => element > 13;

console.log(array3.findIndex(isLargeNumber)); // -1

log('=================== flat ===================');
// flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回
const arr1 = [0, 1, 2, [3, 4],[5,[6, [7]]]];

console.log(arr1.flat()); //[ 0, 1, 2, 3, 4, 5, [ 6, [ 7 ] ] ]
// 指定深度
console.log(arr1.flat(Infinity));   // [0, 1, 2, 3,4, 5, 6, 7]



// flatMap() 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 map 连着深度值为1的 flat 几乎相同
const arr2 = [0, 1, 2, [3, 4],[5,[6, [7]]]];    // [ 0, 4, 8, NaN, NaN ]
console.log(arr2.flatMap(item => item * 4));
log('=================== forEach ===================');
arr2.forEach((item, index, list)=> {

}) //第二参数指向this


log('=================== from ===================');
log(Array.from('foo')) // [ 'f', 'o', 'o' ]

log('=================== includes ===================');
// includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false
log(arr2.includes(0)) // true
// indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
log(arr2.indexOf(1)) // 1


log('===================   isArray  ===================');
Array.isArray([1, 2, 3]);// true

log('===================   join  ===================');

const elements = ['Fire', 'Air', 'Water'];

console.log(elements.join()); // Fire,Air,Water

log('===================   keys  ===================');
//  keys() 方法返回一个包含数组中每个索引键的Array Iterator对象。

const array5 = ['a', 'b', 'c'];
const iterator = array5.keys();

for (const key of iterator) {
  console.log(key);
}
// expected output: 0
// expected output: 1
// expected output: 2

log('===================   lastIndexOf  ===================');
const animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];

console.log(animals.lastIndexOf('Dodo'));  // expected output: 3

log('===================   map  ===================');



const array6 = [1, 4, 9, 16];

// pass a function to map
const map1 = array6.map(x => x * 2);

console.log(map1); // [ 2, 8, 18, 32 ]

log('===================   of  ===================');
// of

let ofArr = Array.of(7, ['123']);      
log(ofArr) // [ 7, [ '123' ] ]


log('===================   reduce  ===================');
const array7 = [1, 2, 3, 4];
const reducer = (acc, cur, index, arr) => acc + cur;

console.log(array7.reduce(reducer)); // 第二参数，初始值

log('===================   reverse  ===================');
log( ['one', 'two', 'three'].reverse()) // [ 'three', 'two', 'one' ]

log('===================   slice  ===================');
// slice() 方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变
const animalss = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animalss.slice(2));



log('===================   some  ===================');
log(animalss.some(element => element === 'bison')) // true


log('===================   splice  ===================');
// [start, count, replcae] 如果start大于数组长度则，在数组后添加元素
const months = ['Jan', 'March', 'April', 'June'];
months.splice(4, 0, 'Feb');
log(months) // [ 'Jan', 'March', 'April', 'June', 'Feb' ]
months.splice(5, 0); // 不做任何操作
log(months)

months.splice(2, 3); // 不做任何操作
log(months) // [ 'Jan', 'March' ]


log('===================   values  ===================');


let arr3 = ['w', 'y', 'k', 'o', 'p'];
let eArr = arr3.values();

for (let letter of eArr) {
  console.log(letter);
} //"w" "y "k" "o" "p"

log('===================   values  ===================');

const array9 = [1, 2, 'a', '1a'];

console.log(array9.toString());  // 1,2,a,1a








