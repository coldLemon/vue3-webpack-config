'use strict'

const path = require('path');
const {VueLoaderPlugin}  = require('vue-loader'); 
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
 
module.exports = {

  entry:  "./src/index.js",
  output: { 
    path: path.join(__dirname, '/dist'), //output.path 中的 URL 以 HTML 页面为基准
    filename: "[name].[hash:16].js",
    publicPath:'/'  //次项作为按需加载与加载外部资源的基准
  },
  module: {
    rules: [
      {     
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(png|svg|jpe?g|gif|PNG|JPG)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath:'image/',
              limit:5 * 1024
            },
          },
        ]
      },
      {
        test: /\.(css|less|sass)$/,
        use: [
          'css-loader', 'less-loader'
        ],
      },
      {
        test: '/\.js$/',
        use:[
          'babel-loader'
        ],
   
        exclude: /node_modules/
      },
      {
        test:/\.(eot|woff2|woff|ttf|svg|mp4|mp3|ogg|wav|aac)/,
        use:[
          {
            loader:'url-loader',
            options:{
              name:'[name][hash:5].min.[ext]',
              limit:5000,
              publicPath:'',
              outputPath:'text/',
              useRelativePath:true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(), 
  ],
  optimization:{
    removeAvailableModules: true,
    // webpack 将会不会去打包一个空的模块。
    removeEmptyChunks: true,
    // 告诉 webpack 合并一些包含了相同模块的模块。
    mergeDuplicateChunks: true,
    // 会在 process.env.NODE_ENV 中传入当前的 mode 环境。
    // nodeEnv: "production" || "development"
  },
  resolve:{
    extensions:['.js','.vue','.json'],//可以不加扩展名
    alias:{
      '@': path.resolve('src'),
      Components : path.resolve(__dirname,'src/components/'),
      Pages: path.resolve(__dirname,'src/pages/')
    }
  },
  
}