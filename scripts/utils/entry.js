const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { MAIN_FILE } = require('./constant')

// 获取多页面入口文件夹中的路径
const dirPath = path.resolve(__dirname, '../../src/packages')

const entry = Object.create(null)

// 读取dirPath中的文件夹数量
// 同时保存到entry中，key为文件名，value为路径
fs.readdirSync(dirPath).filter(file => {
  const entryPath = path.join(dirPath, file)
  if (fs.statSync(entryPath)) entry[file] = path.join(entryPath, MAIN_FILE)
})
console.log('@@@@', entry)
// 根据入口文件list生成对应的htmlWebpackPlugin
// 同时返回对应wepback需要的入口和htmlWebpackPlugin
const getEntryTemplate = packages => {
  const entry = Object.create(null)
  const htmlPlugins = []
  packages.forEach(name => {
    entry[name] = path.join(dirPath, name, MAIN_FILE)
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../../public/index.html'),
        filename: `${name}.html`,
        chunks: ['manifest', 'vendors', name]
      })
    )
  })
  return {
    entry,
    htmlPlugins
  }
}

module.exports = {
  entry,
  getEntryTemplate
}