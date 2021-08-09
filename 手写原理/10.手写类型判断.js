function getType(value) {
  if(value === null) return value + ''
  if(typeof value === 'object') {
    let type = Object.prototype.toString.call(value)
    return type.split(' ')[1].split(']')[0].toLowerCase()
  } else {
    return typeof value
  }
}
console.log(getType(0))
console.log(getType([]))

console.log(getType({}))
console.log(getType(()=>{}))

console.log(getType(false))
console.log(getType(undefined))
console.log(getType(null))
console.log(getType('1'))