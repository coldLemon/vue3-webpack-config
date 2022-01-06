'use strict'

const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'), //output.path 中的 URL 以 HTML 页面为基准
    filename: '[name].[fullhash:16].js',
    publicPath: '/', //次项作为按需加载与加载外部资源的基准
    //  非入口文件chunk的名称。所谓非入口即import动态导入形成的trunk或者optimization中的splitChunks提取的公共trunk
    //   它支持和 filename 一致的内置变量
    chunkFilename: '[contenthash:10].chunk.js',

    /* 当用 Webpack 去构建一个可以被其他模块导入使用的库时需要用到library */
    library: {
      name: '[name]', //整个库向外暴露的变量名
      type: 'window' //库暴露的方式
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: '/.js$/',
        use: ['babel-loader'],

        exclude: /node_modules/
      },
      {
        test: /\.(eot|svg|ttf|woff|)$/,
        type: 'asset/resource',
        generator: {
          // 输出文件位置以及文件名
          filename: 'fonts/[name][ext]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|)$/,
        type: 'asset/resource',
        generator: {
          // 输出文件位置以及文件名
          filename: 'assets/[hash:8].[name][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 //超过10kb不转base64
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin()
    // new MiniCssExtractPlugin({
    //   filename: "[name].[hash].css",
    //   chunkFilename: "[id].css",
    // }),
  ],
  externals: {
    BMap: 'BMap'
  },
  optimization: {
    removeAvailableModules: true,
    // webpack 将会不会去打包一个空的模块。
    removeEmptyChunks: true,
    // 告诉 webpack 合并一些包含了相同模块的模块。
    mergeDuplicateChunks: true
    // 会在 process.env.NODE_ENV 中传入当前的 mode 环境。
    // nodeEnv: "production" || "development"
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'], //可以不加扩展名
    alias: {
      '@': path.resolve('src'),
      Components: path.resolve(__dirname, 'src/components/'),
      Pages: path.resolve(__dirname, 'src/pages/')
    }
  }
}
