let PENDING = 'pending'
let REJECTED = 'rejected'
let FULFILLED= 'fulfilled'

function MyPromise(exec) {
  this.state = PENDING
  this.value = void 0;
  this.reason = void 0;
  this.fulfilliedList = [];
  this.rejectedList = [];
  let resolve = (val) => {
    if(val instanceof MyPromise)
      return val.then(resolve, reject)
    setTimeout(() => {
      if(this.state === PENDING) {
        this.state = FULFILLED;
        this.value = val;
        this.fulfilliedList.forEach((cb) => {
          cb(val)
        })
      }
    }, 0)
  }
  let reject = (res) => {
    setTimeout(() => {
      if(this.state === PENDING) {
        this.state = REJECTED;
        this.reason = res;
        this.rejectedList.forEach((cb) => {
          cb(res)
        })
      }
    }, 0)
  }
  try {
    exec(resolve, reject)
  } catch (error) {
    reject(error)
  }
}