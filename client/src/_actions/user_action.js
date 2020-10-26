import axios from 'axios';
import { LOGIN_USER, RESISTER_USER, AUTH_USER } from './types'

export  function loginUser(body){

    const request = axios.post('/api/users/login', body)
    .then(response=>
        response.data 
    )

    return {
        type : LOGIN_USER,
        payload : request
    }
}

export  function registerUser(body){
    const request = axios.post('/api/users/register', body)
        .then(response=> response.data);

    return {
        type : RESISTER_USER,
        payload : request

    }
}

export function auth(){
    const request = axios.get('/api/users/auth')
        .then(response => response.data);

    return {
        type : AUTH_USER,
        payload : request
    }
}