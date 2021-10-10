import React, { useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router'
import { USER_STORAGE_KEY } from '../app_data/constants'
import Dashboard from '../employee/Dashboard'
import InitialSetup from '../employee/setup/InitialSetup'
import { getTokenFromStorage } from '../utility/functions'
import LoadingScreen from '../utility/LoadingScreen'


export default function EmployeeArea() {
    
    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState(null)

    useEffect(()=>{
        checkLocalToken()
        function checkLocalToken(){
            setLoading(true)
            const token = getTokenFromStorage(USER_STORAGE_KEY)
            if(!token){
                setRedirect(true)
            }else{
                setRedirect(false)
                setLoading(false)
            }
        }

        // async function checkToken(){
        //     setLoading(true)
        //     try{
        //         const auth = await isAuthenticated(employee_validate_url,USER_STORAGE_KEY)
        //         if(auth){
        //             setRedirect(false)
        //             setLoading(false)
        //           }else{
        //             setRedirect(true)
        //           }
        //     }
        //     catch{
        //         console.log("error checking token")
        //         localStorage.removeItem(USER_STORAGE_KEY)
        //         setRedirect(true)
        //     }
        // }
    }, [])

    if(redirect){
        return <Redirect push to="/employee/login" />
    }

    return (
        <>
            {!loading && (
                <>
                    <Route exact path='/employee/'>
                        <Dashboard />
                    </Route>
                    <Route exact path='/employee/initial-login'>
                        <InitialSetup />
                    </Route>
                </>
            )}
            {loading && <LoadingScreen message='Loading...' />}
        </>
    )
}
