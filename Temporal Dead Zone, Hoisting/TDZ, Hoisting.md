# Hoisting, Temporal Dead Zone(TDZ) 🧐

## Hoisting 🟢
<img src="https://noah0316.github.io/static/cffcf10865567dabf28a709e6cc66b42/dd45a/hoisting-papago.png" />
<br>
Hoisting은 "끌어올리다"라는 뜻을 가지고 있다. <br>
JS에서의 Hoisting은 선언되지 않은 함수선언식, 변수(var로 선언된), import구문을 상단으로 끌어올려 사용할 수 있게 하는 방식을 의미 !
<br>

```javascript
console.log(variable); // undefined
var variable =10;
```
위의 코드는 undefined가 출력된다. 자바스크립트 엔진은 내부적으로 위의 코드를 다음과 같이 해석한다 🧐

```javascript
var variable;
console.log(variable); // undefined
variable = 10;
```
해석과정에서 variable에 대한 선언은 이루어져 있는데 값에 대한 정의가 이루어져 있지 않아 undefined가 된다. 이처럼 자바스크립트는 해석과정에서 변수(var로 선언된), 함수선언식, improt구문을 실행 context의 최상단으로 끌어올려 undefined를 할당한다.

```javascript
sayHi('dltlaos11');

function sayHi(name) {
    console.log(`${name} Says hi~`);
}
```
<br> 위의 코드도 자바스크립트 엔진이 다음과 같이 hoisting하여 해석한다.

```javascript
function sayHi(name) {
    console.log(`${name} Says hi~`);
}

sayHi('dltlaos11');
```
<br> improt구문 또한 마찬가지 !!

```javascript
sayHi('dltlaos11');
import { sayHi } from './myModule'
```
<br> hoisting은 되지만 TDZ가 생성되어 접근할 수 없어 Reference Error(참조에러)를 던지는 경우가 있다.
* * * * * * * * * * * * * * * * * *

## Temporal Dead Zone(TDZ)란? 🟢

#### TDZ에 영향을 받는 구문은 크게
- const 변수
- let 변수
- class 변수
- constructor() 내부의 super()
- 기본 함수 매개변수

가 있다. 🖐
<br>
```javascript
console.log(number);
const number = 123; // ReferenceError: Cannot access  'number' before initialization
```
<br> var로 선언된 변수와 달리 const로 선언한 변수는 위와 같은 코드에서 undefined를 출력하는 것이 아닌 Reference Error를 발생시킨다.

## var로 선언된 변수는 🔵
* * * 
### 크게 3단계의 라이프사이클을 가진다.
<br>
<img src="https://noah0316.github.io/static/9edccb0975ba87abf535462e3b31c02d/a6d36/var.png" /> 
<br> var로 선언된 변수는 선언과 초기화를 동시에 진행한다. 위에서 보이는 것처럼 var로 선언된 변수는 선언과 동시에 undefined로 호이스팅 되어 선언과 초기화가 동시에 진행된다.

## let, const으로 선언된 변수는🔵
* * *
<br>  
<img src="https://noah0316.github.io/static/0d6208436219e3b022a6c152572d803c/a6d36/let.png" />
<br> let은 선언과 초기화가 분리되어 그 사이에 TDZ가 생성되고, const는 선언과 초기화가 동시에 진행되지만 선언 이전에 TDZ가 생성되어 접근하면 Reference Error가 발생한다.

## 함수 선언식은🔵
* * *
<br> 
<img src="https://noah0316.github.io/static/36d3480708397e4ce923bccd4b2b7c52/a6d36/func.png" />
<br> 함수 선언식은 선언, 초기화, 할당을 동시에 진행한다. 

* * *
Temporal Dead Zone에 접근하면 참조에러가 발생하는데, Temporal Dead Zone은 다음과 같다.
<br>
<img src="https://noah0316.github.io/static/dfec2c7306e61a4fbc590903554352db/6aca1/tdz.jpg" />
<br>
TDZ에 영향을 받는 구문들은 생성되는 과정에서 TDZ가 생성되는데, TDZ에 접근하게 되면 ReferenceError가 발생 😅
<br> 따라서 TDZ에 있는 number변수에 접근하면 ReferenceError가 발생하게 된다.
<br> let으로 선언된 변수도 마찬가지이다.
```javascript
console.log(number);
let number = 123; // ReferenceError
```
<br> class구문도 선언 전에는 class를 사용할 수 없다.

```javascript
// Does not work ! ❌
const myNissan = new Car('red'); // throws 'ReferenceError'

class Car {
    constructor(color) {
        this.color = color;
    }
}
```
<br>위의 코드에서는 TDZ에 접근했기 때문에 ReferenceError가 발생, TDZ에 접근하지 않기 위해서는 다음과 같이 변경해야 한다.

```javascript
class Car {
    constructor(color) {
        this.color = color;
    }
}

// WorkS ! 
const myNissan = new Car('red');
myNissan.color; // 'red'
```
<br>다음으로 constructor() 내부의 super() 메소드를 봐보자 !
<br> 부모 클래스를 상속받는 경우, 

```javascript
class MucleCar extends Car {
    constructor(color, power) {
        this.power = power; // Access to TDZ
        super(color);
    }
}

// Does not work ! ❌
const myCar = new MucleCar('blue', '300Hp'); // 'ReferenceError'
```
<br> constructor() 즉 생성자 안에서 super()가 호출되기 전까지는 ```this```바인딩은 TDZ에 있다. TDZ는 인스턴스를 초기화하기 위해서는 부모클래스의 생성자를 호출한 뒤 this 값을 사용하도록 유도한다. 따라서 부모클래스의 생성자를 호출한 뒤에 자식 클래스에서 this 값을 변경할 수 있다.
<br>

