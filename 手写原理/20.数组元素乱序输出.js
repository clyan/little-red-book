
// 随机下标，与最后一个元素交换位置
var arr = [1,2,3,4,5,6,7,8,9,10];
let length = arr.length, randomIndex, temp;
while (length) {
  randomIndex = Math.floor(Math.random() * length--);
  temp = arr[length];
  arr[length] = arr[randomIndex];
  arr[randomIndex] = temp;
  console.log(randomIndex)

  console.log(arr)
}
console.log(arr)
