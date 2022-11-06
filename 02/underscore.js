var _ = require('underscore');
//undersocre 이라는 모듈을 가져온다음 객체를 리턴함
var arr = [3,6,9,1,12];
console.log(arr[0]);
console.log(_.first(arr)); //언더스코어가 가지는 first라는 메소드사용
//퍼스트라는 함수의 입력값으로 들어오는 배열의 첫번째 원소를 리턴하는 것
//console.log(arr[arr.length]); 원소개수알려줌
console.log(arr[arr.length-1]); //복잡해서 보기 불편
console.log(_.last(arr)); //위 코드와 똑같은 결과 가져오지만, 더 간단

