# Promise🙏🏻
### Promise를 한 문장으로 정의하자면 "실행되었는데 결괏값을 나중에 원할 떄 쓸 수 있는 것"이다. 
<br>

``` javascript
const promise = new Promise...;
// 신나게 딴짓

promise.then((결괏값) => {
    // 결괏값 사용
}) 
```
하지만 주로 아래처럼 사용하곤 한다. Promise 만들자마자 then 붙이는게 습관이 되었기 떄문
``` javascript
new Promise().then((결괏값) => {
    // 결괏값 사용
}).catch((에러) => {});
```
위 코드는 아래 처럼 표현 가능
``` javascript
const p = new Promise();
// 딴짓

const c = p.then((결괏값) =>{
    // 결괏값 사용
}).catch((에러) => {});
```

<br>

## 비동기 callback🟢
``` javascript
setTimeout(() => {
    console.log('a');
}, 1000);
``` 
- 1초 뒤에 ```a```라는 결괏값을 바로     출력하는 타이머 역할

### 비동기 callback이라 한 이유는 callback은 무조건 비동기가 아니라 동기/비동기 일 수 있다.

## 동기 callback🟢
``` javascript
function calculator(callback, a, b) {
    return callback(a, b);
}

calculator((x,y)=>x+y, 3, 5); // 8
calculator(function(x,y) {return x+y}, 3, 4); // 7 
```

### ```Promise```는 다음 중 하나의 상태를 가진다.

- 대기(pending): 이행하지도, 거부하지도 않은 초기 상태

``` javascript
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('a');
    }, 1000);
}); // undefined 1초 뒤 a 

 promise.then(() => {
     console.log('a');
 }) // Promise {<pending>}
    // [[Prototype]]: Promise
    // [[PromiseState]]: "pending"
    // [[PromiseResult]]: undefined
```

- 이행(fulfilled): 연산이 성공적으로 완료됨.
``` javascript
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, 1000);
}); // undefined

promise.then(() => {
     console.log('a');
 }) 
 // a
 // Promise {<fulfilled>: undefined}
 // [[Prototype]]: Promise
 // [[PromiseState]]: "fulfilled"
 // [[PromiseResult]]: undefined
```
- 거부(rejected): 연산이 실패함
``` javascript
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject();
    }, 1000);
}); // undefined

promise.then(() => {
     console.log('a');
 }) 
 // Promise {<rejected>: undefined}
// [[Prototype]]: Promise
// [[PromiseState]]: "rejected"
// [[PromiseResult]]: undefined 
```

## Promise.all&Promise.allSettled🟢  나중에 결과를 한번에 받을 수 있다.
``` javascript
const p1 = axios.get('서버주소1')
// const p1 = axios.get('서버주소1').then((데이터1) => {}); 보통 많이 하는 짓
const p2 = axios.get('서버주소2') // p1에 대한 딴짓
const p3 = axios.get('서버주소3') // p1에 대한 딴짓
const p4 = axios.get('서버주소4') // p1에 대한 딴짓
const p5 = axios.get('서버주소5') // p1에 대한 딴짓

Promise.all([p1, p2, p3, p4, p5]).then((results) => {});
// 하나라도 잘못되도 성공한 값들은 날아가고 err출력
Promise.all([p1, p2, p3, p4, p5]).then((results) => {}).catch((err) => {}); 
// 이런 단점을 알기에, 성공한 값은 돌려주고 실패한 것들을 모두 알려주는 Promise.allSettled !!
Promise.allSetteld([p1, p2, p3, p4, p5]).then((results) => {
    // 실패한 것만 필터링해서 다시 시도
}).catch((err) => {}).finally(() =>{}); // then이든 catch든 신경안쓰고 무조건 실행되는 finally !! 
```
## callback Hell😨
위 코드에서 callback을 사용했다면 callback 지옥 펼쳐젔을 것이다.
``` javascript
axios.get('서버주소1', function(데이터1)) {
    axios.get('서버주소2', function(데이터2) {
        axios.get('서버주소3', function(데이터3) {

        });
    });
}
```
callback hell이 안좋은 이유는 뭘까 ?🤔
<br> 

### 결과값을 바로 받아야 하기 떄문이다 !!! 그래서 코드가 지저분해지는 것
Promise 사용은 코드를 더 깔금하게 한다. 

