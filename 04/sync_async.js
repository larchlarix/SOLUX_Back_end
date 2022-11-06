var fs = require('fs');

//동기방식
console.log(1); 
/*순서는 얘가 먼저 실행 그다음 리드파일싱크라는 동기적인 방식 함수에 의해서
data.txt을 읽은 후 data라는 변수에 전달
만약 10분짜리 방식이면 10분동안 가만히 있다가 화면에 data변수의 내용이 찍힐것*/

var data = fs.readFileSync('data.txt',{encoding : 'utf8'});
console.log(data); 
//리드파일싱크가 동기적인 방식으로 data.txt 파일을 읽어서 리턴해줌
//그래서 data라는 변수에는 저 텍스트파일의 내용이 담겨있게됨


//비동기방식
console.log(2);
fs.readFile('data.txt', {encoding:'utf8'},function(err,data){
    console.log(3);
    console.log(data);
})
console.log(4);
/* 실행된 순서는 2 - 4 - 3
2번실행후 리드파일이라는 작업이 백그라운드에서 실행되고 있음
그리고 바로 4번이 실행되고
그다음 파일읽는 작업이 완전히  끝난후,  
리드파일에 콜백으로 전달한 익명함수를 리드파일이 실행해서 
두번째 인자값으로 data변수에 담긴 텍스트 내용이 전달,
그래서 그때서야 3번이 실행된 것
*/

