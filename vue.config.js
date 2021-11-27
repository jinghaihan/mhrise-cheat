const { name } = require('./package')
const path = require('path')
var webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  publicPath: '',

  transpileDependencies: ['resize-detector', 'ant-design-vue'],

  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        _: 'lodash',
        'moment': 'moment'
      })
    ],
    output: {
      // 微应用的包名，这里与主应用中注册的微应用名称一致
      library: name,
      // 将你的 library 暴露为所有的模块定义下都可运行的方式
      libraryTarget: 'umd',
      // 按需加载相关，设置为 webpackJsonp_项目名称 即可
      jsonpFunction: `webpackJsonp_${name}`
    }
  },

  chainWebpack: config => {
    config.resolve.alias
      .set('public', resolve('public'))
      .set('@', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@utils', resolve('src/utils'))
      .set('@views', resolve('src/views'))
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .options({})
      .end()
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .use('url-loader')
      .loader('url-loader')
      .options({})
  },

  devServer: {
    port: 10000,
    open: true,
    inline: true, // 打开热更新
    // 关闭主机检查，使微应用可以被 fetch
    disableHostCheck: true,
    // 配置跨域请求头，解决开发环境的跨域问题
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }

}
