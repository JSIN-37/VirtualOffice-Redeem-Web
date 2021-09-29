import React from 'react'
import { useHistory } from 'react-router'
import { USER_STORAGE_KEY } from '../app_data/constants'
import { removeUserFromStorage } from '../utility/functions'

export default function AdminArea() {
    const history = useHistory()

    function handleLogOut(){
        removeUserFromStorage(USER_STORAGE_KEY)
        history.push('/')
    }


    return (
       <div>
           <h1>Admin Area</h1>
           <button onClick={handleLogOut}>logout</button>
       </div>

    )
}
