import React from 'react'
import {useHistory } from 'react-router'

import { USER_STORAGE_KEY } from '../app_data/constants'
import { removeUserFromStorage } from '../utility/functions'

export default function Dashboard() {
    const history = useHistory()


    function handleLogOut(){
        removeUserFromStorage(USER_STORAGE_KEY)
        window.location.reload()
    }

    function handleViewDivisions(){
        history.push('/admin/view-divisions')
    }



    return (
        <div>
            <h1>Admin Dashboard</h1>
            <button onClick={handleViewDivisions}>View All divisions </button>
           <button onClick={handleLogOut}>logout</button>
        </div>
    )
}
