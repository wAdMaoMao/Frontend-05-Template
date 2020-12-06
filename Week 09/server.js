/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2020-12-06 10:41:57
 * @LastEditors: voanit
 * @LastEditTime: 2020-12-06 11:24:14
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
      body div #myid {
        width: 100px;
        background-color: #ff5000;
      }
      body div img {
        width: 30px;
        background-color: #ff1111;
      }
    </style>
  </head>
  <body>
    <div>
      <img id="myid" />
      <img />
    </div>
  </body>
</html>`);
  });
}).listen(8089, () => {
  console.log('Server started on port: 8089')
});