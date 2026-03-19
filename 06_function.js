// 함수 선언문을 통해 만든 함수
function sayHello() {
    console.log("안녕하세요!");
}

// 그렇게 만든 함수를 "호출" (실행: 소괄호 붙여야함)
sayHello();

function welcomeUser(name) {
    console.log(`안녕하세요. ${name}님!`);
}
welcomeUser("홍길동");

function sayHelloToUser(name) {
    console.log(`안녕하세요. ${name}님`);
}

// 변수는 메모리 영역에 넣어져 나중에 값을 사용하기 위해 존재하는 값
// 매개변수라는 건, 함수 밖에서 값을 받아외 위해 존재하며 그 녀석은 함수 내부 코드블록 안에서만 통용됨

var name = "홍길동";
sayHelloToUser(name);

var name2 ="율곡이이";
sayHelloToUser(name2);


function add(a, b) {
    return a + b;
}
var result = add(1, 2)    // return 3이 되니까, return에 3이 들어감

// 표현식으로 함수 정의, var sayHi가 중심이 되어, 변수 호이스팅이 일어남
var sayHi = function() {
    console.log("안녕하세요!")
}
sayHi();

//화살표 함수를 사용, 얘도 sayHi2라는 변수가 중심이 되어 변수 호이스팅이 일어남
var sayHi2 = () => {
    console.log("안녕하세요!");
}

var getGrade = (score) => {
    if (score >= 90) {
        return "A학점";
    } else {
        return "B학점";
    }
}

var result = getGrade(50);






function workoutCoach(count) {
    console.log(`총 ${count}번 반복합니다`);

    for(var i =1; i <= count; ++i) {
        console.log(`${i}번째 입니다.`)
    }

    console.log("종료되었습니다.")
}

workoutCoach(2);
workoutCoach("S");