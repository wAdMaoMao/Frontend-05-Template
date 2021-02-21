const http = require('http');
const path = require('path');
const unzipper = require('unzipper');
const querystring = require('querystring');

const getToken = (code, callback) => {
  const request = https.request(
    {
      hostname: 'api.github.com',
      path: `/login/oauth/access_token?code=${code}&client_id=51.ad091ru08daf1gs&client_secret=habdufbhu13rbfakdbf12i21ag034a`,
      port: 443,
      method: 'POST',
    },
    (res) => {
      let bodyStr = '';
      res.on('data', (chunk) => {
        bodyStr += chunk.toString();
      });
      res.on('end', () => {
        const body = querystring.parse(bodyStr);
        callback(body);
      });
    }
  );
  request.end();
};

// 2. code + client_id + client_secret 换 github token
const auth = (req, res) => {
  const query = querystring.parse(req.url.match(/^\/auth\?([\s\S]+)$/)[1]);
  getToken(query, (info) => {
    res.write(JSON.stringify(info));
    res.write(
      `<a href='http://localhost:8083/?token=${info.token}'>publish</a>`
    );
    res.end();
  });
};

// 接收到发布请求,验证token,获取用户信息
const publish = (req, res) => {
  const query = querystring.parse(req.url.match(/^\/auth\?([\s\S]+)$/)[1]);
  getUser(query.token, (info) => {
    if (info.login === 'wintercn') {
      req.on('end', () => res.end('success'));
      unzipper.Extract({
        path: path.resolve(__dirname, '../server/public/'),
      });
    }
  });
};

// 获取用户信息
const getUser = (token, callback) => {
  http.request(
    {
      hostname: 'github.com',
      path: '/user',
      port: 443,
      method: 'GET',
      headers: {
        Authorization: `token ${token}`,
        'User-Agent': 'toy-publish',
      },
    },
    (response) => {
      let bodyStr = '';
      response.on('data', (chunk) => {
        bodyStr += chunk.toString();
      });
      response.on('end', () => {
        callback(JSON.parse(bodyStr));
      });
    }
  );
};

http
  .createServer((req, res) => {
    if (req.url.match(/^\/auth\?/)) {
      return auth(req, res);
    }
    if (req.url.match(/\/publish\?/)) {
      return publish(req, res);
    }
  })
  .listen(8882, () => {
    console.log('start success,listening on port 8882');
  });
