import React from 'react'
import { useHistory } from 'react-router'
import { USER_STORAGE_KEY } from '../app_data/constants'
import { removeUserFromStorage } from '../utility/functions'

export default function Dashboard() {
    const history = useHistory()

    function handleLogout(){
        removeUserFromStorage(USER_STORAGE_KEY)
        window.location.reload()
    }

    function handleEditProfile(){
        history.push('/employee/profile')
    }

    return (
        <div>
            <h1>Employee dashboard</h1>
            <button onClick={handleEditProfile}>Edit Profile</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}
