const { log } = console;
// Date 类型将自动保存为UTC 时间，1970年 1月 1日 零时至今所经过的毫秒数。
log('=================== Date ===================');
let now = new Date('2019-12-15');   
log(now)    // 2021-01-28T14:20:07.555Z

// 由于浏览器输出的差异,适用于调试，不使用与显示
log(now.toJSON()); // 2019-12-15T00:00:00.000Z
log(now.toISOString()); // 2019-12-15T00:00:00.000Z
log(now.toLocaleDateString()); // 2019-12-15
log(now.toLocaleTimeString()); // 8:00:00 AM
log(now.toUTCString()); // Sun, 15 Dec 2019 00:00:00 GMT
log(now.toLocaleString()); // 2019-12-15 8:00:00 AM
log(now.toString()); // Sun Dec 15 2019 08:00:00 GMT+0800 (GMT+08:00)


//获取时间戳 
log(now.valueOf())    // 1576368000000
log(new Date().getTime())  // 获取当前时间戳 1611844262532 //注意：根据当前时间输出不同
log(Date.now())  // 获取当前时间戳1611844262532 //注意：根据当前时间输出不同

//获取时间戳 
log(now.getTime()); // 1576368000000
// Date.parse获取时间戳
let someDate1 = Date.parse('2019-12-15');
log(someDate1);  // 1576368000000
// Date.UTC(年 , 月（0-11）[,日(0), 时(0), 分(0), 秒(0), 毫秒(0)]);
let someDate2 = Date.UTC(2019, 11, 15); // 年 和 月必须;
log(someDate2);  // 1576368000000




log('=================== Date Methods===================');
let date = new Date();
function formatTimeToStr(date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getMilliseconds()}`
}
log(formatTimeToStr(date))
log(date.getDay()) // 4 ,返回当前是周几  0 代表周日。