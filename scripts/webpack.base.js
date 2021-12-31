const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { getEntryTemplate } = require('./utils/entry')
const { separator } = require('./utils/constant')

const packages = process.env.packages.split(separator)
const { entry, htmlPlugins } = getEntryTemplate(packages)

module.exports = {
  // 动态替换入口
  entry,
  resolve: {
    // 简化相对路径
    alias: {
      // 这里要注意基于typescript开发 同时需要修改tsconfig.json中的paths
      '@src': path.resolve(__dirname, '../src'),
      '@packages': path.resolve(__dirname, '../src/packages'),
      '@containers': path.resolve(__dirname, '../src/containers')
    },
    // 简化路径到文件夹时 默认引入的文件名
    mainFiles: ['index', 'main'],
    // 不书写文件后缀时，默认解析规则
    extensions: ['.ts', '.tsx', '.scss', '.json', '.js'],

  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: 'babel-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [ //从下到上 从左到右 依次解析
          // 区别style-loader将样式添加到<header>中 而是独立成一个css
          MiniCssExtractPlugin.loader,
          // 解析css中 import 和 require 语句
          'css-loader',
          // 插件使用
          'postcss-loader',
          // sass 存在 url丢失问题 解决办法1.resolve-url-loader 2.路径变量定义引用路径 3.定义别名
          {
            loader: 'resolve-url-loader',
            options: {
              keepQuery: true
            }
          },
          // 将sass文件编译为css
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        // 原先的url-loader 现已经被内置 主要是到处一个资源的url
        type: 'asset/inline'
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        // 原先的file-loader 现已经被内置 主要是发送一个单独文件并导出url
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css'
    }),
    ...htmlPlugins
  ],
  mode: 'development'
}