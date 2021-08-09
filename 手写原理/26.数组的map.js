const { log } = console; 
Array.prototype.map = function(fn) {
  let result = [];
  for (let index = 0; index < this.length; index++) {
    result.push(fn(this[index]))
  }
  return result
}

const arr = [1,2,3,4,5,6,7,8]
log(arr.map((item) => item + 1))