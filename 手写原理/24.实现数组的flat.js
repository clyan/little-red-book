const { log } = console; 
Array.prototype.flat = function(deep) {
  if(deep <= 0) return this
  return this.reduce((tol, cur) => {
    return tol.concat(Array.isArray(cur) ? cur.flat(deep--) :cur)
  }, [])
}
let arr = [1, [2, [3, 4]]];
log(arr.flat(1))
// 有问题