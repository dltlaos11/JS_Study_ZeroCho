const add = (a, b) => a+b; // 객체를 return 한다면 " => ({ a + b}) " // 선언

function calculator(func, a, b) {
    return func(a, b);
} // 선언

add( 3, 5); // 8 
calculator(add(), 3, 5); // 8

const onClick = (event) => () => {
    console.log('hello');
}
// 인지 
// const onClick = () => (event) => {
//     console.log('hello');
// }
// 인지 헷갈릴 수 있는데 리턴값을 직접 넣어보면 알 수 있다. event가 사용되는지 아닌지

// document.querySelector('#header').onclick 혹은
document.querySelector('#header').addEventListener('click', add());  // add() 라고 넣는 실수는 X, 함수와 함수 호출의 차이를 모르는 것, add()는 함수가 아니라 함수의 리턴값이다. 
// 함수의 호출은 리턴값으로 대체해야 된다고 생각하기, 고차함수일 떄 어렵다. 고차함수란 함수안에서 다른 함수를 리턴하는 함수 

// 결론: 함수의 호출을 보게 되면 반드시 return값으로 대체를 해봐라
// ex_ calculator(add(), 3, 5) -> calculator(undefined + undefined, 3, 5)
// 리턴값을 넣어봐서 말이 되는지 안되는지 확인을 해보기, 위 코드는 당연히 말이 안되는 코드다. 그렇다면 add()'함수 호출'이 아니라 add'함수'를 넣어야 하는 것.