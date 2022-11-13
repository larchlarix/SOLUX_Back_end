/*(1)제일 먼저 해야될것, express모듈 가져오기
제어하려면 require 함수가 리턴한 값을 변수에 담기*/
var express = require('express');

//(9)
var bodyParser = require('body-parser');

//(11)파일시스템 제어할수 있는 기본 모듈
var fs =require('fs');

/*(2)
express 모듈이용해 애플리케이션 객체만들기
express라는 변수에 담긴 함수를 호출하면 애플리케이션 객체를 리턴
*/
var app = express();

/*(9)
포스터방식으로 들어오면 밑 코드가 애플리케이션 중간에서
요청을 가로채서 리퀘스트객체의 바디라고하는 프로퍼티를 만들어서 
포스트 데이터에 접근가능하게함
*/
app.use(bodyParser.urlencoded({extended: false}));

//템플릿 줄바꿈 해줌
//ex)페이지 소스보기 줄바꿈 해줌
app.locals.pretty = true; 

/*(5)
views_file에 탬플릿 파일을 넣겠다라는 것을 알려주려면
앱에다가 설정해주기->app.set
app.set('views','./views_file')
즉, views(템플릿파일들)는 ./views_file에 넣겠다라는 것
*/
app.set('views','./views_file');


/*(6)
어떤 템플릿 엔진을 쓸건지 express에게 알려주기
*/
app.set('view engine', 'pug');

/*(4)
사용자가 /topic/new로 들어갔을때 응답으로 hi메세지 화면에 출력
*/
app.get('/topic/new', function(req,res){
    fs.readdir('data',function(err,files){
        if(err){
           console.log(err)
           res.status(500).send('Internal Server Error')
        }
        res.render('new',{topics:files}) ;//(7)views_file폴더에 new.pug이라는 html파일 만들고 화면에 잘 나오는지 확인위해
    //(7)res.send대신 res.render('new')로 확인해주기
    //페이지 reload해주면 화면에는 아무것도 안뜨고 페이지소스보기하면 doctype html뜸
    });
});


/*(12)
사용자가 직접 url 치고 들어오는 것=get방식
사용자가 토픽페이지로 들어오게되면 글목록이 화면에 표시되게끔 하자
*/
app.get(['/topic','/topic/:id'],function(req,res){

    //(13)파일 내용 읽어오기
    fs.readdir('data',function(err,files){
     if(err){
        console.log(err)
        res.status(500).send('Internal Server Error')
     }
     var id =req.params.id;
     if(id){
     //id값이 있을때
     fs.readFile('data/'+id,'utf8',function(err,data){
        if(err){
            console.log(err)
            res.status(500).send('Internal Server Error')
         }
         res.render('view',{topics:files,title:id,description:data});
    })
}else{

     /*render함수는 첫번째 인자는 템플릿 파일 이름
      두번째 인자는 그 템플릿 안으로 주입하고자하는
      데이터를 객체안에 담아서 주입
      ->topics라는 이름으로 files 전달하면 topics를통해
      files의 내용 가져올 수 있음
     */
    //id값이 없을때
     res.render('view',{topics:files,title:'Welcome',description:'Hello JavaScript for Server.'});
}
    });
   
});

/*(14)->(12)번에 합침
파일 내용 읽어오기
바뀔수 있는 정보는 :뒤에 표시
*/
/*
app.get('/topic/:id',function(req,res){

//바뀔수 있는 정보인 id에 접근하는 방법 밑코드
var id =req.params.id;

fs.readdir('data',function(err,files){
    if(err){
       console.log(err)
       res.status(500).send('Internal Server Error')
    }
fs.readFile('data/'+id,'utf8',function(err,data){
    if(err){
        console.log(err)
        res.status(500).send('Internal Server Error')
     }
     res.render('view',{topics:files,title:id,description:data});
})
})
});
*/



/*(8) post라는 라우터 설치
topic으로 들어온 정보를 받아주는
*/
app.post('/topic', function(req,res) {
    
    //(10) 타이틀과 디스크립션의 값을 얻어낼 수 있게됨
    var title = req.body.title;
    var description = req.body.description;
    
    /*(11)fs사용, 파일쓰게할것이니 writeFile메소드사용
    괄호안은 파일의 이름
    500은 상태를 알려주는 서버상의 코드값
    에러가 없다면 res.send('Success!');*/
    fs.writeFile('data/'+title,description,function(err){
       if(err){
        console.log(err); //에러가 발생하면 콘솔에도 에러뜨게 해주기
         res.status(500).send('Internal Server Error')
       }
       res.redirect('/topic/'+title);//에러가 발생하지 않으면 success를 화면에 출력
    });

    
});

/*(3)애플리케이션 메소드 'listen'으로 특정 포트를 리스닝하도록 함
애플리케이션이 3000번 포트에 연결되면 이 콜백함수가 호출되면서 연결되었다라는 상황을 알려줌
콜백함수의 콘솔로그 통해서 'Connected, 3000 port!' 메세지 출력하도록함
터미널에 nodemon app_files.js 치면 Connected, 3000 port!라고 터미널에 출력됨
콘솔로그가 출력된것
사용자의 요청을 적당한 컨트롤러와 연결해주는 라우팅 작업
*/
app.listen(3000, function(){
console.log('Connected, 3000 port!');
})
