import axios from 'axios'
import React, {  useState } from 'react'
import { Redirect, Route, useHistory } from 'react-router'
import { BACKEND_URL, USER_STORAGE_KEY } from '../app_data/constants'
import Home from '../home/Home'
import { setUserToStorage } from '../utility/functions'


export default function Login(props) {
    const history = useHistory()
    const adminURL = `${BACKEND_URL}/admin/login` 
    //const employeeURL =`${BACKEND_URL}/employee/login`

    const [password, setPassword] = useState('')

    function logIn(url, credentials){
        return new Promise(function (resolve, reject){
            axios.post(url,credentials)
            .then((response)=>{
                if(response.status === 200){
                    resolve(response.data.token)
                }
            })
            .catch((er)=>{
                console.log("error loggin in ",er)
                reject(false)
            })
        })
    }

    async function adminLogin(){
        const credentials = {password : password, rememberMe:true}
        try{ 
            const res = await logIn(adminURL, credentials)
            console.log("login page, res ",res)
            const user = {token : res}
            setUserToStorage(USER_STORAGE_KEY, user)
            window.location.assign(`http://localhost:3000/admin`) //find a better way
            } 
        catch{
            console.log("error logging in")
        }

        console.log("historu ",history.location)
    }

    function handleLogInButton(){
        if(props.admin){
            adminLogin()
        }
    }

    
    
    return (
        <div>
            Log in Page
            {props.employee && <input type='text' placeholder='Username'></input>}
            <input type='text' placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
            <button onClick={handleLogInButton}>Login</button>
        </div>
        
    )
}