```javascript
class MucleCar extends Car {
    constructor(color, power) {
        super(color);
        this.power = power;
    }
}

// Works!
const myCar = new MucleCar('blue', '300HP');
myCar.pwoer; // '300HP'
```
<br>
다음으로 Default Function Parameter 기본 함수를 살펴보자 !
<br> 기본 매개변수는 전역(global)과 함수 스코프 사이의 중간 스코프(intermediate scope)에 위치한다. 기본 매개변수도 TDZ 제한이 있다.

```javascript
cosnt a = 2;
function square(a = a) {
    // function square(a = a) -> Access to TDZ

    return a * a
}
// Does not work ! ❌

square(); // throws 'ReferenceError'
```
<br>기본 매개변수 ```a```는 선언 전에 ```a = a``` 표현식의 오른쪽에서 사용되었다. ```a```가 초기화 되어 있지 않아 TDZ에 있는데 참조하여 참조 에러가 발생한다.<br>
기본 매개변수는 선언 및 초기화 다음에 사용되어야 한다. 이 경우 ```init```과 같은 다른 변수로 선언하여 사용한다.
<br>

```javascript
const init = 2;
function square(a = init) {
    return a * a;
}
// Works !
square() // => 4
```
<br>
마지막으로 스코프 안에서의 TDZ의 동작을 살펴보자 
<br>

```javascript
function doSomething(someVal) {
    // Function scope
    typeof variable; // => undefined
    if (someVal) {
        // Inner block scope
        typeof variable; // throws 'ReferenceError'
        let variable;
    }

    doSomething(true);
}
```

<br>
위 코드에는 2개의 스코프가 존재한다.
<br>1.  함수 스코프
<br>2.  let 변수가 선언된 내부 블록 스코프 
<br>
함수 스코프에서 typeof variable는 undefined로 할당된다. 여기서는 let variable 구문의 TDZ에 영향을 주지 않는다.
<br> typeof variable 구문의 내부 스코프에서는 선언 전에 변수를 사용하면 ReferenceError: Cannot access 'variable' before initialization 에러가 발생한다.
<br> 따라서 TDZ는 현재 if문 내부의 블록 스코프에만 존재한다.

* * * * 

## 마지막으로..🙂
## TDZ
TDZ를 피해야 선언전에 변수를 사용하여 발생하게 되는 위험을 줄일 수 있어 안전한 코드를 짤 수 있게 해준다..!<br>

```javascript
function a() {
    console.log(z);
} // TDZ에 z가 걸리는 것이 아니다. TDZ에 관련해서는 a() 함수 내부의 코드들에 TDZ에 안걸린다고(영향르 미치지 않는다고) 보면 된다. 
// 그 함수 내부의 접근하는 방식은 호출스택에서 작성했던 "선언에 대한 Map"대로 하는 것 ! TDZ에 관련해서는 함수 내부에까지 영향을 미치는 것이 아니다 !!! 😎😎 


const z = 'z1';
a(); // z1
```

## Hoisting
eslint를 사용하면 Hoisting 사용을 방지할 수 있다..!!<br>
function은 호이스팅이 되서 상단으로 올라간다..!<br>
Hoisting관련 코드는 웬만하면 피하기..!!🖐

```javascript
var variable; // 이 부분만 호이스팅 된다 🧐
console.log(variable); // undefined
variable = 10;
``` 
<br> const, let은 2번 선언하면 Error But var은 여러번 선언해도 문제가 없다.
<Br> var은 코드를 분석할 떄 헷갈리게 만든다. ex) 선언 부분만 올라간다던지, 선언은 2번이나 될 수 있고.. , 
<br>위 코드의 절차를 거치면 window.variable로 등록이 된다. variable(var)을 사용한다면..
<br><mark>var 있으면 var y;와 같은 형식으로 위로 올리고 그 다음 함수들(함수 선언식들)을 나열.. 그리고 cosnt와 let은 그 상태 그대로 유지 !! 이것이 호이스팅이다.</mark>
    
# 블록 스코프와 매개변수📗

``` javascript 
const x = true;
const y = false;
function a() {
    let a = 4;
    y = true;
    if (x) {
        let a = 3;
        for (let i = 0; i < a; i++>) {
            console.log(i);
        }
        if (!y) {
            kkk();
        }
    }
    z(); // 에러 
}

a();
const z = () => {}; // 선언은 위에서부터 아래로 순서대로 실행되는 것. a를 호출했을 때는 z가 선언되지 않은 상태이므로 에러

// 🔘 다만, function z() {} 이거나 사용하지 않는 것이 좋은 var z; 였다면 호이스팅 되서 위로 올라간다. 호이스팅이 되는 것이 있나 한번 살펴보는 것이 좋다.
// 파일 자체는 anonymous 함수, 파일 자체가 실행되면 anonymous 함수가 호출됐다고 생각하고 자기 스코프에 호이스팅 될 애들이 있나 살펴봐야 한다.

// 🧐 동기 코드에서 해야되는 것은 스코프 별로 선언지도(Ex_ anony -> a(fun), x(true), y(false->true), z->(fun) || a -> a(4) || z -> a(3), b(5)) 그리고 호출별로 호출스택과 this를 만들어서(Ex_ananoy->this(window), z->this(window) || strict모드면 undefined) 연습 
```
