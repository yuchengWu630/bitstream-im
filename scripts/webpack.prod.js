const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')

process.env.NODE_ENV = 'production'

const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  /**
   * 控制台输出
   * errors-only 只有发生错误才输出
   * errors-warnings 只有发生错误和新的编译时才输出
   * minimal 只有发生错误和新的编译时才输出
   * none 没有输出
   * normal 标准输出
   * verbose 全部输出
   * detailed 全部输出 除了chunkModules和chunkRootModules
   * summary 输出webpack版本，以及警告和错误数
   */
   stats: 'normal'
}

module.exports = merge(prodConfig, baseConfig)