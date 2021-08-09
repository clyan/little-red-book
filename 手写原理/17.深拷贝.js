// 手写递归实现
function deepClone(object, hash = new WeakMap()) {
  if(!object || typeof object !== 'object') return;
  if(hash.has(object)) return hash.get(object)
  let result = Array.isArray(object) ? [] : {}
  hash.set(object, result)
  for(let key in object) {
    if(object.hasOwnProperty(key)) {
      result[key] =  typeof object[key] === 'object' ? deepClone(object[key], hash) : object[key]
    }
  }
  return result;
}
function deepCloneByFor(object) {
  if(!object || typeof object !== 'object') return 

  let root = Array.isArray(object) ? [] : {}
  let uniqueDataList = []
  let stack = [
    {
      parent: root,
      key: void 0,
      data: object
    }
  ]
  while(stack.length) {
    let node = stack.pop()
    let { parent, key, data } = node
    let res = parent;
    if(typeof key !== 'undefined') {
      res = parent[key] = Array.isArray(data) ? [] : {}
    }
    let uniqueData = uniqueDataList.find((item) => item.source === data)
    if(uniqueData) {
      parent[key] = uniqueData.target
      continue
    }
    uniqueDataList.push({
      source: data,
      target: res
    })
    for (let k in data) {
      if(data.hasOwnProperty(k)) {
        if(typeof data[k] === "object") {
          stack.push({
            parent: res,
            key: k,
            data: data[k]
          })
        } else {
          res[k] = data[k]
        }
      }
    }
  }
  return root;
}
var a = {
  a1: 1,
  a2: {
    b1: 2,
    b2: {
      c1: [
        { a: 123 }
      ]
    }
  }
}
a.a3 = a;

var b = deepCloneByFor(a);
console.log(b);