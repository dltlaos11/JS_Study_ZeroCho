# this 😮

## this = window ? 🟢
* * *
```javascript
console.log(this); // Window {window: Window, self: Window, document: document, name: '', location: Location, …}

// this가 
```

js(브라우저)에서 this는 기본적으로 window다 ! <br>
node에서는 this는 global 이였는데 <br>
js: window, node: global로 this가 전역객체였는데 최근에는 globalThis로 통합이 되었다 🖐

## 'use strict' 🟢
* * *
```javascript
// 'use strict'는 ES2015 모듈에서는 strict 모드 자동 적용이다.
function a() {
    'use strict';
    console.log(this);
}
a(); // undefined
// strict 모드인지 아닌지 먼저 this가 window가 될지 undefined가 될지 확인 !
```
## this가 window에서 바뀌는 경우 🟢
* * *
```javascript
1️⃣
const obj =  {
    name: '주용준',

    // function
    // sayName: function(){
    //     console.log(this.name);
    // } 아래와 같이 줄일 수 있다. 그러나 위 코드와 아래 코드가 완전히 같은 것은 아니다. 실제로는 다르다. 
    sayName() {
        console.log(this.name);
    }    
};
obj.sayName(); // 주용준
window.name // ''

// 화살표 함수 
const obj =  {
    name: '주용준',
    sayName:() => {
        console.log(this.name);
    }    
};
obj.sayName(); // == window.name == ''
// 화살표 함수인지 아닌지도 this를 결정하는데 큰 역할을 한다.
// 화살표 함수면 무조건 전역을 가르키는 건가 ? anonymous를 가리키는 건가 ?? 전역을 가리키는 건가 ?? 
// 아니다 !! ❌
// 부모 scope를 가리키는 것이다 ! 스코프하면 호출이 아니라 '선언'을 떠올려야 한다. 선언과 호출을 헷갈리지 말자 !!

const obj =  {
    name: '주용준',
    sayName() {
        console.log(this.name);
        function inner() {
            console.log(this.name);
        }
        inner();
    }    
};
// Quiz ! inner()에 대한 스코프 체인은 어떻게 되는가 ?? 🧐
// inner() 함수의 마지막 블록의 앞선 따라서 쭉 올라가서 만나는 함수,(블록 바로 바깥 함수를 말함)
// inner의 스코프 체인은 sayName이고, sayName의 앞선은 object인데 object는 무시하고 anonymous가 스코프 체인이됨 !!🧐
// 스코프 체인을 그리는 이유는 inner에서 변수에 접근할 수 있나 없나를 판단하기 위함이다.  

// sayName: () => {} 형태가 되어도 inner의 부모 스코프는 sayName이다. 화살표 함수도 "선언"

obj.sayName();
// 주용준
// ''
// Why ?? inner의 this는 window.name일까 ??? sayName()에서 this.name은 '주용준'이고 inner()에서 this.name은 window.name이냔 말이야 !?🧐🧐
// sayName()에서 this.name은 obj.sayName()을 호출할 때 "obj."가 붙었고 화살표 함수가 아니니까 !!! window.name이 아니라 object.name이 되는 거고 

// inner를 살펴보면 inner(); 함수 호출할 떄 기준으로 봐야한다. 무조건 함수 호출할 떄 !!!!!!!!!!!!!!가 기준!
// 함수 호출할 떄 inner();만 존재하고 this 바꿔주는 행동을 안함. 그래서 window.name이 되는 것, this는 함수 호출할 떄를 생각해보면 되는 것. this를 바꿔주는 동작을 했나 안했나 ???를 살펴보면 된다.  

const obj =  {
    name: '주용준',
    sayName() {
        console.log(this.name);
        const inner = () => {
            console.log(this.name);
        }
        inner();
    }    
};
obj.sayName();
// 주용준
// 주용준

// inner가 화살표 함수가 되었다고 object.name이 되는걸까?
// 항상 함수를 호출할 떄 this를 본다고 했는데, 일단 inner();는 그대로.. new, "object." method도 안하고 call, apply, bind도 안함..
// 화살표함수가 달라진 점.. 화살표 함수는 window를 가져오는게 아니라 부모 함수의 this를 그대로 가져온다. 
    // sayName() {
    //     console.log(this.name);
    //     const inner = () => {
    //         console.log(this.name);
    //     }
    //     inner();
    // }    
// 부모함수의 this를 가져온다고 했을 떄 이것만 보면 알 수가 없다.😅 함수 호출을 안했으니까..! obj.sayName();처럼 호출할 떄 정해진다. 
// 호출스택 그릴 떄 해당되는 this도 생각해보기 !
// 화살표 함수는 무조건 부모..!!
// 함수를 호출하면 해당 블록의 { <=로 간다. 😮

// -------------------------------- ❌주의할 점❌ --------------------------------

const sayN = obj.sayName; // 함수를 대입
sayN(); // ''

// 무조건 this가 obj인 것이 아니다. 😮
// => this는 함수가 호출될 때 정해진다..!!
// 함수가 호출되는데 this에 특별한 동작을 한것이 없으면 기본적으로 window가 되고 
// 만약에 함수를 호출하는데 함수 앞에 "obj." 과 같이 객체가 붙는다면 this가 그 객체가 되는 것이다 !!!😎

2️⃣
function Humaan(name) {
    this.name = name;
} // JS에서 옛날에 객체를 생성하던 방법, function 생성자 !
  // 생성자 함수라고 한다.
new Humaan('주용준'); // Humaan {name: '주용준'} 
// new를 사용하는 경우 this가 객체 자기 자신이 되면서, this가 변한다 !
```
```this```가 변하는 경우는 2가지
- "<mark>obj.</mark> sayName()" 앞에 객체가 붙는 경우와
- "<mark>new</mark> Human" new를 사용하는 경우
- ❌, obj.sayName()을 하더라도 sayName()이 화살표 함수(=>)면 this가 바뀌지 않는다.
<br><br>

