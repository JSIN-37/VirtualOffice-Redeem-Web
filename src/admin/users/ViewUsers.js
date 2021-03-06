import React, { useEffect, useState } from 'react'
import { Center, Text, Button } from "@chakra-ui/react"
import LoadingScreen from '../../utility/LoadingScreen'
import { getDivisions } from '../divisions/functions'
import InputField from '../other/InputField'
import { getRoles } from '../roles_and_permissions/functions'
import { getUsers, searchUser } from './functions'
import UserCard from './UserCard'

export default function ViewUsers() {
    const [users, setUsers] = useState([])
    const [divisions, setDivisions] = useState([])
    const [roles, setRoles] = useState([])

    //render components based on this.
    const [searchUserDB, setSearchUserDB] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
        async function fetchData() {
            try {
                const users = await getUsers()
                const divisions = await getDivisions()
                const roles = await getRoles()
                if (users) {
                    setUsers(users)
                }
                if (divisions) {
                    setDivisions(divisions)
                }
                if (roles) {
                    setRoles(roles)
                }
                setLoading(false)
                return
            }
            catch (e) {
                console.log("error fetching data -> ", e)
                setLoading(false)
                return
            }
        }

        return () => {
            setUsers([])
            setDivisions([])
            setRoles([])
        }
    }, [])

    function tester() {
        setSearchUserDB(true)
    }

    if (loading) {
        return <LoadingScreen message='loading...' />
    }


    return (
        <>
            <Center>
                <Text fontSize="lg" m={2} > View Users </Text>
                <Button colorScheme="purple" variant="solid" m={2} onClick={tester}>Search Database</Button>
            </Center>

            {users.length > 0 && users.map((user) => {
                return (
                    <UserCard key={user.id} user={user} division={divisions.filter((d) => d.id === user.DivisionId)} role={roles.filter((r) => r.id === user.RoleId)} />
                )
            })}

            {searchUserDB && <SearchUser setSearchUserDB={setSearchUserDB} divisions={divisions} roles={roles} />}

        </>
    )
}


export const SearchUser = ({ setSearchUserDB, divisions, roles }) => {
    const [divisionID, setDivisionID] = useState('')
    const [roleID, setRoleID] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [searchResults, setSearchResults] = useState([])

    //create query parameters and call search from server
    async function handleSearchButton() {
        const params = {}
        if (divisionID !== '') {
            const division = { divisionId: divisionID }
            Object.assign(params, division)
        }
        if (roleID !== '') {
            const role = { roleId: roleID }
            Object.assign(params, role)
        }
        if (name !== '') {
            const searchName = { nameLike: name }
            Object.assign(params, searchName)
        }
        if (email !== '') {
            const searchEmail = { emailLike: email }
            Object.assign(params, searchEmail)
        }

        const res = await searchUser(params)
        console.log('xxx', res)
        if (res.data.length === 0) {
            alert('not found.')
        }
        setSearchResults(res.data)
    }


    return (
        <>
            <InputField type={`text`} placeholder={`divisionID`} input={divisionID} setInput={setDivisionID} />
            <InputField type={`text`} placeholder={`RoleID`} input={roleID} setInput={setRoleID} />
            <InputField type={`text`} placeholder={`name`} input={name} setInput={setName} />
            <InputField type={`text`} placeholder={`email`} input={email} setInput={setEmail} />
            <Button colorScheme="purple" variant="solid" m={2} onClick={handleSearchButton}>Search Database</Button>
            <Button colorScheme="purple" variant="solid" m={2} onClick={() => { setSearchUserDB(false) }}>Close Search Field</Button>
            <Text fontSize="lg" m={2} > Results </Text>
            {searchResults.length > 0 && searchResults.map((user) => {
                return (
                    <UserCard key={user.id} user={user} division={divisions.filter((d) => d.id === user.DivisionId)} role={roles.filter((r) => r.id === user.RoleId)} />
                )
            })}
        </>
    )
}
