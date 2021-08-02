/**
 * 
 * @param {*} func 
 * @param {*} delay 
 * @description 每隔一段时间就运行一次函数。。
 * @description 
 * 拖拽场景：固定时间内只执行一次，防止超高频次触发位置变动缩放场景：
 * 监控浏览器resize
 * 动画场景：避免短时间内多次触发动画引起性能问题
 * @returns 
 */
function throttle(func, delay) {
  let time = Date.now();
  return function (...params) {
    let now = Date.now();
    if(now - time >= delay) {
      func.apply(this, params)
      time = now;
    }
  }
}