import {  Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React, { useState } from 'react'

export default function PermissionSet({permissionGroup, setPermissionGroup}) {

    console.log("required format -> ",permissionGroup)
    const [permissions, setPermissions] = useState({...permissionGroup})
    
    console.log("local state -> ", permissions)
    
    
    return (
        <div>
            <FormGroup>
            {permissionGroup.map((perms)=>{
                console.log('perm = ',perms[1].description)
                return (
                    <FormControlLabel id={perms[0]}
                        control = { <Checkbox  checked={perms[1].value} name={perms[1].description}/>}
                        label = {perms[1].description}
                    />
                )
            })}
            </FormGroup>
        </div>
    )
}
