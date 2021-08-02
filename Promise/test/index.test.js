const MPromise = require('../promise-demo');

MPromise.resolve().then(() => {
  console.log(0);
  return MPromise.resolve(4);
}).then((res) => {
  console.log(res)
})

MPromise.resolve().then(() => {
  console.log(1);
}).then(() => {
  console.log(2);
}).then(() => {
  console.log(3);
}).then(() => {
  console.log(5);
}).then(() => {
  console.log(6);
})