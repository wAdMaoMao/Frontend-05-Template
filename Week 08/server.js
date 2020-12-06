/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2020-12-05 14:59:07
 * @LastEditors: voanit
 * @LastEditTime: 2020-12-05 17:32:04
 */
const http = require('http')
http.createServer((request,response)=>{
  let body = []
  request.on('error',err=>{
    console.log(err)
  }).on('data',chunk=>{
    body.push(chunk.toString())
  }).on('end',()=>{
    body = Buffer.concat(body).toString()
    console.log('body',body)
    response.writeHead(200,{'Content/type':'text/html'})
    response.end(' Hello World\n')
  })
}).listen(':8088')
console.log("server started")