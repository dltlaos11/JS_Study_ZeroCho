import { useCallback } from "react";

export const App = () => {
    const onClick = useCallback((e) => {
        console.log(e.target);
    }, []);

    return (
        <div onClick={onClick}>  
        {/* onClick() X, 
        onClick()의 return 값: (e) => {
            console.log(e.target);
        } undefined이다. onClick={undefined}
        
        근데 고차함수라면
         const onClick = useCallback(() => (e) => {
        console.log(e.target);
    }, []);

        <div onClick={onClick()}>   가능  
        onClick() 함수 호출했으면 return값으로 바꿔서
        
        <div onClick={(e) => {
        console.log(e.target);
    }></div>
    가능한 코드이므로 onClick이 고차함수라면 함수호출을 넣는 것은 가능하다.

    함수호출 코드를 보면 onClick()의 리턴값을 보기 :) 
    
    함수이름() -> 함수호출(return으로 대체해서 가능한 코드인지 확인) 
    const onClick = useCallback((e) => {
        console.log(e.target);
    }, []);  -> 함수선언
    
        
        
        */}
        </div>
    )
}