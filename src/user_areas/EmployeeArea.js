import React from 'react'
import { useContext } from 'react/cjs/react.development'
import { AppData } from '../home/Home'
import Login from '../login/Login'

export default function EmployeeArea() {

    const {signedIn} = useContext(AppData)

    return (
        <>
            {signedIn && (
                <div>
                    <h1>Employee Area</h1>
                </div>
            )}
            {!signedIn && <Login/>}
        </>
    )
}