## 비동기 ??🤔
``` javascript  
setTimeout(() => {
    console.log('a');
}, 0); // 안엥 callback 함수는 무조건 비동기 callback 함수가 아니다.
setTimeout(() => {
    console.log('b');
}, 1000);
setTimeout(() => {
    console.log('c');
}, 2000);
// setTimeout은 비동기 함수이다. 비동기 함수의 유무나 비동기 중에서도 Promise인지는 직접 찾아봐야 한다.
```
### 비동기는 동시의 문제가 아니다. 순서의 문제다. 비동기 코드도 정해진 순서는 있다. 보이는 것과 다를 뿐
### 한 번 비동기는 영원한 비동기 코드이다. 비동기 코드를 동기 코드로 바꿀려고 Promise 코드를 async/await를 쓰는데 그건 사실 동기로 만드는 코드가 아니다. 비동기 코드를 동기 코드로 바꾸려고 하지 말아라. 깔끔한 비동기 코드 작성해야 한다.
### 해석하는 방법🤷‍♂️
- ```BG```(백그라운드, Ex_다른언어로 이루어진 엔진_js, c++, Os, 브라우저) 비동기 코드들이 들어간다.
- ```M```(매크로 task que, FIFO) ````Timers````, ```Event Listener```
- ```m```(마이크로 task) ```promise```, ```process.nextTick``` 나머지는 매크로
- ```E.L```(이벤트 루프, ```M(task que)```에 쌓인 코드를 ```CS```로 올려준다. 하나씩 ! 이 때는 ```anony```까지 끝나서 ```BG```에 있는 값이 ```M```을 거친 상태)
- ```M(매크로 테스크 큐)```와 ```m(마이크로 테스크 큐)```를 나눈 이유는 ```BG```에는 완전히 동시라는 개념은 거의 없기에 ```m(마이크테스크 큐)```가 ```M(매크로테스크 큐)```보다 우선순위가 높다(먼저 ```CS(호출스택)```에 올라감).
- 마이크로테스크큐가 꽉 차있으면 영원히 매크로테스크 큐는 실행이 안됨

``` javascript
setImmediate(() => {
    console.log('a');
}); // 즉시
setTimeout(() => {
    console.log('b')
}, 1000);
setTimeout(() => {
    console.log('c')
}, 2000);
Promise.resolve().then(() => {
    console.log('p');
}) // 마이크로 CS에 올라가는 우선순위가 더 높다.
// p a b c

setImmediate(() => {
    console.log('a');
}); // 즉시
setTimeout(() => {
    console.log('b')
}, 1000);
// a b
// setImmediate이 더 빠르지만 굳이 뭐가 더 우선순위인지 이런걸 공부할 필요는 X. anti-pattern😗
// useEffect(() => {}, []), () => {}부분이 비동기처럼 돌아감. 

setTimeout(() => {
    console.log('a')
}, 1000); // 익명함수에서 a 접근
console.log(a); // anonymous에서 a를 접근

let a =2;
setTimeout(() => {
    a=5;
    console.log(a);
    // 한번 비동기는 영원한 비동기이기 떄문에 
    // 5라는 값이 비동기로 들어가면 이런 값을 활용하고 싶다면 여기에서만 사용해야 된다.
    // 이 블록 밖에서 5를 다룰려고 하지 말자 
}, 0)
console.log(a); // 5를 출력하고 싶은 경우 존재 하지만 스코프 체인이 다르므로 밖에서 5를 출력하는건 ❌
```

### 헷갈리는 비동기 코드는 애초에 안만드는게 좋다.

