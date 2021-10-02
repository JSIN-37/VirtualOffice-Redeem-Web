import {  Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React, { useState } from 'react'

export default function PermissionSet({permissionGroup, setPermissionGroup}) {

    console.log("required format -> ",permissionGroup)
    const [permissions, setPermissions] = useState(permissionGroup)
    
    console.log("local state -> ", permissions)
    
    
    function handleChange(event){
        const newPermissions = [...permissions]
        const permissionObject = permissions.filter((per)=>per[0]===event.target.id)
        const indexOfPermission = permissions.indexOf(permissionObject[0])
        permissionObject[0][1].value = true
        newPermissions.splice(indexOfPermission, 1, permissionObject[0])
        setPermissions(newPermissions)
    }

    function handleSaveTaskPerms(){
        console.log(permissions)
    }


    return (
        <div>
            <FormGroup>
            <>
            {permissions.map((perms)=>{
                //console.log('perm = ',perms[1].description)
                return (
                    <FormControlLabel key={perms[0]} value={perms[1].value}
                        control = { <Checkbox  checked={perms[1].value} id={perms[0]} onChange={handleChange}/>}
                        label = {perms[1].description}
                    />
                )
            })}
            <button onClick={handleSaveTaskPerms}>save task permissions </button>
            <br/><br/><br/><br/>
            </>
            </FormGroup>
        </div>
    )
}
