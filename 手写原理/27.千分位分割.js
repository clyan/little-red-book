const { log } = console; 
let num = "112345678.12"
let reg = /(?!^)(?=((\d{3})+\.))/g

log(num.replace(reg, ','))