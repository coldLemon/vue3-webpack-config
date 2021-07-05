'use strict'

const webpack = require('webpack')
const {merge} = require('webpack-merge')
const webpackBaseConfig = require('./webpack.config')
const path = require('path')

const prodConfig = {
  mode: 'production',
  devtool:'cheap-module-source-map',
}

module.exports = merge(webpackBaseConfig, prodConfig)