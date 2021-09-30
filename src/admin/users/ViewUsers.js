import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { get_users_url } from '../../app_data/admin_urls'
import { USER_STORAGE_KEY } from '../../app_data/constants'
import { getConfig } from '../../utility/functions'
import InputField from '../other/InputField'
import { searchUser } from './functions'

export default function ViewUsers() {
    const [users, setUsers] = useState([])


    //render components
    const[searchUserDB, setSearchUserDB] = useState(false)


    useEffect(()=>{
        const config = getConfig(USER_STORAGE_KEY)
        if(!config) return
        axios.get(get_users_url, config)
        .then((response)=>{
            console.log("users response ",response)
            setUsers(response.data)
        })
        .catch((er)=>{
            console.log('error getting users ',er)
        })

        return ()=>{
            setUsers([])
        }
    },[])

    function tester(){
        setSearchUserDB(true)
    }
    return (
        <>
        <div>
            <h1>View Users</h1>
            <button onClick={tester}>test</button>
        </div>

        {users.length>0 && users.map((user)=>{
            return (
                //REPLACE THIS WITH CARD? 
                <div key={user.id}>
                    {`${JSON.stringify(user)}`}
                </div>
            )
        })}
        
        {searchUserDB && <SearchUser />}

        </>
    )
}


export const SearchUser = () =>{
    const [divisionID, setDivisionID ] = useState('')
    const [roleID, setRoleID]= useState('')
    const [name, setName]= useState('')
    const [email, setEmail]= useState('')

    function handleSearchButton(){
        const params = {}
        if(divisionID!==''){
            const division =  {divisionId : divisionID}
            Object.assign(params, division)
        }
        if(roleID !== ''){
            const role = {roleId : roleID}
            Object.assign(params, role)
        }
        if(name!==''){
            const searchName = {nameLike : name}
            Object.assign(params, searchName)
        }
        if(email!==''){
            const searchEmail = {emailLike : email}
            Object.assign(params, searchEmail)
        }

        searchUser(params)
    }


    return(
        <>
            <InputField type={`text`} placeholder={`divisionID`} input={divisionID} setInput={setDivisionID} />
            <InputField type={`text`} placeholder={`RoleID`} input={roleID} setInput={setRoleID} />
            <InputField type={`text`} placeholder={`name`} input={name} setInput={setName} />
            <InputField type={`text`} placeholder={`email`} input={email} setInput={setEmail} />
            <button onClick={handleSearchButton}>Search Database</button>
        </>
    )
}
