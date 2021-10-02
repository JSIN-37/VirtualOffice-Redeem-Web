/*eslint-disable no-unused-vars */

import React, { useState } from 'react'
import InputField from '../other/InputField'
import { personalTaskPermisssions } from './permissions'
import PermissionSet from './PermissionSet'



export default function CreateRole({open}) {

    const [roleName, setRoleName] = useState('')
    const [roleDescription, setDescription] = useState('')
    //const [rolePermissions, setRolePermissions] = useState({})

    //render stuff 
    const [renderTaskPerms, setRenderTaskPerms] = useState(false)

    //permissions - docs
    //const [docs, setDocs] = useState(permissions.docs)
    const [tasks, setTasks] = useState(Object.entries({...personalTaskPermisssions}))
    //const [teams, setTeams] = useState(permissions.teams)
    console.log(Object.entries(tasks))
 
    return (
        <div>
            <h1>Create Role</h1>
            <InputField type={'text'} placeholder={'Name for Role'} input={roleName} setInput={setRoleName} />
            <InputField type={'text'} placeholder={'Description '} input={roleDescription} setInput={setDescription} />
            {renderTaskPerms && <PermissionSet permissionGroup={tasks} setPermissionGroup={setTasks} open={setRenderTaskPerms}/>}
            <button onClick={()=>{setRenderTaskPerms(true)}}>Task Permissions</button>
            <button onClick={()=>{open(false)}}>back</button>
        </div>
    )
}
