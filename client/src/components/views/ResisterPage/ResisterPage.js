import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action'
 
function ResisterPage(props) {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const emailHandler = (e) => {
      
        setEmail(e.target.value);
    }

    const nameHandler = (e) => {
      
        setName(e.target.value);
    }

    const passwordHandler = (e) => {
      
        setPassword(e.target.value);
    }
 
    const confirmPasswordHandler = (e) => {
      
        setConfirmPassword(e.target.value);
    }
    

    const onSubmitHandler = (e) => {
        // preventDefault()를 하지 않을 경우 페이지가 새로고침되서 
        // e.preventDefault() 밑에 코드들이 실행 되지 않는다
        e.preventDefault();

        if(password !== confirmPassword){
            return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
        }

        let body = {
            email : email,
            name : name,
            password : password,
        }

        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.success){
                    props.history.push('/login');
                }else{
                    alert('Failed to sign up');
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

               <label>Name</label>
               <input type="text" value={name} onChange={nameHandler} />

               <label>Password</label>
               <input type="Password" value={password} onChange={passwordHandler} />

               <label>Confirm Password</label>
               <input type="Password" value={confirmPassword} onChange={confirmPasswordHandler} />
                <br/>
               <button type="submit">
                   회원 가입
               </button>
           </form>
        </div>
    )
}

export default ResisterPage
