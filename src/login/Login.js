import axios from 'axios'
import React, {  useState } from 'react'
import { useHistory } from 'react-router'
import { USER_STORAGE_KEY } from '../app_data/constants'
import { getTokenFromStorage, setUserToStorage } from '../utility/functions'
import { admin_login_url } from '../app_data/admin_urls'
import { employee_login_url } from '../app_data/employee_urls'

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

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function logIn(url, credentials){
        return new Promise(function (resolve, reject){
            axios.post(url,credentials)
            .then((response)=>{
                if(response.status === 200){
                    //resolve(response.data.token)
                    resolve(response.data)
                }
            })
            .catch((er)=>{
                console.log("error loggin in ",er)
                reject(false)
            })
        })
    }

    // async function adminLogin(){
    //     const credentials = {password : password, rememberMe:true}
    //     try{ 
    //         const res = await logIn(admin_login_url, credentials)
    //         console.log("login page, res ",res)
    //         //const user = {token : res}
    //         const user = {token : res.token}
    //         setUserToStorage(USER_STORAGE_KEY, user)
    //         window.location.assign(`http://localhost:3000/admin`) //find a better way
    //         } 
    //     catch{
    //         console.log("error logging in")
    //     }
    // }

    async function handleLogIn(url, credentials, destination){
        try{
            const res = await logIn(url, credentials)
            console.log("login page, handle login func, result -> ", (res))
            const user = res
            setUserToStorage(USER_STORAGE_KEY, user)
            window.location.assign(destination)
        }
        catch{
            console.log("error logging IN ")
        }

    }

    function handleLogInButton(){
        if(props.admin){
            const credentials = {
                password : password,
                rememberMe : true
            }
            handleLogIn(admin_login_url, credentials, `http://localhost:3000/admin` )
            return
        }else{
            const credentials = {
                email : email,
                password : password,
                rememberMe : true
            }
            handleLogIn(employee_login_url, credentials, `http://localhost:3000/employee`)
        }

    }

    
    
    return (
        <div>
            Log in Page
            {props.employee && <input type='text' placeholder='Username' value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>}
            <input type='text' placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
            <button onClick={handleLogInButton}>Login</button>
        </div>
        
    )
}
