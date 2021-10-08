import React , {useState, useEffect} from 'react'
import { USER_STORAGE_KEY } from '../../app_data/constants'
import {isAuthenticated } from '../../utility/functions'
import AdminInitialLogin from './AdminInitialLogin'
import InitialSetup from './InitialSetup'
import { admin_validate_url } from '../../app_data/admin_urls'
import LoadingScreen from '../../utility/LoadingScreen'


export default function Config() {

    const [loading, setLoading] = useState(false)
    const [signedIn, setSignedIn] = useState(false)
    useEffect(()=>{
        checkTokenValidity()
        async function checkTokenValidity(){
            try{
                setLoading(true)
                const auth = await isAuthenticated(admin_validate_url, USER_STORAGE_KEY)
                if(auth){
                    setSignedIn(true)
                    setLoading(false)
                    return
                }else{
                    localStorage.removeItem(USER_STORAGE_KEY)
                    setLoading(false)
                    return
                }
            }
            catch{
                console.log("Error validating token, try again or something.")
                localStorage.removeItem(USER_STORAGE_KEY)
                setLoading(false)
                return
            }
        }
    },[])

    if(loading){
        return <LoadingScreen message='Checking if already signed in '/>
    }

    return (
        <>  

            {signedIn &&  <InitialSetup />}

            {!signedIn && <AdminInitialLogin setSignedIn={setSignedIn}/>}
        </>
    )
}