```javascript
function sayName() {
    console.log(this.name);
} 
sayName(); // '' == window.name과 같을 것이다.

// this를 바꿔주는 방법: bind, call , apply
1️⃣
sayName.bind({ name: '주용준' })()
// 주용준, { name: '주용준' } 부분이 this가 되는 것
2️⃣
sayName.apply({ name: '주용준'})
// 주용준, apply는 뒤에 ()가 붙지 않는다. apply는 함수를 바로 실행을 해버림.
// bind는 새로운 함수를 만드는 친구. 
3️⃣ 
sayName.call({ name: '주용준'})
// 주용준
```
```this```를 직접적으로 바꿔주는 경우는 3가지
- "sayName().<mark>bind</mark>({ name: '주용준' })<mark>()</mark>"
- "sayName().<mark>apply</mark>({ name: '주용준' })"
- "sayName().<mark>call</mark>({ name: '주용준' })"
<br>

## CallStack 지도 그려보기🟢
* * *

```javascript
const obj =  {
    name: '주용준',
    sayName() {
        console.log(this.name);
        function inner() {
            console.log(this.name);
        }
        inner.call(obj);
    }    
};

obj.sayName();
// 주용준
// 주용준
```
<br>

### CallStack 지도
<b>CS</b>: anony(this: window) || obj sayName()(this: '주용준') || log('주용준') 한 뒤, ❌ || inner() (this : '주용준') || log('주용준') 한 뒤, ❌ || inner ❌ || sayName ❌ || anony ❌   !~~~끝!!!@@

### 결론
- "obj." method
- new를 사용한 생성자 함수
- 화살표 함수의 유무( && 부모의 this)
- bind, call, apply 
this는 위의 4가지를 고려하여 <mark>함수를 호출할 떄 결정 난다.</mark>