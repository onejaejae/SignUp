import React, { useEffect } from 'react'
import axios from 'axios';


function LandingPage() {
    // componentDidMount
    useEffect(()=>{
        axios.get('/api/hello')
        .then( response=>{console.log(response)});
    }, [])

    return (
        <div style={{
            display:'flex', justifyContent:"center", alignItems:"center",
            width:'100%', height:'100vh'
        }}>
            <h1>시작 페이지</h1>
            <button>
                로그아웃
            </button>
        </div>
    )
}

export default LandingPage
