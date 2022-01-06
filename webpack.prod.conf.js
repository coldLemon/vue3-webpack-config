'use strict'

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack.config')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const prodConfig = {
  mode: 'production',
  // https://webpack.js.org/configuration/devtool/#production
  devtool: 'source-map',
  plugins: [
    new BundleAnalyzerPlugin.BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      title: '微站平台',
      template: path.resolve(__dirname, 'index.html'),
      filename: 'index.html',
      inject: true,
      favicon: './favicon.ico',
      // 详情：
      //https://github.com/kangax/html-minifier#options-quick-reference
      minify: true
      // chunksSortMode: 'dependency'
    })
  ],
  optimization: {
    // 告诉 webpack 确定和标记块，这些块是其他块的子集，当更大的块已经被加载时，不需要加载这些子集。
    flagIncludedChunks: true,
    // 告诉 webpack 找出一个模块的顺序，这可以使打包出来的入口 bundle.js 最小化。
    // occurrenceOrder: true,
    // 确定每个模块下导出被使用的。
    usedExports: true,
    //合并含有相同模块的 chunk
    mergeDuplicateChunks: true,
    // 告诉 webpack 查找可以安全地连接到单个模块的模块图的片段。取决于优化。
    concatenateModules: true,
    // 使用 UglifyjsWebpackPlugin 进行代码压缩。
    minimize: true,
    minimizer: [
      //webpack v5 自带最新的
      new TerserPlugin({
        parallel: true, // 可省略，默认开启并行
        terserOptions: {
          toplevel: true, // 最高级别，删除无用代码
          ie8: true,
          safari10: true
        }
      })
    ]
  }
}

module.exports = merge(webpackBaseConfig, prodConfig)
