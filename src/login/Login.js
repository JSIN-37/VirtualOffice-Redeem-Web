import axios from 'axios'
import React, {  useState } from 'react'
import { useHistory } from 'react-router'
import { BACKEND_URL, USER_STORAGE_KEY } from '../app_data/constants'
import { getTokenFromStorage, setUserToStorage } from '../utility/functions'
import { admin_login_url } from '../app_data/admin_urls'

export default function Login(props) {
    const history = useHistory()

    if(getTokenFromStorage(USER_STORAGE_KEY) !== ''){
        if(props.admin){
            history.push('/admin')
        }
        if(props.employee){
            history.push('/employee')
        }
    }

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
            const res = await logIn(admin_login_url, credentials)
            console.log("login page, res ",res)
            const user = {token : res}
            setUserToStorage(USER_STORAGE_KEY, user)
            window.location.assign(`http://localhost:3000/admin`) //find a better way
            } 
        catch{
            console.log("error logging in")
        }

        console.log("history ",history.location)
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
