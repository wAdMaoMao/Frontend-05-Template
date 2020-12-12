/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2020-12-05 16:34:58
 * @LastEditors: voanit
 * @LastEditTime: 2020-12-12 16:05:56
 */
// 编写HTTP请求部分内容
const net = require('net')
const parserFnc = require('./parser')
const render = require('./render.js');
const images = require('images');

class TrunkedBodyParser {
  constructor() {
    this.WAITING_LENGTH = 0;
    this.WAITING_LENGTH_LINE_END = 1;
    this.READING_TRUNK = 2;
    this.WAITING_NEW_LINE = 3;
    this.WAITING_NEW_LINE_END = 4;
    this.length = 0;
    this.content = [];
    this.isFinished = false;
    this.current = this.WAITING_LENGTH;
  }

  receiveChar(char) {
    if (this.current === this.WAITING_LENGTH) {
      if (char === '\r') {
        if (this.length === 0) {
          this.isFinished = true;
        }
        this.current = this.WAITING_LENGTH_LINE_END;
      } else {
        this.length *= 16;
        this.length += parseInt(char, 16);
      }
    } else if (this.current === this.WAITING_LENGTH_LINE_END) {
      if (char === '\n') {
        this.current = this.READING_TRUNK;
      }
    } else if (this.current === this.READING_TRUNK) {
      this.content.push(char);
      this.length--;
      if (this.length === 0) {
        this.current = this.WAITING_NEW_LINE;
      }
    } else if (this.current === this.WAITING_NEW_LINE) {
      if (char === '\r') {
        this.current = this.WAITING_NEW_LINE_END;
      }
    } else if (this.current === this.WAITING_NEW_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_LENGTH;
      }
    }
  }
}

// 处理 文本信息 类
class ResponseParser {
  constructor(){
    this.WAITING_STATUS_LINE = 0
    this.WAITING_STATUS_LINE_END = 1
    this.WAITING_HEADER_NAME = 2
    this.WAITING_HEADER_SPACE = 3
    this.WAITING_HEADER_VALUE = 4
    this.WAITING_HEADER_LINE_END = 5
    this.WAITING_HEADER_BLOCK_END = 6
    this.WAITING_BODY = 7

    this.current = this.WAITING_STATUS_LINE
    this.statusLine = ''
    this.headers = {}
    this.headerName = ''
    this.headerValue = ''
    this.bodyParser = null
  }

  get isFinished() {
    return this.bodyParser && this.bodyParser.isFinished;
  }

  get response() {
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join('')
    }
  }

  receive(string){
    for(let i = 0; i < string.length; i++) {
      this.receiveChar(string.charAt(i))
    }
  }
  // 状态机 处理每个字符
  receiveChar(char){
    if (this.current === this.WAITING_STATUS_LINE) {
      if (char === '\r') {
        this.current = this.WAITING_STATUS_LINE_END;
      } else {
        this.statusLine += char;
      }
    } else if (this.current === this.WAITING_STATUS_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME;
      }
    } else if (this.current === this.WAITING_HEADER_NAME) {
      if (char === ':') {
        this.current = this.WAITING_HEADER_SPACE;
      } else if (char === '\r') {
        this.current = this.WAITING_HEADER_BLOCK_END;
        if (this.headers['Transfer-Encoding'] === 'chunked') {
          this.bodyParser = new TrunkedBodyParser();
        }
      } else {
        this.headerName += char;
      }
    } else if (this.current === this.WAITING_HEADER_SPACE) {
      if (char === ' ') {
        this.current = this.WAITING_HEADER_VALUE;
      }
    } else if (this.current === this.WAITING_HEADER_VALUE) {
      if (char === '\r') {
        this.current = this.WAITING_HEADER_LINE_END;
        this.headers[this.headerName] = this.headerValue;
        this.headerName = '';
        this.headerValue = '';
      } else {
        this.headerValue += char;
      }
    } else if (this.current === this.WAITING_HEADER_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME;
      }
    } else if (this.current === this.WAITING_HEADER_BLOCK_END) {
      if (char === '\n') {
        this.current = this.WAITING_BODY;
      }
    } else if (this.current === this.WAITING_BODY) {
      this.bodyParser.receiveChar(char);
    }
  }
}

class Request {
  constructor(options){
    this.method = options.method || 'GET'
    this.host = options.host
    this.port = options.port || 80
    this.path = options.path || '/'
    this.body = options.body || {}
    this.headers = options.headers || {}
    // Content-Type 为headers中必有项 兼容处理
    if(!this.headers['Content-Type']){
      this.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    // 根据不同的content-type 处理bodyText
    if(this.headers['Content-Type'] === 'application/json'){
      this.bodyText = JSON.stringify(this.body)
    }else if(this.headers['Content-Type'] === 'application/x-www-form-urlencoded'){
      this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&')
    }
    this.headers['Content-Length'] = this.bodyText.length
    console.log(JSON.stringify(this.headers))
  }
  // 发送函数
  send(connection){
    return new Promise((resolve,reject)=>{
      const parser = new ResponseParser
      if(connection){
        connection.write(this.toString())
      }else{
        console.log(this.host,this.port)
        connection = net.createConnection({
          host: this.host,
          port: this.port
        },()=>{
          console.log(connection)
          connection.write(this.toString())
        })
      }
      connection.on('data',(data)=>{
        console.log('======data======',data.toString())
        parser.receive(data.toString())
        if(parser.isFinished){
          resolve(parser.response)
          connection.end()
        }
      })
      connection.on('error',err=>{
        console.log(err)
        reject(err)
        connection.end()
      })
    })
  }

  toString(){
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(item=>`${item}: ${this.headers[item]}`).join('\r\n')}\r
\r
${this.bodyText}`
  }
}

// 请求示例函数
void async function() {
  let requestObj = new Request({
    method:'POST',
    host:'127.0.0.1',
    port:'8089',
    path:'/',
    headers:{
      ['WHLWHL']:'ProjectManagement'
    },
    body:{
      name:'xiaoming',
      age:'20'
    }
  })
  let response = await requestObj.send()
  console.log('=======我是response=======',response)
  let dom = parserFnc.parserHtml(response.body)
  let viewport = images(800, 600);
  render(viewport, dom);
  viewport.save('viewport.jpg');
}()