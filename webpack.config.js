const path = require('path');
const {VueLoaderPlugin}  = require('vue-loader'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
const SpeedMesurePlugin = require('speed-measure-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');
 
const smp = new SpeedMesurePlugin()
const webpackConfig = {
  // mode:'production',
  mode: 'development',
  entry:  "./src/index.js",
  output: {
    path: path.join(__dirname, '/dist'),
    filename: "[name].[hash:16].js"
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
    new HtmlWebpackPlugin({
      title: 'vue',
      template: path.resolve(__dirname,'index.html'),
      filename: "index.html",
      inject:'body',

    }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(), 
    new BundleAnalyzerPlugin.BundleAnalyzerPlugin(),
  ],
  resolve:{
    extensions:['.js','.vue','.json'],//可以不加扩展名
    alias:{
      Components : path.resolve(__dirname,'src/components/'),
      Pages: path.resolve(__dirname,'src/pages/')
    }
  },
}
module.exports =  smp.wrap(webpackConfig)