import React from 'react'
import { USER_STORAGE_KEY } from '../app_data/constants'
import { removeUserFromStorage } from '../utility/functions'

export default function Dashboard() {

    function handleLogout(){
        removeUserFromStorage(USER_STORAGE_KEY)
        window.location.reload()
    }

    return (
        <div>
            <h1>Employee dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}
