// 命令行交互库
const inquirer = require('inquirer')
// 开子进程的
const execa = require('execa')
const { log, separator } = require('./constant')
const { entry } = require('./entry')

const packagesList = [...Object.keys(entry)]

if (!packagesList.length) {
  log('不合法目录，请检查src/packages/*/(index|main).tsx', 'warning')
  return
}

// const all = [...packagesList, 'all']

inquirer.prompt([
  {
    type: 'checkbox',
    message: '* 模块列表',
    name: 'buildLists',
    default: '',
    prefix: '\033[42;30m 提示 \033[0;32m  请选择需要打包的模块，默认使用上次的模块[A全（不）选  I 反选  空格选择  回车确认]\033[0m \n',
    choices: packagesList,
    validate(value) {
      return !value.length ? new Error('至少选择一个模块进行启动') : true
    }
  }
]).then(res => {
  const message = `、当前选择 --- package：${res.buildLists.join(',')}`
  // 控制台输入提示用户当前选中的包
  log(message, 'success')
  runParallel(res.buildLists)
})

// 调用打包命令
async function runParallel(packages) {
  // 当前所有入口文件
  const message = `---------------- 开始打包-${packages.join('-|-')} ----------------`
  log(message, 'success')
  log('\n请稍等...... ', 'success')
  await build(packages)
}

async function build(buildLists) {
  // 将选中的包通过separator分割
  const stringLists = buildLists.join(separator)
  // 调用通过execa调用webapck命令
  // 同时注意路径是相对 执行node命令的cwd的路径 
  // 这里我们最终会在package.json中用node来执行这个脚本
  await execa('webpack', ['--config', './scripts/webpack.prod.js'], {
    stdio: 'inherit',
    env: {
      packages: stringLists,
    },
  })
}