import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

// 매개 변수 option
// option의 값 null => 아무나 출입이 가능한 페이지
// option의 값 true => 로그인한 유저만 출입이 가능한 페이지
// option의 값 false => 로그인한 유저는 출입이 불가능한 페이지

// 매개 변수 adminRoute
// adminRoute의 값을 app.js에서 true로 준다면 admin 유저만 출입이 가능한 페이지
// app.js에서 세번째 매개변수는 비워도 되는데, 비워서 준다면 null값이 들어옴

export default function (SpecifiComponent, option, adminRoute = null){
    
    function AuthenticationCheck(props){
        const dispatch = useDispatch();

        useEffect(()=>{

            dispatch(auth())
                .then(response => {
              
                // 로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){
                        props.history.push('/login');
                    }
                }else{
                   // 로그인 한 상태 
                   // 로그인 한 상태 + 관리자만 들어갈 수 있는 페이지 but 일반 유저인 경우
                   if(adminRoute && !response.payload.isAdmin){
                       props.history.push('/');
                   }
                   
                   if(!option){
                       props.history.push('/');
                   }
                }
            })
        }, [])

        return (
            <SpecifiComponent />
        )
    }

    return AuthenticationCheck;
}

