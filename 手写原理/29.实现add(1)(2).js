function add(...rest) {
  let sum = rest.reduce((tol, cur) => tol + cur, 0)
  function fn(...args) {
    sum = args.reduce((tol, cur) => tol + cur,sum)
    return fn
  }
  fn.valueOf = function() {
    return sum;
  }
  fn.toString = function() {
    return sum;
  }
  return fn
}

console.log(add(1,3)(4,5))