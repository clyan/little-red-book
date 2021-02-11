const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
const isFunction = (target) => {
    return typeof target === 'function';
} 
const isObject = (target) => {
    return typeof target === 'object';
} 
const initExecutorAsync = () => {
    let executorAsync = null;
        executorAsync = (fn) => {
            setTimeout(fn,0)
        }
    return executorAsync;
}
const executorAsync = initExecutorAsync();
function MyPromise(executor) {
    if(!isFunction(executor))  throw new TypeError('应为函数');
    this.status = PENDING;
    this.value = void 0;
    this.reason = void 0;
    this.onfulfilledList = [];
    this.onrejectedList = [];
    const resolve = (value) => {
        // 如果resolve 返回的值是一个promise 则向下传递
        if(value instanceof MyPromise) {
            return value.then(resolve, reject);
        }
        // 异步执行promise,采用微任务，
        executorAsync(() => {
             //当前状态是PENDING 才改变状态，且不可再改变
            if(this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                // 状态改为FULFILLED 后执行此个promise后面的then回调。
                this.onfulfilledList.forEach(cb => cb(this.value));
            }
        })
    }
    const reject = (reason) => {
        executorAsync(() => {
            //当前状态是PENDING 才改变状态，且不可再改变
            if(this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                // 状态改为REJECTED 后执行此个promise后面的then回调。
                this.onrejectedList.forEach(cb => cb(this.reason));
            }
        })
    }
    //如果executor , resolve或reject内部执行出错，则直接reject
    try {
        executor(resolve, reject);
    } catch (error) {
        reject(error)
    }
}
//统一处理, onfulfilled 函数的返回结果
function resolvePromise(promise, result, resolve, reject) {
    // 2.3.1 如果返回的 promise1 和 x 是指向同一个引用（循环引用），则抛出错误
    if(promise === result) {
        return reject(new TypeError('不能循环引用'))
    }
    let thenable = null, 
    // 记录 resolvePromise 和 rejectPromise是否已经被调用。
    consumed = false;
    // 2.3.2 如果 x 是一个 promise 实例，则采用它的状态：
    if(result instanceof MyPromise) {
        // 2.3.2.1 如果 x 是 pending 状态，那么保留它（递归执行这个 promise 处理程序），直到 pending 状态转为 fulfilled 或 rejected 状态
        if(result.status === PENDING) {
            // 调用result.then获取result这个promsie的
            // data 为 onfulfilled 执行是传入的promise的value值
            result.then(data => {
                // 递归调用resolvePromise， 因为当前data 可能也是promise,可能存在深层嵌套
                return resolvePromise(promise, data, resolve, reject);
            }, reject)
        } else {
            // 2.3.2.2 如果或当 x 状态是 fulfilled，resolve 它，并且传入和 promise1 一样的值 value
            // 2.3.2.3 如果或当 x 状态是 rejected，reject 它，并且传入和 promise1 一样的值 reason
            return result.then(resolve, reject);
        }
    }
    // 判断当前result 是否满则伪promise条件，则是否为一个thenable, 当做promise处理
    const isComplexResult = target => (isFunction(target)) || (isObject(target) && target !== null);
    if(isComplexResult(result)) {
        try {
            // 2.3.3.1 把 x.then 赋值给 then 变量
            thenable = result.then;
            // 2.3.3.3 如果 then 是函数类型，那个用 x 调用它（将 then 的 this 指向 x）,第一个参数传 resolvePromise ，第二个参数传 rejectPromise：
            if(isFunction(thenable)) {
                thenable.call(result, data => {
                    // 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 已经被调用或以相同的参数多次调用的话吗，优先第一次的调用，并且之后的调用全部被忽略（避免多次调用）
                    if(consumed) return;
                    consumed = true;
                      // 2.3.3.3.1 如果或当 resolvePromise 被调用并接受一个参数 y 时，执行 [[Resolve]](promise, y)
                    return resolvePromise(promise, data, resolve, reject);
                }, error => {
                    // 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 已经被调用或以相同的参数多次调用的话吗，优先第一次的调用，并且之后的调用全部被忽略（避免多次调用）
                    if(consumed) return;
                    consumed = true;
                    // 2.3.3.3.2 如果或当 rejectPromise 被调用并接受一个参数 r 时，执行 reject(r)
                    return reject(error)
                })
            } else {
               //  2.3.3.4 如果 then 不是函数类型，直接 resolve x（resolve(x)）
               return resolve(result);
            }
        } catch (error) {
            //2.3.3.3.4.1 如果 resolvePromise 或 rejectPromise 已经被调用，那么忽略异常
            if(consumed) return;
            consumed = true;
            // 2.3.3.2 如果捕获（try，catch）到 x.then 抛出的错误的话，需要 reject 这个promise
            return reject(error);
        }
    } else {
        //2.3.4 如果 x 即不是函数类型也不是对象类型，直接 resolve x（resolve(x)）
        return resolve(result);
    }
}
// then 接收两个方法，onfulfilled, onrejected,
MyPromise.prototype.then = function(onfulfilled, onrejected) {
    // 2.2.1 onFulfilled 和 onRejected 都是可选参数：
    // 2.2.1.1 如果 onFulfilled 不是函数，它会被忽略
    // 2.2.1.2 如果 onRejected 不是函数，它会被忽略
    
    // 2.2.2 如果 onFulfilled 是一个函数：
    onfulfilled = isFunction(onfulfilled) ? onfulfilled : data => data; // 2.2.7.3 如果 onFulfilled 不是一个函数，并且 promise1 状态是 fulfilled，那么 promise2 一定会接受到与 promse1 一样的值 value
    // 2.2.3 如果 onRejected 是一个函数：
    onrejected = isFunction(onrejected) ? onrejected : err => { throw err }; // 2.2.7.4 如果 onRejected 不是一个函数，并且 promise1 状态是 rejected，promise2 一定会接受到与 promise1 一样的值 reason
    //then 返回promise.
    let promise = null;
    let { status } =  this 
 
   
    // 2.2.2.1 它一定是在 promise 是 fulfilled 状态后调用，并且接受一个参数 value
    // 2.2.2.3 它最多被调用一次
    if (status === FULFILLED) {
        // 2.2.7 then 方法一定返回一个 promise
        return promise = new MyPromise((resolve, reject) => {
            executorAsync(() => {
                // 2.2.7.2 如果 onFulfilled 或 onRejected 里抛出了一个异常，那么 promise2 必须捕获这个错误（接受一个 reason 参数）
                try {
                    // 执行函数传入上一个promise, resolve的值返回。
                    const result = onfulfilled(this.value);
                    // 处理， 并resolve 或reject， 同时result 可能为 promise 也可能为普通值。
                    resolvePromise(promise, result, resolve, reject);
                } catch (error) {
                    reject(error)
                }
            })
        })
    }
  
   // 2.2.3.1 它一定在 promise 是 rejected 状态后调用，并且接受一个参数 reason
   // 2.2.3.2 它一定在 promise 是 rejected 状态后调用
   // 2.2.3.3 它最多被调用一次
    if (status === REJECTED) {
        //then 返回promise. // 异步链式调用
        return promise = new MyPromise((resolve, reject) => {
            executorAsync(() => {
                // 2.2.7.2 如果 onFulfilled 或 onRejected 里抛出了一个异常，那么 promise2 必须捕获这个错误（接受一个 reason 参数）
                try {
                    // 执行函数传入上一个promise, reject的值返回。
                    const result = onrejected(this.reason);
                    // 处理， 并resolve 或reject， 同时result 可能为 promise 也可能为普通值。
                    resolvePromise(promise, result, resolve, reject);
                } catch (error) {
                    reject(error)
                }
            })
        })
        
    }
    // 如果此时状态为PENDING ，则将多次调用then的onfulfilled, onrejected函数放入队列中，等待promise ,
    // 调用resolve 或者reject 状态改变后执行
    if (status === PENDING) {
        //then 返回promise. // 异步链式调用
        return promise = new MyPromise((resolve, reject) => {
            this.onfulfilledList.push((value) => {
                // onfulfilled 函数内部出错，则直接reject
                try {
                    // 执行函数传入上一个promise, reject的值返回。
                    const result = onfulfilled(value);
                    // 处理， 并resolve 或reject， 同时result 可能为 promise 也可能为普通值。
                    resolvePromise(promise, result, resolve, reject);
                } catch (error) {
                    reject(error)
                }
            })
            this.onrejectedList.push((reason) => {
                // onfulfilled 函数内部出错，则直接reject
                try {
                    // 执行函数传入上一个promise, reject的值返回。
                    const result = onrejected(reason);
                    // 处理， 并resolve 或reject， 同时result 可能为 promise 也可能为普通值。
                    resolvePromise(promise, result, resolve, reject);
                } catch (error) {
                    reject(error)
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