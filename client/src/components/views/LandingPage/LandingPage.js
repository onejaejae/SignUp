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
            <h1>LandingPage</h1>
        </div>
    )
}

export default LandingPage
