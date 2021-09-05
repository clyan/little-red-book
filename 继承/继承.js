// 核心，利用构造函数，继承实例属性，利用原型继承原型属性和方法
// 利用一个新的构造函数,防止两次调用父类构造函数

function Parent(name) {
  this.name = name;
}
Parent.prototype = {
  getName() {
    console.log(this.name);
  },
};
function Child(name = "ywy", age = 18) {
  Parent.call(this, name);
  this.age = age;
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
Child.prototype.getAge = function () {
  console.log(this.age);
};
const child = new Child("ww", 12);
child.getName();
child.getAge();
