/*eslint-disable no-unused-vars */

import React, { useState } from 'react'
import InputField from '../other/InputField'
import { personalTaskPermisssions } from './permissions'



export default function CreateRole({open}) {

    const [roleName, setRoleName] = useState('')
    const [roleDescription, setDescription] = useState('')
    //const [rolePermissions, setRolePermissions] = useState({})

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
            {tasks.map((task)=>{
                return <p key={task[0]}>{`${task[0]} -> description - ${JSON.stringify(task[1].description)} value - ${JSON.stringify(task[1].value)}`}</p>
            })}
            <button onClick={()=>{open(false)}}>back</button>
        </div>
    )
}
