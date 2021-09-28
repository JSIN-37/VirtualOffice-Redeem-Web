import React from 'react'
import { useContext } from 'react/cjs/react.development'
import { AppData } from '../home/Home'
import { useHistory } from 'react-router-dom'


export default function EmployeeArea() {
    
    const {signedIn} = useContext(AppData) //replace with sign in function
    const history = useHistory()

    return (
        <>
            {signedIn && (
                <div>
                    <h1>Employee Area</h1>
                </div>
            )}
            {!signedIn && history.push('/employee/login')}
        </>
    )
}
