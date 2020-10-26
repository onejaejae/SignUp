import React, { useState }from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action'


function LoginPage(props) {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailHandler = (e) => {
      
        setEmail(e.target.value);
    }

    const passwordHandler = (e) => {
      
        setPassword(e.target.value);
    }

    const onSubmitHandler = (e) => {
        // preventDefault()를 하지 않을 경우 페이지가 새로고침되서 
        // e.preventDefault() 밑에 코드들이 실행 되지 않는다
        e.preventDefault();

        let body = {
            email : email,
            password : password
        }

        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess){
                    props.history.push('/');
                }else{
                    alert('Error');
                }
            })
    }
    
    return (
        <div style={{
            display:'flex', justifyContent:"center", alignItems:"center",
            width:'100%', height:'100vh'
        }}>
           <form style={{
               display:'flex', flexDirection:'column'
            }}
            onSubmit={onSubmitHandler}>
               <label>Email</label>
               <input type="email" value={email} onChange={emailHandler} />
               <label>Password</label>
               <input type="Password" value={password} onChange={passwordHandler} />
                <br/>
               <button type="submit">
                   Login
               </button>
           </form>
        </div>
    )
}

export default LoginPage
