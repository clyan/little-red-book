const FULFILLED = 'fullfilled';
const REJECTED = 'rejected';
const PENDING = 'pending';
function isFunction(value) {
    return typeof value === 'function';
}
function MyPromise(executor) {
    if(!isFunction(executor)) return new TypeError('The argument should a function');
    this.value = void 0;
    this.reason = void 0;
    this.status = PENDING;
    this.onfulfilledList = [];
    this.onrejectedList = [];
    const resolve = (value) => {
        if(value instanceof MyPromise) return value.then(resolve, reject);
        setTimeout(() => {
            if(this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                this.onfulfilledList.forEach(cb => {
                    cb(this.value)
                })
            }
        }, 0)
    }
    const reject = (value) => {
        setTimeout(() => {
            if(this.status === PENDING) {
                this.status = REJECTED;
                this.reason = value;
                this.onrejectedList.forEach(cb => {
                    cb(this.reason)
                })
            }
        }, 0)
    }
    try {
        executor(resolve, reject)
    } catch (error) {
        reject(error)
    }
}


function resolvePromise(promise, result, resolve, reject) {
    if (promise === result) reject(new TypeError('不能循环引用'));
    
    let consumed = false, thenable = null;
    if (result instanceof MyPromise) {
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
            if(isFunction(thenable)) {
                thenable.call(result, data => {
                    if(consumed) return;
                    consumed = true;
                    return resolvePromise(promise, data, resolve, reject)
                }, err => {
                    if(consumed) return;
                    consumed = true;
                    return reject(err)
                })
            } else {
                return resolve(result);
            }
        } catch (error) {
            if(consumed) return;
            consumed = true;
            return reject(error)
        }
    } else {
        return resolve(result);
    }
}
MyPromise.prototype.then = function(onfulfilled, onrejected) {
    onfulfilled = isFunction(onfulfilled) ? onfulfilled : data => data;
    onrejected = isFunction(onrejected) ? onrejected : err => { throw err; };
    let promise2;
    if(this.status === FULFILLED) {
        return promise2 = new MyPromise((resolve, rejected) => {
            setTimeout(() => {
                try {
                    let result = onfulfilled(this.value);
                    resolvePromise(promise2, result, resolve, rejected);
                } catch (error) {
                    rejected(error)
                }
            }, 0)
        })
    }
    if(this.status === REJECTED) {
        return promise2 = new MyPromise((resolve, rejected) => {
            setTimeout(() => {
                try {
                    let result = onrejected(this.reason);
                    resolvePromise(promise2, result, resolve, rejected);
                } catch (error) {
                    rejected(error)
                }
            }, 0)
        })
    }
    if(this.status === PENDING) {
        return promise2 = new MyPromise((resolve, rejected) => {
            this.onfulfilledList.push((value)=> {
                try {
                    let result = onfulfilled(value);
                    resolvePromise(promise2, result, resolve, rejected);
                } catch (error) {
                    rejected(error)
                }
            })
            this.onrejectedList.push((value)=> {
                try {
                    let result = onrejected(value);
                    resolvePromise(promise2, result, resolve, rejected);
                } catch (error) {
                    rejected(error)
                }
            })
        })
    }
}
MyPromise.defer = MyPromise.deferred = function(){
    let dfd = {};
    dfd.promise = new MyPromise((resolve, reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}
module.exports =  MyPromise;