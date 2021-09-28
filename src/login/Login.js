import React, { useContext } from 'react'
import { AppData } from '../home/Home'

export default function Login(props) {
    const {BACKEND_URL} = useContext(AppData)
    let loginURL = ''
    if(props.employee){
        loginURL = `${BACKEND_URL}/employee/login` // set this right
    }
    if(props.admin){
        loginURL =`${BACKEND_URL}/admin/login`
    }

    
    
    return (
        <div>
            Log in Page
            <input type='text' placeholder='Username'></input>
            <input type='password' placeholder='password'></input>
        </div>
    )
}
