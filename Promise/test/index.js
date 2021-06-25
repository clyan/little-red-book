const MPromise = require('../promise');

const promise = new MPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('lucas')
    }, 2000)
})
const a = promise.then(data => {
    return 'aaa';
})


setTimeout(() => {
    console.log(a)
}, 2000)