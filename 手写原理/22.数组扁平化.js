const { log } = console;
// flat扁平化
let arr = [1, [2, [3, 4]]];
log(arr.flat(Infinity))


// toString split
log(arr.toString().split(',').map(item => Number(item)))


// 递归concat
function flat(arr) {
  if(!Array.isArray(arr)) return;
  let result = []
  for (let index = 0; index < arr.length; index++) {
    if(Array.isArray(arr[index])) {
      result = result.concat(flat(arr[index]))
    } else {
      result.push(arr[index])
    }
  }
  return result;
}
log(flat(arr))


// reduce concat
function flat1(arr) {
  if(!Array.isArray(arr)) return;
  return arr.reduce((tol, cur) => {
    return tol.concat(Array.isArray(cur)? flat(cur) : cur)
  }, [])
}

log(flat1(arr))