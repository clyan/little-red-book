
console.log(self)   // DedicatedWorkerGlobalScope 对象继承自WorkerGlobalScope
self.addEventListener('message', ({data}) => {
    console.log(data)
})

console.log('self', self.name)  
// 测试 内部close 
// self.postMessage('foo') 
// self.close() // 关闭 Woker 不会立即停止，通知工作者线程取消事件循环中的所有任务，并阻止添加新的任务。
// self.postMessage('bar')
// self.setTimeout(() => {
//     self.postMessage('baz') //不会发送
// })