//메인 애플리케이션(파일)
//엔트리 애플리케이션(파일)
var express = require('express'); //express 로드, 변수를 통해 이 모듈 제어가능

var bodyParser = require('body-parser');

var app = express(); // 이 express 모듈은 사실 함수라서 이렇게 실행하면
//이 함수는 애플리케이션이라는 것을 리턴함

app.locals.pretty = true; // html 최종적으로 예쁘게 출력

app.set('view engine', 'pug'); //템플릿엔진 pug셋팅
//jpug템플릿엔진과 익스프레스 연결 코드
app.set('views','./views'); // ./views=>views라는 디렉토리

app.use(express.static('public')); //관습적으로 퍼블릭

/*
전체는 덩어리로 퍼블릭이라는 디렉토리를 정적인파일이 위치하는 디렉토리로 하겠다.
정적인 파일을 서비스하고 싶을때, 위 코드 추가
퍼블릭이라는 디렉토리에 정적인 파일(이미지)를 갖다놓으면, 그 정적파일을 사용자에게 서비스할 수 있다
*/

app.use(bodyParser.urlencoded({extended: false}));
// 애플리케이션으로 들어오는 모든 요청들을 이 bodyparser를 통과한뒤 라우터로

app.get('/form',function(req,res){
    res.render('form');
})
app.get('/form_receiver',function(req,res){
    var title = req.query.title;
    var description = req.query.description;
    res.send(title+','+description);
})
app.post('/form_receiver', function(req,res){
    var title = req.body.title;
    var description = req.body.description;
    res.send(title+','+description);
})

app.get('/topic',function(req,res){
    var topics =[
        'javascript is ....',
        'nodejs is .....',
        'express is ....'
    ];
    var output =`
    <a href="/topic?id=0">javascript</a><br>
    <a href="/topic?id=1">nodejs</a><br>
    <a href="/topic?id=2">express</a><br>
    ${topics[req.query.id]}
    `
    res.send(output);
})
/*
매개변수값으로 요청정보 들어옴
컨트롤러의 첫번째 인자인 req의 쿼리라는 객체의 id라는 특성 값으로 들어옴
복수의 쿼리스트링 사용가능
*/

//시멘틱 url사용법
app.get('/topic/:id/:mode',function(req,res){
    res.send(req.params.id+','+req.params.mode)
})




app.get('/template',function(req,res){
    res.render('index',{time:Date(), title:'Pug'});
})
/*
템플릿 엔진이니, render사용
저경로를 통해 들어온 사용자에게 이 익명함수가 실행되면서, 
index라는 템플릿파일을 웹페이지로 랜더링해서 전송한다는 뜻
우리가 작성한 time이라는 객체가 render에 의해 tmepl.pug라는 템플릿에 흘러들어감
temp.pug는 타임이라는 변수 사용 가능
*/



app.get('/',function(req, res){
    res.send('Hello home page');
});
/* 
사용자가 url치고 들어오는 것은 get 방식
홈페이지로 접속한 사용자를 구분하기위해 홈페이지는=> '/'
get의 두번째로 인자로 전달한 함수가 실행되도록 약속되어 있음
get함수로 받은 사용자가 홈페이지로 들어왔을 때  그 함수 실행시키는 매개변수값으로
사용자가 요청한 것과 괄녀된 정보담긴 req
상용자가 요청한것에 대한 응답을 할수 이는 방법을 담고 익는 응답에 대한 객체를 담고 있음
*/

app.get('/dynamic', function(req,res){
    var time = Date();
    var lis ='';
    for(var i =0;i<5;i++){
        lis = lis+ '<li>coding</li>';
    }
    var output = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        Hello dynamic!
        <ul>
        ${lis}
        </ul>
        ${time}
    </body>
    </html>`;
    res.send(output);
})
//문자 안 변수 추가 ${lis} 이렇게
//리로드버튼 누를때 마다 현재 시간 바뀜, 서버쪽에서 프로그래밍쪽으로 만들기때문에 가능
//순수html은 현재시간,동적으로 바꿀수 있는 것 존재하지 않음


app.get('/route',function(req,res){
    res.send('hello Router, <img src ="/route.jpg">');
})

app.get('/login', function(req,res){
    res.send('<h1>Login please</h1>');
})
//로그인페이지로 들어오는경우

app.listen(3000, function(){
    console.log('Connected 3000 port!');
}); 
/*
포트번호 지정, 우리의 웹애플리케이션이 3000번포트 리스닝 가능
리스닝 성공하면 콜백함수 실행되면서 화면에 출력
우리 웹애프리케이션이 3000번 포트 리스닝하게되면 이 익명함수가 실행되면서 
문장이 화면에 출력됨 
*/

/* 사용자가 어떠한 경로로 들어왔을때 어떤 것이 실행될것인가를 결정하는 연결해주는 역할이
get이라는 메소드의 역할
get메소드를 라우터, 그리고 하는일을 라우팅
라우트:길을 찾다
어떤 요청이 들어왔을때, 그 요청이 길을 찾을수이도록 연결해주는 역할
*/


