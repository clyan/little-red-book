let arr=[1,2,3,4,5,6,7,8,9,10]
let sum = arr.reduce( (total,i) => total += i,0);
console.log(sum);


// toSting 会将数组使用, 分割
var arr1=[1,2,3,[[4,5,[11]],6],7,8,9,10]
let arr2= arr1.toString().split(',').reduce( (total,i) => total += Number(i),0);
console.log(arr2);