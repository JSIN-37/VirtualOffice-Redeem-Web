import React from 'react'
import { useContext } from 'react/cjs/react.development'
import { AppData } from '../../home/Home'
import Login from '../../login/Login'
import InitialSetup from '../initial_setup/InitialSetup'

export default function Config() {
    const {signedIn} = useContext(AppData)
    console.log("CONFIG JS ", signedIn)

    return (
        <>
            {signedIn &&  <InitialSetup />}

        {!signedIn && <Login />}
        </>
    )
}
