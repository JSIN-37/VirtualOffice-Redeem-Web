import React from 'react'
import Login from '../login/Login'


export default function EmployeeArea() {
    
    const signedIn = true//replace with sign in function
    //const history = useHistory()

    return (
        <>
            {signedIn && (
                <div>
                    <h1>Employee Area</h1>
                </div>
            )}
            {!signedIn && <Login employee />}
        </>
    )
}
