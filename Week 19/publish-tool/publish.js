const http = require('http');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const child_precess = require('child_precess');
const querystring = require('querystring');

// 1. 进入授权页面,获取 code
child_precess.exec(
  `open https://github.com/login/oauth/authorie?client_id=51.ad091ru08daf1gs`
);

// 3. 拿到token,点击发布
const publish = (token) => {
  const request = http.request(
    {
      hostname: '127.0.0.1',
      port: 8882,
      method: 'POST',
      path: `/publish?token=${token}`,
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    },
    (response) => {
      console.log(response);
    }
  );

  const archive = archiver('zip', {
    zlib: { level: 9 },
  });
  // 压缩发送到远程服务器
  archive.directory(path.resolve(__dirname + '/sample'), false);
  archive.finalize();
  archive.pipe(request);
};

http
  .createServer((req, res) => {
    const query = querystring.parse(req.url.match(/^\/auth\?([\s\S]+)$/)[1]);
    publish(query.token);
  })
  .listen(8083);
