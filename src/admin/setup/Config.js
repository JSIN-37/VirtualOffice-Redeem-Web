import React from 'react'
import { useContext } from 'react/cjs/react.development'
import { AppData } from '../../home/Home'
import AdminInitialLogin from './AdminInitialLogin'
import InitialSetup from './InitialSetup'

export default function Config() {
    const {signedIn} = useContext(AppData)
    console.log("CONFIG JS ", signedIn)

    return (
        <>
            {signedIn &&  <InitialSetup />}

            {!signedIn && <AdminInitialLogin />}
        </>
    )
}
