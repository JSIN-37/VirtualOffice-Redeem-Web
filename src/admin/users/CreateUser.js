import React, { useEffect, useState } from 'react'
import LoadingScreen from '../../utility/LoadingScreen'
import { getDivisions } from '../divisions/functions'
import InputField from '../other/InputField'
import { getRoles } from '../roles_and_permissions/functions'

export default function CreateUser() {
    const [name, setName] = useState('')
    const [divisionOptions, setDivisionOptions] = useState([])
    const [roleOptions, setRoleOptions] = useState([])
    
    //loading screen
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        fetchOptions()
        async function fetchOptions(){
            const divisions = await getDivisions()
            const roles = await getRoles()
            let error = 'Failed to get '
            !divisions ? error +='divisions ': error+=''
            !roles ? error +='and roles' : error+=''
            if(!divisions || !roles){
                alert(`${error}`)
                setLoading(false)
                return
            }
            setDivisionOptions(divisions)
            setRoleOptions(roles)
            setLoading(false)
        }
        return(()=>{
            setRoleOptions([])
            setDivisionOptions([])
        })
    },[])

    function test(){
        console.log("divisions options ",divisionOptions)
        console.log('role options ', roleOptions)
    }

    if(loading){
        return <LoadingScreen message='getting organization details...'/>
    }

    return (
        <div>
            <h1>Create User</h1>
            <InputField type='text' input={name} setInput={setName} placeholder='Name' />
            <button onClick={test}>Click</button>
        </div>
    )
}
