import React, { useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router'
import { USER_STORAGE_KEY } from '../app_data/constants'
import { employee_validate_url } from '../app_data/employee_urls'
import Dashboard from '../employee/Dashboard'
import EditProfile from '../employee/profile/EditProfile'
import InitialSetup from '../employee/setup/InitialSetup'
import { isAuthenticated } from '../utility/functions'
import LoadingScreen from '../utility/LoadingScreen'


export default function EmployeeArea() {
    
    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState(null)

    useEffect(()=>{
        checkToken()
        async function checkToken(){
            setLoading(true)
            try{
                const auth = await isAuthenticated(employee_validate_url,USER_STORAGE_KEY)
                if(auth){
                    setRedirect(false)
                    setLoading(false)
                  }else{
                    setRedirect(true)
                  }
            }
            catch{
                console.log("error checking token")
                localStorage.removeItem(USER_STORAGE_KEY)
                setRedirect(true)
            }
        }
    }, [])

    if(redirect){
        return <Redirect push to="/employee/login" />
    }

    return (
        <>
            {!loading && (
                <>
                    <Route exact path='/employee'>
                        <Dashboard />
                    </Route>
                    <Route exact path='/employee/initial-login'>
                        <InitialSetup />
                    </Route>
                    <Route exact path='/employee/profile'>
                        <EditProfile />
                    </Route>
                    
                </>
            )}
            {loading && <LoadingScreen message='Loading...' />}
        </>
    )
}
