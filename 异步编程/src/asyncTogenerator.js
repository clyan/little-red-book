const getData = () => new Promise((resolve, reject) => setTimeout(()=> resolve("data") ,1000))

function *testD() {
  const data = yield getData();
  console.log("data", data);
  const data2 = yield getData();
  console.log("data2", data2);
  return "success";
}

const test = asyncToGenerator(testD);
test().then(res => console.log(res));

function asyncToGenerator(generatorFunc) {
  return function (...params) {
    const gen = generatorFunc.apply(this, ...params);
    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let generatorResult;
        try {
          generatorResult = gen[key](arg)
        } catch (error) {
          return reject(error)
        }
        const {value, done} = generatorResult;
        if(done) {
          return resolve(value)
        } else {
          return Promise.resolve(value).then(function onResolve(data) {
            step("next", data)
          }, function onReject(error) {
            step("throw", error)
          })
        }
      }
      step("next")
    })
  }
}