```SetTimeout```이 비동기 함수인 것을 알았으면 함수를 매개변수로 넣었고 밀리초를 매개변수로 넣었다. 이 부분을 위의 방법으로 정리. setTimeout을 ```BG```에 T(fn, 0)으로 표시, 그 다음에도 setTimeout이 있으니 T(fn, 1000)으롤 표시 그 다음 T(fn, 2000). ```호출스택(CS)``` 부분은 처음부터 ```anony->set->set->set``` 순으로 시작하며 마무리. ```BG```에 들어가는 애들은 동시라는 개념이 있다. Js는 싱글 스레드로 ```BG```랑은 별개로 생각하기. ```BG```에 들어가는 것은 ```setTimeout```을 호출했을 떄 ```setTimeout```(or ```setInterval```)의 ```timers```들은 ```BG```에 들어간다. ```Promise```도 들어간다. ```node```라면 ```process.nextTick()``` 그리고 네트워크 요청 ```Ajax``` 요청도 들어간다. 클릭같은 이벤트 리스너나 커스텀 이벤트 등이 들어감. 비동기면 ```BG```를 한번 거친다고 생각하자. ```BG```에 들어가면 여러개가 동시에 돌아감. 결과값이 js로 다시 돌아온다. 비동기 콜백함수를 실행할 떄는 호출스택(CS)에 올라와 있어야 한다. 근데 바로 ```CS```로 가는게 아니라 ```BG```에 간 코드는 한번 ```M(task que)```를 거쳐야 함. setTimeout은 M에 큐처럼 쌓인다. 참고로 ```호출스택(CS)```은 ```stack``` ````task que````는 ```큐```이다. 그래서 ```M```에 "1번함수", "2번함수", "3번함수"가 쌓이고 ```E.L```이 하나씩 ```CS```로 끌어올림. "1번함수"가 올라가면 ```M```에 "2번함수", "3번함수"가 남고 ```CS```에는 ()=>{} || log("a")로 콘솔에 a가 찍힐 것. 그리고```CS```는 스택이니 log ,()=>{}순으로 끝나고 2번함수도 마찬가지

### 위의 과정이 좀 복잡해보이지만 이를 수행하면 모든 비동기 코드가 전부 동기로 보인다. 동기 코드는 위에서 아래로, 왼쪽에서 오른쪽으로 실행되기 때문에 순서를 헷갈일 일이 그렇게 없다. 하지만 비동기는 순서가 헷갈림_Ex)(1번함수는 나중에 실행, 2번함수는 나중에 실행..). ```BG```와 ```M```(매크로 task que) ```m```(마이크로 task que) 분석을 할 수 있게 되는 순간 모든 코드가 순서대로 보인다.  

## Promise에도 동기부분이 존재🟢
``` javascript
const p = new Promise(이 부분은 동기 코드부분임 !);

외우기 !!🙏🏻🙏🏻🙏🏻🙏🏻🙏🏻
const p = new Promise((resolve, reject) => {});
new Promise() 에서 "(resolve, reject) => {}" 이 함수는 알아서 호출된다 
외우기 !!🙏🏻🙏🏻🙏🏻🙏🏻🙏🏻

// setTimeout을 Promise로 변환🔜
const p = new Promise((resolve, reject) => {
    console.log('제일먼저');
    setTimeout(() => {
    a=5;
    console.log(a);
    resolve(a); // resolve(결괏값)
}, 0)
});
// Promise란, 실행은 바로 하되 결괏값을 나중에 원할 떄 쓸 수 있는 것

console.log('딴짓');

p.then((result) => {
    console.log('result', result);
})
// 제일먼저 딴짓 5 result 5 ▶ Promise에 동기 부분 존재
```
### 위의 과정에서 비동기 함수 ```setTimeout```과 ```then```은 ```BG```에 기록된다. ```BG```는 어떤 특정 조건이 만족했을 떄 ```M```이나 ```m```에 보내준다. ```setTimeout```의 특정 조건은 "```Timers``` 시간 초가 지나면"이고 ```Promise then```의 특정 조건은 ```resolve```함수가 호출되면이 조건이다. 그 조건이 수행됐을 떄 마이크로로 가는지 매크로로 가는지 확인. ````BG````에서 ```setTimeout```이 매크로로 간 다음 ```CS```로 가면 
``` javascript
() => {
    a=5;
    console.log(a);
    resolve(a); // resolve(결괏값), 결괏값은 then의 result와 동일
}
```
부분이 올라간다. 안에서 resolve(a)를 호출하니 ```Promise```의 조건을 만족, ```CS, BG, M, m```이 모두 비어있으면 js가 끝난 것이다.
### 참고로 비동기 함수가 ```BG```에 들어가는 부분에서 setTimeout 말고 setInterval의 경우 ```BG```에 끝까지 남아있으므로 clearInterval을 해줘야 js가 마무리된다.

