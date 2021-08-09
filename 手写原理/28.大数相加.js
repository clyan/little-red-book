const { log } = console; 
let num1 = "123456"
let num2 = "123456"
function BigSum(num1, num2) {
  let len1 = num1.length -1, len2 = num2.length - 1, n1, n2, tail = 0;
  let res = '';
  while(len1 >= 0 || len2 >= 0) {
    n1 = len1 >= 0 ? num1.charAt(len1) : 0
    n2 = len2 >= 0 ? num2.charAt(len2) : 0
    let temp = Number(n1) + Number(n2) + tail
    tail = Math.floor(temp / 10)
    res =  temp % 10 + res
    len1--
    len2--
  }
  return res
}
log(BigSum(num1, num2))
// 246,912