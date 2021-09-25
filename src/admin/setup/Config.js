import React from 'react'
import { useContext } from 'react/cjs/react.development'
import { AppData } from '../../home/Home'
import Login from '../../login/Login'

export default function Config() {
    const {signedIn} = useContext(AppData)
    console.log("CONFIG JS ", signedIn)

    return (
        <>
            {signedIn && (<div>
            <h1>Config page</h1>
        </div>)}

        {!signedIn && <Login />}
        </>
    )
}
