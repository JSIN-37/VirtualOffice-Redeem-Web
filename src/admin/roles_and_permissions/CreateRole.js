import React, { useState } from 'react'
import { getConfig } from '../../utility/functions'
import InputField from '../other/InputField'
import { allDivisionsTaskPermissions, documentPermissions, ownDivisionTaskPermissions, personalTaskPermisssions, teamPermissions } from './permissions'
import PermissionSet from './PermissionSet'
import { USER_STORAGE_KEY } from '../../app_data/constants';
import axios from 'axios'
import { post_roles_url } from '../../app_data/admin_urls'
import LoadingScreen from '../../utility/LoadingScreen'


export default function CreateRole({open}) {

    const [roleName, setRoleName] = useState('')
    const [roleDescription, setDescription] = useState('')
    //const [rolePermissions, setRolePermissions] = useState({})

    //render stuff 
    const [loading, setLoading] = useState(false)
    const [renderDocPerms, setRenderDocPerms] = useState(false)
    const [renderPersonalTaskPerms, setRenderPersonalTaskPerms] = useState(false)
    const [renderOwnDivTaskPerms, setRenderOwnDivTaskPerms] = useState(false)
    const [renderAllDivTaskPerms, setRenderAllDivTaskPerms] = useState(false)
    const [renderTeamPerms, setRenderTeamPerms] = useState(false)

    //permissions - from datastore -> used for changing permissions
    const docsPermissions = Object.entries({...documentPermissions})
    const personalTasks= Object.entries({...personalTaskPermisssions})
    const ownDivisionTasks= Object.entries({...ownDivisionTaskPermissions})
    const allDivisionTasks = Object.entries({...allDivisionsTaskPermissions})
    const teamPerms= Object.entries({...teamPermissions})

    //permissions - saved from users selections -> used to send to server
    const [personalTaskFinal, setPersonalFinal] = useState({...personalTaskPermisssions})
    const [ownDivFinal, setOwnDivFinal] = useState({...ownDivisionTaskPermissions})
    const [allDivFinal, setAllDivFinal] = useState({...allDivisionsTaskPermissions})
    const [teamFinal, setTeamFinal] = useState({...teamPermissions})
    const [docsFinal, setDocsFinal] = useState({...documentPermissions})

    async function createRole(){
        if(roleName===''){
            alert("add role name")
            return
        }
        if(roleDescription===''){
            alert('add role description')
            return
        }

        const rolePermissions = {
            personalTaskPermissions : personalTaskFinal,
            ownDivisionTaskPermissions : ownDivFinal,
            allDivisionsTaskPermissions : allDivFinal,
            teamPermissions : teamFinal,
            documentPermissions : docsFinal
        }
        const data  = {
            roleName : roleName,
            roleDescription : roleDescription,
            rolePermissions : rolePermissions
        }
        console.log(rolePermissions)
        const config = getConfig(USER_STORAGE_KEY)
        if(!config){
            alert("not authenticated. Log out and log in again.")
            return
        }
        
        try{
            setLoading(true)
            const res = await axios.post(post_roles_url, data,config)
            if(res.status === 200){
                alert('added role.')
                setLoading(false)
                window.location.reload()
            }else{
                alert('failed. ')
                setLoading(false)
            }   
        }
        catch{
            alert('failed to create role.')
            setLoading(false)
        }
        
    }   

    if(loading){
        return <LoadingScreen message={`Saving role...`}/>
    }
 
    return (
        <div>
            <h1>Create Role</h1>
            <InputField type={'text'} placeholder={'Name for Role'} input={roleName} setInput={setRoleName} />
            <InputField type={'text'} placeholder={'Description '} input={roleDescription} setInput={setDescription} />
            {renderDocPerms && <PermissionSet name={'Doc'} permissionGroup={docsPermissions} setPermissionGroup={setDocsFinal} open={setRenderDocPerms}/>}
            {renderPersonalTaskPerms && <PermissionSet name={`Personal Div Tasks`} permissionGroup={personalTasks} setPermissionGroup={setPersonalFinal} open={setRenderPersonalTaskPerms}/>}
            {renderOwnDivTaskPerms && <PermissionSet name={`Own Div Tasks`} permissionGroup={ownDivisionTasks} setPermissionGroup={setOwnDivFinal} open={setRenderOwnDivTaskPerms}/>}
            {renderAllDivTaskPerms && <PermissionSet name={`All Div Tasks`} permissionGroup={allDivisionTasks} setPermissionGroup={setAllDivFinal} open={setRenderAllDivTaskPerms} />}
            {renderTeamPerms && <PermissionSet name={`Team`} permissionGroup={teamPerms} setPermissionGroup={setTeamFinal} open={setRenderTeamPerms}/>}
            <button onClick={()=>{setRenderDocPerms(true)}}>Document Permissions</button>
            <button onClick={()=>{setRenderPersonalTaskPerms(true)}}>Personal Task Permissions</button>
            <button onClick={()=>{setRenderOwnDivTaskPerms(true)}}>Own Div Task Permissions</button>
            <button onClick={()=>{setRenderAllDivTaskPerms(true)}}>All Div Tasks</button>
            <button onClick={()=>setRenderTeamPerms(true)}>Team Permissions</button>
            <button onClick={()=>{open(false)}}>back</button>
            <button onClick={createRole}>CreateRole</button>
        </div>
    )
}
