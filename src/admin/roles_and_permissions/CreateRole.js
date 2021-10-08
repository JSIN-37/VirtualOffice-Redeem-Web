import React, { useState } from 'react'
import InputField from '../other/InputField'
import { allDivisionsTaskPermissions, documentPermissions, ownDivisionTaskPermissions, personalTaskPermisssions, teamPermissions } from './permissions'
import PermissionSet from './PermissionSet'
import { edit_role_url, post_roles_url } from '../../app_data/admin_urls'
import LoadingScreen from '../../utility/LoadingScreen'
import { Checkbox, FormControlLabel } from '@mui/material'
import { saveRole } from './functions'


export default function CreateRole({open, edit, version}) {

    const [roleName, setRoleName] = useState(edit ? edit.name : '')
    const [roleDescription, setDescription] = useState(edit ? edit.description : '')
    //const [rolePermissions, setRolePermissions] = useState({})

    //render stuff 
    const [loading, setLoading] = useState(false)
    const [renderDocPerms, setRenderDocPerms] = useState(false)
    const [renderPersonalTaskPerms, setRenderPersonalTaskPerms] = useState(false)
    const [renderOwnDivTaskPerms, setRenderOwnDivTaskPerms] = useState(false)
    const [renderAllDivTaskPerms, setRenderAllDivTaskPerms] = useState(false)
    const [renderTeamPerms, setRenderTeamPerms] = useState(false)

    //permissions - from datastore -> used for changing permissions
    const docsPermissions = !edit ? Object.entries({...documentPermissions}) : Object.entries(edit.permissions.documentPermissions)
    const personalTasks= !edit ? Object.entries({...personalTaskPermisssions}) : Object.entries(edit.permissions.personalTaskPermissions)
    const ownDivisionTasks= !edit ? Object.entries({...ownDivisionTaskPermissions}) : Object.entries(edit.permissions.ownDivisionTaskPermissions)
    const allDivisionTasks = !edit ? Object.entries({...allDivisionsTaskPermissions}) : Object.entries(edit.permissions.allDivisionsTaskPermissions)
    const teamPerms= !edit ? Object.entries({...teamPermissions}) : Object.entries(edit.permissions.teamPermissions)

    //permissions - saved from users selections -> used to send to server
    const [personalTaskFinal, setPersonalFinal] = useState({...personalTaskPermisssions})
    const [ownDivFinal, setOwnDivFinal] = useState({...ownDivisionTaskPermissions})
    const [allDivFinal, setAllDivFinal] = useState({...allDivisionsTaskPermissions})
    const [teamFinal, setTeamFinal] = useState({...teamPermissions})
    const [docsFinal, setDocsFinal] = useState({...documentPermissions})

    //if editing role, need a checkbox to set overwrite situation
    const [overwrite, setOverwrite] = useState(false)

    //change button text between edit and create 
    const btnText = edit ? `Save Edits` : `Create Role`

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

        setLoading(true)
        if(edit){
            Object.assign(data, {overwriteCustomUserPermissions : overwrite} )
            setLoading(true)
            try{
                const response = await saveRole(data,edit_role_url,'edit',edit.id)
                if(response){
                    alert('Role saved.')
                    window.location.reload()
                }else{
                    alert('failed to save role. Check console for response.')
                    setLoading(false)
                    console.log(response)
                }
            }
            catch(e){
                alert('failed to save role. Check console for catch.')
                setLoading(false)
                console.log("error saving role -> ",e)
            }
        }else{
            try{
                const response = await saveRole(data,post_roles_url,'create')
                if(response){
                    alert('created role.')
                    window.location.reload()
                }else{
                    alert('failed to create role. Check console for response.')
                    setLoading(false)
                    console.log(response)
                }
            }
            catch(e){
                alert('Failed to create. Check console for catch.')
                console.log(e)
                setLoading(false)
            }
        }

    }   

    if(loading){
        return <LoadingScreen message={`Saving role...`}/>
    }
 
    return (
        <div>
            <h1>{`${version}`}</h1>
            {edit && <FormControlLabel label={'Overwrite existing users?'} control={<Checkbox label={`Overwrite??`} checked={overwrite} onChange={(e)=>{setOverwrite(e.target.checked)}}/>}/>}
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
            <button onClick={createRole}>{`${btnText}`}</button>
        </div>
    )
}
