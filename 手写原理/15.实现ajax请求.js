function ajax() {
  let xhr = new XMLHttpRequest()
  xhr.open('get', 'http://baidu.com', true)
  xhr.onreadystatechange = function() {
    if(this.readState !== 4) return;
    if(this.status === 200) {
      console.log(this.response)
    } else {
      console.log(this.statusText)
    }
  }
  xhr.onerror = function() {
    console.log(this.statusText)
  }
  xhr.responseType = 'json'
  xhr.setRequestHeader("Accept", "application/json");
  // 发送 Http 请求
  xhr.send(null);
}
// promise封装
function axios({ url, method = 'GET', async= true }) {
  return new Promise((resolve, reject)=> {
    let xhr = new XMLHttpRequest()
    xhr.open(method, url, async)
    xhr.onreadystatechange = function() {
      if(this.readState !== 4) return;
      if(this.status === 200) {
        resolve(this.response)
      } else {
        reject(this.statusText)
      }
    }
    xhr.onerror = function() {
      reject(new Error(this.statusText))
    }
    xhr.responseType = 'json'
    xhr.setRequestHeader("Accept", "application/json");
    // 发送 Http 请求
    xhr.send(null);
  })
}