## then🟢
``` javascript
//  연속된 then의 경우 catch를 마지막에 붙이기 보단 각 then에서 catch하는 것이 좋다. 마지막 catch는 앞 전부에서 오류가 하나라도 있으면 발생. 어떤 오류인지 찾기 힘듦. 
p.then((result) => {
    console.log('result', result);
}).catch(()=>{

}).then(() => {

}).catch(()=>{

}).then(() => {

}).catch(()=>{

}).then(() => {

}).finally(() => {

})

p.then((result) => {
    console.log('result', result);
    return 1;
}).then((result) => {
    console.log(result); // 1
    // 함수는 아무것도 안적으면 기본적으로 return undefined;
    return undefined;
}).then((result) => {
    console.log(result); // undefined
    return Promise.resolve(1); // Promise면 resolve한 값이 그 다음 return 값
}).then((result) => {
    console.log(result); // 1
})



```
### setTimeout을 Promise화 시키기
``` javascript
function delayP(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms); // Promise로 감싸서 원할 떄 결과값을 resolve 해주면 된다.
        reject(err); // err 날만한 부분에 reject(err)하기
    });
};

async function a() {
    try {
        await delayP(1000);
    } catch(error) {
        console.error(error);
    } // delayP 하나에 대한 에러를 확인하고 싶을떄

    try {
        await delayP(1000);
        await delayP(1000);
        await delayP(1000);
    } catch (error) {
        console.error(error);
    }
}
```

## async/await, Promise로 바꾸기🟢

``` javascript
async function a() {
    const a = await 1;
    console.log('a', a);
    console.log('hmm');
    await null;
    const b = await Promise.resolve(1);
    console.log('b', b);
    return b;
}

// async 함수를 Promise로 바꾸려면 await이 기준이다. await을 then이라고 생각해라
// async 함수는 오른쪽에서 -> 왼쪽 Promise에서는 왼->오른쪽, 위에서 아래로

Promise.resolve(1) // 처음 await 1이 Promise가 아니므로 1을 Promise화 시키기
    .then((a) => { // await에서 대입하는 변수를 then()에 대입 
        console.log('a', a);
        console.log('hmm');
        return null; // await null 
    })
    .then(() => { // await과 await사이 대입하는거 없으르로 
        return Promise.resolve(1);
    })
    .then((b) => {
        console.log('b', b);
        return b;
    });

// 마지막에 return b가 아니라 return a+b인 경우

async function a() {
    const a = await 1;
    console.log('a', a);
    console.log('hmm');
    await null;
    const b = await Promise.resolve(1);
    console.log('b', b);
    return a+b;
}

Promise.resolve(1) 
    .then((a) => { 
        console.log('a', a);
        console.log('hmm');
        return [a, null]; 
    })
    .then((...args) => { 
        return Promise.all(args.concat(Promise.resolve(1)));
    })
    .then((...args) => {
        console.log('b', b);
        return b;
    }); // 스코프체인에 의해 a에 접근이 안된다. 그래서 계속 넘겨받는 형식으로 한다.
    // 위의 코드는 편의상 !🧐 
```
``` javascript
async function c() {
    const a = await 1;
    const b = await 2;
    return a + b; // 이런 경우 Promise로 못 바꿈.
} // async function은 재너레이터로 변환 한다고 한다. 동일한 스코프 제공..한다고 한다.

Promise.resolve(1)
    .then((a) => {
        return 2;
    })
    .then((b) => {
        return a+b; // 스코프 문제로 ❌, async function은 가능, Promise로 변환 못함.
    })

// return a+b같은 것만 따로 스코프를 제공해야 한다.🙏🏻 나머지는 그냥 바꾸면 된다. return 값이 하나인 것들(스코프 재공 필요없는 변수들만 있는 경우)
// 위 같은 경우에 async 🔜 Promise는 안되지만 IIFE(즉시 실행 함수)를 만들어서 억지로 만들어보자..!!😨꼼수
(function() {
    let a;
    let b;
    Promise.resolve(1) // resolve 호출의 부모는 즉시 실행 익명함수(IIFE)_(function() {})()
    .then((result) => {
        a = result;
        return 2;
    })
    .then((result) => {
        b = result;
        return a+b; // 스코프 문제로 ❌, async function은 가능, Promise로 변환 못함.
    })
})();
```

