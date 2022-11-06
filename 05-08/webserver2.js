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


/*
웹서버가 되기 위해 http라는 모듈을 사요하면됨 
http라는 변수에 담긴 http 객체가 있고 그 객체가 갖고있는 크리에이트 서버라는 메소드를 호출

var server = http.createServer(); 
크레이트서버에 의해 서버가 만들어지고그 서버를 제어할수있는는 객체가 리턴됨

server.listen(port,hostname );
아이피는 어떤 컴퓨터를 식별하는 식별자이자 주소
 포트는 그컴퓨터안에서 설치되어있는 여러가지 서버중 어떤 서버를 사용할것인지에 대한 식별자
우리가 웹서버를 만든다음에 그 서버가 어떤 포트를 바라보게할것인지를 결정하는데
사용자에 요청은 그 포트를 향해서 들어옴
크레이트서버 통해 서버를 만들고 그 서버가 특정 포트를 바라보게 하는것
사용자가 우리서버에 접속할때, 어떤 아이피를 타고 들어오는 사용자를 수용할것인지에 대해 hostname으로 설정

리슨이라고 하는 저 메소드는 콜백으로 비동기적으로 작동
리슨이 완료되었을 때 저 콜백이 실행되도록 약속
서버가 리스닝에 성고했을때 화면에 출력되는 코드가 담긴 콜백함수: 
() => {console.log(`Server running at http://${hostname}:${port}/`);}

포트로 사용자가 들어왔을 때 어떤 내용을 출력할 것인가는
서버를 생성할 때 이 입력값으로 익명함수 줌
const server = http.createServer(function(req, res)
req, res요청과 응답과 관련된 객체

어떤 정보를 요청한 사용자에게 응답할 것인가 =>res통해 
res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World'); 
  이런 내용으로 응답하겠다.

  */