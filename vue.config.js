const { name } = require('./package')
const path = require('path')
var webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const staticResource = {
  externals: {
    'vue': 'Vue',
    'vuex': 'Vuex',
    'vue-router': 'VueRouter',
    'jquery': '$',
    'lodash': '_',
    'axios': 'axios',
    'vue-ls': 'VueStorage',
    'moment': 'moment',
    'ant-design-vue': 'antd'
  },
  css: [
    {
      src: '/static-resource/ant-design-vue@1.7.5/dist/antd.min.css',
      attr: 'ignore'
    }
  ],
  js: [
    {
      src: '/static-resource/vue@2.6.11/dist/vue.min.js',
      attr: ''
    },
    {
      src: '/static-resource/vuex@3.6.2/dist/vuex.min.js',
      attr: ''
    },
    {
      src: '/static-resource/vue-router@3.5.2/dist/vue-router.min.js',
      attr: ''
    },
    {
      src: '/static-resource/jquery@3.6.0/dist/jquery.min.js',
      attr: 'ignore'
    },
    {
      src: '/static-resource/lodash@4.17.21/lodash.min.js',
      attr: 'ignore'
    },
    {
      src: '/static-resource/axios@0.21.4/dist/axios.min.js',
      attr: 'ignore'
    },
    {
      src: '/static-resource/vue-ls@3.2.2/dist/vue-ls.min.js',
      attr: 'ignore'
    },
    {
      src: '/static-resource/moment@2.21.0/min/moment.min.js',
      attr: 'ignore'
    },
    {
      src: '/static-resource/moment@2.21.0/locale/zh-cn.js',
      attr: 'ignore'
    },
    {
      src: '/static-resource/ant-design-vue@1.7.5/dist/antd.min.js',
      attr: 'ignore'
    },
    {
      src: '/static-resource/ant-design-vue@1.7.5/dist/antd-with-locales.min.js',
      attr: ''
    }
  ]
}

// vue.config.js
module.exports = {
  publicPath: '',

  transpileDependencies: ['resize-detector', 'ant-design-vue'],

  configureWebpack: {
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     $: 'jquery',
    //     _: 'lodash',
    //     'moment': 'moment'
    //   })
    // ],
    output: {
      // 微应用的包名，这里与主应用中注册的微应用名称一致
      library: name,
      // 将你的 library 暴露为所有的模块定义下都可运行的方式
      libraryTarget: 'umd',
      // 按需加载相关，设置为 webpackJsonp_项目名称 即可
      jsonpFunction: `webpackJsonp_${name}`
    },
    externals: staticResource.externals
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
    config.plugin('html').tap(args => {
      args[0].static = staticResource
      return args
    })
    // config.module
    //   .rule('images')
    //   .use('url-loader')
    //   .loader('url-loader')
    //   .options({})
    //   .end()
    // const svgRule = config.module.rule('svg')
    // svgRule.uses.clear()
    // svgRule
    //   .test(/\.svg$/)
    //   .use('url-loader')
    //   .loader('url-loader')
    //   .options({})
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
    },
    proxy: {
      '/static-resource': {
        target: 'https://unpkg.com/',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '/static-resource': ''
        }
      }
    }
  }
}
