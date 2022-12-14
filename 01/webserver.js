const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//위 코드는 웹서버가 되는 코드
// node webserver.js 명령은 노드제이에스를 통해서 우리가 만든 웹서버 애플리케이션을 실행시킨것
// 웹서버 애플리케이션은 우리컴퓨터에서 요청이 들어오기를 기다리고 있음
//아래 주소로 접근하게 되면, 저 코드에 담겨있는 웹서버애플리케이션이 동작해서 웹브라우저를 통해
//헬로월드라는 텍스트가 출력됨
//이 코드가 웹브라우저를 통해서 요청한 내용을 받아서 우리에게 헬로월드라는 텍스트를 전송한것
//우리의 웹브라우저는 헬로월드를 출력할수있게된것

//creatServer라는 명령을 통해서 서버한대 만들음
//그서버를 만들면서 그서버가 이 컴퓨터에 리스닝하게 시킴
//첫번째 인자로 포트, 그포트가 3000, 호스트네임을 전달했는데 127.0.0.1, 호스트네임은 이컴퓨터의 아이피라 생각
//노드제이에스를 이용해서 웹서버만들고 그 웹서버가 3000번을 리스닝하게 하는 코드
//127.0.0.1로 접속한 사용자에 대해서 응답하라는 명령어, 응답결과는 헬로월드라는 텍스트를 응답하라는 코드
// http://127.0.0.1:3000/ 이컴퓨터로 접속하는 접속중에서 127.0.0.1브라우저에 입력했고, 3000으로 입력한 접속에 대해서 응답하겠다
//
//