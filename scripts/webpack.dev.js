const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')
const path = require('path')
const portfinder = require('portfinder')
const { BASE_PORT } = require('./utils/constant')

// portfinder.basePort = BASE_PORT
process.env.NODE_ENV = 'development'

console.log(process.env.NODE_ENV)
const devConfig = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    // static 允许我们在devServer下访问目录的静态资源
    // 简单来说 启动DevServer相当于启动了一台本地服务器
    // 该服务器以static-directory目录作为根路径
    // 这样就能访问到static/directory下的资源了
    static: {
      directory: path.join(__dirname, '../public')
    },
    // 默认启用热加载
    hot: true,
    // 是否开启代码压缩
    compress: true,
    port: BASE_PORT
  },
  stats: 'errors-only'
}

module.exports = async function () {
  try {
    const port = await portfinder.getPortPromise()
    devConfig.devServer.port = port
    return merge(devConfig, baseConfig)
  } catch (e) {
    throw new Error(e)
  }
}