## 위 코드 해석🟢
### async 함수는 await 나오기 전까지 '동기', await 나오는 순가 '비동기'
### await는 then으로 끊어진다.
``` javascript
function delayP(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms); 
        reject(err); 
    } /*동기부분*/);
};

async function a() {
    console.log('2'); // 동기 부분
    const a = await 1; // async는 await 나오기 전까지 '동기', await 나오는 순가 '비동기', await때문에 await 이후부터는 비동기임. 한번 비동기는 영원한 비동기
    // await는 then으로 끊어진다.
    console.log('4'); // anonymous 다 끝난 다음에 비동기 부분 들어가는 첫 부분
    console.log('a', a);
    console.log('hmm');
    await null;
    const b = await Promise.resolve(1); // Promise면 resolve하고 아니면 바로넘기기 
    console.log('b', b);
    return b;
}
// await이 붙으면 다 비동기

// 초반에 익숙하지 않을 떄는 async function a()를 아래처럼 생각하기.
// Promise.resolve(1) 
//     .then((a) => {  
//         console.log('a', a);
//         console.log('hmm');
//         return null;  
//     })
//     .then(() => {  
//         return Promise.resolve(1);
//     })
//     .then((b) => {
//         console.log('b', b);
//         return b;
//     });

console.log('1');
a().then((result) => {
    console.log(result);
}).then((result2) => {
    console.log(result2);
})
console.log('3');
// 1
// 2 
// 3
// 4
// a 1
// hmm
// b 1
// 2
// undefined

```

## Promise 🔜 async로 바꿀떄 실수🟢
- 동시(```BG```에서)에 실행 가능한 것들은 ```Promise```로 먼저 실행해라, await 연달아 쓰지 말기
``` javascript
function delayP(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms); 
    } /*동기부분*/);
};

// await을 줄줄이 적는 것..!!
// await 부분을 then이라고 보면 된다.
async function a() {
    await delayP(3000); // 3초
    await delayP(6000); // 6초
    await delayP(9000); // 9초
} // 토탈 18초

async function b() {
    const p1 = delayP(3000); // 3초
    const p2 = delayP(6000); // 6초, p1 p2가 동시에 가능하다면
    await Promise.allSettled([p1, p2]); // 6초
    await delayP(9000); // 9초
} // 토탈 15초
// Promise.all, Promise.allSettled 결괏값을 한 번에 묶어서 나중에 사용가능

async function b()를 Promise로 변형시키면🤔

new Promise((resolve, reject) => {
    const p1 = delayP(3000); 
    const p2 = delayP(6000);
    return Promise.allSettled([p1, p2]);
})
    .then(() => {
        return delayP(9000);
    })
    .then(() =>{

    })
```
### ```Promise```의 타이밍은 3번 정도 나뉜다.
- 실행은 바로 한다. ```new Promise(동기코드)```이므로
- resolve가 되는 순간 결괏값이 나오기에 결괏값은 나중에 나온다.
- 결괏값을 사용할 떄는 더 나중. ]
### 사람들이 익숙한 상황은
- 실행은 바로
- 결괏값도 거의 바로 쓰고싶은데
- 그 다음에 결괏값이 나오면
- then, await, Promise.all 이런게 결괏값을 기다린 후에 실행된다.
``` javascript
axios.get().then(() =>{

}).catch(() => {

}).finally(() => {

}); // 사실상 callback함수..!

// async 함수 사용할 떄 동시에 사용 가능한 지에 대해서 생각해봐야함.
async function createPost(){
    const post = await db.getPost(); // 게시물 조회
    if (post) {
        res.status(403).send('이미 게시글에 존재합니다.');
    } else {
        await db.createPost(); // 게시글 작성

        const p1 = db.userIncrementPostCount(); // 사용자에 작성글 카운트 1 올림
        const p2 = db.createNoti(); // 새로운 게시글 알림 등록
        await Promise.allSettled([p1, p2]); // 응답시간 줄일 수 있다.
    }
}
```

