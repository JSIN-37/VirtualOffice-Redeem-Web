import React from 'react'
import { useContext } from 'react/cjs/react.development'
import { AppData } from '../home/Home'

export default function Login() {

    const {setSignedIn} = useContext(AppData)

    return (
        <div>
            <h1>Login Area</h1>
            <button onClick={()=> setSignedIn(true)}>Log in - set true / false</button>
        </div>
    )
}
