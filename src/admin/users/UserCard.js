import { Typography } from '@mui/material'
import React, { useState } from 'react'
import UserPermissionsView from './UserPermissionsView'

export default function UserCard({user, division, role}) {
    
    const [moreDetails, setMoreDetails] = useState(false)

    return (
        <div>
           <Typography>{`Name   : ${user.firstName} ${user.lastName}`}</Typography>
           <Typography>{`Email: ${user.email}`}</Typography>
           <Typography>{`Division : ${division[0].name}`}</Typography>
           <Typography>{`Role : ${role[0].name}`}</Typography>
           {moreDetails && <UserPermissionsView permissions={user.permissions} open={setMoreDetails}/>}
           {!moreDetails && <button onClick={(e)=>{setMoreDetails(true)}}>More Details</button>}
           <br/>
        </div>
    )
}
