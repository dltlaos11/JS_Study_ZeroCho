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

// a()는 함수의 호출인데 바로 위 2줄의 코드가 호출스택으로 쌓이면 

// a 다음 바로 c가 아님 !!!!!!
// 호출하고 그 다음 호출로 넘어가는게 아니라 호출에 해당하는 선언으로 이동해야 한다.

// anony || a,,x || log(a),x || b,,x || log(b),x || c,,x || log(c),x 그 다음 스택에 c가 쌓이고 }를 만나면 빠지고 
// 모든 코드가 끝나고 마지막줄이면 anaoy까지 빠져 나간다. 
// -> debugger의 호출스택과 유사

// 호출스택 anaoy 부터 시작, 파일 전체의 시작을 anaoymous라고 생각해서 넣어두고 마지막에 anaoymous 해제하면 끝

// 스코프 체인이란 특정 함수에서 어떤 값에 접근할 수 있는지를 알려준다. debugger를 사용해 확인 가능 ##@@@#