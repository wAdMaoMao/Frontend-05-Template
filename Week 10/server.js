/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2020-12-06 10:41:57
 * @LastEditors: voanit
 * @LastEditTime: 2020-12-12 15:35:45
 */
const http = require('http');

http.createServer((request, response) => {
  let body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk.toString());
  }).on('end', () => {
    console.log('body: ', body);
    body = Buffer.from(body).toString();
    response.writeHead(200, {'Content-Type': 'text/html'});
    // response.end(' Hello World\n');
    response.end(`
  <html maaa=a>
  <head>
    <style>
    #container #myid {
        width: 200px;
        background-color: #ff5000;
      }
      #container {
        width: 500px;
        height: 300px;
        display:flex;
      }
      #container .c1{
        flex:1;
      }
    </style>
  </head>
  <body>
    <div id="container">
      <div id="myid"></div>
      <div class="c1"></div>
    </div>
  </body>
</html>`);
  });
}).listen(8089, () => {
  console.log('Server started on port: 8089')
});