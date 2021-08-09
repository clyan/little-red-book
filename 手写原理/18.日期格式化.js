
let { log } = console
function dateFormat(date, format) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  format = format.replace(/yyyy/, year)
  format = format.replace(/MM/, month)
  format = format.replace(/dd/, day)
  return format
}

log(dateFormat(new Date('2020-12-01'), 'yyyy/MM/dd')) // 2020/12/01
log(dateFormat(new Date('2020-04-01'), 'yyyy/MM/dd')) // 2020/04/01
log(dateFormat(new Date('2020-04-01'), 'yyyy年MM月dd日')) // 2020年04月01日