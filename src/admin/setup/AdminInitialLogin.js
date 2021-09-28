import React, { useState } from 'react'
import { useContext } from 'react/cjs/react.development'
import { AppData } from '../../home/Home'
import axios from 'axios'

export default function AdminInitialLogin() {
    const {setSignedIn, BACKEND_URL, setToken} = useContext(AppData)

    const [password, setPassword] = useState('')


    function signIn(){
        axios.post(`${BACKEND_URL}/admin/login`, {password : password, rememberMe:true})
        .then((res)=>{
            console.log("login res",res)
            console.log("axios res",res)
            if(res.data.token !==''){
                setToken(res.data.token)
                setSignedIn(true)
            }
        })
        .catch((err)=>{
            console.log("Error loggin in ", err.data)
            alert('error logging in')
        
        })
    }

    return (
        <div>
            <h1>Admin Initial Login Area</h1>
            <input type='text' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            <button onClick={signIn}>Log in </button>
        </div>
    )
}
