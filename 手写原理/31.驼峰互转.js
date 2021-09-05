let up = "ab_bh_mk";
let transformUp = up.replace(/_(\w)/g, (str, r1) => {
  return r1.toUpperCase();
});
console.log(transformUp);

let low = "HelloWorld";
let transformLow = low
  .replace(/\B([A-Z])/g, (str, r1) => {
    console.log(r1);
    return "_" + r1;
  })
  .toLowerCase();
console.log(transformLow);
