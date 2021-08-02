Promise.resolve().then(() => {
  console.log(6);
  return function() {
    return 
  }
}).then((res) => {
  console.log(res + '123');
}).then(() => {
  console.log(8);
}).then(() => {
  console.log(9);
}).then(() => {
  console.log(10);
})

Promise.resolve().then(() => {
  console.log(1);
}).then(() => {
  console.log(2);
}).then(() => {
  console.log(3);
}).then(() => {
  console.log(4);
}).then(() => {
  console.log(5);
})