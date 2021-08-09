function debounce(cb, delay = 1000) {
  let timer = null;
  return function(...rest) {
    let self = this
    if(timer) {
      clearTimeout(timer)
      timer = null;
    }
    timer = setTimeout(() => {
      cb.apply(self, rest)
    }, delay)
  }
}

const fn = function(a) {
  console.log(a)
}
const dfn = debounce(fn)
dfn(1)
dfn(1)
dfn(1)
