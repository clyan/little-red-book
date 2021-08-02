class EventEmeitter {
  constructor() {
    this.event = new Map();
  }
  on(type, fn) {
    if(typeof type !== "string") throw new Error("第一个参数为字符串")
    if(Object.prototype.toString.call(fn) !== "[object Function]") throw new Error("第一个参数为函数")
    if(!this.event.has(type)) {
      this.event.set(type, [fn])
    } else {
      this.event.set(type, [...this.event.get(type), fn])
    }
  }
  emit(type) {
    if(!this.event.has(type)) 
      return 
    this.event.get(type).forEach(fn => {
      fn();
    });
  }
}

// 测试
const emitter = new EventEmeitter();
emitter.on('post', function () {
  console.log(1)
})
emitter.on('post', function () {
  console.log(2)
})
emitter.emit('post')