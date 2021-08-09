const { log } = console; 
const array = [5, 9, 1, 2, 8];
log(Array.from(new Set(array))); // [1, 2, 3, 5, 9, 8]


// map记录
function uniqueArray(arr) {
  let map = new Map();
  const result = []
  for(let i of arr) {
    if(map.has(i)) {
      continue;
    }
    result.push(i)
    map.set(i, true)
  }
  return result;
}
log(uniqueArray(array))