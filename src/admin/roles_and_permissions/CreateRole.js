/*eslint-disable no-unused-vars */

import React, { useState } from 'react'
import InputField from '../other/InputField'
import { documentPermissions, ownDivisionTaskPermissions, personalTaskPermisssions, teamPermissions } from './permissions'
import PermissionSet from './PermissionSet'



export default function CreateRole({open}) {

    const [roleName, setRoleName] = useState('')
    const [roleDescription, setDescription] = useState('')
    //const [rolePermissions, setRolePermissions] = useState({})

    //render stuff 
    const [renderDocPerms, setRenderDocPerms] = useState(false)
    const [renderPersonalTaskPerms, setRenderPersonalTaskPerms] = useState(false)
    const[renderOwnDivTaskPerms, setRenderOwnDivTaskPerms] = useState(false)
    const [renderTeamPerms, setRenderTeamPerms] = useState(false)

    //permissions - docs
    const [docsPermissions, setDocsPermissions] = useState(Object.entries({...documentPermissions}))
    const [personalTasks, setPersonalTasks] = useState(Object.entries({...personalTaskPermisssions}))
    const [ownDivisionTasks, setOwnDivisionTasks] = useState(Object.entries({...ownDivisionTaskPermissions}))
    const [teamPerms,setTeamPerms ] = useState(Object.entries({...teamPermissions}))
    console.log(Object.entries(personalTasks))
 
    return (
        <div>
            <h1>Create Role</h1>
            <InputField type={'text'} placeholder={'Name for Role'} input={roleName} setInput={setRoleName} />
            <InputField type={'text'} placeholder={'Description '} input={roleDescription} setInput={setDescription} />
            {renderDocPerms && <PermissionSet name={'Doc'} permissionGroup={docsPermissions} setPermissionGroup={setDocsPermissions} open={setRenderDocPerms}/>}
            {renderPersonalTaskPerms && <PermissionSet name={`Personal Div Tasks`} permissionGroup={personalTasks} setPermissionGroup={setPersonalTasks} open={setRenderPersonalTaskPerms}/>}
            {renderOwnDivTaskPerms && <PermissionSet name={`Own Div Tasks`} permissionGroup={ownDivisionTasks} setPermissionGroup={setOwnDivisionTasks} open={setRenderOwnDivTaskPerms}/>}
            {renderTeamPerms && <PermissionSet name={`Team`} permissionGroup={teamPerms} setPermissionGroup={setTeamPerms} open={setRenderTeamPerms}/>}
            <button onClick={()=>{setRenderDocPerms(true)}}>Document Permissions</button>
            <button onClick={()=>{setRenderPersonalTaskPerms(true)}}>Personal Task Permissions</button>
            <button onClick={()=>{setRenderOwnDivTaskPerms(true)}}>Own Div Task Permissions</button>
            <button onClick={()=>{open(false)}}>back</button>
        </div>
    )
}
