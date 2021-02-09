const { log } = console;
log('=================== 所有的参数传递都是值传递 ===================');
// 传递的对象参数是函数的局部变量，只允许修改属性，重新赋值不会影响 外部变量
function setName (obj) {
    let  inenerObj = { ...obj };
    log(arguments)  // arguments 指的是函数调用时传入的参数，跟函数定义时的参数个数无关
    inenerObj.name = 'inner';    //修改了person 的name
    obj = new Object();    //重新复制，person并未发生改变， 执行内部指针，函数运行完成时销毁
    obj.name = 'new Object';
}
let person = new Object();
setName (person, '123') 
log(person)

// 判断是否在其原型上
log(person instanceof Object) // true

// 执行上下文，全局作用域与函数作用域，函数可访问的作用域跟函数定义时有关，而不是使用时。
// 尽量使用局部变量。。

// var变量提升，函数变量提升优先var变量提升, let const 不允许重复定义，不会提升，
// const 定义基本类型时不允许修改，定义引用数据类型时允许修改属性

// 垃圾回收方式
// （常用）标记清理： 判断变量是否在上下文中，如果不存在则销毁，例如：函数执行完上下文销毁，函数中定义的变量将被回收。
//  引用计数：当变量被使用则将 引用数 +1 ,为0时代表可以回收， 存在问题：当两个变量互相引用，那么永远不会得到回收。

// 早期IE版本， DOM 和BOM不属于JavaScript对象，而是属于COM(使用引用计数)，导致 与js对象相互引用时不会得到释放。
// 例：
// let element = document.getElementById('123');
// let obj = new Object();
// obj.element = element;
// element.somObject = obj;

// 解决：切断变量与其之前引用值的关系
// obj.element = null , element.somObject = null;

// 垃圾回收程序由引擎实现决定什么时候启动，周期性运行，某些特定的浏览器中可手动清理调用垃圾回收程序（不推荐）
// 例：IE中 window.CollectGarbage(), Opera7 中的 window.opera.collect();


// 内存管理
function createPerson(name) {
    let localPerson = new Object();
    localPerson.name = name;
    return localPerson;
}
let globalPerson = createPerson('张三');


globalPerson = null; //在不需要时手动解除其应用 (不会立即释放，等待下一次垃圾回收时回收)；

// 隐藏类和删除操作
// 避免先创建后补充的动态属性赋值，V8引擎将多个实例共享相同的隐藏类。
function Ariticle(name) { //一次性将需要的属性定义在类中。。
    this.title = '123';
    this.name = name;
}
let a1 = new Ariticle('红楼梦');
let a2 = new Ariticle('西游记');
// a1.author = '111';  //避免此种情况，会导致两个实例引用两个不同的隐藏类
// delete ad.name     //避免此种情况，产生的后果与动态添加一样, 

//最佳！！ a1.name = null; 设置为null;  // 保持隐藏类不变与 删除引用供垃圾回收机制回收



// 内存泄漏

// 意外声明全局变量。。。
function a() {
    name = '123'
}

// 定时器，引入外部变量。 
// let snakeName = '111'
// setInterval(() => {
//     console.log(snakeName)
// }, 1000)


// 闭包，可用作参数提前绑定。。与参数缓存， 但是同时会导致变量不会被回收导致内存的占用
function outer () {
    let name = '123'
    return function innner() {
        console.log(name);
    }
}
let out = outer(); // 返回了内部闭包函数， 只要该函数存在则 name不会被释放， 


// 避免对象的多次的初始化，使用对象池对，对象进行创建。。


// 创建数组提前定义数组大小避免长度超出,动态销毁与创建一个新的数组的过程.