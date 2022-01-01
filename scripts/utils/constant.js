const chalk = require('chalk')
const BASE_PORT = 8888
const MAIN_FILE = 'index.tsx'

// 打印的颜色
const error = chalk.bold.red
const warning = chalk.hex('#ffb2b2')
const success = chalk.green
const maps = {
  success,
  warning,
  error
}
const log = (message, types) => {
  console.log(maps[types](message))
}

const separator = '*'

module.exports = {
  BASE_PORT,
  log,
  separator,
  MAIN_FILE
}