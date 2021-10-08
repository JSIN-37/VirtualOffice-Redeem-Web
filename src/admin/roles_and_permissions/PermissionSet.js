import {  Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React, { useState } from 'react'

export default function PermissionSet({permissionGroup, setPermissionGroup, name, open}) {

    const [permissions, setPermissions] = useState(permissionGroup)
    
    function handleChange(event){
        const newPermissions = [...permissions]
        const permissionObject = permissions.filter((per)=>per[0]===event.target.id)
        const indexOfPermission = permissions.indexOf(permissionObject[0])
        permissionObject[0][1].value ? permissionObject[0][1].value = false : permissionObject[0][1].value = true
        newPermissions.splice(indexOfPermission, 1, permissionObject[0])
        setPermissions(newPermissions)
    }

    
    //have to change this setGroupPermission(permissions) and handle new one from parent component
    function handleSaveTaskPerms(){
        const sendBack = Object.fromEntries(permissions)
        setPermissionGroup(sendBack)
        console.log(`Permssions saved for ${name}= `, sendBack )
        open(false)
    }


    return (
        <div>
            <FormGroup>
            <>
            {permissions.map((perms)=>{
                return (
                    <FormControlLabel key={perms[0]} value={perms[1].value}
                        control = { <Checkbox  checked={perms[1].value} id={perms[0]} onChange={handleChange}/>}
                        label = {perms[1].description}
                    />
                )
            })}
            <button onClick={handleSaveTaskPerms} >save {`${name}`} permissions </button>
            <button onClick={()=>{open(false)}}> Close {`${name}`} Permissions</button>

            </>
            </FormGroup>
        </div>
    )
}
