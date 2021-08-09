function curry(fn, ...args) {
  return fn.length <= args.length ? fn(...args) : curry.bind(null, fn ,...args)
}
function a(b, c, d) {
  console.log(b,c,d)
}
curry(a, 1, 2)