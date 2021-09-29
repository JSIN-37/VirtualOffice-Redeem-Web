import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { get_divisions_url } from '../../app_data/admin_urls'
import { USER_STORAGE_KEY } from '../../app_data/constants'
import { getTokenFromStorage } from '../../utility/functions'

export default function ViewDivisions() {
    const [divisions, setDivisions] = useState([])

    
    
    useEffect(() => {
    const token = getTokenFromStorage(USER_STORAGE_KEY)
    const config = {headers : {Authorization : `Bearer ${token}`}}
    axios.get(get_divisions_url, config)
    .then((response)=>{
        setDivisions(response.data)
    })
    .catch((er)=>{
        console.log("error fetching all divisions ",er)
    })
        return () => {
            setDivisions([])
        }
    }, [])

    return (
        <>
            <div>
            <h1>View divisions</h1>
        </div>
        {divisions.length > 0 && divisions.map((division)=>{
            return ( <p key={division.id}>{`id = ${division.id} name= ${division.name}`}</p>)
        })}
        </>
    )
}
