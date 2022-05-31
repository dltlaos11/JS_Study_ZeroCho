# 호출스택 & 스코프 체인 🖐
## 호출스택
```javascript
const console = {
     log() {
         // 콘솔에 글자 적는 기능
     }
} 
```

console이라는 객체에 log라는 함수가 있을 것
console.log('a') console이라는 객체에 log함수를 사용해 a를 호출할 수 있는 것
호출하면 log()함수로 가서 그안에 해당하는 기능이나 코드 실행
눈에 보이지 않는 라이브러리나 내장되어 있는 함수들은 위와 같은 과정을 생각하며 분석해야 한다.

```javascript
const x = 'x';
function c() {
    const y = 'y';
    console.log('c');
    // debugger; 호출스택을 확인 가능
    // a 호출, b 호출하고 그 다음 c에 debugg가 걸려있는 상황
} // 선언

function a() {
    const x = 'x';
    console.log('a'); // 호출 ! log, 브라우저나 노드에 구현되어 있을갓
    function b() {
        const z = 'z';
        console.log('b');
        c(); // 호출
    }
    b(); // 호출
} // 선언

// 호출과 선언은 구분 !

a(); // a, b, c
// 함수의 호출인데 호출스택이란 것은 '호출'할 떄 마다 뭔가 스택같은게 생긴다는 것

c(); // c
```
a()는 함수의 호출인데 바로 위 2줄의 코드가 호출스택으로 쌓이면 a 다음 바로 c가 아니다.
<br>
호출하고 그 다음 호출로 넘어가는게 아니라 호출에 해당하는 선언으로 이동해야 한다.

<mark>anony || a,,x || log(a),x || b,,x || log(b),x || c,,x || log(c),x</mark> 
<br>그 다음 스택에 c가 쌓이고 }를 만나면 빠지고 모든 코드가 끝나고 마지막줄이면 anaoy까지 빠져 나간다. 
<br> -> debugger의 호출스택
<br>호출스택 anaoy 부터 시작, 파일 전체의 시작을 anaoymous라고 생각해서 넣어두고 마지막에 anaoymous 해제하면 끝

<hr/>

## 스코프 체인

스코프 체인이란 특정 함수에서 어떤 값에 접근할 수 있는지 어떤 값에 접근이 불가능 한 지를 알려준다. debugger를 사용해 확인 가능 🙂 
<br> ES5에서는 함수가 기준이었는데 ES6에서는 블록이 기준 { }
-  블록들 ex) switch () {  }, if () {  }, for () {  }, while () { }
-  {   } 객체 No, 블록 ! 객체로 만들려면 ()소괄호로 감싸주어야 함. 

<br> a()를 호출할떄 a, b, c인데 a안에서 b를 호출하는 과정에서 만약 b가 a함수 안이 아니라 c함수 안에 있었다면 호출이 불가능하다. 호출 가능한지 판단할 수 있는 기준이 스코프 체인 !

<br> b를 선언했는데 Uncaught ReferenceError: b is not defined 에러가 뜬다면 Scope 체인 문제 ! 

### b가 위 코드와 달리 c함수 안에 있을 떄  @@@@ 
-  c -> anony, 직관적인 변수를 찾지못할 떄 anaoy를 보고 그 안에서 찾는것. ex)직관적인 거_ y, x ..
-  a -> anony
-  b -> c -> anony

<br> 위 관계는 "선언"에 대하여 나타낸 것이다.
<br> a에서 b접근은 불가능 ! but b에서 a접근은 가능하다. b -> anonymous인데 anonymous안에 a가 존재하므로
<br> 반대로 a -> anony이므로 b 접근이 가능한지 않을까 라는 생각을 할 수 있지만 코드를 접어서 생각하면 b는 c안에 있으므로 anaoymous에는 없는 것. 
<br> anony에는 c와 a둘 뿐

### 선언지도
-  anony -> x, c, a   &nbsp;&nbsp;&nbsp; 🟢 변수 x가 a에서도 선언되었는데, anony -> x, x, c, a 는 불가능 !! 
-  c -> y, b
-  b -> z
-  a -> x &nbsp;&nbsp;&nbsp; 🟢 위치와 스코프가 다르므로 이렇게 선언해줘도 다른 것으로 인식 
-  a나 anony에서 b 접근 불가.

<br>위와 같은 관계에서 나온 Lexcial scope: 함수를 선언한 시점에 스코프는 변하지 않는다.
<br> 함수의 선언들을 보면서 내 부모함수가 누군지 확인해서 anonymous까지..
 
