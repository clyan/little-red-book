const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
const PENDING = 'PENDING';
function initExecuteAsync() {
    let executeAsync = null;
    if (typeof process=='object' && process.nextTick) {
        executeAsync = process.nextTick
    } else if (typeof setImmediate=='function') {
        executeAsync = setImmediate
    } else {
        executeAsync = function (fn) {setTimeout(fn, 0)}
    }
    return executeAsync;
}
const executeAsync =  initExecuteAsync();

function isFunction (value) {
    return typeof value === 'function'
}

function MPromise (executor) {
    if (!isFunction(executor)) 
        throw new Error('The argument should be a function')
    this.value = null;
    this.reason = null;
    this.status = PENDING;
    this.onfulfilledList = [];
    this.onrejectedList = [];
    const resolve = (value) => {
        if (value instanceof MPromise) return value.then(resolve, reject) 
        setTimeout(() => {
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                this.onfulfilledList.forEach(cb => {
                    cb(this.value);
                })
            }
        },0)
    }
    const reject = (reason) => {
        setTimeout(() => {
            if(this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                this.onrejectedList.forEach(cb => {
                    cb(this.reason);
                })
            }; 
        }, 0);
    }
    try { 
        executor(resolve, reject);
    } catch (err) {
        reject(err)
    }
    
}

function resolvePromise(promise, result, resolve, reject) {
    if(promise === result) reject(new TypeError('error due to circular reference'));
    // 是否已经执行过 onfulfilled 或者 onrejected
    let consumed = false
    let thenable

    if(result instanceof MPromise) {
        if(result.status === PENDING) {
            result.then(data => {
                 resolvePromise(promise, data, resolve, reject)
            }, reject)
        } else {
            result.then(resolve, reject)
        }
        return;
    }
    let isComplexResult = target => (typeof result === 'function' || typeof result === 'object') && (target !== null);
    if (isComplexResult(result)) {
        try {
           
             thenable = result.then;
            if (typeof thenable === 'function') {
                thenable.call(result, 
                    (data) => {
                        if (consumed) {
                            return;
                        }
                        consumed = true;
                        return resolvePromise(promise, data, resolve, reject);
                    }, (error) => {
                        if (consumed) {
                            return;
                        }
                        consumed = true
                        return reject(error)
                  })
            } else {
                return resolve(result);
            }
        } catch (error) {
            if (consumed) {
                return
            }
            consumed = true
            return reject(error)
        }
    } else {
        return resolve(result);
    }
}
MPromise.prototype.then = function(onfulfilled, onrejected) {
    onfulfilled = isFunction (onfulfilled) ? onfulfilled : data => data;
    onrejected = isFunction (onrejected) ? onrejected : error => {throw error};
    let promise2

    if (this.status === FULFILLED) {
      return promise2 = new MPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            // 这个新的 promise2 resolved 的值为 onfulfilled 的执行结果
            let result = onfulfilled(this.value)
            resolvePromise(promise2, result, resolve, reject)
          }
          catch(e) {
            reject(e)
          }
        })
      })
    }
    if (this.status === REJECTED) {
      return promise2 = new MPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            // 这个新的 promise2 reject 的值为 onrejected 的执行结果
           let result = onrejected(this.reason)
           resolvePromise(promise2, result, resolve, reject)
          }
          catch(e) {
            reject(e)
          }
        })
      })
    }
    if (this.status === PENDING) {
      return promise2 = new MPromise((resolve, reject) => {
        this.onfulfilledList.push(value => {
          try {
            let result = onfulfilled(value)
            resolvePromise(promise2, result, resolve, reject)
          }
          catch(e) {
            return reject(e)
          }
        })
   
        this.onrejectedList.push(reason => {
          try {
            let result = onrejected(reason)
            resolvePromise(promise2, result, resolve, reject)
          }
          catch(e) {
            return reject(e)
          }
        })      
      })
    }
}
MPromise.defer = MPromise.deferred = function(){
    let dfd = {};
    dfd.promise = new MPromise((resolve, reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}
module.exports =  MPromise;