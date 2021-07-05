'use strict'

const webpack = require('webpack')
const {merge} = require('webpack-merge')
const webpackBaseConfig = require('./webpack.config')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');
const SpeedMesurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMesurePlugin()

const devConfig = merge(webpackBaseConfig,{
  mode: 'development',
  devtool:'cheap-module-eval-source-map',
  devServer:{
    //会把打包的东西放到内存里面
    port: '8088',
    open:true,
    hot:true,   //模块热更新，不会直接刷新浏览器，影响已经渲染的js模块
    hotOnly:true,//就算没渲染好，也不直接刷新
  },
  plugins:[
    new BundleAnalyzerPlugin.BundleAnalyzerPlugin(),
  ]

})

module.exports = devConfig