/*
  css插件系统
*/

//自动添加不同浏览器的前缀兼容
// const autoprefixer = require('autoprefixer')
//压缩css
// const cssnano = require('cssnano')

module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default'
    })
  ]
}