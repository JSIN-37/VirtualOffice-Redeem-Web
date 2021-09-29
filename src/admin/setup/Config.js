import React , {useState} from 'react'
import { USER_STORAGE_KEY } from '../../app_data/constants'
import { isAuthenticated } from '../../utility/functions'
import AdminInitialLogin from './AdminInitialLogin'
import InitialSetup from './InitialSetup'
import { BACKEND_URL } from '../../app_data/constants'
const adminURL = `${BACKEND_URL}/admin/validate-token` 


export default function Config() {
    const [signedIn, setSignedIn] = useState(isAuthenticated(adminURL, USER_STORAGE_KEY))
    console.log("config signed in val -> ",signedIn)
    return (
        <>
            {signedIn &&  <InitialSetup />}

            {!signedIn && <AdminInitialLogin setSignedIn={setSignedIn}/>}
        </>
    )
}
