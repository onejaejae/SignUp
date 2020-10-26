import React, { useEffect } from 'react'
import axios from 'axios';


function LandingPage(props) {
    // componentDidMount
    useEffect(()=>{
        axios.get('/api/hello')
        .then( response=>{console.log(response)});
    }, [])

    const onClickHandler = () => {
        axios.get('/api/users/logout')
        .then(response =>{
            if(response.data.success){
                props.history.push('/login')
            }else{
                return alert('로그아웃에 실패 했습니다')
            }
        })
    }

    return (
        <div style={{
            display:'flex', justifyContent:"center", alignItems:"center",
            width:'100%', height:'100vh'
        }}>
            <h1>시작 페이지</h1>
            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default LandingPage
