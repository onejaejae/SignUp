import React, { useState } from 'react'

function ResisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailHandler = (e) => {
        setEmail(e.target.value);
    }

    const passwordHandler = (e) => {
        setPassword(e.password.value);
    }

    const onSubmitHandler = (e) => {
        e.perventDefault();

        let body = {
            email : email,
            password : password
        }
    }

    return (
        <div style={{
            display:'flex', justifyContent:"center", alignItems:"center",
            width:'100%', height:'100vh'
        }}>
            <form tyle={{
               display:'flex', flexDirection:'column'
            }}
                onSubmit={onSubmitHandler}>
                    <label>Email</label>
                    <input type="email" value={email} onChange={emailHandler} />
                    <label>Password</label>
                    <input type="password" value={password} onChange={passwordHandler} />
                    <button type="submit">
                        Resister
                    </button>
            </form>
        </div>
    )
}

export default ResisterPage
