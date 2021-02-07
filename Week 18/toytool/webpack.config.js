/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2021-01-31 14:01:09
 * @LastEditors: voanit
 * @LastEditTime: 2021-02-05 16:59:18
 */
const webpack = require('webpack'); //to access built-in plugins
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry:'./src/main.js',
  module: {
    rules: [
      { test: /\.vue$/, use: 'vue-loader' },
      {
        test:/\.css$/,
        use:[
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader',
          options:{
            presets:['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin({
      patterns:[
        {
          from:'src/*.html',
          to:'[name].[ext]'
        }
      ]
    })
  ]
};