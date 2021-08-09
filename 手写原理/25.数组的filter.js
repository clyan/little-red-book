const { log } = console; 
Array.prototype.filter = function(fn) {
  let result = []
  for (let index = 0; index < this.length; index++) {
    fn(this[index]) && result.push(this[index])
  }
  return result
}
const arr = [1,2,3,4,5,6,7,8]
log(arr.filter((item) => item > 5))