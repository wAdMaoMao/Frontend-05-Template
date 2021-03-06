/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2021-01-10 10:43:11
 * @LastEditors: voanit
 * @LastEditTime: 2021-01-21 15:44:21
 */
module.exports = {
  // entry:"./main.js",
  entry:"./animation-demo.js",
  module:{
    rules:[
      {
        test:/\.js$/,
        use:{
          loader:"babel-loader",
          options:{
            presets:["@babel/preset-env"],
            plugins:[
              [
                "@babel/plugin-transform-react-jsx",
                {
                  pragma:"createElement"
                }
              ]
            ]
          }
        }
      }
    ]
  },
  mode: "development"
}