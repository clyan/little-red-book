/**
 * 
 * @param {*} func 
 * @param {*} delay 
 * @description 核心，只执行最后一次，重新清楚
 * @description 
 * 按钮提交场景：防止多次提交按钮，只执行最后提交的一次 
 * 服务端验证场景：表单验证需要服务端配合，只执行一段连续的输入事件的最后一次，
 * 还有搜索联想词功能类似
 * @returns 
 */
function debounce(func, delay = 1000) {
  let timer = null;
  return function (...params) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(()=> func.apply(this, params), delay)
  }
}