## 프로미스 다양한 활용🟢 
``` javascript
const p1 = axios.get('서버주소');
const p2 = axios.get('서버주소');
const p3 = axios.get('서버주소');
const p4 = axios.get('서버주소');
const p5 = axios.get('서버주소');
...
const p12 = axios.get('서버주소');
await Promise.allSettled([p1, p2, ...p12]); // 먼저 처리
await Promise.allSettled([p13, p14, ...p24]); // 먼저 처리
await Promise.allSettled([p25, p26, ...p36]); // 먼저 처리
// 브라우저가 한 번에 처리할 수 있는 양이 있다.
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *


const results = await Promise.all([p1, p2, p3]);

results.map(async() => {
    await result조작();
}, []); // async도 Promise다. 문법적으로 다르게 표현한 것일 뿐.
// map에서 Promise하면 순서 보장 안된다. 
// p1, p2, p3에 대해 조작 동시에(BG에서) 돌아간다고 느껴짐🔘
// ex) 이미지들 여러개를 동시에 조작

for (let result of results){
    await result조작(); // p1, p2, p3에 대한 조작 순서대로🔘
}
// 이미지들 순서대로 조작

let array = [];
for (let result of results) {
    array.push(result조작());
}
await Promise.all(array); // 동시🔘


```
### async도 Promise다. 문법적으로 다르게 표현한 것일 뿐.😗 js에 동시는 없다.

## 클로저🟢
- 클로저 문제 : 스코프, 비동기, var(쓰레기)
- var이 쓰레기인 이유는 for문 블록 안에 i가 있는게 아니라 부모인 함수 스코프에 존재.(함수 스코프, 블록 스코프)
- 클로저가 문제다 ❌
- 클로저를 사용해서 해결하는 문제
- for문(반복문)과 비동기를 사용하면 종종 발생

``` javascript
function a() {
    for(var i =0; i<5; i++){ // i가 4일떄까지는 true인데, i가 5가되고, 5<5가 false, 
    // i가 variable이면 a에속한다. 🔘
        setTimeout(() => {
            console.log(i);
        }, i*100); // 0, 100, 200, 300, 400
    }
}
a(); // 5 5 5 5 5
// function a 스코프는 1개고, for문의 스코프는 5개
// a스코프에서 i는 0->5가 되는 거고, for문의 스코프 5개에서 i는 각각 0,1,2,3,4


// setTimeout()안에 "() =>{}" 선언이다.
// 문제: var과 for과 비동기의 환상의 콜라보
// 해결법: var 유지 -> 즉시실행함수(IIFE) 클로저 생성
// 해결법: var => let으로

// let 사용
function a() {
    for(let i =0; i<5; i++){ // i가 let이면 for문에 속한다. 🔘
        setTimeout(() => {
            console.log(i);
        }, i*100);
    }
}
a(); // 0 1 2 3 4

// IIFE(즉시 실행 함수)
const x=1; // function a와 x는 클로저 관계
function a() {
    for(var i =0; i<5; i++){
        (function(j) {
        setTimeout(() => {
            console.log(j);
        }, i*100);
    })(i);
    }
}
a(); // 0 1 2 3 4
// function(j){}와 var i는 클로저 관계 형성
// setTimeout()의 callback함수 ()=>{}가 function()의 매개변수j와 클로저 관계
// 모든 함수는 바깥에 변수가 있으면 그 변수와 클로저 관계
```
### 클로저는 함수와 함수 외부의 변수와의 관계를 클로저라고 한다.

## 클로저 결론🟢
``` javascript
function a() {
    for(var i =0; i<5; i++){ 
        setTimeout(() => {
            console.log(i);
        }, i*100); 
    }
}
a();
// () => {
//             console.log(i);
//         }
// 처음 이 함수와 클로저 관계를 가지는 부분이 var i였는데 스코프 문제로 원하는 결과가 안나왔던 거고

function a() {
    for(var i =0; i<5; i++){
        (function(j) {
        setTimeout(() => {
            console.log(j);
        }, i*100);
    })(i);
    }
}
a();
// 새로운 함수 하나를 만들어서 내부 함수와
// () => {
//             console.log(j);
//         }
// 새로운 함수의 변수 j의 새로운 클로저 관계를 만들어서 해결했다고 해서 클로저 문제이다.
```
### 기존의 문제있던 클로저관계를 새로운 함수를 이용해 새로운 클로저 관계로 해결했기 때문에 클로저 문제🔘
