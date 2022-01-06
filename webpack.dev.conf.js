'use strict'

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack.config')
const path = require('path')
const SpeedMesurePlugin = require('speed-measure-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var portfinder = require('portfinder')

const smp = new SpeedMesurePlugin()

const devConfig = merge(webpackBaseConfig, {
  mode: 'development',
  output: {
    // 在 bundle.js 中引入项目所包含模块的注释信息。
    pathinfo: true
  },
  devtool: 'eval-cheap-module-source-map', //webpack5对顺序更为严格
  cache: true,
  // 缓存模块，避免在未更改时重建它们。
  //如果 cache 被启用，并且此模块的来自 node_modules，则值为 true，否则为 false
  module: {
    unsafeCache: false
  },

  devServer: {
    //会把打包的东西放到内存里面
    // 告诉 webpack-dev-server 搭建服务器的时候从哪里获取静态文件
    // 默认情况下，将使用当前工作目录作为提供静态文件的目录
    contentBase: path.join(__dirname, 'dist'), // since we use CopyWebpackPlugin.
    host: 'localhost',
    port: 8088,
    open: true,
    hot: true, //模块热更新，不会直接刷新浏览器，影响已经渲染的js模块
    hotOnly: true, //就算没渲染好，也不直接刷新
    compress: true, // 搭建的开发服务器启动 gzip 压缩
    //https://webpack.docschina.org/configuration/dev-server/#devserverproxy
    proxy: {
      '/': {
        //  target: 'http://192.168.166.50:8986/', //SYH
        target: 'http://192.168.168.9:14402/',
        // target: 'http://192.168.168.8:33529/',

        //secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 设置这个参数可以避免跨域
        pathRewrite: {
          //重写路径
          '^/': ''
        }
      }
    }, //代理
    // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台
    // 和 FriendlyErrorsPlugin 配合食用更佳
    quiet: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'vue3.0',
      template: path.resolve(__dirname, 'index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
    // new webpack.HotModuleReplacementPlugin()
    new FriendlyErrorsPlugin({
      // compilationSuccessInfo: {
      //   messages: [`Your application is running here: http://${devConfig.devServer.host}:${port}`],
      //   onErrors: function (severity, errors) {
      //     // You can listen to errors transformed and prioritized by the plugin
      //     // severity can be 'error' or 'warning'
      //   },
      //   clearConsole: true,
      // },
    })
  ],
  optimization: {
    // 在可能的情况下确定每个模块的导出。
    providedExports: true,
    // 找到 chunk 中共享的模块，取出来生成单独的 chunk。
    runtimeChunk: true,
    // 给模块更有意义更方便调试的名称。这下二为Webpack5
    moduleIds: 'named',
    // 给 chunk 更有意义更方便调试的名称。
    chunkIds: 'named'
  }
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = devConfig.devServer.port
  portfinder.getPort((err, port) => {
    if (err) reject(err)
    else {
      devConfig.devServer.port = port
      devConfig.plugins.push(
        new FriendlyErrorsPlugin({
          // 清除控制台原有的信息
          clearConsole: true,
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${devConfig.devServer.host}:${port}`
            ]
          },
          onErrors: () => {
            console.log('your application defeat')
          }
        })
      )
      resolve(devConfig)
    }
  })
})

// module.exports = smp.wrap(devConfig)
// module.exports = devConfig
